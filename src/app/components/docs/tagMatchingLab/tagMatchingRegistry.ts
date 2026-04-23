/**
 * 태그 매칭 실험용 — 데모 영역 ↔ 화면정의서(모의) 블록 1:1
 * 실서비스 적용 시 이 레지스트리만 스펙/데모가 공유하면 됩니다.
 */
export type TagMatchingEntry = {
  /** 화면에 찍히는 번호 (PPT/Figma 스티커와 동일하게 쓰기) */
  displayNumber: string;
  /** 짧은 라벨 (데모 툴팁·배지) */
  shortLabel: string;
  /** 정의서에 보여줄 제목 */
  specTitle: string;
  /** 정의서 본문 (모의) */
  specDescription: string;
};

export const TAG_MATCHING_LAB_ENTRIES: TagMatchingEntry[] = [
  {
    displayNumber: '01',
    shortLabel: '상단 헤더',
    specTitle: '01 · 상단 헤더 영역',
    specDescription:
      '로고·알림 영역입니다. 탭 전환 시에도 동일한 높이를 유지하고, 스크롤 시에는 상단에 고정되지 않습니다(실험용 문구).',
  },
  {
    displayNumber: '02',
    shortLabel: '검색 입력',
    specTitle: '02 · 검색 입력 필드',
    specDescription:
      '포커스 시 키보드가 올라오고, 플레이스홀더는 서비스 정책 문구를 따릅니다. 비회원일 때는 ○○ 제한이 적용될 수 있습니다.',
  },
  {
    displayNumber: '03',
    shortLabel: '추천 칩',
    specTitle: '03 · 추천 검색어 칩',
    specDescription:
      '가로 스크롤 가능한 칩 목록입니다. 탭 시 검색어가 입력창에 반영되고 결과 영역이 갱신됩니다.',
  },
  {
    displayNumber: '04',
    shortLabel: '결과 카드',
    specTitle: '04 · 결과 카드(리스트 항목)',
    specDescription:
      '카드 전체가 탭 영역입니다. 탭 시 상세로 이동하거나 바텀시트를 띄우는 등 동작은 화면별 정의서를 따릅니다.',
  },
];

export function tagMatchingAnchorId(displayNumber: string): string {
  return `tag-matching-${displayNumber}`;
}
