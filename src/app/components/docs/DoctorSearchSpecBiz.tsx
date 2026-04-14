import type { ReactNode } from 'react';
import { useAppNavigation } from '../../contexts/AppNavigationContext';
import { SpecDocLink } from './SpecDocLink';

export function DoctorSearchSpecBiz() {
  const { navigateToDoctorSearch, navigateToChat } = useAppNavigation();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-sm">
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white px-3 py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">v0.6</span>
          <span className="bg-white/10 text-purple-100 text-[10px] px-2 py-0.5 rounded-full">2026.03.27</span>
          <span className="bg-yellow-400/90 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">🎨 UI/UX</span>
        </div>
        <h1 className="text-base font-black mb-1">명의 찾기 화면</h1>
        <p className="text-purple-200 text-[10px]">회원전용 — 비회원 기준과 달라지는 점만 정리</p>
      </div>

      <div className="px-3 py-4 space-y-4">
        <div className="bg-violet-50 border border-violet-200 rounded-xl px-3 py-3">
          <p className="text-xs font-bold text-violet-900 mb-1">📌 회원전용 탭 운영 원칙</p>
          <p className="text-xs text-violet-900 leading-relaxed">
            기본 화면 구성과 터치·탭 반응은{' '}
            <SpecDocLink to="doctorGuestOverview">
              <strong>[비회원 탭]</strong>
            </SpecDocLink>{' '}
            정의와 같습니다. 이 문서는 비회원과 비교해 <strong>회원만 달라지는 점</strong>만 적습니다.
          </p>
        </div>

        <Section id="delta" title="1. 회원전용에서 달라지는 점" color="emerald">
          <div className="bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5 mb-3">
            <p className="text-xs text-rose-900 leading-relaxed">
              <strong>전역 통합 카운터:</strong> 비회원의 검색/프로필/게시글 열람 한도는 홈·명의찾기·통합검색·커뮤니티가 동일 카운터를 공유합니다.
              회원은 명의찾기 화면에서 해당 사용량 제한을 적용하지 않고, 동일 UI에서 확장 권한만 활성화됩니다.
            </p>
          </div>
          <Table
            headers={['항목', '비회원 기준', '회원전용', '비고']}
            rows={[
              ['검색 실행', '하루 3회', '무제한', '전역 통합 카운터 기준'],
              ['의사 프로필 열람', '하루 3회', '무제한', '카드 클릭 열람 기준'],
              ['의사 즐겨찾기', '로그인 유도', '저장 가능', '저장 결과는 마이페이지 연계'],
              [
                '리뷰 작성',
                '로그인 유도',
                '작성 가능',
                <>
                  팝업 구조는 <SpecDocLink to="commonModals">공통 탭</SpecDocLink> 참조
                </>,
              ],
            ]}
          />
        </Section>

        <Section id="member-flow" title="2. 회원에서만 달라지는 행동" color="violet">
          <div className="bg-white border border-violet-100 rounded-lg px-3 py-3">
            <ul className="text-xs text-violet-900 space-y-1.5 list-disc ml-4">
              <li>검색/프로필 열람 한도 초과 배너·잠금 흐름 없이 연속 탐색이 가능합니다.</li>
              <li>의사 상세에서 즐겨찾기 저장과 리뷰 작성이 즉시 가능합니다.</li>
              <li>로그인 유도 안내 대신 저장·작성이 바로 이어집니다.</li>
            </ul>
          </div>
          <div className="mt-3 flex items-center gap-2 p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl">
            <span className="text-teal-700 text-xs font-medium">🎯 화면 시나리오:</span>
            <button
              onClick={() => navigateToDoctorSearch('폐암')}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-lg transition-colors"
            >
              명의 찾기로 이동
            </button>
            <button
              onClick={navigateToChat}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
            >
              AI 챗봇으로 이동
            </button>
          </div>
        </Section>

        <Section id="refs" title="3. 참고 문서" color="indigo">
          <div className="space-y-2">
            <div className="bg-white border border-indigo-100 rounded-lg px-3 py-2.5">
              <p className="text-xs font-bold text-indigo-900">기본 화면·사용 방식</p>
              <p className="text-[10px] text-gray-600 mt-0.5">
                비회원용{' '}
                <SpecDocLink to="doctorGuestOverview">명의 찾기 화면 정의서</SpecDocLink>와 같은 흐름으로 동작합니다.
              </p>
            </div>
            <div className="bg-white border border-indigo-100 rounded-lg px-3 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-indigo-900">공통 UI 상세</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">의사 프로필 창, 리뷰 작성, 로그인 유도 안내 등</p>
                </div>
                <SpecDocLink
                  to="commonModals"
                  className="text-[10px] text-indigo-600 hover:text-indigo-800 whitespace-nowrap"
                >
                  공통 문서 →
                </SpecDocLink>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ id, title, color, children }: { id: string; title: string; color: string; children: React.ReactNode }) {
  const borderColors: Record<string, string> = {
    emerald: 'border-emerald-500',
    violet: 'border-violet-500',
    indigo: 'border-indigo-500',
  };
  const bgColors: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-900',
    violet: 'bg-violet-50 text-violet-900',
    indigo: 'bg-indigo-50 text-indigo-900',
  };
  return (
    <section id={id}>
      <div className={`flex items-center gap-1.5 mb-3 pb-2 border-b ${borderColors[color]}`}>
        <h2 className={`text-sm font-black px-2.5 py-1 rounded ${bgColors[color]}`}>{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((h, i) => (
              <th key={i} className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide px-2.5 py-2 border-b border-gray-100">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              {row.map((cell, ci) => (
                <td key={ci} className={`px-2.5 py-2 text-gray-700 align-top border-b border-gray-50 ${ci === 0 ? 'font-medium text-gray-900 whitespace-nowrap' : ''}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
