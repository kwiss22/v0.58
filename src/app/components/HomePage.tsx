// 홈 페이지

import { useState, useRef, useEffect, useCallback } from 'react';
import { getTopDoctors, DISEASE_CATEGORIES, DOCTORS } from '@/constants/doctor-data';
import { DoctorProfileModal } from './DoctorProfileModal';
import { CommunityPostModal } from './CommunityPostModal';
import { UsageLimitBanner } from './UsageLimitBanner';
import { Doctor } from '@/types/chat.types';
import { communityPosts } from '@/constants/community-data';
import type { CommunityPost } from '@/constants/community-data';
import { useAppNavigation } from '../contexts/AppNavigationContext';
import { useUser } from '../contexts/UserContext';
import { useUsageLimitContext } from '../contexts/UsageLimitContext';
import {
  HomeHeader,
  AigaBanner,
  DiseaseTab,
  SectionHeader,
  PopularDoctorCard,
  HealthInfoCard,
  CommunityPostCard,
} from './home';
import { HomeDemoTagChip } from './tagMatching/HomeDemoTagChip';
import { HOME_DEMO_TAG_MAP, type HomeDemoTagId } from './tagMatching/homeTabTagRegistry';

interface HomePageProps {
  onNavigateToChat: () => void;
  onNavigateToCommunity: () => void;
}

// 건강 정보 기사 전체 목록
const allHealthArticles = [
  {
    title: '폐암 조기 발견의 중요성',
    description: '폐암은 조기 발견 시 5년 생존율이 70% 이상으로 높아집니다. 정기 검진이 중요합니다.',
    timeAgo: '2분 전',
    url: 'https://kormedi.com/1635887',
  },
  {
    title: '당뇨병 관리, 식단이 핵심',
    description: '당뇨병 환자의 혈당 관리는 올바른 식단 선택에서 시작됩니다. 전문가가 알려주는 식...',
    timeAgo: '1시간 전',
    url: 'https://kormedi.com/1635885',
  },
  {
    title: '고혈압 예방을 위한 생활습관',
    description: '나트륨 섭취 줄이기, 규칙적인 운동으로 고혈압을 예방하는 방법을 소개합니다.',
    timeAgo: '3시간 전',
    url: 'https://kormedi.com/1635880',
  },
  {
    title: '간 건강 지키는 5가지 방법',
    description: '간은 침묵의 장기입니다. 간 건강을 지키기 위한 쉬운 습관 5가지와 정기 검진의 중요성.',
    timeAgo: '5시간 전',
    url: 'https://kormedi.com/1635875',
  },
  {
    title: '심장 건강, 걷기 운동으로 지키세요',
    description: '하루 30분 걷기 운동으로 심혈관 질환 위험을 50% 감소시킬 수 있습니다.',
    timeAgo: '7시간 전',
    url: 'https://kormedi.com/1635870',
  },
  {
    title: '스트레스 관리가 면역력을 높입니다',
    description: '만성 스트레스는 면역 체계를 약화시킵니다. 효과적인 스트레스 해소 방법을 알아보세요.',
    timeAgo: '9시간 전',
    url: 'https://kormedi.com/1635865',
  },
  {
    title: '숙면을 위한 7가지 습관',
    description: '불면증으로 고생하시나요? 수면의 질을 높이는 과학적인 방법들을 소개합니다.',
    timeAgo: '11시간 전',
    url: 'https://kormedi.com/1635860',
  },
  {
    title: '비타민D 결핍, 겨울철 특히 주의',
    description: '겨울철 햇빛 부족으로 비타민D가 결핍되기 쉽습니다. 보충 방법과 필요성을 알아봅니다.',
    timeAgo: '13시간 전',
    url: 'https://kormedi.com/1635855',
  },
  {
    title: '장 건강이 전체 건강의 시작',
    description: '프로바이오틱스와 식이섬유로 장 건강을 지키는 방법을 전문가가 설명합니다.',
    timeAgo: '15시간 전',
    url: 'https://kormedi.com/1635850',
  },
  {
    title: '눈 건강, 스마트폰 사용 줄이기',
    description: '디지털 기기 사용 증가로 안구 건조증과 시력 저하가 늘고 있습니다. 예방법을 알아보세요.',
    timeAgo: '1일 전',
    url: 'https://kormedi.com/1635845',
  },
  {
    title: '뼈 건강을 위한 칼슘 섭취법',
    description: '골다공증 예방을 위한 적절한 칼슘 섭취량과 흡수율을 높이는 방법을 소개합니다.',
    timeAgo: '1일 전',
    url: 'https://kormedi.com/1635840',
  },
  {
    title: '알레르기 비염, 환절기 대처법',
    description: '환절기 알레르기 비염 증상 완화를 위한 생활 속 실천 방법들을 정리했습니다.',
    timeAgo: '1일 전',
    url: 'https://kormedi.com/1635835',
  },
];

