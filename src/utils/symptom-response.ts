// 증세 관련 질문 감지 및 AI 응답 유틸리티

import type { Doctor } from '@/types/chat.types';

// 증세 키워드 매핑
const SYMPTOM_KEYWORDS: { [key: string]: string[] } = {
  두통: ['두통', '머리 아', '머리가 아', '머리 통증', '편두통', '두통이'],
  복통: ['복통', '배 아', '배가 아', '배 통증', '배아', '복부 통증', '속이 아'],
  가슴통증: ['가슴 아', '가슴이 아', '가슴 통증', '흉통', '가슴 답답', '가슴이 답답'],
  기침: ['기침', '기침이', '기침나', '기침 나', '헛기침', '마른기침'],
  발열: ['열', '열나', '열이', '발열', '고열', '미열', '체온'],
  어지러움: ['어지러', '어지럼', '현기증', '빙빙', '핑그르', '멀미'],
  소화불량: ['소화', '소화불량', '체한', '더부룩', '속쓰림', '속 쓰림'],
  요통: ['허리 아', '허리가 아', '허리 통증', '요통', '등 아', '등이 아'],
  목통증: ['목 아', '목이 아', '목 통증', '목이 뻐근', '목 결림'],
  관절통: ['관절', '무릎 아', '무릎이 아', '팔꿈치 아', '손목 아'],
  피로: ['피로', '피곤', '무기력', '기력', '체력', '지침'],
  불면증: ['잠', '수면', '불면', '못 자', '못자', '잠이 안'],
  호흡곤란: ['숨', '호흡', '숨쉬기', '숨 쉬기', '답답', '숨차'],
};

// 증세별 상세 응답 데이터
interface SymptomResponse {
  symptom: string; // 증세명
  possibleDiseases: string[]; // 가능한 질환들
  description: string; // 증세 설명
  urgency: 'high' | 'medium' | 'low'; // 긴급도
  followUpQuestions: string[]; // 추가 질문
  recommendedSpecialties: string[]; // 추천 진료과
  selfCareAdvice?: string; // 자가 관리 조언 (긴급도 낮을 때)
}

