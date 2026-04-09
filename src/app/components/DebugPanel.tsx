// 디버깅용 패널 - 추천 의사 필터 문제 해결용
import { useState } from 'react';
import { X, RefreshCw, Zap, ShieldOff, ShieldCheck } from 'lucide-react';
import { loadUsage, saveUsage, USAGE_LIMITS } from '@/app/hooks/useUsageLimit';
import { useUser } from '@/app/contexts/UserContext';
import { useUsageLimitContext } from '@/app/contexts/UsageLimitContext';

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [, forceUpdate] = useState(0);
  const { role, setRole } = useUser();
  const { refreshRemaining } = useUsageLimitContext();

  const refresh = () => forceUpdate(n => n + 1);

  // 사용량 직접 설정
  const setUsage = (field: 'searchUsed' | 'profileViewUsed' | 'postViewUsed', value: number) => {
    const data = loadUsage();
    saveUsage({ ...data, [field]: value });
    refresh();
    refreshRemaining(); // Context 상태 즉시 재동기화 → 배너 즉시 반영
  };

  // 사용량 전체 초기화
  const resetAll = () => {
    const data = loadUsage();
    saveUsage({ ...data, searchUsed: 0, profileViewUsed: 0, postViewUsed: 0 });
    refresh();
    refreshRemaining();
  };

  // 사용량 전부 소진 (한도 꽉 채우기)
  const exhaustAll = () => {
    const data = loadUsage();
    saveUsage({
      ...data,
      searchUsed: USAGE_LIMITS.search,
      profileViewUsed: USAGE_LIMITS.profileView,
      postViewUsed: USAGE_LIMITS.postView,
    });
    refresh();
    refreshRemaining();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg z-50 text-sm font-bold"
      >
        🐛 디버그
      </button>
    );
  }

  const usage = loadUsage();

  const rows: { label: string; field: 'searchUsed' | 'profileViewUsed' | 'postViewUsed'; limit: number }[] = [
    { label: '검색', field: 'searchUsed', limit: USAGE_LIMITS.search },
    { label: '프로필 조회', field: 'profileViewUsed', limit: USAGE_LIMITS.profileView },
    { label: '게시글 열람', field: 'postViewUsed', limit: USAGE_LIMITS.postView },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-red-500 text-white px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-sm">🐛 사용량 디버그</span>
        <button onClick={() => setIsOpen(false)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-4">

        {/* 회원 상태 토글 */}
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-2 font-medium">현재 상태</p>
          <div className="flex gap-2">
            <button
              onClick={() => setRole('guest')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                role === 'guest' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <ShieldOff className="w-3.5 h-3.5" />
              비회원
            </button>
            <button
              onClick={() => setRole('member')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                role === 'member' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              회원
            </button>
          </div>
        </div>

        {/* 사용량 슬라이더 */}
        <div className="space-y-3">
          <p className="text-xs text-gray-500 font-medium">사용량 직접 조작 (비회원)</p>
          {rows.map(({ label, field, limit }) => {
            const used = usage[field] as number;
            const remaining = Math.max(0, limit - used);
            const pct = (used / limit) * 100;
            return (
              <div key={field}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-700">{label}</span>
                  <span className={`text-xs font-mono font-semibold ${remaining === 0 ? 'text-red-500' : remaining === 1 ? 'text-amber-500' : 'text-green-600'}`}>
                    {used}/{limit} ({remaining}회 남음)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={limit}
                    value={used}
                    onChange={(e) => setUsage(field, Number(e.target.value))}
                    className="flex-1 accent-blue-500"
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={() => setUsage(field, Math.max(0, used - 1))}
                      className="w-6 h-6 bg-gray-100 rounded text-xs font-bold hover:bg-gray-200 flex items-center justify-center"
                    >−</button>
                    <button
                      onClick={() => setUsage(field, Math.min(limit, used + 1))}
                      className="w-6 h-6 bg-gray-100 rounded text-xs font-bold hover:bg-gray-200 flex items-center justify-center"
                    >+</button>
                  </div>
                </div>
                {/* 진행 바 */}
                <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${pct >= 100 ? 'bg-red-500' : pct >= 66 ? 'bg-amber-400' : 'bg-green-400'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 빠른 액션 버튼 */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={resetAll}
            className="flex items-center justify-center gap-1.5 py-2 bg-green-50 text-green-700 border border-green-200 rounded-xl text-xs font-semibold hover:bg-green-100 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            전체 초기화
          </button>
          <button
            onClick={exhaustAll}
            className="flex items-center justify-center gap-1.5 py-2 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            전체 소진
          </button>
        </div>

        <p className="text-center text-xs text-gray-400">슬라이더 변경 즉시 배너 갱신</p>
      </div>
    </div>
  );
}