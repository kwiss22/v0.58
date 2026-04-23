/** 회원 마이페이지 데모 ↔ MyPageSpec(로그인 후) 앵커 — 비회원 화면은 번호 미사용 */

export type MyPageMemberDemoTagId = 'M01' | 'M02' | 'M03' | 'M04' | 'M05';

export type MyPageMemberDemoTagEntry = {
  tagId: MyPageMemberDemoTagId;
  specSectionId: string;
  label: string;
};

export const MY_PAGE_MEMBER_DEMO_TAG_LIST: MyPageMemberDemoTagEntry[] = [
  { tagId: 'M01', specSectionId: 'mypage-tag-m01', label: '프로필 요약' },
  { tagId: 'M02', specSectionId: 'mypage-tag-m02', label: '닉네임' },
  { tagId: 'M03', specSectionId: 'mypage-tag-m03', label: '내 활동' },
  { tagId: 'M04', specSectionId: 'mypage-tag-m04', label: '고객지원' },
  { tagId: 'M05', specSectionId: 'mypage-tag-m05', label: '탈퇴하기' },
];

export const MY_PAGE_MEMBER_DEMO_TAG_MAP: Record<MyPageMemberDemoTagId, MyPageMemberDemoTagEntry> = Object.fromEntries(
  MY_PAGE_MEMBER_DEMO_TAG_LIST.map((e) => [e.tagId, e]),
) as Record<MyPageMemberDemoTagId, MyPageMemberDemoTagEntry>;
