import { Bell } from 'lucide-react';

export function CommunityHeader() {
  return (
    <div className="bg-white border-b border-gray-200 h-[56px] px-4">
      <div className="max-w-3xl mx-auto h-full flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">커뮤니티</h1>
        
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors relative"
          aria-label="알림"
        >
          <Bell className="w-6 h-6 text-gray-700" />
          {/* 알림 배지 */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </div>
  );
}
