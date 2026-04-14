import type { ReactNode } from 'react';
import { SpecDocLink } from './SpecDocLink';

export function CommunityTabSpecBiz() {

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">커뮤니티 탭</span>
            <span className="bg-white/10 text-purple-100 text-xs px-3 py-1 rounded-full">회원전용</span>
          </div>
          <h1 className="text-3xl font-black mb-2">💬 커뮤니티 탭 — 회원 확장</h1>
          <p className="text-purple-200 text-sm">비회원(Base) 기준 대비 회원 차이점만 정리</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <section id="community-biz-overview" className="scroll-mt-36 bg-violet-50 border border-violet-200 rounded-xl p-4">
          <p className="text-xs font-bold text-violet-900 mb-1">📌 회원전용 탭 운영 원칙</p>
          <p className="text-xs text-violet-900 leading-relaxed">
            기본 동작 및 UI 인터랙션은{' '}
            <SpecDocLink to="communityGuestOverview">
              <strong>[비회원 탭]</strong>
            </SpecDocLink>{' '}
            정책을 동일하게 참조함. 본 문서는 회원 확장 권한만 기록합니다.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">1. 회원전용에서 달라지는 점</h2>
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-rose-900 leading-relaxed">
              비회원의 게시글 열람/검색/프로필 열람은 전역 통합 카운터를 공유합니다. 회원은 커뮤니티 탭에서 해당 열람 제한을 적용하지 않고, 상호작용 권한이 확장됩니다.
            </p>
          </div>
          <Table
            headers={['항목', '비회원(기본)', '회원(확장)', '비고']}
            rows={[
              ['게시글 상세 열람', '전역 게시글 열람 한도 적용', '한도 미적용', '홈·통합검색·커뮤니티 전역 카운터 기준'],
              [
                '게시글 공감',
                '로그인 유도',
                '토글 가능(재탭 취소)',
                <>
                  상세 모달 패턴은 <SpecDocLink to="commonModals">공통 탭</SpecDocLink> 참조
                </>,
              ],
              ['댓글/답글 작성', '입력 비활성 + 로그인 유도', '작성/전송 가능', '댓글 공감 포함'],
              ['⋮ 더보기 메뉴', '공유 중심', '공유 + 본인글 수정/삭제 + 타인 신고', '작성자 여부 분기'],
              ['글쓰기(FAB)', '미노출', '노출 + 작성 가능', '임시저장 초안이 있으면 피드 상단에 "작성 중인 글이 있어요 / 이어쓰기" 배너 노출'],
              ['결과 0건 시 행동', '탐색 유도 중심 안내', '첫 후기 작성 유도 문구 강화', '빈 상태 카드 문구 + 우하단 FAB(+)를 통한 글쓰기 진입'],
            ]}
          />
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">2. 회원에서만 달라지는 사용자 행동</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li>피드/상세에서 공감, 댓글, 답글을 로그인 유도 없이 바로 수행합니다.</li>
            <li>상세의 ⋮ 메뉴에서 신고/수정/삭제 권한이 열립니다(작성자 여부 분기).</li>
            <li>우하단 글쓰기 버튼이 노출되며 초안이 있으면 이어쓰기 흐름이 활성화됩니다.</li>
          </ul>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs font-bold text-amber-900 mb-2">임시저장 이어쓰기 배너 (조건부)</p>
              <ul className="text-xs text-amber-900 space-y-1.5 list-disc pl-4">
                <li><strong>표시 조건:</strong> 회원 로그인 + 이 기기에 임시저장 초안 존재 + 커뮤니티 피드 진입 시점.</li>
                <li><strong>위치:</strong> 헤더 하단 배너 영역(면책/사용량 안내와 같은 구역).</li>
                <li><strong>문구 예시:</strong> "작성 중인 임시저장 글이 있어요" + 우측 버튼 "이어서 쓰기".</li>
                <li><strong>탭 동작:</strong> 글쓰기 화면 진입 후 "불러오기/삭제 후 새로 작성" 확인 카드 표시.</li>
                <li><strong>숨김 조건:</strong> 초안 없음, 비회원, 또는 이미 게시/삭제 완료된 초안.</li>
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <p className="text-xs font-bold text-emerald-900 mb-2">첫 후기 작성 유도 (0건 상태)</p>
              <ul className="text-xs text-emerald-900 space-y-1.5 list-disc pl-4">
                <li><strong>표시 조건:</strong> 선택된 필터 결과가 0건이고 회원 로그인 상태일 때.</li>
                <li><strong>문구 톤:</strong> 탐색 안내보다 작성 유도 중심 ("첫 후기를 남겨보세요").</li>
                <li><strong>진입 방식:</strong> 빈 상태 카드 내 별도 버튼 없이, 우하단 FAB(+)로 글쓰기 화면 이동.</li>
                <li><strong>보조 문구:</strong> "경험을 공유하면 다른 환자에게 도움이 됩니다" 등 참여 유도.</li>
                <li><strong>비회원과 차이:</strong> 비회원은 탐색 유도 문구 중심, 회원은 작성 CTA 중심.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <p className="text-xs text-indigo-900">
            기본 피드 구조, 배지 시스템, 신고 플로우 상세, 공통 컴포넌트 연결은 비회원 탭(
            <SpecDocLink to="communityGuestOverview">CommunityTabSpec</SpecDocLink>) 및{' '}
            <SpecDocLink to="commonModals">공통 탭</SpecDocLink> 정의를 기준으로 동일하게 적용합니다.
          </p>
          <SpecDocLink
            to="commonModals"
            className="mt-3 inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors no-underline hover:text-white"
          >
            공통 탭으로 이동 →
          </SpecDocLink>
        </section>
      </div>
    </div>
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
