// AI 챗봇 페이지

import { useState, useEffect, useRef } from 'react';
import { useUser } from '@/app/contexts/UserContext';
import { useChatHistory } from '@/hooks/useChatHistory';
import { useSymptomFlow } from '@/hooks/useSymptomFlow';
import { SYMPTOMS } from '@/constants/symptom-data';
import { DOCTORS } from '@/constants/doctor-data';
import type { Hospital } from '@/constants/hospital-data';
import { 
  isHospitalRecommendationRequest,
  isDoctorRecommendationRequest,
  detectDisease,
  getRecommendedHospitals,
  getRecommendedDoctorsByDisease,
  generateHospitalRecommendationMessage,
  generateDoctorRecommendationMessage,
} from '@/utils/hospital-recommendation';
import {
  isSymptomInquiry,
  detectSymptom,
  generateSymptomResponseMessage,
  getRecommendedDoctorsBySymptom,
  getSymptomUrgency,
} from '@/utils/symptom-response';
import { generateMessageId } from '@/utils/generate-id';
import { analyzeQuestionIntent } from '@/utils/question-intent';
import { Message } from '@/types/chat.types';
import { Sidebar } from './Sidebar';
import { SymptomSelectionCard } from './SymptomSelectionCard';
import { HorizontalDoctorList } from './HorizontalDoctorList';
import { DoctorGridList } from './DoctorGridList';
import { DoctorProfileModal } from './DoctorProfileModal';
import { DoctorListModal } from './DoctorListModal';
import { HospitalCard, HospitalChatCard } from './HospitalCard';
import { HospitalDetailModal } from './HospitalDetailModal';
import { TokenLimitToast } from './TokenLimitToast';
import { DebugPanel } from './DebugPanel';
import {
  ChatHeader,
  ChatIntro,
  ChatSearchInput,
  DoctorScrollSection,
} from './chat';

type Mode = 'diagnosis' | 'symptom';

interface ChatPageProps {
  onNavigateBack: () => void;
  initialMessage?: string;
}

