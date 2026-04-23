import { buildSuggestions, extractLastWord, SearchSuggestions } from './search/SearchSuggestions';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Search,
  SearchX,
  X,
  ChevronRight,
  User,
  Building2,
  MessageCircle,
  Heart,
  Bot,
  Loader2,
  Lock,
} from 'lucide-react';
import { VerificationBadge } from '@/app/components/VerificationBadge';
import { DOCTORS } from '@/constants/doctor-data';
import { communityPosts, postPlainBodyText } from '@/constants/community-data';
import type { CommunityPost } from '@/constants/community-data';
import { HospitalCardModal, getHospitalInfo, HospitalInfo } from './HospitalCardModal';
import { DoctorProfileModal } from './DoctorProfileModal';
import { CommunityPostModal } from './CommunityPostModal';
import { useUsageLimitContext } from '@/app/contexts/UsageLimitContext';
import { useUser } from '@/app/contexts/UserContext';
import { USAGE_LIMITS } from '@/app/hooks/useUsageLimit';
import { UsageLimitBanner } from './UsageLimitBanner';

// ─── 병원 집계 ────────────────────────────────────────────────────────────────
function buildHospitalList() {
  const map = new Map<string, {
    name: string;
    specialties: Set<string>;
    diseaseAreas: Set<string>;
    doctorCount: number;
    doctorNames: string[];
  }>();
  DOCTORS.forEach((doc) => {
    if (!map.has(doc.hospital)) {
      map.set(doc.hospital, {
        name: doc.hospital,
        specialties: new Set(),
        diseaseAreas: new Set(),
        doctorCount: 0,
        doctorNames: [],
      });
    }
    const h = map.get(doc.hospital)!;
    h.doctorCount += 1;
    h.doctorNames.push(doc.name);
    if (doc.specialty) h.specialties.add(doc.specialty.replace(/\s*\(.*?\)/g, '').slice(0, 6));
    if (doc.diseaseArea) h.diseaseAreas.add(doc.diseaseArea);
  });
  return Array.from(map.values()).map((h) => ({
    ...h,
    specialties: Array.from(h.specialties).slice(0, 4),
    diseaseAreas: Array.from(h.diseaseAreas),
  }));
}

const ALL_HOSPITALS = buildHospitalList();

// ─── Alias 확장 ───────────────────────────────────────────────────────────────
const SEARCH_ALIASES: Record<string, string[]> = {
  '허리디스크': ['디스크', '척추'],
  '요추': ['척추', '디스크'],
  '목디스크': ['디스크', '척추'],
};

