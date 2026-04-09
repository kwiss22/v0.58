// 커뮤니티 페이지 - 신뢰도와 공감이 느껴지는 피드 디자인
import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Plus, User, X, Search, ArrowLeft } from 'lucide-react';
import { WritePostModal } from '@/app/components/WritePostModal';
import { PostDetailModal } from '@/app/components/PostDetailModal';
import { VerificationBadge } from '@/app/components/VerificationBadge';
import { UserProfileModal } from '@/app/components/UserProfileModal';
import { LoginRequiredToast } from '@/app/components/LoginRequiredToast';
import { SuccessToast } from '@/app/components/SuccessToast';
import { useUser } from '@/app/contexts/UserContext';
import { communityPosts as initialPosts, CommunityPost, postPlainBodyText, type PostBodySegment } from '@/constants/community-data';
import { PostBodySegments } from '@/app/components/community/PostBodySegments';
import { DISEASE_LIST, POPULAR_DISEASES } from '@/constants/disease-list';
import { useUsageLimitContext } from '@/app/contexts/UsageLimitContext';
import { UsageLimitBanner } from '@/app/components/UsageLimitBanner';
import { ResizedImage } from '@/app/utils/imageResize';

interface CommunityPageProps {
  onNavigateToChat: () => void;
  onNavigateToDoctors: () => void;
}

type DepartmentCategory = '전체' | '내과' | '외과' | '소아과' | '피부과' | '정신과' | '정형외과' | '안과' | '이비인후과' | '산부인과' | '기타';
type FilterType = 'disease' | 'department';
type UserFilter = string | null;
type Post = CommunityPost;

const departmentCategories: DepartmentCategory[] = ['전체', '내과', '외과', '소아과', '피부과', '정신과', '정형외과', '안과', '이비인후과', '산부인과', '기타'];
const DRAFT_KEY = 'aiga_post_draft';

