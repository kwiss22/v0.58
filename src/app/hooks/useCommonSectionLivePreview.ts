import { useCallback } from 'react';
import {
  useAppNavigation,
  COMMON_PREVIEW_COMMUNITY_POST_ID,
} from '@/app/contexts/AppNavigationContext';
import { useUser } from '@/app/contexts/UserContext';
import { getDoctorById } from '@/constants/doctor-data';

/** CM01 / CM03 — 동일 의사 더미 */
const COMMON_MODALS_PREVIEW_DOCTOR_ID = 'dr-1';

export function useCommonSectionLivePreview() {
  const {
    openDoctorProfile,
    openDoctorProfileWithReviewWrite,
    requestCommunityPostPreview,
    openSpecSection,
  } = useAppNavigation();
  const { setRole } = useUser();

  const previewModalsSection = useCallback(() => {
    setRole('guest');
    const doctor = getDoctorById(COMMON_MODALS_PREVIEW_DOCTOR_ID);
    if (doctor) openDoctorProfile(doctor);
    openSpecSection({ tab: 'common', sectionId: 'modals' });
  }, [setRole, openDoctorProfile, openSpecSection]);

  /** CM02 — 커뮤니티 게시글 상세(홈 경로) */
  const previewCommunityPostSubsection = useCallback(() => {
    setRole('guest');
    requestCommunityPostPreview(COMMON_PREVIEW_COMMUNITY_POST_ID);
    openSpecSection({ tab: 'common', sectionId: 'common-tag-cm02' });
  }, [setRole, requestCommunityPostPreview, openSpecSection]);

  /** CM03 — 의사 프로필 위에 리뷰 작성 (회원) */
  const previewReviewWriteSubsection = useCallback(() => {
    setRole('member');
    const doctor = getDoctorById(COMMON_MODALS_PREVIEW_DOCTOR_ID);
    if (doctor) openDoctorProfileWithReviewWrite(doctor);
    openSpecSection({ tab: 'common', sectionId: 'common-tag-cm03' });
  }, [setRole, openDoctorProfileWithReviewWrite, openSpecSection]);

  return { previewModalsSection, previewCommunityPostSubsection, previewReviewWriteSubsection };
}