const SYMPTOM_RESPONSES: { [key: string]: SymptomResponse } = {
  두통: {
    symptom: '두통',
    possibleDiseases: ['편두통', '긴장성 두통', '군발성 두통', '뇌종양', '뇌출혈'],
    description: '두통은 매우 흔한 증상이지만, 원인이 다양할 수 있습니다.',
    urgency: 'medium',
    followUpQuestions: [
      '두통이 언제부터 시작되었나요?',
      '통증의 강도는 어느 정도인가요? (1-10)',
      '한쪽 머리만 아픈가요, 양쪽 모두 아픈가요?',
      '구토, 시야 장애, 어지러움 등의 동반 증상이 있나요?',
    ],
    recommendedSpecialties: ['신경과', '신경외과', '내과'],
    selfCareAdvice: '충분한 수면과 휴식을 취하고, 카페인 섭취를 줄여보세요. 증상이 지속되거나 악화되면 전문의 상담이 필요합니다.',
  },
  복통: {
    symptom: '복통',
    possibleDiseases: ['급성 위염', '위궤양', '담석증', '맹장염', '과민성 대장증후군'],
    description: '복통의 위치와 양상에 따라 원인 질환이 달라질 수 있습니다.',
    urgency: 'medium',
    followUpQuestions: [
      '복통이 어느 부위에서 나타나나요? (명치, 배꼽 주변, 오른쪽 아래 등)',
      '통증이 언제부터 시작되었나요?',
      '통증의 양상은 어떤가요? (쥐어짜는 듯, 칼로 찌르는 듯)',
      '구토, 설사, 발열 등의 동반 증상이 있나요?',
    ],
    recommendedSpecialties: ['소화기내과', '외과', '내과'],
  },
  가슴통증: {
    symptom: '가슴통증',
    possibleDiseases: ['협심증', '심근경색', '역류성 식도염', '늑간신경통', '공황장애'],
    description: '가슴 통증은 심장 질환의 신호일 수 있어 주의가 필요합니다.',
    urgency: 'high',
    followUpQuestions: [
      '통증이 얼마나 지속되나요?',
      '통증이 어깨나 팔로 퍼지나요?',
      '식은땀, 호흡곤란, 구토 등의 증상이 동반되나요?',
      '운동이나 스트레스 상황에서 통증이 심해지나요?',
    ],
    recommendedSpecialties: ['순환기내과', '심장내과', '응급의학과'],
  },
  기침: {
    symptom: '기침',
    possibleDiseases: ['감기', '기관지염', '폐렴', '천식', '역류성 식도염'],
    description: '기침은 호흡기 질환의 대표적인 증상입니다.',
    urgency: 'low',
    followUpQuestions: [
      '기침이 얼마나 지속되었나요?',
      '가래가 나오나요? 가래 색깔은 어떤가요?',
      '발열이나 호흡곤란이 동반되나요?',
      '밤에 기침이 더 심해지나요?',
    ],
    recommendedSpecialties: ['호흡기내과', '이비인후과', '내과'],
    selfCareAdvice: '충분한 수분 섭취와 가습기 사용이 도움이 됩니다. 2주 이상 기침이 지속되면 병원 방문을 권장합니다.',
  },
  발열: {
    symptom: '발열',
    possibleDiseases: ['감기', '독감', '폐렴', '요로감염', '코로나19'],
    description: '발열은 몸의 면역 반응으로, 감염이나 염증을 의미합니다.',
    urgency: 'medium',
    followUpQuestions: [
      '체온이 몇 도인가요?',
      '열이 며칠째 지속되고 있나요?',
      '오한, 근육통, 두통 등의 증상이 있나요?',
      '기침, 콧물, 목 통증이 동반되나요?',
    ],
    recommendedSpecialties: ['내과', '가정의학과', '감염내과'],
  },
  어지러움: {
    symptom: '어지러움',
    possibleDiseases: ['이석증', '메니에르병', '빈혈', '기립성 저혈압', '뇌졸중'],
    description: '어지러움의 종류에 따라 원인이 다를 수 있습니다.',
    urgency: 'medium',
    followUpQuestions: [
      '빙글빙글 도는 느낌인가요, 아니면 핑그르르한 느낌인가요?',
      '특정 자세나 움직임에서 증상이 심해지나요?',
      '귀 울림, 청력 저하가 동반되나요?',
      '두통, 구토, 보행 장애가 있나요?',
    ],
    recommendedSpecialties: ['신경과', '이비인후과', '내과'],
  },
  소화불량: {
    symptom: '소화불량',
    possibleDiseases: ['기능성 소화불량', '위염', '위궤양', '역류성 식도염', '담석증'],
    description: '소화불량은 위장관의 기능 이상이나 질환으로 발생합니다.',
    urgency: 'low',
    followUpQuestions: [
      '언제부터 소화가 안 되시나요?',
      '어떤 증상이 주로 나타나나요? (속쓰림, 더부룩함, 구토)',
      '식사 후 증상이 악화되나요?',
      '스트레스를 많이 받고 계신가요?',
    ],
    recommendedSpecialties: ['소화기내과', '내과'],
    selfCareAdvice: '규칙적인 식사와 과식을 피하고, 기름진 음식과 카페인을 줄여보세요.',
  },
  요통: {
    symptom: '요통',
    possibleDiseases: ['근육통', '추간판 탈출증 (디스크)', '척추관 협착증', '척추 측만증', '신장 결석'],
    description: '요통은 근골격계 문제나 내부 장기 질환으로 발생할 수 있습니다.',
    urgency: 'medium',
    followUpQuestions: [
      '통증이 언제부터 시작되었나요?',
      '특정 자세나 동작에서 통증이 심해지나요?',
      '다리로 저리거나 당기는 증상이 있나요?',
      '배뇨 장애나 소변 색깔 변화가 있나요?',
    ],
    recommendedSpecialties: ['정형외과', '신경외과', '재활의학과'],
  },
  목통증: {
    symptom: '목통증',
    possibleDiseases: ['경추 디스크', '거북목 증후군', '근막통증 증후군', '경추 염좌', '목 근육통'],
    description: '목 통증은 잘못된 자세나 경추 질환으로 발생합니다.',
    urgency: 'low',
    followUpQuestions: [
      '목 통증이 언제부터 시작되었나요?',
      '팔이나 손으로 저린 증상이 퍼지나요?',
      '장시간 컴퓨터나 스마트폰을 사용하시나요?',
      '두통이나 어깨 결림이 동반되나요?',
    ],
    recommendedSpecialties: ['정형외과', '신경외과', '재활의학과'],
    selfCareAdvice: '올바른 자세 유지와 스트레칭이 중요합니다. 온찜질도 도움이 됩니다.',
  },
  관절통: {
    symptom: '관절통',
    possibleDiseases: ['퇴행성 관절염', '류마티스 관절염', '통풍', '활막염', '반월상 연골 손상'],
    description: '관절 통증은 나이, 활동량, 자세 등 여러 요인으로 발생합니다.',
    urgency: 'medium',
    followUpQuestions: [
      '어느 관절이 아프신가요?',
      '통증과 함께 붓기나 열감이 있나요?',
      '아침에 관절이 뻣뻣한 증상이 있나요?',
      '특정 활동 후 통증이 심해지나요?',
    ],
    recommendedSpecialties: ['정형외과', '류마티스내과', '재활의학과'],
  },
  피로: {
    symptom: '피로',
    possibleDiseases: ['만성 피로 증후군', '빈혈', '갑상선 기능 저하증', '우울증', '수면 무호흡증'],
    description: '지속적인 피로는 다양한 신체적, 정신적 질환의 신호일 수 있습니다.',
    urgency: 'low',
    followUpQuestions: [
      '피로가 얼마나 지속되고 있나요?',
      '충분한 수면을 취해도 피로가 풀리지 않나요?',
      '집중력 저하나 기억력 감퇴가 있나요?',
      '체중 변화, 식욕 변화가 있나요?',
    ],
    recommendedSpecialties: ['내과', '가정의학과', '정신건강의학과'],
    selfCareAdvice: '규칙적인 생활 패턴, 균형 잡힌 식사, 적절한 운동이 도움이 됩니다.',
  },
  불면증: {
    symptom: '불면증',
    possibleDiseases: ['수면 장애', '우울증', '불안 장애', '수면 무호흡증', '하지 불안 증후군'],
    description: '불면증은 삶의 질을 크게 떨어뜨리며, 다양한 원인이 있습니다.',
    urgency: 'low',
    followUpQuestions: [
      '잠들기 어려운가요, 아니면 자주 깨나요?',
      '불면증이 얼마나 지속되었나요?',
      '낮에 졸리거나 집중력이 떨어지나요?',
      '스트레스나 걱정이 많으신가요?',
    ],
    recommendedSpecialties: ['정신건강의학과', '신경과', '수면클리닉'],
    selfCareAdvice: '규칙적인 수면 시간, 카페인 제한, 침실 환경 개선이 도움됩니다.',
  },
  호흡곤란: {
    symptom: '호흡곤란',
    possibleDiseases: ['천식', '만성 폐쇄성 폐질환', '심부전', '폐렴', '공황 장애'],
    description: '호흡곤란은 심각한 호흡기나 심장 질환의 신호일 수 있습니다.',
    urgency: 'high',
    followUpQuestions: [
      '언제 숨이 차나요? (안정 시, 활동 시)',
      '기침이나 천명음(쌕쌕거림)이 동반되나요?',
      '가슴 통증이나 어지러움이 있나요?',
      '흡연을 하시거나 과거에 하셨나요?',
    ],
    recommendedSpecialties: ['호흡기내과', '순환기내과', '응급의학과'],
  },
};

