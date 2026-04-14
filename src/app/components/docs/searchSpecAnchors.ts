/** 통합검색 화면정의서 앵커 — DebugPanel·openSpecSection과 동기화 */
export type SearchSpecAnchorItem = {
  id: string;
  label: string;
  role: 'guest' | 'member';
};

export const SEARCH_SPEC_ANCHOR_ITEMS: SearchSpecAnchorItem[] = [
  { id: 'spec-search-overview', label: 'Base — 1. 개요', role: 'guest' },
  { id: 'spec-search-ui-structure', label: 'Base — 2. UI 구조', role: 'guest' },
  { id: 'spec-search-states', label: 'Base — 3. 화면 상태', role: 'guest' },
  { id: 'spec-search-branch-logic', label: 'Base — 4. 분류 로직', role: 'guest' },
  { id: 'spec-search-results-detail', label: 'Base — 5. 결과 영역', role: 'guest' },
  { id: 'spec-search-icon-placement', label: 'Base — 6. 검색 아이콘 배치', role: 'guest' },
  { id: 'spec-search-usage-limit', label: 'Base — 7. 비회원 사용량 제한', role: 'guest' },
  { id: 'spec-search-tab-scroll-summary', label: 'Base — 8. 탭/무한스크롤 요약', role: 'guest' },
  { id: 'spec-search-test-scenarios', label: 'Base — 9. 검증 시나리오', role: 'guest' },
  { id: 'spec-search-state-1', label: 'Base — 3절 ① 검색어 없음', role: 'guest' },
  { id: 'spec-search-state-2', label: 'Base — 3절 ② 증상·상담형', role: 'guest' },
  { id: 'spec-search-state-3', label: 'Base — 3절 ③ 결과 없음', role: 'guest' },
  { id: 'spec-search-state-4', label: 'Base — 3절 ④ 결과 있음', role: 'guest' },
  { id: 'spec-search-state-5', label: 'Base — 3절 ⑤ 한도 차단', role: 'guest' },
  { id: 'spec-search-biz-role', label: '회원전용 — 문서 역할', role: 'member' },
  { id: 'spec-search-biz-limits', label: '회원전용 — 회원 한도 해제 표', role: 'member' },
  { id: 'spec-search-biz-delta-overview', label: '회원전용 — 1. 회원 체감 변화', role: 'member' },
  { id: 'spec-search-biz-ui-when-unlimited', label: '회원전용 — 2. 제한 안내 소멸', role: 'member' },
  { id: 'spec-search-biz-flow', label: '회원전용 — 3. 검색·목록 이어쓰기', role: 'member' },
  { id: 'spec-search-biz-cards', label: '회원전용 — 4. 카드 클릭 뒷장면', role: 'member' },
  { id: 'spec-search-biz-after-login', label: '회원전용 — 5. 로그인 뒤 편의', role: 'member' },
  { id: 'spec-search-biz-verify', label: '회원전용 — 6. 검증', role: 'member' },
  { id: 'spec-search-biz-refs', label: '회원전용 — 7. 참조 문서', role: 'member' },
];
