// 의사 프로필 — 의료진 인증 요청 / 정보 수정 요청 버튼 노출 규칙
// 상세는 별도 의사 인증 화면정의서 참고

export type DoctorProfileRequestViewerRole = 'guest' | 'member';

export interface DoctorProfileRequestButtonsVisibility {
  /** 의료진 인증 요청: 비회원·회원 모두 노출(비회원은 UI만 비활성) */
  showVerificationRequest: boolean;
  /** 의사 정보 수정 요청: 비회원·회원 항상 동일하게 노출 */
  showInfoEditRequest: boolean;
}

/**
 * 프로토타입: 의료진 인증 요청은 항상 노출. 탭 시 동작은 회원만(비회원은 LoginRequiredToast 등).
 */
export function getDoctorProfileRequestButtonsVisibility({
  viewerRole,
}: {
  viewerRole: DoctorProfileRequestViewerRole;
}): DoctorProfileRequestButtonsVisibility {
  const isMember = viewerRole === 'member';

  const showVerificationRequest = viewerRole === 'guest' || isMember;

  const showInfoEditRequest = true;

  return { showVerificationRequest, showInfoEditRequest };
}
