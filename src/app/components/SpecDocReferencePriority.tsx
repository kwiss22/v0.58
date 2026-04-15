// 화면정의서 패널 — 문서 참조 우선순위 (역할 전환과 무관·항상 동일)
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function SpecDocReferencePriority() {
  const [open, setOpen] = useState(false);

  return (
    <div className="shrink-0 border-b border-gray-200 bg-gray-50/90 px-4 py-3">
      <div className="border-l-[3px] border-gray-300 pl-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-start justify-between gap-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 rounded-sm"
        >
          <h3 className="text-sm font-bold text-gray-800 min-w-0 flex-1">📌 문서 참조 우선순위</h3>
          <ChevronDown
            className={`mt-0.5 h-4 w-4 shrink-0 text-gray-600 transition-transform duration-300 ease-out ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="pt-2">
              <p className="text-xs text-gray-600 leading-relaxed mb-2.5">
                이 화면정의서는 아래 우선순위를 기준으로 해석합니다.
                <span className="block mt-0.5">문서 간 내용이 충돌할 경우 순서가 앞선 문서를 따릅니다.</span>
              </p>
              <ol className="list-decimal list-outside pl-4 space-y-1.5 text-[11px] sm:text-xs text-gray-700 leading-relaxed marker:font-semibold marker:text-gray-500">
                <li>
                  <strong className="text-gray-800">각 화면 정의서 (본 문서)</strong> — 홈·AIGA 챗봇·명의찾기·커뮤니티 화면별 레이아웃·UX·정책 방향
                </li>
                <li>
                  <strong className="text-gray-800">공통(통합검색) 정의서</strong> — 통합검색 진입·결과·한도 등 검색 전반
                </li>
                <li>
                  <strong className="text-gray-800">공통 UI 컴포넌트 정의서</strong> — 모달·팝업·알림 등 공통 컴포넌트 구조 (게시글 상세·리뷰 모달 내 병원 방문 인증 플로우 포함)
                </li>
                <li>
                  <strong className="text-gray-800">마이페이지 화면정의서</strong> — 로그인·회원가입 플로우 참조
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
