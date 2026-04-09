// 질문 의도 분석 유틸리티

/**
 * 사용자 질문의 의도를 분석합니다
 * @param text 사용자 질문
 * @returns 질문 의도: 'symptom' | 'disease-info' | 'doctor-recommendation'
 */
export function analyzeQuestionIntent(text: string): 'symptom' | 'disease-info' | 'doctor-recommendation' {
  const lowerText = text.toLowerCase().trim();
  
  // 1. 의사/명의 추천 질문 감지
  const doctorKeywords = ['의사', '명의', '전문의', '추천', '병원', '어디', '좋은'];
  const hasDoctorKeyword = doctorKeywords.some(keyword => lowerText.includes(keyword));
  
  // 질환명 + 의사 추천 키워드 조합
  if (hasDoctorKeyword) {
    return 'doctor-recommendation';
  }
  
  // 2. 증상 질문 감지
  const symptomKeywords = [
    '아파요', '아프다', '아픈', '통증', '증상', '느낌',
    '불편', '괴롭', '힘들', '걱정', '문제',
    '나타나', '발생', '생겼', '있어요'
  ];
  const hasSymptomKeyword = symptomKeywords.some(keyword => lowerText.includes(keyword));
  
  if (hasSymptomKeyword) {
    return 'symptom';
  }
  
  // 3. 질환 정보 질문 감지
  const infoKeywords = ['대해', '이란', '무엇', '뭔가요', '알려줘', '설명', '정보', '원인', '치료'];
  const hasInfoKeyword = infoKeywords.some(keyword => lowerText.includes(keyword));
  
  if (hasInfoKeyword) {
    return 'disease-info';
  }
  
  // 4. 기본값: 질환명만 있는 경우 → 정보 질문으로 간주
  return 'disease-info';
}
