// 가로 스크롤 의료진 리스트 컴포넌트

import { Doctor } from '@/types/chat.types';
import { DoctorCard } from './DoctorCard';

interface HorizontalDoctorListProps {
  doctors: Doctor[];
  onDoctorClick?: (doctor: Doctor) => void;
}

export function HorizontalDoctorList({
  doctors,
  onDoctorClick,
}: HorizontalDoctorListProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          onClick={() => onDoctorClick?.(doctor)}
          compact
        />
      ))}
    </div>
  );
}
