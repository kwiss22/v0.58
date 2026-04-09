// 의사 정보 수정 요청 관리

import { useState } from 'react';
import { Edit3, Check, X, User, Calendar, Database, Trash2, Eye, ArrowRight } from 'lucide-react';

export interface DoctorEditRequest {
  id: string;
  doctorId: string;
  doctorName: string;
  requesterId: string;
  requesterName: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  processedAt?: string;
  changes: {
    field: string;
    fieldLabel: string;
    oldValue: string;
    newValue: string;
  }[];
  reason: string;
}

interface DoctorEditRequestsProps {
  requests: DoctorEditRequest[];
  onApprove: (request: DoctorEditRequest) => void;
  onReject: (request: DoctorEditRequest) => void;
  onGenerateDummy: () => void;
  onClearAll: () => void;
}

export function DoctorEditRequests({
  requests,
  onApprove,
  onReject,
  onGenerateDummy,
  onClearAll,
}: DoctorEditRequestsProps) {
  const [tab, setTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedRequest, setSelectedRequest] = useState<DoctorEditRequest | null>(null);

  const filteredRequests = requests.filter(r => r.status === tab);
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  return (
    <>
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-1">의사 정보 수정 요청 관리</h2>
        <p className="text-sm text-gray-500">사용자가 요청한 의사 정보 수정 사항을 검토하고 승인합니다</p>
      </div>

      {/* 탭 */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-6">
          <button
            onClick={() => setTab('pending')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === 'pending'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            대기중 ({pendingCount})
          </button>
          <button
            onClick={() => setTab('approved')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === 'approved'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            승인됨 ({approvedCount})
          </button>
          <button
            onClick={() => setTab('rejected')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === 'rejected'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            기각됨 ({rejectedCount})
          </button>
        </div>
      </div>

      {/* 요청 목록 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        {filteredRequests.length > 0 ? (
          <div className="space-y-3">
            {filteredRequests.map(request => (
              <div
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Edit3 className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        request.status === 'pending'
                          ? 'bg-orange-100 text-orange-700'
                          : request.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {request.status === 'pending' ? '대기중' : request.status === 'approved' ? '승인됨' : '기각됨'}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 mb-1">
                      {request.doctorName} 의사 정보 수정 요청
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {request.changes.length}개 항목 수정 요청 • {request.reason}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(request.requestedAt).toLocaleDateString('ko-KR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>요청자: {request.requesterName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Eye className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Edit3 className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500">
              {tab === 'pending' ? '대기중인 수정 요청이 없습니다' :
               tab === 'approved' ? '승인된 수정 요청이 없습니다' :
               '기각된 수정 요청이 없습니다'}
            </p>
          </div>
        )}
      </div>

      {/* 더미 데이터 버튼 */}
      <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
        <button
          onClick={onGenerateDummy}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <Database className="w-4 h-4" />
          더미 데이터 생성
        </button>
        <button
          onClick={onClearAll}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          모든 요청 삭제
        </button>
      </div>

      {/* 상세 모달 */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">수정 요청 상세</h3>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-500">{selectedRequest.doctorName} 의사 정보</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* 요청 정보 */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-orange-900 mb-2">요청 정보</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-orange-700 font-medium min-w-20">요청자:</span>
                    <span className="text-orange-900">{selectedRequest.requesterName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-orange-700 font-medium min-w-20">요청 일시:</span>
                    <span className="text-orange-900">{new Date(selectedRequest.requestedAt).toLocaleString('ko-KR')}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-orange-700 font-medium min-w-20">요청 사유:</span>
                    <span className="text-orange-900">{selectedRequest.reason}</span>
                  </div>
                </div>
              </div>

              {/* 수정 내용 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-gray-900 mb-3">수정 요청 내용</h4>
                <div className="space-y-3">
                  {selectedRequest.changes.map((change, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-2">{change.fieldLabel}</div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-500 mb-1">현재</div>
                          <div className="text-sm text-gray-700 bg-red-50 border border-red-200 rounded px-2 py-1">
                            {change.oldValue}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-500 mb-1">수정 요청</div>
                          <div className="text-sm text-gray-900 bg-green-50 border border-green-200 rounded px-2 py-1 font-medium">
                            {change.newValue}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 처리 정보 */}
              {selectedRequest.status !== 'pending' && (
                <div className={`border rounded-lg p-4 ${
                  selectedRequest.status === 'approved'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <h4 className={`text-sm font-bold mb-2 ${
                    selectedRequest.status === 'approved' ? 'text-green-900' : 'text-gray-900'
                  }`}>
                    처리 결과
                  </h4>
                  <div className="text-sm">
                    <span className={selectedRequest.status === 'approved' ? 'text-green-900' : 'text-gray-900'}>
                      {selectedRequest.status === 'approved' ? '승인됨 (정보 자동 반영)' : '기각됨'}
                    </span>
                    {selectedRequest.processedAt && (
                      <span className="ml-2 text-gray-500">
                        • {new Date(selectedRequest.processedAt).toLocaleString('ko-KR')}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {selectedRequest.status === 'pending' && (
              <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => {
                    onReject(selectedRequest);
                    setSelectedRequest(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                  기각
                </button>
                <button
                  onClick={() => {
                    onApprove(selectedRequest);
                    setSelectedRequest(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                  승인 (정보 반영)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
