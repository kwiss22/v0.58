/**
 * 중요 노티스 — SNS 로그인 계정 통합 (기획·백엔드 연동 뼈대)
 *
 * 카카오·네이버 등에서 동일 이메일(또는 동일 식별 가능 정보)로 각각 가입한 경우,
 * 서비스는 내부에서 하나의 사용자 레코드로 통합 관리하고, 각 플랫폼이 발급한
 * 고유 ID(uID)를 함께 저장합니다. 로그인 시에는 현재 사용 중인 채널(프로바이더)을
 * 판별해 세션·권한·표시 정보를 일관되게 맞춥니다.
 *
 * 실제 구현 시: OAuth 콜백 → 이메일/식별자 매칭 → 기존 계정 연결 또는 신규 생성,
 * 충돌·탈퇴·재가입 정책은 서버 도메인에서 결정.
 */

export type SnsAuthChannel = 'kakao' | 'naver' | 'email';

/** 플랫폼별 외부 식별자 (스텁) */
export interface LinkedSnsIdentityStub {
  channel: SnsAuthChannel;
  /** 카카오/네이버 등에서 내려주는 사용자 고유 ID */
  externalUid: string;
  /** 연동 시점에 확인된 이메일(또는 마스킹 전 값의 해시 키 등) */
  emailKey: string;
}

export interface UnifiedAccountStub {
  internalUserId: string;
  identities: LinkedSnsIdentityStub[];
  /** 마지막 로그인에 사용된 채널 */
  lastLoginChannel: SnsAuthChannel;
}

/**
 * 동일 이메일로 여러 SNS가 묶일 때 내부 사용자 키를 결정하는 자리 (서버 로직으로 대체).
 */
export function resolveUnifiedUserIdStub(_emailKey: string, _identities: LinkedSnsIdentityStub[]): string {
  // TODO: 백엔드 API / 계정 DB 조회
  return '';
}

/**
 * 현재 세션의 로그인 채널이 해당 통합 계정에 속하는지 검증하는 자리.
 */
export function assertCurrentChannelMatchesStub(
  _account: UnifiedAccountStub,
  _sessionChannel: SnsAuthChannel
): boolean {
  // TODO: 세션 토큰 클레임과 identities 비교
  return true;
}
