// 마이페이지

import {
  User,
  ChevronRight,
  FileText,
  Bookmark,
  LogOut,
  MessageCircle,
  Heart,
  Eye,
  AlertTriangle,
  Trash2,
  BookmarkX,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@/app/contexts/UserContext';
import { useAppNavigation } from '@/app/contexts/AppNavigationContext';
import { useSavedDoctors } from '@/hooks/useSavedDoctors';
import { toast } from 'sonner';
import { DoctorProfileModal } from '@/app/components/DoctorProfileModal';
import { PostDetailModal } from '@/app/components/PostDetailModal';
import { getDoctorById } from '@/constants/doctor-data';
import type { CommunityPost } from '@/constants/community-data';
import { communityPosts } from '@/constants/community-data';
import { checkNicknameAvailableMock, isValidNickname } from '@/utils/nicknameValidation';
import { SpecDemoTagChip } from '@/app/components/tagMatching/SpecDemoTagChip';
import { MY_PAGE_MEMBER_DEMO_TAG_MAP, type MyPageMemberDemoTagId } from '@/app/components/tagMatching/myPageMemberTabRegistry';

interface MyPost {
  id: string;
  userId: string;
  userRole: 'patient' | 'caregiver';
  department: string;
  disease?: string;
  title: string;
  summary: string;
  likeCount: number;
  comments: number;
  views: number;
  timeAgo: string;
  isLiked?: boolean;
  status?: 'active' | 'deleted_by_report';
  deleteReason?: string;
  deletedAt?: string;
}

interface Comment {
  id: string;
  postId: string;
  postTitle: string;
  content: string;
  timeAgo: string;
  likes: number;
  status?: 'active' | 'deleted_by_report';
  deleteReason?: string;
  deletedAt?: string;
}

interface SavedDoctor {
  id: string;
  name: string;
  department: string;
  hospital: string;
  specialty: string;
  rating: number;
  savedDate: string;
}

/** 마이페이지 내 활동 — 내가 쓴 후기 (의사 프로필 AIGA 리뷰 카드와 동일 스타일) */
interface MyWrittenReview {
  id: string;
  authorNickname: string;
  dateLine: string;
  visitVerified: boolean;
  kindness: number;
  satisfaction: number;
  explanation: number;
  recommendation: number;
  content: string;
  footerLine: string;
  /** DoctorProfileModal + getDoctorById 보조 */
  doctorPayload: SavedDoctor;
}

const REVIEW_RATING_LABELS: { label: string; key: keyof Pick<MyWrittenReview, 'kindness' | 'satisfaction' | 'explanation' | 'recommendation'> }[] = [
  { label: '친절 · 배려', key: 'kindness' },
  { label: '치료 만족', key: 'satisfaction' },
  { label: '쉬운 설명', key: 'explanation' },
  { label: '추천 의향', key: 'recommendation' },
];

function MyActivityReviewCard({
  review,
  onOpenDoctor,
  onDelete,
}: {
  review: MyWrittenReview;
  onOpenDoctor: (d: SavedDoctor) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpenDoctor(review.doctorPayload)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDoctor(review.doctorPayload);
        }
      }}
      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors text-left w-full"
    >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="text-sm font-bold text-gray-900">{review.authorNickname}</span>
            {review.visitVerified && (
              <span className="inline-flex items-center gap-0.5 shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-50 text-[#15803d] border border-green-200">
                <CheckCircle2 className="w-3 h-3 text-[#22C55E]" aria-hidden />
                진료인증
              </span>
            )}
          </div>
          <button
            type="button"
            title="후기 삭제"
            className="flex-shrink-0 p-1 text-gray-300 hover:text-red-500 rounded transition-colors"
            onClick={(e) => onDelete(e, review.id)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-3">{review.dateLine}</p>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {REVIEW_RATING_LABELS.map(({ label, key }) => {
            const val = review[key];
            return (
              <div key={label} className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs text-gray-600 truncate">{label}</span>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-yellow-500">{val}.0</span>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#22C55E]"
                    style={{ width: `${(val / 5) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{review.content}</p>

        <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500 min-w-0 flex-1 leading-snug">{review.footerLine}</span>
          <button
            type="button"
            className="shrink-0 text-xs font-medium text-blue-600 hover:text-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDoctor(review.doctorPayload);
            }}
          >
            프로필 보기 &gt;
          </button>
        </div>
    </div>
  );
}

function myPostToDetailPost(post: MyPost, nickname: string): CommunityPost {
  return {
    id: post.id,
    userId: post.userId,
    nickname,
    userRole: post.userRole,
    department: post.department,
    disease: post.disease,
    title: post.title,
    summary: post.summary,
    aiLabel: '내가 쓴 글',
    likeCount: post.likeCount,
    comments: post.comments,
    views: post.views,
    timeAgo: post.timeAgo,
    isLiked: post.isLiked,
  };
}

function findCommunityPostByCommentTitle(postTitle: string): CommunityPost | undefined {
  const exact = communityPosts.find(p => p.title === postTitle);
  if (exact) return exact;
  const base = postTitle.replace(/\.\.\.$/, '').trim();
  if (base.length < 5) return undefined;
  return communityPosts.find(p => p.title.startsWith(base) || base.startsWith(p.title.replace(/\.\.\.$/, '').trim()));
}

function syntheticPostFromComment(comment: Comment): CommunityPost {
  return {
    id: comment.postId,
    userId: 'community_author',
    userRole: 'patient',
    department: '커뮤니티',
    title: comment.postTitle,
    summary:
      '원글 전체는 커뮤니티 탭에서 확인할 수 있습니다. (마이페이지 샘플 데이터에서는 원글 제목만 연결됩니다.)',
    aiLabel: '커뮤니티',
    likeCount: 0,
    comments: 0,
    views: 0,
    timeAgo: '',
  };
}

function resolvePostForComment(comment: Comment, posts: MyPost[], nickname: string): CommunityPost {
  const mine = posts.find(p => p.id === comment.postId);
  if (mine) return myPostToDetailPost(mine, nickname);
  const fromFeed = findCommunityPostByCommentTitle(comment.postTitle);
  if (fromFeed) return fromFeed;
  return syntheticPostFromComment(comment);
}

export function MyPage() {
  const { isGuest, isMember, setRole, user } = useUser();
  const {
    navigateToPreviousTab,
    navigateToChat,
    navigateToDoctorSearch,
    setActiveTab: setAppActiveTab,
    openSpecSection,
  } = useAppNavigation();

  const navigateMyPageMemberSpecTag = useCallback(
    (tagId: MyPageMemberDemoTagId) => {
      setRole('member');
      setAppActiveTab('mypage');
      openSpecSection({ tab: 'mypage-spec', sectionId: MY_PAGE_MEMBER_DEMO_TAG_MAP[tagId].specSectionId });
    },
    [setRole, setAppActiveTab, openSpecSection],
  );
  const { isSaved, toggleSave, savedDoctors: savedDoctorsList, removeDoctor } = useSavedDoctors();
  const [nickname, setNickname] = useState('팔팔9988');
  /** 서버(또는 목)에 반영된 마지막 닉네임 — 성공 저장 후 갱신 */
  const [lastSavedNickname, setLastSavedNickname] = useState('팔팔9988');
  /** 중복 거절 직후 필드에 그대로 둔 문자열; 이 값과 동일하면 저장 버튼 비활성(정의서 4-b) */
  const [pendingDuplicateNickname, setPendingDuplicateNickname] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'reviews' | 'saved'>('posts');
  const [selectedDoctor, setSelectedDoctor] = useState<SavedDoctor | null>(null);
  const [selectedDetailPost, setSelectedDetailPost] = useState<CommunityPost | null>(null);

  const [myReviews, setMyReviews] = useState<MyWrittenReview[]>([
    {
      id: 'myrev-1',
      authorNickname: '팔팔9988',
      dateLine: '2026-04-06 · 수정됨',
      visitVerified: true,
      kindness: 4,
      satisfaction: 5,
      explanation: 4,
      recommendation: 4,
      content:
        '강선생님은 최고의 명의이십니다. 너무 걱정하고 있는 저에게 위로와 격려도 아끼지 않으시고 끝까지 좋은 일, 좋은 결과만 있을거라고 용기 주셨어요',
      footerLine: '김민수 교수 · 순환기내과 · 서울아산병원',
      doctorPayload: {
        id: 'mypage-rev-kim',
        name: '김민수',
        department: '순환기내과',
        hospital: '서울아산병원',
        specialty: '심장·부정맥',
        rating: 4.9,
        savedDate: '-',
      },
    },
    {
      id: 'myrev-2',
      authorNickname: '팔팔9988',
      dateLine: '2026-03-28',
      visitVerified: false,
      kindness: 4,
      satisfaction: 4,
      explanation: 3,
      recommendation: 4,
      content:
        '아토피 치료 받았는데 친절하게 설명해 주셔서 좋았어요. 대기가 좀 길었지만 진료는 만족스러웠습니다.',
      footerLine: '이지현 과장 · 피부과 · 세브란스병원',
      doctorPayload: {
        id: 'mypage-rev-lee',
        name: '이지현',
        department: '피부과',
        hospital: '세브란스병원',
        specialty: '아토피·알레르기',
        rating: 4.7,
        savedDate: '-',
      },
    },
  ]);

  // 내가 쓴 글 데이터 (삭제 가능하도록 state로 관리)
  const [myPosts, setMyPosts] = useState<MyPost[]>([
    {
      id: '1',
      userId: 'current_user',
      userRole: 'patient',
      department: '내과',
      disease: '역류성식도염',
      title: '3주째 속쓰림... 스트레스인 줄 알았는데 역류성식도염이었어요',
      summary: 'AI가 추천해준 내과 명의 선생님께 진료받고 약 처방받았어요. 벌써 많이 나아진 것 같습니다!',
      likeCount: 218,
      comments: 15,
      views: 892,
      timeAgo: '5시간 전',
      status: 'active',
    },
    {
      id: '2',
      userId: 'current_user',
      userRole: 'patient',
      department: '외과',
      disease: '손목터널증후군',
      title: '손목 통증 2달째... 마우스 쓸 때마다 찌릿찌릿',
      summary: '손목터널증후군 진단받았어요. 수술까지는 안 하고 물리치료 중입니다.',
      likeCount: 189,
      comments: 22,
      views: 645,
      timeAgo: '1일 전',
      status: 'deleted_by_report',
      deleteReason: '허위 정보',
      deletedAt: '2026.03.10',
    },
    {
      id: '3',
      userId: 'current_user',
      userRole: 'patient',
      department: '피부과',
      disease: '여드름',
      title: '여드름 심해져서 자존감 바닥... AI 추천 피부과 다녀왔어요',
      summary: 'AI가 추천해준 여드름 전문 피부과에서 치료 시작했습니다. 희망이 보여요!',
      likeCount: 267,
      comments: 31,
      views: 1024,
      timeAgo: '2일 전',
      status: 'active',
    },
    {
      id: '4',
      userId: 'current_user',
      userRole: 'caregiver',
      department: '소아청소년과',
      disease: '열성경련',
      title: '아이가 갑자기 경기를 해서 응급실 다녀온 후기',
      summary: '새벽 2시에 아이가 갑자기 경련을 일으켜서 너무 놀랐어요. AI 챗봇이 즉시 응급실 가라고 알려줬고 덕분에 빠른 조치가 됐습니다.',
      likeCount: 342,
      comments: 48,
      views: 2103,
      timeAgo: '3일 전',
      status: 'active',
    },
    {
      id: '5',
      userId: 'current_user',
      userRole: 'patient',
      department: '정형외과',
      disease: '허리디스크',
      title: '회사원 5년차, 허리디스크 판정받고 운동 시작한 지 6개월',
      summary: '하루종일 앉아서 일하다 보니 결국 디스크까지 왔어요. AI 추천 정형외과에서 정확한 진단 후 도수치료+운동 병행 중.',
      likeCount: 501,
      comments: 63,
      views: 3456,
      timeAgo: '5일 전',
      status: 'active',
    },
    {
      id: '6',
      userId: 'current_user',
      userRole: 'patient',
      department: '이비인후과',
      disease: '비염',
      title: '만성 비염 10년... 드디어 수술 결정했습니다',
      summary: '매년 봄·가을마다 고생하다가 이번에 비중격만곡증과 함께 수술하기로 했어요. AI 챗봇 덕분에 적절한 타이밍을 알 수 있었습니다.',
      likeCount: 178,
      comments: 29,
      views: 987,
      timeAgo: '1주일 전',
      status: 'active',
    },
    {
      id: '7',
      userId: 'current_user',
      userRole: 'patient',
      department: '정신건강의학과',
      disease: '불안장애',
      title: '공황장애인 줄 알았는데 불안장애였어요, 치료 시작한 후기',
      summary: '갑자기 심장이 쿵쾅거리고 숨이 막히는 증상이 반복됐어요. AI가 정신건강의학과 방문을 권유해서 진료받고 약물치료 + CBT 시작.',
      likeCount: 423,
      comments: 55,
      views: 2789,
      timeAgo: '1주일 전',
      status: 'active',
    },
    {
      id: '8',
      userId: 'current_user',
      userRole: 'caregiver',
      department: '내분비내과',
      disease: '당뇨',
      title: '부모님 당뇨 관리, 자식 입장에서 챙기는 법 공유해요',
      summary: '70대 아버지 당뇨 진단 후 어떻게 도와드려야 할지 막막했는데 AI가 식단·운동·투약 관리 가이드를 상세히 알려줬어요.',
      likeCount: 615,
      comments: 71,
      views: 4102,
      timeAgo: '2주일 전',
      status: 'active',
    },
    {
      id: '9',
      userId: 'current_user',
      userRole: 'patient',
      department: '안과',
      disease: '녹내장',
      title: '30대에 녹내장 진단... 몰랐던 사실들 정리해드려요',
      summary: '젊어서 안심했는데 갑자기 녹내장 초기 진단을 받았어요. 조기 발견이 정말 중요하다는 걸 AI 덕분에 미리 알게 됐어요.',
      likeCount: 389,
      comments: 44,
      views: 1876,
      timeAgo: '2주일 전',
      status: 'active',
    },
    {
      id: '10',
      userId: 'current_user',
      userRole: 'patient',
      department: '순환기내과',
      disease: '고혈압',
      title: '고혈압 약 평생 먹어야 한다는 말에 충격받았던 날',
      summary: '건강검진에서 처음 고혈압 발견. 처음엔 약 먹기 싫었지만 AI 상담으로 고혈압 합병증 위험을 알고 나서 치료를 결심했어요.',
      likeCount: 247,
      comments: 33,
      views: 1542,
      timeAgo: '3주일 전',
      status: 'active',
    },
  ]);

  // 내가 쓴 댓글 데이터 (삭제 가능하도록 state로 관리)
  const [myComments, setMyComments] = useState<Comment[]>([
    {
      id: '1',
      postId: '1',
      postTitle: '밤새 열나던 아이, 새벽에 응급실 가야하나 고민했는데...',
      content: '저희 아이도 비슷한 증상이었는데 응급실 가서 다행이었어요. 빨리 치료받으시길 바랍니다!',
      timeAgo: '3시간 전',
      likes: 12,
      status: 'active',
    },
    {
      id: '2',
      postId: '2',
      postTitle: '손목 통증으로 고생하시는 분들께',
      content: '저도 손목터널증후군이었는데 물리치료 꾸준히 받으니 좋아졌어요. 포기하지 마세요!',
      timeAgo: '1일 전',
      likes: 8,
      status: 'active',
    },
    {
      id: '3',
      postId: '3',
      postTitle: '역류성식도염 극복 후기, AI 상담이 도움됐어요',
      content: '저는 식이요법이랑 같이 병행했더니 효과가 더 좋았어요. 자극적인 음식 줄이는 게 핵심인 것 같습니다!',
      timeAgo: '2일 전',
      likes: 19,
      status: 'active',
    },
    {
      id: '4',
      postId: '4',
      postTitle: '허리디스크 비수술 치료 성공 후기',
      content: '저도 도수치료 받고 있는데 정말 효 있더라고요. 어느 병원 다니세요? 좋은 선생님 추천 받고 싶어요.',
      timeAgo: '2일 전',
      likes: 5,
      status: 'active',
    },
    {
      id: '5',
      postId: '5',
      postTitle: '30대 고혈압 진단, 약 먹어야 하나요?',
      content: '저도 같은 상황이었는데 의사 선생님 말씀 따르는 게 맞아요. AI 챗봇도 전문의 상담을 꼭 받으라고 하더라고요.',
      timeAgo: '3일 전',
      likes: 24,
      status: 'active',
    },
    {
      id: '6',
      postId: '6',
      postTitle: '비염 수술 후기, 솔직 리뷰',
      content: '저도 3년 전에 했는데 삶의 질이 완전 달라졌어요. 수술 전 걱정이 많았는데 괜찮았습니다!',
      timeAgo: '4일 전',
      likes: 31,
      status: 'active',
    },
    {
      id: '7',
      postId: '7',
      postTitle: '당뇨 환자 보호자입니다, 도움말 부탁드려요',
      content: '저도 부모님 모시면서 비슷한 고민 했어요. AI 식단 기능 추천드려요, 정말 편하거든요.',
      timeAgo: '5일 전',
      likes: 9,
      status: 'active',
    },
    {
      id: '8',
      postId: '8',
      postTitle: '공황장애 극복 과정 솔직 공유',
      content: '정말 공감돼요. 저도 처음엔 약 먹기 무서웠는데 적절한 치료가 정말 중요하더라고요. 힘내세요!',
      timeAgo: '6일 전',
      likes: 47,
      status: 'active',
    },
    {
      id: '9',
      postId: '9',
      postTitle: '녹내장 초기 발견, 관리는 어떻게 하시나요?',
      content: '저도 비슷한 상황이에요. 안압 관리가 제일 중요하다고 들었어요. AI 챗봇이 정기 검진 리마인더도 보내줘서 편해요.',
      timeAgo: '1주일 전',
      likes: 13,
      status: 'active',
    },
    {
      id: '10',
      postId: '10',
      postTitle: '아토피 피부염, 스테로이드 없이 관리하는 법',
      content: '보습이 정말 핵심인 것 같아요. 저는 세라마이드 성분 제품으로 바꾼 뒤 많이 좋아졌어요!',
      timeAgo: '1주일 전',
      likes: 22,
      status: 'active',
    },
    {
      id: '11',
      postId: '1',
      postTitle: '소아청소년과 명의 추천 해주세요',
      content: 'AI 챗봇에서 검색하면 지역별로 추천해줘요. 저희 애는 세브란스 ○○ 선생님께 잘 다니고 있어요.',
      timeAgo: '1주일 전',
      likes: 6,
      status: 'active',
    },
    {
      id: '12',
      postId: '2',
      postTitle: '갑상선 결절, 조직검사 결과 기다리는 중',
      content: '저도 같은 경험 있어요. 불안한 마음 충분히 이해해요. AI 상담으로 궁금한 점 미리 물어봐두면 좋아요.',
      timeAgo: '9일 전',
      likes: 15,
      status: 'active',
    },
    {
      id: '13',
      postId: '3',
      postTitle: '무릎 연골 닳았다는 진단, 나이가 문제일까요',
      content: '재활운동이 정말 중요하더라고요. AI가 연령별 맞춤 운동법도 알려줘서 도움 많이 받았어요.',
      timeAgo: '10일 전',
      likes: 28,
      status: 'active',
    },
    {
      id: '14',
      postId: '4',
      postTitle: '두근거림이 반복됩니다, 부정맥일까요',
      content: '저도 똑같았어요. AI가 순환기내과 방문 권유했는데 결국 경미한 부정맥이었어요. 조기 발견 중요해요!',
      timeAgo: '11일 전',
      likes: 33,
      status: 'active',
    },
    {
      id: '15',
      postId: '5',
      postTitle: '우울증 치료 중인데 주변에 알리는 게 맞을까요',
      content: '가까운 가족에게는 알리는 편이 치료에 도움이 된다고 해요. 혼자 짊어지지 마세요, 응원합니다.',
      timeAgo: '12일 전',
      likes: 61,
      status: 'active',
    },
    {
      id: '16',
      postId: '6',
      postTitle: '소화불량이 한 달째 지속됩니다',
      content: '저도 그랬는데 위내시경 해보니 만성 위염이었어요. 빨리 검사받아보시는 게 좋을 것 같아요!',
      timeAgo: '2주일 전',
      likes: 18,
      status: 'active',
    },
    {
      id: '17',
      postId: '7',
      postTitle: '편두통 약 내성 생기면 어떡하나요',
      content: 'AI한테 물어봤더니 트립탄 계열 약은 월 10일 이하 복용 권장이라고 알려줬어요. 전문의 상담 꼭 받으세요.',
      timeAgo: '2주일 전',
      likes: 11,
      status: 'active',
    },
    {
      id: '18',
      postId: '8',
      postTitle: '신장내과 첫 방문 후기 공유합니다',
      content: '혈뇨 증상으로 무서웠는데 정확한 진단 받고 나니 오히려 마음이 편해졌어요. 두려워 말고 병원 가세요!',
      timeAgo: '16일 전',
      likes: 26,
      status: 'active',
    },
    {
      id: '19',
      postId: '9',
      postTitle: '임신 중 철분 부족, 빈혈 관리법',
      content: '저도 임신 중에 빈혈로 고생했어요. AI가 식품별 철분 함량 표 알려줬는데 정말 유용했습니다!',
      timeAgo: '17일 전',
      likes: 38,
      status: 'active',
    },
    {
      id: '20',
      postId: '10',
      postTitle: '류마티스 관절염 진단받고 나서 달라진 것들',
      content: '식단 조절이 생각보다 효과가 크더라고요. AI가 항염증 식품 목록을 추천해줬는데 많이 참고하고 있어요.',
      timeAgo: '18일 전',
      likes: 44,
      status: 'active',
    },
  ]);

  // 저장 해제 핸들러
  const handleUnsaveDoctor = (e: React.MouseEvent, doctorId: string) => {
    e.stopPropagation();
    if (confirm('저장을 해제하시겠습니까?')) {
      removeDoctor(doctorId);
      toast.success('저장이 해제되었습니다.');
    }
  };

  const nicknameDirty = nickname !== lastSavedNickname;
  const duplicateBlocked =
    pendingDuplicateNickname !== null && nickname === pendingDuplicateNickname;
  const canSaveNickname =
    isValidNickname(nickname) && nicknameDirty && !duplicateBlocked;

  const handleSaveNickname = async () => {
    if (!canSaveNickname) return;
    const available = await checkNicknameAvailableMock(nickname);
    if (!available) {
      setPendingDuplicateNickname(nickname);
      toast.error('이미 사용 중인 닉네임 입니다', { duration: 3000 });
      return;
    }
    setLastSavedNickname(nickname);
    setPendingDuplicateNickname(null);
    toast.success('닉네임이 변경되었습니다', { duration: 3000 });
  };

  const handleAnnouncementClick = () => {
    alert('공지사항 페이지로 이동합니다.');
  };

  const handleTermsClick = () => {
    alert('이용약관 페이지로 이동합니다.');
  };

  const handlePrivacyClick = () => {
    alert('개인정보 처리방침 페이지로 이동합니다.');
  };

  const handleFeedbackClick = () => {
    alert('의견 보내기 페이지로 이동합니다.');
  };

  const handleWithdrawal = () => {
    if (confirm('정말 탈퇴하시겠습니까?')) {
      alert('탈퇴가 완료되었습니다.');
      setRole('guest');
    }
  };

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      alert('로그아웃되었습니다.');
      setRole('guest');
    }
  };

  const handleDoctorClick = (doctor: SavedDoctor) => {
    setSelectedDoctor(doctor);
  };

  const handleDeleteReview = (e: React.MouseEvent, reviewId: string) => {
    e.stopPropagation();
    if (confirm('후기를 삭제하시겠습니까?')) {
      setMyReviews(prev => prev.filter(r => r.id !== reviewId));
      toast.success('후기가 삭제되었습니다.');
    }
  };

  const handleDetailToggleLike = (postId: string) => {
    setMyPosts(prev => {
      if (!prev.some(p => p.id === postId)) return prev;
      return prev.map(p =>
        p.id === postId
          ? { ...p, likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1, isLiked: !p.isLiked }
          : p
      );
    });
    setSelectedDetailPost(prev => {
      if (!prev || prev.id !== postId) return prev;
      return {
        ...prev,
        likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
        isLiked: !prev.isLiked,
      };
    });
  };

  const handleDetailCommentAdded = (postId: string) => {
    setMyPosts(prev => {
      if (!prev.some(p => p.id === postId)) return prev;
      return prev.map(p => (p.id === postId ? { ...p, comments: p.comments + 1 } : p));
    });
    setSelectedDetailPost(prev =>
      prev && prev.id === postId ? { ...prev, comments: prev.comments + 1 } : prev
    );
  };

  // 게시글 삭제 핸들러
  const handleDeletePost = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    if (confirm('게시글을 삭제하시겠습니까?')) {
      setMyPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
      toast.success('게시글이 삭제되었습니다.');
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = (e: React.MouseEvent, commentId: string) => {
    e.stopPropagation();
    if (confirm('댓글을 삭제하시겠습니까?')) {
      setMyComments(prevComments => prevComments.filter(c => c.id !== commentId));
      toast.success('댓글이 삭제되었습니다.');
    }
  };

  // localStorage에서 신고된 게시글/댓글 불러와서 status 업데이트
  useEffect(() => {
    try {
      const reports = JSON.parse(localStorage.getItem('aiga_reports') || '[]');
      const deletedPosts = JSON.parse(localStorage.getItem('aiga_deleted_posts') || '[]');
      const deletedComments = JSON.parse(localStorage.getItem('aiga_deleted_comments') || '[]');

      // 게시글 status 업데이트
      setMyPosts(prevPosts =>
        prevPosts.map(post => {
          if (deletedPosts.includes(post.id)) {
            const report = reports.find((r: any) => r.type === 'post' && r.targetId === post.id);
            return {
              ...post,
              status: 'deleted_by_report',
              deleteReason: report?.reasonLabel || report?.detail || '운영 정책 위반',
              deletedAt: report?.deletedAt || new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, ''),
            };
          }
          return post;
        })
      );

      // 댓글 status 업데이트
      setMyComments(prevComments =>
        prevComments.map(comment => {
          if (deletedComments.includes(comment.id)) {
            const report = reports.find((r: any) => r.type === 'comment' && r.targetId === comment.id);
            return {
              ...comment,
              status: 'deleted_by_report',
              deleteReason: report?.reasonLabel || report?.detail || '운영 정책 위반',
              deletedAt: report?.deletedAt || new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, ''),
            };
          }
          return comment;
        })
      );
    } catch (error) {
      console.error('신고 데이터 로드 실패:', error);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header — 회원 데모 번호는 본문 블록(M01~)에만 표시 */}
      <div className="flex-shrink-0">
        <div className="max-w-2xl mx-auto bg-blue-600 px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white pr-12">마이페이지</h1>
        </div>
      </div>

      {/* 비회원 화면 */}
      {isGuest && (
        <div className="flex-1 overflow-y-auto flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            {/* Icon */}
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <User className="w-12 h-12 text-gray-400" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                로그인이 필요합니다
              </h2>
              <p className="text-gray-600">
                나만의 건강 관리를 시작하세요!
              </p>
            </div>

            {/* Login Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setRole('member')}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-4 rounded-xl transition-colors"
              >
                카카오톡으로 3초 만에 시작
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 rounded-xl transition-colors">
                네이버로 시작하기
              </button>
            </div>

            {/* Guest Mode */}
            <button 
              onClick={navigateToPreviousTab}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              나중에 하기 &gt;
            </button>
          </div>
        </div>
      )}

      {/* 회원 화면 */}
      {isMember && (
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-6 space-y-6 pb-24">
            {/* M01 프로필 요약 — 데모 번호는 로그아웃과 같은 줄·흐름 배치(absolute 겹침 방지) */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="truncate text-sm text-gray-700">fassionmap@kakao.com</span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <SpecDemoTagChip
                  tagId="M01"
                  onNavigate={(id) => navigateMyPageMemberSpecTag(id as MyPageMemberDemoTagId)}
                  className="!relative !left-auto !right-auto !top-auto"
                />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
                  aria-label="로그아웃"
                >
                  <LogOut className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* M02 닉네임 */}
            <div className="relative space-y-3 pr-12">
              <SpecDemoTagChip
                tagId="M02"
                onNavigate={(id) => navigateMyPageMemberSpecTag(id as MyPageMemberDemoTagId)}
                style={{ top: 0, right: '3.5rem' }}
              />
              <label className="block text-sm font-medium text-gray-900">
                닉네임 <span className="text-red-500">(필수)</span>
              </label>
              <input
                type="text"
                value={nickname}
                onChange={e => {
                  const v = e.target.value;
                  setNickname(v);
                  if (pendingDuplicateNickname !== null && v !== pendingDuplicateNickname) {
                    setPendingDuplicateNickname(null);
                  }
                }}
                placeholder="새 닉네임을 입력하세요"
                maxLength={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-[11px] leading-snug text-gray-500">
                최소 2자, 최대 10자 (한글, 영문, 숫자, 밑줄(_)만 가능)
              </p>
              <button
                type="button"
                onClick={() => void handleSaveNickname()}
                disabled={!canSaveNickname}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
              >
                저장하기
              </button>
            </div>

            {/* M03 내 활동 (제목 + 탭 카드) */}
            <div className="relative pt-2">
              <SpecDemoTagChip
                tagId="M03"
                onNavigate={(id) => navigateMyPageMemberSpecTag(id as MyPageMemberDemoTagId)}
                style={{ top: 0, right: 0 }}
              />
              <h3 className="text-sm font-bold text-gray-900 mb-3 pr-14">내 활동</h3>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 w-full">
              <div className="flex border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('posts')}
                  className={`flex-1 min-w-0 py-2.5 px-0.5 text-[11px] sm:text-sm font-medium transition-colors relative leading-tight ${
                    activeTab === 'posts'
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  게시글 ({myPosts.length})
                  {activeTab === 'posts' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('comments')}
                  className={`flex-1 min-w-0 py-2.5 px-0.5 text-[11px] sm:text-sm font-medium transition-colors relative leading-tight ${
                    activeTab === 'comments'
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  댓글 ({myComments.length})
                  {activeTab === 'comments' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 min-w-0 py-2.5 px-0.5 text-[11px] sm:text-sm font-medium transition-colors relative leading-tight ${
                    activeTab === 'reviews'
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  후기 ({myReviews.length})
                  {activeTab === 'reviews' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('saved')}
                  className={`flex-1 min-w-0 py-2.5 px-0.5 text-[11px] sm:text-sm font-medium transition-colors relative leading-tight ${
                    activeTab === 'saved'
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  저장 ({savedDoctorsList.length})
                  {activeTab === 'saved' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="h-[360px] overflow-y-auto">
                {/* 게시글 탭 */}
                {activeTab === 'posts' && (
                  <div className="divide-y divide-gray-100">
                    {myPosts.length > 0 ? (
                      myPosts.map((post) => {
                        const isDeleted = post.status === 'deleted_by_report';
                        return (
                          <div
                            key={post.id}
                            role={isDeleted ? undefined : 'button'}
                            tabIndex={isDeleted ? undefined : 0}
                            onClick={() => {
                              if (!isDeleted) setSelectedDetailPost(myPostToDetailPost(post, nickname));
                            }}
                            onKeyDown={(e) => {
                              if (isDeleted) return;
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedDetailPost(myPostToDetailPost(post, nickname));
                              }
                            }}
                            className={`transition-colors ${isDeleted ? 'bg-gray-50 cursor-default' : 'hover:bg-gray-50 cursor-pointer'}`}
                          >
                            {/* 삭제 안내 배너 */}
                            {isDeleted && (
                              <div className="mx-4 mt-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-start gap-2 mb-1">
                                  <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                                  <p className="text-xs text-red-700 font-medium">
                                    운영 정책 위반으로 삭제된 게시글입니다
                                  </p>
                                </div>
                                <p className="text-xs text-red-600 pl-5">
                                  사유: {post.deleteReason} · {post.deletedAt}
                                </p>
                              </div>
                            )}

                            {/* 게시글 본문 */}
                            <div className={`p-4 ${isDeleted ? 'opacity-40' : ''}`}>
                              {/* 상단 행: 배지 + 시간 + 삭제 버튼 */}
                              <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                  {post.department}
                                </span>
                                <span className="text-xs text-gray-400 flex-1">{post.timeAgo}</span>
                                {!isDeleted && (
                                  <button
                                    onClick={(e) => handleDeletePost(e, post.id)}
                                    className="flex-shrink-0 p-1 text-gray-300 hover:text-red-500 rounded transition-colors"
                                    title="게시글 삭제"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 leading-snug">
                                {post.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {post.summary}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Heart className="w-3.5 h-3.5" />
                                  <span>{post.likeCount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>{post.comments}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>{post.views}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <FileText className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-sm text-gray-500">작성한 글이 없습니다</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 댓글 탭 */}
                {activeTab === 'comments' && (
                  <div className="divide-y divide-gray-100">
                    {myComments.length > 0 ? (
                      myComments.map((comment) => {
                        const isDeleted = comment.status === 'deleted_by_report';
                        return (
                          <div
                            key={comment.id}
                            role={isDeleted ? undefined : 'button'}
                            tabIndex={isDeleted ? undefined : 0}
                            onClick={() => {
                              if (!isDeleted) setSelectedDetailPost(resolvePostForComment(comment, myPosts, nickname));
                            }}
                            onKeyDown={(e) => {
                              if (isDeleted) return;
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedDetailPost(resolvePostForComment(comment, myPosts, nickname));
                              }
                            }}
                            className={`transition-colors ${isDeleted ? 'bg-gray-50 cursor-default' : 'hover:bg-gray-50 cursor-pointer'}`}
                          >
                            {/* 삭제 안내 배너 */}
                            {isDeleted && (
                              <div className="mx-4 mt-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-start gap-2 mb-1">
                                  <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                                  <p className="text-xs text-red-700 font-medium">
                                    운영 정책 위반으로 삭제된 댓글입니다
                                  </p>
                                </div>
                                <p className="text-xs text-red-600 pl-5">
                                  사유: {comment.deleteReason} · {comment.deletedAt}
                                </p>
                              </div>
                            )}

                            {/* 댓글 본문 */}
                            <div className={`p-4 ${isDeleted ? 'opacity-40' : ''}`}>
                              {/* 상단 행: 원글 정보 + 삭제 버튼 */}
                              <div className="flex items-start gap-2 mb-2">
                                <span className="text-xs text-gray-500 flex-shrink-0 mt-0.5">원글:</span>
                                <span className="text-xs text-gray-700 font-medium line-clamp-1 flex-1">
                                  {comment.postTitle}
                                </span>
                                <span className="text-xs text-gray-400 flex-shrink-0">{comment.timeAgo}</span>
                                {!isDeleted && (
                                  <button
                                    onClick={(e) => handleDeleteComment(e, comment.id)}
                                    className="flex-shrink-0 p-1 text-gray-300 hover:text-red-500 rounded transition-colors"
                                    title="댓글 삭제"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              <p className="text-sm text-gray-900 mb-2 leading-relaxed">
                                {comment.content}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Heart className="w-3.5 h-3.5" />
                                <span>공감 {comment.likes}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <MessageCircle className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-sm text-gray-500">작성한 댓글이 없습니다</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 후기 탭 */}
                {activeTab === 'reviews' && (
                  <div className="space-y-3 p-2">
                    {myReviews.length > 0 ? (
                      myReviews.map(review => (
                        <MyActivityReviewCard
                          key={review.id}
                          review={{ ...review, authorNickname: nickname }}
                          onOpenDoctor={handleDoctorClick}
                          onDelete={handleDeleteReview}
                        />
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                        <Star className="w-12 h-12 text-gray-300 mb-3" strokeWidth={1.25} />
                        <p className="text-sm font-medium text-gray-700 mb-1">아직 작성한 후기가 없어요</p>
                        <p className="text-xs text-gray-500 mb-5">명의를 찾고 진료 경험을 남겨보세요</p>
                        <button
                          type="button"
                          onClick={() => navigateToDoctorSearch()}
                          className="w-full max-w-[280px] py-3 rounded-lg font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                          명의 찾고 후기 남기기
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 저장 탭 */}
                {activeTab === 'saved' && (
                  <div className="divide-y divide-gray-100">
                    {savedDoctorsList.length > 0 ? (
                      savedDoctorsList.map((doctor) => (
                        <div
                          key={doctor.id}
                          onClick={() => handleDoctorClick(doctor)}
                          className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          {/* 상단 행: 이름 + 배지 + 저장 해제 버튼 */}
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                              {doctor.department}
                            </span>
                            <div className="flex-1" />
                            <button
                              onClick={(e) => handleUnsaveDoctor(e, doctor.id)}
                              className="flex-shrink-0 flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-md transition-colors"
                              title="저장 해제"
                            >
                              <BookmarkX className="w-3.5 h-3.5" />
                              <span>저장 해제</span>
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{doctor.hospital}</p>
                          <p className="text-xs text-gray-500 mb-2">{doctor.specialty}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span>{doctor.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Bookmark className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-sm text-gray-500">저장한 의료진이 없습니다</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            </div>

            {/* M04 고객지원 */}
            <div className="relative pr-12">
              <SpecDemoTagChip
                tagId="M04"
                onNavigate={(id) => navigateMyPageMemberSpecTag(id as MyPageMemberDemoTagId)}
                style={{ top: 0, right: '3.5rem' }}
              />
              <h3 className="text-sm font-bold text-gray-900 mb-3">고객지원</h3>
              <div className="space-y-2">
                <button
                  onClick={handleAnnouncementClick}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm text-gray-900">공지사항</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                  onClick={handleTermsClick}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-900">이용약관</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                  onClick={handlePrivacyClick}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm text-gray-900">개인정보 처리방침</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                  onClick={handleFeedbackClick}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="text-sm text-gray-900">의견 보내기</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* M05 탈퇴하기 */}
            <div className="relative py-1">
              <SpecDemoTagChip
                tagId="M05"
                onNavigate={(id) => navigateMyPageMemberSpecTag(id as MyPageMemberDemoTagId)}
                style={{ top: '0.15rem', right: 0 }}
              />
              <button
                type="button"
                onClick={handleWithdrawal}
                className="w-full text-center py-3 pr-10 text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedDetailPost && (
        <PostDetailModal
          post={selectedDetailPost}
          onClose={() => setSelectedDetailPost(null)}
          onToggleLike={handleDetailToggleLike}
          onNavigateToChat={navigateToChat}
          onNavigateToDoctors={navigateToDoctorSearch}
          onCommentAdded={handleDetailCommentAdded}
          isOwner={
            selectedDetailPost.userId === 'current_user' ||
            selectedDetailPost.userId === (user?.id ?? '')
          }
        />
      )}

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <DoctorProfileModal
          doctor={{
            name: selectedDoctor.name,
            specialty: selectedDoctor.specialty,
            hospital: selectedDoctor.hospital,
            experience: '15년차',
            rating: selectedDoctor.rating,
            reviewCount: 128,
            id: selectedDoctor.id,
            verified: getDoctorById(selectedDoctor.id)?.verified,
          }}
          isOpen={true}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}