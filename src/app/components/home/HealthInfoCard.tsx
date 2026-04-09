interface HealthInfoCardProps {
  title: string;
  description: string;
  timeAgo?: string;
  onClick?: () => void;
}

export function HealthInfoCard({ title, description, timeAgo = '2분 전', onClick }: HealthInfoCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-5 flex gap-4 hover:shadow-md transition-shadow text-left"
    >
      {/* Thumbnail */}
      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-base font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-sm text-gray-600 line-clamp-1 mb-2">{description}</p>
        <span className="text-xs text-gray-400">{timeAgo}</span>
      </div>
    </button>
  );
}
