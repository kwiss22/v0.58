// 공통 컴포넌트 정의서 — 회원전용
import type { ReactNode } from 'react';
import { SpecDocLink } from './SpecDocLink';

export function CommonComponentsSpecBiz(_props: { onTestSearch?: (keyword: string) => void }) {
  return (
    <div className="bg-gray-50 font-sans">
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">공통 컴포넌트 정의서 v0.58</span>
            <span className="bg-white/10 text-purple-100 text-xs px-3 py-1 rounded-full">회원전용</span>
          </div>
          <h1 className="text-3xl font-black mb-2">🔗 공통 UI 컴포넌트 — 회원 확장</h1>
          <p className="text-purple-200 text-sm">
            비회원은 <strong className="text-white">기본 맛보기</strong>·제약이 있고, 회원은 <strong className="text-white">같은 화면 위에서</strong> 저장·작성·연속 탐색이 열립니다.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <section className="bg-violet-50 border border-violet-200 rounded-xl p-4 space-y-2">
          <p className="text-xs font-bold text-violet-900">📌 문서 작성 원칙 (회원 탭)</p>
          <ul className="text-xs text-violet-900 leading-relaxed list-disc pl-4 space-y-1">
            <li>
              팝업·모달의 <strong>레이아웃, 섹션 순서, 타이포·버튼 배치</strong> 등 시각·구조 스펙은 비회원 문서{' '}
              <SpecDocLink to="commonModals">
                <strong>[CommonComponentsSpec]</strong>
              </SpecDocLink>
              과 <strong>동일</strong>합니다. 본 문서에서는 &quot;비회원 안내와 동일&quot;로 두고 넘어갑니다.
            </li>
            <li>
              아래에서는 <strong>회원이 되었을 때만</strong> 열리는 기능, 사라지는 제약, 그리고 <strong>다음 화면·계정으로 이어지는 동작</strong>만 상세히 적습니다.
            </li>
          </ul>
        </section>

        <Section id="common-biz-root" title="1. 회원이 되면 달라지는 것 (한눈에)">
          <ul className="text-xs text-gray-800 leading-relaxed list-disc pl-4 space-y-1.5">
            <li>
              <strong>전역 한도·경고 배너·검색창 잠금</strong> 등 &quot;오늘 남은 횟수&quot;에 묶인 안내가 사라지거나, 회원 정책상 적용되지 않아 <strong>목록·검색 영역이 막히지 않고</strong> 이어집니다 (탭별 세부 한도는 각 Base 문서·통합검색 스펙과 정합).
            </li>
            <li>
              <strong>의사 프로필</strong>에서 즐겨찾기·리뷰 작성이 <strong>잠금 없이 즉시</strong> 동작하고, 초안이 있으면 <strong>이어쓰기 배너</strong>로 작성 흐름이 복구됩니다.
            </li>
            <li>
              <strong>커뮤니티 게시글 상세</strong>에서 공감·댓글·답글이 활성화되고, ⋮ 메뉴에 <strong>본인 글 수정/삭제·신고</strong> 등이 열립니다.
            </li>
            <li>
              <strong>로그인 필요</strong> 안내 팝업은 제한 기능을 눌렀을 때 대신 뜨던 경우가 줄고, <strong>실제 액션(저장·작성·전송)</strong>이 바로 실행되는 것이 기본입니다.
            </li>
          </ul>
        </Section>

        <Section title="2. 제약 해제 — 한도·배너·잠금이 풀린 뒤 화면">
          <Narrative>
            비회원에게는 홈·명의찾기·커뮤니티·통합검색 등에서 <strong>검색 실행·프로필 열람·게시글 열람</strong>이 같은 전역 카운터와
            연동되고, 잔여 1회/0회 배너·검색창 비활성 등이 나올 수 있습니다. 이 동작의 수치·문구·노출 위치는 비회원 탭 및{' '}
            <SpecDocLink to="searchGuestOverview">SearchScenarioSpec</SpecDocLink> 등 Base 쪽에 있습니다.
          </Narrative>
          <Narrative>
            <strong>회원이 되면</strong> 그 정책 범위에서 위 제약이 적용되지 않거나 완화되어, 동일한 화면 골격 안에서 <strong>상단 경고/잠금 줄이 사라지고</strong> 스크롤 영역이 위쪽부터 자연스럽게 이어집니다. 사용자 입장에서는 &quot;막혀 있던 입력·탐색&quot;이 끊기지 않고 이어지는 것이 핵심 UX입니다.
          </Narrative>
          <p className="text-[11px] text-gray-500 mt-2 border-t border-gray-100 pt-2">
            시각적 배치(배너 높이·폰트)는 비회원 문서의 동일 컴포넌트 정의와 같으며, 회원 탭에서는 <strong>안 나타나거나 다른 문구로 대체</strong>되는 상태만 구분합니다.
          </p>
        </Section>

        <Section title="3. 의사 프로필 상세 팝업 — 회원만의 확장 흐름">
          <p className="text-[11px] text-gray-600 mb-3">
            진입 경로(홈·명의찾기·커뮤니티), 프로필·경력·논문·AI 소셜리뷰 블록 구성은 <strong>비회원 안내와 동일</strong>합니다.
          </p>

          <Subheading>3-1. 즐겨찾기 (저장)</Subheading>
          <Narrative>
            비회원: 버튼이 잠금 상태로, 탭 시 로그인 유도로 전환. <strong>회원:</strong> 잠금 없이 탭하면 <strong>즉시 저장 상태로 반영</strong>되고(아이콘·토스트 등 피드백은 프로토타입 기준), 이후{' '}
            <strong>마이페이지</strong> 등 계정 기반 목록에서 다시 찾을 수 있는 흐름으로 이어집니다. 레이아웃은 비회원과 동일하고, <strong>상태만 &quot;저장됨&quot;으로 열립니다.</strong>
          </Narrative>

          <Subheading>3-2. 리뷰 쓰기</Subheading>
          <Narrative>
            비회원: 하단 리뷰쓰기가 잠금 + 탭 시 로그인 안내. <strong>회원:</strong> 같은 위치에서 탭 시 <strong>로그인 팝업 없이</strong> 리뷰 작성 모달로 진입합니다. 별점·본문 입력·임시저장·제출/취소 등 <strong>단계별 UI</strong>는 비회원 문서의 동일 컴포넌트 설명을 따르되, <strong>모든 단계가 계정 권한으로 수행</strong>됩니다.
          </Narrative>

          <Subheading>3-3. 임시저장 이어쓰기 배너 (AIGA 리뷰 영역)</Subheading>
          <ul className="text-xs text-gray-800 leading-relaxed list-disc pl-4 space-y-1 mt-1">
            <li>
              <strong>언제 보이나:</strong> 회원이고, 해당 의사에 대해 <strong>저장해 둔 리뷰 초안</strong>이 있을 때, AIGA 리뷰 섹션 상단에 조건부로 표시됩니다.
            </li>
            <li>
              <strong>무엇이 좋아지나:</strong> 긴 글을 한 번에 쓰지 않아도, 다시 프로필을 열었을 때 <strong>&quot;이어쓰기&quot;</strong>로 이전 내용을 복구할 수 있습니다.
            </li>
            <li>
              <strong>탭 시:</strong> 리뷰 작성 UI가 열리고, <strong>불러오기 / 삭제 후 새로 작성</strong> 등 복원 확인이 나올 수 있습니다(비회원 문서의 해당 플로우와 동일 패턴).
            </li>
            <li>
              <strong>숨김:</strong> 초안 없음·삭제 완료·이미 제출 완료 시.
            </li>
          </ul>

          <Subheading>3-4. 의료진 인증 요청</Subheading>
          <Narrative>
            버튼 노출·영역 위치는 <strong>비회원 안내와 동일</strong>합니다. 회원은 잠금이 아닌 <strong>동작 가능 상태</strong>(데모는 토스트 등)로, 실서비스 노출·검증 규칙은 별도 의사 인증 화면정의서를 따릅니다.
          </Narrative>
        </Section>

        <Section title="4. 커뮤니티 게시글 상세 — 회원만의 확장 흐름">
          <p className="text-[11px] text-gray-600 mb-3">
            본문·메타·댓글 목록 레이아웃은 <strong>비회원 안내와 동일</strong>합니다.
          </p>
          <Subheading>4-1. 공감</Subheading>
          <Narrative>
            비회원: 탭 시 로그인 유도. <strong>회원:</strong> 탭할 때마다 <strong>공감 토글</strong>이 적용되고, 다시 탭하면 취소되는 식의 상호작용이 가능합니다. 카드·목록에 보이는 숫자와의 연동 목표는 비회원 문서와 동일하게 기술합니다.
          </Narrative>
          <Subheading>4-2. 댓글·답글</Subheading>
          <Narrative>
            비회원: 입력 영역 비활성·안내. <strong>회원:</strong> 입력창이 활성화되고 전송 시 목록에 반영됩니다. 댓글 공감 등도 동일 팝업 안에서 계정 기준으로 열립니다.
          </Narrative>
          <Subheading>4-3. ⋮ 더보기 메뉴</Subheading>
          <Narrative>
            <strong>공유</strong>는 비회원과 동일하게 사용 가능한 범위에서 노출됩니다. 추가로 <strong>본인 글</strong>이면 수정·삭제, <strong>타인 글·댓글</strong>이면 신고 등이 메뉴에 나타나 분기됩니다.
          </Narrative>
        </Section>

        <Section title="5. 로그인 필요 안내 팝업">
          <Narrative>
            비회원은 제한 기능(즐겨찾기·리뷰·댓글 등)을 눌렀을 때 <strong>로그인 유도</strong>가 먼저 뜨는 것이 기본입니다.{' '}
            <strong>회원</strong>은 동일 버튼에서 <strong>대개 안내 없이 실제 기능</strong>이 실행됩니다. 가입·로그인 버튼을 눌렀을 때의
            공통 플로우는 <SpecDocLink to="mypageOverview">마이페이지 화면정의서</SpecDocLink>의 로그인/회원가입 정책을 따릅니다.
          </Narrative>
        </Section>

        <Section title="6. 계정과 이어지는 경험">
          <ul className="text-xs text-gray-800 leading-relaxed list-disc pl-4 space-y-1.5">
            <li>
              <strong>즐겨찾기한 의사:</strong> 저장 이후 <SpecDocLink to="mypageOverview">마이페이지</SpecDocLink> 등에서 &quot;내가 저장한
              의사&quot; 류 목록으로 조회하는 흐름(세부는 마이페이지 스펙).
            </li>
            <li>
              <strong>리뷰 초안:</strong> 프로필을 나갔다 들어와도 동일 의사에 한해 이어쓰기 배너로 복귀 가능.
            </li>
            <li>
              <strong>커뮤니티 글쓰기(FAB):</strong> 회원에게만 노출되는 진입에서 글 작성·수정 화면으로 이동하며, 커뮤니티 탭에 초안이 있으면{' '}
              <strong>불러오기/삭제 후 새로 시작</strong> 확인이 켜집니다(
              <SpecDocLink to="communityMemberBizOverview">CommunityTabSpecBiz</SpecDocLink>·비회원 공통과 정합).
            </li>
            <li>
              <strong>챗봇 대화 이력·최근 본 의사</strong> 등 장기 보존이 필요한 데이터는{' '}
              <SpecDocLink to="aigaDevRef">AI 챗봇</SpecDocLink>·<SpecDocLink to="mypageOverview">마이페이지</SpecDocLink> 쪽 정의서를
              참조합니다. 공통 컴포넌트 문서에서는 &quot;팝업에서 저장·작성한 결과가 계정으로 귀속된다&quot;는 연결만 명시합니다.
            </li>
          </ul>
        </Section>

        <Section title="7. 회원 확장 요약 (참조용 표)">
          <p className="text-xs text-gray-600 mb-3">
            비회원 쪽 상세·수치는 <SpecDocLink to="commonModals">CommonComponentsSpec</SpecDocLink>을 기준으로 하고, 아래는{' '}
            <strong>회원에서 가능해지는 일</strong>만 압축했습니다.
          </p>
          <Table
            headers={['영역', '회원에서 가능해지는 일', '비고']}
            rows={[
              ['의사 프로필', '즉시 즐겨찾기·리뷰 작성·초안 이어쓰기', '레이아웃은 비회원과 동일'],
              ['의료진 인증 요청', '동작 가능(운영 정책·별도 문서)', '버튼 위치 동일'],
              ['게시글 상세', '공감 토글·댓글/답글·작성자 메뉴', '본문 레이아웃 동일'],
              ['글쓰기 FAB 등', '작성·초안 복원 흐름', '커뮤니티 회원전용과 연계'],
              ['전역 한도 UI', '제약 완화로 배너·잠금 체감 감소', '탭·통합검색 Base와 정합'],
            ]}
          />
        </Section>

        <Section title="8. 참조 경계">
          <ul className="text-xs text-gray-700 space-y-1.5 list-disc pl-5">
            <li>
              <SpecDocLink to="commonModals">CommonComponentsSpec</SpecDocLink>: 공통 UI의 기본 구조, 비회원 잠금·모양, 로딩/에러/Empty,
              하단 탭·통합검색 연동.
            </li>
            <li>
              <SpecDocLink to="searchGuestOverview">SearchScenarioSpec</SpecDocLink>: 통합검색 창 안의 한도·배너·탭 결과(회원은 제약 체감이
              달라짐).
            </li>
            <li>
              <SpecDocLink to="mypageOverview">마이페이지</SpecDocLink>·<SpecDocLink to="aigaDevRef">챗봇</SpecDocLink>·
              <SpecDocLink to="communityMemberBizOverview">커뮤니티 회원 탭</SpecDocLink>: 계정 저장·글쓰기·대화 이력의 상세 규칙.
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`bg-white rounded-2xl border border-gray-200 p-5 shadow-sm${id ? ' scroll-mt-36' : ''}`}
    >
      <h2 className="text-base font-black text-gray-900 mb-4 pb-2 border-b border-gray-200">{title}</h2>
      {children}
    </section>
  );
}

function Subheading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xs font-bold text-gray-900 mt-4 mb-1.5 first:mt-0">{children}</h3>;
}

function Narrative({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray-800 leading-relaxed">{children}</p>;
}

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((h, i) => (
              <th key={i} className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide px-2.5 py-2 border-b border-gray-100">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-2.5 py-2 text-gray-700 align-top border-b border-gray-50 ${ci === 0 ? 'font-medium text-gray-900 whitespace-nowrap' : ''}`}
                >
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
