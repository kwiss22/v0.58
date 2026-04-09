// 사용자 프로필 모달 - 심플한 바텀시트 팝업
import { X, User, Eye } from 'lucide-react';

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
  aiLabel: string;
  likeCount: number;
  comments: number;
  views: number;
  timeAgo: string;
  isLiked?: boolean;
  isVerified?: boolean;
}

interface UserProfileModalProps {
  userId: string;
  posts: Post[];
  onClose: () => void;
  onViewUserPosts: (userId: string) => void;
}

export function UserProfileModal({
  userId,
  posts,
  onClose,
  onViewUserPosts,
}: UserProfileModalProps) {
  // 해당 사용자가 작성한 게시물만 필터링
  const userPosts = posts.filter(post => post.userId === userId);
  
  // 사용자 정보 (첫 번째 게시물에서 추출)
  const userInfo = userPosts[0];
  
  if (!userInfo) {
    return null;
  }

  const getUserTypeLabel = (userRole: 'patient' | 'caregiver') => {
    return userRole === 'patient' ? '환우' : '보호자';
  };

  const getUserTypeColor = (userRole: 'patient' | 'caregiver') => {
    if (userRole === 'patient') {
      return 'bg-green-50 text-green-700 border-green-200';
    } else {
      return 'bg-orange-50 text-orange-700 border-orange-200';
    }
  };

  return (
    <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Avatar */}
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mb-4 shadow-lg">
            <User className="w-12 h-12" />
          </div>

          {/* User Name */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">익명{userId.slice(-2)}</h3>

          {/* Post Count */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                작성한 글 <span className="font-bold text-gray-900">{userPosts.length}개</span>
              </span>
            </div>
          </div>

          {/* View Posts Button */}
          <button
            onClick={() => {
              onViewUserPosts(userId);
              onClose();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-blue-600/30"
          >
            이 사람의 글 보기
          </button>
        </div>
      </div>
    </div>
  );
}