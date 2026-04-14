import type { SpecTab } from '@/app/contexts/AppNavigationContext';

/** 화면정의서 간 이동 — 탭·역할(선택)·DOM id(scrollIntoView 대상) */
export type SpecDocRoute = {
  tab: SpecTab;
  sectionId: string;
  role?: 'guest' | 'member';
};

export const SPEC_DOC_ROUTES = {
  // 공통 (비회원) — CommonComponentsSpec Section id
  commonModals: { tab: 'common', sectionId: 'modals', role: 'guest' },
  commonToasts: { tab: 'common', sectionId: 'toasts', role: 'guest' },
  commonDataStates: { tab: 'common', sectionId: 'data-states', role: 'guest' },
  commonLayout: { tab: 'common', sectionId: 'layout', role: 'guest' },
  // 공통 (회원전용)
  commonBizRoot: { tab: 'common', sectionId: 'common-biz-root', role: 'member' },
  // 홈
  homeGuestOverview: { tab: 'home', sectionId: 'overview', role: 'guest' },
  homeGuestModals: { tab: 'home', sectionId: 'modals', role: 'guest' },
  homeMemberDelta: { tab: 'home', sectionId: 'auth', role: 'member' },
  homeMemberScenarios: { tab: 'home', sectionId: 'scenarios', role: 'member' },
  // 통합검색
  searchGuestOverview: { tab: 'search-spec', sectionId: 'spec-search-overview', role: 'guest' },
  searchGuestUsage: { tab: 'search-spec', sectionId: 'spec-search-usage-limit', role: 'guest' },
  searchGuestStates: { tab: 'search-spec', sectionId: 'spec-search-states', role: 'guest' },
  searchGuestTabScrollSummary: { tab: 'search-spec', sectionId: 'spec-search-tab-scroll-summary', role: 'guest' },
  searchMemberBizRoot: { tab: 'search-spec', sectionId: 'spec-search-biz-role', role: 'member' },
  searchMemberBizCommunity: { tab: 'search-spec', sectionId: 'spec-search-biz-cards', role: 'member' },
  searchMemberBizCommonModal: { tab: 'search-spec', sectionId: 'spec-search-biz-cards', role: 'member' },
  // 명의찾기
  doctorGuestOverview: { tab: 'doctor', sectionId: 'overview', role: 'guest' },
  /** 비회원 사용량 제한 블록(5절 내 핑크 박스) */
  doctorGuestUsage: { tab: 'doctor', sectionId: 'doctor-spec-guest-usage', role: 'guest' },
  doctorMemberDelta: { tab: 'doctor', sectionId: 'delta', role: 'member' },
  // 커뮤니티
  communityGuestOverview: { tab: 'community', sectionId: 'community-overview', role: 'guest' },
  communityGuestReport: { tab: 'community', sectionId: 'community-spec-section-5', role: 'guest' },
  communityGuestCompose: { tab: 'community', sectionId: 'community-spec-section-9', role: 'guest' },
  communityGuestDraftDetail: { tab: 'community', sectionId: 'community-spec-section-10', role: 'guest' },
  communityMemberBizOverview: { tab: 'community', sectionId: 'community-biz-overview', role: 'member' },
  // 마이페이지 (역할 전환은 스펙 패널 토글로 사용자가 맞춤)
  mypageOverview: { tab: 'mypage-spec', sectionId: 'mypage-overview' },
  // AIGA 챗봇 정의서
  aigaDevRef: { tab: 'aiga-chatbot-spec', sectionId: 'dev-server-ref', role: 'guest' },
} as const satisfies Record<string, SpecDocRoute>;

export type SpecDocRouteId = keyof typeof SPEC_DOC_ROUTES;
