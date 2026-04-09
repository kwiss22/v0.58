// Chat 관련 타입 정의

import type { Hospital } from '@/constants/hospital-data';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  symptom?: string;
  questionIndex?: number;
  isFollowUp?: boolean;
  isHospitalRecommendation?: boolean;
  hospitalInfo?: HospitalInfo;
  recommendedHospitals?: Hospital[]; // 병원 추천 카드용
  recommendedDoctors?: Doctor[]; // 의사 추천 카드용
  questionIntent?: 'symptom' | 'disease-info' | 'doctor-recommendation'; // 질문 의도
}

export interface HospitalInfo {
  description?: string;
  doctors?: Doctor[];
  mapData?: MapData;
}

export interface Doctor {
  id: string;
  name: string;
  hospital: string;
  specialty: string;
  image: string;
  experience?: string;
  education?: string;
  rating?: number;
  reviewCount?: number;
  distance?: string;
  verified?: boolean;
  tags?: string[];
  diseaseArea?: string;   // 중분류 (대장암, 척추, 심장 등)
  mainCategory?: string;  // 대분류 (암, 척추/관절, 심장/뇌혈관)
}

export interface MapData {
  coordinates: [number, number]; // [위도, 경도]
  hospitalName: string;
  address?: string;
}

export interface ConversationHistory {
  id: string;
  title: string;
  mode: 'diagnosis' | 'symptom';
  lastMessageTime: Date;
  messages: Message[];
  mentionedDoctorIds?: string[]; // 대화에서 언급된 의사 ID 목록
}

export type ChatMode = 'diagnosis' | 'symptom';

export interface SymptomData {
  id: string;
  name: string;
  icon: string;
  questions: string[];
}