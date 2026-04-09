// 의료진 카드 컴포넌트

import { Star, User } from 'lucide-react';
import { Doctor } from '@/types/chat.types';

interface DoctorCardProps {
  doctor: Doctor;
  onClick?: () => void;
  compact?: boolean;
}

export function DoctorCard({ doctor, onClick, compact = false }: DoctorCardProps) {
  if (compact) {
    return (
      <div
        onClick={onClick}
        data-doctor-id={doctor.id}
        className="flex-shrink-0 w-48 p-4 bg-white rounded-2xl border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer"
      >
        {/* 상단 배지 */}
        <div className="flex items-center gap-1 mb-3 px-2 py-1 bg-teal-50 rounded-lg w-fit">
          <span className="text-xs">✓</span>
          <span className="text-xs">👍</span>
          <span className="text-xs text-teal-600 font-medium">동료 의사 추천</span>
        </div>

        {/* 원형 프로필 이미지 */}
        <div className="flex justify-center mb-3">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-100">
            <User className="w-10 h-10 text-gray-400" />
          </div>
        </div>

        {/* 이름 */}
        <h4 className="font-bold text-gray-900 text-center mb-2">{doctor.name} 교수</h4>
        
        {/* 병원명 & 전문과 (2줄) */}
        <div className="flex flex-col items-center gap-1 mb-3">
          <div className="text-sm text-teal-600 font-medium">{doctor.hospital}</div>
          <div className="text-xs text-gray-600">{doctor.specialty}</div>
        </div>

        {/* 상세보기 버튼 */}
        <button className="w-full bg-gray-100 text-gray-700 font-medium py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
          상세보기
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
        <User className="w-12 h-12 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900">{doctor.name}</h4>
        <p className="text-sm text-gray-600 mt-1">{doctor.hospital}</p>
        <p className="text-sm text-blue-600 mt-1">{doctor.specialty}</p>
        {doctor.experience && (
          <p className="text-xs text-gray-500 mt-1">경력 {doctor.experience}</p>
        )}
        {doctor.rating && (
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{doctor.rating}</span>
            <span className="text-xs text-gray-500">({doctor.reviewCount})</span>
          </div>
        )}
      </div>
    </div>
  );
}