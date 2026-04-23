import type { CSSProperties } from 'react';
import type { HomeDemoTagId } from './homeTabTagRegistry';
import { SpecDemoTagChip } from './SpecDemoTagChip';

type HomeDemoTagChipProps = {
  tagId: HomeDemoTagId;
  onNavigate: (tagId: HomeDemoTagId) => void;
  className?: string;
  style?: CSSProperties;
};

/** @deprecated SpecDemoTagChip 직접 사용 가능 — 홈 탭 H01~H06 전용 타입 래퍼 */
export function HomeDemoTagChip({ tagId, onNavigate, className = '', style }: HomeDemoTagChipProps) {
  return (
    <SpecDemoTagChip
      tagId={tagId}
      onNavigate={(id) => onNavigate(id as HomeDemoTagId)}
      className={className}
      style={style}
    />
  );
}
