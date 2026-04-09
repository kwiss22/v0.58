// 요양급여 적정성 평가 기반 병원 데이터

export interface HospitalEvaluation {
  category: string; // 평가 카테고리 (위암, 대장암, 고혈압 등)
  grade: 1 | 2 | 3 | 4 | 5; // 등급 (1등급이 최우수)
  score?: number; // 세부 점수
}

export interface Hospital {
  id: string;
  name: string;
  type: '상급종합병원' | '종합병원' | '병원' | '의원';
  region: string; // 지역
  district: string; // 상세 지역
  address: string;
  phone: string;
  specialties: string[]; // 전문 분야
  evaluations: HospitalEvaluation[]; // 평가 정보
  patientExperience?: number; // 환자경험평가 점수 (1-5)
  strengths: string[]; // 강점 (평가 결과 기반)
  totalBeds?: number; // 병상 수
  doctors?: number; // 의사 수
  distance?: string; // 거리
}

export const HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: '서울대학교병원',
    type: '상급종합병원',
    region: '서울',
    district: '종로구',
    address: '서울시 종로구 대학로 101',
    phone: '02-2072-2114',
    specialties: ['위암', '대장암', '폐암', '급성심근경색증', '뇌졸중'],
    evaluations: [
      { category: '위암', grade: 1, score: 98.5 },
      { category: '대장암', grade: 1, score: 97.8 },
      { category: '폐암', grade: 1, score: 96.2 },
      { category: '급성심근경색증', grade: 1, score: 99.1 },
    ],
    patientExperience: 4.5,
    strengths: [
      '위암 수술 생존율 전국 1위',
      '로봇수술 3,000건 이상 경험',
      '24시간 응급 중환자 치료 시스템',
    ],
    totalBeds: 1779,
    doctors: 1650,
    distance: '1.2km',
  },
  {
    id: 'h2',
    name: '삼성서울병원',
    type: '상급종합병원',
    region: '서울',
    district: '강남구',
    address: '서울시 강남구 일원로 81',
    phone: '02-3410-2114',
    specialties: ['암질환', '심뇌혈관', '간암', '유방암'],
    evaluations: [
      { category: '간암', grade: 1, score: 99.2 },
      { category: '유방암', grade: 1, score: 98.7 },
      { category: '폐암', grade: 1, score: 97.5 },
      { category: '관상동맥우회술', grade: 1, score: 98.9 },
    ],
    patientExperience: 4.7,
    strengths: [
      '간암 5년 생존율 85% (전국 평균 대비 20% 높음)',
      '암 통합치료센터 운영',
      '최신 정밀의료 시스템 구축',
    ],
    totalBeds: 2104,
    doctors: 1800,
    distance: '2.5km',
  },
  {
    id: 'h3',
    name: '서울아산병원',
    type: '상급종합병원',
    region: '서울',
    district: '송파구',
    address: '서울시 송파구 올림픽로43길 88',
    phone: '02-3010-3114',
    specialties: ['암질환', '심장질환', '뇌졸중', '척추'],
    evaluations: [
      { category: '위암', grade: 1, score: 98.1 },
      { category: '대장암', grade: 1, score: 97.9 },
      { category: '급성기뇌졸중', grade: 1, score: 99.3 },
      { category: '관상동맥우회술', grade: 2, score: 95.8 },
    ],
    patientExperience: 4.6,
    strengths: [
      '뇌졸중 골든타임 대응률 99%',
      '심장질환 치료 건수 전국 1위',
      '척추센터 비수술 치료 전문',
    ],
    totalBeds: 2705,
    doctors: 1900,
    distance: '3.1km',
  },
  {
    id: 'h4',
    name: '연세세브란스병원',
    type: '상급종합병원',
    region: '서울',
    district: '서대문구',
    address: '서울시 서대문구 연세로 50-1',
    phone: '02-2228-5800',
    specialties: ['심장', '암', '뇌신경', '소화기'],
    evaluations: [
      { category: '급성심근경색증', grade: 1, score: 98.8 },
      { category: '위암', grade: 1, score: 97.3 },
      { category: '관상동맥우회술', grade: 1, score: 98.2 },
      { category: '대장암', grade: 2, score: 95.5 },
    ],
    patientExperience: 4.8,
    strengths: [
      '심장질환 수술 성공률 99.2%',
      '최소침습 수술 전문',
      '국제 의료기관 인증 (JCI) 획득',
    ],
    totalBeds: 2456,
    doctors: 1750,
    distance: '1.8km',
  },
  {
    id: 'h5',
    name: '서울성모병원',
    type: '종합병원',
    region: '서울',
    district: '서초구',
    address: '서울시 서초구 반포대로 222',
    phone: '02-2258-5114',
    specialties: ['암', '심혈관', '정신건강', '소아'],
    evaluations: [
      { category: '폐암', grade: 2, score: 94.7 },
      { category: '유방암', grade: 1, score: 96.8 },
      { category: '우울증 외래', grade: 1, score: 98.1 },
      { category: '신생아중환자실', grade: 1, score: 97.9 },
    ],
    patientExperience: 4.4,
    strengths: [
      '유방암 맞춤형 치료 프로그램',
      '정신건강 통합치료센터 운영',
      '호스피스 완화의료 1등급',
    ],
    totalBeds: 1355,
    doctors: 980,
    distance: '1.5km',
  },
  {
    id: 'h6',
    name: '강남세브란스병원',
    type: '종합병원',
    region: '서울',
    district: '강남구',
    address: '서울시 강남구 언주로 211',
    phone: '02-2019-3114',
    specialties: ['소화기', '내분비', '척추', '관절'],
    evaluations: [
      { category: '고혈압·당뇨병', grade: 1, score: 97.5 },
      { category: '만성폐쇄성폐질환', grade: 2, score: 95.2 },
      { category: '혈액투석', grade: 1, score: 98.3 },
      { category: '마취', grade: 1, score: 96.9 },
    ],
    patientExperience: 4.3,
    strengths: [
      '당뇨병 집중관리 프로그램',
      '만성질환 통합관리센터',
      '인공관절 수술 전문',
    ],
    totalBeds: 543,
    doctors: 420,
    distance: '2.8km',
  },
  {
    id: 'h7',
    name: '분당서울대병원',
    type: '종합병원',
    region: '경기',
    district: '성남시 분당구',
    address: '경기도 성남시 분당구 구미로 173번길 82',
    phone: '031-787-7114',
    specialties: ['암', '심장', '소아', '응급'],
    evaluations: [
      { category: '위암', grade: 2, score: 95.8 },
      { category: '대장암', grade: 2, score: 94.9 },
      { category: '중환자실', grade: 1, score: 98.5 },
      { category: '수혈', grade: 1, score: 97.8 },
    ],
    patientExperience: 4.5,
    strengths: [
      '첨단 중환자 치료 시스템',
      '소아응급 24시간 운영',
      '스마트병원 시스템 구축',
    ],
    totalBeds: 882,
    doctors: 710,
    distance: '15.2km',
  },
  {
    id: 'h8',
    name: '국립암센터',
    type: '병원',
    region: '경기',
    district: '고양시 일산동구',
    address: '경기도 고양시 일산동구 일산로 323',
    phone: '031-920-1114',
    specialties: ['암질환 전문'],
    evaluations: [
      { category: '위암', grade: 1, score: 99.1 },
      { category: '대장암', grade: 1, score: 98.8 },
      { category: '폐암', grade: 1, score: 98.5 },
      { category: '유방암', grade: 1, score: 97.9 },
      { category: '간암', grade: 1, score: 98.2 },
    ],
    patientExperience: 4.6,
    strengths: [
      '국가 암 정복 연구 선도 기관',
      '모든 암종 1등급 평가',
      '암 임상시험 최다 보유',
    ],
    totalBeds: 540,
    doctors: 380,
    distance: '22.5km',
  },
  {
    id: 'h9',
    name: '서울특별시보라매병원',
    type: '종합병원',
    region: '서울',
    district: '동작구',
    address: '서울시 동작구 보라매로5길 20',
    phone: '02-870-2114',
    specialties: ['외상', '응급', '재활', '호흡기'],
    evaluations: [
      { category: '폐렴', grade: 1, score: 97.2 },
      { category: '천식', grade: 1, score: 96.8 },
      { category: '결핵', grade: 1, score: 98.9 },
      { category: '중환자실', grade: 2, score: 94.5 },
    ],
    patientExperience: 4.2,
    strengths: [
      '호흡기 질환 전문 치료',
      '응급외상센터 권역거점',
      '재활치료 통합 프로그램',
    ],
    totalBeds: 890,
    doctors: 630,
    distance: '4.2km',
  },
  {
    id: 'h10',
    name: '중앙대학교병원',
    type: '종합병원',
    region: '서울',
    district: '동작구',
    address: '서울시 동작구 흑석로 102',
    phone: '02-6299-1114',
    specialties: ['소화기', '간', '심장', '신경'],
    evaluations: [
      { category: '위암', grade: 2, score: 94.2 },
      { category: '간암', grade: 2, score: 93.8 },
      { category: '급성기뇌졸중', grade: 2, score: 95.7 },
      { category: '폐렴', grade: 2, score: 94.1 },
    ],
    patientExperience: 4.1,
    strengths: [
      '간 질환 집중 치료센터',
      '뇌졸중 신속 대응 시스템',
      '소화기내시경 전문',
    ],
    totalBeds: 738,
    doctors: 520,
    distance: '3.8km',
  },
];

