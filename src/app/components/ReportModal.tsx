import { X, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface ReportModalProps {
  /** 신고 대상 타입 */
  type: 'post' | 'comment';
  /** 신고 대상 ID */
  targetId: string;
  /** 신고 대상 작성자 이름 (선택) */
  targetAuthor?: string;
  /** 모달 닫기 */
  onClose: () => void;
  /** 신고 제출 완료 */
  onSubmit?: (data: { type: string; reason: string; detail: string; targetId: string }) => void;
}

const REPORT_REASONS = {
  post: [
    { value: 'advertisement', label: '광고/홍보성 게시글' },
    { value: 'abuse', label: '욕설/인신공격' },
    { value: 'false_info', label: '허위 정보' },
    { value: 'privacy', label: '개인정보 노출' },
    { value: 'duplicate', label: '중복 게시글' },
    { value: 'medical_violation', label: '의료법 위반 소지' },
    { value: 'other', label: '기타' },
  ],
  comment: [
    { value: 'abuse', label: '욕설/인신공격' },
    { value: 'false_info', label: '허위 정보' },
    { value: 'privacy', label: '개인정보 노출' },
    { value: 'spam', label: '도배/스팸' },
    { value: 'medical_violation', label: '의료법 위반 소지' },
    { value: 'other', label: '기타' },
  ],
};

// 신고 사유 레이블 매핑
const REASON_LABELS: Record<string, string> = {
  advertisement: '광고/홍보',
  abuse: '욕설/인신공격',
  false_info: '허위 정보',
  privacy: '개인정보 노출',
  duplicate: '중복 게시',
  medical_violation: '의료법 위반',
  spam: '도배/스팸',
  other: '기타',
};

export function ReportModal({
  type,
  targetId,
  targetAuthor,
  onClose,
  onSubmit,
}: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [detail, setDetail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasons = REPORT_REASONS[type];
  const targetTypeLabel = type === 'post' ? '게시글' : '댓글';

  const handleSubmit = async () => {
    if (!selectedReason) {
      alert('신고 사유를 선택해주세요.');
      return;
    }

    if (selectedReason === 'other' && !detail.trim()) {
      alert('기타 사유를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    // 신고 데이터
    const reportData = {
      type,
      reason: selectedReason,
      detail: detail.trim(),
      targetId,
    };

    // 모의 지연
    await new Promise(resolve => setTimeout(resolve, 500));

    // localStorage에 신고 정보 저장 (초기 서비스: 즉시 승인)
    try {
      const now = new Date();
      const reportRecord = {
        id: `report_${Date.now()}`,
        type,
        targetId,
        reason: selectedReason,
        reasonLabel: REASON_LABELS[selectedReason] || selectedReason,
        detail: detail.trim() || REASON_LABELS[selectedReason] || selectedReason,
        timestamp: now.toISOString(),
        status: 'pending', // A안: 완전 수동 처리 — 관리자 검토 대기
      };

      // 신고 목록 저장
      const reports = JSON.parse(localStorage.getItem('aiga_reports') || '[]');
      reports.push(reportRecord);
      localStorage.setItem('aiga_reports', JSON.stringify(reports));

      // pending 상태이므로 삭제 목록에 추가하지 않음 (관리자 승인 후 처리)
    } catch (error) {
      console.error('신고 저장 실패:', error);
    }

    onSubmit?.(reportData);
    
    alert('신고가 접수되었습니다.\n검토 후 조치하겠습니다.');
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold text-gray-900">{targetTypeLabel} 신고</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* 안내 문구 */}
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-800 leading-relaxed">
              허위 신고 시 서비스 이용이 제한될 수 있습니다.<br />
              신고는 익명으로 처리되며, 관리자 검토 후 조치됩니다.
            </p>
          </div>

          {targetAuthor && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                신고 대상: <span className="font-medium text-gray-900">{targetAuthor}</span>
              </p>
            </div>
          )}

          {/* 신고 사유 선택 */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              신고 사유 <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {reasons.map((reason) => (
                <label
                  key={reason.value}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedReason === reason.value
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="report-reason"
                    value={reason.value}
                    checked={selectedReason === reason.value}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-900">{reason.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 상세 설명 (기타 선택 시 필수, 그 외에는 선택) */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              상세 설명 {selectedReason === 'other' && <span className="text-red-500">*</span>}
              {selectedReason !== 'other' && <span className="text-gray-500 font-normal">(선택)</span>}
            </label>
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder={
                selectedReason === 'other'
                  ? '신고 사유를 자세히 입력해주세요.'
                  : '추가 설명이 있다면 입력해주세요. (선택사항)'
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
              rows={4}
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">
                {selectedReason === 'other' ? '최소 10자 이상 입력해주세요.' : ''}
              </p>
              <p className="text-xs text-gray-500">{detail.length}/500</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex gap-2 flex-shrink-0">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedReason || (selectedReason === 'other' && detail.trim().length < 10)}
            className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '신고 중...' : '신고하기'}
          </button>
        </div>
      </div>
    </div>
  );
}