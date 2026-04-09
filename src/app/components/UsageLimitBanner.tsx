// ─── 사용량 상태 배너 ─────────────────────────────────────────────────────────
// exhausted : 한도 소진 → 자물쇠 아이콘 + 가입 CTA
// warning   : 1~2회 남음 → 주의 아이콘 + 남은 횟수 표시

import { motion, AnimatePresence } from 'motion/react';
import { Lock, TriangleAlert, ChevronRight } from 'lucide-react';
import { useUsageLimitContext } from '@/app/contexts/UsageLimitContext';
import { LimitType, USAGE_LIMITS } from '@/app/hooks/useUsageLimit';

// 한도 타입별 문구
const COPY: Record<LimitType, { exhaustedTitle: string; warningUnit: string }> = {
  search:      { exhaustedTitle: '오늘 무료 검색을 모두 사용했어요',        warningUnit: '검색' },
  profileView: { exhaustedTitle: '오늘 명의 프로필 조회를 모두 사용했어요', warningUnit: '프로필 조회' },
  postView:    { exhaustedTitle: '오늘 게시글 열람을 모두 사용했어요',       warningUnit: '게시글 열람' },
};

interface UsageLimitBannerProps {
  /** 체크할 한도 타입 (여러 개 전달 시 소진된 것 우선 표시) */
  types: LimitType[];
  className?: string;
}

export function UsageLimitBanner({ types, className = '' }: UsageLimitBannerProps) {
  const {
    searchRemaining, profileViewRemaining, postViewRemaining,
    openLimitModal,
  } = useUsageLimitContext();

  const remainingMap: Record<LimitType, number> = {
    search:      searchRemaining,
    profileView: profileViewRemaining,
    postView:    postViewRemaining,
  };

  // 소진된 타입 우선 → 없으면 경고 타입(남은 횟수 ≤ 1)
  const exhaustedType = types.find((t) => remainingMap[t] === 0) ?? null;
  const warningType   = exhaustedType
    ? null
    : types.find((t) => remainingMap[t] <= 1 && remainingMap[t] > 0) ?? null;

  const visible = !!(exhaustedType || warningType);

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key={exhaustedType ?? warningType ?? 'banner'}
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{ overflow: 'hidden' }}
          className={className}
        >
          {/* ── 소진 배너 ── */}
          {exhaustedType && (
            <div className="bg-amber-50 border-b border-amber-100">
              <div className="px-4 py-3.5 flex items-start gap-3">
                {/* 아이콘 */}
                <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lock className="w-4 h-4 text-amber-600" />
                </div>

                {/* 텍스트 + CTA */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-0.5">
                    {COPY[exhaustedType].exhaustedTitle}
                  </p>
                  <p className="text-xs text-gray-500 mb-2.5">
                    내일 자정에 초기화돼요
                  </p>
                  <button
                    onClick={() => openLimitModal(exhaustedType)}
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    지금 가입하면 바로 이용 가능
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 오른쪽 강조 수 */}
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="text-xs text-amber-600 bg-amber-100 rounded-full px-2 py-0.5 whitespace-nowrap">
                    {USAGE_LIMITS[exhaustedType]}회 / 일
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ── 경고 배너 (1회 남음) ── */}
          {warningType && (
            <div className="bg-amber-50 border-b border-amber-100">
              <div className="px-4 py-2.5 flex items-center gap-2">
                <TriangleAlert className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-700 flex-1">
                  오늘 무료 {COPY[warningType].warningUnit}{' '}
                  <span className="font-semibold">{remainingMap[warningType]}회</span>{' '}
                  남았어요
                </p>
                <button
                  onClick={() => openLimitModal(warningType)}
                  className="text-xs text-blue-500 hover:text-blue-600 transition-colors whitespace-nowrap"
                >
                  가입하기
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
