// 의료진 인증 요청 관리

import { useState } from 'react';
import { BadgeCheck, Check, X, User, Calendar, Database, Trash2, Eye, FileText } from 'lucide-react';

export interface DoctorVerificationRequest {
  id: string;
  userId: string;
  userName: string;
  doctorId: string;
  doctorName: string;
  hospital: string;
  specialty: string;
  licenseNumber: string;
  document?: string; // 선택 서류
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  processedAt?: string;
  reason: string;
}

interface DoctorVerificationRequestsProps {
  requests: DoctorVerificationRequest[];
  onApprove: (request: DoctorVerificationRequest) => void;
  onReject: (request: DoctorVerificationRequest) => void;
  onGenerateDummy: () => void;
  onClearAll: () => void;
}

export function DoctorVerificationRequests({
  requests,
  onApprove,
  onReject,
  onGenerateDummy,
  onClearAll,
}: DoctorVerificationRequestsProps) {
  const [tab, setTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedRequest, setSelectedRequest] = useState<DoctorVerificationRequest | null>(null);

  const filteredRequests = requests.filter(r => r.status === tab);
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  return (
    <>
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-1">의료진 인증 요청 관리</h2>
        <p className="text-sm text-gray-500">의사 본인이 요청한 인증을 검토하고 배지를 부여합니다</p>
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
                    <BadgeCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        request.status === 'pending'
                          ? 'bg-green-100 text-green-700'
                          : request.status === 'approved'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {request.status === 'pending' ? '대기중' : request.status === 'approved' ? '승인됨' : '기각됨'}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 mb-1">
                      {request.doctorName} ({request.specialty})
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {request.hospital} • 면허번호: {request.licenseNumber}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(request.requestedAt).toLocaleDateString('ko-KR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>신청자: {request.userName}</span>
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
            <BadgeCheck className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500">
              {tab === 'pending' ? '대기중인 인증 요청이 없습니다' :
               tab === 'approved' ? '승인된 인증 요청이 없습니다' :
               '기각된 인증 요청이 없습니다'}
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
                <h3 className="text-lg font-bold text-gray-900">의료진 인증 요청 상세</h3>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-500">의료진 본인 인증</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* 신청자 정보 */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-green-900 mb-2">신청자 정보</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-green-700 font-medium min-w-24">신청자:</span>
                    <span className="text-green-900">{selectedRequest.userName} (User ID: {selectedRequest.userId})</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-700 font-medium min-w-24">신청 일시:</span>
                    <span className="text-green-900">{new Date(selectedRequest.requestedAt).toLocaleString('ko-KR')}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-700 font-medium min-w-24">신청 사유:</span>
                    <span className="text-green-900">{selectedRequest.reason}</span>
                  </div>
                </div>
              </div>

              {/* 의사 정보 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-blue-900 mb-2">인증할 의사 정보</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-blue-700 font-medium min-w-24">의사명:</span>
                    <span className="text-blue-900 font-bold">{selectedRequest.doctorName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-700 font-medium min-w-24">병원:</span>
                    <span className="text-blue-900">{selectedRequest.hospital}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-700 font-medium min-w-24">전문과목:</span>
                    <span className="text-blue-900">{selectedRequest.specialty}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-700 font-medium min-w-24">의사 면허번호:</span>
                    <span className="text-blue-900 font-mono font-bold">{selectedRequest.licenseNumber}</span>
                  </div>
                </div>
              </div>

              {/* 첨부 서류 */}
              {selectedRequest.document && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-bold text-gray-900 mb-2">첨부 서류</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FileText className="w-4 h-4" />
                    <span>{selectedRequest.document}</span>
                  </div>
                </div>
              )}

              {/* 인증 효과 안내 */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-yellow-900 mb-2">⚠️ 승인 시 효과</h4>
                <ul className="text-sm text-yellow-900 space-y-1 ml-4 list-disc">
                  <li>해당 의사 프로필에 <strong>"의사 인증"</strong> 배지 표시</li>
                  <li>해당 사용자가 작성한 <strong>게시글</strong>에 "의사 인증" 태그 표시</li>
                  <li>해당 사용자가 작성한 <strong>댓글</strong>에 "의사 인증" 태그 표시</li>
                  <li>해당 사용자가 작성한 <strong>리뷰</strong>에 "의사 인증" 태그 표시 (1개만 가능)</li>
                </ul>
              </div>

              {/* 처리 정보 */}
              {selectedRequest.status !== 'pending' && (
                <div className={`border rounded-lg p-4 ${
                  selectedRequest.status === 'approved'
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <h4 className={`text-sm font-bold mb-2 ${
                    selectedRequest.status === 'approved' ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    처리 결과
                  </h4>
                  <div className="text-sm">
                    <span className={selectedRequest.status === 'approved' ? 'text-blue-900' : 'text-gray-900'}>
                      {selectedRequest.status === 'approved' ? '✅ 승인됨 (의사 인증 배지 부여)' : '❌ 기각됨'}
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
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                  승인 (인증 배지 부여)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
