import { PenSquare } from 'lucide-react';

interface WriteButtonProps {
  onClick: () => void;
}

export function WriteButton({ onClick }: WriteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-14 h-14 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center z-20"
      aria-label="글쓰기"
    >
      <PenSquare className="w-6 h-6 text-white" />
    </button>
  );
}
