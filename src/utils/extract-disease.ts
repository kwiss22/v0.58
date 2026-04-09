// 질환명 또는 주요 키워드 추출 유틸리티

/**
 * 입력된 텍스트에서 주요 질환명이나 증상 키워드를 추출
 */
export function extractDiseaseOrSymptom(text: string): string {
  if (!text) return '상담';
  
  // 일반적인 질환명 키워드
  const diseaseKeywords = [
    '암', '폐암', '위암', '대장암', '간암', '췌장암', '유방암', '갑상선암',
    '심근경색', '협심증', '부정맥', '심부전', '심장',
    '뇌졸중', '뇌경색', '뇌출혈',
    '디스크', '허리', '목', '어깨', '무릎', '관절염',
    '당뇨', '당뇨병', '고혈압', '고지혈증',
    '감기', '독감', '폐렴', '천식',
    '위염', '역류성식도염', '장염',
    '두통', '편두통', '어지럼증',
    '피부염', '아토피', '여드름', '건선',
    '우울증', '불안장애', '공황장애',
    '비염', '축농증', '중이염',
  ];
  
  // 증상 키워드
  const symptomKeywords = [
    '아프', '통증', '열', '기침', '가래', '콧물',
    '설사', '변비', '복통', '속쓰림', '구토',
    '발열', '오한', '피로', '무기력',
    '가려움', '발진', '부종', '멍',
    '저림', '마비', '떨림',
  ];
  
  const lowerText = text.toLowerCase();
  
  // 질환명 먼저 찾기
  for (const keyword of diseaseKeywords) {
    if (lowerText.includes(keyword.toLowerCase())) {
      // 해당 키워드 포함 짧은 문구 추출
      return extractContextAroundKeyword(text, keyword);
    }
  }
  
  // 증상 키워드 찾기
  for (const keyword of symptomKeywords) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return extractContextAroundKeyword(text, keyword);
    }
  }
  
  // 키워드를 못 찾으면 원문의 앞부분 반환
  const cleanText = text.trim();
  if (cleanText.length > 30) {
    return cleanText.slice(0, 27) + '...';
  }
  
  return cleanText;
}

/**
 * 키워드 주변의 문맥 추출
 */
function extractContextAroundKeyword(text: string, keyword: string): string {
  const index = text.toLowerCase().indexOf(keyword.toLowerCase());
  if (index === -1) return text.slice(0, 30);
  
  // 키워드 앞뒤로 적절한 범위 추출
  const start = Math.max(0, index - 10);
  const end = Math.min(text.length, index + keyword.length + 20);
  
  let excerpt = text.slice(start, end).trim();
  
  // 앞뒤로 ... 추가
  if (start > 0) excerpt = '...' + excerpt;
  if (end < text.length) excerpt = excerpt + '...';
  
  // 너무 길면 자르기
  if (excerpt.length > 40) {
    excerpt = excerpt.slice(0, 37) + '...';
  }
  
  return excerpt;
}

/**
 * 질환이나 증상을 간단하게 요약
 */
export function summarizeQuery(text: string): string {
  const extracted = extractDiseaseOrSymptom(text);
  
  // 불필요한 접두사 제거
  const prefixesToRemove = [
    '저는 ', '제가 ', '나는 ', '내가 ',
    '요즘 ', '최근 ', '며칠 전부터 ',
    '...', '..', '. ',
  ];
  
  let summary = extracted;
  for (const prefix of prefixesToRemove) {
    if (summary.startsWith(prefix)) {
      summary = summary.slice(prefix.length);
    }
  }
  
  return summary.trim();
}
