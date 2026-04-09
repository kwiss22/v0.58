// 의료진 관리 (관리자 직접 편집)

import { useState } from 'react';
import { Stethoscope, Search, Edit2, Trash2, BadgeCheck, X, Plus, Database } from 'lucide-react';

export interface DoctorInfo {
  id: string;
  name: string;
  hospital: string;
  specialty: string;
  experience?: string;
  education?: string;
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  image?: string;
  tags?: string[];
}

interface DoctorsManagementProps {
  doctors: DoctorInfo[];
  onUpdate: (doctor: DoctorInfo) => void;
  onDelete: (doctorId: string) => void;
  onToggleVerification: (doctorId: string) => void;
  onGenerateDummy: () => void;
}

export function DoctorsManagement({
  doctors,
  onUpdate,
  onDelete,
  onToggleVerification,
  onGenerateDummy,
}: DoctorsManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVerified, setFilterVerified] = useState<'all' | 'verified' | 'unverified'>('all');
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorInfo | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<DoctorInfo | null>(null);

  // 필터링
  const filteredDoctors = doctors.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         d.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         d.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterVerified === 'all' ||
                         (filterVerified === 'verified' && d.verified) ||
                         (filterVerified === 'unverified' && !d.verified);
    
    return matchesSearch && matchesFilter;
  });

  const verifiedCount = doctors.filter(d => d.verified).length;

  const handleEdit = (doctor: DoctorInfo) => {
    setSelectedDoctor(doctor);
    setEditData({ ...doctor });
    setEditMode(true);
  };

  const handleSave = () => {
    if (editData) {
      onUpdate(editData);
      setEditMode(false);
      setSelectedDoctor(null);
      setEditData(null);
    }
  };

  return (
    <>
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">의료진 관리</h2>
            <p className="text-sm text-gray-500">등록된 의사 정보를 직접 수정하고 관리합니다</p>
          </div>
          <button
            onClick={onGenerateDummy}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Database className="w-4 h-4" />
            더미 데이터 생성
          </button>
        </div>

        {/* 통계 */}
        <div className="flex gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
            <div className="text-xs text-blue-600 mb-0.5">전체 의사</div>
            <div className="text-xl font-bold text-blue-700">{doctors.length}명</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
            <div className="text-xs text-green-600 mb-0.5">인증 의사</div>
            <div className="text-xl font-bold text-green-700">{verifiedCount}명</div>
          </div>
        </div>
      </div>

      {/* 검색 & 필터 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex gap-3">
          {/* 검색 */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="의사명, 병원, 전문과목 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          {/* 필터 */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterVerified('all')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filterVerified === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilterVerified('verified')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filterVerified === 'verified'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              인증됨
            </button>
            <button
              onClick={() => setFilterVerified('unverified')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filterVerified === 'unverified'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              미인증
            </button>
          </div>
        </div>
      </div>

      {/* 의사 목록 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredDoctors.map(doctor => (
              <div
                key={doctor.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  {/* 프로필 이미지 */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>

                  {/* 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                      {doctor.verified && (
                        <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{doctor.specialty}</p>
                    <p className="text-xs text-gray-500">{doctor.hospital}</p>
                    {doctor.experience && (
                      <p className="text-xs text-gray-500 mt-1">경력: {doctor.experience}</p>
                    )}
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleEdit(doctor)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="수정"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => onToggleVerification(doctor.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        doctor.verified
                          ? 'hover:bg-red-50'
                          : 'hover:bg-green-50'
                      }`}
                      title={doctor.verified ? '인증 해제' : '인증 부여'}
                    >
                      <BadgeCheck className={`w-4 h-4 ${
                        doctor.verified ? 'text-red-600' : 'text-gray-400'
                      }`} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`${doctor.name} 의사 정보를 삭제하시겠습니까?`)) {
                          onDelete(doctor.id);
                        }
                      }}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Stethoscope className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500">등록된 의사가 없습니다</p>
          </div>
        )}
      </div>

      {/* 수정 모달 */}
      {editMode && editData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">의사 정보 수정</h3>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setEditData(null);
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">의사명</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">전문과목</label>
                  <input
                    type="text"
                    value={editData.specialty}
                    onChange={(e) => setEditData({ ...editData, specialty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">병원</label>
                <input
                  type="text"
                  value={editData.hospital}
                  onChange={(e) => setEditData({ ...editData, hospital: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">경력</label>
                <input
                  type="text"
                  value={editData.experience || ''}
                  onChange={(e) => setEditData({ ...editData, experience: e.target.value })}
                  placeholder="예: 15년"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">학력</label>
                <input
                  type="text"
                  value={editData.education || ''}
                  onChange={(e) => setEditData({ ...editData, education: e.target.value })}
                  placeholder="예: 서울대 의대"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <input
                  type="checkbox"
                  id="verified"
                  checked={editData.verified || false}
                  onChange={(e) => setEditData({ ...editData, verified: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="verified" className="flex items-center gap-2 text-sm font-medium text-blue-900 cursor-pointer">
                  <BadgeCheck className="w-4 h-4" />
                  의사 인증 배지
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setEditMode(false);
                  setEditData(null);
                }}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