export function HomePage({ onNavigateToChat, onNavigateToCommunity }: HomePageProps) {
  const {
    homeSelectedCategory,
    setHomeSelectedCategory,
    selectedDoctor,
    setSelectedDoctor,
    setActiveTab,
    openSpecSection,
    pendingCommunityPostPreviewId,
    clearPendingCommunityPostPreview,
    pendingOpenReviewWriteOnProfile,
    clearPendingOpenReviewWriteOnProfile,
  } = useAppNavigation();

  const { setRole } = useUser();
  const navigateHomeSpecTag = (tagId: HomeDemoTagId) => {
    const entry = HOME_DEMO_TAG_MAP[tagId];
    setRole('guest');
    setActiveTab('home');
    openSpecSection({ tab: 'home', sectionId: entry.specSectionId });
  };
  const { consumePostView, consumeProfileView } = useUsageLimitContext();
  const [showPostModal, setShowPostModal] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(() =>
    allHealthArticles.slice(0, 4).map((a, i) => ({ ...a, key: `article-${i}` }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [articleCounter, setArticleCounter] = useState(4);
  const [randomPost, setRandomPost] = useState<CommunityPost | null>(null);
  const [homeRecommendedPosts, setHomeRecommendedPosts] = useState<CommunityPost[]>(() =>
    communityPosts.slice(0, 5)
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  /** 공통 정의서 CM02 — 스펙 버튼으로 게시글 상세 열기 (조회 한도와 무관) */
  useEffect(() => {
    if (!pendingCommunityPostPreviewId) return;
    const post = communityPosts.find((p) => p.id === pendingCommunityPostPreviewId);
    if (post) {
      setRandomPost(post);
      setShowPostModal(true);
    }
    clearPendingCommunityPostPreview();
  }, [pendingCommunityPostPreviewId, clearPendingCommunityPostPreview]);

  const topDoctors = getTopDoctors(6);

  const handleHomeRecommendedToggleLike = useCallback((postId: string) => {
    setHomeRecommendedPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1,
              isLiked: !p.isLiked,
            }
          : p
      )
    );
    setRandomPost((prev) => {
      if (!prev || prev.id !== postId) return prev;
      return {
        ...prev,
        likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
        isLiked: !prev.isLiked,
      };
    });
  }, []);

  // 선택된 카테고리에 따라 의료진 필터링
  const displayDoctors = homeSelectedCategory
    ? DOCTORS.filter((doctor) => {
        const category = DISEASE_CATEGORIES.find((c) => c.name === homeSelectedCategory);
        if (!category) return false;
        // diseaseArea로 필터링 (더 정확한 매칭)
        return doctor.diseaseArea === homeSelectedCategory;
      }).sort((a, b) => (b.rating || 0) - (a.rating || 0))
    : getTopDoctors(10);

  // 무한 스크롤 구현 — 항상 더 불러옴 (끝 없음)
  useEffect(() => {
    if (!loadMoreRef.current || !scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleArticles((prev) => {
              const nextItems = Array.from({ length: 4 }, (_, i) => {
                const idx = (articleCounter + i) % allHealthArticles.length;
                return { ...allHealthArticles[idx], key: `article-${articleCounter + i}` };
              });
              return [...prev, ...nextItems];
            });
            setArticleCounter((prev) => prev + 4);
            setIsLoading(false);
          }, 600);
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [isLoading, articleCounter]);

  return (
    <>
      <div className="h-full bg-gray-50 flex flex-col">
        {/* Header — H01 (우측은 App 레벨 통합검색 버튼과 겹치지 않게 왼쪽으로 배치) */}
        <div className="relative shrink-0">
          <HomeHeader />
          <HomeDemoTagChip
            tagId="H01"
            onNavigate={navigateHomeSpecTag}
            style={{ top: '0.875rem', right: '3.5rem' }}
          />
        </div>

        {/* 사용량 제한 통합 배너 — H02 */}
        <div className="relative shrink-0">
          <UsageLimitBanner types={['profileView', 'postView']} />
          <HomeDemoTagChip
            tagId="H02"
            onNavigate={navigateHomeSpecTag}
            style={{ top: '0.5rem', right: '0.5rem' }}
          />
        </div>

        {/* Scrollable Content */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-4 space-y-6 pb-32">
            {/* AI Chatbot Banner — H03 */}
            <div className="relative">
              <AigaBanner onClick={onNavigateToChat} />
              <HomeDemoTagChip
                tagId="H03"
                onNavigate={navigateHomeSpecTag}
                style={{ top: '0.5rem', right: '0.5rem' }}
              />
            </div>

            {/* Disease Categories — H04 */}
            <div className="relative space-y-4">
              <HomeDemoTagChip
                tagId="H04"
                onNavigate={navigateHomeSpecTag}
                style={{ top: 0, right: 0 }}
              />
              <h3 className="text-lg font-bold text-gray-900 pr-14">주요 질환 인기 명의</h3>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {DISEASE_CATEGORIES.map((category) => (
                  <DiseaseTab
                    key={category.name}
                    label={category.name}
                    isActive={homeSelectedCategory === category.name}
                    onClick={() => setHomeSelectedCategory(category.name)}
                  />
                ))}
              </div>

              <div className="space-y-3">
                {displayDoctors.slice(0, 7).map((doctor) => (
                  <PopularDoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onClick={() => { const allowed = consumeProfileView(); if (!allowed) return; setSelectedDoctor(doctor); }}
                  />
                ))}
              </div>
            </div>

            {/* 커뮤니티 추천글 — H05 */}
            <div className="relative space-y-3">
              <HomeDemoTagChip
                tagId="H05"
                onNavigate={navigateHomeSpecTag}
                style={{ top: 0, right: 0 }}
              />
              <div className="flex items-center justify-between pr-14">
                <h3 className="text-base text-gray-900" style={{ fontWeight: 700 }}>커뮤니티 추천글</h3>
                <button
                  onClick={() => onNavigateToCommunity()}
                  className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
                >
                  더보기 →
                </button>
              </div>
              <div
                className="flex gap-3 pb-3 -mx-4 px-4"
                style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
              >
                {homeRecommendedPosts.map((post) => (
                  <CommunityPostCard
                    key={post.id}
                    post={post}
                    onClick={() => {
                      const allowed = consumePostView();
                      if (!allowed) return;
                      setRandomPost(post);
                      setShowPostModal(true);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Health Info — H06 */}
            <div className="relative space-y-4">
              <HomeDemoTagChip
                tagId="H06"
                onNavigate={navigateHomeSpecTag}
                style={{ top: 0, right: 0 }}
              />
              <div className="pr-14">
                <SectionHeader title="건강 정보" />
              </div>
              <div className="space-y-3">
                {visibleArticles.map((article) => (
                  <HealthInfoCard
                    key={article.key}
                    title={article.title}
                    description={article.description}
                    timeAgo={article.timeAgo}
                    onClick={() => window.open(article.url, '_blank')}
                  />
                ))}
              </div>

              {/* 로딩 인디케이터 */}
              {isLoading && (
                <div className="flex justify-center py-4">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* 무한 스크롤 트리거 */}
              <div ref={loadMoreRef} className="h-4" />
            </div>
          </div>
        </div>

        {/* Doctor Detail Modal */}
        {selectedDoctor && (
          <DoctorProfileModal
            doctor={selectedDoctor}
            isOpen={!!selectedDoctor}
            onClose={() => {
              setSelectedDoctor(null);
              clearPendingOpenReviewWriteOnProfile();
            }}
            openReviewWriteOnMount={pendingOpenReviewWriteOnProfile}
            onOpenReviewWriteConsumed={clearPendingOpenReviewWriteOnProfile}
          />
        )}

        {/* Community Post Modal */}
        {randomPost && (
          <CommunityPostModal
            post={randomPost}
            isOpen={showPostModal}
            onClose={() => setShowPostModal(false)}
            onNavigateToCommunity={onNavigateToCommunity}
            onToggleLike={handleHomeRecommendedToggleLike}
          />
        )}
      </div>
    </>
  );
}