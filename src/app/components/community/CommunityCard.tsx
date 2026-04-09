import { Heart, MessageCircle, Eye } from 'lucide-react';
import { CommunityPost } from '@/constants/community-data';

interface CommunityCardProps {
  post: CommunityPost;
  onClick: () => void;
  onLike: (postId: string) => void;
}

export function CommunityCard({ post, onClick, onLike }: CommunityCardProps) {
  const categoryNames: { [key: string]: string } = {
    internal: '내과',
    surgery: '외과',
    pediatrics: '소아과',
    dermatology: '피부과',
    orthopedics: '정형외과',
    psychiatry: '정신과',
    etc: '기타',
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border-b border-gray-200 px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      {/* 작성자 정보 */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
          {post.author.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
            <span className="text-xs text-gray-500">{post.createdAt}</span>
          </div>
          <span className="text-xs text-blue-600 font-medium">
            {categoryNames[post.category] || post.category}
          </span>
        </div>
      </div>

      {/* 게시글 내용 */}
      <div className="mb-3">
        <h3 className="font-bold text-gray-900 mb-1.5 line-clamp-1">{post.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
      </div>

      {/* 이미지 (있는 경우) */}
      {post.images && post.images.length > 0 && (
        <div className="mb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post image ${index + 1}`}
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}

      {/* 인터랙션 버튼들 */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike(post.id);
          }}
          className={`flex items-center gap-1 ${post.isLiked ? 'text-red-500' : 'hover:text-red-500'} transition-colors`}
        >
          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
          <span>{post.likes}</span>
        </button>

        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>{post.comments}</span>
        </div>

        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>{post.views}</span>
        </div>
      </div>
    </div>
  );
}
