// 명의 찾기 페이지

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { DOCTORS } from '@/constants/doctor-data';
import {
  DoctorSearchHeader,
  SearchInput,
  CategoryFilter,
  ResultsHeader,
  DoctorCard,
  DoctorCardSkeletonList,
  SortOption,
  SearchSuggestions,
  buildSuggestions,
} from './search';
import { extractLastWord } from './search/SearchSuggestions';
import { LocationPermissionModal, LocationStatus } from './search/LocationPermissionModal';
import { DoctorProfileModal } from './DoctorProfileModal';
import { SearchX, Bot, Loader2 } from 'lucide-react';
import { useAppNavigation } from '@/app/contexts/AppNavigationContext';
import { useUsageLimitContext } from '@/app/contexts/UsageLimitContext';
import { useUser } from '@/app/contexts/UserContext';
import { UsageLimitBanner } from './UsageLimitBanner';
import { SpecDemoTagChip } from './tagMatching/SpecDemoTagChip';
import { DOCTOR_DEMO_TAG_MAP, type DoctorDemoTagId } from './tagMatching/doctorTabTagRegistry';

const LOCATION_PERM_KEY = 'aiga_location_permission';
const PAGE_SIZE = 10;

// GPS 좌표 → 더미 거리 재계산 (서울 기준 시뮬레이션)
function recalcDistances(doctors: typeof DOCTORS, _coords: { lat: number; lng: number }) {
  return doctors.map((doc, i) => ({
    ...doc,
    distance: `${((i * 0.31 + 0.3) % 9 + 0.3).toFixed(1)}km`,
  }));
}

interface DoctorSearchPageProps {
  onNavigateToChat?: () => void;
}

