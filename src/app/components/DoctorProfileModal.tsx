// 실제 의사 프로필 모달 - 첨부 디자인 기반
import { X, Phone, Calendar, Heart, MessageCircle, ThumbsUp, Info, ChevronDown, ChevronUp, User, Shield, Bookmark, Lock, Star, Edit, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUser } from '@/app/contexts/UserContext';
import { ReviewWriteModal } from '@/app/components/ReviewWriteModal';
import { DoctorInfoEditRequestModal } from '@/app/components/DoctorInfoEditRequestModal';
import { LoginRequiredToast } from '@/app/components/LoginRequiredToast';
import { VerificationBadge } from '@/app/components/VerificationBadge';
import { VerificationData } from '@/app/components/VerificationRequestModal';
import { ImageLightbox } from '@/app/components/ImageLightbox';
import { useSavedDoctors } from '@/hooks/useSavedDoctors';
import { getDoctorProfileRequestButtonsVisibility } from '@/app/utils/doctorProfileRequestButtons';
import { toast } from 'sonner';

interface DoctorInfo {
  id?: string;
  name: string;
  specialty: string;
  hospital: string;
  experience: string;
  education?: string;
  /** 플랫폼 인증 의료진 여부 — 인증 요청 버튼 노출에 사용 */
  verified?: boolean;
  rating: number;
  reviewCount: number;
  consultCount?: number;
  phone?: string;
  profileImage?: string;
  career?: string[];
  education_list?: string[];
  papers?: string[];
  specialties?: string[]; // 세부 전공분야
  aiReviews?: {
    kindness: number;
    satisfaction: number;
    explanation: number;
    recommendation: number;
  };
}

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  kindness: number;
  satisfaction: number;
  explanation: number;
  recommendation: number;
  date: string;
  verified: boolean;
  verificationData?: VerificationData;
  attachedImages?: any[];
}

interface DoctorProfileModalProps {
  doctor: DoctorInfo;
  isOpen?: boolean;
  onClose: () => void;
  currentConversationId?: string | null;
  onDoctorSaved?: (doctorId: string) => void;
}

