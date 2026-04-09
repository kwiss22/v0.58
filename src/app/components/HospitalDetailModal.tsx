// 병원 상세 정보 모달 - 후기 작성 기능 포함

import { X, MapPin, Star, Phone, Clock, Navigation, BarChart3, Edit3 } from 'lucide-react';
import { useState } from 'react';

interface Hospital {
  id?: string;
  name: string;
  rating: number;
  distance: string;
  department?: string;
  address?: string;
  phone?: string;
  hours?: string;
  fromAI?: boolean;
  relatedDisease?: string;
  totalPatients?: number;
  qualityScores?: {
    [key: string]: { grade: string; score: number };
  };
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
  isVerified?: boolean;
  isAIRecommended?: boolean;
}

interface HospitalDetailModalProps {
  hospital: Hospital;
  isOpen: boolean;
  onClose: () => void;
}

export function HospitalDetailModal({ hospital, isOpen, onClose }: HospitalDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newReviewContent, setNewReviewContent] = useState('');

  // 샘플 후기 데이터
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userName: '직장인',
      rating: 5,
      date: '2025.01.25',
      content: '역류성식도염으로 고생했는데 정확한 진단과 치료 덕분에 완치됐어요. 설명도 친절하게 해주셔서 좋았습니다.',
      likes: 24,
      isVerified: true,
      isAIRecommended: true,
    },
    {
      id: '2',
      userName: '학생맘',
      rating: 4,
      date: '2025.01.20',
      content: '아이가 소화불량으로 고생했는데 약 처방 잘 받고 나았어요. 대기 시간이 좀 길었지만 만족합니다.',
      likes: 15,
      isVerified: true,
      isAIRecommended: false,
    },
    {
      id: '3',
      userName: '신혼부부',
      rating: 5,
      date: '2025.01.15',
      content: 'AI 챗봇 추천으로 방문했는데 정말 잘 맞는 병원이었어요. 위내시경도 편하게 받았습니다.',
      likes: 32,
      isVerified: false,
      isAIRecommended: true,
    },
  ]);

  const handleSubmitReview = () => {
    if (!newReviewContent.trim()) {
      alert('후기 내용을 입력해주세요.');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      userName: '김사용자',
      rating: newRating,
      date: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\. /g, '.').replace(/\.$/, ''),
      content: newReviewContent,
      likes: 0,
      isVerified: false,
      isAIRecommended: hospital.fromAI || false,
    };

    setReviews([newReview, ...reviews]);
    setNewReviewContent('');
    setNewRating(5);
    setIsWritingReview(false);
  };

  if (!isOpen) return null;

  // 적정성평가 필터링
  const filteredQualityScores = hospital.qualityScores && hospital.relatedDisease
    ? Object.entries(hospital.qualityScores)
        .filter(([key]) => key.includes(hospital.relatedDisease || ''))
        .slice(0, 3)
    : [];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{hospital.name}</h2>
            <p className="text-sm text-gray-500">{hospital.department || '내과'}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              activeTab === 'info'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            병원 정보
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              activeTab === 'reviews'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            진료 후기 ({reviews.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'info' ? (
            <div className="space-y-4">
              {/* 평점 및 거리 */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-3xl font-bold text-gray-900">{hospital.rating}</span>
                    <span className="text-sm text-gray-500">/ 5.0</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{hospital.distance}</span>
                  </div>
                </div>

                {/* 연간 진료 실적 */}
                {hospital.totalPatients && (
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="w-4 h-4 text-gray-700" />
                      <p className="text-sm font-semibold text-gray-900">연간 진료 실적</p>
                    </div>
                    <p className="text-sm">
                      총 <span className="text-blue-600 font-bold">{hospital.totalPatients.toLocaleString()}건</span>{' '}
                      <span className="text-gray-500">(2024년)</span>
                    </p>
                  </div>
                )}

                {/* 적정성평가 등급 */}
                {filteredQualityScores.length > 0 && (
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <p className="text-sm font-semibold text-gray-900">
                        {hospital.relatedDisease} 관련 평가
                      </p>
                    </div>
                    <div className="space-y-2 mb-2">
                      {filteredQualityScores.map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">• {key}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            value.grade === 'A' ? 'bg-green-100 text-green-700' :
                            value.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {value.grade}등급 ({value.score}점)
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-start gap-1 pt-2 border-t border-gray-100">
                      <span className="text-xs">💡</span>
                      <p className="text-xs text-blue-600 leading-relaxed">
                        이 병원은 {hospital.relatedDisease} 치료에 우수한 평가를 받았습니다
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 주소 */}
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">주소</p>
                  <p className="text-sm text-gray-600">
                    {hospital.address || '서울특별시 강남구 테헤란로 123'}
                  </p>
                </div>
              </div>

              {/* 전화번호 */}
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">전화번호</p>
                  <p className="text-sm text-gray-600">{hospital.phone || '02-1234-5678'}</p>
                </div>
              </div>

              {/* 진료시간 */}
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">진료시간</p>
                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {hospital.hours || '평일 09:00 - 18:00\n토요일 09:00 - 13:00\n일요일 휴진'}
                  </p>
                </div>
              </div>

              {/* 길찾기 버튼 */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Navigation className="w-5 h-5" />
                길찾기
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* 후기 작성 버튼/폼 */}
              {!isWritingReview ? (
                <button
                  onClick={() => setIsWritingReview(true)}
                  className="w-full bg-blue-50 border-2 border-blue-200 text-blue-700 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-5 h-5" />
                  후기 작성하기
                </button>
              ) : (
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">후기 작성</h3>
                  
                  {/* 평점 슬라이더 */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">평점</label>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg font-bold text-gray-900">{newRating}</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1점</span>
                      <span>2점</span>
                      <span>3점</span>
                      <span>4점</span>
                      <span>5점</span>
                    </div>
                  </div>

                  {/* 후기 내용 */}
                  <textarea
                    value={newReviewContent}
                    onChange={(e) => setNewReviewContent(e.target.value)}
                    placeholder="병원 방문 경험을 자세히 작성해주세요."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                    rows={4}
                  />
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {newReviewContent.length}자
                  </div>

                  {/* AI 추천 태그 안내 */}
                  {hospital.fromAI && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-3">
                      <p className="text-xs text-yellow-700">
                        ✨ AI 챗봇 추천으로 방문하신 경우, 자동으로 "AI 추천" 태그가 추가됩니다.
                      </p>
                    </div>
                  )}

                  {/* 버튼 */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => {
                        setIsWritingReview(false);
                        setNewReviewContent('');
                        setNewRating(5);
                      }}
                      className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleSubmitReview}
                      className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                    >
                      후기 등록
                    </button>
                  </div>
                </div>
              )}

              {/* 후기 목록 */}
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{review.userName}</span>
                      {review.isVerified && (
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      {review.isAIRecommended && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                          ✨ AI 추천
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2 leading-relaxed">{review.content}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{review.date}</span>
                    <div className="flex items-center gap-1">
                      <span>👍 {review.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-yellow-50">
          <p className="text-xs text-gray-700 text-center">
            {hospital.fromAI 
              ? '✨ AI 챗봇에서 추천받은 병원입니다. 실제 방문 후 후기를 남겨주세요!'
              : '💡 병원 방문 후 솔직한 후기를 남겨주시면 다른 사용자에게 큰 도움이 됩니다.'}
          </p>
        </div>
      </div>
    </div>
  );
}