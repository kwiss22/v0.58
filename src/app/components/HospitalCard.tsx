// 병원 추천 카드 컴포넌트
import { MapPin, Star, Check, Phone, Navigation, ExternalLink } from 'lucide-react';
import { Hospital, GRADE_INFO } from '@/constants/hospital-data';

interface HospitalCardProps {
  hospital: Hospital;
  onClick: () => void;
  highlightCategory?: string; // 강조할 질환 카테고리
}

export function HospitalCard({ hospital, onClick, highlightCategory }: HospitalCardProps) {
  // 강조할 카테고리의 평가 정보 찾기
  const mainEvaluation = highlightCategory
    ? hospital.evaluations.find((e) => e.category === highlightCategory)
    : hospital.evaluations[0];

  const gradeInfo = mainEvaluation ? GRADE_INFO[mainEvaluation.grade] : null;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* 헤더 영역 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{hospital.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
              {hospital.type}
            </span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {hospital.region} {hospital.district}
              </span>
            </div>
            {hospital.distance && (
              <span className="text-blue-600 font-medium">{hospital.distance}</span>
            )}
          </div>
        </div>

        {/* 평가 등급 배지 */}
        {gradeInfo && (
          <div
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r ${gradeInfo.color} text-white text-sm font-medium shadow-sm`}
          >
            <span>{gradeInfo.icon}</span>
            <span>{mainEvaluation?.grade}등급</span>
          </div>
        )}
      </div>

      {/* 전문 분야 */}
      {mainEvaluation && (
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-900">
            {mainEvaluation.category} 전문{' '}
            {mainEvaluation.score && (
              <span className="text-blue-600">({mainEvaluation.score}점)</span>
            )}
          </p>
        </div>
      )}

      {/* 환자경험평가 */}
      {hospital.patientExperience && (
        <div className="flex items-center gap-1 mb-3 text-sm text-gray-600">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">환자경험평가</span>
          <span className="text-gray-900 font-semibold">
            {hospital.patientExperience}/5.0
          </span>
        </div>
      )}

      {/* 강점 영역 */}
      <div className="space-y-1.5 mb-4">
        {hospital.strengths.slice(0, 3).map((strength, index) => (
          <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="flex-1">{strength}</span>
          </div>
        ))}
      </div>

      {/* 액션 버튼 */}
      <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
        상세보기
      </button>
    </div>
  );
}

// 챗봇용 병원 추천 카드 (간소화 버전 - 이미지 디자인 참고)
interface HospitalChatCardProps {
  hospital: Hospital;
  onMapClick?: () => void;
  onWebsiteClick?: () => void;
}

export function HospitalChatCard({
  hospital,
  onMapClick,
  onWebsiteClick,
}: HospitalChatCardProps) {
  const handleMapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMapClick) {
      onMapClick();
    } else {
      // 기본 동작: 네이버 지도 검색
      window.open(`https://map.naver.com/v5/search/${encodeURIComponent(hospital.name)}`, '_blank');
    }
  };

  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onWebsiteClick) {
      onWebsiteClick();
    } else {
      // 기본 동작: 구글 검색
      window.open(`https://www.google.com/search?q=${encodeURIComponent(hospital.name)}`, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* 병원명 */}
      <h4 className="font-bold text-gray-900 mb-3">{hospital.name}</h4>

      {/* 주소 */}
      <div className="flex items-start gap-2 mb-2 text-sm text-gray-600">
        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span className="flex-1">{hospital.address}</span>
      </div>

      {/* 전화번호 */}
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
        <Phone className="w-4 h-4 flex-shrink-0" />
        <a href={`tel:${hospital.phone}`} className="hover:text-blue-600 transition-colors">
          {hospital.phone}
        </a>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={handleMapClick}
          className="flex-1 bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
        >
          지도보기
        </button>
        <button
          onClick={handleWebsiteClick}
          className="flex-1 bg-gray-100 text-gray-700 text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
        >
          홈페이지 이동
        </button>
      </div>
    </div>
  );
}