export function ChatPage({ onNavigateBack, initialMessage }: ChatPageProps) {
  const { isGuest, isMember, setRole } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [showSymptomSelection, setShowSymptomSelection] = useState(false);

  // initialMessage 전달 시 입력창에 자동 세팅
  useEffect(() => {
    if (initialMessage) {
      setInputValue(initialMessage);
    }
  }, [initialMessage]);

  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [showDoctorListModal, setShowDoctorListModal] = useState(false);
  const [doctorListData, setDoctorListData] = useState<{ doctors: any[], disease: string }>({ doctors: [], disease: '' });
  
  // Ref for doctor card scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // 병원 카드 펼침 상태 (메시지 ID별로 관리)
  const [expandedHospitals, setExpandedHospitals] = useState<Record<string, boolean>>({});
  
  // 토큰 제한 상태
  const [tokenCount, setTokenCount] = useState(0);
  const [showTokenLimitToast, setShowTokenLimitToast] = useState(false);
  
  // 토큰 제한 설정
  const TOKEN_LIMITS = {
    guest: 10, // 비회원: 10개 메시지
    member: 100, // 회원: 100개 메시지
  };
  
  const currentTokenLimit = isGuest ? TOKEN_LIMITS.guest : TOKEN_LIMITS.member;

  const {
    currentConversation,
    currentConversationId,
    groupedConversations,
    filter,
    startNewConversation,
    addMessage,
    loadConversation,
    deleteConversation,
    setFilter,
    addDoctorToConversation,
    setCurrentConversationId,
  } = useChatHistory();

  const {
    flowState,
    startFlow,
    answerQuestion,
    getCurrentQuestion,
    resetFlow,
  } = useSymptomFlow();

  // 모드 선택
  const handleModeSelect = (mode: Mode) => {
    setSelectedMode(mode);
    if (mode === 'diagnosis') {
      // 진단 모드 - 바로 대화 시작
      const convId = startNewConversation(mode);
      const aiMessage: Message = {
        id: generateMessageId(),
        sender: 'ai',
        text: '안녕하세요! AIGA 의료 AI입니다.\n어떤 증상이나 질환에 대해 상담하고 싶으신가요?',
        timestamp: new Date(),
      };
      addMessage(convId, aiMessage);
    } else {
      // 증상 모드는 기존과 동일
      const convId = startNewConversation(mode);
      setShowSymptomSelection(true);
      const aiMessage: Message = {
        id: generateMessageId(),
        sender: 'ai',
        text: '어떤 증상이 있으신가요? 아래에서 선택해주세요.',
        timestamp: new Date(),
      };
      addMessage(convId, aiMessage);
    }
  };

  // 증상 선택
  const handleSymptomSelect = (symptomId: string) => {
    if (!currentConversationId) return;

    const symptom = SYMPTOMS.find((s) => s.id === symptomId);
    if (!symptom) return;

    const userMessage: Message = {
      id: generateMessageId(),
      sender: 'user',
      text: symptom.name,
      timestamp: new Date(),
    };
    addMessage(currentConversationId, userMessage);

    startFlow(symptomId);
    setShowSymptomSelection(false);

    setTimeout(() => {
      const firstQuestion = symptom.questions[0];
      const aiMessage: Message = {
        id: generateMessageId(),
        sender: 'ai',
        text: firstQuestion,
        timestamp: new Date(),
        symptom: symptomId,
        questionIndex: 0,
      };
      addMessage(currentConversationId!, aiMessage);
    }, 500);
  };

  // 샘플 질문 클릭
  const handleSampleQuestionClick = (question: string) => {
    const convId = startNewConversation('diagnosis');
    
    // 인사 메시지
    const greetingMessage: Message = {
      id: generateMessageId(),
      sender: 'ai',
      text: '안녕하세요! AIGA 의료 AI입니다.\n어떤 증상이나 질환에 대해 상담하고 싶으신가요?',
      timestamp: new Date(),
    };
    addMessage(convId, greetingMessage);
    
    // 사용자 메시지 추가
    setTimeout(() => {
      const userMessage: Message = {
        id: generateMessageId(),
        sender: 'user',
        text: question,
        timestamp: new Date(),
      };
      addMessage(convId, userMessage);
      
      // AI 응답
      setTimeout(() => {
        const aiResponse: Message = {
          id: generateMessageId(),
          sender: 'ai',
          text: `네, "${question}"에 대해 상담해드리겠습니다. 구체적으로 어떤 부분이 궁금하신가요?`,
          timestamp: new Date(),
        };
        addMessage(convId, aiResponse);
      }, 500);
    }, 300);
  };

  // 메시지 전송
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // 토큰 제한 체크
    if (tokenCount >= currentTokenLimit) {
      setShowTokenLimitToast(true);
      return;
    }

    // 토큰 카운트 증가
    setTokenCount(prev => prev + 1);

    // 대화가 없으면 새로 시작
    let convId = currentConversationId;
    if (!convId) {
      const mode = selectedMode || 'diagnosis';
      convId = startNewConversation(mode);
      
      // 인사 메시지
      const greetingMessage: Message = {
        id: generateMessageId(),
        sender: 'ai',
        text: '안녕하세요! AIGA 의료 AI입니다.\n어떤 증상이나 질환에 대해 상담하고 싶으신가요?',
        timestamp: new Date(),
      };
      addMessage(convId, greetingMessage);
    }

    const userMessage: Message = {
      id: generateMessageId(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };
    addMessage(convId, userMessage);
    setInputValue('');

    // 증상 플로우 중이면 다음 질문
    if (flowState.currentSymptom && !flowState.isCompleted) {
      answerQuestion(inputValue);
      
      const nextQuestion = getCurrentQuestion();
      if (nextQuestion) {
        setTimeout(() => {
          const aiMessage: Message = {
            id: generateMessageId(),
            sender: 'ai',
            text: nextQuestion,
            timestamp: new Date(),
            symptom: flowState.currentSymptom!,
            questionIndex: flowState.currentQuestionIndex,
          };
          addMessage(convId, aiMessage);
        }, 500);
      } else {
        setTimeout(() => {
          const recommendationMessage: Message = {
            id: generateMessageId(),
            sender: 'ai',
            text: '',
            timestamp: new Date(),
            isHospitalRecommendation: true,
            hospitalInfo: {
              description: `${SYMPTOMS.find((s) => s.id === flowState.currentSymptom)?.name} 증상으로 다음 병원을 추천드립니다.`,
              doctors: DOCTORS.slice(0, 3),
              mapData: {
                coordinates: [37.5665, 126.9780],
                hospitalName: DOCTORS[0].hospital,
                address: '서울시 종로구',
              },
            },
          };
          addMessage(convId, recommendationMessage);
        }, 1000);
      }
    } else {
      // 일반 대화
      if (isHospitalRecommendationRequest(inputValue)) {
        const detectedDisease = detectDisease(inputValue);
        if (detectedDisease) {
          const recommendedHospitals = getRecommendedHospitals(detectedDisease);
          const recommendationText = generateHospitalRecommendationMessage(detectedDisease, recommendedHospitals);
          
          setTimeout(() => {
            const aiMessage: Message = {
              id: generateMessageId(),
              sender: 'ai',
              text: recommendationText,
              timestamp: new Date(),
              recommendedHospitals: recommendedHospitals,
            };
            addMessage(convId, aiMessage);
          }, 500);
        } else {
          setTimeout(() => {
            const aiMessage: Message = {
              id: generateMessageId(),
              sender: 'ai',
              text: '해당 질환에 대한 정보를 찾을 수 없습니다. 다른 질환을 입력해주세요.',
              timestamp: new Date(),
            };
            addMessage(convId, aiMessage);
          }, 500);
        }
      } else if (isDoctorRecommendationRequest(inputValue)) {
        const detectedDisease = detectDisease(inputValue);
        if (detectedDisease) {
          const recommendedDoctors = getRecommendedDoctorsByDisease(detectedDisease, DOCTORS);
          const recommendationText = generateDoctorRecommendationMessage(detectedDisease, recommendedDoctors);
          
          setTimeout(() => {
            const aiMessage: Message = {
              id: generateMessageId(),
              sender: 'ai',
              text: recommendationText,
              timestamp: new Date(),
              recommendedDoctors: recommendedDoctors,
              questionIntent: 'doctor-recommendation', // 질문 의도 추가
            };
            addMessage(convId, aiMessage);
          }, 500);
        } else {
          setTimeout(() => {
            const aiMessage: Message = {
              id: generateMessageId(),
              sender: 'ai',
              text: '해당 질환에 대한 정보를 찾을 수 없습니다. 다른 질환을 입력해주세요.',
              timestamp: new Date(),
            };
            addMessage(convId, aiMessage);
          }, 500);
        }
      } else if (isSymptomInquiry(inputValue)) {
        const detectedSymptom = detectSymptom(inputValue);
        if (detectedSymptom) {
          const responseText = generateSymptomResponseMessage(detectedSymptom);
          const recommendedDoctors = getRecommendedDoctorsBySymptom(detectedSymptom, DOCTORS);
          
          setTimeout(() => {
            const aiMessage: Message = {
              id: generateMessageId(),
              sender: 'ai',
              text: responseText,
              timestamp: new Date(),
              recommendedDoctors: recommendedDoctors,
              questionIntent: 'symptom', // 질문 의도 추가
            };
            addMessage(convId, aiMessage);
          }, 500);
        } else {
          setTimeout(() => {
            const aiMessage: Message = {
              id: generateMessageId(),
              sender: 'ai',
              text: '해당 증상에 대한 정보를 찾을 수 없습니다. 다른 증상을 입력해주세요.',
              timestamp: new Date(),
            };
            addMessage(convId, aiMessage);
          }, 500);
        }
      } else {
        // 질환명 감지 - 대화형 응답
        const detectedDisease = detectDisease(inputValue);
        if (detectedDisease) {
          setTimeout(() => {
            const aiMessage: Message = {
              id: generateMessageId(),
              sender: 'ai',
              text: `${detectedDisease}에 대해 상담해드리겠습니다.\n\n어떤 부분이 가장 궁금하신가요?\n\n• 병원/명의 추천\n• 수술 방법 및 치료 과정\n• 치료 비용 및 기간\n• 재발 방지 및 관리 방법\n\n구체적으로 말씀해주시면 더 정확한 정보를 제공해드릴 수 있습니다.`,
              timestamp: new Date(),
              questionIntent: 'disease-info', // 질문 의도 추가
            };
            addMessage(convId, aiMessage);
          }, 500);
        } else {
          setTimeout(() => {
            const aiMessage: Message = {
              id: generateMessageId(),
              sender: 'ai',
              text: '네, 잘 알겠습니다. 더 궁금하신 점이 있으시면 편하게 질문해주세요.',
              timestamp: new Date(),
            };
            addMessage(convId, aiMessage);
          }, 500);
        }
      }
    }
  };

  // 의사 프로필 열기 핸들러 (대화에 의사 추가)
  const handleDoctorClick = (doctor: any) => {
    console.log('👨‍⚕️ [handleDoctorClick] doctor:', doctor);
    console.log('👨‍⚕️ [handleDoctorClick] currentConversationId:', currentConversationId);
    
    setSelectedDoctor(doctor);
    
    // 현재 대화가 없으면 새 대화 시작
    if (!currentConversationId) {
      console.log('👨‍⚕️ [handleDoctorClick] No active conversation, creating new one');
      const newConvId = startNewConversation('diagnosis');
      
      // 인사 메시지
      const greetingMessage: Message = {
        id: generateMessageId(),
        sender: 'ai',
        text: '안녕하세요! AIGA 의료 AI입니다.\n어떤 증상이나 질환에 대해 상담하고 싶으신가요?',
        timestamp: new Date(),
      };
      addMessage(newConvId, greetingMessage);
      
      // 의사를 대화에 추가
      if (doctor.id) {
        console.log('👨‍⚕️ [handleDoctorClick] Adding doctor to new conversation:', doctor.id);
        setTimeout(() => {
          addDoctorToConversation(newConvId, doctor.id);
        }, 100);
      }
    } else if (doctor.id) {
      // 현재 대화가 있으면 해당 대화에 의사 추가
      console.log('👨‍⚕️ [handleDoctorClick] Adding doctor to existing conversation:', doctor.id);
      addDoctorToConversation(currentConversationId, doctor.id);
    } else {
      console.warn('⚠️ [handleDoctorClick] Missing doctor.id');
    }
  };

  // 의사 저장 시 대화에 추가
  const handleDoctorSaved = (doctorId: string) => {
    console.log('💾 [handleDoctorSaved] doctorId:', doctorId, 'currentConversationId:', currentConversationId);
    if (currentConversationId) {
      addDoctorToConversation(currentConversationId, doctorId);
      console.log('✅ [handleDoctorSaved] Doctor added to conversation');
    } else {
      console.warn('⚠️ [handleDoctorSaved] No active conversation');
    }
  };

  // 의사 목록 열기 핸들러
  const handleOpenDoctorList = (disease: string) => {
    const recommendedDoctors = getRecommendedDoctorsByDisease(disease, DOCTORS);
    setDoctorListData({ doctors: recommendedDoctors, disease: disease });
    setShowDoctorListModal(true);
  };

  // 대화 로드 시 스크롤 처리
  useEffect(() => {
    const scrollToDoctorId = sessionStorage.getItem('scrollToDoctorId');
    if (scrollToDoctorId && currentConversation) {
      // 약간의 딜레이 후 스크롤 (DOM 렌더링 대기)
      setTimeout(() => {
        const doctorCard = document.querySelector(`[data-doctor-id="${scrollToDoctorId}"]`);
        if (doctorCard) {
          doctorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // 강조 효과
          doctorCard.classList.add('ring-4', 'ring-blue-400', 'ring-offset-2');
          setTimeout(() => {
            doctorCard.classList.remove('ring-4', 'ring-blue-400', 'ring-offset-2');
          }, 2000);
        }
        // 스크롤 타겟 제거
        sessionStorage.removeItem('scrollToDoctorId');
      }, 300);
    }
  }, [currentConversation]);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header - 채팅 영역 너비에 맞춤 */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto flex items-center gap-3 p-4">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={onNavigateBack}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* 기존 헤더 */}
          <div className="flex-1">
            <ChatHeader onMenuClick={() => setSidebarOpen(true)} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {!currentConversation ? (
          // Initial State (Empty Chat)
          <div className="max-w-3xl mx-auto">
            {/* Intro Section */}
            <ChatIntro />
          </div>
        ) : (
          // Chat Messages
          <div className="max-w-3xl mx-auto p-4 space-y-4">
            {currentConversation.messages.map((message, index) => (
              <div
                key={`${message.id}-${index}`}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' ? (
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🤖</span>
                    </div>
                    <div className="space-y-2">
                      {message.text && (
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-200">
                          <p className="text-gray-900 whitespace-pre-line">{message.text}</p>
                        </div>
                      )}

                      {message.isHospitalRecommendation && message.hospitalInfo && (
                        <>
                          {message.hospitalInfo.description && (
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                              <p className="text-gray-900">{message.hospitalInfo.description}</p>
                            </div>
                          )}
                          {message.hospitalInfo.doctors && (
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                              <h4 className="font-medium text-gray-900 mb-3">추천 의료진</h4>
                              <HorizontalDoctorList
                                doctors={message.hospitalInfo.doctors}
                                onDoctorClick={handleDoctorClick}
                              />
                            </div>
                          )}
                          {message.hospitalInfo.mapData && (
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                              <h4 className="font-medium text-gray-900 mb-3">위치</h4>
                              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                <p className="text-gray-500">지도 영역 (react-leaflet)</p>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* 병원 추천 카드 */}
                      {message.recommendedHospitals && message.recommendedHospitals.length > 0 && (() => {
                        const isExpanded = expandedHospitals[message.id] || false;
                        const displayHospitals = isExpanded ? message.recommendedHospitals : message.recommendedHospitals.slice(0, 2);
                        const hasMore = message.recommendedHospitals.length > 2;
                        
                        return (
                          <div className="w-full">
                            <div className="grid grid-cols-2 gap-3">
                              {displayHospitals.map((hospital) => (
                                <HospitalChatCard
                                  key={hospital.id}
                                  hospital={hospital}
                                />
                              ))}
                            </div>
                            {hasMore && (
                              <div className="flex justify-end mt-2">
                                <button
                                  onClick={() => {
                                    setExpandedHospitals(prev => ({
                                      ...prev,
                                      [message.id]: !prev[message.id]
                                    }));
                                  }}
                                  className="text-sm text-gray-600 font-medium px-4 py-1.5 hover:text-gray-900 transition-colors flex items-center gap-1 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                  {isExpanded ? '접기' : '펼치기'}
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round" 
                                      strokeWidth={2} 
                                      d={isExpanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                                    />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* 의사 추천 카드 */}
                      {message.recommendedDoctors && message.recommendedDoctors.length > 0 && message.questionIntent === 'doctor-recommendation' && (
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                          <DoctorGridList
                            doctors={message.recommendedDoctors}
                            onDoctorClick={handleDoctorClick}
                            onShowMore={() => handleOpenDoctorList('폐암')}
                            showMoreLabel="폐암 전체 보기"
                            maxDisplay={3}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
                    <p>{message.text}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Symptom Selection */}
            {showSymptomSelection && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[90%]">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🤖</span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {SYMPTOMS.map((symptom) => (
                        <SymptomSelectionCard
                          key={symptom.id}
                          id={symptom.id}
                          name={symptom.name}
                          icon={symptom.icon}
                          onClick={handleSymptomSelect}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 면책 조항 */}
            {currentConversation.messages.length > 0 && (
              <div className="mt-6 px-4 py-3 bg-gray-100 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-600 text-center">
                  ⚠️ 본 상담은 의학적 진단이나 치료를 대체할 수 없으며, 참고용으로만 활용해주세요.
                  정확한 진단과 치료는 반드시 의료기관을 방문하여 받으시기 바랍니다.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area - Always visible at bottom */}
      <ChatSearchInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSendMessage}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        groupedConversations={groupedConversations}
        currentConversationId={currentConversationId}
        filter={filter}
        onFilterChange={setFilter}
        onConversationSelect={loadConversation}
        onDeleteConversation={deleteConversation}
      />

      {/* Doctor Detail Modal */}
      {selectedDoctor && (
        <DoctorProfileModal
          doctor={selectedDoctor}
          isOpen={!!selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          currentConversationId={currentConversationId}
          onDoctorSaved={handleDoctorSaved}
        />
      )}

      {/* Hospital Detail Modal */}
      {selectedHospital && (
        <HospitalDetailModal
          hospital={selectedHospital}
          isOpen={!!selectedHospital}
          onClose={() => setSelectedHospital(null)}
        />
      )}

      {/* Doctor List Modal */}
      <DoctorListModal
        isOpen={showDoctorListModal}
        onClose={() => setShowDoctorListModal(false)}
        doctors={doctorListData.doctors}
        disease={doctorListData.disease}
        onDoctorClick={handleDoctorClick}
      />

      {/* Token Limit Toast */}
      <TokenLimitToast
        isOpen={showTokenLimitToast}
        onClose={() => setShowTokenLimitToast(false)}
        onLogin={() => {
          setRole('member');
          setShowTokenLimitToast(false);
        }}
        currentCount={tokenCount}
        limit={currentTokenLimit}
      />

      {/* Debug Panel */}
      <DebugPanel />
    </div>
  );
}