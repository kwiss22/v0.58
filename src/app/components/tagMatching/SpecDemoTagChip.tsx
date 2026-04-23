import type { CSSProperties } from 'react';

type SpecDemoTagChipProps = {
  tagId: string;
  onNavigate: (tagId: string) => void;
  className?: string;
  style?: CSSProperties;
};

/** 데모 화면 PPT/Figma 스타일 번호 — 탭 시 화면정의서 동일 번호 블록으로 스크롤 */
export function SpecDemoTagChip({ tagId, onNavigate, className = '', style }: SpecDemoTagChipProps) {
  return (
    <button
      type="button"
      data-demo-tag={tagId}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onNavigate(tagId);
      }}
      className={`pointer-events-auto absolute z-20 flex h-7 min-w-[1.75rem] items-center justify-center rounded-full border-2 border-white bg-slate-900 px-1.5 text-[10px] font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-slate-800 ${className}`}
      title={`${tagId} — 화면정의서로 이동`}
      aria-label={`${tagId} 화면정의서로 이동`}
    >
      {tagId}
    </button>
  );
}
