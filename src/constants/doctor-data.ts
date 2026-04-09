// 의료진 데이터

import { Doctor } from '@/types/chat.types';

const HOSPITALS = [
  '서울아산병원',
  '삼성서울병원',
  '세브란스병원',
  '서울대학교병원',
  '고려대학교병원',
  '가톨릭대학교병원',
  '아주대학교병원',
  '동탄권역의료원',
  '강남세브란스병원',
  '분당서울대병원',
  '서울성모병원',
  '한양대학교병원',
  '경희대학교병원',
];

const UNIVERSITIES = [
  '서울대 의대 졸업',
  '연세대 의대 졸업',
  '성균관대 의대 졸업',
  '고려대 의대 졸업',
  '가톨릭대 의대 졸업',
  '울산대 의대 졸업',
  '아주대 의대 졸업',
  '한양대 의대 졸업',
  '경희대 의대 졸업',
];

const NAMES = [
  '김민수', '이서연', '박지훈', '최유진', '정민호', '강지은', '임준영', '한수빈',
  '오현우', '윤채원', '장서현', '신동혁', '배예은', '조민재', '권하늘', '홍서윤',
  '송민지', '류태양', '노지원', '안준서', '문예린', '황도현', '서아린', '구민찬',
  '남지후', '탁수아', '변준혁', '진서우', '성채은', '표민석', '도예진', '석준호',
  '모지안', '빈서영', '방태민', '우예원', '제민우', '경서현', '추지훈', '형채윤',
  '감민준', '선유나', '공태우', '염수빈', '국지환', '태서연', '채현준', '엄예나',
  '곽도윤', '양지우', '함서준', '편채린', '여민서', '설태희', '도서진', '변지안',
  '김태연', '이현우', '박수진', '최민재', '정서윤', '강준혁', '임예린', '한지호',
  '오서현', '윤민우', '장예진', '신준영', '배서연', '조현서', '권민석', '홍예원',
  '송지훈', '류서아', '노현준', '안지윤', '문태민', '황서연', '서민준', '구예은',
  '남현우', '탁지원', '변서진', '진민재', '성예나', '표준호', '도서현', '석지안',
  '모태우', '빈예린', '방민서', '우지훈', '제서연', '경준영', '추예진', '형민우',
  '감서윤', '선태희', '공민준', '염예원', '국서진', '태지호', '채민우', '엄서현',
  '곽예은', '양지훈', '함서연', '편민재', '여태민', '설지원', '도예나', '변준호',
  '김서진', '이예원', '박민우', '최지훈', '정서연', '강태희', '임민준', '한예린',
  '오지호', '윤서현', '장민재', '신예나', '배준영', '조서윤', '권태민', '홍지원',
  '송예진', '류민우', '노서연', '안준호', '문지안', '황예은', '서태우', '구서현',
  '남민준', '탁예린', '변지훈', '진서연', '성민재', '표예나', '도준영', '석서윤',
  '모지원', '빈태희', '방민우', '우서진', '제예원', '경지호', '추민준', '형서현',
  '감예은', '선지훈', '공서연', '염민재', '국태민', '태예린', '채준호', '엄서윤',
  '곽지원', '양민우', '함예나', '편서진', '여준영', '설민재', '도서연', '변태희',
  '김지원', '이민우', '박서연', '최준호', '정예나', '강민재', '임서윤', '한태희',
  '오민준', '윤예린', '장지훈', '신서현', '배민우', '조예은', '권준영', '홍서진',
  '송민재', '류예나', '노지호', '안서윤', '문민준', '황예린', '서지훈', '구서연',
  '남태희', '탁민우', '변예원', '진지호', '성서현', '표민재', '도예은', '석준영',
];

const DISTANCES = ['0.8km', '1.2km', '1.5km', '1.8km', '2.1km', '2.3km', '2.5km', '2.8km', '3.1km', '3.5km', '3.8km', '4.1km', '4.5km', '4.7km', '5.2km', '5.6km', '6.0km', '6.3km'];

