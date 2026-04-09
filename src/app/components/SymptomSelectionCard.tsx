// 증상 선택 카드 컴포넌트

interface SymptomSelectionCardProps {
  id: string;
  name: string;
  icon: string;
  onClick: (id: string) => void;
}

export function SymptomSelectionCard({
  id,
  name,
  icon,
  onClick,
}: SymptomSelectionCardProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className="flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
    >
      <div className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full text-4xl">
        {icon}
      </div>
      <span className="font-medium text-gray-900">{name}</span>
    </button>
  );
}
