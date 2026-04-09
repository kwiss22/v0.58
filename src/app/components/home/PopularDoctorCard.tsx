import svgPaths from "@/imports/svg-tcmrq2r2v9";
import { ChevronRight, User } from "lucide-react";
import { Doctor } from "@/types/chat.types";

interface PopularDoctorCardProps {
  doctor: Doctor;
  onClick: () => void;
}

export function PopularDoctorCard({ doctor, onClick }: PopularDoctorCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      {/* Doctor Image */}
      <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center">
        <User className="w-8 h-8 text-gray-400" />
      </div>

      {/* Doctor Info */}
      <div className="flex-1 text-left min-w-0">
        {/* Name */}
        <p className="text-sm font-medium text-gray-900 mb-0.5">{doctor.name}</p>
        
        {/* Hospital */}
        <p className="text-xs text-gray-600 mb-1">{doctor.hospital}</p>
        
        {/* Specialty */}
        <p className="text-xs text-gray-500">{doctor.specialty.split('(')[0].trim()}</p>
      </div>

      {/* Arrow Icon */}
      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
    </button>
  );
}