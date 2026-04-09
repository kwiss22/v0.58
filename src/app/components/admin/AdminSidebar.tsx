// 관리자 사이드바

import {
  LayoutDashboard,
  AlertTriangle,
  Edit3,
  BadgeCheck,
  Stethoscope,
  FileText,
  MessageCircle,
  Users,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

interface AdminSidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  onLogout: () => void;
  pendingReportsCount: number;
  pendingEditRequestsCount: number;
  pendingVerificationRequestsCount: number;
}

export function AdminSidebar({
  activeMenu,
  setActiveMenu,
  onLogout,
  pendingReportsCount,
  pendingEditRequestsCount,
  pendingVerificationRequestsCount,
}: AdminSidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
          <h1 className="font-bold text-lg text-gray-900">Aiga 관리자</h1>
        </div>
        <p className="text-xs text-gray-500">시스템 관리</p>
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {/* 대시보드 (향후) */}
          <button
            onClick={() => setActiveMenu('dashboard')}
            disabled
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === 'dashboard'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <LayoutDashboard className="w-4.5 h-4.5" />
            <span>대시보드</span>
            <span className="ml-auto text-xs text-gray-400">(향후)</span>
          </button>

          {/* 신고 관리 */}
          <button
            onClick={() => setActiveMenu('reports')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === 'reports'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <AlertTriangle className="w-4.5 h-4.5" />
            <span>신고 관리</span>
            {pendingReportsCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingReportsCount}
              </span>
            )}
          </button>

          <div className="my-2 border-t border-gray-200" />

          {/* 의사 정보 수정 요청 */}
          <button
            onClick={() => setActiveMenu('doctor-edit')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === 'doctor-edit'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Edit3 className="w-4.5 h-4.5" />
            <span>정보 수정 요청</span>
            {pendingEditRequestsCount > 0 && (
              <span className="ml-auto bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingEditRequestsCount}
              </span>
            )}
          </button>

          {/* 의료진 인증 요청 */}
          <button
            onClick={() => setActiveMenu('doctor-verify')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === 'doctor-verify'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BadgeCheck className="w-4.5 h-4.5" />
            <span>의료진 인증</span>
            {pendingVerificationRequestsCount > 0 && (
              <span className="ml-auto bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingVerificationRequestsCount}
              </span>
            )}
          </button>

          {/* 의료진 관리 */}
          <button
            onClick={() => setActiveMenu('doctors')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === 'doctors'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Stethoscope className="w-4.5 h-4.5" />
            <span>의료진 관리</span>
          </button>

          <div className="my-2 border-t border-gray-200" />

          {/* 게시글 관리 (향후) */}
          <button
            onClick={() => setActiveMenu('posts')}
            disabled
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === 'posts'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <FileText className="w-4.5 h-4.5" />
            <span>게시글 관리</span>
            <span className="ml-auto text-xs text-gray-400">(향후)</span>
          </button>

          {/* 댓글 관리 (향후) */}
          <button
            onClick={() => setActiveMenu('comments')}
            disabled
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === 'comments'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <MessageCircle className="w-4.5 h-4.5" />
            <span>댓글 관리</span>
            <span className="ml-auto text-xs text-gray-400">(향후)</span>
          </button>

          {/* 회원 관리 (향후) */}
          <button
            onClick={() => setActiveMenu('users')}
            disabled
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === 'users'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <Users className="w-4.5 h-4.5" />
            <span>회원 관리</span>
            <span className="ml-auto text-xs text-gray-400">(향후)</span>
          </button>
        </div>
      </nav>

      {/* 로그아웃 */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
}
