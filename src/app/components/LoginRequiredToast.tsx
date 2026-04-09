import { X, Lock, LogIn } from 'lucide-react';
import { useEffect } from 'react';

interface LoginRequiredToastProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  feature: string; // "저장", "리뷰 작성" 등
}

export function LoginRequiredToast({ isOpen, onClose, onLogin, feature }: LoginRequiredToastProps) {
  useEffect(() => {
    if (isOpen) {
      // 자동으로 닫지 않고 사용자가 직접 닫도록
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-blue-400 overflow-hidden max-w-sm w-full animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-white" />
            <span className="font-bold text-white text-sm">로그인 필요</span>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-900 font-semibold text-base">
              로그인이 필요한 기능입니다
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-blue-600">{feature}</span> 기능을 사용하려면<br />
              로그인이 필요합니다
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <p className="text-xs font-semibold text-blue-900">
              회원가입하면 더 많은 기능을!
            </p>
            <ul className="space-y-1.5 text-xs text-blue-700">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>의사 프로필 무제한 저장</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>리뷰 작성 및 공유</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>AI 챗봇 더 많은 대화</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>대화 이력 영구 저장</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={onLogin}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              카카오톡으로 3초 만에 시작
            </button>

            <button
              onClick={onLogin}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              네이버로 시작하기
            </button>

            <button
              onClick={onClose}
              className="w-full text-sm text-gray-500 hover:text-gray-700 py-2"
            >
              나중에 하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}