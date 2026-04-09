// 질환명 감지 및 병원 추천 유틸리티

import { HOSPITALS, DISEASE_MAPPING, type Hospital } from '@/constants/hospital-data';

// 병원 추천 관련 키워드
const HOSPITAL_KEYWORDS = [
  '병원',
  '병원 추천',
  '병원 찾아줘',
  '병원 알려줘',
  '병원 어디',
  '어느 병원',
  '어디 병원',
  '좋은 병원',
];

// 의사 추천 관련 키워드
const DOCTOR_KEYWORDS = [
  '명의',
  '의사',
  '전문의',
  '교수',
  '선생님',
  '닥터',
  'doctor',
  '추천',
  '찾아줘',
  '알려줘',
  '소개',
  '잘하는',
];

// 질환명 키워드 매핑
const DISEASE_KEYWORDS: { [key: string]: string[] } = {
  위암: ['위암', '위 암', '위장암'],
  대장암: ['대장암', '대장 암', '직장암'],
  폐암: ['폐암', '폐 암', '허파암'],
  유방암: ['유방암', '유방 암', '젖샘암'],
  간암: ['간암', '간 암', '간세포암'],
  급성심근경색증: ['심근경색', '심장마비', '심근경색증', '관상동맥'],
  급성기뇌졸중: ['뇌졸중', '뇌출혈', '뇌경색'],
  '고혈압·당뇨병': ['고혈압', '당뇨', '당뇨병', '혈압'],
  만성폐쇄성폐질환: ['만성폐쇄', 'COPD', '폐쇄성폐질환'],
  천식: ['천식', '기관지'],
  폐렴: ['폐렴'],
  치매: ['치매', '알츠하이머', '인지장애'],
  '우울증 외래': ['우울증', '우울', '정신건강'],
};

// 질환명 감지 함수
export function detectDisease(userMessage: string): string | null {
  const lowerMessage = userMessage.toLowerCase();

  for (const [disease, keywords] of Object.entries(DISEASE_KEYWORDS)) {
    if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return disease;
    }
  }

  return null;
}

// 병원 추천 요청 감지
export function isHospitalRecommendationRequest(userMessage: string): boolean {
  const lowerMessage = userMessage.toLowerCase();
  
  // 병원 관련 키워드가 있는지 확인
  const hasHospitalKeyword = HOSPITAL_KEYWORDS.some((keyword) =>
    lowerMessage.includes(keyword)
  );

  // 질환명이 포함되어 있는지 확인
  const hasDisease = detectDisease(userMessage) !== null;

  return hasHospitalKeyword && hasDisease;
}

// 질환별 병원 추천 (최대 3개)
export function getRecommendedHospitals(disease: string): Hospital[] {
  // 해당 질환의 평가 데이터가 있는 병원 필터링
  const filteredHospitals = HOSPITALS.filter((hospital) =>
    hospital.evaluations.some((e) => e.category === disease)
  );

  // 해당 질환의 등급순으로 정렬
  const sortedHospitals = filteredHospitals.sort((a, b) => {
    const aEval = a.evaluations.find((e) => e.category === disease);
    const bEval = b.evaluations.find((e) => e.category === disease);

    if (!aEval) return 1;
    if (!bEval) return -1;

    // 등급으로 정렬 (낮을수록 우수)
    if (aEval.grade !== bEval.grade) {
      return aEval.grade - bEval.grade;
    }

    // 같은 등급이면 점수로 정렬
    return (bEval.score || 0) - (aEval.score || 0);
  });

  // 상위 3개 반환
  return sortedHospitals.slice(0, 3);
}

// AI 답변 생성 (병원 추천)
export function generateHospitalRecommendationMessage(
  disease: string,
  hospitals: Hospital[]
): string {
  if (hospitals.length === 0) {
    return `죄송합니다. ${disease} 관련 평가 데이터가 있는 병원을 찾지 못했습니다.`;
  }

  const topHospital = hospitals[0];
  const topEval = topHospital.evaluations.find((e) => e.category === disease);

  let message = `${disease} 치료로 유명한 병원을 추천해드릴게요.\n\n`;
  message += `건강보험심사평가원의 요양급여 적정성 평가 결과를 기반으로 선정했습니다.\n\n`;

  if (topEval) {
    message += `**${topHospital.name}**는 ${disease} 분야에서 `;
    message += `**${topEval.grade}등급**을 받았으며`;
    if (topEval.score) {
      message += ` ${topEval.score}점의 높은 평가를 받았습니다.`;
    } else {
      message += ` 우수한 의료 서비스를 제공하고 있습니다.`;
    }
    message += `\n\n`;
  }

  if (hospitals.length > 1) {
    message += `아래에 ${disease} 치료에 특화된 ${hospitals.length}개 병원을 추천해드립니다. `;
    message += `각 병원의 상세 정보와 평가 등급을 확인하실 수 있습니다.`;
  }

  return message;
}

// 질환명 한글화
export function formatDiseaseName(disease: string): string {
  const diseaseNames: { [key: string]: string } = {
    위암: '위암',
    대장암: '대장암',
    폐암: '폐암',
    유방암: '유방암',
    간암: '간암',
    급성심근경색증: '급성 심근경색증',
    급성기뇌졸중: '급성기 뇌졸중',
    '고혈압·당뇨병': '고혈압/당뇨병',
    만성폐쇄성폐질환: '만성 폐쇄성 폐질환 (COPD)',
    천식: '천식',
    폐렴: '폐렴',
    치매: '치매',
    '우울증 외래': '우울증',
  };

  return diseaseNames[disease] || disease;
}

// 의사 추천 요청 감지
export function isDoctorRecommendationRequest(userMessage: string): boolean {
  const lowerMessage = userMessage.toLowerCase();
  
  // 의사 관련 키워드가 있는지 확인
  const hasDoctorKeyword = DOCTOR_KEYWORDS.some((keyword) =>
    lowerMessage.includes(keyword)
  );

  // 질환명이 포함되어 있는지 확인
  const hasDisease = detectDisease(userMessage) !== null;

  // "병원"이라는 단어가 없고, 의사 키워드와 질환명이 있으면 의사 추천
  const hasNoHospital = !lowerMessage.includes('병원');

  return hasDoctorKeyword && hasDisease && hasNoHospital;
}

// 질환별 의사 추천 (tags 기반)
export function getRecommendedDoctorsByDisease(disease: string, doctors: any[]): any[] {
  // 질환명을 태그로 가진 의사 필터링
  const filtered = doctors.filter((doctor) => {
    if (!doctor.tags) return false;
    // 태그에 질환명이 포함되어 있는지 확인
    return doctor.tags.some((tag: string) => 
      tag.includes(disease) || disease.includes(tag)
    );
  });

  // 평점 순으로 정렬
  return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5);
}

// AI 답변 생성 (의사 추천)
export function generateDoctorRecommendationMessage(disease: string, doctors: any[]): string {
  if (doctors.length === 0) {
    return `죄송합니다. ${disease} 전문 의료진을 찾지 못했습니다. 다른 질환명으로 다시 검색해주세요.`;
  }

  let message = `${disease} 전문 명의를 추천해드립니다.\n\n`;
  message += `총 ${doctors.length}명의 전문의를 찾았습니다. `;
  message += `각 의사의 프로필을 클릭하시면 상세 정보와 환자 후기를 확인하실 수 있습니다.\n\n`;
  message += `💡 Tip: 의사 프로필을 저장하시면 나중에 쉽게 다시 찾을 수 있습니다.`;

  return message;
}