const SPECIALTIES = [
  // 폐암 (7명)
  { name: '호흡기내과', mainCategory: '암', diseaseArea: '폐암', tags: ['비소세포폐암', '로봇폐절제술', '진행성폐암', '폐암면역치료', '소세포폐암'] },
  { name: '흉부외과', mainCategory: '암', diseaseArea: '폐암', tags: ['폐암면역치료', '소세포폐암', '진행성폐암', '표적치료'] },
  { name: '호흡기내과', mainCategory: '암', diseaseArea: '폐암', tags: ['비소세포폐암', '표적치료', '폐암면역치료'] },
  { name: '흉부외과', mainCategory: '암', diseaseArea: '폐암', tags: ['로봇폐절제술', '흉강경폐절제', '폐암수술'] },
  { name: '종양내과', mainCategory: '암', diseaseArea: '폐암', tags: ['폐암항암치료', '표적치료', '폐암면역치료'] },
  { name: '호흡기내과', mainCategory: '암', diseaseArea: '폐암', tags: ['진행성폐암', '소세포폐암', '폐암면역치료'] },
  { name: '흉부외과', mainCategory: '암', diseaseArea: '폐암', tags: ['비소세포폐암', '로봇폐절제술', '폐암수술'] },

  // 위암 (7명)
  { name: '소화기내과', mainCategory: '암', diseaseArea: '위암', tags: ['조기위암', '위절제술', '위암항암치료', '내시경절제술', '위염', '위궤양', '역류성식도염'] },
  { name: '위장관외과', mainCategory: '암', diseaseArea: '위암', tags: ['위암복강경', '진행성위암', '위절제술', '로봇수술', '위염', '위궤양'] },
  { name: '소화기내과', mainCategory: '암', diseaseArea: '위암', tags: ['조기위암', '내시경절제술', '위염', '위궤양'] },
  { name: '위장관외과', mainCategory: '암', diseaseArea: '위암', tags: ['위암로봇수술', '진행성위암', '위절제술'] },
  { name: '종양내과', mainCategory: '암', diseaseArea: '위암', tags: ['위암항암치료', '표적치료', '진행성위암'] },
  { name: '소화기내과', mainCategory: '암', diseaseArea: '위암', tags: ['위암항암치료', '조기위암', '위염', '위궤양'] },
  { name: '위장관외과', mainCategory: '암', diseaseArea: '위암', tags: ['위암복강경', '로봇수술', '위절제술'] },

  // 대장암 (7명)
  { name: '대장항문외과', mainCategory: '암', diseaseArea: '대장암', tags: ['대장암내시경', '직장암', '대장암항암', '조기대장암'] },
  { name: '대장항문외과', mainCategory: '암', diseaseArea: '대장암', tags: ['대장암복강경', '대장암로봇수술', '직장암', '대장암항암'] },
  { name: '소화기내과', mainCategory: '암', diseaseArea: '대장암', tags: ['대장암내시경', '조기대장암', '내시경절제술'] },
  { name: '대장항문외과', mainCategory: '암', diseaseArea: '대장암', tags: ['직장암', '대장암로봇수술', '대장암복강경'] },
  { name: '종양내과', mainCategory: '암', diseaseArea: '대장암', tags: ['대장암항암', '표적치료', '전이성대장암'] },
  { name: '대장항문외과', mainCategory: '암', diseaseArea: '대장암', tags: ['대장암내시경', '대장암복강경', '조기대장암'] },
  { name: '소화기내과', mainCategory: '암', diseaseArea: '대장암', tags: ['대장암항암', '조기대장암', '대장암내시경'] },

  // 갑상선암 (7명)
  { name: '내분비대사내과', mainCategory: '암', diseaseArea: '갑상선암', tags: ['갑상선절제술', '미세갑상선암', '갑상선암재발', '갑상선암방사선'] },
  { name: '내분비외과', mainCategory: '암', diseaseArea: '갑상선암', tags: ['갑상선절제술', '로봇갑상선수술', '미세갑상선암'] },
  { name: '두경부외과', mainCategory: '암', diseaseArea: '갑상선암', tags: ['갑상선절제술', '림프절청소술', '갑상선암재발'] },
  { name: '내분비대사내과', mainCategory: '암', diseaseArea: '갑상선암', tags: ['미세갑상선암', '갑상선암재발', '갑상선기능저하'] },
  { name: '핵의학과', mainCategory: '암', diseaseArea: '갑상선암', tags: ['갑상선암방사선', '방사성요오드치료', 'PET-CT'] },
  { name: '내분비외과', mainCategory: '암', diseaseArea: '갑상선암', tags: ['갑상선절제술', '갑상선암재발', '미세갑상선암'] },
  { name: '내분비대사내과', mainCategory: '암', diseaseArea: '갑상선암', tags: ['갑상선암방사선', '미세갑상선암', '갑상선기능저하'] },

  // 유방암 (7명)
  { name: '유방외과', mainCategory: '암', diseaseArea: '유방암', tags: ['유방보존술', '유방재건', '유방암항암', '전이성유방암', '유방암방사선'] },
  { name: '유방외과', mainCategory: '암', diseaseArea: '유방암', tags: ['유방보존술', '전이성유방암', '유방암방사선'] },
  { name: '종양내과', mainCategory: '암', diseaseArea: '유방암', tags: ['유방암항암', '표적치료', '전이성유방암'] },
  { name: '유방외과', mainCategory: '암', diseaseArea: '유방암', tags: ['유방재건', '유방보존술', '유방암수술'] },
  { name: '유방외과', mainCategory: '암', diseaseArea: '유방암', tags: ['유방암항암', '유방보존술', '유방암방사선'] },
  { name: '종양내과', mainCategory: '암', diseaseArea: '유방암', tags: ['전이성유방암', '표적치료', '유방암항암'] },
  { name: '유방외과', mainCategory: '암', diseaseArea: '유방암', tags: ['유방재건', '유방보존술', '유방암수술'] },

  // 간암 (7명)
  { name: '간담췌외과', mainCategory: '암', diseaseArea: '간암', tags: ['간암절제', '간이식', '간암색전술', '간암표적치료', '간경변', '췌장염', '담석증'] },
  { name: '소화기내과', mainCategory: '암', diseaseArea: '간암', tags: ['간암색전술', '간암표적치료', '간암고주파', '간경변', '담석증'] },
  { name: '혈액종양내과', mainCategory: '암', diseaseArea: '간암', tags: ['간암표적치료', '간암면역치료', '간암항암'] },
  { name: '간담췌외과', mainCategory: '암', diseaseArea: '간암', tags: ['간이식', '간암절제', '간경변', '간암색전술'] },
  { name: '소화기내과', mainCategory: '암', diseaseArea: '간암', tags: ['간암고주파', '간암색전술', '간경변'] },
  { name: '혈액종양내과', mainCategory: '암', diseaseArea: '간암', tags: ['간암항암', '간암면역치료', '간암표적치료'] },
  { name: '간담췌외과', mainCategory: '암', diseaseArea: '간암', tags: ['간암절제', '간이식', '간경변'] },

  // 전립선암 (7명)
  { name: '비뇨의학과', mainCategory: '암', diseaseArea: '전립선암', tags: ['전립선암수술', '로봇전립선절제', '전립선암방사선', '전립선암호르몬'] },
  { name: '비뇨의학과', mainCategory: '암', diseaseArea: '전립선암', tags: ['로봇전립선절제', '전립선암수술', '전립선암재발'] },
  { name: '종양내과', mainCategory: '암', diseaseArea: '전립선암', tags: ['전립선암호르몬', '전립선암항암', '전이성전립선암'] },
  { name: '비뇨의학과', mainCategory: '암', diseaseArea: '전립선암', tags: ['전립선암방사선', '로봇전립선절제', '전립선암수술'] },
  { name: '비뇨의학과', mainCategory: '암', diseaseArea: '전립선암', tags: ['전립선암수술', '전립선암재발', '로봇전립선절제'] },
  { name: '종양내과', mainCategory: '암', diseaseArea: '전립선암', tags: ['전립선암항암', '전이성전립선암', '전립선암호르몬'] },
  { name: '비뇨의학과', mainCategory: '암', diseaseArea: '전립선암', tags: ['로봇전립선절제', '전립선암방사선', '전립선암수술'] },

  // 췌장암 (7명)
  { name: '간담췌외과', mainCategory: '암', diseaseArea: '췌장암', tags: ['췌장암수술', '휘플수술', '췌장암절제', '췌장암항암'] },
  { name: '간담췌외과', mainCategory: '암', diseaseArea: '췌장암', tags: ['휘플수술', '췌장암절제', '로봇췌장수술'] },
  { name: '종양내과', mainCategory: '암', diseaseArea: '췌장암', tags: ['췌장암항암', '표적치료', '전이성췌장암'] },
  { name: '간담췌외과', mainCategory: '암', diseaseArea: '췌장암', tags: ['췌장암수술', '휘플수술', '췌장암절제'] },
  { name: '소화기내과', mainCategory: '암', diseaseArea: '췌장암', tags: ['췌장암진단', '췌장암항암', '췌장염'] },
  { name: '종양내과', mainCategory: '암', diseaseArea: '췌장암', tags: ['전이성췌장암', '췌장암항암', '표적치료'] },
  { name: '간담췌외과', mainCategory: '암', diseaseArea: '췌장암', tags: ['로봇췌장수술', '췌장암절제', '휘플수술'] },

  // 자궁암 (7명)
  { name: '산부인과', mainCategory: '암', diseaseArea: '자궁암', tags: ['자궁암수술', '자궁경부암', '자궁내막암', '로봇자궁절제'] },
  { name: '산부인과', mainCategory: '암', diseaseArea: '자궁암', tags: ['자궁경부암', '자궁암항암', '자궁내막암'] },
  { name: '종양내과', mainCategory: '암', diseaseArea: '자궁암', tags: ['자궁암항암', '표적치료', '전이성자궁암'] },
  { name: '산부인과', mainCategory: '암', diseaseArea: '자궁암', tags: ['로봇자궁절제', '자궁암수술', '자궁내막암'] },
  { name: '산부인과', mainCategory: '암', diseaseArea: '자궁암', tags: ['자궁암수술', '자궁경부암', '자궁암방사선'] },
  { name: '종양내과', mainCategory: '암', diseaseArea: '자궁암', tags: ['전이성자궁암', '자궁암항암', '표적치료'] },
  { name: '산부인과', mainCategory: '암', diseaseArea: '자궁암', tags: ['로봇자궁절제', '자궁경부암', '자궁내막암'] },

  // 척추/관절 (7명)
  { name: '신경외과', mainCategory: '척추/관절', diseaseArea: '척추', tags: ['디스크', '척추측만증', '척추관협착증', '재수술전문', '척추압박골절'] },
  { name: '정형외과', mainCategory: '척추/관절', diseaseArea: '척추', tags: ['척추관협착증', '디스크', '재수술전문', '척추종양'] },
  { name: '정형외과', mainCategory: '척추/관절', diseaseArea: '무릎관절', tags: ['인공관절', '연골손상', '재치환술', '무릎관절내시경', '십자인대'] },
  { name: '정형외과', mainCategory: '척추/관절', diseaseArea: '어깨관절', tags: ['회전근개파열', '어깨관절내시경', '오십견', '어깨탈구', '어깨재건'] },
  { name: '정형외과', mainCategory: '척추/관절', diseaseArea: '고관절', tags: ['고관절인공관절', '고관절재치환', '대퇴골두괴사', '고관절골절'] },
  { name: '정형외과', mainCategory: '척추/관절', diseaseArea: '무릎관절', tags: ['인공관절', '연골손상', '십자인대'] },
  { name: '신경외과', mainCategory: '척추/관절', diseaseArea: '척추', tags: ['디스크', '척추관협착증', '척추압박골절'] },

  // 반복용
  { name: '순환기내과', mainCategory: '심장/뇌혈관', diseaseArea: '심장', tags: ['관상동맥', '부정맥', '심부전', '판막질환'] },
  { name: '심장혈관흉부외과', mainCategory: '심장/뇌혈관', diseaseArea: '심장', tags: ['관상동맥', '심부전', '부정맥'] },
  { name: '심장혈관흉부외과', mainCategory: '심장/뇌혈관', diseaseArea: '심장', tags: ['판막질환', '심장이식', '관상동맥수술'] },
  { name: '신경과', mainCategory: '심장/뇌혈관', diseaseArea: '뇌혈관', tags: ['뇌졸중', '뇌동맥류', '뇌출혈', '뇌혈관기형'] },
  { name: '신경외과', mainCategory: '심장/뇌혈관', diseaseArea: '뇌혈관', tags: ['뇌경색', '뇌졸중', '뇌혈관질환'] },
  { name: '심장혈관흉부외과', mainCategory: '심장/뇌혈관', diseaseArea: '혈관', tags: ['대동맥류', '경동맥협착', '말초혈관'] },
  { name: '심장혈관흉부외과', mainCategory: '심장/뇌혈관', diseaseArea: '혈관', tags: ['하지정맥류', '말초혈관', '대동맥류', '경동맥협착'] },
];