/**
 * 사용자 메시지에서 증세 키워드 감지
 */
export function detectSymptom(userMessage: string): string | null {
  const lowerMessage = userMessage.toLowerCase();

  for (const [symptom, keywords] of Object.entries(SYMPTOM_KEYWORDS)) {
    if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return symptom;
    }
  }

  return null;
}

/**
 * 증세 관련 질문인지 확인
 */
export function isSymptomInquiry(userMessage: string): boolean {
  return detectSymptom(userMessage) !== null;
}

/**
 * 증세별 AI 응답 메시지 생성
 */
export function generateSymptomResponseMessage(symptom: string): string {
  const response = SYMPTOM_RESPONSES[symptom];
  
  if (!response) {
    return '증상에 대해 더 자세히 말씀해주시겠어요? 구체적으로 설명해주시면 더 정확한 도움을 드릴 수 있습니다.';
  }

  let message = `${response.description}\n\n`;

  // 긴급도가 높으면 경고 메시지
  if (response.urgency === 'high') {
    message += `⚠️ **주의**: ${symptom}은(는) 즉각적인 의료 조치가 필요할 수 있는 증상입니다. 증상이 심하거나 갑자기 발생했다면 즉시 응급실을 방문하시기 바랍니다.\n\n`;
  }

  // 가능한 질환들
  message += `**가능성 있는 질환:**\n`;
  response.possibleDiseases.forEach((disease, index) => {
    message += `${index + 1}. ${disease}\n`;
  });
  message += `\n`;

  // 추가 질문이 필요한 경우
  if (response.followUpQuestions.length > 0) {
    message += `**더 정확한 진단을 위해 몇 가지 여쭤볼게요:**\n`;
    response.followUpQuestions.forEach((question, index) => {
      message += `• ${question}\n`;
    });
    message += `\n`;
  }

  // 추천 진료과
  message += `**추천 진료과:** ${response.recommendedSpecialties.join(', ')}\n\n`;

  // 자가 관리 조언 (긴급도가 낮을 때만)
  if (response.selfCareAdvice && response.urgency === 'low') {
    message += `💡 **자가 관리 팁:** ${response.selfCareAdvice}\n\n`;
  }

  message += `관련 전문의를 찾아보시겠어요? "명의 추천", "병원 찾아줘"라고 말씀해주시면 도움드리겠습니다.`;

  return message;
}

/**
 * 증세에 맞는 전문의 추천
 */
export function getRecommendedDoctorsBySymptom(symptom: string, doctors: Doctor[]): Doctor[] {
  const response = SYMPTOM_RESPONSES[symptom];
  
  if (!response) return [];

  // 추천 진료과에 해당하는 의사 필터링
  const filtered = doctors.filter((doctor) => {
    return response.recommendedSpecialties.some((specialty) =>
      doctor.specialty?.includes(specialty)
    );
  });

  // 평점 순으로 정렬하고 상위 5명 반환
  return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5);
}

/**
 * 증세별 긴급도 반환
 */
export function getSymptomUrgency(symptom: string): 'high' | 'medium' | 'low' | null {
  return SYMPTOM_RESPONSES[symptom]?.urgency || null;
}
