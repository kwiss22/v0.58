import { ChevronRight, MapPin, User } from "lucide-react";

interface DoctorCardProps {
  id: string;
  name: string;
  hospital: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  distance: string;
  tags: string[];
  image?: string;
  verified?: boolean;
  onClick?: () => void;
  showDistance?: boolean;
}

export function DoctorCard({
  name,
  hospital,
  specialty,
  rating,
  reviewCount,
  distance,
  tags,
  image,
  verified = false,
  onClick,
  showDistance = true,
}: DoctorCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
    >
      {/* Profile Image */}
      <div className="w-20 h-20 rounded-2xl bg-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
        <User className="w-10 h-10 text-gray-400" />
      </div>

      {/* Content */}
      <div className="flex-1 text-left space-y-1">
        {/* Hospital + Distance */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-gray-600">{hospital}</p>
          {distance && showDistance && (
            <span className="flex items-center gap-0.5 text-xs text-gray-400 flex-shrink-0">
              <MapPin className="w-3 h-3" />
              {distance}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>

        {/* Specialty Tag */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="px-2 py-1 bg-teal-600 text-white text-xs rounded-lg font-semibold">{specialty}</span>
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
    </button>
  );
}