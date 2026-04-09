// 신고 관리 페이지

import { useState } from 'react';
import {
  AlertTriangle,
  FileText,
  MessageCircle,
  Eye,
  Calendar,
  User,
  Check,
  X,
  Database,
  Trash2,
} from 'lucide-react';

interface Report {
  id: string;
  type: 'post' | 'comment';
  targetId: string;
  reason: string;
  reasonLabel: string;
  detail: string;
  reportedAt: string;
  reporterId: string;
  status: 'pending' | 'approved' | 'rejected';
  processedAt?: string;
  content?: {
    title?: string;
    text?: string;
    author?: string;
    createdAt?: string;
  };
}

interface ReportsManagementProps {
  reports: Report[];
  onRefresh: () => void;
  onApprove: (report: Report) => void;
  onReject: (report: Report) => void;
  onGenerateDummy: () => void;
  onClearAll: () => void;
}

export function ReportsManagement({
  reports,
  onRefresh,
  onApprove,
  onReject,
  onGenerateDummy,
  onClearAll,
}: ReportsManagementProps) {
  const [reportTab, setReportTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const filteredReports = reports.filter(r => r.status === reportTab);
  const pendingCount = reports.filter(r => r.status === 'pending').length;
  const approvedCount = reports.filter(r => r.status === 'approved').length;
  const rejectedCount = reports.filter(r => r.status === 'rejected').length;

  return (
    <>
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-1">신고 관리</h2>
        <p className="text-sm text-gray-500">커뮤니티 게시글 및 댓글 신고를 검토하고 처리합니다</p>
      </div>

      {/* 탭 */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-6">
          <button
            onClick={() => setReportTab('pending')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              reportTab === 'pending'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            대기중 ({pendingCount})
          </button>
          <button
            onClick={() => setReportTab('approved')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              reportTab === 'approved'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            승인됨 ({approvedCount})
          </button>
          <button
            onClick={() => setReportTab('rejected')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              reportTab === 'rejected'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            기각됨 ({rejectedCount})
          </button>
        </div>
      </div>

      {/* 신고 목록 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        {filteredReports.length > 0 ? (
          <div className="space-y-3">
            {filteredReports.map(report => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {report.type === 'post' ? (
                      <FileText className="w-5 h-5 text-gray-400" />
                    ) : (
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        report.type === 'post'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {report.type === 'post' ? '게시글' : '댓글'}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        report.status === 'pending'
                          ? 'bg-orange-100 text-orange-700'
                          : report.status === 'approved'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {report.status === 'pending' ? '대기중' : report.status === 'approved' ? '승인됨' : '기각됨'}
                      </span>
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">
                        {report.reasonLabel}
                      </span>
                    </div>
                    {report.content?.title && (
                      <p className="font-medium text-gray-900 mb-1 line-clamp-1">
                        {report.content.title}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {report.content?.text || report.detail}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(report.reportedAt).toLocaleDateString('ko-KR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>신고자: {report.reporterId}</span>
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
            <AlertTriangle className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500">
              {reportTab === 'pending' ? '대기중인 신고가 없습니다' :
               reportTab === 'approved' ? '승인된 신고가 없습니다' :
               '기각된 신고가 없습니다'}
            </p>
          </div>
        )}
      </div>

      {/* 더미 데이터 생성 및 삭제 버튼 */}
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
          모든 신고 삭제
        </button>
      </div>

      {/* 신고 상세 모달 */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* 헤더 */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">신고 상세</h3>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  selectedReport.type === 'post'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {selectedReport.type === 'post' ? '게시글' : '댓글'}
                </span>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">
                  {selectedReport.reasonLabel}
                </span>
              </div>
            </div>

            {/* 본문 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* 신고 정보 */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-red-900 mb-2">신고 정보</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-red-700 font-medium min-w-20">신고 사유:</span>
                    <span className="text-red-900">{selectedReport.reasonLabel}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-red-700 font-medium min-w-20">상세 내용:</span>
                    <span className="text-red-900">{selectedReport.detail || '없음'}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-red-700 font-medium min-w-20">신고 일시:</span>
                    <span className="text-red-900">{new Date(selectedReport.reportedAt).toLocaleString('ko-KR')}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-red-700 font-medium min-w-20">신고자:</span>
                    <span className="text-red-900">{selectedReport.reporterId}</span>
                  </div>
                </div>
              </div>

              {/* 원본 콘텐츠 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-gray-900 mb-2">신고된 콘텐츠</h4>
                {selectedReport.content?.title && (
                  <p className="font-medium text-gray-900 mb-2">{selectedReport.content.title}</p>
                )}
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {selectedReport.content?.text || '(원본 내용을 불러올 수 없습니다)'}
                </p>
                {selectedReport.content?.author && (
                  <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                    작성자: {selectedReport.content.author} · {selectedReport.content.createdAt}
                  </div>
                )}
              </div>

              {/* 처리 정보 */}
              {selectedReport.status !== 'pending' && (
                <div className={`border rounded-lg p-4 ${
                  selectedReport.status === 'approved'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <h4 className={`text-sm font-bold mb-2 ${
                    selectedReport.status === 'approved' ? 'text-red-900' : 'text-gray-900'
                  }`}>
                    처리 결과
                  </h4>
                  <div className="text-sm space-y-1">
                    <div className="flex gap-2">
                      <span className={`font-medium min-w-20 ${
                        selectedReport.status === 'approved' ? 'text-red-700' : 'text-gray-700'
                      }`}>
                        처리 상태:
                      </span>
                      <span className={selectedReport.status === 'approved' ? 'text-red-900' : 'text-gray-900'}>
                        {selectedReport.status === 'approved' ? '승인됨 (콘텐츠 삭제)' : '기각됨'}
                      </span>
                    </div>
                    {selectedReport.processedAt && (
                      <div className="flex gap-2">
                        <span className={`font-medium min-w-20 ${
                          selectedReport.status === 'approved' ? 'text-red-700' : 'text-gray-700'
                        }`}>
                          처리 일시:
                        </span>
                        <span className={selectedReport.status === 'approved' ? 'text-red-900' : 'text-gray-900'}>
                          {new Date(selectedReport.processedAt).toLocaleString('ko-KR')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 버튼 (대기중인 경우에만) */}
            {selectedReport.status === 'pending' && (
              <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => {
                    onReject(selectedReport);
                    setSelectedReport(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                  기각
                </button>
                <button
                  onClick={() => {
                    onApprove(selectedReport);
                    setSelectedReport(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                  승인 (콘텐츠 삭제)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
