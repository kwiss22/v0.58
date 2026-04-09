import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

export type LocationStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'ip-fallback';

interface LocationPermissionModalProps {
  onGranted: (coords: { lat: number; lng: number }) => void;
  onDenied: () => void;
  onClose: () => void;
}

type RadioOption = 'allow' | 'block';

export function LocationPermissionModal({ onGranted, onDenied, onClose }: LocationPermissionModalProps) {
  const [selected, setSelected] = useState<RadioOption>('allow');
  const [loading, setLoading] = useState(false);

  const handleDone = () => {
    if (selected === 'block') {
      onDenied();
      return;
    }

    setLoading(true);
    if (!navigator.geolocation) {
      // geolocation 미지원 → 사용자가 허용을 선택했으므로 fallback 좌표로 granted
      setTimeout(() => {
        setLoading(false);
        onGranted({ lat: 37.5665, lng: 126.978 }); // 서울시청 기본좌표
      }, 800);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        onGranted({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => {
        // GPS 실패해도 사용자가 허용을 선택했으므로 fallback 좌표로 granted
        setLoading(false);
        onGranted({ lat: 37.5665, lng: 126.978 });
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="absolute inset-0 z-[9999] flex items-start justify-center pt-14 px-4">
      {/* dim */}
      <div className="absolute inset-0 bg-black/10" onClick={onClose} />

      {/* Chrome-style permission bubble */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-xs border border-gray-200 overflow-hidden">
        {/* X 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 transition-colors p-0.5"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 본문 */}
        <div className="px-4 pt-4 pb-3">
          {/* 타이틀 */}
          <p className="font-semibold text-gray-900 text-sm mb-1 pr-5">위치 액세스 허용됨</p>

          {/* 설명 */}
          <p className="text-sm text-gray-700 mb-3">이 사이트는 위치에 액세스할 수 있습니다.</p>

          {/* 라디오 옵션 1 */}
          <label
            className="flex items-start gap-2.5 cursor-pointer mb-2.5"
            onClick={() => setSelected('allow')}
          >
            <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{
                borderColor: selected === 'allow' ? '#7C3AED' : '#9CA3AF',
                backgroundColor: selected === 'allow' ? '#7C3AED' : 'transparent',
              }}
            >
              {selected === 'allow' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </span>
            <span className="text-sm text-gray-800 leading-snug">
              이 사이트의 위치 액세스 계속 허용
            </span>
          </label>

          {/* 라디오 옵션 2 */}
          <label
            className="flex items-start gap-2.5 cursor-pointer"
            onClick={() => setSelected('block')}
          >
            <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{
                borderColor: selected === 'block' ? '#7C3AED' : '#9CA3AF',
                backgroundColor: selected === 'block' ? '#7C3AED' : 'transparent',
              }}
            >
              {selected === 'block' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </span>
            <span className="text-sm text-gray-500 leading-snug">
              https://aiga.kormedi.com의 위치 액세스 항상 차단
            </span>
          </label>
        </div>

        {/* 버튼 영역 */}
        <div className="flex items-center justify-end px-4 pb-4 pt-1">
          <button
            onClick={handleDone}
            disabled={loading}
            className="px-5 py-1.5 rounded-full text-sm text-white font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-70"
            style={{ backgroundColor: '#7C3AED' }}
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                확인 중
              </>
            ) : '완료'}
          </button>
        </div>
      </div>
    </div>
  );
}