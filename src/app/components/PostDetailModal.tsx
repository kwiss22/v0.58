// 게시글 상세보기 모달
import { X, Heart, MessageCircle, Eye, Sparkles, MapPin, Star, Send, User, Lock, MoreVertical, Flag, Share2, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUser } from '@/app/contexts/UserContext';
import { VerificationBadge } from '@/app/components/VerificationBadge';
import { LoginRequiredToast } from '@/app/components/LoginRequiredToast';
import { ReportModal } from '@/app/components/ReportModal';
import { ImageLightbox } from '@/app/components/ImageLightbox';
import type { PostBodySegment } from '@/constants/community-data';
import { PostBodySegments } from '@/app/components/community/PostBodySegments';

interface Post {
  id: string;
  userId: string;
  userRole: 'patient' | 'caregiver';
  ageGroup?: string;
  department: string;
  disease?: string;
  emotion?: 'good' | 'normal' | 'bad' | 'very_bad';
  title: string;
  summary: string;
  bodySegments?: PostBodySegment[];
  aiLabel: string;
  likeCount: number;
  comments: number;
  views: number;
  timeAgo: string;
  isLiked?: boolean;
  isVerified?: boolean;
  attachedImages?: { id: string; url: string; name: string; thumbnail?: string }[];
  isEdited?: boolean;
  editedAt?: string;
  hospital?: {
    name: string;
    rating: number;
    distance: string;
    department?: string;
    address?: string;
    phone?: string;
    hours?: string;
  };
  doctor?: {
    name: string;
    specialty: string;
    hospital: string;
    experience: string;
    education?: string;
    rating: number;
    reviewCount: number;
    consultCount?: number;
  };
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  likes: number;
  isLiked: boolean;
  timeAgo: string;
  replies?: Comment[];
  status?: 'active' | 'deleted_by_report';
  deleteReason?: string;
  deletedAt?: string;
}

/** 상세 모달 데모용 샘플 댓글(post.comments &gt; 0 일 때만 사용) */
const POST_DETAIL_SAMPLE_COMMENTS: Comment[] = [
  {
    id: '1',
    userId: 'user10',
    userName: '건강지킴이',
    content: '저도 비슷한 증상 있었는데 정말 공감돼요! 정보 감사합니다 👍',
    likes: 12,
    isLiked: false,
    timeAgo: '1시간 전',
    replies: [
      {
        id: '1-1',
        userId: 'user13',
        userName: '희망찬내일',
        content: '저도요! 함께 건강 챙겨요 😊',
        likes: 3,
        isLiked: false,
        timeAgo: '50분 전',
      },
    ],
  },
  {
    id: '2',
    userId: 'user11',
    userName: '행복한엄마',
    content: '어떤 병원 가셨는지 궁금해요. AI 추천 받으셨나요?',
    likes: 8,
    isLiked: false,
    timeAgo: '30분 전',
  },
  {
    id: '3',
    userId: 'user12',
    userName: '20대건강',
    content: '완전 유익한 정보네요!! 저도 AI 상담 한번 받아봐야겠어요',
    likes: 5,
    isLiked: false,
    timeAgo: '10분 전',
  },
];

function getInitialCommentsForPost(post: Pick<Post, 'comments'>): Comment[] {
  if (post.comments === 0) return [];
  return JSON.parse(JSON.stringify(POST_DETAIL_SAMPLE_COMMENTS)) as Comment[];
}

interface PostDetailModalProps {
  post: Post;
  onClose: () => void;
  onToggleLike: (postId: string) => void;
  onNavigateToChat: () => void;
  onNavigateToDoctors: () => void;
  onCommentAdded: (postId: string) => void;
  onHospitalClick?: (hospital: { name: string; rating: number; distance: string; department?: string; address?: string; phone?: string; hours?: string }) => void;
  onDoctorClick?: (doctor: { name: string; specialty: string; hospital: string; experience: string; education?: string; rating: number; reviewCount: number; consultCount?: number }) => void;
  /** 현재 로그인 사용자가 이 게시글 작성자인지 */
  isOwner?: boolean;
  /** 수정 버튼 클릭 시 */
  onEdit?: () => void;
  /** 삭제 완료 시 */
  onDelete?: () => void;
}

