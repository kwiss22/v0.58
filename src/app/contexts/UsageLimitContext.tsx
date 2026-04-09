// ─── 비회원 사용량 제한 전역 Context ──────────────────────────────────────────

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { LimitType, USAGE_LIMITS, checkCanDo, consumeOne, getRemaining, loadUsage } from '@/app/hooks/useUsageLimit';
import { useUser } from './UserContext';

interface UsageLimitContextType {
  // 남은 횟수 (회원이면 999)
  searchRemaining: number;
  profileViewRemaining: number;
  postViewRemaining: number;

  // 가능 여부
  canSearch: boolean;
  canViewProfile: boolean;
  canViewPost: boolean;

  // 소비 액션 — 허용되면 true, 차단되면 false + 모달 자동 오픈
  consumeSearch: () => boolean;
  consumeProfileView: () => boolean;
  consumePostView: () => boolean;

  // 한도 모달
  limitModalOpen: boolean;
  limitModalType: LimitType | null;
  openLimitModal: (type: LimitType) => void;
  closeLimitModal: () => void;

  // 디버그용: localStorage → 상태 강제 재동기화
  refreshRemaining: () => void;
}

// HMR/SSR 안전을 위한 기본값 — Provider 없이 렌더될 때 throw 대신 graceful fallback
const defaultContextValue: UsageLimitContextType = {
  searchRemaining: 999,
  profileViewRemaining: 999,
  postViewRemaining: 999,
  canSearch: true,
  canViewProfile: true,
  canViewPost: true,
  consumeSearch: () => true,
  consumeProfileView: () => true,
  consumePostView: () => true,
  limitModalOpen: false,
  limitModalType: null,
  openLimitModal: () => {},
  closeLimitModal: () => {},
  refreshRemaining: () => {},
};

const UsageLimitContext = createContext<UsageLimitContextType>(defaultContextValue);

export function UsageLimitProvider({ children }: { children: ReactNode }) {
  const { isMember } = useUser();

  // 잔여 횟수 상태 (UI 갱신용)
  const [remaining, setRemaining] = useState(() => ({
    search: getRemaining('search'),
    profileView: getRemaining('profileView'),
    postView: getRemaining('postView'),
  }));

  // 회원 전환 시 잔여 횟수 갱신
  useEffect(() => {
    if (isMember) {
      setRemaining({ search: 999, profileView: 999, postView: 999 });
    } else {
      setRemaining({
        search: getRemaining('search'),
        profileView: getRemaining('profileView'),
        postView: getRemaining('postView'),
      });
    }
  }, [isMember]);

  // 모달 상태
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [limitModalType, setLimitModalType] = useState<LimitType | null>(null);

  const openLimitModal = useCallback((type: LimitType) => {
    setLimitModalType(type);
    setLimitModalOpen(true);
  }, []);

  const closeLimitModal = useCallback(() => {
    setLimitModalOpen(false);
  }, []);

  /** localStorage → React 상태 강제 재동기화 (디버그 패널용) */
  const refreshRemaining = useCallback(() => {
    if (!isMember) {
      setRemaining({
        search: getRemaining('search'),
        profileView: getRemaining('profileView'),
        postView: getRemaining('postView'),
      });
    }
  }, [isMember]);

  /** 공통 소비 함수 */
  const makeConsumer = useCallback(
    (type: LimitType) => () => {
      // 회원은 무제한
      if (isMember) return true;

      const allowed = consumeOne(type);
      if (!allowed) {
        openLimitModal(type);
      } else {
        // 잔여 횟수 즉시 반영
        setRemaining((prev) => ({
          ...prev,
          [type]: Math.max(0, prev[type as keyof typeof prev] - 1),
        }));
      }
      return allowed;
    },
    [isMember, openLimitModal],
  );

  const consumeSearch = useCallback(makeConsumer('search'), [makeConsumer]);
  const consumeProfileView = useCallback(makeConsumer('profileView'), [makeConsumer]);
  const consumePostView = useCallback(makeConsumer('postView'), [makeConsumer]);

  const sr = isMember ? 999 : remaining.search;
  const pr = isMember ? 999 : remaining.profileView;
  const pvr = isMember ? 999 : remaining.postView;

  return (
    <UsageLimitContext.Provider
      value={{
        searchRemaining: sr,
        profileViewRemaining: pr,
        postViewRemaining: pvr,
        canSearch: isMember || checkCanDo('search'),
        canViewProfile: isMember || checkCanDo('profileView'),
        canViewPost: isMember || checkCanDo('postView'),
        consumeSearch,
        consumeProfileView,
        consumePostView,
        limitModalOpen,
        limitModalType,
        openLimitModal,
        closeLimitModal,
        refreshRemaining,
      }}
    >
      {children}
    </UsageLimitContext.Provider>
  );
}

export function useUsageLimitContext() {
  return useContext(UsageLimitContext);
}
