import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  showMore?: boolean;
  onMoreClick?: () => void;
}

export function SectionHeader({ title, showMore = false, onMoreClick }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      {showMore && (
        <button
          onClick={onMoreClick}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          더보기
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