export function PostDetailModal({
  post,
  onClose,
  onToggleLike,
  onNavigateToChat,
  onNavigateToDoctors,
  onCommentAdded,
  onHospitalClick,
  onDoctorClick,
  isOwner = false,
  onEdit,
  onDelete,
}: PostDetailModalProps) {
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginFeature, setLoginFeature] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCommentMenu, setShowCommentMenu] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<{ id: string; content: string; parentId?: string } | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTarget, setReportTarget] = useState<{ type: 'post' | 'comment'; id: string; author?: string } | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [comments, setComments] = useState<Comment[]>(() => getInitialCommentsForPost(post));

  const threadCommentCount = comments.reduce((acc, c) => acc + 1 + (c.replies?.length ?? 0), 0);

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      userId: 'current_user',
      userName: '김사용자',
      content: commentText,
      likes: 0,
      isLiked: false,
      timeAgo: '방금 전',
      replies: [],
    };

    setComments([...comments, newComment]);
    setCommentText('');
    onCommentAdded(post.id);
  };

  const handleReplySubmit = (parentCommentId: string) => {
    if (!replyText.trim()) return;

    const newReply: Comment = {
      id: `${parentCommentId}-${Date.now()}`,
      userId: 'current_user',
      userName: '김사용자',
      content: replyText,
      likes: 0,
      isLiked: false,
      timeAgo: '방금 전',
    };

    setComments(comments.map(comment => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
      return comment;
    }));

    setReplyText('');
    setReplyingTo(null);
  };

  const handleCommentLike = (commentId: string, parentCommentId?: string) => {
    setComments(comments.map(comment => {
      // 대댓글 좋아요
      if (parentCommentId && comment.id === parentCommentId) {
        return {
          ...comment,
          replies: comment.replies?.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                isLiked: !reply.isLiked,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
              };
            }
            return reply;
          }),
        };
      }
      // 일반 댓글 좋아요
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
        };
      }
      return comment;
    }));
  };

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      '내과': 'bg-blue-100 text-blue-700',
      '외과': 'bg-red-100 text-red-700',
      '소아과': 'bg-green-100 text-green-700',
      '피부과': 'bg-pink-100 text-pink-700',
      '정신과': 'bg-purple-100 text-purple-700',
      '기타': 'bg-gray-100 text-gray-700',
    };
    return colors[department] || 'bg-gray-100 text-gray-700';
  };

  const handleShareKakao = () => {
    alert('카카오톡 공유 기능이 실행됩니다.');
    setShowShareModal(false);
    setShowMoreMenu(false);
  };

  const handleShareInstagram = () => {
    alert('인스타그램 공유 기능이 실행됩니다.');
    setShowShareModal(false);
    setShowMoreMenu(false);
  };

  const handleCopyLink = () => {
    const postUrl = `https://aiga.com/community/post/${post.id}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      alert('링크가 복사되었습니다!');
      setShowShareModal(false);
      setShowMoreMenu(false);
    });
  };

  const user = useUser();
  const { isGuest, setRole } = user;

  /** 비회원 로그인 유도 헬퍼 */
  const requireLogin = (feature: string) => {
    setLoginFeature(feature);
    setShowLoginModal(true);
  };

  useEffect(() => {
    setComments(getInitialCommentsForPost(post));
    setReplyingTo(null);
    setCommentText('');
    setReplyText('');
    setShowCommentMenu(null);
    setEditingComment(null);
  }, [post.id]);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">게시글</h2>
          <div className="flex items-center gap-2">
            {/* 더보기 메뉴 */}
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>

              {/* 드롭다운 메뉴 */}
              {showMoreMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
                  {/* 공유하기 - 모두에게 표시 */}
                  <button
                    onClick={() => {
                      setShowShareModal(true);
                      setShowMoreMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>공유하기</span>
                  </button>

                  {isOwner ? (
                    /* 작성자 전용: 수정/삭제 */
                    <>
                      <div className="border-t border-gray-100" />
                      <button
                        onClick={() => {
                          setShowMoreMenu(false);
                          onEdit?.();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                        <span>수정하기</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowMoreMenu(false);
                          setShowDeleteConfirm(true);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>삭제하기</span>
                      </button>
                    </>
                  ) : (
                    /* 비작성자: 신고하기 (회원만) */
                    <>
                      {!isGuest && (
                        <>
                          <div className="border-t border-gray-100" />
                          <button
                            onClick={() => {
                              setReportTarget({ type: 'post', id: post.id, author: post.userId });
                              setShowMoreMenu(false);
                              setShowReportModal(true);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Flag className="w-4 h-4" />
                            <span>신고하기</span>
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Post Content */}
          <div className="p-4 border-b border-gray-200">
            {/* 작성자 프로필 */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-sm font-bold text-gray-900 truncate">
                  {`익명${post.userId.slice(-2)}`}
                </span>
                <span className="text-xs text-gray-400">{post.timeAgo}</span>
              </div>
            </div>

            {/* Title */}
            <div className="flex items-start gap-2 mb-3">
              <h3 className="flex-1 text-lg font-bold text-gray-900 leading-tight">
                {post.title}
              </h3>
              {post.isVerified && (
                <VerificationBadge type="verified" size="md" />
              )}
            </div>

            {/* Disease Tag */}
            {post.disease && (
              <div className="mb-3">
                <span className="text-xs text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                  {post.disease}
                </span>
              </div>
            )}

            {/* 수정됨 */}
            {post.isEdited && (
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs text-gray-400 cursor-default select-none"
                  title={post.editedAt
                    ? `${new Date(post.editedAt).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} ${new Date(post.editedAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })} 수정됨`
                    : '수정됨'}
                >
                  (수정됨)
                </span>
              </div>
            )}

            {/* Full Content — bodySegments가 있으면 에디터 삽입 순서 유지 */}
            {post.bodySegments?.length ? (
              <PostBodySegments
                bodySegments={post.bodySegments}
                attachedImages={post.attachedImages}
                variant="detail"
                onImageClick={(_img, galleryIndex) => {
                  setShowLightbox(true);
                  setLightboxIndex(galleryIndex);
                }}
              />
            ) : (
              <>
                <p className="text-sm text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
                  {post.summary}
                </p>
                {post.attachedImages && post.attachedImages.length > 0 && (
                  <div className="mb-4 space-y-4">
                    {post.attachedImages.map((img, index) => (
                      <a
                        key={img.id}
                        href={img.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full rounded-xl overflow-hidden border border-gray-200 hover:opacity-90 transition-opacity p-1"
                        style={{ maxWidth: '100%' }}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowLightbox(true);
                          setLightboxIndex(index);
                        }}
                      >
                        <img
                          src={img.url}
                          alt={img.name}
                          className="max-h-80 w-full object-contain bg-gray-50 rounded-xl"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Interaction Row */}
            <div className="flex items-center gap-4 text-sm pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  if (isGuest) { requireLogin('공감'); return; }
                  onToggleLike(post.id);
                }}
                className={`flex items-center gap-1.5 transition-colors ${
                  isGuest
                    ? 'text-gray-300 cursor-default'
                    : post.isLiked ? 'text-pink-600' : 'text-gray-500 hover:text-pink-600'
                }`}
              >
                <Heart className={`w-4.5 h-4.5 ${!isGuest && post.isLiked ? 'fill-pink-100' : ''}`} />
                <span className="text-xs">공감해요</span>
                <span className="font-medium">{post.likeCount}</span>
              </button>
              <div className="flex items-center gap-1 text-gray-500">
                <MessageCircle className="w-4 h-4" />
                <span>{threadCommentCount}</span>
              </div>
              {/* 조회수 UI 표시 제거 - 백엔드에서만 카운트 */}
              {/* <div className="flex items-center gap-1 text-gray-500">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div> */}
            </div>

            {/* Hospital Mini Card */}
            {post.hospital && (
              <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-gray-900">{post.hospital.name}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{post.hospital.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{post.hospital.distance}</span>
                      </div>
                      <span className="text-blue-600 font-medium">{post.hospital.department}</span>
                    </div>
                  </div>
                  <button className="bg-white text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors border border-blue-200 whitespace-nowrap ml-2" onClick={() => onHospitalClick && post.hospital && onHospitalClick(post.hospital)}>
                    병원 정보
                  </button>
                </div>
                
                {/* 의사 정보 (있을 경우에만) */}
                {post.doctor && (
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <div 
                      className="bg-white rounded-xl p-3 hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                      onClick={() => onDoctorClick && post.doctor && onDoctorClick(post.doctor)}
                    >
                      {/* 상단 배지 */}
                      <div className="flex items-center justify-center gap-1 mb-3">
                        <div className="flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-medium">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>AI 맞춤 의사 추천</span>
                        </div>
                      </div>
                      
                      {/* 프로필 이미지 */}
                      <div className="flex justify-center mb-3">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                      
                      {/* 의사 이름 */}
                      <h4 className="text-center text-base font-bold text-gray-900 mb-2">
                        {post.doctor.name.replace(' 전문의', '').replace(' 교수', '')} <span className="text-sm font-normal text-gray-600">교수</span>
                      </h4>
                      
                      {/* 전문과목 */}
                      <div className="flex items-center justify-center gap-2 text-xs mb-3">
                        <span className="text-teal-600 font-semibold">{post.doctor.specialty}</span>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-600">{post.doctor.specialty}</span>
                      </div>
                      
                      {/* 상세보기 버튼 */}
                      <button className="w-full bg-gray-100 text-gray-700 text-sm font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        상세보기
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="p-4">
            <h4 className="text-sm font-bold text-gray-900 mb-4">
              댓글 {threadCommentCount}개
            </h4>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => {
                const isCommentOwner = comment.userId === 'current_user';
                
                return (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {comment.userName[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{comment.userName}</span>
                      <span className="text-xs text-gray-400">{comment.timeAgo}</span>
                    </div>
                    
                    {/* 수정 모드 */}
                    {editingComment?.id === comment.id ? (
                      <div className="mb-2">
                        <textarea
                          value={editingComment.content}
                          onChange={(e) => setEditingComment({ ...editingComment, content: e.target.value })}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                          rows={3}
                          maxLength={500}
                          autoFocus
                        />
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{editingComment.content.length}/500</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingComment(null)}
                              className="px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              취소
                            </button>
                            <button
                              onClick={() => {
                                if (editingComment.content.trim()) {
                                  setComments(comments.map(c => 
                                    c.id === comment.id 
                                      ? { ...c, content: editingComment.content }
                                      : c
                                  ));
                                  setEditingComment(null);
                                }
                              }}
                              disabled={!editingComment.content.trim()}
                              className="px-3 py-1.5 text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
                            >
                              저장
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700 leading-relaxed mb-2">
                        {comment.content}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (isGuest) { requireLogin('공감'); return; }
                          handleCommentLike(comment.id);
                        }}
                        className={`flex items-center gap-1 text-xs transition-colors ${
                          isGuest
                            ? 'text-gray-300 cursor-default'
                            : comment.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${!isGuest && comment.isLiked ? 'fill-red-500' : ''}`} />
                        <span>{comment.likes}</span>
                      </button>
                      <button
                        onClick={() => {
                          if (isGuest) { requireLogin('답글'); return; }
                          setReplyingTo(comment.id);
                        }}
                        className="text-xs text-gray-500 hover:text-blue-600"
                      >
                        답글
                      </button>
                      {/* 댓글 더보기 메뉴 */}
                      <div className="relative ml-auto">
                        <button
                          onClick={() => setShowCommentMenu(showCommentMenu === comment.id ? null : comment.id)}
                          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                        
                        {showCommentMenu === comment.id && (
                          <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
                            {isCommentOwner ? (
                              /* 본인 댓글: 수정/삭제 */
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingComment({ id: comment.id, content: comment.content });
                                    setShowCommentMenu(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                  <span>수정하기</span>
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm('이 댓글을 삭제하시겠습니까?')) {
                                      setComments(comments.filter(c => c.id !== comment.id));
                                    }
                                    setShowCommentMenu(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>삭제하기</span>
                                </button>
                              </>
                            ) : (
                              /* 타인 댓글: 신고하기 (회원만) */
                              !isGuest && (
                                <button
                                  onClick={() => {
                                    setReportTarget({ type: 'comment', id: comment.id, author: comment.userId });
                                    setShowCommentMenu(null);
                                    setShowReportModal(true);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <Flag className="w-3.5 h-3.5" />
                                  <span>신고하기</span>
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* 대댓글 입력 */}
                    {replyingTo === comment.id && (
                      <div className="mt-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleReplySubmit(comment.id)}
                            placeholder="답글을 입력하세요..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            maxLength={500}
                          />
                          <button
                            onClick={() => handleReplySubmit(comment.id)}
                            disabled={!replyText.trim()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-1"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                          {replyText.length}/500
                        </p>
                      </div>
                    )}
                    {/* 대댓글 목록 */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-2 pl-4">
                        {comment.replies.map(reply => {
                          const isReplyOwner = reply.userId === 'current_user';
                          
                          return (
                          <div key={reply.id} className="flex gap-3 mt-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {reply.userName[0]}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-900">{reply.userName}</span>
                                <span className="text-xs text-gray-400">{reply.timeAgo}</span>
                              </div>
                              
                              {/* 수정 모드 */}
                              {editingComment?.id === reply.id ? (
                                <div className="mb-2">
                                  <textarea
                                    value={editingComment.content}
                                    onChange={(e) => setEditingComment({ ...editingComment, content: e.target.value })}
                                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                                    rows={3}
                                    maxLength={500}
                                    autoFocus
                                  />
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-gray-500">{editingComment.content.length}/500</span>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => setEditingComment(null)}
                                        className="px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                      >
                                        취소
                                      </button>
                                      <button
                                        onClick={() => {
                                          if (editingComment.content.trim()) {
                                            setComments(comments.map(c => {
                                              if (c.id === comment.id) {
                                                return {
                                                  ...c,
                                                  replies: c.replies?.map(r => 
                                                    r.id === reply.id 
                                                      ? { ...r, content: editingComment.content }
                                                      : r
                                                  )
                                                };
                                              }
                                              return c;
                                            }));
                                            setEditingComment(null);
                                          }
                                        }}
                                        disabled={!editingComment.content.trim()}
                                        className="px-3 py-1.5 text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
                                      >
                                        저장
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                                  {reply.content}
                                </p>
                              )}
                              
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => {
                                    if (isGuest) { requireLogin('공감'); return; }
                                    handleCommentLike(reply.id, comment.id);
                                  }}
                                  className={`flex items-center gap-1 text-xs transition-colors ${
                                    isGuest
                                      ? 'text-gray-300 cursor-default'
                                      : reply.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                                  }`}
                                >
                                  <Heart className={`w-3 h-3 ${!isGuest && reply.isLiked ? 'fill-red-500' : ''}`} />
                                  <span>{reply.likes}</span>
                                </button>
                                {/* 대댓글 더보기 메뉴 */}
                                <div className="relative ml-auto">
                                  <button
                                    onClick={() => setShowCommentMenu(showCommentMenu === reply.id ? null : reply.id)}
                                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                                  >
                                    <MoreVertical className="w-3.5 h-3.5 text-gray-400" />
                                  </button>
                                  
                                  {showCommentMenu === reply.id && (
                                    <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
                                      {isReplyOwner ? (
                                        /* 본인 댓글: 수정/삭제 */
                                        <>
                                          <button
                                            onClick={() => {
                                              setEditingComment({ id: reply.id, content: reply.content, parentId: comment.id });
                                              setShowCommentMenu(null);
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-blue-600 hover:bg-blue-50 transition-colors"
                                          >
                                            <Pencil className="w-3.5 h-3.5" />
                                            <span>수정하기</span>
                                          </button>
                                          <button
                                            onClick={() => {
                                              if (confirm('이 답글을 삭제하시겠습니까?')) {
                                                setComments(comments.map(c => {
                                                  if (c.id === comment.id) {
                                                    return {
                                                      ...c,
                                                      replies: c.replies?.filter(r => r.id !== reply.id)
                                                    };
                                                  }
                                                  return c;
                                                }));
                                              }
                                              setShowCommentMenu(null);
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>삭제하기</span>
                                          </button>
                                        </>
                                      ) : (
                                        /* 타인 댓글: 신고하기 (회원만) */
                                        !isGuest && (
                                          <button
                                            onClick={() => {
                                              setReportTarget({ type: 'comment', id: reply.id, author: reply.userId });
                                              setShowCommentMenu(null);
                                              setShowReportModal(true);
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors"
                                          >
                                            <Flag className="w-3.5 h-3.5" />
                                            <span>신고하기</span>
                                          </button>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                );
              })}
            </div>

            {/* Empty State */}
            {comments.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-600 font-medium">첫 댓글을 작성해보세요</p>
              </div>
            )}
          </div>
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-gray-200">
          {/* 비회원 - 댓글 입력 불가 */}
          {isGuest ? (
            <div className="space-y-3">
              <div
                className="flex gap-2 cursor-pointer"
                onClick={() => requireLogin('댓글 작성')}
              >
                <div className="flex-1 relative">
                  <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    <span className="text-sm text-gray-300">로그인 후 댓글을 남길 수 있어요</span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-gray-100 text-gray-300 rounded-lg flex items-center gap-1">
                  <Send className="w-4 h-4" />
                </div>
              </div>
              {/* 로그인 유도 배너 */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
                <p className="text-xs text-amber-800 text-center">
                  ⚠️ 로그인하면 댓글을 작성하고 공감을 표현할 수 있어요
                </p>
                <button
                  onClick={() => requireLogin('댓글 작성')}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
                >
                  로그인하기
                </button>
              </div>
            </div>
          ) : (
            /* 회원 - 댓글 입력 가능 */
            <>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                  placeholder="댓글을 입력하세요..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  maxLength={500}
                />
                <button
                  onClick={handleCommentSubmit}
                  disabled={!commentText.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-right">
                {commentText.length}/500
              </p>
            </>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-base font-bold text-gray-900">공유하기</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Share Options */}
            <div className="p-4 space-y-2">
              {/* 카카오톡 */}
              <button
                onClick={handleShareKakao}
                className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#3C1E1E">
                    <path d="M12 3C6.48 3 2 6.58 2 11c0 2.89 1.97 5.43 4.93 6.87-.2.73-.66 2.43-.76 2.82-.13.5.18.49.37.36.15-.11 2.37-1.62 3.4-2.32.66.09 1.35.14 2.06.14 5.52 0 10-3.58 10-8S17.52 3 12 3z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">카카오톡</p>
                  <p className="text-xs text-gray-500">카오톡으로 공유하기</p>
                </div>
              </button>

              {/* 인스타그램 */}
              <button
                onClick={handleShareInstagram}
                className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2C5.6 4 4 5.6 4 7.6v8.8C4 18.4 5.6 20 7.6 20h8.8c2 0 3.6-1.6 3.6-3.6V7.6C20 5.6 18.4 4 16.4 4H7.6zM17.25 5.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm0 2c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">인스타그램</p>
                  <p className="text-xs text-gray-500">인스타그램 스토리에 공유하기</p>
                </div>
              </button>

              {/* 링크 복사 */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">링크 복사</p>
                  <p className="text-xs text-gray-500">게시글 링크 복사하기</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Required Modal */}
      <LoginRequiredToast
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => { setRole('member'); setShowLoginModal(false); }}
        feature={loginFeature}
      />

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
            {/* 경고 헤더 */}
            <div className="bg-red-500 px-6 pt-6 pb-5 flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base font-bold text-white">게시글 삭제</h3>
            </div>
            {/* 본문 */}
            <div className="p-6 text-center">
              <p className="text-sm text-gray-700 mb-1">
                이 게시글을 삭제하면 복구할 수 없습니다.
              </p>
              <p className="text-sm text-gray-500">
                댓글·공감 데이터도 함께 삭제됩니다.
              </p>
            </div>
            {/* 버튼 */}
            <div className="flex gap-2 px-6 pb-6">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                취소
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  onDelete?.();
                  onClose();
                }}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 신고 모달 */}
      {showReportModal && reportTarget && (
        <ReportModal
          type={reportTarget.type}
          targetId={reportTarget.id}
          targetAuthor={reportTarget.author}
          onClose={() => {
            setShowReportModal(false);
            setReportTarget(null);
          }}
          onSubmit={(data) => {
            // 실제로는 백엔드로 전송
            console.log('신고 데이터:', data);
          }}
        />
      )}

      {/* 이미지 라이트박스 */}
      {showLightbox && post.attachedImages && (
        <ImageLightbox
          images={post.attachedImages}
          initialIndex={lightboxIndex}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </div>
  );
}