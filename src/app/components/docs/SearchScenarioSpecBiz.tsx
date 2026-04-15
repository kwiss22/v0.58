// 통합 검색 전체 창 — 회원전용 화면정의서
import { useAppNavigation } from '../../contexts/AppNavigationContext';
import { SpecDocLink } from './SpecDocLink';

interface SearchScenarioSpecBizProps {
  /** 왼쪽 앱에서 검색어로 통합검색 미리보기 (비회원 Base 문서와 동일) */
  onTestSearch?: (keyword: string) => void;
}

export function SearchScenarioSpecBiz({ onTestSearch }: SearchScenarioSpecBizProps) {
  const { navigateToCommonSpec } = useAppNavigation();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-sm">
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">v0.58</span>
            <span className="bg-white/10 text-amber-100 text-[10px] px-2 py-0.5 rounded-full">회원전용</span>
          </div>
          <h1 className="text-xl font-black mb-1">🔎 통합 검색 — 회원 전용 이용 경험</h1>
          <p className="text-amber-100 text-xs leading-relaxed">
            비회원은 <strong className="text-white">맛보기·횟수 안내</strong>가 있고, 회원은 <strong className="text-white">같은 통합 검색 창</strong>에서 막힘 없이 이어 탐색하고, 열어본 뒤 행동까지 자연스럽게 연결됩니다.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <section id="spec-search-biz-role" className="scroll-mt-36 bg-violet-50 border border-violet-200 rounded-xl p-4">
          <p className="text-xs font-bold text-violet-900 mb-1">📌 문서 역할</p>
          <p className="text-xs text-violet-900 leading-relaxed">
            검색창·탭·목록·더 보기 버튼 등 <strong>화면 골격과 기본 동작</strong>은 비회원 문서{' '}
            <SpecDocLink to="searchGuestOverview">[SearchScenarioSpec]</SpecDocLink>과 <strong>동일</strong>합니다. 여기서는 회원이
            되었을 때만 달라지는 <strong>체감·권한·이어짐</strong>만 씁니다.
          </p>
        </section>

        <section id="spec-search-biz-limits" className="scroll-mt-36 bg-white rounded-xl border border-emerald-200 p-4 shadow-sm">
          <p className="text-xs font-bold text-emerald-900 mb-2">회원 전용 — 통합검색 이용 한도 해제</p>
          <p className="text-[11px] text-gray-700 leading-relaxed mb-3">
            비회원은 아래 횟수 제한이 있으며, 회원은 모두 <strong>무제한</strong>으로 이용할 수 있습니다.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-3 py-2 text-left font-bold text-gray-700">항목</th>
                  <th className="px-3 py-2 text-left font-bold text-gray-700">비회원</th>
                  <th className="px-3 py-2 text-left font-bold text-gray-700">회원</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-white">
                  <td className="px-3 py-2 text-gray-900 font-medium">검색 실행</td>
                  <td className="px-3 py-2 text-gray-700">3회/일</td>
                  <td className="px-3 py-2 text-emerald-800 font-semibold">무제한</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="px-3 py-2 text-gray-900 font-medium">프로필 조회</td>
                  <td className="px-3 py-2 text-gray-700">3회/일</td>
                  <td className="px-3 py-2 text-emerald-800 font-semibold">무제한</td>
                </tr>
                <tr className="border-b border-gray-100 bg-white">
                  <td className="px-3 py-2 text-gray-900 font-medium">게시글 열람</td>
                  <td className="px-3 py-2 text-gray-700">5회/일</td>
                  <td className="px-3 py-2 text-emerald-800 font-semibold">무제한</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="px-3 py-2 text-gray-900 font-medium">한도 배너</td>
                  <td className="px-3 py-2 text-gray-700">표시</td>
                  <td className="px-3 py-2 text-emerald-800 font-semibold">미표시</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-3 py-2 text-gray-900 font-medium">자물쇠 차단 화면</td>
                  <td className="px-3 py-2 text-gray-700">표시</td>
                  <td className="px-3 py-2 text-emerald-800 font-semibold">미표시</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-gray-600 mt-3 leading-relaxed space-y-1">
            <span className="block">* 위 횟수는 홈·명의찾기·커뮤니티와 공유되는 전역 기준입니다.</span>
            <span className="block">
              * Base 문서{' '}
              <SpecDocLink to="searchGuestStates">3절 화면 상태</SpecDocLink> ① 한도 차단 화면은 회원에게 표시되지 않습니다.
            </span>
          </p>
        </section>

        <BizSection id="spec-search-biz-delta-overview" title="1. 회원이 체감하는 변화 (한눈에)">
          <ul className="text-xs text-gray-800 leading-relaxed list-disc pl-4 space-y-1.5">
            <li>
              <strong>«오늘 N회 남았어요»</strong> 같은 줄이나, 검색을 막아 두는 <strong>노란/주황 안내</strong>가 통합 검색 맨 위에서 사라지거나 거의 보이지 않아, 화면이 한결 넓어 보입니다.
            </li>
            <li>
              검색어를 <strong>여러 번 바꿔도</strong> 가운데 큰 자물쇠 화면으로 가로막히지 않고, <strong>결과 탭과 목록</strong>이 이어집니다.
            </li>
            <li>
              명의·게시글 카드를 눌렀을 때 <strong>«오늘 볼 수 있는 횟수가 찼어요»</strong> 같은 막힘이 줄어, 프로필·글 내용을 <strong>끊기지 않고</strong> 볼 수 있습니다(서비스 정책 기준).
            </li>
            <li>
              카드를 열면 <strong>공감·댓글</strong>처럼 비회원에게 막혀 있던 행동이 <strong>로그인 창 없이</strong> 이어집니다. 의사
              저장·리뷰 작성 등 <strong>카드 안 세부 기능</strong>은{' '}
              <SpecDocLink to="commonBizRoot">공통 UI 컴포넌트 정의서</SpecDocLink>를 참조하세요.
            </li>
            <li>결과: 검색창이 항상 열려 있고, 탭·목록이 바로 보이는 상태가 기본값입니다.</li>
          </ul>
        </BizSection>

        <BizSection id="spec-search-biz-flow" title="2. 검색과 목록 — 회원 기준 동작">
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
              <p className="text-xs font-bold text-gray-900 mb-2">비회원과 동일한 것</p>
              <ul className="text-xs text-gray-800 leading-relaxed list-disc pl-4 space-y-1.5">
                <li>탭 자동 전환 (결과 있는 첫 번째 탭으로 이동)</li>
                <li>10개씩 무한 스크롤</li>
                <li>더 보기 버튼 동작</li>
                <li>검색어 분류 로직 (증상형·병원명·질환·진료과)</li>
              </ul>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-3">
              <p className="text-[10px] font-bold text-emerald-800 mb-1.5">회원 전용</p>
              <p className="text-xs font-bold text-emerald-950 mb-2">회원에서만 달라지는 것</p>
              <ul className="text-xs text-emerald-950 leading-relaxed list-disc pl-4 space-y-1.5 marker:text-emerald-800">
                <li>사용량 배너 미표시 (헤더 아래 잔여 횟수 영역 없음)</li>
                <li>검색창 잠금 없음 (입력 항상 가능)</li>
                <li>횟수 차감 없음 (카드 클릭 시 한도 팝업 없음)</li>
                <li>검색·스크롤·탭 전환 횟수 제한 없음</li>
              </ul>
            </div>
          </div>
        </BizSection>

        <BizSection id="spec-search-biz-cards" title="3. 결과 카드를 눌렀을 때 — 열리는 뒷장면">
          <SubBlock title="명의(의사) 카드" lead />
          <p className="text-xs text-gray-800 leading-relaxed mb-2">
            <strong>최소 흐름:</strong> 목록에서 의사 카드를 누르면 통합 검색은 닫히거나 뒤로 가고,{' '}
            <strong>의사 프로필(공통 모달)</strong>이 열립니다. 프로필 안의 저장·리뷰 등 버튼 동작·문구는 통합검색 문서가 아니라{' '}
            <SpecDocLink to="commonBizRoot">공통 UI 컴포넌트 정의서</SpecDocLink> 기준입니다.
          </p>
          <p className="text-xs text-gray-800 leading-relaxed mb-2">회원 추가 권한: 즐겨찾기·리뷰 작성 버튼 활성화</p>
          <SubBlock title="병원 카드" />
          <div className="text-xs text-gray-800 leading-relaxed mb-2 space-y-1.5">
            <p>카드 구성: 병원명·소속 명의 수·진료과 태그</p>
            <p>
              <strong>최소 흐름:</strong> 병원 카드 클릭 → 병원 정보 창 오픈
            </p>
            <p>병원 정보 창 구성: 병원명·주소·전화번호·지도보기·홈페이지 이동 버튼</p>
            <p>회원/비회원 모두 제한 없음 (한도 차감 없음)</p>
            <p>소속 명의 상세 연결 현재 미지원</p>
          </div>
          <SubBlock title="게시글 카드" />
          <p className="text-xs text-gray-800 leading-relaxed mb-2">
            <strong>최소 흐름:</strong> 게시글 카드를 누르면 <strong>글 상세(공통 패턴)</strong>가 열리고 본문·댓글 영역이 보입니다.
            공감·댓글·신고 등 상호작용 세부는 <SpecDocLink to="communityMemberBizOverview">CommunityTabSpecBiz</SpecDocLink>와 동일하게
            적용합니다.
          </p>
          <p className="text-xs text-gray-800 leading-relaxed mb-2">회원 추가 권한: 공감·댓글·신고 활성화</p>
        </BizSection>

        <BizSection id="spec-search-biz-after-login" title="4. 로그인 뒤에 이어지는 편의">
          <ul className="text-xs text-gray-800 leading-relaxed list-disc pl-4 space-y-1.5">
            <li>
              통합 검색에서 <strong>저장·작성</strong>한 내용은 계정에 묶여, 나중에{' '}
              <SpecDocLink to="mypageOverview">마이페이지</SpecDocLink>나 해당 탭에서 다시 찾기 쉽습니다(세부는 마이페이지·각 탭 정의서).
            </li>
          </ul>
        </BizSection>

        <BizSection id="spec-search-biz-verify" title="5. 검증할 때 (비회원 문서와 같이 쓰기)">
          <p className="text-xs text-gray-800 leading-relaxed mb-3">
            <SpecDocLink to="searchGuestOverview">비회원 통합검색 문서</SpecDocLink>의 <strong>검증 시나리오(키워드 목록)</strong>를 그대로
            써도 됩니다. 회원으로 미리볼 때는 <strong>한도 배너·자물쇠 전체 화면</strong>이 뜨지 않는 것이 자연스럽습니다.
          </p>
          {onTestSearch && (
            <div className="flex flex-wrap gap-2">
              {['간암', '서울아산병원', '배가 아파요'].map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => onTestSearch(kw)}
                  className="text-[11px] font-medium px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200"
                >
                  «{kw}» 로 테스트
                </button>
              ))}
            </div>
          )}
        </BizSection>

        <BizSection id="spec-search-biz-refs" title="6. 참조 문서">
          <p className="text-[11px] text-gray-600 mb-2">위 한도 표·4절에 없는 세부만 아래에서 보완합니다.</p>
          <ul className="text-xs text-gray-700 space-y-1.5 list-disc pl-5">
            <li>
              <SpecDocLink to="searchGuestOverview">공통(통합검색) 정의서 [비회원 탭]</SpecDocLink> — 통합검색 화면·비회원 한도·탭·무한 스크롤{' '}
              <strong>기준(Base)</strong>
            </li>
            <li>
              <SpecDocLink to="commonBizRoot">공통 UI 컴포넌트 정의서</SpecDocLink> — 의사 프로필 레이아웃·리뷰 작성 단계
            </li>
            <li>
              <SpecDocLink to="communityMemberBizOverview">커뮤니티 탭 회원 정의서</SpecDocLink> — 게시글 ⋮ 메뉴·답글·글쓰기 등
            </li>
            <li>
              <SpecDocLink to="doctorMemberDelta">명의찾기 탭 회원 정의서</SpecDocLink> · <SpecDocLink to="homeMemberDelta">홈 탭 회원 정의서</SpecDocLink>{' '}
              — «더 보기»로 이동한 뒤 탭별 회원 경험
            </li>
          </ul>
          <button
            type="button"
            onClick={navigateToCommonSpec}
            className="mt-3 text-[11px] px-3 py-1.5 rounded-lg bg-violet-600 text-white hover:bg-violet-700"
          >
            공통(컴포넌트) 회원 문서로 이동
          </button>
          <p className="text-[10px] text-gray-500 mt-2">
            비회원(Base) 통합검색 문서는 상단 역할을 비회원으로 바꾼 뒤{' '}
            <SpecDocLink to="searchGuestOverview">같은 탭</SpecDocLink>에서 확인할 수 있습니다.
          </p>
        </BizSection>
      </div>
    </div>
  );
}

function BizSection({
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
      className={`bg-white rounded-xl border border-gray-200 p-4 shadow-sm${id ? ' scroll-mt-36' : ''}`}
    >
      <h2 className="text-sm font-black text-gray-900 mb-3 pb-2 border-b border-gray-200">{title}</h2>
      {children}
    </section>
  );
}

function SubBlock({ title, lead }: { title: string; lead?: boolean }) {
  return (
    <p className={`text-base font-bold text-blue-600 mb-2 ${lead ? 'mt-3' : 'mt-4'}`}>{title}</p>
  );
}
