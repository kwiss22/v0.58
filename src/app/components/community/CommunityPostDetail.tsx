import { ArrowLeft, Heart, MessageCircle, Eye, Send } from 'lucide-react';
import { CommunityPost, Comment } from '@/constants/community-data';
import { useState } from 'react';
import { ReportModal } from '@/app/components/ReportModal';

interface CommunityPostDetailProps {
  post: CommunityPost;
  comments: Comment[];
  onBack: () => void;
  onLike: (postId: string) => void;
  onCommentLike: (commentId: string) => void;
  onCommentSubmit: (content: string) => void;
}

export function CommunityPostDetail({
  post,
  comments,
  onBack,
  onLike,
  onCommentLike,
  onCommentSubmit,
}: CommunityPostDetailProps) {
  const [commentText, setCommentText] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTarget, setReportTarget] = useState<{ type: 'post' | 'comment'; id: string; author?: string } | null>(null);

  const categoryNames: { [key: string]: string } = {
    internal: '내과',
    surgery: '외과',
    pediatrics: '소아과',
    dermatology: '피부과',
    orthopedics: '정형외과',
    psychiatry: '정신과',
    etc: '기타',
  };

  const handleSubmit = () => {
    if (commentText.trim()) {
      onCommentSubmit(commentText);
      setCommentText('');
    }
  };

  const handleReport = (type: 'post' | 'comment', id: string, author?: string) => {
    setReportTarget({ type, id, author });
    setShowReportModal(true);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h2 className="font-bold text-gray-900">게시글</h2>
      </div>

      {/* 내용 영역 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {/* 게시글 본문 */}
          <div className="px-4 py-4 border-b border-gray-200">
            {/* 작성자 정보 */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {post.author.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{post.author.name}</span>
                  <span className="text-xs text-gray-500">{post.createdAt}</span>
                </div>
                <span className="text-xs text-blue-600 font-medium">
                  {categoryNames[post.category] || post.category}
                </span>
              </div>
            </div>

            {/* 제목과 내용 */}
            <h1 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h1>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">{post.content}</p>

            {/* 이미지 */}
            {post.images && post.images.length > 0 && (
              <div className="mb-4 space-y-2">
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                ))}
              </div>
            )}

            {/* 인터랙션 버튼들 */}
            <div className="flex items-center gap-4 text-sm text-gray-500 pt-3 border-t border-gray-100">
              <button
                onClick={() => onLike(post.id)}
                className={`flex items-center gap-1.5 ${
                  post.isLiked ? 'text-red-500' : 'hover:text-red-500'
                } transition-colors`}
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="font-medium">{post.likes}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{post.comments}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Eye className="w-5 h-5" />
                <span className="font-medium">{post.views}</span>
              </div>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="px-4 py-4">
            <h3 className="font-bold text-gray-900 mb-4">
              댓글 {comments.length}
            </h3>

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                    {comment.author.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {comment.author.name}
                      </span>
                      <span className="text-xs text-gray-500">{comment.createdAt}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                    <button
                      onClick={() => onCommentLike(comment.id)}
                      className={`flex items-center gap-1 text-xs ${
                        comment.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      } transition-colors`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${comment.isLiked ? 'fill-current' : ''}`} />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {comments.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">첫 댓글을 남겨보세요!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 댓글 입력 */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="댓글을 입력하세요..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSubmit}
            disabled={!commentText.trim()}
            className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

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
    </div>
  );
}