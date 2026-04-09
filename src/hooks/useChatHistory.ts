// 대화 이력 관리 훅

import { useState, useCallback, useMemo, useEffect } from 'react';
import { ConversationHistory, Message, ChatMode } from '@/types/chat.types';
import { generateConversationId } from '@/utils/generate-id';
import { 
  isToday, 
  isYesterday, 
  isThisWeek, 
  format, 
  startOfWeek, 
  endOfWeek 
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { summarizeQuery } from '@/utils/extract-disease';

type FilterType = 'all' | 'diagnosis' | 'symptom' | 'recommended-doctors';

const CONVERSATIONS_STORAGE_KEY = 'aiga_conversations';

export const useChatHistory = () => {
  // localStorage에서 대화 복원
  const getInitialConversations = (): ConversationHistory[] => {
    try {
      const stored = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Date 객체 복원
        return parsed.map((conv: any) => ({
          ...conv,
          lastMessageTime: new Date(conv.lastMessageTime),
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));
      }
    } catch (error) {
      console.error('Failed to load conversations from localStorage:', error);
    }
    return [];
  };

  const [conversations, setConversations] = useState<ConversationHistory[]>(getInitialConversations);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  // conversations가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
      console.log('💾 [Storage] Conversations saved to localStorage:', conversations.length);
    } catch (error) {
      console.error('Failed to save conversations to localStorage:', error);
    }
  }, [conversations]);

  // 새 대화 시작
  const startNewConversation = useCallback((mode: ChatMode, initialMessage?: Message) => {
    const newConversation: ConversationHistory = {
      id: generateConversationId(),
      title: mode === 'diagnosis' ? '새 질환 상담' : '새 증상 상담',
      mode,
      lastMessageTime: new Date(),
      messages: initialMessage ? [initialMessage] : [],
    };

    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    
    return newConversation.id;
  }, []);

  // 메시지 추가
  const addMessage = useCallback((conversationId: string, message: Message) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          const updatedMessages = [...conv.messages, message];
          
          // 첫 사용자 메시지로 타이틀 자동 생성 (AI 인사말 이후 첫 사용자 메시지)
          const userMessages = updatedMessages.filter(m => m.sender === 'user');
          if (userMessages.length === 1 && message.sender === 'user') {
            // 타이틀을 깔끔하게 정리
            let title = message.text.trim();
            
            // 너무 긴 경우 요약
            if (title.length > 50) {
              title = summarizeQuery(title);
            }
            
            return {
              ...conv,
              title: title,
              messages: updatedMessages,
              lastMessageTime: message.timestamp,
            };
          }

          return {
            ...conv,
            messages: updatedMessages,
            lastMessageTime: message.timestamp,
          };
        }
        return conv;
      })
    );
  }, []);

  // 대화 불러오기
  const loadConversation = useCallback((conversationId: string, scrollToDoctorId?: string) => {
    setCurrentConversationId(conversationId);
    
    // 스크롤 타겟이 있으면 저장
    if (scrollToDoctorId) {
      sessionStorage.setItem('scrollToDoctorId', scrollToDoctorId);
    }
  }, []);

  // 대화 삭제
  const deleteConversation = useCallback((conversationId: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== conversationId));
    if (currentConversationId === conversationId) {
      setCurrentConversationId(null);
    }
  }, [currentConversationId]);

  // 대화에 의사 추가 (의사 프로필 조회 시)
  const addDoctorToConversation = useCallback((conversationId: string, doctorId: string) => {
    console.log('➕ [addDoctorToConversation] Called with:', { conversationId, doctorId });
    
    setConversations((prev) => {
      const updated = prev.map((conv) => {
        if (conv.id === conversationId) {
          const currentDoctorIds = conv.mentionedDoctorIds || [];
          console.log('➕ [addDoctorToConversation] Current mentionedDoctorIds:', currentDoctorIds);
          
          if (!currentDoctorIds.includes(doctorId)) {
            const newIds = [...currentDoctorIds, doctorId];
            console.log('➕ [addDoctorToConversation] Updated mentionedDoctorIds:', newIds);
            
            return {
              ...conv,
              mentionedDoctorIds: newIds,
            };
          } else {
            console.log('➕ [addDoctorToConversation] Doctor already in list');
          }
        }
        return conv;
      });
      
      console.log('➕ [addDoctorToConversation] All conversations after update:', updated);
      return updated;
    });
  }, []);

  // 현재 대화 가져오기
  const currentConversation = useMemo(() => {
    return conversations.find((conv) => conv.id === currentConversationId) || null;
  }, [conversations, currentConversationId]);

  // 필터링된 대화 목록
  const filteredConversations = useMemo(() => {
    console.log('🔍 [Filter] Current filter:', filter);
    console.log('🔍 [Filter] Total conversations:', conversations.length);
    
    if (filter === 'all') return conversations;
    
    if (filter === 'recommended-doctors') {
      // 마이페이지에 저장된 의사 ID 목록 가져오기
      const savedDoctorsJson = localStorage.getItem('savedDoctors');
      console.log('🔍 [Filter] savedDoctorsJson:', savedDoctorsJson);
      
      if (!savedDoctorsJson) {
        console.log('🔍 [Filter] No saved doctors found');
        return [];
      }
      
      const savedDoctors = JSON.parse(savedDoctorsJson);
      const savedDoctorIds = savedDoctors.map((doc: any) => doc.id);
      console.log('🔍 [Filter] savedDoctorIds:', savedDoctorIds);
      
      // 모든 대화의 mentionedDoctorIds 확인
      console.log('🔍 [Filter] All conversations with mentionedDoctorIds:');
      conversations.forEach(conv => {
        console.log(`  - ${conv.id} (${conv.title}): mentionedDoctorIds =`, conv.mentionedDoctorIds);
      });
      
      // 저장한 의사가 언급된 대화만 필터링
      const filtered = conversations.filter((conv) => {
        if (!conv.mentionedDoctorIds || conv.mentionedDoctorIds.length === 0) {
          console.log(`🔍 [Filter] ❌ ${conv.id} - No mentionedDoctorIds`);
          return false;
        }
        
        // 저장한 의사 중 하나라도 대화에 포함되어 있으면 true
        const hasMatch = conv.mentionedDoctorIds.some(docId => {
          const match = savedDoctorIds.includes(docId);
          console.log(`🔍 [Filter] Comparing docId="${docId}" with savedDoctorIds, match:`, match);
          return match;
        });
        
        if (hasMatch) {
          console.log(`🔍 [Filter] ✅ ${conv.id} - MATCH!`);
        } else {
          console.log(`🔍 [Filter] ❌ ${conv.id} - No match`);
        }
        
        return hasMatch;
      });
      
      console.log('🔍 [Filter] Final filtered conversations:', filtered.length);
      return filtered;
    }
    
    return conversations.filter((conv) => conv.mode === filter);
  }, [conversations, filter]);

  // 날짜별 그룹핑
  const groupedConversations = useMemo(() => {
    const groups: {
      today: ConversationHistory[];
      yesterday: ConversationHistory[];
      thisWeek: ConversationHistory[];
      older: ConversationHistory[];
    } = {
      today: [],
      yesterday: [],
      thisWeek: [],
      older: [],
    };

    filteredConversations.forEach((conv) => {
      const date = conv.lastMessageTime;
      
      if (isToday(date)) {
        groups.today.push(conv);
      } else if (isYesterday(date)) {
        groups.yesterday.push(conv);
      } else if (isThisWeek(date, { weekStartsOn: 1 })) {
        groups.thisWeek.push(conv);
      } else {
        groups.older.push(conv);
      }
    });

    return groups;
  }, [filteredConversations]);

  // 대화 제목 업데이트
  const updateConversationTitle = useCallback((conversationId: string, title: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, title } : conv
      )
    );
  }, []);

  return {
    conversations,
    currentConversation,
    currentConversationId,
    filteredConversations,
    groupedConversations,
    filter,
    startNewConversation,
    addMessage,
    loadConversation,
    deleteConversation,
    updateConversationTitle,
    addDoctorToConversation,
    setFilter,
    setCurrentConversationId,
  };
};