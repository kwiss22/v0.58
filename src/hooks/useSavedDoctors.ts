// 저장한 의료진 관리 훅

import { useState, useEffect, useCallback } from 'react';

export interface SavedDoctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  experience?: string;
  education?: string;
  savedAt: Date;
}

const STORAGE_KEY = 'savedDoctors';

export function useSavedDoctors() {
  const [savedDoctors, setSavedDoctors] = useState<SavedDoctor[]>([]);

  // localStorage에서 로드하는 함수
  const loadDoctorsFromStorage = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Date 객체로 복원
        const doctors = parsed.map((doc: any) => ({
          ...doc,
          savedAt: new Date(doc.savedAt),
        }));
        console.log('📖 [Load] Loaded doctors from storage:', doctors);
        setSavedDoctors(doctors);
      } catch (error) {
        console.error('Failed to load saved doctors:', error);
      }
    } else {
      console.log('📖 [Load] No doctors in storage');
      setSavedDoctors([]);
    }
  }, []);

  // 초기 로드
  useEffect(() => {
    loadDoctorsFromStorage();
  }, [loadDoctorsFromStorage]);

  // storage 이벤트 리스너 (다른 탭에서 변경 감지)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        console.log('🔄 [Storage] Storage changed, reloading...');
        loadDoctorsFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadDoctorsFromStorage]);

  // localStorage에 저장
  const saveDoctorsToStorage = (doctors: SavedDoctor[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(doctors));
      console.log('💾 [Storage] Saved to localStorage:', doctors);
    } catch (error) {
      console.error('Failed to save doctors:', error);
    }
  };

  // 의사 저장
  const saveDoctor = (doctor: Omit<SavedDoctor, 'savedAt'>) => {
    // 이미 저장되어 있는지 확인
    if (savedDoctors.some(d => d.id === doctor.id)) {
      console.log('⚠️ [Save] Already saved:', doctor.id);
      return false; // 이미 저장됨
    }

    const newDoctor: SavedDoctor = {
      ...doctor,
      savedAt: new Date(),
    };

    console.log('✅ [Save] Saving new doctor:', newDoctor);
    const updated = [...savedDoctors, newDoctor];
    setSavedDoctors(updated);
    saveDoctorsToStorage(updated);
    return true;
  };

  // 의사 삭제
  const removeDoctor = (doctorId: string) => {
    console.log('🗑️ [Delete] Removing doctor:', doctorId);
    const updated = savedDoctors.filter(d => d.id !== doctorId);
    setSavedDoctors(updated);
    saveDoctorsToStorage(updated);
  };

  // 저장 여부 확인
  const isSaved = (doctorId: string) => {
    const saved = savedDoctors.some(d => d.id === doctorId);
    console.log('🔍 [Check] isSaved:', doctorId, '→', saved);
    return saved;
  };

  // 토글 (저장/삭제)
  const toggleSave = (doctor: Omit<SavedDoctor, 'savedAt'>) => {
    console.log('🔄 [Toggle] Toggling save for:', doctor.id);
    if (isSaved(doctor.id)) {
      removeDoctor(doctor.id);
      return false;
    } else {
      saveDoctor(doctor);
      return true;
    }
  };

  return {
    savedDoctors,
    saveDoctor,
    removeDoctor,
    isSaved,
    toggleSave,
  };
}