export function DoctorSearchPage({ onNavigateToChat }: DoctorSearchPageProps = {}) {
  const { doctorSearchQuery, setDoctorSearchQuery, setActiveTab, openSpecSection } = useAppNavigation();
  const { isGuest, setRole } = useUser();
  const navigateDoctorSpecTag = useCallback((tagId: DoctorDemoTagId) => {
    setRole('guest');
    setActiveTab('search');
    openSpecSection({ tab: 'doctor', sectionId: DOCTOR_DEMO_TAG_MAP[tagId].specSectionId });
  }, [setRole, setActiveTab, openSpecSection]);
  const { consumeSearch, consumeProfileView, searchRemaining, profileViewRemaining, canSearch, canViewProfile, openLimitModal } = useUsageLimitContext();
  const [searchQuery, setSearchQuery] = useState(doctorSearchQuery ?? '');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [sortBy, setSortBy] = useState<SortOption>('patient');
  const [categoryFilters, setCategoryFilters] = useState<{
    mainCategory: string | null;
    subCategory: string | null;
  }>({
    mainCategory: null,
    subCategory: null,
  });

  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [doctorList, setDoctorList] = useState(DOCTORS);

  // ─── 스켈레톤 + 무한스크롤 상태 ───────────────────────────────────────
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const isFirstRender = useRef(true);

  // sentinel: 항상 DOM에 존재 (조건부 언마운트 X → observer 안정성 보장)
  const sentinelRef = useRef<HTMLDivElement>(null);
  // stale closure 방지용 ref
  const isLoadingMoreRef = useRef(false);
  const hasMoreRef = useRef(false);
  const isLoadingRef = useRef(true); // 초기 스켈레톤 중 observer 트리거 방지
  // ─────────────────────────────────────────────────────────────────────

  // 최초 진입 시 스켈레톤 (700ms)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // Context에 검색어가 있으면 적용하고 초기화
  useEffect(() => {
    if (doctorSearchQuery) {
      setSearchQuery(doctorSearchQuery);
      setDoctorSearchQuery('');
    }
  }, [doctorSearchQuery]);

  // 위치 권한 확인
  useEffect(() => {
    let isMounted = true;
    const saved = localStorage.getItem(LOCATION_PERM_KEY);
    if (!saved) {
      if (isMounted) setShowPermissionModal(true);
    } else if (saved === 'granted') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (!isMounted) return;
            const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
            setDoctorList(recalcDistances(DOCTORS, coords));
            setLocationStatus('granted');
          },
          () => {
            if (!isMounted) return;
            const fallbackCoords = { lat: 37.5665, lng: 126.978 };
            setDoctorList(recalcDistances(DOCTORS, fallbackCoords));
            setLocationStatus('granted');
          }
        );
      } else {
        if (isMounted) {
          const fallbackCoords = { lat: 37.5665, lng: 126.978 };
          setDoctorList(recalcDistances(DOCTORS, fallbackCoords));
          setLocationStatus('granted');
        }
      }
    } else {
      if (isMounted) {
        setLocationStatus('denied');
        setDoctorList(DOCTORS);
      }
    }
    return () => { isMounted = false; };
  }, []);

  // 검색어·카테고리·정렬 변경 → 스켈레톤 + 페이지 리셋
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsLoading(true);
    setVisibleCount(PAGE_SIZE);
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, [searchQuery, categoryFilters, sortBy]);

  // ─── 무한스크롤: observer 단 한 번만 생성, ref로 최신값 참조 ──────────
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoadingMoreRef.current &&
          hasMoreRef.current &&
          !isLoadingRef.current
        ) {
          isLoadingMoreRef.current = true;
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + PAGE_SIZE);
            setIsLoadingMore(false);
            isLoadingMoreRef.current = false;
          }, 500);
        }
      },
      { rootMargin: '200px', threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []); // 빈 배열: 마운트 시 한 번만 생성
  // ─────────────────────────────────────────────────────────────────────

  const handleGranted = useCallback((coords: { lat: number; lng: number }) => {
    localStorage.setItem(LOCATION_PERM_KEY, 'granted');
    setLocationStatus('granted');
    setDoctorList(recalcDistances(DOCTORS, coords));
    setSortBy('distance');
    setShowPermissionModal(false);
  }, []);

  const handleDenied = useCallback(() => {
    localStorage.setItem(LOCATION_PERM_KEY, 'denied');
    setLocationStatus('denied');
    setShowPermissionModal(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowPermissionModal(false);
  }, []);

  const handleSearch = useCallback((query: string) => {
    const allowed = consumeSearch();
    if (!allowed) return;
    setSearchQuery(query);
    setDoctorSearchQuery(query);
    setIsSearchFocused(false);
  }, [setDoctorSearchQuery, consumeSearch]);

  const handleSuggestionSelect = useCallback((label: string) => {
    // 마지막 단어만 선택한 제안어로 교체 ("간암 병" → "병원내과" 클릭 → "간암 병원내과")
    const words = searchQuery.trim().split(/\s+/).filter(Boolean);
    if (words.length > 0) words[words.length - 1] = label;
    else words.push(label);
    const newQuery = words.join(' ');
    setSearchQuery(newQuery);
    setDoctorSearchQuery(newQuery);
    setIsSearchFocused(false);
  }, [searchQuery, setDoctorSearchQuery]);

  const handleSortChange = useCallback((sort: SortOption) => {
    if (sort === 'distance' && locationStatus !== 'granted') {
      setShowPermissionModal(true);
      return;
    }
    setSortBy(sort);
  }, [locationStatus]);

  // 연관검색어 — 마지막 단어가 있을 때만 생성
  const suggestions = useMemo(
    () => (isSearchFocused && extractLastWord(searchQuery) ? buildSuggestions(searchQuery) : []),
    [isSearchFocused, searchQuery]
  );

  const showSuggestions = isSearchFocused && extractLastWord(searchQuery).length > 0 && suggestions.length > 0;

  // Filter
  const filteredDoctors = doctorList.filter((doctor) => {
    // 공백으로 분리 → 모든 키워드가 어느 필드에든 포함되어야 함 (AND 조건)
    const keywords = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const matchesSearch =
      keywords.length === 0 ||
      keywords.every((kw) =>
        doctor.name.toLowerCase().includes(kw) ||
        doctor.hospital.toLowerCase().includes(kw) ||
        doctor.specialty.toLowerCase().includes(kw) ||
        (doctor.diseaseArea || '').toLowerCase().includes(kw) ||
        (doctor.mainCategory || '').toLowerCase().includes(kw) ||
        (doctor.tags || []).some(tag => tag.replace('#', '').toLowerCase().includes(kw))
      );

    let matchesCategory = true;
    if (categoryFilters.mainCategory) {
      if (!categoryFilters.subCategory) {
        matchesCategory = doctor.mainCategory === categoryFilters.mainCategory;
      } else {
        matchesCategory = doctor.diseaseArea === categoryFilters.subCategory;
      }
    }

    return matchesSearch && matchesCategory;
  });

  // Sort
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'distance') {
      const distA = parseFloat(a.distance?.replace('km', '') || '999');
      const distB = parseFloat(b.distance?.replace('km', '') || '999');
      return distA - distB;
    }
    if (sortBy === 'patient') return (b.reviewCount || 0) - (a.reviewCount || 0);
    if (sortBy === 'doctor') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const visibleDoctors = sortedDoctors.slice(0, visibleCount);
  const hasMore = visibleCount < sortedDoctors.length;

  // ref 동기화 (렌더마다 최신값 반영)
  hasMoreRef.current = hasMore;
  isLoadingRef.current = isLoading;

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="max-w-3xl mx-auto space-y-4 pt-4 px-4">
          {/* D01 — 통합검색(앱)과 겹치지 않게 우측 여백 */}
          <div className="relative">
            <DoctorSearchHeader />
            <SpecDemoTagChip
              tagId="D01"
              onNavigate={(id) => navigateDoctorSpecTag(id as DoctorDemoTagId)}
              style={{ top: '0.25rem', right: '3.5rem' }}
            />
          </div>
          {/* 검색창 + 드롭다운 — D02·D03은 앱 통합검색 아이콘과 겹치지 않게 우측 inset */}
          <div className="relative min-h-[2.75rem]">
            <SpecDemoTagChip
              tagId="D02"
              onNavigate={(id) => navigateDoctorSpecTag(id as DoctorDemoTagId)}
              style={{ top: 0, right: '3.5rem' }}
            />
            <SpecDemoTagChip
              tagId="D03"
              onNavigate={(id) => navigateDoctorSpecTag(id as DoctorDemoTagId)}
              style={{ top: '2.875rem', right: '3.5rem' }}
            />
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              onFocusChange={setIsSearchFocused}
              disabled={isGuest && !canSearch}
              onDisabledClick={() => openLimitModal('search')}
            />
            {/* 연관검색어 드롭다운 — 잠금 상태에선 숨김 */}
            {showSuggestions && !(!canSearch && isGuest) && (
              <SearchSuggestions
                suggestions={suggestions}
                query={searchQuery}
                onSelect={handleSuggestionSelect}
              />
            )}
          </div>
          <div className="relative">
            <SpecDemoTagChip
              tagId="D04"
              onNavigate={(id) => navigateDoctorSpecTag(id as DoctorDemoTagId)}
              style={{ top: 0, right: 0 }}
            />
            <div className="pr-10">
              <CategoryFilter onFilterChange={setCategoryFilters} />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {/* ── 비회원 사용량 배너 (소진 시 잠금 / 1회 남을 시 경고) ── */}
        {isGuest && (
          <UsageLimitBanner types={['search', 'profileView']} />
        )}

        <div className="relative px-4 py-3 border-b border-gray-100">
          <SpecDemoTagChip
            tagId="D05"
            onNavigate={(id) => navigateDoctorSpecTag(id as DoctorDemoTagId)}
            style={{ top: '0.5rem', right: '1rem' }}
          />
          <div className="max-w-3xl mx-auto pr-12">
            <ResultsHeader
              count={sortedDoctors.length}
              currentSort={sortBy}
              onSortChange={handleSortChange}
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto pb-20">
          {isLoading ? (
            <div className="relative">
              <SpecDemoTagChip
                tagId="D06"
                onNavigate={(id) => navigateDoctorSpecTag(id as DoctorDemoTagId)}
                style={{ top: '0.25rem', right: '1rem' }}
              />
              <DoctorCardSkeletonList count={PAGE_SIZE} />
            </div>
          ) : sortedDoctors.length > 0 ? (
            <div className="relative">
              <SpecDemoTagChip
                tagId="D06"
                onNavigate={(id) => navigateDoctorSpecTag(id as DoctorDemoTagId)}
                style={{ top: '0.25rem', right: '1rem' }}
              />
              {visibleDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  id={doctor.id}
                  name={doctor.name}
                  hospital={doctor.hospital}
                  specialty={doctor.specialty}
                  rating={doctor.rating}
                  reviewCount={doctor.reviewCount}
                  distance={doctor.distance}
                  tags={doctor.tags || []}
                  verified={doctor.verified}
                  onClick={() => {
                    const allowed = consumeProfileView();
                    if (allowed) setSelectedDoctor(doctor);
                  }}
                  showDistance={locationStatus === 'granted'}
                />
              ))}

              {/* 하단 로딩 인디케이터 (isLoadingMore일 때만 표시) */}
              {isLoadingMore && (
                <div className="flex flex-col items-center">
                  <DoctorCardSkeletonList count={3} />
                  <div className="flex items-center gap-2 py-3 text-sm text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>불러오는 중...</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative py-8 px-4">
              <SpecDemoTagChip
                tagId="D07"
                onNavigate={(id) => navigateDoctorSpecTag(id as DoctorDemoTagId)}
                style={{ top: '0.5rem', right: '1rem' }}
              />
              <div className="text-center mb-8 pr-10">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <SearchX className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  질환명, 병원명, 의사 이름이 정확한지 확인해 주세요.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={onNavigateToChat}
                  className="w-full p-5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl text-left hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <p className="text-white text-base mb-1 font-medium">
                      원하는 의사를 못 찾으셨나요?
                    </p>
                    <p className="text-blue-100 text-sm">
                      AI챗봇에게 물어보시면 질환에 딱 맞는 명의를 찾을 수 있어요.
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                    <Bot className="w-12 h-12 text-white" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* sentinel: 항상 DOM에 존재, 높이만 조정 — 조건부 언마운트 금지 */}
          <div
            ref={sentinelRef}
            className={hasMore ? 'h-4' : 'h-0'}
            aria-hidden="true"
          />

          {/* 모두 로드 완료 */}
          {!isLoading && !hasMore && sortedDoctors.length >= 10 && (
            <div className="py-8 text-center text-sm text-gray-400">
              총 {sortedDoctors.length}명의 명의를 모두 확인했습니다.
            </div>
          )}
        </div>
      </div>

      {showPermissionModal && (
        <LocationPermissionModal
          onGranted={handleGranted}
          onDenied={handleDenied}
          onClose={handleCloseModal}
        />
      )}

      {selectedDoctor && (
        <DoctorProfileModal
          doctor={selectedDoctor}
          isOpen={!!selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}