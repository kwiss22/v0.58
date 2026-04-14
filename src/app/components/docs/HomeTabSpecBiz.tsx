// 홈탭 화면정의서 — UI/UX (비기술 버전)
import type { ReactNode } from 'react';
import { useAppNavigation } from '../../contexts/AppNavigationContext';
import { SpecDocLink } from './SpecDocLink';

export function HomeTabSpecBiz() {
  const { navigateToCommunity } = useAppNavigation();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-sm">
      {/* 문서 헤더 - 컴팩트 */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white px-3 py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">v0.58</span>
          <span className="bg-yellow-400/90 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">🎨 UI/UX</span>
        </div>
        <h1 className="text-base font-black mb-1">홈 화면</h1>
        <p className="text-purple-200 text-[10px]">기획·디자인 논의용</p>
      </div>

      <div className="px-3 py-4 space-y-4">
        <div className="bg-violet-50 border border-violet-200 rounded-xl px-3 py-3">
          <p className="text-xs font-bold text-violet-900 mb-1">📌 회원전용 탭 운영 원칙</p>
          <p className="text-xs text-violet-900 leading-relaxed">
            기본 동작 및 UI 인터랙션은{' '}
            <SpecDocLink to="homeGuestOverview">
              <strong>[비회원 탭]</strong>
            </SpecDocLink>{' '}
            정책을 동일하게 참조함. 이 문서는 비회원 기준 대비 <strong>회원전용</strong>에서만 달라지는 점만 기록합니다.
          </p>
        </div>

        <BizSection id="auth" title="1. 회원전용에서 달라지는 점" color="emerald">
          <div className="bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5 mb-3">
            <p className="text-xs text-rose-900 leading-relaxed">
              <strong>전역 통합 카운터:</strong> 비회원의 검색/프로필/게시글 열람 한도는 홈·명의찾기·통합검색·커뮤니티가 동일 카운터를 공유합니다.
              회원은 해당 열람/사용량 제한을 적용하지 않으며(정책 기준), 동일 UI에서 확장 권한만 활성화됩니다.
            </p>
          </div>
          <BizTable
            headers={['항목', '비회원 기준', '회원전용', '비고']}
            rows={[
              ['검색/프로필/게시글 열람 한도', '전역 통합 카운터 적용', '한도 미적용(정책 기준)', '카운터는 탭 단위가 아닌 서비스 전역'],
              ['의사 즐겨찾기', '로그인 유도', '저장 가능', '저장 결과는 마이페이지와 연계'],
              [
                '의사 리뷰 작성',
                '로그인 유도',
                '작성 가능',
                <>
                  리뷰 작성 팝업 패턴은 <SpecDocLink to="commonModals">공통 탭</SpecDocLink> 참조
                </>,
              ],
              [
                '커뮤니티 게시글 공감',
                '로그인 유도',
                '토글 가능(재탭 취소 포함)',
                <>
                  상세 모달 패턴은 <SpecDocLink to="commonModals">공통 탭</SpecDocLink> 참조
                </>,
              ],
              ['커뮤니티 댓글/답글', '입력 비활성 + 안내', '작성/전송 가능', '권한 차이만 본 문서에서 관리'],
              ['커뮤니티 ⋮ 더보기', '공유 중심', '공유 + 작성자 수정/삭제 + 타인 신고', '작성자 여부 분기'],
            ]}
          />
          <BizNote>
            홈 화면 레이아웃, 카드 구성, 모달 기본 구조, 공통 컴포넌트 상세는{' '}
            <SpecDocLink to="homeGuestOverview">비회원 탭</SpecDocLink> 및 <SpecDocLink to="commonModals">공통 탭</SpecDocLink>을 참조합니다.
          </BizNote>
        </BizSection>

        <BizSection id="scenarios" title="2. 회원에서만 달라지는 사용자 행동" color="violet">
          <div className="bg-white border border-violet-100 rounded-lg px-3 py-3">
            <ul className="text-xs text-violet-900 space-y-1.5 list-disc ml-4">
              <li>추천글 상세에서 공감/댓글/답글 작성이 즉시 가능해집니다.</li>
              <li>의사 상세에서 즐겨찾기 저장과 리뷰 작성이 바로 가능합니다.</li>
              <li>커뮤니티 상세의 ⋮ 메뉴에서 본인 글 수정/삭제, 타인 글·댓글 신고가 열립니다.</li>
              <li>비회원 잠금/로그인 유도 흐름 없이 동일 화면에서 연속 행동이 가능합니다.</li>
            </ul>
          </div>
          <div className="mt-3 flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
            <span className="text-green-700 text-sm font-medium">🎯 확장 행동 확인:</span>
            <button
              onClick={navigateToCommunity}
              className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              커뮤니티 탭으로 이동
            </button>
          </div>
        </BizSection>

        {/* 푸터 */}
      </div>
    </div>
  );
}

/* ─── 재사용 컴포넌트 ─── */

function BizSection({ id, title, color, children }: { id: string; title: string; color: string; children: React.ReactNode }) {
  const borderColors: Record<string, string> = {
    violet: 'border-violet-500',
    indigo: 'border-indigo-500',
    emerald: 'border-emerald-500',
    rose: 'border-rose-500',
  };
  const bgColors: Record<string, string> = {
    violet: 'bg-violet-50 text-violet-900',
    indigo: 'bg-indigo-50 text-indigo-900',
    emerald: 'bg-emerald-50 text-emerald-900',
    rose: 'bg-rose-50 text-rose-900',
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

function BizBlock({ label, title, file, children }: { label: string; title: string; file?: string; children: React.ReactNode }) {
  const { navigateToCommonSpec } = useAppNavigation();
  const isCommonComponentLink = title.includes('🔗 공통 컴포넌트');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3.5">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="bg-gray-800 text-white text-xs font-bold px-2 py-0.5 rounded flex-shrink-0">{label}</span>
          {isCommonComponentLink ? (
            <button
              onClick={navigateToCommonSpec}
              className="text-sm font-bold text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors cursor-pointer truncate"
            >
              {title}
            </button>
          ) : (
            <h3 className="text-sm font-bold text-gray-900 truncate">{title}</h3>
          )}
        </div>
        {file && <span className="text-[10px] text-gray-400 font-mono bg-gray-50 px-1.5 py-0.5 rounded flex-shrink-0">{file}</span>}
      </div>
      {children}
    </div>
  );
}

function BizTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
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

function InfoTable({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="mb-3 overflow-x-auto rounded-lg border border-blue-100 bg-blue-50/30">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-blue-100/50">
            {headers.map((h, i) => (
              <th key={i} className="text-left text-[10px] font-bold text-blue-800 uppercase tracking-wide px-2.5 py-2 border-b border-blue-200">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="bg-white/50">
      <td className="px-2.5 py-2 font-medium text-blue-900 whitespace-nowrap align-top border-b border-blue-100">{label}</td>
      <td className="px-2.5 py-2 text-blue-800 align-top border-b border-blue-100">{value}</td>
    </tr>
  );
}

function BizNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
      <span className="text-blue-500 text-sm mt-0.5">ℹ️</span>
      <p className="text-xs text-blue-800">{children}</p>
    </div>
  );
}