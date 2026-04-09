import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type SortOption = 'distance' | 'patient' | 'doctor';

interface ResultsHeaderProps {
  count: number;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS = [
  { value: 'distance' as SortOption, label: '거리순' },
  { value: 'patient' as SortOption, label: '환자 경험' },
  { value: 'doctor' as SortOption, label: '동료의사 추천' },
];

export function ResultsHeader({ count, currentSort, onSortChange }: ResultsHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentSortLabel = SORT_OPTIONS.find(opt => opt.value === currentSort)?.label || '거리순';

  const handleSortChange = (sort: SortOption) => {
    onSortChange(sort);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600">총 {count}명의 명의</p>
      
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="font-medium">{currentSortLabel}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* 드롭다운 메뉴 */}
        {isOpen && (
          <>
            {/* 배경 오버레이 */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* 메뉴 */}
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                    currentSort === option.value
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {currentSort === option.value && (
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}