import svgPaths from "@/imports/svg-tcmrq2r2v9";
import { ChevronRight } from "lucide-react";

interface AigaBannerProps {
  onClick: () => void;
}

export function AigaBanner({ onClick }: AigaBannerProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-[#2b7fff] to-[#155dfc] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2 text-left">
          {/* AI 의료 챗봇 Label */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g clipPath="url(#clip0_3_518)">
                  <path d={svgPaths.p360f8100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M16.6667 2.5V5.83333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M18.3333 4.16667H15" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M3.33333 14.1667V15.8333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M4.16667 15H2.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </g>
                <defs>
                  <clipPath id="clip0_3_518">
                    <rect fill="white" height="20" width="20" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span className="text-sm font-bold text-white">AI 의료 챗봇</span>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-xl font-bold text-white">Aiga에게 물어보세요</h2>
          
          {/* Description */}
          <p className="text-sm text-blue-100">증상 체크부터 명의 추천까지</p>
        </div>

        {/* Chevron Icon */}
        <ChevronRight className="w-6 h-6 text-white flex-shrink-0" />
      </div>
    </button>
  );
}