// 질환별 카테고리
export const DISEASE_CATEGORIES = [
  '전체',
  '암질환',
  '심뇌혈관',
  '만성질환',
  '정신건강',
  '호흡기',
  '소화기',
  '응급/외상',
] as const;

// 질환별 세부 항목 매핑
export const DISEASE_MAPPING: { [key: string]: string[] } = {
  '전체': [],
  '암질환': ['위암', '대장암', '폐암', '유방암', '간암'],
  '심뇌혈관': ['급성심근경색증', '관상동맥우회술', '급성기뇌졸중'],
  '만성질환': ['고혈압·당뇨병', '만성폐쇄성폐질환', '혈액투석'],
  '정신건강': ['의료급여정신과', '우울증 외래', '치매'],
  '호흡기': ['천식', '폐렴', '결핵', '만성폐쇄성폐질환'],
  '소화기': ['위암', '대장암'],
  '응급/외상': ['중환자실', '신생아중환자실'],
};

// 등급별 색상 및 레이블
export const GRADE_INFO = {
  1: {
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    label: '1등급 (최우수)',
    icon: '⭐',
  },
  2: {
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    label: '2등급 (우수)',
    icon: '⭐',
  },
  3: {
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    label: '3등급 (양호)',
    icon: '⭐',
  },
  4: {
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
    label: '4등급 (보통)',
    icon: '⭐',
  },
  5: {
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    label: '5등급 (개선필요)',
    icon: '⭐',
  },
} as const;