function generateDoctors(count: number): Doctor[] {
  const doctors: Doctor[] = [];
  
  for (let i = 0; i < count; i++) {
    const specialty = SPECIALTIES[i % SPECIALTIES.length];
    const hospital = HOSPITALS[i % HOSPITALS.length];
    const name = NAMES[i % NAMES.length];
    const education = UNIVERSITIES[i % UNIVERSITIES.length];
    const distance = DISTANCES[i % DISTANCES.length];
    
    // 경험년수: 8~25년
    const experience = 8 + (i % 18);
    
    // 평점: 4.5~5.0
    const ratingBase = 4.5 + (i % 6) * 0.1;
    const rating = Math.round(ratingBase * 10) / 10;
    
    // 리뷰 수: 300~2500
    const reviewCount = 300 + (i * 37) % 2200;
    
    // verified: 70% true
    const verified = i % 10 < 7;
    
    // 태그: 해당 specialty의 모든 태그 사용
    const tags = specialty.tags;
    
    // 이미지: Unsplash 이미지 순환
    const imageIds = [
      'photo-1612349317150-e413f6a5b16d',
      'photo-1594824476967-48c8b964273f',
      'photo-1622253692010-333f2da6031d',
      'photo-1537368910025-700350fe46c7',
      'photo-1551836022-deb4988cc6c0',
      'photo-1559839734-2b71ea197ec2',
    ];
    const imageId = imageIds[i % imageIds.length];
    
    doctors.push({
      id: `dr-${i + 1}`,
      name,
      hospital,
      specialty: specialty.name,
      mainCategory: specialty.mainCategory,
      diseaseArea: specialty.diseaseArea,
      image: `https://images.unsplash.com/${imageId}?w=400`,
      experience: `${experience}년`,
      education,
      rating,
      reviewCount,
      distance,
      verified,
      tags,
    });
  }
  
  return doctors;
}

