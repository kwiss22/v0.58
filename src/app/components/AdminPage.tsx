// 관리자 메인 페이지 (PC 전용) - 통합 버전

import { useState, useEffect } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { AdminSidebar } from './admin/AdminSidebar';
import { ReportsManagement } from './admin/ReportsManagement';
import { DoctorEditRequests, type DoctorEditRequest } from './admin/DoctorEditRequests';
import { DoctorVerificationRequests, type DoctorVerificationRequest } from './admin/DoctorVerificationRequests';
import { DoctorsManagement, type DoctorInfo } from './admin/DoctorsManagement';

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

interface AdminPageProps {
  onLogout: () => void;
}

export function AdminPage({ onLogout }: AdminPageProps) {
  const [activeMenu, setActiveMenu] = useState<string>('reports');
  const [reports, setReports] = useState<Report[]>([]);
  const [editRequests, setEditRequests] = useState<DoctorEditRequest[]>([]);
  const [verificationRequests, setVerificationRequests] = useState<DoctorVerificationRequest[]>([]);
  const [doctors, setDoctors] = useState<DoctorInfo[]>([]);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    loadReports();
    loadEditRequests();
    loadVerificationRequests();
    loadDoctors();
  };

  // ============ 신고 관리 ============
  const loadReports = () => {
    try {
      const storedReports = JSON.parse(localStorage.getItem('aiga_reports') || '[]');
      setReports(storedReports);
    } catch (error) {
      console.error('신고 데이터 로드 실패:', error);
    }
  };

  const handleApproveReport = (report: Report) => {
    if (!confirm(`이 ${report.type === 'post' ? '게시글' : '댓글'}을 삭제하시겠습니까?\n\n사유: ${report.reasonLabel}`)) {
      return;
    }

    try {
      const updatedReports = reports.map(r =>
        r.id === report.id
          ? { ...r, status: 'approved' as const, processedAt: new Date().toISOString() }
          : r
      );
      setReports(updatedReports);
      localStorage.setItem('aiga_reports', JSON.stringify(updatedReports));

      if (report.type === 'post') {
        const deletedPosts = JSON.parse(localStorage.getItem('aiga_deleted_posts') || '[]');
        if (!deletedPosts.includes(report.targetId)) {
          deletedPosts.push(report.targetId);
          localStorage.setItem('aiga_deleted_posts', JSON.stringify(deletedPosts));
        }
      } else {
        const deletedComments = JSON.parse(localStorage.getItem('aiga_deleted_comments') || '[]');
        if (!deletedComments.includes(report.targetId)) {
          deletedComments.push(report.targetId);
          localStorage.setItem('aiga_deleted_comments', JSON.stringify(deletedComments));
        }
      }

      alert('승인되었습니다. 해당 콘텐츠가 삭제됩니다.');
    } catch (error) {
      console.error('승인 처리 실패:', error);
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  const handleRejectReport = (report: Report) => {
    if (!confirm('이 신고를 기각하시겠습니까?')) {
      return;
    }

    try {
      const updatedReports = reports.map(r =>
        r.id === report.id
          ? { ...r, status: 'rejected' as const, processedAt: new Date().toISOString() }
          : r
      );
      setReports(updatedReports);
      localStorage.setItem('aiga_reports', JSON.stringify(updatedReports));
      alert('신고가 기각되었습니다.');
    } catch (error) {
      console.error('기각 처리 실패:', error);
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  const generateReportsDummy = () => {
    if (!confirm('더미 신고 데이터를 생성하시겠습니까?\n기존 신고 데이터에 추가됩니다.')) {
      return;
    }

    const now = new Date();
    const dummyReports: Report[] = [
      {
        id: 'dummy-report-1',
        type: 'post',
        targetId: 'post-dummy-1',
        reason: 'inappropriate',
        reasonLabel: '부적절한 콘텐츠',
        detail: '의학적 근거 없는 허위 정보를 유포하고 있습니다.',
        reportedAt: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
        reporterId: 'user_kim123',
        status: 'pending',
        content: {
          title: '○○병원 ○○과 진료 후기',
          text: '이 병원에서 처방받은 약은 절대 드시면 안됩니다...',
          author: '익명의환자',
          createdAt: '2시간 전',
        },
      },
      {
        id: 'dummy-report-2',
        type: 'comment',
        targetId: 'comment-dummy-1',
        reason: 'abuse',
        reasonLabel: '욕설/비방',
        detail: '특정 의사에 대한 심한 욕설이 포함되어 있습니다.',
        reportedAt: new Date(now.getTime() - 1000 * 60 * 15).toISOString(),
        reporterId: 'user_choi789',
        status: 'pending',
        content: {
          text: '저 의사 진짜 최악이에요...',
          author: '화난환자',
          createdAt: '30분 전',
        },
      },
    ];

    try {
      const existingReports = JSON.parse(localStorage.getItem('aiga_reports') || '[]');
      const combinedReports = [...existingReports, ...dummyReports];
      localStorage.setItem('aiga_reports', JSON.stringify(combinedReports));
      loadReports();
      alert(`더미 데이터 ${dummyReports.length}개가 생성되었습니다!`);
    } catch (error) {
      console.error('더미 데이터 생성 실패:', error);
      alert('더미 데이터 생성 중 오류가 발생했습니다.');
    }
  };

  const clearAllReports = () => {
    if (!confirm('모든 신고 데이터를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
      return;
    }

    try {
      localStorage.removeItem('aiga_reports');
      setReports([]);
      alert('모든 신고 데이터가 삭제되었습니다.');
    } catch (error) {
      console.error('데이터 삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  // ============ 의사 정보 수정 요청 ============
  const loadEditRequests = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('aiga_doctor_edit_requests') || '[]');
      setEditRequests(stored);
    } catch (error) {
      console.error('수정 요청 로드 실패:', error);
    }
  };

  const handleApproveEdit = (request: DoctorEditRequest) => {
    if (!confirm('이 수정 요청을 승인하시겠습니까?\n승인 시 의사 정보가 자동으로 업데이트됩니다.')) {
      return;
    }

    try {
      // 1. 요청 승인 처리
      const updatedRequests = editRequests.map(r =>
        r.id === request.id
          ? { ...r, status: 'approved' as const, processedAt: new Date().toISOString() }
          : r
      );
      setEditRequests(updatedRequests);
      localStorage.setItem('aiga_doctor_edit_requests', JSON.stringify(updatedRequests));

      // 2. 의사 정보 자동 반영
      const doctorIndex = doctors.findIndex(d => d.id === request.doctorId);
      if (doctorIndex !== -1) {
        const updatedDoctors = [...doctors];
        request.changes.forEach(change => {
          (updatedDoctors[doctorIndex] as any)[change.field] = change.newValue;
        });
        setDoctors(updatedDoctors);
        localStorage.setItem('aiga_doctors', JSON.stringify(updatedDoctors));
      }

      alert('승인되었습니다. 의사 정보가 업데이트되었습니다.');
    } catch (error) {
      console.error('승인 처리 실패:', error);
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  const handleRejectEdit = (request: DoctorEditRequest) => {
    if (!confirm('이 수정 요청을 기각하시겠습니까?')) {
      return;
    }

    try {
      const updatedRequests = editRequests.map(r =>
        r.id === request.id
          ? { ...r, status: 'rejected' as const, processedAt: new Date().toISOString() }
          : r
      );
      setEditRequests(updatedRequests);
      localStorage.setItem('aiga_doctor_edit_requests', JSON.stringify(updatedRequests));
      alert('수정 요청이 기각되었습니다.');
    } catch (error) {
      console.error('기각 처리 실패:', error);
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  const generateEditRequestsDummy = () => {
    if (!confirm('더미 수정 요청 데이터를 생성하시겠습니까?')) {
      return;
    }

    const now = new Date();
    const dummyRequests: DoctorEditRequest[] = [
      {
        id: 'edit-req-1',
        doctorId: 'doctor-1',
        doctorName: '김철수',
        requesterId: 'user-123',
        requesterName: '환자A',
        requestedAt: new Date(now.getTime() - 1000 * 60 * 60).toISOString(),
        status: 'pending',
        changes: [
          {
            field: 'specialty',
            fieldLabel: '전문과목',
            oldValue: '내과',
            newValue: '소화기내과',
          },
        ],
        reason: '전공이 잘못 표기되어 있습니다',
      },
    ];

    try {
      const existing = JSON.parse(localStorage.getItem('aiga_doctor_edit_requests') || '[]');
      const combined = [...existing, ...dummyRequests];
      localStorage.setItem('aiga_doctor_edit_requests', JSON.stringify(combined));
      loadEditRequests();
      alert(`더미 데이터 ${dummyRequests.length}개가 생성되었습니다!`);
    } catch (error) {
      console.error('더미 데이터 생성 실패:', error);
    }
  };

  const clearAllEditRequests = () => {
    if (!confirm('모든 수정 요청을 삭제하시겠습니까?')) {
      return;
    }

    try {
      localStorage.removeItem('aiga_doctor_edit_requests');
      setEditRequests([]);
      alert('모든 수정 요청이 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  // ============ 의료진 인증 요청 ============
  const loadVerificationRequests = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('aiga_doctor_verification_requests') || '[]');
      setVerificationRequests(stored);
    } catch (error) {
      console.error('인증 요청 로드 실패:', error);
    }
  };

  const handleApproveVerification = (request: DoctorVerificationRequest) => {
    if (!confirm(`${request.doctorName} 의사의 인증을 승인하시겠습니까?\n승인 시 해당 의사의 게시글/댓글/리뷰에 인증 배지가 표시됩니다.`)) {
      return;
    }

    try {
      // 1. 요청 승인 처리
      const updatedRequests = verificationRequests.map(r =>
        r.id === request.id
          ? { ...r, status: 'approved' as const, processedAt: new Date().toISOString() }
          : r
      );
      setVerificationRequests(updatedRequests);
      localStorage.setItem('aiga_doctor_verification_requests', JSON.stringify(updatedRequests));

      // 2. 인증된 의사 목록에 추가
      const verifiedDoctors = JSON.parse(localStorage.getItem('aiga_verified_doctors') || '{}');
      verifiedDoctors[request.userId] = request.doctorId;
      localStorage.setItem('aiga_verified_doctors', JSON.stringify(verifiedDoctors));

      // 3. 의사 정보에 verified 플래그 추가
      const doctorIndex = doctors.findIndex(d => d.id === request.doctorId);
      if (doctorIndex !== -1) {
        const updatedDoctors = [...doctors];
        updatedDoctors[doctorIndex].verified = true;
        setDoctors(updatedDoctors);
        localStorage.setItem('aiga_doctors', JSON.stringify(updatedDoctors));
      }

      alert('승인되었습니다. 의사 인증 배지가 부여되었습니다.');
    } catch (error) {
      console.error('승인 처리 실패:', error);
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  const handleRejectVerification = (request: DoctorVerificationRequest) => {
    if (!confirm('이 인증 요청을 기각하시겠습니까?')) {
      return;
    }

    try {
      const updatedRequests = verificationRequests.map(r =>
        r.id === request.id
          ? { ...r, status: 'rejected' as const, processedAt: new Date().toISOString() }
          : r
      );
      setVerificationRequests(updatedRequests);
      localStorage.setItem('aiga_doctor_verification_requests', JSON.stringify(updatedRequests));
      alert('인증 요청이 기각되었습니다.');
    } catch (error) {
      console.error('기각 처리 실패:', error);
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  const generateVerificationRequestsDummy = () => {
    if (!confirm('더미 인증 요청 데이터를 생성하시겠습니까?')) {
      return;
    }

    const now = new Date();
    const dummyRequests: DoctorVerificationRequest[] = [
      {
        id: 'verify-req-1',
        userId: 'user-doc-1',
        userName: '박영희',
        doctorId: 'doctor-2',
        doctorName: '박영희',
        hospital: '서울대학교병원',
        specialty: '심장내과',
        licenseNumber: '12345',
        requestedAt: new Date(now.getTime() - 1000 * 60 * 45).toISOString(),
        status: 'pending',
        reason: '본인 인증을 통해 환자들에게 신뢰를 주고 싶습니다',
      },
    ];

    try {
      const existing = JSON.parse(localStorage.getItem('aiga_doctor_verification_requests') || '[]');
      const combined = [...existing, ...dummyRequests];
      localStorage.setItem('aiga_doctor_verification_requests', JSON.stringify(combined));
      loadVerificationRequests();
      alert(`더미 데이터 ${dummyRequests.length}개가 생성되었습니다!`);
    } catch (error) {
      console.error('더미 데이터 생성 실패:', error);
    }
  };

  const clearAllVerificationRequests = () => {
    if (!confirm('모든 인증 요청을 삭제하시겠습니까?')) {
      return;
    }

    try {
      localStorage.removeItem('aiga_doctor_verification_requests');
      setVerificationRequests([]);
      alert('모든 인증 요청이 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  // ============ 의료진 관리 ============
  const loadDoctors = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('aiga_doctors') || '[]');
      setDoctors(stored);
    } catch (error) {
      console.error('의사 데이터 로드 실패:', error);
    }
  };

  const handleUpdateDoctor = (doctor: DoctorInfo) => {
    try {
      const updatedDoctors = doctors.map(d => (d.id === doctor.id ? doctor : d));
      setDoctors(updatedDoctors);
      localStorage.setItem('aiga_doctors', JSON.stringify(updatedDoctors));
      alert('의사 정보가 업데이트되었습니다.');
    } catch (error) {
      console.error('업데이트 실패:', error);
      alert('업데이트 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteDoctor = (doctorId: string) => {
    try {
      const updatedDoctors = doctors.filter(d => d.id !== doctorId);
      setDoctors(updatedDoctors);
      localStorage.setItem('aiga_doctors', JSON.stringify(updatedDoctors));
      alert('의사 정보가 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleToggleVerification = (doctorId: string) => {
    try {
      const updatedDoctors = doctors.map(d =>
        d.id === doctorId ? { ...d, verified: !d.verified } : d
      );
      setDoctors(updatedDoctors);
      localStorage.setItem('aiga_doctors', JSON.stringify(updatedDoctors));
    } catch (error) {
      console.error('인증 토글 실패:', error);
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  const generateDoctorsDummy = () => {
    if (!confirm('더미 의사 데이터를 생성하시겠습니까?')) {
      return;
    }

    const dummyDoctors: DoctorInfo[] = [
      {
        id: 'doctor-1',
        name: '김철수',
        hospital: '서울대학교병원',
        specialty: '내과',
        experience: '15년',
        education: '서울대 의대',
        verified: false,
      },
      {
        id: 'doctor-2',
        name: '박영희',
        hospital: '삼성서울병원',
        specialty: '심장내과',
        experience: '20년',
        education: '연세대 의대',
        verified: true,
      },
    ];

    try {
      const existing = JSON.parse(localStorage.getItem('aiga_doctors') || '[]');
      const combined = [...existing, ...dummyDoctors];
      localStorage.setItem('aiga_doctors', JSON.stringify(combined));
      loadDoctors();
      alert(`더미 데이터 ${dummyDoctors.length}개가 생성되었습니다!`);
    } catch (error) {
      console.error('더미 데이터 생성 실패:', error);
    }
  };

  // 카운트
  const pendingReportsCount = reports.filter(r => r.status === 'pending').length;
  const pendingEditRequestsCount = editRequests.filter(r => r.status === 'pending').length;
  const pendingVerificationRequestsCount = verificationRequests.filter(r => r.status === 'pending').length;

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* 사이드바 */}
      <AdminSidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        onLogout={onLogout}
        pendingReportsCount={pendingReportsCount}
        pendingEditRequestsCount={pendingEditRequestsCount}
        pendingVerificationRequestsCount={pendingVerificationRequestsCount}
      />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeMenu === 'reports' && (
          <ReportsManagement
            reports={reports}
            onRefresh={loadReports}
            onApprove={handleApproveReport}
            onReject={handleRejectReport}
            onGenerateDummy={generateReportsDummy}
            onClearAll={clearAllReports}
          />
        )}

        {activeMenu === 'doctor-edit' && (
          <DoctorEditRequests
            requests={editRequests}
            onApprove={handleApproveEdit}
            onReject={handleRejectEdit}
            onGenerateDummy={generateEditRequestsDummy}
            onClearAll={clearAllEditRequests}
          />
        )}

        {activeMenu === 'doctor-verify' && (
          <DoctorVerificationRequests
            requests={verificationRequests}
            onApprove={handleApproveVerification}
            onReject={handleRejectVerification}
            onGenerateDummy={generateVerificationRequestsDummy}
            onClearAll={clearAllVerificationRequests}
          />
        )}

        {activeMenu === 'doctors' && (
          <DoctorsManagement
            doctors={doctors}
            onUpdate={handleUpdateDoctor}
            onDelete={handleDeleteDoctor}
            onToggleVerification={handleToggleVerification}
            onGenerateDummy={generateDoctorsDummy}
          />
        )}

        {/* 향후 구현 메뉴 */}
        {!['reports', 'doctor-edit', 'doctor-verify', 'doctors'].includes(activeMenu) && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium mb-1">향후 구현 예정</p>
              <p className="text-sm text-gray-400">이 기능은 추후 추가될 예정입니다</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
