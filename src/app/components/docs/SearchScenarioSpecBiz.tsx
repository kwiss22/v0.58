// 통합 검색 전체 창 — 회원(Delta) 전용 화면정의서
import { useAppNavigation } from '../../contexts/AppNavigationContext';

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
            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">v0.6</span>
            <span className="bg-white/10 text-amber-100 text-[10px] px-2 py-0.5 rounded-full">회원 탭 (Delta)</span>
          </div>
          <h1 className="text-xl font-black mb-1">🔎 통합 검색 — 회원 전용 이용 경험</h1>
          <p className="text-amber-100 text-xs leading-relaxed">
            비회원은 <strong className="text-white">맛보기·횟수 안내</strong>가 있고, 회원은 <strong className="text-white">같은 통합 검색 창</strong>에서 막힘 없이 이어 탐색하고, 열어본 뒤 행동까지 자연스럽게 연결됩니다.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <section className="bg-violet-50 border border-violet-200 rounded-xl p-4">
          <p className="text-xs font-bold text-violet-900 mb-1">📌 문서 역할</p>
          <p className="text-xs text-violet-900 leading-relaxed">
            검색창·탭·목록·더 보기 버튼 등 <strong>화면 골격과 기본 동작</strong>은 비회원 문서 <strong>[SearchScenarioSpec]</strong>과{' '}
            <strong>동일</strong>합니다. 여기서는 회원이 되었을 때만 달라지는 <strong>체감·권한·이어짐</strong>만 씁니다.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-emerald-200 p-4 shadow-sm">
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
            <span className="block">* Base 문서 3절 ⑤ 한도 차단 화면은 회원에게 표시되지 않습니다.</span>
          </p>
        </section>

        <BizSection title="1. 회원이 체감하는 변화 (한눈에)">
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
              카드를 열면 <strong>공감·댓글</strong>처럼 비회원에게 막혀 있던 행동이 <strong>로그인 창 없이</strong> 이어집니다. 의사 저장·리뷰 작성 등 <strong>카드 안 세부 기능</strong>은 <strong>공통 모달 회원 문서(CommonComponentsSpecBiz)</strong>를 참조하세요.
            </li>
          </ul>
        </BizSection>

        <BizSection title="2. 제한 안내가 사라질 때 — 어떤 화면이 되나요?">
          <p className="text-xs text-gray-800 leading-relaxed mb-3">
            비회원에게는 헤더 아래에 <strong>남은 횟수</strong> 안내가 붙거나, 횟수를 다 쓰면 <strong>입력창이 회색</strong>으로 바뀌고 연관 검색어가 숨겨지기도 합니다. 이 내용의 위치·문구는 전부 <strong>비회원 문서 7절</strong>과 같습니다.
          </p>
          <p className="text-xs text-gray-800 leading-relaxed">
            <strong>회원</strong>으로 들어오면, 같은 자리의 레이아웃은 그대로 두되 위와 같은 <strong>막는 느낌의 안내</strong>가 나오지 않아, 사용자는{' '}
            <strong>검색창에 바로 글을 이어 쓰고</strong>, 아래로 내려 <strong>명의·병원·커뮤니티 탭</strong>을 고르는 데 집중할 수 있습니다. 즉 &quot;시원하게 열린 검색 창&quot;이 기본 경험에 가깝습니다.
          </p>
        </BizSection>

        <BizSection title="3. 검색과 목록 — 멈추지 않고 이어 쓰기">
          <p className="text-xs text-gray-800 leading-relaxed">
            탭이 결과 있는 쪽으로 맞춰지고, 한 번에 10개씩 더 불러오는 방식 등은 <strong>비회원 정책과 동일</strong>합니다. 회원에게 달라지는 점은{' '}
            <strong>검색·스크롤·탭 전환을 반복해도 «오늘은 여기까지»</strong>에 가로막히지 않는다는 <strong>심리적·실제 여유</strong>입니다. 하단 «명의찾기에서 더 보기» «커뮤니티에서 더 보기»로 넘어가는 길도 같은 버튼을 쓰며, 넘어간 뒤 탭별 회원 경험은 각 탭의 회원 문서를 보면 됩니다.
          </p>
        </BizSection>

        <BizSection title="4. 결과 카드를 눌렀을 때 — 열리는 뒷장면">
          <SubBlock title="명의(의사) 카드" />
          <p className="text-xs text-gray-800 leading-relaxed mb-2">
            <strong>최소 흐름:</strong> 목록에서 의사 카드를 누르면 통합 검색은 닫히거나 뒤로 가고, <strong>의사 프로필(공통 모달)</strong>이 열립니다. 프로필 안의 저장·리뷰 등 버튼 동작·문구는 통합검색 문서가 아니라 <strong>CommonComponentsSpecBiz</strong> 기준입니다.
          </p>
          <SubBlock title="게시글 카드" />
          <p className="text-xs text-gray-800 leading-relaxed mb-2">
            <strong>최소 흐름:</strong> 게시글 카드를 누르면 <strong>글 상세(공통 패턴)</strong>가 열리고 본문·댓글 영역이 보입니다. 공감·댓글·신고 등 상호작용 세부는 <strong>CommunityTabSpecBiz</strong>와 동일하게 적용합니다.
          </p>
        </BizSection>

        <BizSection title="5. 로그인 뒤에 이어지는 편의">
          <ul className="text-xs text-gray-800 leading-relaxed list-disc pl-4 space-y-1.5">
            <li>
              통합 검색에서 <strong>저장·작성</strong>한 내용은 계정에 묶여, 나중에 <strong>마이페이지</strong>나 해당 탭에서 다시 찾기 쉽습니다(세부는 마이페이지·각 탭 정의서).
            </li>
            <li>
              검색만 하고 나가도, 회원 세션에서는 <strong>맛보기 때 쌓인 제약 메시지</strong> 대신 <strong>실제로 해본 행동</strong>이 남는 쪽에 가깝게 설계하는 것이 목표입니다.
            </li>
          </ul>
        </BizSection>

        <BizSection title="6. 검증할 때 (비회원 문서와 같이 쓰기)">
          <p className="text-xs text-gray-800 leading-relaxed mb-3">
            비회원 통합검색 문서의 <strong>검증 시나리오(키워드 목록)</strong>를 그대로 써도 됩니다. 회원으로 미리볼 때는 <strong>한도 배너·자물쇠 전체 화면</strong>이 뜨지 않는 것이 자연스럽습니다.
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

        <BizSection title="7. 참조 문서">
          <p className="text-[11px] text-gray-600 mb-2">위 한도 표·4절에 없는 세부만 아래에서 보완합니다.</p>
          <ul className="text-xs text-gray-700 space-y-1.5 list-disc pl-5">
            <li>
              <strong>SearchScenarioSpec</strong> — 통합검색 화면·비회원 한도·탭·무한 스크롤 <strong>기준(Base)</strong>
            </li>
            <li>
              <strong>CommonComponentsSpecBiz</strong> — 의사 프로필 레이아웃·리뷰 작성 단계
            </li>
            <li>
              <strong>CommunityTabSpecBiz</strong> — 게시글 ⋮ 메뉴·답글·글쓰기 등
            </li>
            <li>
              <strong>DoctorSearchSpecBiz · HomeTabSpecBiz</strong> — «더 보기»로 이동한 뒤 탭별 회원 경험
            </li>
          </ul>
          <button
            type="button"
            onClick={navigateToCommonSpec}
            className="mt-3 text-[11px] px-3 py-1.5 rounded-lg bg-violet-600 text-white hover:bg-violet-700"
          >
            공통(컴포넌트) 회원 문서로 이동
          </button>
          <p className="text-[10px] text-gray-500 mt-2">비회원(Base) 통합검색 문서는 상단 역할을 비회원으로 바꾼 뒤 같은 탭에서 확인할 수 있습니다.</p>
        </BizSection>
      </div>
    </div>
  );
}

function BizSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <h2 className="text-sm font-black text-gray-900 mb-3 pb-2 border-b border-gray-200">{title}</h2>
      {children}
    </section>
  );
}

function SubBlock({ title }: { title: string }) {
  return <p className="text-[11px] font-bold text-gray-700 mt-2 first:mt-0 mb-1">{title}</p>;
}
