/**
 * 내 프로필 닉네임 규칙 (화면정의서)
 * - 2~10자, 한글·영문·숫자·밑줄(_)만
 */
const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9_]{2,10}$/;

export function isValidNickname(value: string): boolean {
  return NICKNAME_REGEX.test(value);
}

/** 데모/스텁: 서버 중복 검사 대체. 실제로는 API 응답으로 대체 */
const MOCK_TAKEN_NICKNAMES = new Set(['중복닉네임', 'duplicate', 'taken']);

export async function checkNicknameAvailableMock(nickname: string): Promise<boolean> {
  await new Promise<void>(resolve => {
    setTimeout(resolve, 350);
  });
  return !MOCK_TAKEN_NICKNAMES.has(nickname.trim());
}
