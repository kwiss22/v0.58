// 증상 데이터 및 질문

import { SymptomData } from '@/types/chat.types';

export const SYMPTOMS: SymptomData[] = [
  {
    id: 'abdominal-pain',
    name: '복통',
    icon: '🤢',
    questions: [
      '복통이 언제부터 시작되었나요?',
      '통증의 정도는 어느 정도인가요? (1-10)',
      '복통과 함께 다른 증상이 있나요?',
      '최근 식습관에 변화가 있었나요?',
    ],
  },
  {
    id: 'headache',
    name: '두통',
    icon: '😫',
    questions: [
      '두통이 언제부터 시작되었나요?',
      '두통의 양상은 어떤가요? (지끈거림, 욱신거림 등)',
      '두통과 함께 다른 증상이 있나요?',
      '평소에도 두통이 자주 있으신가요?',
    ],
  },
  {
    id: 'fever',
    name: '발열',
    icon: '🌡️',
    questions: [
      '열이 언제부터 시작되었나요?',
      '측정한 체온은 몇 도인가요?',
      '열과 함께 다른 증상이 있나요?',
      '최근 감기 증상이 있었나요?',
    ],
  },
  {
    id: 'cough',
    name: '기침',
    icon: '😷',
    questions: [
      '기침이 언제부터 시작되었나요?',
      '가래가 동반되나요?',
      '기침이 어떤 때 심해지나요?',
      '호흡곤란이나 가슴 통증이 있나요?',
    ],
  },
  {
    id: 'chest-pain',
    name: '가슴통증',
    icon: '💔',
    questions: [
      '가슴 통증이 언제부터 시작되었나요?',
      '통증의 양상은 어떤가요? (찌르는 듯, 압박하는 듯)',
      '통증이 다른 부위로 퍼지나요?',
      '숨을 쉴 때 통증이 심해지나요?',
    ],
  },
  {
    id: 'dizziness',
    name: '어지러움',
    icon: '😵',
    questions: [
      '어지러움이 언제부터 시작되었나요?',
      '어떤 종류의 어지러움인가요? (빙글빙글, 핑그르르)',
      '어지러움과 함께 다른 증상이 있나요?',
      '특정 자세에서 증상이 심해지나요?',
    ],
  },
  {
    id: 'indigestion',
    name: '소화불량',
    icon: '😖',
    questions: [
      '소화불량이 언제부터 시작되었나요?',
      '어떤 증상이 있나요? (속쓰림, 더부룩함 등)',
      '식사와 관련이 있나요?',
      '스트레스를 많이 받고 있나요?',
    ],
  },
  {
    id: 'back-pain',
    name: '요통',
    icon: '🦴',
    questions: [
      '요통이 언제부터 시작되었나요?',
      '통증의 정도는 어느 정도인가요?',
      '특정 동작에서 통증이 심해지나요?',
      '다리로 저리거나 당기는 증상이 있나요?',
    ],
  },
];

export const getSymptomById = (id: string): SymptomData | undefined => {
  return SYMPTOMS.find((symptom) => symptom.id === id);
};

export const getSymptomQuestions = (symptomId: string): string[] => {
  const symptom = getSymptomById(symptomId);
  return symptom?.questions || [];
};
