// ─── 비회원 사용량 제한 훅 (localStorage 기반, 자정 리셋) ─────────────────────

const STORAGE_KEY = 'aiga_usage_v1';

export const USAGE_LIMITS = {
  search: 3,       // 통합검색 + 명의찾기 검색 통합 카운트
  profileView: 3,  // 명의 프로필 상세 열기
  postView: 5,     // 커뮤니티 본문 열기
} as const;

export type LimitType = 'search' | 'profileView' | 'postView';

export interface UsageData {
  date: string;          // YYYY-MM-DD
  searchUsed: number;
  profileViewUsed: number;
  postViewUsed: number;
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function getEmptyUsage(): UsageData {
  return { date: getTodayString(), searchUsed: 0, profileViewUsed: 0, postViewUsed: 0 };
}

export function loadUsage(): UsageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getEmptyUsage();
    const data = JSON.parse(raw) as UsageData;
    // 날짜가 달라지면 리셋
    if (data.date !== getTodayString()) return getEmptyUsage();
    return data;
  } catch {
    return getEmptyUsage();
  }
}

export function saveUsage(data: UsageData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const KEY_MAP: Record<LimitType, keyof UsageData> = {
  search: 'searchUsed',
  profileView: 'profileViewUsed',
  postView: 'postViewUsed',
};

/** 현재 사용량이 한도 이하인지 확인 */
export function checkCanDo(type: LimitType): boolean {
  const data = loadUsage();
  return (data[KEY_MAP[type]] as number) < USAGE_LIMITS[type];
}

/** 1회 소비. 성공 시 true 반환, 한도 초과 시 false 반환 */
export function consumeOne(type: LimitType): boolean {
  const data = loadUsage();
  const key = KEY_MAP[type];
  if ((data[key] as number) >= USAGE_LIMITS[type]) return false;
  const updated = { ...data, [key]: (data[key] as number) + 1 };
  saveUsage(updated);
  return true;
}

/** 남은 횟수 */
export function getRemaining(type: LimitType): number {
  const data = loadUsage();
  return Math.max(0, USAGE_LIMITS[type] - (data[KEY_MAP[type]] as number));
}
