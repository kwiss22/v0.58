/** 홈 탭 데모 ↔ 화면정의서(HomeTabSpec) 앵커 연결 — 테스트용 단일 출처 */

export type HomeDemoTagId = 'H01' | 'H02' | 'H03' | 'H04' | 'H05' | 'H06';

export type HomeDemoTagEntry = {
  tagId: HomeDemoTagId;
  /** HomeTabSpec 내 DOM id (`scrollIntoView` / openSpecSection) */
  specSectionId: string;
  /** 짧은 설명 (aria, 툴팁) */
  label: string;
};

export const HOME_DEMO_TAG_LIST: HomeDemoTagEntry[] = [
  { tagId: 'H01', specSectionId: 'home-tag-h01', label: '상단 헤더(로고)' },
  { tagId: 'H02', specSectionId: 'home-tag-h02', label: '사용량 안내 배너' },
  { tagId: 'H03', specSectionId: 'home-tag-h03', label: 'AI 챗봇 배너' },
  { tagId: 'H04', specSectionId: 'home-tag-h04', label: '주요 질환 인기 명의' },
  { tagId: 'H05', specSectionId: 'home-tag-h05', label: '커뮤니티 추천글' },
  { tagId: 'H06', specSectionId: 'home-tag-h06', label: '건강 정보' },
];

export const HOME_DEMO_TAG_MAP: Record<HomeDemoTagId, HomeDemoTagEntry> = Object.fromEntries(
  HOME_DEMO_TAG_LIST.map((e) => [e.tagId, e]),
) as Record<HomeDemoTagId, HomeDemoTagEntry>;
