/** 커뮤니티 탭 데모 ↔ 화면정의서(CommunityTabSpec) 앵커 연결 */

export type CommunityDemoTagId =
  | 'C01'
  | 'C02'
  | 'C03'
  | 'C04'
  | 'C05'
  | 'C06'
  | 'C07'
  | 'C08';

export type CommunityDemoTagEntry = {
  tagId: CommunityDemoTagId;
  /** CommunityTabSpec 내 DOM id */
  specSectionId: string;
  label: string;
};

export const COMMUNITY_DEMO_TAG_LIST: CommunityDemoTagEntry[] = [
  { tagId: 'C01', specSectionId: 'community-tag-c01', label: '헤더' },
  { tagId: 'C02', specSectionId: 'community-tag-c02', label: '카테고리 필터' },
  { tagId: 'C03', specSectionId: 'community-tag-c03', label: '헤더 하단 배너' },
  { tagId: 'C04', specSectionId: 'community-tag-c04', label: '피드 목록 헤더(총 건수·정렬)' },
  { tagId: 'C05', specSectionId: 'community-tag-c05', label: '유저 필터 배너' },
  { tagId: 'C06', specSectionId: 'community-tag-c06', label: '게시글 카드 목록' },
  { tagId: 'C07', specSectionId: 'community-tag-c07', label: '게시글 상세(공통 링크)' },
  { tagId: 'C08', specSectionId: 'community-tag-c08', label: '글쓰기 FAB' },
];

export const COMMUNITY_DEMO_TAG_MAP: Record<CommunityDemoTagId, CommunityDemoTagEntry> = Object.fromEntries(
  COMMUNITY_DEMO_TAG_LIST.map((e) => [e.tagId, e]),
) as Record<CommunityDemoTagId, CommunityDemoTagEntry>;