export function DoctorProfileModal({ doctor, isOpen, onClose, currentConversationId, onDoctorSaved }: DoctorProfileModalProps) {
  const { isGuest, setRole, role } = useUser();
  // 논문만 아코디언 (경력·학력은 항상 표시)
  const [papersExpanded, setPapersExpanded] = useState(false);
  const [reviewWriteModalOpen, setReviewWriteModalOpen] = useState(false);
  const [reviewSuccessOpen, setReviewSuccessOpen] = useState(false);
  const [loginRequiredOpen, setLoginRequiredOpen] = useState(false);
  const [loginRequiredFeature, setLoginRequiredFeature] = useState('');
  const [doctorInfoEditOpen, setDoctorInfoEditOpen] = useState(false);

  // ── 이미지 라이트박스 state
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<{ id: string; url: string; name: string }[]>([]);

  const openLightbox = (images: { id: string; url: string; name: string }[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'review-1',
      author: '희망이님',
      rating: 5,
      content: '6개월간 치료받았는데 공황장애가 많이 좋아졌어요. 환자 입장에서 꼼꼼하게 설명해주시고 약물 부작용도 세심하게 체크해주셔서 감사했습니다. 먼 거리지만 찾아올 가치가 있었어요.',
      kindness: 5,
      satisfaction: 5,
      explanation: 5,
      recommendation: 5,
      date: '2025.03.10',
      verified: true,
      attachedImages: [
        {
          id: 'img-1-1',
          url: 'https://images.unsplash.com/photo-1771574204208-b47e2d863bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHdhaXRpbmclMjByb29tJTIwY2xpbmljfGVufDF8fHx8MTc3Mzc1Mzg3N3ww&ixlib=rb-4.1.0&q=80&w=400',
          name: '병원 대기실',
        },
        {
          id: 'img-1-2',
          url: 'https://images.unsplash.com/photo-1659353888477-6e6aab941b55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBjaGVja3VwJTIwbWVkaWNhbCUyMHJlcG9ydCUyMGRvY3VtZW50fGVufDF8fHx8MTc3Mzc1Mzg4Mnww&ixlib=rb-4.1.0&q=80&w=400',
          name: '검사 결과지',
        },
        {
          id: 'img-1-3',
          url: 'https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJlc2NyaXB0aW9uJTIwbWVkaWNpbmUlMjBwaWxsc3xlbnwxfHx8fDE3NzM3NTM4Nzh8MA&ixlib=rb-4.1.0&q=80&w=400',
          name: '처방약',
        },
      ],
    },
    {
      id: 'review-2',
      author: '별빛환자',
      rating: 4,
      content: '처음 방문했는데 진료 대기가 길었지만 진료 자체는 매우 만족스러웠습니다. 증상에 대해 자세히 설명해 주셔서 이해하기 쉬웠어요.',
      kindness: 4,
      satisfaction: 4,
      explanation: 5,
      recommendation: 4,
      date: '2025.02.22',
      verified: false,
      attachedImages: [
        {
          id: 'img-2-1',
          url: 'https://images.unsplash.com/photo-1758691461935-202e2ef6b69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBjb25zdWx0YXRpb24lMjBwYXRpZW50fGVufDF8fHx8MTc3MzczMzI2Nnww&ixlib=rb-4.1.0&q=80&w=400',
          name: '진료 상담',
        },
        {
          id: 'img-2-2',
          url: 'https://images.unsplash.com/photo-1758573467057-955f803660a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lJTIwY2FiaW5ldHxlbnwxfHx8fDE3NzM3NTM4ODJ8MA&ixlib=rb-4.1.0&q=80&w=400',
          name: '약국',
        },
      ],
    },
    {
      id: 'review-3',
      author: '산내음환자',
      rating: 5,
      content: '수술 전후 경과를 꼼꼼히 체크해주셔서 안심이 됐어요. MRI 결과 설명도 이해하기 쉽게 해주셨고 회복실 환경도 청결했습니다. 퇴원 후 처방전과 주의사항도 친절하게 안내해 주셨어요. 강력히 추천드립니다!',
      kindness: 5,
      satisfaction: 5,
      explanation: 4,
      recommendation: 5,
      date: '2025.01.15',
      verified: true,
      attachedImages: [
        {
          id: 'img-3-1',
          url: 'https://images.unsplash.com/photo-1758691463165-ca9b5bc2b28a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNUkklMjBzY2FuJTIwYnJhaW4lMjBpbWFnaW5nfGVufDF8fHx8MTc3Mzc1NDM3Mnww&ixlib=rb-4.1.0&q=80&w=400',
          name: 'MRI 결과',
        },
        {
          id: 'img-3-2',
          url: 'https://images.unsplash.com/photo-1710074213379-2a9c2653046a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJlZCUyMHJlY292ZXJ5JTIwcm9vbXxlbnwxfHx8fDE3NzM3NTQzNzJ8MA&ixlib=rb-4.1.0&q=80&w=400',
          name: '회복실',
        },
        {
          id: 'img-3-3',
          url: 'https://images.unsplash.com/photo-1655313719612-8248b2c4d1e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwc3RldGhvc2NvcGV8ZW58MXx8fHwxNzczNzE1MjMzfDA&ixlib=rb-4.1.0&q=80&w=400',
          name: '의료 장비',
        },
        {
          id: 'img-3-4',
          url: 'https://images.unsplash.com/photo-1656337426914-5e5ba162d606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHRlc3QlMjBsYWJvcmF0b3J5JTIwdHViZXxlbnwxfHx8fDE3NzM3NTQzNzN8MA&ixlib=rb-4.1.0&q=80&w=400',
          name: '혈액 검사',
        },
      ],
    },
  ]);

  // 임시저장 배너 (리뷰 탭)
  const doctorId = doctor.id || doctor.name;
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`aiga_review_draft_${doctorId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.content || parsed.kindness || parsed.satisfaction || parsed.explanation || parsed.recommendation) {
          setHasDraft(true);
        }
      }
    } catch { /* ignore */ }
  }, [doctorId]);

  const { isSaved, toggleSave } = useSavedDoctors();
  const saved = isSaved(doctorId);

  const { showVerificationRequest, showInfoEditRequest } = getDoctorProfileRequestButtonsVisibility({
    viewerRole: role,
  });
  const showRequestButtonsRow = showVerificationRequest || showInfoEditRequest;

  if (isOpen === false) return null;

  const handleSaveToggle = () => {
    if (isGuest) {
      setLoginRequiredFeature('의사 프로필 저장');
      setLoginRequiredOpen(true);
      return;
    }

    const result = toggleSave({
      id: doctorId,
      name: doctor.name,
      specialty: doctor.specialty,
      hospital: doctor.hospital,
      experience: doctor.experience,
      education: doctor.education,
    });

    if (result) {
      toast.success('의료진이 저장되었습니다!');
      if (onDoctorSaved) {
        onDoctorSaved(doctorId);
      }
    } else {
      toast.success('저장이 해제되었습니다.');
    }
  };

  const handleReviewWriteClick = () => {
    if (isGuest) {
      setLoginRequiredFeature('리뷰 작성');
      setLoginRequiredOpen(true);
      return;
    }
    setReviewWriteModalOpen(true);
  };

  const handleVerificationRequestClick = () => {
    if (isGuest) {
      setLoginRequiredFeature('의료진 인증 요청');
      setLoginRequiredOpen(true);
      return;
    }
    toast('의료진 인증 요청은 추후 연동 예정입니다.', { duration: 3000 });
  };

  const handleLoginFromToast = () => {
    setRole('member');
    setLoginRequiredOpen(false);
  };

  const handleReviewSubmit = (reviewData: {
    rating: number;
    content: string;
    kindness: number;
    satisfaction: number;
    explanation: number;
    recommendation: number;
    requestVerification?: boolean;
    verificationData?: VerificationData;
    attachedImages?: any[];
  }) => {
    const newReview: Review = {
      id: Date.now().toString(),
      author: '김사용자',
      rating: reviewData.rating,
      content: reviewData.content,
      kindness: reviewData.kindness,
      satisfaction: reviewData.satisfaction,
      explanation: reviewData.explanation,
      recommendation: reviewData.recommendation,
      date: new Date().toLocaleDateString('ko-KR'),
      verified: reviewData.requestVerification || false,
      verificationData: reviewData.verificationData,
      attachedImages: reviewData.attachedImages,
    };

    setReviews([newReview, ...reviews]);
    setReviewSuccessOpen(true);
  };

  // 평균 점수 계산
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const avgKindness = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.kindness, 0) / reviews.length).toFixed(1)
    : '0.0';

  const avgSatisfaction = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.satisfaction, 0) / reviews.length).toFixed(1)
    : '0.0';

  const avgExplanation = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.explanation, 0) / reviews.length).toFixed(1)
    : '0.0';

  const avgRecommendation = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.recommendation, 0) / reviews.length).toFixed(1)
    : '0.0';

  // 기본 AI 리뷰 점수
  const aiReviews = doctor.aiReviews || {
    kindness: 4.9,
    satisfaction: 4.9,
    explanation: 4.8,
    recommendation: 4.9,
  };

  // 기본 경력
  const career = doctor.career || [
    `${doctor.hospital} ${doctor.specialty} 전문의 (2015~현재)`,
    `${doctor.hospital} 임상조교수`,
    '대한의사협회 정회원',
  ];

  // 기본 학력
  const education_list = doctor.education_list || [
    '서울대학교 의과대학 의학박사',
    '서울대학교 의과대학 의학석사',
    '서울대학교 의과대학 졸업',
  ];

  // 기본 논문
  const papers = doctor.papers || [
    'Clinical Outcomes in Modern Medicine',
    'Advanced Diagnostic Techniques',
    'Patient Care and Treatment Strategies',
  ];

  // 기본 세부 전공분야
  const specialties = doctor.specialties || [
    '간이식',
    '간암',
    '담도암',
    '복막',
    '문맥압항진증',
    '전이성간암'
  ];

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative">

        {/* ── 리뷰 등록 완료 팝업 */}
        {reviewSuccessOpen && (
          <div className="absolute inset-0 z-20 bg-black/40 flex items-center justify-center rounded-2xl">
            <div className="bg-white rounded-2xl shadow-2xl w-72 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-teal-400 to-blue-500" />
              <div className="flex flex-col items-center px-6 pt-7 pb-5">
                <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-teal-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-teal-500" strokeWidth={2} />
                </div>
                <p className="text-base font-bold text-gray-900 mb-1.5">리뷰가 등록되었습니다</p>
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  소중한 리뷰가 AIGA 리뷰 목록에<br />추가되었습니다. 감사합니다 😊
                </p>
              </div>
              <div className="border-t border-gray-100">
                <button
                  onClick={() => setReviewSuccessOpen(false)}
                  className="w-full py-3 text-sm font-bold text-teal-600 hover:bg-teal-50 transition-colors"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── 이미지 라이트박스 */}
        {showLightbox && lightboxImages.length > 0 && (
          <ImageLightbox
            images={lightboxImages}
            initialIndex={lightboxIndex}
            onClose={() => setShowLightbox(false)}
          />
        )}

        {/* Blue Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{doctor.name}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Profile Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{doctor.hospital}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-teal-600 text-white text-sm rounded-full font-semibold">
                    {doctor.specialty.replace(/\s*\(.*?\)/g, '')}
                  </span>
                  {specialties.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ml-4">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <button className="bg-blue-50 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                예약
              </button>
              <button className="bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                전화
              </button>
              <button
                onClick={handleSaveToggle}
                className={`py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isGuest
                    ? 'bg-gray-100 text-gray-400 cursor-pointer'
                    : saved
                      ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isGuest ? (
                  <>
                    <Lock className="w-5 h-5" />
                    즐겨찾기
                  </>
                ) : (
                  <>
                    <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
                    {saved ? '즐겨찾기됨' : '즐겨찾기'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info Section Header */}
          <div className="px-6 py-3 bg-gray-50 flex items-center gap-2">
            <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center">
              <Info className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-teal-600">info</span>
          </div>

          {/* 경력 — 항상 표시 */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="text-base font-bold text-gray-900 mb-3">경력</h4>
            <div className="space-y-2">
              {career.map((item, index) => (
                <p key={index} className="text-sm text-gray-700 leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* 학력 — 항상 표시 */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="text-base font-bold text-gray-900 mb-3">학력</h4>
            <div className="space-y-2">
              {education_list.map((item, index) => (
                <p key={index} className="text-sm text-gray-700 leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* 논문 — 4개 이상일 때만 아코디언 */}
          <div className="px-6 py-4 border-b border-gray-200">
            {papers.length >= 4 ? (
              <>
                <button
                  onClick={() => setPapersExpanded(!papersExpanded)}
                  className="w-full flex items-center justify-between mb-3"
                >
                  <h4 className="text-base font-bold text-gray-900">
                    논문
                    <span className="ml-2 text-xs font-normal text-gray-400">({papers.length}건)</span>
                  </h4>
                  {papersExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {papersExpanded && (
                  <div className="space-y-2">
                    {papers.map((item, index) => (
                      <p key={index} className="text-sm text-blue-600 leading-relaxed hover:underline cursor-pointer">
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <h4 className="text-base font-bold text-gray-900 mb-3">논문</h4>
                <div className="space-y-2">
                  {papers.map((item, index) => (
                    <p key={index} className="text-sm text-blue-600 leading-relaxed hover:underline cursor-pointer">
                      {item}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* 의료진 인증 요청 · 의사 정보 수정 요청 (논문 ↔ AI 소셜리뷰 사이) — 정보 수정 요청은 비회원·회원 항상 노출 */}
          {showRequestButtonsRow && (
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex gap-3">
                {showVerificationRequest && (
                  <button
                    type="button"
                    onClick={handleVerificationRequestClick}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                      isGuest
                        ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-pointer'
                        : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.99]'
                    }`}
                  >
                    {isGuest ? (
                      <>
                        <Lock className="w-4 h-4 shrink-0" />
                        의료진 인증 요청
                      </>
                    ) : (
                      '의료진 인증 요청'
                    )}
                  </button>
                )}
                {showInfoEditRequest && (
                  <button
                    type="button"
                    onClick={() => setDoctorInfoEditOpen(true)}
                    className="flex-1 py-3 rounded-xl bg-white text-gray-600 text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition-colors active:scale-[0.99]"
                  >
                    의사 정보 수정 요청
                  </button>
                )}
              </div>
            </div>
          )}

          {/* AI 소셜리뷰 섹션 */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-base font-bold text-teal-600">AI 소셜리뷰</h4>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {/* 친절 배려 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Heart className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-xs text-gray-600 mb-1 text-center">친절 · 배려</p>
                <p className="text-lg font-bold text-gray-900">{aiReviews.kindness}</p>
              </div>

              {/* 치료 만족 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
                <p className="text-xs text-gray-600 mb-1 text-center">치료 만족</p>
                <p className="text-lg font-bold text-gray-900">{aiReviews.satisfaction}</p>
              </div>

              {/* 쉬운 설명 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <MessageCircle className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-xs text-gray-600 mb-1 text-center">쉬운 설명</p>
                <p className="text-lg font-bold text-gray-900">{aiReviews.explanation}</p>
              </div>

              {/* 추천 의향 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <ThumbsUp className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-xs text-gray-600 mb-1 text-center">추천 의향</p>
                <p className="text-lg font-bold text-gray-900">{aiReviews.recommendation}</p>
              </div>
            </div>
          </div>

          {/* AIGA 리뷰 섹션 */}
          <div className="px-6 py-4">
            <div className="flex items-center gap-2 mb-6">
              <h4 className="text-base font-bold text-teal-600">AIGA 리뷰</h4>
              <Info className="w-4 h-4 text-gray-400" />
            </div>

            {/* 임시저장 이어쓰기 배너 — 회원 + draft 있을 때 */}
            {!isGuest && hasDraft && (
              <div className="mb-4 flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <span className="text-xs text-amber-700">⏱ 작성 중인 임시저장 리뷰가 있어요</span>
                <button
                  onClick={() => setReviewWriteModalOpen(true)}
                  className="text-xs font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full transition-colors"
                >
                  이어서 쓰기
                </button>
              </div>
            )}

            {reviews.length > 0 ? (
              <div className="space-y-4">
                {/* Average Rating Summary */}
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-start gap-6">
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating}</div>
                      <div className="flex items-center gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(Number(averageRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[
                        { label: '친절 · 배려', val: avgKindness },
                        { label: '치료 만족', val: avgSatisfaction },
                        { label: '쉬운 설명', val: avgExplanation },
                        { label: '추천 의향', val: avgRecommendation },
                      ].map(({ label, val }) => (
                        <div key={label} className="flex items-center gap-3">
                          <span className="text-xs text-gray-600 w-16">{label}</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(Number(val) / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-blue-500 w-8 text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-gray-900">{review.author}</p>
                        {review.verified && <VerificationBadge type="verified" />}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{review.date}</p>

                    {/* 2x2 별점 그리드 */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {[
                        { label: '친절 · 배려', val: review.kindness },
                        { label: '치료 만족', val: review.satisfaction },
                        { label: '쉬운 설명', val: review.explanation },
                        { label: '추천 의향', val: review.recommendation },
                      ].map(({ label, val }) => (
                        <div key={label} className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">{label}</span>
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-bold text-yellow-500">{val}.0</span>
                            </div>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-teal-500 rounded-full"
                              style={{ width: `${(val / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed">{review.content}</p>

                    {/* 첨부 이미지 */}
                    {review.attachedImages && review.attachedImages.length > 0 && (() => {
                      const imgs = review.attachedImages!;
                      const total = imgs.length;
                      const visibleImgs = imgs.slice(0, 3);
                      const extraCount = total - 3;
                      const gridCols = total === 1 ? 'grid-cols-1' : total === 2 ? 'grid-cols-2' : 'grid-cols-3';
                      const imgHeight = total === 1 ? 'h-48' : total === 2 ? 'h-32' : 'h-24';
                      return (
                        <div className={`mt-3 pt-3 border-t border-gray-100 grid gap-1.5 ${gridCols}`}>
                          {visibleImgs.map((img: { id: string; url: string; name: string }, idx: number) => (
                            <div key={img.id || idx} className="relative">
                              <button
                                type="button"
                                className="w-full block"
                                onClick={() => openLightbox(imgs, idx)}
                              >
                                <img
                                  src={img.url}
                                  alt={img.name || `사진 ${idx + 1}`}
                                  className={`w-full object-cover rounded-lg hover:opacity-90 transition-opacity ${imgHeight}`}
                                />
                              </button>
                              {idx === 2 && extraCount > 0 && (
                                <div
                                  className="absolute inset-0 rounded-lg bg-black/50 flex items-center justify-center cursor-pointer"
                                  onClick={() => openLightbox(imgs, idx)}
                                >
                                  <span className="text-white text-base font-bold">+{extraCount}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-sm font-bold text-gray-700 mb-1">첫 리뷰를 작성해보세요</p>
                <p className="text-xs text-gray-400">이 의사에 대한 첫 번째 리뷰를 남겨주세요</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer - 리뷰쓰기 버튼 */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleReviewWriteClick}
            className={`w-full py-3 rounded-lg font-bold text-base transition-colors flex items-center justify-center gap-2 ${
              isGuest
                ? 'bg-gray-100 text-gray-400 cursor-pointer'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isGuest ? (
              <>
                <Lock className="w-5 h-5" />
                리뷰쓰기
              </>
            ) : (
              <>
                <Edit className="w-5 h-5" />
                리뷰쓰기
              </>
            )}
          </button>
        </div>
      </div>

      {/* Review Write Modal */}
      {reviewWriteModalOpen && (
        <ReviewWriteModal
          doctorName={doctor.name}
          hospital={doctor.hospital}
          doctorId={doctorId}
          onClose={() => {
            setReviewWriteModalOpen(false);
            try {
              const raw = localStorage.getItem(`aiga_review_draft_${doctorId}`);
              if (raw) {
                const parsed = JSON.parse(raw);
                setHasDraft(!!(parsed.content || parsed.kindness || parsed.satisfaction || parsed.explanation || parsed.recommendation));
              } else {
                setHasDraft(false);
              }
            } catch { setHasDraft(false); }
          }}
          onSubmit={handleReviewSubmit}
        />
      )}

      {/* Login Required Toast */}
      <LoginRequiredToast
        isOpen={loginRequiredOpen}
        feature={loginRequiredFeature}
        onClose={() => setLoginRequiredOpen(false)}
        onLogin={handleLoginFromToast}
      />

      <DoctorInfoEditRequestModal
        isOpen={doctorInfoEditOpen}
        onClose={() => setDoctorInfoEditOpen(false)}
        doctorName={doctor.name}
      />
    </div>
  );
}