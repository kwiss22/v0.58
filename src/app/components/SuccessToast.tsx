// 성공 토스트 메시지 컴포넌트
import { Check } from 'lucide-react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SuccessToastProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  duration?: number; // 기본 3초
}

export function SuccessToast({ isOpen, onClose, message, duration = 3000 }: SuccessToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 px-4"
        >
          <div className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 min-w-[280px] justify-center">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5 text-green-600" />
            </div>
            <span className="font-medium text-sm">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}