// 커뮤니티 게시글 상세 모달
import { X, Heart, MessageCircle, Send, ChevronRight, Lock, AlertTriangle, MoreVertical, Flag, Share2, CornerDownRight, Pencil, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { postPlainBodyText, type CommunityPost } from '@/constants/community-data';
import { PostBodySegments } from '@/app/components/community/PostBodySegments';
import { useUser } from '@/app/contexts/UserContext';
import { VerificationBadge } from './VerificationBadge';
import { LoginRequiredToast } from './LoginRequiredToast';
import { ReportModal } from './ReportModal';

interface CommunityPostModalProps {
  post: CommunityPost;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCommunity: () => void;
  /** 회원: 게시글 공감 토글(재클릭 시 취소). 커뮤니티 탭과 동일 패턴 */
  onToggleLike?: (postId: string) => void;
  /** 현재 로그인 사용자가 이 게시글 작성자인지 */
  isOwner?: boolean;
  /** 수정 버튼 클릭 시 */
  onEdit?: () => void;
  /** 삭제 완료 시 */
  onDelete?: () => void;
}

interface Reply {
  id: string;
  userId: string;
  author: string;
  content: string;
  timeAgo: string;
  likes: number;
  isLiked: boolean;
}

interface Comment {
  id: string;
  userId: string;
  author: string;
  content: string;
  timeAgo: string;
  likes: number;
  isLiked: boolean;
  replies: Reply[];
}

// 더미 댓글 데이터
const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    userId: 'user10',
    author: '건강지킴이',
    content: '저도 비슷한 증상 있었는데 정말 공감돼요! 정보 감사합니다 👍',
    timeAgo: '1시간 전',
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: 'r1',
        userId: 'user13',
        author: '희망찬내일',
        content: '저도요! 함께 건강 챙겨요 😊',
        timeAgo: '50분 전',
        likes: 3,
        isLiked: false,
      },
    ],
  },
  {
    id: 'c2',
    userId: 'user11',
    author: '행복한엄마',
    content: '어떤 병원 가셨는지 궁금해요. AI 추천 받으셨나요?',
    timeAgo: '30분 전',
    likes: 8,
    isLiked: false,
    replies: [],
  },
  {
    id: 'c3',
    userId: 'user12',
    author: '20대건강',
    content: '완전 유익한 정보네요!! 저도 AI 상담 한번 받아봐야겠어요',
    timeAgo: '10분 전',
    likes: 5,
    isLiked: false,
    replies: [],
  },
];

