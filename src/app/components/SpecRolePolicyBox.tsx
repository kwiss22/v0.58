// 화면정의서 패널 — 비회원/회원 공통 정책 요약 (SpecPanel 전용)
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export function SpecRolePolicyBox() {
  const { role } = useUser();
  const [open, setOpen] = useState(false);
  const isMember = role === 'member';

  const shellClass = isMember
    ? 'shrink-0 border-b border-gray-200 bg-gradient-to-r from-sky-50 via-blue-50 to-emerald-50 px-4 py-3'
    : 'shrink-0 border-b border-gray-200 bg-gradient-to-br from-rose-50 to-rose-100/80 px-4 py-3 ring-1 ring-inset ring-rose-200/70';

  const titleClass = isMember ? 'text-xs font-bold text-emerald-950' : 'text-xs font-bold text-rose-950';
  const chevronClass = isMember ? 'text-emerald-800' : 'text-rose-800';

  return (
    <div className={shellClass}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 rounded-sm"
      >
        <p className={`${titleClass} min-w-0 flex-1`}>
          {isMember ? '회원 공통 정책 (일반 회원 · 의사 인증 회원)' : '비회원 공통 정책'}
        </p>
        <ChevronDown
          className={`mt-0.5 h-4 w-4 shrink-0 transition-transform duration-300 ease-out ${chevronClass} ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pt-2">
            {isMember ? (
              <ul className="space-y-1.5 text-[11px] sm:text-xs text-sky-950 leading-relaxed">
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>
                    일반 회원은 게시글·리뷰·댓글·공감·신고 등 모든 기본 기능을 제한 없이 이용할 수 있으며, 열람·검색에 일일 횟수 제한이 없습니다.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    🏥
                  </span>
                  <span>
                    리뷰와 게시글에는 병원 진료 인증(영수증 업로드)을 선택적으로 추가할 수 있고, 인증 시 신뢰 배지와 노출 우선순위 상승 등의 혜택을 받습니다.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    🩺
                  </span>
                  <span>
                    의사 인증 회원은 일반 회원 권한에 더해 &apos;의사&apos; 배지가 표시되고, 본인 프로필을 제외한 다른 의사 프로필에 리뷰 작성이 가능합니다.
                  </span>
                </li>
              </ul>
            ) : (
              <ul className="space-y-1.5 text-[11px] sm:text-xs text-rose-900 leading-relaxed">
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    🔓
                  </span>
                  <span>
                    비회원은 로그인 없이 접속하며, 게시글·의사 프로필 상세 열람과 Aiga 검색 실행에는 일일 N회 제한이 있습니다.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    👁️
                  </span>
                  <span>
                    열람 제한은 &apos;상세 화면 진입&apos; 기준으로 차감되며, 목록(피드) 스크롤만으로는 차감되지 않습니다.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    🔒
                  </span>
                  <span>
                    공감, 댓글, 리뷰 쓰기, 즐겨찾기, 신고 등 작성·상호작용 기능은 모두 로그인 후 이용 가능합니다.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    🌐
                  </span>
                  <span>
                    홈·커뮤니티·통합검색·명의찾기에서 사용하는 열람/검색 한도는 전역으로 합산되어, 한 화면에서 사용한 횟수가 다른 화면에도 함께 반영됩니다.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    ⚠️
                  </span>
                  <span>
                    잔여 횟수 1회 이하일 때는{' '}
                    <code className="rounded bg-white/80 px-1 py-px text-[10px] font-mono text-rose-800">UsageLimitBanner</code>로 경고하고, 0회가 되면 상세/검색이 차단되며{' '}
                    <code className="rounded bg-white/80 px-1 py-px text-[10px] font-mono text-rose-800">LoginRequiredToast</code>로 회원가입/로그인을 유도합니다.
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
