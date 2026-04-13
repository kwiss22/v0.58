// @refresh reset
// 앱 네비게이션 상태를 전역 관리하는 Context
import { createContext, useContext, useState, ReactNode } from 'react';
import type { Doctor } from '@/types/chat.types';

export type Tab = 'home' | 'chat' | 'search' | 'community' | 'mypage';
export type HomeSubTab = 'popular' | 'department' | 'findDoctor';
export type SpecTab =
  | 'home'
  | 'aiga-chatbot-spec'
  | 'common'
  | 'doctor'
  | 'search-spec'
  | 'community'
  | 'mypage-spec';

interface AppNavigationState {
  // 메인 탭
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  previousTab: Tab;
  navigateToPreviousTab: () => void;

  // 홈 페이지 상태
  homeSelectedCategory: string;
  setHomeSelectedCategory: (category: string) => void;

  // 명의 찾기 검색어
  doctorSearchQuery: string;
  setDoctorSearchQuery: (query: string) => void;

  // 의사 프로필 모달
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;

  // 화면정의서 탭
  specTab: SpecTab;
  setSpecTab: (tab: SpecTab) => void;

  // 전역 검색 모달 (서비스 화면 내)
  globalSearchQuery: string;
  isGlobalSearchOpen: boolean;
  openGlobalSearch: (query?: string) => void;
  closeGlobalSearch: () => void;

  // 통합 네비게이션 함수들
  navigateToHome: () => void;
  navigateToHomeWithCategory: (category: string) => void;
  navigateToChat: () => void;
  navigateToDoctorSearch: (query?: string) => void;
  navigateToCommunity: (searchQuery?: string) => void;
  navigateToMyPage: () => void;
  openDoctorProfile: (doctor: Doctor) => void;
  navigateToCommonSpec: () => void;
}

const AppNavigationContext = createContext<AppNavigationState | undefined>(undefined);

export function AppNavigationProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTabRaw] = useState<Tab>('home');
  const [previousTab, setPreviousTab] = useState<Tab>('home');
  const [homeSelectedCategory, setHomeSelectedCategory] = useState<string>('폐암');
  const [doctorSearchQuery, setDoctorSearchQuery] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [specTab, setSpecTab] = useState<SpecTab>('home');

  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);

  // 탭 전환 시 이전 탭 저장 (mypage 전환 전 탭을 기억하기 위해)
  const setActiveTab = (tab: Tab) => {
    setPreviousTab(activeTab);
    setActiveTabRaw(tab);
  };

  // 이전 탭 메인화면으로 이동 (mypage에서 '나중에' 클릭 시)
  const navigateToPreviousTab = () => {
    setActiveTabRaw(previousTab === 'mypage' ? 'home' : previousTab);
  };

  const navigateToHome = () => {
    setActiveTab('home');
  };

  const navigateToHomeWithCategory = (category: string) => {
    setHomeSelectedCategory(category);
    setActiveTab('home');
  };

  const navigateToChat = () => {
    setActiveTab('chat');
  };

  const navigateToDoctorSearch = (query?: string) => {
    if (query) {
      setDoctorSearchQuery(query);
    }
    setActiveTab('search');
  };

  const navigateToCommunity = (_searchQuery?: string) => {
    setActiveTab('community');
  };

  const navigateToMyPage = () => {
    setActiveTab('mypage');
  };

  const openDoctorProfile = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setActiveTab('home');
  };

  const navigateToCommonSpec = () => {
    setSpecTab('common');
  };

  const openGlobalSearch = (query?: string) => {
    if (query) {
      setGlobalSearchQuery(query);
    }
    setIsGlobalSearchOpen(true);
  };

  const closeGlobalSearch = () => {
    setIsGlobalSearchOpen(false);
  };

  return (
    <AppNavigationContext.Provider
      value={{
        activeTab,
        setActiveTab,
        previousTab,
        navigateToPreviousTab,
        homeSelectedCategory,
        setHomeSelectedCategory,
        doctorSearchQuery,
        setDoctorSearchQuery,
        selectedDoctor,
        setSelectedDoctor,
        navigateToHome,
        navigateToHomeWithCategory,
        navigateToChat,
        navigateToDoctorSearch,
        navigateToCommunity,
        navigateToMyPage,
        openDoctorProfile,
        specTab,
        setSpecTab,
        navigateToCommonSpec,
        globalSearchQuery,
        isGlobalSearchOpen,
        openGlobalSearch,
        closeGlobalSearch,
      }}
    >
      {children}
    </AppNavigationContext.Provider>
  );
}

export function useAppNavigation() {
  const context = useContext(AppNavigationContext);
  if (!context) {
    throw new Error('useAppNavigation must be used within AppNavigationProvider');
  }
  return context;
}