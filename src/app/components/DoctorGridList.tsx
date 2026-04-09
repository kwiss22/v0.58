// 그리드 형태 의사 추천 리스트 컴포넌트

import { User, ArrowRight } from 'lucide-react';
import { Doctor } from '@/types/chat.types';

interface DoctorGridListProps {
  doctors: Doctor[];
  onDoctorClick?: (doctor: Doctor) => void;
  onShowMore?: () => void;
  showMoreLabel?: string;
  maxDisplay?: number;
}

export function DoctorGridList({
  doctors,
  onDoctorClick,
  onShowMore,
  showMoreLabel,
  maxDisplay = 3,
}: DoctorGridListProps) {
  const displayDoctors = doctors.slice(0, maxDisplay);

  return (
    <div>
      {/* 그리드 레이아웃 */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {displayDoctors.map((doctor) => (
          <button
            key={doctor.id}
            onClick={() => onDoctorClick?.(doctor)}
            data-doctor-id={doctor.id}
            className="flex flex-col items-center p-4 bg-white rounded-2xl border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all"
          >
            {/* 원형 프로필 */}
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <User className="w-8 h-8 text-gray-400" />
            </div>

            {/* 의사 이름 */}
            <h4 className="font-bold text-gray-900 text-center mb-1">
              {doctor.name}
            </h4>

            {/* 병원명 */}
            <p className="text-sm text-teal-600 font-medium text-center mb-1">
              {doctor.hospital}
            </p>

            {/* 전문과 */}
            <p className="text-xs text-gray-600 text-center line-clamp-2">
              {doctor.specialty}
            </p>
          </button>
        ))}
      </div>

      {/* 더보기 버튼 */}
      {onShowMore && showMoreLabel && (
        <button
          onClick={onShowMore}
          className="w-full bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 text-teal-700 font-semibold py-3 rounded-xl hover:shadow-md transition-all flex items-center justify-center gap-2"
        >
          {showMoreLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}