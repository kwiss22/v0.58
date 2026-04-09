// 대화 목록 사이드바

import { X, MessageSquare, FileText, Activity, UserCheck } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DOCTORS } from '@/constants/doctor-data';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  groupedConversations: {
    today: any[];
    yesterday: any[];
    thisWeek: any[];
    older: any[];
  };
  currentConversationId: string | null;
  filter: 'all' | 'diagnosis' | 'symptom' | 'recommended-doctors';
  onFilterChange: (filter: 'all' | 'diagnosis' | 'symptom' | 'recommended-doctors') => void;
  onConversationSelect: (id: string, scrollToDoctorId?: string) => void;
  onDeleteConversation: (id: string) => void;
}

export function Sidebar({
  isOpen,
  onClose,
  groupedConversations,
  currentConversationId,
  filter,
  onFilterChange,
  onConversationSelect,
  onDeleteConversation,
}: SidebarProps) {
  if (!isOpen) return null;

  const renderGroup = (title: string, conversations: any[]) => {
    if (conversations.length === 0) return null;

    // 저장된 의사 정보 가져오기
    const getSavedDoctors = () => {
      const savedDoctorsJson = localStorage.getItem('savedDoctors');
      if (!savedDoctorsJson) return [];
      return JSON.parse(savedDoctorsJson);
    };

    const savedDoctors = getSavedDoctors();

    return (
      <div key={title} className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
          {title}
        </h3>
        <div className="space-y-1">
          {conversations.map((conv) => {
            // 이 대화에서 저장된 의사 찾기
            const mentionedSavedDoctors = conv.mentionedDoctorIds
              ? conv.mentionedDoctorIds
                  .map((docId: string) => DOCTORS.find(d => d.id === docId))
                  .filter((doc: any) => doc && savedDoctors.some((saved: any) => saved.id === doc.id))
              : [];

            // 추천 의사 필터일 때는 첫 번째 저장된 의사로 스크롤
            const scrollToDoctorId = filter === 'recommended-doctors' && mentionedSavedDoctors.length > 0
              ? mentionedSavedDoctors[0].id
              : undefined;
            
            return (
              <button
                key={conv.id}
                onClick={() => {
                  onConversationSelect(conv.id, scrollToDoctorId);
                  onClose();
                }}
                className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors text-left ${
                  currentConversationId === conv.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                {/* 기본 아이콘 */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 bg-gradient-to-br from-blue-100 to-teal-100">
                  {conv.mode === 'diagnosis' ? (
                    <FileText className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Activity className="w-5 h-5 text-green-600" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* 저장된 의사 표시 (추천 의사 필터일 때) */}
                  {filter === 'recommended-doctors' && mentionedSavedDoctors.length > 0 && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                      <p className="text-xs font-semibold text-blue-700">
                        {mentionedSavedDoctors.map((doc: any) => doc.name).join(', ')}
                      </p>
                    </div>
                  )}
                  
                  {/* 대화 제목 */}
                  <p className="font-medium text-gray-900 text-sm line-clamp-2 leading-snug">
                    {conv.title}
                  </p>
                  
                  {/* 시간 */}
                  <p className="text-xs text-gray-400 mt-1">
                    {format(conv.lastMessageTime, 'PP HH:mm', { locale: ko })}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-gray-900">대화 목록</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4">
          {renderGroup('오늘', groupedConversations.today)}
          {renderGroup('어제', groupedConversations.yesterday)}
          {renderGroup('이번 주', groupedConversations.thisWeek)}
          {renderGroup('이전', groupedConversations.older)}

          {Object.values(groupedConversations).every((group) => group.length === 0) && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">대화 내역이 없습니다.</p>
              <p className="text-sm text-gray-400 mt-1">
                새로운 상담을 시작해보세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}