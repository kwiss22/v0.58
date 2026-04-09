// 커뮤니티 추천글 카드 — 이미지 첨부 디자인 기준
import { Heart, MessageCircle, User } from 'lucide-react';
import type { CommunityPost } from '@/constants/community-data';
import { postPlainBodyText } from '@/constants/community-data';
import { VerificationBadge } from '../VerificationBadge';

interface CommunityPostCardProps {
  post: CommunityPost;
  onClick?: () => void;
}

export function CommunityPostCard({ post, onClick }: CommunityPostCardProps) {
  const displayName = post.nickname ?? '익명';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer flex flex-col gap-3 w-48 shrink-0"
    >
      {/* 유저 정보 행 */}
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1.5 min-w-0">
          {/* 아바타 */}
          <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-blue-400" />
          </div>
          {/* 이름 + 날짜 */}
          <div className="min-w-0">
            <span className="text-xs text-gray-800 truncate block">{displayName}</span>
            <span className="text-[10px] text-gray-400">{post.timeAgo}</span>
          </div>
        </div>
        {/* 인증 뱃지 */}
        {post.isVerified && (
          <VerificationBadge type="verified" size="sm" />
        )}
      </div>

      {/* 제목 & 뱃지 */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm text-gray-900 line-clamp-2 leading-snug">
          {post.title}
        </h3>
      </div>

      {/* 내용 미리보기 */}
      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
        {postPlainBodyText(post)}
      </p>

      {/* 하단 통계 */}
      <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-auto pt-1 border-t border-gray-50">
        <div
          className={`flex items-center gap-1 ${post.isLiked ? 'text-pink-600' : ''}`}
        >
          <Heart className={`w-3 h-3 ${post.isLiked ? 'fill-pink-200' : ''}`} />
          <span>공감해요</span>
          <span className={post.isLiked ? 'text-pink-600 font-medium' : 'text-gray-600'}>{post.likeCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          <span className="text-gray-600">{post.comments}</span>
        </div>
      </div>
    </div>
  );
}