// 의사 전체 리스트 모달

import { X, Star, MapPin, User } from 'lucide-react';
import { Doctor } from '@/types/chat.types';
import { useState } from 'react';

interface DoctorListModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctors: Doctor[];
  disease: string;
  onDoctorClick: (doctor: Doctor) => void;
}

type SortType = 'experience' | 'distance';

export function DoctorListModal({
  isOpen,
  onClose,
  doctors,
  disease,
  onDoctorClick,
}: DoctorListModalProps) {
  const [sortType, setSortType] = useState<SortType>('experience');

  if (!isOpen) return null;

  // 정렬
  const sortedDoctors = [...doctors].sort((a, b) => {
    if (sortType === 'experience') {
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    } else {
      const distA = parseFloat(a.distance?.replace('km', '') || '999');
      const distB = parseFloat(b.distance?.replace('km', '') || '999');
      return distA - distB;
    }
  });

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">{disease} 명의</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setSortType('experience')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                sortType === 'experience'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              환자 경험
            </button>
            <button
              onClick={() => setSortType('distance')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                sortType === 'distance'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              거리순
            </button>
          </div>
        </div>

        {/* Doctor List */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-4 space-y-3">
            {sortedDoctors.map((doctor) => (
              <button
                key={doctor.id}
                onClick={() => {
                  onDoctorClick(doctor);
                  onClose();
                }}
                data-doctor-id={doctor.id}
                className="w-full bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
              >
                <div className="flex gap-4">
                  {/* Profile Image */}
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    {/* Hospital */}
                    <p className="text-sm text-teal-600 font-semibold mb-1">
                      {doctor.hospital}
                    </p>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {doctor.name}
                    </h3>

                    {/* Tags */}
                    {doctor.tags && doctor.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {doctor.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      {doctor.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-gray-400">({doctor.reviewCount})</span>
                        </div>
                      )}
                      {doctor.distance && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{doctor.distance}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}