// Aiga - 웹 기반 의료 AI 챗봇 (모바일/PC 반응형, 항상 가운데 정렬)

import { useState, useEffect } from 'react';
import { UserProvider } from './contexts/UserContext';
import { AppNavigationProvider, useAppNavigation } from './contexts/AppNavigationContext';
import { HomePage } from './components/HomePage';
import { ChatPage } from './components/ChatPage';
import { DoctorSearchPage } from './components/DoctorSearchPage';
import { CommunityPage } from './components/CommunityPage';
import { MyPage } from './components/MyPage';
import { AdminLoginPage } from './components/AdminLoginPage';
import { AdminPage } from './components/AdminPage';
import { BottomTabBar } from './components/layout/BottomTabBar';
import { SpecPanel } from './components/SpecPanel';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Search, Smartphone, LayoutPanelLeft } from 'lucide-react';
import { UsageLimitProvider } from './contexts/UsageLimitContext';
import { GuestLimitModal } from './components/GuestLimitModal';
import { DebugPanel } from './components/DebugPanel';

// 전역 검색 아이콘을 띄울 탭 목록 (chat·mypage 제외)
const TABS_WITH_SEARCH = ['home', 'search', 'community'];

function AppContent() {
  const { activeTab, setActiveTab, navigateToChat, navigateToCommunity, navigateToDoctorSearch,
    isGlobalSearchOpen, globalSearchQuery, openGlobalSearch, closeGlobalSearch } = useAppNavigation();
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [adminMode, setAdminMode] = useState<'none' | 'login' | 'main'>('none');
  const [chatInitialMessage, setChatInitialMessage] = useState<string | undefined>();

  // 관리자 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('aiga_admin_token');
    if (token === 'admin_logged_in') {
      // 자동 로그인 (개발 편의용)
      // 실제로는 토큰 유효성 검증 필요
    }
  }, []);

  // 관리자 로그인 성공
  const handleAdminLoginSuccess = () => {
    setAdminMode('main');
  };

  // 관리자 로그아웃
  const handleAdminLogout = () => {
    localStorage.removeItem('aiga_admin_token');
    setAdminMode('none');
  };

  // 관리자 페이지 진입
  const handleOpenAdminPage = () => {
    const token = localStorage.getItem('aiga_admin_token');
    if (token === 'admin_logged_in') {
      setAdminMode('main');
    } else {
      setAdminMode('login');
    }
  };

  // Context 검색 상태와 로컬 상태를 통합 (Context 우선)
  const searchOpen = isGlobalSearchOpen || showGlobalSearch;
  const searchQuery = isGlobalSearchOpen ? globalSearchQuery : '';

  const handleCloseSearch = () => {
    closeGlobalSearch();
    setShowGlobalSearch(false);
  };

  const handleNavigateToChat = (message?: string) => {
    setChatInitialMessage(message);
    navigateToChat();
    handleCloseSearch();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            onNavigateToChat={navigateToChat}
            onNavigateToCommunity={navigateToCommunity}
          />
        );
      case 'chat':
        return <ChatPage onNavigateBack={() => setActiveTab('home')} initialMessage={chatInitialMessage} />;
      case 'search':
        return <DoctorSearchPage onNavigateToChat={navigateToChat} />;
      case 'community':
        return (
          <CommunityPage
            onNavigateToChat={navigateToChat}
            onNavigateToDoctors={navigateToDoctorSearch}
          />
        );
      case 'mypage':
        return <MyPage />;
      default:
        return <HomePage onNavigateToChat={navigateToChat} onNavigateToCommunity={navigateToCommunity} />;
    }
  };

  const showSearchIcon = TABS_WITH_SEARCH.includes(activeTab);

  // 관리자 페이지 (로그인)
  if (adminMode === 'login') {
    return (
      <AdminLoginPage
        onLoginSuccess={handleAdminLoginSuccess}
        onCancel={() => setAdminMode('none')}
      />
    );
  }

  // 관리자 페이지 (메인)
  if (adminMode === 'main') {
    return <AdminPage onLogout={handleAdminLogout} />;
  }

  // 모바일 미리보기 모드
  if (mobilePreview) {
    return (
      <div className="h-screen bg-slate-800 flex flex-col items-center justify-center overflow-hidden">
        {/* 상단 툴바 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
            <Smartphone className="w-3.5 h-3.5 text-white/70" />
            <span className="text-white/70 text-xs font-medium">모바일 미리보기</span>
          </div>
          <button
            onClick={() => setMobilePreview(false)}
            className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
          >
            <LayoutPanelLeft className="w-3.5 h-3.5" />
            화면정의서로 돌아가기
          </button>
        </div>

        {/* 폰 프레임 */}
        <div className="relative flex-shrink-0" style={{ height: 'calc(100vh - 80px)', maxHeight: '812px' }}>
          {/* 폰 외곽 */}
          <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-2xl shadow-black/60 border-4 border-gray-700" style={{ margin: '-12px' }} />
          {/* 노치 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-20" />
          {/* 화면 */}
          <div
            className="relative bg-gray-50 overflow-hidden rounded-[2.2rem] z-10"
            style={{ width: '390px', height: '100%', maxWidth: 'calc(100vw - 48px)' }}
          >
            {/* 전역 검색 버튼 */}
            {showSearchIcon && (
              <button
                onClick={() => setShowGlobalSearch(true)}
                aria-label="전체 검색"
                className="absolute top-3.5 right-4 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all"
              >
                <Search className="w-4.5 h-4.5 text-gray-500" />
              </button>
            )}
            {/* 메인 콘텐츠 */}
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-hidden relative">
                {renderContent()}
              </div>
              {activeTab !== 'chat' && (
                <BottomTabBar
                  activeTab={activeTab}
                  onTabChange={(tab) => { setActiveTab(tab); handleCloseSearch(); }}
                />
              )}
            </div>
            {/* 전체 검색 모달 — BottomTabBar 위까지 덮는 풀 오버레이 */}
            <GlobalSearchModal
              isOpen={searchOpen}
              initialQuery={searchQuery}
              onClose={handleCloseSearch}
              onNavigateToDoctorSearch={(q) => { navigateToDoctorSearch(q); handleCloseSearch(); }}
              onNavigateToCommunity={(q) => { navigateToCommunity(q); handleCloseSearch(); }}
              onNavigateToChat={handleNavigateToChat}
            />
            {/* 비회원 한도 초과 모달 */}
            <GuestLimitModal />
            {/* 개발용 디버그 패널 */}
            <DebugPanel />
          </div>
        </div>
      </div>
    );
  }

  // 기본 분할 레이아웃
  return (
    <div className="h-screen bg-slate-100 flex overflow-hidden">
      {/* 왼쪽: 앱 화면 — 모바일 전체 / PC는 max-w-2xl 고정폭으로 왼쪽 부착 */}
      <div className="relative w-full md:w-[42rem] md:flex-shrink-0 flex flex-col bg-gray-50 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_40px_rgba(0,0,0,0.10)]">
        {/* 전역 검색 버튼 — 해당 탭에서만 우상단 고정 */}
        {showSearchIcon && (
          <button
            onClick={() => setShowGlobalSearch(true)}
            aria-label="전체 검색"
            className="absolute top-3.5 right-4 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all"
          >
            <Search className="w-4.5 h-4.5 text-gray-500" />
          </button>
        )}

        {/* 메인 콘텐츠 */}
        <div className="flex-1 overflow-hidden relative">
          {renderContent()}
        </div>

        {/* 하단 탭 내비게이션 */}
        {activeTab !== 'chat' && (
          <BottomTabBar
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              handleCloseSearch();
            }}
          />
        )}

        {/* 전체 검색 모달 — BottomTabBar 위까지 덮는 풀 오버레이 */}
        <GlobalSearchModal
          isOpen={searchOpen}
          initialQuery={searchQuery}
          onClose={handleCloseSearch}
          onNavigateToDoctorSearch={(q) => {
            navigateToDoctorSearch(q);
            handleCloseSearch();
          }}
          onNavigateToCommunity={(q) => {
            navigateToCommunity(q);
            handleCloseSearch();
          }}
          onNavigateToChat={handleNavigateToChat}
        />

        {/* 비회원 한도 초과 모달 */}
        <GuestLimitModal />
        {/* 개발용 디버그 패널 */}
        <DebugPanel />
      </div>

      {/* 오른쪽: 화면정의서 */}
      <div className="hidden md:block md:flex-1 min-w-0">
        <SpecPanel 
          onMobilePreview={() => setMobilePreview(true)}
          onAdminPage={handleOpenAdminPage}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppNavigationProvider>
      <UserProvider>
        <UsageLimitProvider>
          <AppContent />
        </UsageLimitProvider>
      </UserProvider>
    </AppNavigationProvider>
  );
}