export function CommunityPostModal({ 
  post, 
  isOpen, 
  onClose, 
  onNavigateToCommunity,
  onToggleLike,
  isOwner = false,
  onEdit,
  onDelete,
}: CommunityPostModalProps) {
  const { isGuest, setRole } = useUser();
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [loginFeature, setLoginFeature] = useState('');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCommentMenu, setShowCommentMenu] = useState<string | null>(null);
  const [reportTarget, setReportTarget] = useState<{ type: 'post' | 'comment'; id: string; author?: string } | null>(null);

  // 댓글 & 대댓글 상태
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null); // 현재 답글 입력창이 열린 댓글 ID
  const [replyText, setReplyText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [editingComment, setEditingComment] = useState<{ id: string; content: string; parentId?: string } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setComments(
      post.comments === 0
        ? []
        : INITIAL_COMMENTS.map((c) => ({
            ...c,
            replies: c.replies.map((r) => ({ ...r })),
          }))
    );
    setActiveReplyId(null);
    setReplyText('');
    setCommentText('');
    setEditingComment(null);
    setShowCommentMenu(null);
  }, [isOpen, post.id]);

  if (!isOpen) return null;

  const totalCommentCount = comments.reduce((acc, c) => acc + 1 + c.replies.length, 0);

  const displayName = post.nickname ?? '익명';
  const avatarInitial = displayName[0].toUpperCase();

  const handleNavigate = () => {
    onClose();
    onNavigateToCommunity();
  };

  const requireLogin = (feature: string) => {
    setLoginFeature(feature);
    setShowLoginToast(true);
  };

  const handleLogin = () => {
    setRole('member');
    setShowLoginToast(false);
  };

  // 답글 버튼 클릭
  const handleReplyClick = (commentId: string) => {
    if (isGuest) {
      requireLogin('답글 작성');
      return;
    }
    // 같은 댓글이면 닫기, 다른 댓글이면 열기
    setActiveReplyId(prev => prev === commentId ? null : commentId);
    setReplyText('');
  };

  // 답글 제출
  const handleReplySubmit = (commentId: string) => {
    if (!replyText.trim()) return;
    const newReply: Reply = {
      id: `r-${Date.now()}`,
      userId: 'current_user',
      author: '나',
      content: replyText.trim(),
      timeAgo: '방금 전',
      likes: 0,
      isLiked: false,
    };
    setComments(prev =>
      prev.map(c =>
        c.id === commentId
          ? { ...c, replies: [...c.replies, newReply] }
          : c
      )
    );
    setReplyText('');
    setActiveReplyId(null);
  };

  // 댓글 작성
  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      userId: 'current_user',
      author: '나',
      content: commentText.trim(),
      timeAgo: '방금 전',
      likes: 0,
      isLiked: false,
      replies: [],
    };

    setComments([...comments, newComment]);
    setCommentText('');
  };

  // 댓글/대댓글 좋아요
  const handleCommentLike = (commentId: string, parentCommentId?: string) => {
    if (isGuest) {
      requireLogin('공감');
      return;
    }

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

  // 공유 기능
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

  return (
    <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 flex-shrink-0">
          <h2 className="font-bold text-gray-900">게시글</h2>
          <div className="flex items-center gap-1">
            {/* 더보기 메뉴 */}
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>

              {showMoreMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowMoreMenu(false)} />
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20">
                    <button
                      onClick={() => {
                        setShowMoreMenu(false);
                        setShowShareModal(true);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>공유하기</span>
                    </button>
                    {isOwner ? (
                      /* 작성자 본인: 수정 / 삭제 */
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
                      /* 타인 (회원만 신고) */
                      !isGuest && (
                        <>
                          <div className="border-t border-gray-100" />
                          <button
                            onClick={() => {
                              setShowMoreMenu(false);
                              setReportTarget({ type: 'post', id: post.id, author: post.nickname ?? '익명' });
                              setShowReportModal(true);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Flag className="w-4 h-4" />
                            <span>신고하기</span>
                          </button>
                        </>
                      )
                    )}
                  </div>
                </>
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

        {/* 커뮤니티 유도 배너 */}
        <button
          onClick={handleNavigate}
          className="flex items-center justify-between px-5 py-3 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex-shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">💬</span>
            <span className="text-sm font-medium">커뮤니티에서 비슷한 글 더 보기</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Post Content */}
          <div className="px-5 py-4 border-b border-gray-100">
            {/* Author Info */}
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-50">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">{avatarInitial}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-gray-900">{displayName}</span>
                  {post.isVerified && <VerificationBadge type="verified" size="sm" />}
                </div>
                <span className="text-xs text-gray-400">{post.timeAgo}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-bold text-gray-900 mb-3 leading-snug text-base">{post.title}</h3>

            {/* Disease Tag */}
            <div className="mb-3 flex items-center gap-2">
              {post.disease && (
                <span className="text-xs text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                  {post.disease}
                </span>
              )}
            </div>

            {/* Content */}
            {post.bodySegments?.length ? (
              <PostBodySegments
                bodySegments={post.bodySegments}
                attachedImages={post.attachedImages}
                variant="detail"
              />
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{postPlainBodyText(post)}</p>
            )}

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isGuest) {
                    requireLogin('공감');
                    return;
                  }
                  onToggleLike?.(post.id);
                }}
                className={`flex items-center gap-1 transition-colors ${
                  isGuest
                    ? 'text-gray-300 cursor-default'
                    : post.isLiked
                      ? 'text-pink-600'
                      : 'text-gray-500 hover:text-pink-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${!isGuest && post.isLiked ? 'fill-pink-200' : ''}`} />
                <span>공감해요 {post.likeCount}</span>
              </button>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{totalCommentCount}</span>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="px-5 py-4">
            <p className="font-bold text-gray-900 mb-4">댓글 {totalCommentCount}개</p>
            <div className="space-y-5">
              {comments.map((comment) => {
                const isCommentOwner = comment.userId === 'current_user';
                
                return (
                  <div key={comment.id}>
                    {/* 댓글 */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{comment.author[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{comment.author}</span>
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
                          <p className="text-sm text-gray-700 leading-relaxed mb-1">{comment.content}</p>
                        )}
                        
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <button
                            onClick={() => handleCommentLike(comment.id)}
                            className={`flex items-center gap-1 transition-colors ${
                              isGuest
                                ? 'text-gray-300 cursor-default'
                                : comment.isLiked ? 'text-red-500' : 'hover:text-red-500'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${!isGuest && comment.isLiked ? 'fill-red-500' : ''}`} />
                            <span>{comment.likes}</span>
                          </button>
                          <button
                            onClick={() => handleReplyClick(comment.id)}
                            className={`flex items-center gap-1 transition-colors ${
                              activeReplyId === comment.id
                                ? 'text-blue-600 font-medium'
                                : 'hover:text-blue-600'
                            }`}
                          >
                            <CornerDownRight className="w-3.5 h-3.5" />
                            <span>답글 {comment.replies.length > 0 ? comment.replies.length : ''}</span>
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
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowCommentMenu(null)} />
                                <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20">
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
                                          setReportTarget({ type: 'comment', id: comment.id, author: comment.author });
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
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 대댓글 목록 + 인라인 입력창 */}
                    {(comment.replies.length > 0 || activeReplyId === comment.id) && (
                      <div className="ml-11 mt-3 pl-3 border-l-2 border-gray-100 space-y-3">
                        {/* 기존 대댓글 */}
                        {comment.replies.map((reply) => {
                          const isReplyOwner = reply.userId === 'current_user';
                          
                          return (
                            <div key={reply.id} className="flex gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs font-bold">{reply.author[0]}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium text-gray-900">{reply.author}</span>
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
                                  <p className="text-sm text-gray-700 leading-relaxed mb-1">{reply.content}</p>
                                )}
                                
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  <button
                                    onClick={() => handleCommentLike(reply.id, comment.id)}
                                    className={`flex items-center gap-1 transition-colors ${
                                      isGuest
                                        ? 'text-gray-300 cursor-default'
                                        : reply.isLiked ? 'text-red-500' : 'hover:text-red-500'
                                    }`}
                                  >
                                    <Heart className={`w-3.5 h-3.5 ${!isGuest && reply.isLiked ? 'fill-red-500' : ''}`} />
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
                                      <>
                                        <div className="fixed inset-0 z-10" onClick={() => setShowCommentMenu(null)} />
                                        <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20">
                                          {isReplyOwner ? (
                                            /* 본인 대댓글: 수정/삭제 */
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
                                            /* 타인 대댓글: 신고하기 (회원만) */
                                            !isGuest && (
                                              <button
                                                onClick={() => {
                                                  setReportTarget({ type: 'comment', id: reply.id, author: reply.author });
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
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {/* 인라인 답글 입력창 */}
                        {activeReplyId === comment.id && (
                          <div className="flex gap-2.5 pt-1">
                            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">나</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-colors">
                                <input
                                  type="text"
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleReplySubmit(comment.id); } }}
                                  placeholder="답글을 입력하세요..."
                                  className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleReplySubmit(comment.id)}
                                  disabled={!replyText.trim()}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 disabled:bg-gray-200 transition-colors flex-shrink-0"
                                >
                                  <Send className="w-3 h-3 text-white" />
                                </button>
                              </div>
                              <button
                                onClick={() => { setActiveReplyId(null); setReplyText(''); }}
                                className="mt-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                취소
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {comments.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-600 font-medium">첫 댓글을 작성해보세요</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom: Comment Input */}
        <div className="flex-shrink-0 border-t border-gray-100">
          {isGuest ? (
            /* 비회원 - 댓글 입력 불가 */
            <>
              <div
                className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 cursor-pointer"
                onClick={() => requireLogin('댓글 작성')}
              >
                <div className="flex-1 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    로그인 후 댓글을 남길 수 있어요
                  </span>
                </div>
                <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                  <Lock className="w-4 h-4 text-gray-300" />
                </div>
              </div>

              <div className="px-4 pt-3 pb-4 space-y-2.5 bg-amber-50">
                <div className="flex items-center gap-2 justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <p className="text-xs text-amber-700">
                    로그인하면 댓글을 작성하고 공감을 표현할 수 있습니다
                  </p>
                </div>
                <button
                  onClick={() => requireLogin('댓글 작성')}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-white font-medium py-3 rounded-xl transition-colors text-sm"
                >
                  로그인하기
                </button>
              </div>
            </>
          ) : (
            /* 회원 - 댓글 입력 가능 */
            <div className="px-4 py-3">
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
            </div>
          )}
        </div>
      </div>

      {/* Login Required Toast */}
      <LoginRequiredToast
        isOpen={showLoginToast}
        onClose={() => setShowLoginToast(false)}
        onLogin={handleLogin}
        feature={loginFeature}
      />

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
          onSubmit={() => {
            setShowReportModal(false);
            setReportTarget(null);
          }}
        />
      )}

      {/* 공유 모달 */}
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
                  <p className="text-xs text-gray-500">카카오톡으로 공유하기</p>
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

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="bg-red-500 px-6 pt-6 pb-5 flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base font-bold text-white">게시글 삭제</h3>
            </div>
            <div className="p-6 text-center">
              <p className="text-sm text-gray-700 mb-1">이 게시글을 삭제하면 복구할 수 없습니다.</p>
              <p className="text-sm text-gray-500">댓글·공감 데이터도 함께 삭제됩니다.</p>
            </div>
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
    </div>
  );
}