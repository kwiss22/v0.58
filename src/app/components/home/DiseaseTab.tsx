interface DiseaseTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function DiseaseTab({ label, isActive, onClick }: DiseaseTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-bold transition-all shadow-sm ${
        isActive
          ? 'bg-blue-100 text-blue-600 shadow-md'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}