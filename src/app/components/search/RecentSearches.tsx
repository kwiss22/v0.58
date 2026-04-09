import { X } from 'lucide-react';

interface RecentSearchesProps {
  items: string[];
  onSelect: (term: string) => void;
  onDelete: (term: string) => void;
  onClearAll: () => void;
}

export function RecentSearches({ items, onSelect, onDelete, onClearAll }: RecentSearchesProps) {
  return (
    <div className="animate-fadeIn space-y-3">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">최근 검색어</span>
        {items.length > 0 && (
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClearAll}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            전체 삭제
          </button>
        )}
      </div>

      {/* 태그 목록 — 빈 상태도 줄 높이 유지 */}
      <div className="flex flex-wrap gap-2 min-h-[36px]">
        {items.length === 0 ? (
          <span className="text-sm text-gray-400 self-center">최근 검색어가 없습니다</span>
        ) : (
          items.map((term) => (
            <div
              key={term}
              className="flex items-center gap-1 pl-3 pr-2 h-9 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSelect(term)}
                className="text-sm text-gray-700"
              >
                {term}
              </button>
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onDelete(term)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
                aria-label={`"${term}" 삭제`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}