// 의사 정보 수정 요청 모달 (의사 프로필 상세 위 오버레이)
import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface DoctorInfoEditRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName?: string;
}

const MIN_LENGTH = 10;

export function DoctorInfoEditRequestModal({ isOpen, onClose, doctorName }: DoctorInfoEditRequestModalProps) {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const trimmed = text.trim();
  const canSubmit = trimmed.length >= MIN_LENGTH;

  const handleClose = () => {
    setText('');
    onClose();
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    toast.success('요청이 접수되었습니다. 검토 후 반영하겠습니다.');
    setText('');
    onClose();
  };

  return (
    <div
      className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-info-edit-title"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <h2 id="doctor-info-edit-title" className="text-lg font-bold text-gray-900">
            의사정보 수정 요청
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 pb-5 flex-1 overflow-y-auto">
          <p className="text-sm text-gray-400 mb-3">
            의사 프로필에 수정이 필요한 내용을 알려주세요
            {doctorName ? (
              <span className="sr-only"> ({doctorName})</span>
            ) : null}
          </p>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="수정요청 및 기타 문의사항을 입력해주세요 (필수, 최소 10자이상)"
            rows={6}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 resize-y min-h-[140px]"
          />

          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleSubmit}
            className={`mt-4 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-colors ${
              canSubmit
                ? 'bg-sky-500 hover:bg-sky-600'
                : 'bg-sky-200 cursor-not-allowed'
            }`}
          >
            제출하기
          </button>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm font-bold text-gray-600 mb-2">안내 사항</p>
            <ul className="text-xs text-gray-500 space-y-2 leading-relaxed list-disc list-inside marker:text-gray-400">
              <li>
                산업안전보건법에 따라 고객 응대 근로자 보호조치를 시행하고 있으며 모든 문의는 기록으로 남습니다.
              </li>
              <li>
                본 요청은 비회원도 개인정보 제공 없이 제출하실 수 있으므로 이름, 연락처, 주민등록 번호 등 개인을 식별 할
                수 있는 정보는 입력하지 마십시오.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
