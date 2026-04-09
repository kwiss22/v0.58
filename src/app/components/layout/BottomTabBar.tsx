import svgPaths from "@/imports/svg-tcmrq2r2v9";
import { Users } from "lucide-react";

type Tab = 'home' | 'chat' | 'search' | 'community' | 'mypage';

interface BottomTabBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  return (
    <div className="bg-white border-t border-gray-200">
      <div className="grid grid-cols-5 max-w-2xl mx-auto">
        {/* 홈 */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
            activeTab === 'home' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <div className="w-6 h-6">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g>
                <path 
                  d={svgPaths.p2bbf6680} 
                  stroke={activeTab === 'home' ? '#155DFC' : '#6A7282'} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                />
                <path 
                  d={svgPaths.p206ad900} 
                  stroke={activeTab === 'home' ? '#155DFC' : '#6A7282'} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                />
              </g>
            </svg>
          </div>
          <span className="text-xs">홈</span>
        </button>

        {/* AI 챗봇 */}
        <button
          onClick={() => onTabChange('chat')}
          className={`flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
            activeTab === 'chat' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <div className="w-6 h-6">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g>
                <path 
                  d={svgPaths.p3c61fe80} 
                  stroke={activeTab === 'chat' ? '#155DFC' : '#6A7282'} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                />
              </g>
            </svg>
          </div>
          <span className="text-xs">AIGA챗봇</span>
        </button>

        {/* 명의 찾기 */}
        <button
          onClick={() => onTabChange('search')}
          className={`flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
            activeTab === 'search' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <div className="w-6 h-6">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g>
                <path 
                  d={svgPaths.p19568f00} 
                  stroke={activeTab === 'search' ? '#155DFC' : '#6A7282'} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                />
                <path 
                  d="M21 21L16.7 16.7" 
                  stroke={activeTab === 'search' ? '#155DFC' : '#6A7282'} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                />
              </g>
            </svg>
          </div>
          <span className="text-xs">명의 찾기</span>
        </button>

        {/* 커뮤니티 */}
        <button
          onClick={() => onTabChange('community')}
          className={`flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
            activeTab === 'community' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Users className={`w-6 h-6`} />
          <span className="text-xs">커뮤니티</span>
        </button>

        {/* MY */}
        <button
          onClick={() => onTabChange('mypage')}
          className={`flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
            activeTab === 'mypage' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <div className="w-6 h-6">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g>
                <path 
                  d={svgPaths.pace200} 
                  stroke={activeTab === 'mypage' ? '#155DFC' : '#6A7282'} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                />
              </g>
            </svg>
          </div>
          <span className="text-xs">MY</span>
        </button>
      </div>
    </div>
  );
}