export const DOCTORS: Doctor[] = generateDoctors(200);

export const getDoctorsBySpecialty = (specialty: string): Doctor[] => {
  return DOCTORS.filter((doctor) => doctor.specialty.includes(specialty));
};

export const getTopDoctors = (count: number = 6): Doctor[] => {
  return [...DOCTORS]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, count);
};

export const getDoctorById = (id: string): Doctor | undefined => {
  return DOCTORS.find((doctor) => doctor.id === id);
};

// 질환별 추천 의료진
export const DISEASE_CATEGORIES = [
  { id: 'lung-cancer', name: '폐암', specialty: '흉부외과' },
  { id: 'stomach-cancer', name: '위암', specialty: '소화기내과' },
  { id: 'colon-cancer', name: '대장암', specialty: '대장암' },
  { id: 'thyroid-cancer', name: '갑상선암', specialty: '내분비외과' },
  { id: 'breast-cancer', name: '유방암', specialty: '유방외과' },
  { id: 'liver-cancer', name: '간암', specialty: '간담췌외과' },
  { id: 'prostate-cancer', name: '전립선암', specialty: '비뇨의학과' },
  { id: 'pancreatic-cancer', name: '췌장암', specialty: '간담췌외과' },
  { id: 'cervical-cancer', name: '자궁암', specialty: '산부인과' },
  { id: 'spine-joint', name: '척추/관절', specialty: '정형외과' },
];