// 리뷰 작성 모달 컴포넌트
import { X, Shield, Star, Heart, MessageCircle, ThumbsUp, FileEdit, ImagePlus } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { VerificationRequestModal, VerificationData } from '@/app/components/VerificationRequestModal';
import { processImages, ResizedImage } from '@/app/utils/imageResize';

// ── 임시저장 helpers ──────────────────────────────────────────────────────────
const REVIEW_DRAFT_PREFIX = 'aiga_review_draft_';

interface ReviewDraft {
  content: string;
  kindness: number;
  satisfaction: number;
  explanation: number;
  recommendation: number;
  requestVerification: boolean; // 파일(verificationData)은 제외, 여부만 저장
  savedAt: string;
}

function draftKey(doctorId: string) {
  return `${REVIEW_DRAFT_PREFIX}${doctorId}`;
}

function loadReviewDraft(doctorId: string): ReviewDraft | null {
  try {
    const raw = localStorage.getItem(draftKey(doctorId));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveReviewDraft(doctorId: string, draft: Omit<ReviewDraft, 'savedAt'>) {
  localStorage.setItem(draftKey(doctorId), JSON.stringify({ ...draft, savedAt: new Date().toISOString() }));
}

function clearReviewDraft(doctorId: string) {
  localStorage.removeItem(draftKey(doctorId));
}

function formatSavedAt(iso: string): string {
  const d = new Date(iso);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

// ── Props ────────────────────────────────────────────────────────────────────
interface ReviewWriteModalProps {
  doctorName: string;
  hospital: string;
  doctorId: string;
  onClose: () => void;
  onSubmit: (review: {
    rating: number;
    content: string;
    kindness: number;
    satisfaction: number;
    explanation: number;
    recommendation: number;
    requestVerification?: boolean;
    verificationData?: VerificationData;
    attachedImages?: ResizedImage[];
  }) => void;
}

// ── 컴포넌트 ─────────────────────────────────────────────────────────────────
export function ReviewWriteModal({ doctorName, hospital, doctorId, onClose, onSubmit }: ReviewWriteModalProps) {
  const [content, setContent] = useState('');
  const [kindness, setKindness] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [explanation, setExplanation] = useState(0);
  const [recommendation, setRecommendation] = useState(0);
  const [requestVerification, setRequestVerification] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);

  // ── 이미지 첨부 state
  const [attachedImages, setAttachedImages] = useState<ResizedImage[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // ── 임시저장 state
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const [draftInfo, setDraftInfo] = useState<ReviewDraft | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── 마운트 시 임시저장 확인
  useEffect(() => {
    const draft = loadReviewDraft(doctorId);
    if (draft && (draft.content || draft.kindness || draft.satisfaction || draft.explanation || draft.recommendation)) {
      setDraftInfo(draft);
      setShowDraftBanner(true);
    }
  }, [doctorId]);

  // ── 자동저장 (3초 debounce)
  const triggerAutoSave = useCallback(() => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      if (content || kindness || satisfaction || explanation || recommendation) {
        saveReviewDraft(doctorId, { content, kindness, satisfaction, explanation, recommendation, requestVerification });
        setLastSavedAt(formatSavedAt(new Date().toISOString()));
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2000);
      }
    }, 3000);
  }, [content, kindness, satisfaction, explanation, recommendation, requestVerification, doctorId]);

  useEffect(() => { triggerAutoSave(); }, [content, kindness, satisfaction, explanation, recommendation, requestVerification]);

  // ── 임시저장 불러오기
  const handleRestoreDraft = () => {
    if (!draftInfo) return;
    setContent(draftInfo.content);
    setKindness(draftInfo.kindness);
    setSatisfaction(draftInfo.satisfaction);
    setExplanation(draftInfo.explanation);
    setRecommendation(draftInfo.recommendation);
    setRequestVerification(draftInfo.requestVerification);
    setShowDraftBanner(false);
    setLastSavedAt(draftInfo.savedAt ? formatSavedAt(draftInfo.savedAt) : null);
  };

  // ── 임시저장 버리기
  const handleDiscardDraft = () => {
    clearReviewDraft(doctorId);
    setShowDraftBanner(false);
    setDraftInfo(null);
  };

  // ── 닫기: 내용 있으면 즉시 임시저장 후 닫기
  const handleClose = () => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    if (content || kindness || satisfaction || explanation || recommendation) {
      saveReviewDraft(doctorId, { content, kindness, satisfaction, explanation, recommendation, requestVerification });
    }
    onClose();
  };

  // ── 이미지 핸들러
  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const remaining = 10 - attachedImages.length;
    const toAdd = files.slice(0, remaining);
    for (const file of toAdd) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert(`${file.name}: JPG, PNG, WEBP 형식만 첨부할 수 있어요.`);
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name}: 파일 크기는 5MB 이하여야 해요.`);
        e.target.value = '';
        return;
      }
    }
    processImages(toAdd).then(resizedImages => {
      setAttachedImages(prev => [...prev, ...resizedImages]);
    }).catch(() => {
      alert('이미지 처리 중 오류가 발생했습니다.');
    });
    e.target.value = '';
  };

  const handleImageRemove = (id: string) => {
    setAttachedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleVerificationCheckboxClick = () => {
    if (!requestVerification) {
      setShowVerificationModal(true);
    } else {
      setRequestVerification(false);
      setVerificationData(null);
    }
  };

  const handleVerificationSubmit = (data: VerificationData) => {
    setVerificationData(data);
    setRequestVerification(true);
    setShowVerificationModal(false);
  };

  const handleSubmit = () => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    const avgRating = Math.round((kindness + satisfaction + explanation + recommendation) / 4);
    onSubmit({
      rating: avgRating,
      content,
      kindness,
      satisfaction,
      explanation,
      recommendation,
      requestVerification,
      verificationData: verificationData || undefined,
      attachedImages: attachedImages.length > 0 ? attachedImages : undefined,
    });
    clearReviewDraft(doctorId);
    onClose();
  };

  const isValid =
    kindness > 0 && satisfaction > 0 && explanation > 0 && recommendation > 0 &&
    content.trim().length >= 50;

  const RatingStars = ({
    value,
    onChange,
    label,
    description,
    icon,
    iconBg,
  }: {
    value: number;
    onChange: (val: number) => void;
    label: string;
    description: string;
    icon: React.ReactNode;
    iconBg: string;
  }) => (
    <div className="flex items-start gap-3 py-4">
      <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-teal-600 mb-1">{label}</h4>
        <p className="text-xs text-gray-600 mb-3">{description}</p>
        <div className="flex items-center gap-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
          <div className="flex items-center gap-3 flex-1">
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(value / 5) * 100}%, #e5e7eb ${(value / 5) * 100}%, #e5e7eb 100%)`
              }}
            />
            <span className="text-base font-bold text-gray-900 w-6 text-center">{value}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative">

        {/* ── 임시저장 복원 다이얼로그 (WritePostModal 동일 패턴) */}
        {showDraftBanner && draftInfo && (
          <div className="absolute inset-0 z-10 bg-black/40 flex items-center justify-center rounded-2xl">
            <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full mx-4 overflow-hidden">
              <div className="px-5 pt-5 pb-4">
                <p className="text-sm font-black text-gray-900 mb-1">AIGA</p>
                <p className="text-sm text-gray-700 mb-3">
                  기존에 작성 중인 리뷰 데이터가 있습니다.<br />불러오시겠습니까?
                </p>
                {draftInfo.savedAt && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800 mb-1">
                    <span className="font-bold">{formatSavedAt(draftInfo.savedAt)} 저장</span>
                    {draftInfo.content && (
                      <span className="text-amber-700 ml-1">· {draftInfo.content.slice(0, 20)}{draftInfo.content.length > 20 ? '…' : ''}</span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex border-t border-gray-100">
                <button
                  onClick={handleDiscardDraft}
                  className="flex-1 py-3 text-sm text-gray-500 hover:bg-gray-50 transition-colors font-medium"
                >
                  취소(삭제)
                </button>
                <button
                  onClick={handleRestoreDraft}
                  className="flex-1 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors font-bold border-l border-gray-100"
                >
                  불러오기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold">{doctorName} 선생님 리뷰</h2>
            <p className="text-sm text-blue-100 mt-0.5">{hospital}</p>
          </div>
          <div className="flex items-center gap-2">
            {/* 자동저장 표시 */}
            {lastSavedAt && !showDraftBanner && (
              <span className={`text-xs transition-opacity ${justSaved ? 'text-blue-200' : 'text-blue-300'}`}>
                {justSaved ? '저장됨 ✓' : `${lastSavedAt} 임시저장`}
              </span>
            )}
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <form className="p-6 space-y-6">
            {/* Detailed Ratings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">솔직한 리뷰를</h3>
                <FileEdit className="w-9 h-9 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">남겨주세요</h3>

              <div className="space-y-1 divide-y divide-gray-100">
                <RatingStars
                  value={kindness}
                  onChange={setKindness}
                  label="친절 · 배려"
                  description="진료시 친절하게 해 주셨나요?"
                  icon={<Heart className="w-5 h-5 text-blue-500" />}
                  iconBg="bg-blue-50"
                />
                <RatingStars
                  value={satisfaction}
                  onChange={setSatisfaction}
                  label="치료 만족"
                  description="진료 후 결과가 좋거나 개선되었나요?"
                  icon={
                    <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                      <circle cx="12" cy="12" r="3" fill="currentColor"/>
                    </svg>
                  }
                  iconBg="bg-blue-50"
                />
                <RatingStars
                  value={explanation}
                  onChange={setExplanation}
                  label="쉬운 설명"
                  description="증상과 치료에 대해 상세히 설명하였나요?"
                  icon={<MessageCircle className="w-5 h-5 text-blue-500" />}
                  iconBg="bg-blue-50"
                />
                <RatingStars
                  value={recommendation}
                  onChange={setRecommendation}
                  label="추천 의향"
                  description="지인에게 추천하시겠어요?"
                  icon={<ThumbsUp className="w-5 h-5 text-blue-500" />}
                  iconBg="bg-blue-50"
                />
              </div>
            </div>

            {/* Review Content */}
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-2">
                진료 후기를 작성해 주세요
              </h4>
              <p className="text-xs text-gray-500 mb-3">
                허위 또는 과장된 내용은 법적으로 문제가 될 수 있습니다. 정확하고 사실에 근거한 리뷰를 작성해 주시기 바랍니다.
              </p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="리뷰는 최소 50자 이상이어야 합니다. 욕설, 비방, 무의미한 반복작성 글은 삭제될 수 있습니다."
                className="w-full h-32 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              />
              <p className={`text-xs mt-2 ${content.length < 50 ? 'text-red-400' : 'text-green-500'}`}>
                {content.length}자 {content.length < 50 ? `(최소 50자 이상 · ${50 - content.length}자 더 입력 필요)` : '✓ 최소 글자 수 충족'}
              </p>
            </div>

            {/* Photo Upload */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  disabled={attachedImages.length >= 10}
                  onClick={() => imageInputRef.current?.click()}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-sm ${
                    attachedImages.length >= 10
                      ? 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed'
                      : 'border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:border-gray-400'
                  }`}
                >
                  <ImagePlus className="w-4 h-4" />
                  <span>사진 첨부</span>
                </button>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImageAdd}
                  className="hidden"
                />
                <span className="text-xs text-gray-400">
                  {attachedImages.length}/10 · JPG·PNG·WEBP, 장당 5MB 이하
                </span>
              </div>

              {attachedImages.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {attachedImages.map(img => (
                    <div key={img.id} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(img.id)}
                        className="absolute top-1 right-1 w-5 h-5 bg-gray-900/70 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                  {attachedImages.length < 10 && (
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <ImagePlus className="w-5 h-5" />
                      <span className="text-xs">추가</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Hospital Visit Verification - OPTIONAL */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                🏥 병원 진료 인증 <span className="text-gray-500">(선택)</span>
              </label>
              <div
                className={`border-2 rounded-lg p-4 transition-all ${
                  requestVerification && verificationData
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                {requestVerification && verificationData ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-bold text-blue-900">인증 요청 완료</p>
                        <p className="text-xs text-blue-700 mt-0.5">
                          관리자 확인 후 신뢰 배지가 부여됩니다
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setRequestVerification(false); setVerificationData(null); }}
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      다시 인증
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">실제 진료 증빙이 필요합니다</p>
                      <p className="text-xs text-gray-600 mt-1">
                        진료 영수증, 처방전 등으로 인증하면 리뷰 작성이 가능합니다
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowVerificationModal(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      인증하기
                    </button>
                  </div>
                )}
              </div>
              {showVerificationModal && (
                <VerificationRequestModal
                  onClose={() => setShowVerificationModal(false)}
                  onVerificationData={handleVerificationSubmit}
                />
              )}
            </div>

            {/* Review Guidelines */}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <p className="text-sm font-bold text-yellow-900 mb-2">📝 리뷰 작성 가이드</p>
              <ul className="text-xs text-yellow-800 space-y-1">
                <li>• 구체적인 진료 경험을 작성하면 다른 환자들에게 도움이 됩니다</li>
                <li>• 비방이나 욕설은 삭제될 수 있습니다</li>
                <li>• 인증된 리뷰는 의사 프로필에 우선 표시됩니다</li>
              </ul>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <button
            type="button"
            onClick={isValid ? handleSubmit : undefined}
            disabled={!isValid}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              isValid
                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}