// 증상 체크 플로우 관리 훅

import { useState, useCallback } from 'react';
import { getSymptomQuestions } from '@/constants/symptom-data';

export interface SymptomFlowState {
  currentSymptom: string | null;
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  isCompleted: boolean;
}

export const useSymptomFlow = () => {
  const [flowState, setFlowState] = useState<SymptomFlowState>({
    currentSymptom: null,
    currentQuestionIndex: 0,
    answers: {},
    isCompleted: false,
  });

  const startFlow = useCallback((symptomId: string) => {
    setFlowState({
      currentSymptom: symptomId,
      currentQuestionIndex: 0,
      answers: { [symptomId]: [] },
      isCompleted: false,
    });
  }, []);

  const answerQuestion = useCallback((answer: string) => {
    setFlowState((prev) => {
      if (!prev.currentSymptom) return prev;

      const symptomAnswers = prev.answers[prev.currentSymptom] || [];
      const updatedAnswers = [...symptomAnswers, answer];
      const questions = getSymptomQuestions(prev.currentSymptom);
      const nextIndex = prev.currentQuestionIndex + 1;
      const isCompleted = nextIndex >= questions.length;

      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        answers: {
          ...prev.answers,
          [prev.currentSymptom]: updatedAnswers,
        },
        isCompleted,
      };
    });
  }, []);

  const getCurrentQuestion = useCallback((): string | null => {
    if (!flowState.currentSymptom) return null;
    const questions = getSymptomQuestions(flowState.currentSymptom);
    return questions[flowState.currentQuestionIndex] || null;
  }, [flowState]);

  const resetFlow = useCallback(() => {
    setFlowState({
      currentSymptom: null,
      currentQuestionIndex: 0,
      answers: {},
      isCompleted: false,
    });
  }, []);

  const getProgress = useCallback((): number => {
    if (!flowState.currentSymptom) return 0;
    const questions = getSymptomQuestions(flowState.currentSymptom);
    return (flowState.currentQuestionIndex / questions.length) * 100;
  }, [flowState]);

  return {
    flowState,
    startFlow,
    answerQuestion,
    getCurrentQuestion,
    resetFlow,
    getProgress,
  };
};
