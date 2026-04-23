/** 공통 UI 데모 번호 ↔ 화면정의서 앵커 ↔ 왼쪽 데모 패널 앵커 */
export type CommonDemoTagId =
  | 'CM01'
  | 'CM02'
  | 'CM03'
  | 'CM04'
  | 'CM05'
  | 'CM06'
  | 'CM07'
  | 'CM08'
  | 'CM09'
  | 'CM10'
  | 'CM11'
  | 'CM12';

export interface CommonDemoTagEntry {
  tagId: CommonDemoTagId;
  /** 오른쪽 CommonComponentsSpec의 스크롤 대상 id */
  specSectionId: string;
  /** 왼쪽 CommonComponentsDemoPage 스크롤 대상 id (문서와 중복 id 방지) */
  demoAnchorId: string;
  label: string;
}

export const COMMON_DEMO_TAG_LIST: CommonDemoTagEntry[] = [
  { tagId: 'CM01', specSectionId: 'common-tag-cm01', demoAnchorId: 'common-demo-cm01', label: '의사 프로필 상세 팝업' },
  { tagId: 'CM02', specSectionId: 'common-tag-cm02', demoAnchorId: 'common-demo-cm02', label: '커뮤니티 게시글 상세 팝업' },
  { tagId: 'CM03', specSectionId: 'common-tag-cm03', demoAnchorId: 'common-demo-cm03', label: '리뷰 작성 팝업' },
  { tagId: 'CM04', specSectionId: 'common-tag-cm04', demoAnchorId: 'common-demo-cm04', label: '통합 검색 전체 창 (요약)' },
  { tagId: 'CM05', specSectionId: 'common-tag-cm05', demoAnchorId: 'common-demo-cm05', label: '로그인 필요 모달' },
  { tagId: 'CM06', specSectionId: 'common-tag-cm06', demoAnchorId: 'common-demo-cm06', label: '비회원 한도 초과 모달' },
  { tagId: 'CM07', specSectionId: 'common-tag-cm07', demoAnchorId: 'common-demo-cm07', label: '두 모달 비교' },
  { tagId: 'CM08', specSectionId: 'common-tag-cm08', demoAnchorId: 'common-demo-cm08', label: '로딩 중 (Loading)' },
  { tagId: 'CM09', specSectionId: 'common-tag-cm09', demoAnchorId: 'common-demo-cm09', label: '에러 발생 (Error)' },
  { tagId: 'CM10', specSectionId: 'common-tag-cm10', demoAnchorId: 'common-demo-cm10', label: '데이터 없음 (Empty)' },
  { tagId: 'CM11', specSectionId: 'common-tag-cm11', demoAnchorId: 'common-demo-cm11', label: '하단 탭 메뉴' },
  { tagId: 'CM12', specSectionId: 'common-tag-cm12', demoAnchorId: 'common-demo-cm12', label: '통합 검색 아이콘 (우상단)' },
];

export const COMMON_DEMO_TAG_MAP = COMMON_DEMO_TAG_LIST.reduce(
  (acc, entry) => {
    acc[entry.tagId] = entry;
    return acc;
  },
  {} as Record<CommonDemoTagId, CommonDemoTagEntry>,
);