export function CommunityPage({ onNavigateToChat, onNavigateToDoctors }: CommunityPageProps) {
  const { isMember, isGuest, user } = useUser();
  const { consumePostView } = useUsageLimitContext();

  const [filterType, setFilterType] = useState<FilterType>('disease');
  const [sortOption, setSortOption] = useState<'latest' | 'popular'>('latest');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentCategory>('전체');
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userFilter, setUserFilter] = useState<UserFilter>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginFeature, setLoginFeature] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // 임시저장 배너
  const [hasDraft, setHasDraft] = useState(false);

  // 질환 검색 모드
  const [isSearchingDisease, setIsSearchingDisease] = useState(false);
  const [diseaseSearchQuery, setDiseaseSearchQuery] = useState('');
  const diseaseSearchInputRef = useRef<HTMLInputElement>(null);

  // 마운트 시 임시저장 확인
  useEffect(() => {
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        const parsed = JSON.parse(draft);
        setHasDraft(!!(parsed?.title || parsed?.content));
      }
    } catch {
      setHasDraft(false);
    }
  }, []);

  // 질환 검색 모드 진입 시 인풋 포커스
  useEffect(() => {
    if (isSearchingDisease && diseaseSearchInputRef.current) {
      diseaseSearchInputRef.current.focus();
    }
  }, [isSearchingDisease]);

  // 질환 검색 결과
  const diseaseSearchResults = useMemo(() => {
    if (!diseaseSearchQuery.trim()) return [];
    const q = diseaseSearchQuery.toLowerCase();
    return DISEASE_LIST.filter(d => d.toLowerCase().includes(q)).slice(0, 10);
  }, [diseaseSearchQuery]);

  // 필터링된 게시글
  const filteredPosts = (() => {
    let result = posts;

    if (userFilter) {
      result = result.filter(post => post.userId === userFilter);
    } else {
      if (filterType === 'disease') {
        if (selectedCategory !== '전체') {
          result = result.filter(post => post.disease === selectedCategory);
        }
      } else {
        if (selectedDepartment !== '전체') {
          if (selectedDepartment === '기타') {
            result = result.filter(post => !departmentCategories.includes(post.department as DepartmentCategory));
          } else {
            result = result.filter(post => post.department === selectedDepartment);
          }
        }
      }
    }

    if (sortOption === 'popular') {
      return [...result].sort((a, b) => (b.likeCount + b.comments) - (a.likeCount + a.comments));
    }
    return result;
  })();

  // 로그인 유도
  const requireLogin = (feature: string) => {
    setLoginFeature(feature);
    setShowLoginModal(true);
  };

  // 게시글 클릭
  const handlePostClick = (post: Post) => {
    if (isGuest) {
      const ok = consumePostView();
      if (!ok) {
        requireLogin('게시글 보기');
        return;
      }
    }
    setSelectedPost(post);
  };

  // 좋아요 토글
  const handleToggleLike = (postId: string) => {
    if (isGuest) {
      requireLogin('공감');
      return;
    }
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1, isLiked: !p.isLiked }
          : p
      )
    );
    setSelectedPost(prev => {
      if (!prev || prev.id !== postId) return prev;
      return { ...prev, likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1, isLiked: !prev.isLiked };
    });
  };

  // 댓글 수 증가
  const handleCommentAdded = (postId: string) => {
    setPosts(prev =>
      prev.map(p => p.id === postId ? { ...p, comments: p.comments + 1 } : p)
    );
  };

  // 게시글 작성 제출
  const handleSubmitPost = (data: {
    title: string;
    content: string;
    department: string;
    userRole: 'patient' | 'caregiver';
    ageGroup?: string;
    disease?: string;
    emotion?: 'good' | 'normal' | 'bad' | 'very_bad';
    requestVerification?: boolean;
    verificationData?: { receiptImage?: string };
    attachedImages?: ResizedImage[];
    bodySegments?: PostBodySegment[];
  }) => {
    const newPost: Post = {
      id: String(Date.now()),
      userId: user?.id || 'user_me',
      nickname: user?.name || '나',
      userRole: data.userRole,
      ageGroup: data.ageGroup,
      department: data.department,
      disease: data.disease,
      emotion: data.emotion,
      title: data.title,
      summary: data.content,
      bodySegments: data.bodySegments,
      aiLabel: '',
      likeCount: 0,
      comments: 0,
      views: 0,
      timeAgo: '방금 전',
      isVerified: data.requestVerification,
      attachedImages: data.attachedImages?.map(img => ({
        id: img.id, url: img.url, name: img.name, thumbnail: img.thumbnail,
      })),
    };
    setPosts(prev => [newPost, ...prev]);
    setShowWriteModal(false);
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    setHasDraft(false);
    showToast('게시글이 등록되었어요!');
  };

  // 게시글 수정 제출
  const handleEditSubmit = (data: {
    title: string;
    content: string;
    department: string;
    userRole: 'patient' | 'caregiver';
    ageGroup?: string;
    disease?: string;
    emotion?: 'good' | 'normal' | 'bad' | 'very_bad';
    attachedImages?: ResizedImage[];
    bodySegments?: PostBodySegment[];
  }) => {
    if (!editingPost) return;
    const updated: Post = {
      ...editingPost,
      title: data.title,
      summary: data.content,
      bodySegments: data.bodySegments,
      department: data.department,
      userRole: data.userRole,
      ageGroup: data.ageGroup,
      disease: data.disease,
      emotion: data.emotion,
      attachedImages: data.attachedImages?.map(img => ({
        id: img.id, url: img.url, name: img.name, thumbnail: img.thumbnail,
      })),
      isEdited: true,
      editedAt: new Date().toISOString(),
    };
    setPosts(prev => prev.map(p => p.id === editingPost.id ? updated : p));
    if (selectedPost?.id === editingPost.id) setSelectedPost(updated);
    setEditingPost(null);
    showToast('게시글이 수정되었어요!');
  };

  // 게시글 삭제
  const handleDeletePost = () => {
    if (!selectedPost) return;
    setPosts(prev => prev.filter(p => p.id !== selectedPost.id));
    setSelectedPost(null);
    showToast('게시글이 삭제되었어요.');
  };

  // 성공 토스트
  const showToast = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessToast(true);
  };

  const handleCloseSuccessToast = () => setShowSuccessToast(false);

  // 커스텀 질환 칩 표시 여부 (POPULAR_DISEASES에 없는 질환 선택 시)
  const showCustomDiseaseChip = selectedCategory !== '전체' && !POPULAR_DISEASES.includes(selectedCategory);

  // userId → 익명 표시
  const formatUserId = (userId: string) => `익명${userId.slice(-2)}`;

  return (
    <div className="flex flex-col h-full relative">
      {/* ─── 헤더 ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-gray-900">커뮤니티</h1>
        </div>

        {/* ─── 카테고리 필터 (유저 필터 없을 때만) ─────────────── */}
        <AnimatePresence initial={false}>
          {!userFilter && (
            <motion.div
              key="category-filter"
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            >
              {/* 1차 필터: 질병별 / 진료과별 */}
              <div className="flex gap-2 px-4 pt-1 pb-2">
                <button
                  onClick={() => setFilterType('disease')}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filterType === 'disease' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  질병별
                </button>
                <button
                  onClick={() => setFilterType('department')}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filterType === 'department' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  진료과별
                </button>
              </div>

              {/* 2차 필터 */}
              {filterType === 'disease' ? (
                <AnimatePresence mode="wait" initial={false}>
                  {isSearchingDisease ? (
                    <motion.div
                      key="disease-search"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="px-4 pb-3"
                    >
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setIsSearchingDisease(false); setDiseaseSearchQuery(''); }}
                          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100"
                        >
                          <ArrowLeft className="w-4 h-4 text-gray-500" />
                        </button>
                        <div className="flex-1 relative">
                          <input
                            ref={diseaseSearchInputRef}
                            value={diseaseSearchQuery}
                            onChange={e => setDiseaseSearchQuery(e.target.value)}
                            placeholder="질환명 검색..."
                            className="w-full bg-gray-100 rounded-full px-4 py-1.5 text-sm outline-none"
                          />
                          {diseaseSearchQuery && (
                            <button
                              onClick={() => setDiseaseSearchQuery('')}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                              <X className="w-3.5 h-3.5 text-gray-400" />
                            </button>
                          )}
                        </div>
                      </div>
                      {diseaseSearchResults.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {diseaseSearchResults.map(d => (
                            <button
                              key={d}
                              onClick={() => { setSelectedCategory(d); setIsSearchingDisease(false); setDiseaseSearchQuery(''); }}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${selectedCategory === d ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      ) : diseaseSearchQuery.trim() ? (
                        <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                          <p className="text-xs text-amber-800">
                            검색 결과가 없습니다. 다른 질환명을 검색해 보세요.
                          </p>
                        </div>
                      ) : null}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="disease-chips"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-none"
                    >
                      <button
                        onClick={() => setSelectedCategory('전체')}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedCategory === '전체' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        전체
                      </button>
                      {POPULAR_DISEASES.map(d => (
                        <button
                          key={d}
                          onClick={() => setSelectedCategory(d)}
                          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedCategory === d ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          {d}
                        </button>
                      ))}
                      {showCustomDiseaseChip && (
                        <div className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-600 text-white flex items-center gap-1">
                          <span>{selectedCategory}</span>
                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() => setSelectedCategory('전체')}
                          />
                        </div>
                      )}
                      <button
                        onClick={() => setIsSearchingDisease(true)}
                        className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-300 bg-white text-gray-500 flex items-center gap-1 hover:bg-gray-50"
                      >
                        <Search className="w-3 h-3" />질환 검색
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-none">
                  {departmentCategories.map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDepartment(d)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedDepartment === d ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── 배너 영역 ──────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        {/* 면책 고지 — 항상 표시 */}
        <div className="px-4 py-2 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 text-[9px] flex-shrink-0">i</div>
          <p className="text-xs text-gray-400">이 커뮤니티의 내용은 의료 전문가의 조언을 대체하지 않습니다.</p>
        </div>

        {/* 비회원 사용량 배너 */}
        {isGuest && (
          <div className="px-4 pb-2">
            <UsageLimitBanner types={['postView']} />
          </div>
        )}

        {/* 임시저장 배너 */}
        {isMember && hasDraft && (
          <div className="mx-4 mb-2 flex items-center justify-between bg-amber-50 rounded-xl px-4 py-3">
            <span className="text-xs text-amber-700">⏱ 작성 중인 임시저장 글이 있어요</span>
            <button
              onClick={() => setShowWriteModal(true)}
              className="text-xs font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full"
            >
              이어서 쓰기
            </button>
          </div>
        )}
      </div>

      {/* ─── 피드 ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto">

          {/* 유저 필터 배너 */}
          {userFilter && (
            <div className="mx-4 mt-3 mb-1 flex items-center justify-between bg-blue-50 rounded-xl px-4 py-3">
              <span className="text-sm text-blue-700">
                <span className="font-bold">익명{userFilter.slice(-2)}</span>님의 글만 보는 중
              </span>
              <button
                onClick={() => setUserFilter(null)}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-blue-100 transition-colors"
              >
                <X className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          )}

          {/* 총 건수 + 정렬 */}
          <div className="flex items-center justify-between px-4 mt-3 mb-2">
            <span className="text-sm text-gray-500 font-medium">총 {filteredPosts.length}건</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSortOption('latest')}
                className={`text-sm font-medium transition-colors ${sortOption === 'latest' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
                최신순
              </button>
              <div className="w-px h-3 bg-gray-300" />
              <button
                onClick={() => setSortOption('popular')}
                className={`text-sm font-medium transition-colors ${sortOption === 'popular' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
                인기순
              </button>
            </div>
          </div>

          {/* 게시글 목록 */}
          {filteredPosts.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post)}
                  className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex gap-3">
                    {/* 프로필 아바타 */}
                    <button
                      onClick={e => { e.stopPropagation(); setSelectedUser(post.userId); }}
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white"
                    >
                      <User className="w-5 h-5" />
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* 작성자 정보 */}
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-bold text-gray-900">{formatUserId(post.userId)}</span>
                        <span className="text-xs text-gray-400">{post.timeAgo}</span>
                        {post.isEdited && <span className="text-xs text-gray-400">(수정됨)</span>}
                      </div>

                      {/* 제목 + 인증 배지 */}
                      <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-tight flex items-start gap-2">
                        <span className="flex-1">{post.title}</span>
                        {post.isVerified && (
                          <span className="flex-shrink-0">
                            <VerificationBadge type="verified" size="sm" />
                          </span>
                        )}
                      </h3>

                      {/* 질환 태그 */}
                      {post.disease && (
                        <div className="mb-1.5">
                          <span className="text-xs text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">{post.disease}</span>
                        </div>
                      )}

                      {/* 본문 미리보기 (인터리브 본문이면 세그먼트 순서로 표시) */}
                      {post.bodySegments?.length ? (
                        <PostBodySegments
                          bodySegments={post.bodySegments}
                          attachedImages={post.attachedImages}
                          variant="feed"
                        />
                      ) : (
                        <>
                          <p className="text-sm text-gray-600 leading-relaxed mb-2">
                            {postPlainBodyText(post)}
                          </p>
                          {post.attachedImages && post.attachedImages.length > 0 && (() => {
                            const imgs = post.attachedImages!;
                            const total = imgs.length;
                            const visibleImgs = imgs.slice(0, 3);
                            const extraCount = total - 3;
                            const gridCols = total === 1 ? 'grid-cols-1' : total === 2 ? 'grid-cols-2' : 'grid-cols-3';
                            const imgHeight = total === 1 ? 'h-48' : total === 2 ? 'h-32' : 'h-24';
                            return (
                              <div className={`mb-2 grid gap-1.5 ${gridCols}`}>
                                {visibleImgs.map((img, idx) => (
                                  <div key={img.id} className="relative">
                                    <img
                                      src={img.thumbnail || img.url}
                                      alt={img.name}
                                      className={`w-full object-cover rounded-lg ${imgHeight}`}
                                    />
                                    {idx === 2 && extraCount > 0 && (
                                      <div className="absolute inset-0 rounded-lg bg-black/50 flex items-center justify-center">
                                        <span className="text-white text-base font-bold">+{extraCount}</span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            );
                          })()}
                        </>
                      )}

                      {/* 액션 바 */}
                      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                        <button
                          onClick={e => { e.stopPropagation(); handleToggleLike(post.id); }}
                          className={`flex items-center gap-1 transition-colors ${post.isLiked ? 'text-pink-600' : 'text-gray-500 hover:text-pink-500'}`}
                        >
                          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-pink-200' : ''}`} />
                          <span className="text-xs">공감해요</span>
                          <span className="text-xs font-medium">{post.likeCount}</span>
                        </button>
                        <div className="flex items-center gap-1 text-gray-500">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-2">
                {`아직 ${filterType === 'disease' ? selectedCategory : selectedDepartment} 후기가 없어요`}
              </p>
              <p className="text-sm text-gray-400">
                {isMember ? '첫 후기를 남겨보세요!' : '다른 카테고리를 선택해 보세요.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ─── 글쓰기 FAB ────────────────────────────────────────── */}
      {isMember && (
        <button
          onClick={() => setShowWriteModal(true)}
          className="absolute bottom-4 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center z-40"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* ─── 모달 ──────────────────────────────────────────────── */}

      {/* 게시글 작성 모달 */}
      {showWriteModal && (
        <WritePostModal
          onClose={() => setShowWriteModal(false)}
          onSubmit={handleSubmitPost}
        />
      )}

      {/* 게시글 수정 모달 */}
      {editingPost && (
        <WritePostModal
          onClose={() => setEditingPost(null)}
          onSubmit={handleEditSubmit}
          isEditMode
          postId={editingPost.id}
          initialData={{
            title: editingPost.title,
            content: editingPost.summary,
            department: editingPost.department,
            userRole: editingPost.userRole,
            ageGroup: editingPost.ageGroup,
            disease: editingPost.disease,
            emotion: editingPost.emotion,
            attachedImages: editingPost.attachedImages as ResizedImage[],
            bodySegments: editingPost.bodySegments,
          }}
        />
      )}

      {/* 게시글 상세 모달 */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onToggleLike={handleToggleLike}
          onNavigateToChat={onNavigateToChat}
          onNavigateToDoctors={onNavigateToDoctors}
          onCommentAdded={handleCommentAdded}
          isOwner={selectedPost.userId === (user?.id || '')}
          onEdit={() => { setEditingPost(selectedPost); setSelectedPost(null); }}
          onDelete={handleDeletePost}
        />
      )}

      {/* 유저 프로필 모달 */}
      {selectedUser && (
        <UserProfileModal
          userId={selectedUser}
          posts={posts}
          onClose={() => setSelectedUser(null)}
          onViewUserPosts={userId => { setSelectedUser(null); setUserFilter(userId); }}
        />
      )}

      {/* 로그인 유도 모달 */}
      {showLoginModal && (
        <LoginRequiredToast
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={() => setShowLoginModal(false)}
          feature={loginFeature}
        />
      )}

      {/* 성공 토스트 */}
      <SuccessToast
        isOpen={showSuccessToast}
        onClose={handleCloseSuccessToast}
        message={successMessage}
      />
    </div>
  );
}