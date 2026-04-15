// 화면정의서 슬라이딩 사이드패널

import { SpecDocumentation } from './docs/SpecDocumentation';
import { SpecRolePolicyBox } from './SpecRolePolicyBox';
import { SpecDocReferencePriority } from './SpecDocReferencePriority';
import { DebugPanel } from './DebugPanel';
import { useUser } from '../contexts/UserContext';
import { Smartphone, ShieldCheck } from 'lucide-react';

interface SpecPanelProps {
  onMobilePreview?: () => void;
  onAdminPage?: () => void;
}

export function SpecPanel({ onMobilePreview, onAdminPage }: SpecPanelProps) {
  const { role, setRole } = useUser();

  return (
    <div className="relative h-full bg-white border-l border-gray-200 flex flex-col">
      {/* 헤더 */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold text-lg">화면정의서</h2>
          {/* 버튼 그룹 */}
          <div className="flex items-center gap-2">
            {/* 모바일 미리보기 버튼 */}
            {onMobilePreview && (
              <button
                onClick={onMobilePreview}
                className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors border border-white/20"
              >
                <Smartphone className="w-3.5 h-3.5" />
                모바일 미리보기
              </button>
            )}
            {/* 관리자 페이지 버튼 */}
            {onAdminPage && (
              <button
                onClick={onAdminPage}
                className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors border border-white/20"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                관리자
              </button>
            )}
          </div>
        </div>
        
        {/* 비회원/회원 모드 토글 */}
        <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
          <button
            onClick={() => setRole('guest')}
            className={`flex-1 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              role === 'guest'
                ? 'bg-white text-blue-600'
                : 'text-white/80 hover:text-white'
            }`}
          >
            비회원
          </button>
          <button
            onClick={() => setRole('member')}
            className={`flex-1 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              role === 'member'
                ? 'bg-white text-blue-600'
                : 'text-white/80 hover:text-white'
            }`}
          >
            회원
          </button>
        </div>
      </div>

      {/* 비회원/회원 공통 정책 — Aiga 정의서 탭바 바로 위 */}
      <SpecRolePolicyBox />

      {/* 문서 참조 우선순위 — 역할과 무관·항상 표시 */}
      <SpecDocReferencePriority />

      {/* 내용 */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <SpecDocumentation />
      </div>

      {/* PC: 화면정의서 영역 우하단 (왼쪽 앱 열의 transform과 분리) */}
      <DebugPanel placement="spec" />
    </div>
  );
}