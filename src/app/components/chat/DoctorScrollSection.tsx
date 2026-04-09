// 질환별 의사 카드 가로 스크롤 섹션
import { Doctor } from '@/types/chat.types';
import { DOCTORS } from '@/constants/doctor-data';
import { DoctorCard } from '../DoctorCard';

interface DoctorScrollSectionProps {
  selectedDisease: string;
  onDoctorClick: (doctor: Doctor) => void;
}

// 질환별 매칭 로직
const getDoctorsByDisease = (disease: string): Doctor[] => {
  const diseaseMapping: Record<string, string[]> = {
    '전체': [], // 전체는 모든 의사 표시
    '폐암': ['폐암', '흉부외과', '호흡기내과'],
    '위암': ['위암', '소화기내과', '외과'],
    '대장암': ['대장암', '소화기내과', '외과'],
    '갑상선암': ['갑상선', '내분비외과', '외과'],
    '척추/관절': ['척추', '관절', '정형외과', '디스크'],
    '심장질환': ['심장', '심혈관', '순환기내과'],
  };

  const keywords = diseaseMapping[disease] || [];
  
  // 전체인 경우 모든 의사 반환
  if (disease === '전체') {
    return DOCTORS;
  }

  // 태그나 전문분야에 키워드가 포함된 의사 필터링
  return DOCTORS.filter((doctor) => {
    const matchesTag = doctor.tags?.some((tag) =>
      keywords.some((keyword) => tag.includes(keyword))
    );
    const matchesSpecialty = keywords.some((keyword) =>
      doctor.specialty.includes(keyword)
    );
    return matchesTag || matchesSpecialty;
  });
};

export function DoctorScrollSection({ selectedDisease, onDoctorClick }: DoctorScrollSectionProps) {
  const doctors = getDoctorsByDisease(selectedDisease);

  if (doctors.length === 0) {
    return (
      <div className="px-4 py-6 border-t border-gray-100">
        <div className="text-center py-8 text-gray-500 text-sm">
          해당 질환 전문 의료진 정보를 준비 중입니다.
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 border-t border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-900">
          👨‍⚕️ {selectedDisease} 전문 명의
        </h3>
        <span className="text-sm text-gray-500">{doctors.length}명</span>
      </div>

      {/* Doctor Cards - Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onClick={() => onDoctorClick(doctor)}
            compact={true}
          />
        ))}
      </div>
    </div>
  );
}