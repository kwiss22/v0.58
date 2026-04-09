// ─── 비회원 한도 초과 → 가입 유도 모달 (LoginRequiredToast 디자인 통일) ──────

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Lock, LogIn, X } from 'lucide-react';
import { useUsageLimitContext } from '@/app/contexts/UsageLimitContext';
import { useUser } from '@/app/contexts/UserContext';
import { USAGE_LIMITS, LimitType } from '@/app/hooks/useUsageLimit';

// 한도 타입별 메시지 정의
const LIMIT_COPY: Record<LimitType, {
  header: string;
  title: string;
  sub: string;
}> = {
  search: {
    header: '검색 한도 초과',
    title: '오늘 무료 검색을 모두 사용했어요',
    sub: `비회원은 하루 ${USAGE_LIMITS.search}회까지 검색할 수 있어요`,
  },
  profileView: {
    header: '프로필 조회 한도 초과',
    title: '오늘 명의 프로필 조회를 모두 사용했어요',
    sub: `비회원은 하루 ${USAGE_LIMITS.profileView}회까지 프로필을 열 수 있어요`,
  },
  postView: {
    header: '게시글 열람 한도 초과',
    title: '오늘 게시글 열람을 모두 사용했어요',
    sub: `비회원은 하루 ${USAGE_LIMITS.postView}회까지 본문을 읽을 수 있어요`,
  },
};

const BENEFITS = [
  '의사 프로필 무제한 저장',
  '리뷰 작성 및 공유',
  'AI 챗봇 더 많은 대화',
  '대화 이력 영구 저장',
];

export function GuestLimitModal() {
  const { limitModalOpen, limitModalType, closeLimitModal } = useUsageLimitContext();
  const { setRole } = useUser();

  useEffect(() => {
    if (limitModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [limitModalOpen]);

  const copy = limitModalType ? LIMIT_COPY[limitModalType] : null;

  const handleSignUp = () => {
    setRole('member');
    closeLimitModal();
  };

  return (
    <AnimatePresence>
      {limitModalOpen && copy && (
        <>
          {/* 딤 오버레이 */}
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 z-[60]"
            onClick={closeLimitModal}
          />

          {/* 센터 모달 */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 z-[61] flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-[calc(100%-40px)] max-w-sm bg-white rounded-xl shadow-2xl border-2 border-blue-400 overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 파란 헤더 */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-white" />
                  <span className="font-bold text-white text-sm">{copy.header}</span>
                </div>
                <button
                  onClick={closeLimitModal}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* 본문 */}
              <div className="p-6 space-y-4">
                {/* 아이콘 + 타이틀 */}
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-gray-900 font-semibold text-base">{copy.title}</p>
                  <p className="text-sm text-gray-600">{copy.sub}</p>
                </div>

                {/* 혜택 리스트 */}
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                  <p className="text-xs font-semibold text-blue-900">회원가입하면 더 많은 기능을!</p>
                  <ul className="space-y-1.5 text-xs text-blue-700">
                    {BENEFITS.map((text, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 버튼 */}
                <div className="space-y-2">
                  <button
                    onClick={handleSignUp}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-5 h-5" />
                    카카오톡으로 3초 만에 시작
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-5 h-5" />
                    네이버로 시작하기
                  </button>
                  <button
                    onClick={closeLimitModal}
                    className="w-full text-sm text-gray-500 hover:text-gray-700 py-2"
                  >
                    나중에 하기
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}