/** 명의 찾기 탭 데모 ↔ DoctorSearchSpec 앵커 */

export type DoctorDemoTagId = 'D01' | 'D02' | 'D03' | 'D04' | 'D05' | 'D06' | 'D07';

export type DoctorDemoTagEntry = {
  tagId: DoctorDemoTagId;
  specSectionId: string;
  label: string;
};

export const DOCTOR_DEMO_TAG_LIST: DoctorDemoTagEntry[] = [
  { tagId: 'D01', specSectionId: 'doctor-tag-d01', label: '상단 헤더' },
  { tagId: 'D02', specSectionId: 'doctor-tag-d02', label: '통합 검색창' },
  { tagId: 'D03', specSectionId: 'doctor-tag-d03', label: '연관검색어 드롭다운' },
  { tagId: 'D04', specSectionId: 'doctor-tag-d04', label: '카테고리 필터' },
  { tagId: 'D05', specSectionId: 'doctor-tag-d05', label: '검색 결과 헤더' },
  { tagId: 'D06', specSectionId: 'doctor-tag-d06', label: '의사 카드 목록' },
  { tagId: 'D07', specSectionId: 'doctor-tag-d07', label: '검색 0건 · 빈 화면' },
];

export const DOCTOR_DEMO_TAG_MAP: Record<DoctorDemoTagId, DoctorDemoTagEntry> = Object.fromEntries(
  DOCTOR_DEMO_TAG_LIST.map((e) => [e.tagId, e]),
) as Record<DoctorDemoTagId, DoctorDemoTagEntry>;