function getSearchTokens(q: string): string[] {
  return q.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

function doctorMatchesQuery(d: (typeof DOCTORS)[number], q: string): boolean {
  const tokens = getSearchTokens(q);
  if (tokens.length === 0) return false;
  const matchTerm = (term: string) =>
    d.name.toLowerCase().includes(term) ||
    d.hospital.toLowerCase().includes(term) ||
    d.specialty.toLowerCase().includes(term) ||
    (d.diseaseArea || '').toLowerCase().includes(term) ||
    (d.tags || []).some((t) => t.toLowerCase().includes(term));

  if (tokens.length === 1) {
    const expanded = [tokens[0], ...(SEARCH_ALIASES[tokens[0]] || [])];
    return expanded.some(matchTerm);
  }
  return tokens.every(matchTerm);
}

function hospitalNameMatchesQuery(h: { name: string }, q: string): boolean {
  const tokens = getSearchTokens(q);
  if (tokens.length === 0) return false;
  const n = h.name.toLowerCase();
  if (tokens.length === 1) return n.includes(q.trim().toLowerCase());
  return tokens.every((t) => n.includes(t));
}

function postMatchesQuery(p: CommunityPost, q: string): boolean {
  const tokens = getSearchTokens(q);
  if (tokens.length === 0) return false;
  const matchTerm = (term: string) =>
    p.title.toLowerCase().includes(term) ||
    (postPlainBodyText(p) || '').toLowerCase().includes(term) ||
    (p.disease || '').toLowerCase().includes(term) ||
    p.department.toLowerCase().includes(term) ||
    (p.relatedDoctors || []).some((name) => name.toLowerCase().includes(term));

  if (tokens.length === 1) {
    const expanded = [tokens[0], ...(SEARCH_ALIASES[tokens[0]] || [])];
    return expanded.some(matchTerm);
  }
  return tokens.every(matchTerm);
}

// ─── 증상어 판별 ──────────────────────────────────────────────────────────────
const SYMPTOM_VERB_ENDINGS = [
  '아요', '어요', '해요', '아파요', '아파', '아픔', '아프다',
  '있어요', '없어요', '심해요', '심해', '심하다',
  '납니다', '습니다', 'ㅂ니다', '이에요', '예요',
  '느껴요', '느껴', '합니다', '힘들어요', '힘들어',
];
const SYMPTOM_NOUNS = [
  '기침', '두통', '발열', '열감', '복통', '구역질', '구토', '설사',
  '변비', '어지럼', '어지러움', '피로감', '피로', '불면', '불면증',
  '가려움', '부종', '저림', '이명', '흉통', '혈뇨', '혈변', '오한',
  '호흡곤란', '소화불량', '식욕부진', '체중감소', '관절통', '근육통',
];

function detectSymptomQuery(q: string): boolean {
  if (!q) return false;
  const hasVerbEnding = SYMPTOM_VERB_ENDINGS.some((e) => q.endsWith(e));
  const hasSymptomNoun = SYMPTOM_NOUNS.some((k) => q.includes(k));
  if (q.includes(' ') && (hasVerbEnding || hasSymptomNoun)) return true;
  if (hasVerbEnding) return true;
  return false;
}

// ─── 하이라이트 유틸 ──────────────────────────────────────────────────────────
function highlight(text: string, query: string) {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-100 text-yellow-800 rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

// ─── 탭 타입 ──────────────────────────────────────────────────────────────────
type SearchTab = '명의' | '병원' | '커뮤니티';
const PAGE_SIZE = 10;
const PREVIEW_LIMIT = 3;

// ─── Props ────────────────────────────────────────────────────────────────────
interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDoctorSearch: (query: string) => void;
  onNavigateToCommunity: (searchQuery?: string) => void;
  onNavigateToChat?: (initialMessage?: string) => void;
  initialQuery?: string;
}

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────
export function GlobalSearchModal({
  isOpen,
  onClose,
  onNavigateToDoctorSearch,
  onNavigateToCommunity,
  onNavigateToChat,
  initialQuery,
}: GlobalSearchModalProps) {
  const [query, setQuery] = useState(initialQuery || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedHospital, setSelectedHospital] = useState<HospitalInfo | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  /** 검색 결과 목록·상세 모달 공감 수 동기화 (세션 동안만 유지) */
  const [postLikeOverrides, setPostLikeOverrides] = useState<
    Record<string, { likeCount: number; isLiked: boolean }>
  >({});
  const [isInputFocused, setIsInputFocused] = useState(false);

  // ── 사용량 제한 ──
  const {
    consumeSearch, consumeProfileView, consumePostView,
    searchRemaining, profileViewRemaining, postViewRemaining,
    canSearch, openLimitModal,
  } = useUsageLimitContext();
  const { isGuest } = useUser();
  const [searchBlocked, setSearchBlocked] = useState(false);
  const searchCounted = useRef(false);

  // ── 탭 & 무한 스크롤 상태 ──
  const [activeSearchTab, setActiveSearchTab] = useState<SearchTab>('명의');
  const [doctorVisible, setDoctorVisible] = useState(PAGE_SIZE);
  const [hospitalVisible, setHospitalVisible] = useState(PAGE_SIZE);
  const [postVisible, setPostVisible] = useState(PAGE_SIZE);

  const doctorSentinelRef = useRef<HTMLDivElement>(null);
  const hospitalSentinelRef = useRef<HTMLDivElement>(null);
  const postSentinelRef = useRef<HTMLDivElement>(null);

  // ── 초기화 ──
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery || '');
      setIsInputFocused(false);
      setSearchBlocked(false);
      searchCounted.current = false;
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen, initialQuery]);

  // ── 쿼리가 처음 비어 있지 않아질 때 1회 소비 (initialQuery 포함 통합 처리) ──
  useEffect(() => {
    if (!isOpen || !query.trim() || searchCounted.current) return;
    searchCounted.current = true;
    const allowed = consumeSearch();
    if (!allowed) setSearchBlocked(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, query]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // ── q: 검색어 정규화 ──
  const q = query.trim().toLowerCase();

  // ── 쿼리 변경 시 페이지 리셋 + 공감 오버레이 초기화 ──
  useEffect(() => {
    setDoctorVisible(PAGE_SIZE);
    setHospitalVisible(PAGE_SIZE);
    setPostVisible(PAGE_SIZE);
    setPostLikeOverrides({});
  }, [q]);

  // ── 검색 결과 ──
  const isSymptomQuery = detectSymptomQuery(q);

  const doctorResults = useMemo(
    () => (q && !isSymptomQuery ? DOCTORS.filter((d) => doctorMatchesQuery(d, q)) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q, isSymptomQuery],
  );

  const hospitalResults = useMemo(
    () => (q && !isSymptomQuery ? ALL_HOSPITALS.filter((h) => hospitalNameMatchesQuery(h, q)) : []),
    [q, isSymptomQuery],
  );

  const postResults = useMemo(
    () => (q ? communityPosts.filter((p) => postMatchesQuery(p, q)) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q],
  );

  const mergedPostResults = useMemo(
    () =>
      postResults.map((p) => {
        const o = postLikeOverrides[p.id];
        return o ? { ...p, likeCount: o.likeCount, isLiked: o.isLiked } : p;
      }),
    [postResults, postLikeOverrides]
  );

  const isDiseaseQuery = !isSymptomQuery && doctorResults.length > 0 &&
    doctorResults.some((d) =>
      (d.diseaseArea || '').toLowerCase().includes(q) ||
      (d.tags || []).some((t) => t.replace('#', '').toLowerCase().includes(q))
    );

  const totalCount = doctorResults.length + hospitalResults.length + postResults.length;
  const hasResults = totalCount > 0;

  // ── 쿼리 변경 시 탭 자동 선택 (결과 있는 첫 탭으로) ──
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!q) return;
    if (doctorResults.length > 0) setActiveSearchTab('명의');
    else if (hospitalResults.length > 0) setActiveSearchTab('병원');
    else setActiveSearchTab('커뮤니티');
  }, [q]);

  // ── 탭 목록 (결과 있는 탭만 표시) ──
  const tabs = useMemo(() => {
    const list: { key: SearchTab; label: string; count: number }[] = [];
    if (doctorResults.length > 0) list.push({ key: '명의', label: '명의', count: doctorResults.length });
    if (hospitalResults.length > 0) list.push({ key: '병원', label: '병원', count: hospitalResults.length });
    if (postResults.length > 0) list.push({ key: '커뮤니티', label: '커뮤니티', count: postResults.length });
    return list;
  }, [doctorResults.length, hospitalResults.length, postResults.length]);

  // ── 무한 스크롤 — 명의 ──
  useEffect(() => {
    if (activeSearchTab !== '명의') return;
    const el = doctorSentinelRef.current;
    if (!el || doctorVisible >= doctorResults.length) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setDoctorVisible((v) => v + PAGE_SIZE); },
      { rootMargin: '120px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [activeSearchTab, doctorVisible, doctorResults.length]);

  // ── 무한 스크롤 — 병원 ──
  useEffect(() => {
    if (activeSearchTab !== '병원') return;
    const el = hospitalSentinelRef.current;
    if (!el || hospitalVisible >= hospitalResults.length) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHospitalVisible((v) => v + PAGE_SIZE); },
      { rootMargin: '120px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [activeSearchTab, hospitalVisible, hospitalResults.length]);

  // ── 무한 스크롤 — 커뮤니티 ──
  useEffect(() => {
    if (activeSearchTab !== '커뮤니티') return;
    const el = postSentinelRef.current;
    if (!el || postVisible >= mergedPostResults.length) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setPostVisible((v) => v + PAGE_SIZE); },
      { rootMargin: '120px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [activeSearchTab, postVisible, mergedPostResults.length]);

  // ── 핸들러 ──
  const handleDoctorClick = useCallback((doc: Doctor) => {
    const allowed = consumeProfileView();
    if (allowed) setSelectedDoctor(doc);
  }, [consumeProfileView]);

  const handleHospitalClick = useCallback(
    (hosp: { name: string; doctorCount: number; specialties: string[] }) => {
      setSelectedHospital(getHospitalInfo(hosp.name, { doctorCount: hosp.doctorCount, specialties: hosp.specialties }));
    },
    []
  );

  const handlePostClick = useCallback((post: CommunityPost) => {
    const allowed = consumePostView();
    if (allowed) setSelectedPost(post);
  }, [consumePostView]);

  const handleSearchPostToggleLike = useCallback((postId: string) => {
    setPostLikeOverrides((prev) => {
      const base = communityPosts.find((p) => p.id === postId);
      if (!base) return prev;
      const cur = prev[postId];
      const isLiked = cur?.isLiked ?? base.isLiked ?? false;
      const likeCount = cur?.likeCount ?? base.likeCount;
      return {
        ...prev,
        [postId]: {
          isLiked: !isLiked,
          likeCount: isLiked ? likeCount - 1 : likeCount + 1,
        },
      };
    });
    setSelectedPost((sp) => {
      if (!sp || sp.id !== postId) return sp;
      const isLiked = sp.isLiked ?? false;
      return {
        ...sp,
        isLiked: !isLiked,
        likeCount: isLiked ? sp.likeCount - 1 : sp.likeCount + 1,
      };
    });
  }, []);

  const handleMoreDoctors = useCallback(() => {
    onNavigateToDoctorSearch(query.trim());
    onClose();
  }, [onNavigateToDoctorSearch, query, onClose]);

  const handleAigaClick = useCallback(() => {
    if (onNavigateToChat) {
      onNavigateToChat(query.trim());
      onClose();
    }
  }, [onNavigateToChat, query, onClose]);

  const suggestions = useMemo(
    () => (isInputFocused && extractLastWord(query) ? buildSuggestions(query) : []),
    [isInputFocused, query]
  );
  const showSuggestions = isInputFocused && extractLastWord(query).length > 0 && suggestions.length > 0;

  const handleSuggestionSelect = useCallback(
    (label: string) => {
      const words = query.trim().split(/\s+/).filter(Boolean);
      if (words.length > 0) words[words.length - 1] = label;
      else words.push(label);
      setQuery(words.join(' '));
      setIsInputFocused(false);
    },
    [query]
  );

  // ── 통합 차단 상태: 시도 후 거절됐거나, 이미 한도 소진 상태에서 쿼리 입력 ──
  const effectivelyBlocked =
    searchBlocked || (isGuest && !canSearch && !!query.trim() && !searchCounted.current);

  if (!isOpen) return null;

  // ─── 카드 렌더 헬퍼 ──────────────────────────────────────────────────────────
  const renderDoctorCard = (doc: Doctor) => (
    <button
      key={doc.id}
      onClick={() => handleDoctorClick(doc)}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
    >
      <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
        {doc.image ? (
          <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
        ) : (
          <User className="w-5 h-5 text-gray-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{highlight(doc.name, query)}</p>
        <p className="text-xs text-gray-500 truncate">
          {doc.hospital} · {highlight(doc.specialty.replace(/\s*\(.*?\)/g, ''), query)}
        </p>
        {doc.tags && doc.tags.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {doc.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">{tag}</span>
            ))}
          </div>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
    </button>
  );

  const renderHospitalCard = (hosp: { name: string; doctorCount: number; specialties: string[] }) => (
    <button
      key={hosp.name}
      onClick={() => handleHospitalClick(hosp)}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
    >
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Building2 className="w-5 h-5 text-blue-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{highlight(hosp.name, query)}</p>
        <p className="text-xs text-gray-500">소속 명의 {hosp.doctorCount}명</p>
        {hosp.specialties.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {hosp.specialties.map((sp, i) => (
              <span key={i} className="text-xs text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">{sp}</span>
            ))}
          </div>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
    </button>
  );

  const renderPostCard = (post: CommunityPost) => (
    <button
      key={post.id}
      onClick={() => handlePostClick(post)}
      className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
    >
      <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <MessageCircle className="w-5 h-5 text-purple-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 line-clamp-1 flex items-start gap-1.5">
          <span className="flex-1">{highlight(post.title, query)}</span>
          {post.isVerified && (
            <VerificationBadge type="verified" size="sm" />
          )}
        </p>
        {post.disease && (
          <div className="mt-0.5 mb-0.5">
            <span className="text-xs text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
              {highlight(post.disease, query)}
            </span>
          </div>
        )}
        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{postPlainBodyText(post)}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="flex items-center gap-0.5 text-xs text-gray-400">
            <Heart className="w-3 h-3" />{post.likeCount}
          </span>
          <span className="flex items-center gap-0.5 text-xs text-gray-400">
            <MessageCircle className="w-3 h-3" />{post.comments}
          </span>
          <span className="text-xs text-gray-300">{post.timeAgo}</span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
    </button>
  );

  const renderLoadingSpinner = () => (
    <div className="flex justify-center items-center py-6">
      <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
    </div>
  );

  // ─── JSX ─────────────────────────────────────────────────────────────────────
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-white">

      {/* ── 검색 헤더 ── */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 flex-shrink-0">
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { if (!effectivelyBlocked) setQuery(e.target.value); }}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') { setIsInputFocused(false); onClose(); }
              if (e.key === 'Enter') { setIsInputFocused(false); }
            }}
            placeholder={effectivelyBlocked ? '오늘 무료 검색을 모두 사용했어요' : '명의, 병원, 질환, 게시글 검색'}
            readOnly={effectivelyBlocked}
            className={`w-full text-base outline-none bg-transparent transition-colors ${
              effectivelyBlocked
                ? 'placeholder-amber-400 cursor-not-allowed'
                : 'placeholder-gray-400'
            }`}
          />
          {showSuggestions && !effectivelyBlocked && (
            <SearchSuggestions
              suggestions={suggestions}
              query={query}
              onSelect={handleSuggestionSelect}
            />
          )}
        </div>
        {query && !effectivelyBlocked && (
          <button
            onClick={() => setQuery('')}
            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
          >
            <X className="w-3.5 h-3.5 text-gray-500" />
          </button>
        )}
        {/* 잠금 아이콘 (소진 시) */}
        {effectivelyBlocked && (
          <button
            onClick={() => openLimitModal('search')}
            className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-600 rounded-full px-3 py-1 text-xs font-semibold hover:bg-amber-100 transition-colors flex-shrink-0"
          >
            <Lock className="w-3.5 h-3.5" />
            가입하기
          </button>
        )}
        <button
          onClick={onClose}
          className="text-sm text-gray-500 font-medium flex-shrink-0 pl-1"
        >
          취소
        </button>
      </div>

      {/* ── 사용량 배너 (소진/경고) — 검색 헤더 바로 아래 고정 ── */}
      {isGuest && (
        <UsageLimitBanner types={['search']} />
      )}

      {/* ── 탭 바 — 결과 있을 때만 ── */}
      {q && !isSymptomQuery && hasResults && (
        <div className="flex border-b border-gray-200 bg-white flex-shrink-0 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSearchTab(tab.key)}
              className={`relative flex-shrink-0 flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors
                ${activeSearchTab === tab.key ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full
                  ${activeSearchTab === tab.key
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-400'}`}>
                  {tab.count}
                </span>
              )}
              {activeSearchTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── 바디 ── */}
      <div key={`${q}-${activeSearchTab}`} className="flex-1 overflow-y-auto">

        {/* ── 검색 차단 상태 (한도 초과) ── */}
        {effectivelyBlocked && (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-amber-500" />
            </div>
            <p className="text-gray-900 mb-1">오늘 무료 검색을 모두 사용했어요</p>
            <p className="text-sm text-gray-400 mb-6">내일 자정에 초기화되거나, 지금 가입하면 바로 이용할 수 있어요</p>
            <button
              onClick={() => openLimitModal('search')}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>회원가입 · 로그인</span>
            </button>
          </div>
        )}

        {/* ── 잔여 검색 경고 배너 (비회원, 1회 남음) ── */}
        {q && !effectivelyBlocked && isGuest && searchRemaining === 1 && (
          <div className="mx-4 mt-3 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            <Lock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <p className="text-xs text-amber-700">오늘 무료 검색 <span className="font-semibold">1회</span> 남았어요. 가입하면 무제한으로 이용할 수 있어요.</p>
          </div>
        )}

        {/* ── 검색 전 Empty State ── */}
        {!q && !effectivelyBlocked && (
          <div className="px-4 py-5">
            {onNavigateToChat && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-900 mb-0.5">증상이 있으신가요?</p>
                    <p className="text-xs text-blue-700">Aiga에게 직접 물어보세요. 명의 및 병원을 추천해드요.</p>
                  </div>
                  <button
                    onClick={() => { onNavigateToChat(); onClose(); }}
                    className="text-xs text-blue-600 font-semibold bg-white border border-blue-200 rounded-full px-3 py-1.5 hover:bg-blue-50 transition-colors flex-shrink-0"
                  >
                    질문하기
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── 증상어 감지 화면 ── */}
        {q && !effectivelyBlocked && isSymptomQuery && (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-900 mb-1">
              <span className="font-semibold">'{query}'</span>
            </p>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              증상 검색은 검색보다 Aiga 상담이<br />더 정확한 도움을 드릴 수 있어요.
            </p>
            {onNavigateToChat && (
              <button
                onClick={handleAigaClick}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition-colors"
              >
                <Bot className="w-4 h-4" />
                <span className="font-semibold">Aiga에게 질문하기</span>
              </button>
            )}
            <p className="text-xs text-gray-400 mt-4">검색어를 바꿔서 명의나 병원을 찾을 수도 있어요</p>
          </div>
        )}

        {/* ── 결과 없음 ── */}
        {q && !effectivelyBlocked && !isSymptomQuery && !hasResults && (
          <div className="py-8 px-4">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <SearchX className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                질환명, 병원명, 의사 이름이 정확한지 확인해 주세요.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                검색어가 정확한지 확인하거나 다른 키워드로 검색해보세요
              </p>
            </div>
            {onNavigateToChat && (
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleAigaClick}
                  className="w-full p-5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl text-left hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <p className="text-white text-base mb-1 font-medium">원하는 의사를 못 찾으셨나요?</p>
                    <p className="text-blue-100 text-sm">AI챗봇에게 물어보시면 질환에 딱 맞는 명의를 찾을 수 있어요.</p>
                  </div>
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                    <Bot className="w-12 h-12 text-white" />
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════
            결과 탭: 명의 (무한 스크롤)
        ════════════════════════════════ */}
        {q && !effectivelyBlocked && !isSymptomQuery && activeSearchTab === '명의' && (
          <div className="pb-6">
            <div className="divide-y divide-gray-50">
              {doctorResults.slice(0, doctorVisible).map(renderDoctorCard)}
            </div>
            {doctorVisible < doctorResults.length
              ? <div ref={doctorSentinelRef}>{renderLoadingSpinner()}</div>
              : (
                <div className="py-4 text-center text-xs text-gray-400">
                  명의 {doctorResults.length}명 모두 표시됨
                </div>
              )
            }
            {/* 명의찾기 페이지 이동 */}
            <div className="px-4 pt-2 pb-2">
              <button
                onClick={handleMoreDoctors}
                className="w-full py-3 text-sm text-blue-600 font-medium border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-1"
              >
                <User className="w-4 h-4" />
                명의찾기 페이지에서 더 보기
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════
            결과 탭: 병원 (무한 스크롤)
        ════════════════════════════════ */}
        {q && !effectivelyBlocked && !isSymptomQuery && activeSearchTab === '병원' && (
          <div className="pb-6">
            <div className="divide-y divide-gray-50">
              {hospitalResults.slice(0, hospitalVisible).map(renderHospitalCard)}
            </div>
            {hospitalVisible < hospitalResults.length
              ? <div ref={hospitalSentinelRef}>{renderLoadingSpinner()}</div>
              : (
                <div className="py-4 text-center text-xs text-gray-400">
                  병원 {hospitalResults.length}개 모두 표시됨
                </div>
              )
            }
          </div>
        )}

        {/* ════════════════════════════════
            결과 탭: 커뮤니티 (무한 스크롤)
        ════════════════════════════════ */}
        {q && !effectivelyBlocked && !isSymptomQuery && activeSearchTab === '커뮤니티' && (
          <div className="pb-6">
            <div className="divide-y divide-gray-50">
              {mergedPostResults.slice(0, postVisible).map(renderPostCard)}
            </div>
            {postVisible < mergedPostResults.length
              ? <div ref={postSentinelRef}>{renderLoadingSpinner()}</div>
              : mergedPostResults.length > 0 && (
                <div className="py-4 text-center text-xs text-gray-400">
                  게시글 {mergedPostResults.length}개 모두 확인했습니다
                </div>
              )
            }
            {/* 커뮤니티 페이지 이동 */}
            {mergedPostResults.length > 0 && (
              <div className="px-4 pt-2 pb-2">
                <button
                  onClick={() => { onNavigateToCommunity(query.trim()); onClose(); }}
                  className="w-full py-3 text-sm text-blue-600 font-medium border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  커뮤니티 페이지에서 더 보기
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── 서브 모달들 ── */}
      {selectedHospital && (
        <HospitalCardModal
          hospital={selectedHospital}
          onClose={() => setSelectedHospital(null)}
        />
      )}
      {selectedDoctor && (
        <DoctorProfileModal
          doctor={{
            id: selectedDoctor.id,
            name: selectedDoctor.name,
            specialty: selectedDoctor.specialty,
            hospital: selectedDoctor.hospital,
            experience: selectedDoctor.experience,
            education: selectedDoctor.education,
            verified: selectedDoctor.verified,
            rating: selectedDoctor.rating,
            reviewCount: selectedDoctor.reviewCount,
            profileImage: selectedDoctor.image,
          }}
          isOpen={!!selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
      {selectedPost && (
        <CommunityPostModal
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          onNavigateToCommunity={() => {
            setSelectedPost(null);
            onNavigateToCommunity();
            onClose();
          }}
          onToggleLike={handleSearchPostToggleLike}
        />
      )}
    </div>
  );
}