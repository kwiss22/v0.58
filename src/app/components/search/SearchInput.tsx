import { useRef, useCallback } from 'react';
import { X, Lock } from 'lucide-react';
import svgPaths from "@/imports/svg-uvm3b20zif";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (query: string) => void;
  onFocusChange?: (focused: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  onDisabledClick?: () => void;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  onFocusChange,
  placeholder = '질환명, 병원명, 의사명 검색',
  disabled = false,
  onDisabledClick,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && value.trim()) {
        onSearch?.(value.trim());
        onFocusChange?.(false);
        inputRef.current?.blur();
      }
      if (e.key === 'Escape') {
        onFocusChange?.(false);
        inputRef.current?.blur();
      }
    },
    [value, onSearch, onFocusChange]
  );

  const handleClear = useCallback(() => {
    onChange('');
    inputRef.current?.focus();
  }, [onChange]);

  // ── 잠금 상태 ──
  if (disabled) {
    return (
      <button
        type="button"
        onClick={onDisabledClick}
        className="relative w-full h-11 pl-11 pr-10 bg-gray-100 rounded-2xl flex items-center text-left cursor-pointer"
      >
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <g>
              <path d={svgPaths.pcddfd00} stroke="#CBD5E1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              <path d="M17.5 17.5L13.9167 13.9167" stroke="#CBD5E1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </g>
          </svg>
        </div>
        <span className="flex-1 text-sm text-gray-400 select-none">오늘 검색 횟수를 모두 사용했어요</span>
        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
      </button>
    );
  }

  return (
    <div className="relative">
      {/* Search Icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g>
            <path
              d={svgPaths.pcddfd00}
              stroke="#99A1AF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.66667"
            />
            <path
              d="M17.5 17.5L13.9167 13.9167"
              stroke="#99A1AF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.66667"
            />
          </g>
        </svg>
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => onFocusChange?.(true)}
        onBlur={() => onFocusChange?.(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full h-11 pl-11 pr-10 bg-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />

      {/* Clear Button */}
      {value && (
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="검색어 지우기"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}