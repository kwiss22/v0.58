import { X, Lock } from 'lucide-react';
import { useEffect } from 'react';

interface TokenLimitToastProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  currentCount: number;
  limit: number;
}

export function TokenLimitToast({ isOpen, onClose, onLogin, currentCount, limit }: TokenLimitToastProps) {
  useEffect(() => {
    if (isOpen) {
      // 5초 후 자동으로 닫기
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-yellow-400 overflow-hidden max-w-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-white" />
            <span className="font-bold text-white text-sm">무료 사용 제한</span>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <div className="text-center space-y-2">
            <p className="text-gray-900 font-medium">
              메시지 한도에 도달했습니다
            </p>
            <p className="text-sm text-gray-600">
              현재: <span className="font-bold text-orange-600">{currentCount}</span> / {limit} 메시지
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-300"
              style={{ width: `${(currentCount / limit) * 100}%` }}
            />
          </div>

          {/* Benefits */}
          <div className="bg-blue-50 rounded-lg p-3 space-y-2">
            <p className="text-xs font-semibold text-blue-900">
              회원가입하면 더 많이 이용하세요!
            </p>
            <ul className="space-y-1 text-xs text-blue-700">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>메시지 100개까지 사용 가능</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>대화 이력 영구 저장</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>의사 프로필 저장</span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <button
            onClick={onLogin}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-all shadow-lg"
          >
            카카오톡으로 3초 만에 시작
          </button>

          <button
            onClick={onLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg"
          >
            네이버로 시작하기
          </button>

          <button
            onClick={onClose}
            className="w-full text-sm text-gray-500 hover:text-gray-700"
          >
            나중에 하기
          </button>
        </div>
      </div>
    </div>
  );
}