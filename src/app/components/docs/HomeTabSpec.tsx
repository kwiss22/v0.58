// 홈탭 화면정의서 — UI/UX 관점 (프로토타입 화면 참고 · 데이터는 더미)
import { useAppNavigation } from '../../contexts/AppNavigationContext';
import { DISEASE_CATEGORIES, DOCTORS } from '@/constants/doctor-data';

export function HomeTabSpec() {
  const { navigateToHomeWithCategory, navigateToChat, navigateToCommunity, openDoctorProfile } = useAppNavigation();

  // 샘플 의사 데이터 (폐암 카테고리의 첫 번째 의사)
  const sampleDoctor = DOCTORS.find(d => d.diseaseArea === '폐암') || DOCTORS[0];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-sm">
      {/* 문서 헤더 */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-3 py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">v0.6</span>
          <span className="bg-white/10 text-blue-100 text-[10px] px-2 py-0.5 rounded-full">2026.03.27</span>
          <span className="bg-yellow-400/90 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">🎨 UI/UX</span>
        </div>
        <h1 className="text-base font-black mb-1">홈 화면</h1>
        <p className="text-blue-200 text-[10px]">UI/UX · IA · 인터랙션 (옆 프로토타입 화면 참고)</p>
      </div>

      <div className="px-3 py-4 space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-3">
          <p className="text-xs font-bold text-amber-900 mb-1">📌 이 문서의 범위</p>
          <ul className="text-[11px] text-amber-900 space-y-1 list-disc list-inside leading-relaxed">
            <li><strong>다루는 것:</strong> 영역 구획, 시각적 패턴, 터치·스크롤·모달 등 사용자 경험, 회원/비회원 구분 같은 정책 방향.</li>
            <li><strong>참고만 하는 것:</strong> 옆에 띄운 <strong>데모(프로토타입) 화면</strong>의 레이아웃·동작. 화면에 채워진 숫자·글·명의·게시글 목록은 <strong>더미 데이터</strong>이므로 실제 서비스의 API·랭킹·노출 규칙과 같다고 보지 않습니다.</li>
            <li><strong>실서비스:</strong> 데이터 소스·선정 로직·한도 수치는 백엔드·운영 정책에 따르며, 본 문서는 그에 맞춘 UI가 어떻게 보이고 어떻게 반응해야 하는지를 적습니다.</li>
          </ul>
        </div>

        {/* ───── 1. 화면 개요 ───── */}
        <Section id="overview" title="1. 화면 개요" color="blue">
          <Table
            headers={['항목', '내용']}
            rows={[
              ['화면 이름', '홈 화면 (첫 번째 탭)'],
              ['진입 방법', '웹을 처음 열거나, 하단 탭 메뉴에서 \"홈\" 터치'],
              ['대상 사용자', '비회원 · 회원 공통 (일부 기능만 구분)'],
              ['화면의 목적', 'AI 챗봇 유도 / 질환별 인기 명의 탐색 / 커뮤니티 추천글 열람·공감 / 건강 정보(외부 링크)'],
              ['화면 형태', '상단 고정 헤더 + 위아래 스크롤 콘텐츠 + 하단 탭 메뉴'],
              ['기준 화면', '모바일 우선, PC/태블릿은 가운데 정렬로 표시'],
            ]}
          />
        </Section>

        {/* ───── 2. 화면 구성 ───── */}
        <Section id="layout" title="2. 화면 구성 (위에서 아래 순서)" color="indigo">

          <SubSection label="구역 1" title="상단 헤더">
            <div className="mb-3 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
              <p className="text-xs font-bold text-blue-800 mb-1">🔍 통합 검색 — UI 배치 (프로토타입과 동일)</p>
              <p className="text-xs text-blue-900">
                상단 바에는 <strong>로고만</strong> 두고, 통합 검색은 <strong>반응형 웹</strong> UI에서 페이지 헤더 바깥·<strong>메인 뷰(모바일 우선 폭의 콘텐츠 영역) 우상단에 고정</strong>된 돋보기 버튼으로 배치합니다(홈·명의 찾기·커뮤니티에서 공통).
                페이지 헤더 줄과 겹치지 않으며, 본문을 세로 스크롤해도 버튼 위치는 유지되는 것이 UX 목표입니다.
              </p>
            </div>
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['AIGA 로고 (왼쪽)', 'PNG 로고 이미지', '헤더 바 내부. 탭 이동 네비는 하단 탭 사용'],
                ['헤더 우측', '비움', '통합 검색 진입은 헤더 밖·메인 뷰 우상단 고정 돋보기(위 박스). 네이티브 앱이 아닌 반응형 웹 기준'],
              ]}
            />
          </SubSection>

          <SubSection label="구역 2" title="AI 챗봇 배너">
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['배경색', '파란색 계열 그라디언트', '디자인 시안 확정 후 색상 조정 가능'],
                ['문구', '\"AI 의료 챗봇 / Aiga에게 물어보세요 / 증상 체크부터 명의 추천까지\"', '—'],
                ['터치 시 이동', '하단 두 번째 탭 \"AIGA\" 채팅 화면으로 이동', '—'],
              ]}
            />
            {/* 인터랙티브 네비게이션 */}
            <div className="mt-4 flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
              <span className="text-purple-700 text-sm font-medium">🎯 화면 시나리오:</span>
              <button
                onClick={navigateToChat}
                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                채팅 화면으로 이동
              </button>
            </div>
          </SubSection>

          <SubSection label="구역 3" title="주요 질환 인기 명의">
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['섹션 제목', '\"주요 질환 인기 명의\"', '—'],
                ['질환 탭 (최대 10개)', '400여 개 표준진료분야 중 월별 기간(1주~1개월 선택 가능) 동안 검색 랭킹 상위 10개를 가로 스크롤로 표시', '기준: 명의찾기 검색, AI 챗봇 검색, 추천 클릭 합산 랭킹'],
                ['기본 선택 탭', '랭킹 1위 질환이 기본 선택 상태로 표시됨', '—'],
                ['탭 선택 시', '해당 질환의 명의 목록이 즉시 바뀜', '—'],
                ['의사 카드', '프로필 사진 · 이름 · 병원명 · 진료과 · 화살표 (터치 시 프로필 팝업 이동)', '최대 7명, 검색량 많은 순'],
                ['카드 터치 시', '의사 상세 팝업(공통)', '—'],
                ['목록·순위 (데이터)', 'UI는 카드 리스트·탭 전환. 실제 명의 풀·정렬은 서버/기획 (프로토타입은 더미)', '—'],
              ]}
            />
            {/* 인터랙티브 네비게이션 */}
            <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-indigo-700 text-sm font-medium">🎯 화면 시나리오:</span>
              </div>

              {/* 질환 탭 선택 */}
              <div>
                <p className="text-xs text-indigo-600 font-medium mb-2">질환 탭 선택:</p>
                <div className="grid grid-cols-3 gap-2">
                  {DISEASE_CATEGORIES.slice(0, 9).map((category) => (
                    <button
                      key={category.name}
                      onClick={() => navigateToHomeWithCategory(category.name)}
                      className="px-3 py-1.5 bg-white hover:bg-indigo-600 hover:text-white border border-indigo-300 text-indigo-700 text-xs font-medium rounded-lg transition-colors"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 의사 카드 터치 */}
              <div>
                <p className="text-xs text-indigo-600 font-medium mb-2">의사 카드 터치 시 프로필 팝업 열기:</p>
                <button
                  onClick={() => openDoctorProfile(sampleDoctor)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  예: {sampleDoctor.name} 교수 프로필 보기
                </button>
              </div>
            </div>
            <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <p className="text-sm font-bold text-indigo-800 mb-1">🔗 데이터 상태 처리</p>
              <p className="text-sm text-indigo-900">
                로딩 중, 에러 발생, 데이터 없음 상태 표시는 <span className="font-bold text-indigo-700">공통 컴포넌트 문서 → 3. 데이터 상태 UI</span>를 참조하세요.
              </p>
            </div>
          </SubSection>

          <SubSection label="구역 4" title="커뮤니티 추천글 가로 스크롤">
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['제목·더보기', '\"커뮤니티 추천글\" 제목 + \"더보기 →\" 버튼. 더보기 클릭 시 커뮤니티 탭으로 이동', '—'],
                ['카드 수', '최대 5장. 최근 3개월 이내 작성된 글 중 인기 점수(좋아요×10 + 댓글×3 + 조회수×1) 상위 20~30개에서 랜덤으로 5개 선택하여 표시', '정렬 기준: 인기 점수 기반 랜덤 샘플링'],
                ['스크롤 방식', '가로 스크롤 (터치 스크롤 최적화). 부모 스크롤과의 충돌 방지 + iOS Safari 터치 스크롤 최적화', '—'],
                ['카드 내용', '작성자 프로필 사진 · 닉네임 · 날짜 (24시간 이내: N분, N시간 전 / 7일 이내: N일 전 / 그 이후: YYYY.MM.DD) · 글 제목(최대 2줄, 초과 시 말줄임표) · 내용 미리보기(본문 첫 50자, 초과 시 ... 표시) · 공감 수 · 댓글 수', '조회수는 표시하지 않음 (v1.1 변경)'],
                ['인증 뱃지', '인증된 작성자 카드에 체크 뱃지 표시', '—'],
                ['카드 터치 시', '해당 커뮤니티 글 상세 팝업 열림 + 조회수 카운팅 시작', '조회수는 화면에 표시하지 않으나 백엔드에서 수집'],
                ['조회수 증가 조건', '팝업을 열고 3초 이상 머무름 + 같은 사용자가 24시간 이내 읽지 않은 글일 때만 +1', '실수 클릭 제외, 어뷰징 방지, 인기 점수 산출 및 운영 데이터 분석에 활용'],
              ]}
            />
            <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-slate-900 mb-2">👥 비회원 / 회원 (구역 4 — 추천글 섹션)</p>
              <Table
                headers={['기능', '비회원', '회원', '비고']}
                rows={[
                  ['추천글 카드·가로 스크롤', '✅ 열람', '✅ 열람', 'UI 동일. 카드에는 공감·댓글 수만 표시(카드에서 직접 공감 불가)'],
                  [
                    '카드 터치 → 상세 팝업',
                    '✅ 가능. 비회원 게시글 열람 한도 정책이면 1회 차감, 소진 시 한도 안내',
                    '✅ 가능. 열람 한도 없음(항상 통과). 같은 팝업에서 조회수 +1 타이머·3초·24시간 규칙은 비회원과 동일',
                    '구현: 회원은 consumePostView가 항상 허용. 조회수는 화면 미표시·백엔드만',
                  ],
                  ['상세: 본문·질환 태그·첨부 이미지', '✅ 열람', '✅ 열람', '이미지는 라이트박스 등으로 확대'],
                  ['상세: 게시글 공감', '❌ 탭 시 로그인 유도', '✅ 토글(재탭 시 취소). 내가 누른 상태는 하트 표시', '홈 추천 카드 목록과 숫자·상태 동기화 UX 목표'],
                  ['상세: 댓글·답글', '❌ 입력 비활성·하단 안내', '✅ 댓글 작성·전송, 답글 작성', '답글 시에도 로그인 필요 패턴과 동일'],
                  ['상세: 댓글·답글 공감', '❌ 로그인 유도', '✅ 각 댓글/답글 공감 토글', '—'],
                  ['상세: ⋮ 더보기 메뉴', '공유하기만 노출', '공유 + 본인 글 → 수정·삭제 / 타인 글·댓글 → 신고', '게시글·타인 댓글 신고는 회원만'],
                  ['상세: 병원·의사 미니 카드', '버튼 노출 시 정책에 따라 열람', '동일 + 병원 정보·의사 프로필 등 연결 동작', '글에 연동된 경우에만 노출'],
                  ['더보기 → 커뮤니티 탭', '✅ 이동', '✅ 이동 후 전체 피드·질환·진료과 필터·글쓰기 등 회원 기능 전부', '구역 4는 샘플 5개, 탭은 전체'],
                ]}
              />
              <div className="mt-3 pt-3 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-800 mb-2">회원 — 구역 4에서 이어지는 행위 (요약)</p>
                <ul className="text-xs text-slate-700 space-y-1.5 ml-4 list-disc">
                  <li>홈에서는 추천 5개만 보이지만, 회원은 열람 한도 없이 아무 카드나 열어 글 전체·댓글 스레드를 읽을 수 있음.</li>
                  <li>반응: 게시글 공감, 댓글·대댓글 작성·공감까지 모두 가능(비회원은 열람 위주).</li>
                  <li>운영·신뢰: 남의 글·댓글 신고, 내가 쓴 글이 노출된 경우 수정·삭제(⋮ 메뉴).</li>
                  <li>확장 탐색: 상세를 닫고 더보기로 커뮤니티 탭에 들어가면 검색·카테고리·내 작성글 등 나머지 커뮤니티 회원 기능 사용.</li>
                  <li>(정책) 빈 목록 안내의 글쓰기 유도는 회원이면 바로 글쓰기 플로로 연결하는 것이 목표(구현은 후속).</li>
                </ul>
              </div>
            </div>
            <div className="mt-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-green-800 mb-1">✅ 게시글 0개 시 빈 화면 처리 — 정책 결정 완료</p>
              <p className="text-xs text-green-900"><span className="font-semibold">처리 방식:</span> 게시글이 하나도 없을 때 카드를 숨기지 않고 &quot;첫 번째 글을 작성해보세요&quot; 문구 + 커뮤니티 글쓰기 유도 버튼이 있는 안내 카드를 표시.</p>
              <p className="text-xs text-green-900 mt-1"><span className="font-semibold">⚠️ 미구현:</span> 현재 빈 배열 체크 로직 없음. 추후 구현 필요.</p>
            </div>
            <div className="mt-3 bg-purple-50 border border-purple-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-purple-800 mb-1">💡 인기 점수 산출 기준</p>
              <p className="text-xs text-purple-900 mb-2">인기 점수 = 좋아요 × 10 + 댓글 × 3 + 조회수 × 1</p>
              <p className="text-xs text-purple-900"><span className="font-semibold">선정 방식:</span> ① 최근 3개월 이내 작성된 글 필터링 → ② 인기 점수 계산 → ③ 상위 20~30개 추출 → ④ 그 중 랜덤으로 5개 선택하여 표시</p>
              <p className="text-xs text-purple-900 mt-1"><span className="font-semibold">효과:</span> 매번 진입 시 다른 인기글 노출로 신선함 유지. 좋아요 가중치가 높아 실제 도움이 된 글 우선 노출. 조회수만 높은 제목 낚시글 배제.</p>
            </div>
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-amber-800 mb-1">🔐 조회수 카운팅 정책</p>
              <p className="text-xs text-amber-900 mb-2"><span className="font-semibold">증가 조건:</span> 게시글 팝업을 열고 3초 이상 머무름 + 동일 사용자가 24시간 이내 해당 글을 읽지 않았을 때만 조회수 +1</p>
              <p className="text-xs text-amber-900"><span className="font-semibold">화면 표시:</span> 조회수는 커뮤니티 카드에 표시하지 않음. 백엔드에서만 수집하여 인기 점수 계산 및 운영 데이터 분석에 활용. 추후 마이페이지 &quot;내가 쓴 글&quot; 섹션에서 작성자에게만 표시 가능.</p>
            </div>
            {/* 인터랙티브 네비게이션 */}
            <div className="mt-4 flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <span className="text-green-700 text-sm font-medium">🎯 화면 시나리오:</span>
              <button
                onClick={navigateToCommunity}
                className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                커뮤니티 탭으로 이동
              </button>
            </div>
            <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <p className="text-sm font-bold text-indigo-800 mb-1">🔗 데이터 상태 처리</p>
              <p className="text-sm text-indigo-900">
                로딩 중, 에러 발생, 데이터 없음 상태 표시는 <span className="font-bold text-indigo-700">공통 컴포넌트 문서 → 3. 데이터 상태 UI</span>를 참조하세요.
              </p>
            </div>
          </SubSection>

          <SubSection label="구역 5" title="건강 정보 — 외부 소스 실시간 무한 스크롤">
            <div className="mb-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-blue-800 mb-1">🔄 변경 — 코메디닷컴 등 외부에서 실시간으로 기사 가져오기</p>
              <p className="text-xs text-blue-900">건강 정보를 코메디닷컴 같은 외부 건강 미디어에서 실시간으로 가져와 표시합니다. 스크롤을 내릴 때마다 계속해서 새로운 기사가 추가되는 무한 스크롤입니다.</p>
            </div>
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['첫 진입 시', '건강 정보 카드 4개 표시', '—'],
                ['스크롤 내리면', '4개씩 새로운 기사 추가로 불러옴', '끝이 없이 계속 이어짐'],
                ['기사 출처', '코메디닷컴 등 외부 건강 미디어', '실시간으로 최신 기사 공급'],
                ['카드 터치 시', '새 탭으로 외부 기사 바로 열림', '건강 기사 팝업 없음(외부 링크만)'],
                ['카드 이미지', '기사 원문의 이미지', '외부 소스 썸네일 사용'],
              ]}
            />
            <div className="mt-3 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <p className="text-sm font-bold text-indigo-800 mb-1">🔗 데이터 상태 처리</p>
              <p className="text-sm text-indigo-900">
                로딩 중, 에러 발생, 데이터 없음 상태 표시는 <span className="font-bold text-indigo-700">공통 컴포넌트 문서 → 3. 데이터 상태 UI</span>를 참조하세요.
              </p>
            </div>
            <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm font-bold text-green-800 mb-1">💡 데이터 (프로토타입 vs 목표)</p>
              <p className="text-sm text-green-900"><strong>UI/UX 목표:</strong> 외부 건강 미디어 등에서 가져온 기사를 카드로 보여 주고, 탭 시 <strong>팝업 없이</strong> 원문으로 이동, 스크롤 시 더 불러오기.</p>
              <p className="text-sm text-green-900 mt-1"><strong>프로토타입:</strong> 고정된 샘플 목록을 반복해 무한 스크롤을 시연할 수 있음 — 실제 피드와 동일하지 않음.</p>
            </div>
          </SubSection>

          <SubSection label="구역 6" title="하단 탭 메뉴 🔗 공통 컴포넌트">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <p className="text-sm text-indigo-900">
                <span className="font-bold">🔗 공통 컴포넌트</span><br />
                하단 탭 메뉴는 모든 주요 화면에서 재사용되는 전역 레이아웃 컴포넌트입니다. 자세한 내용은 <span className="font-bold text-indigo-700">공통 컴포넌트 문서 → 4. 레이아웃 컴포넌트 (하단 탭 메뉴)</span>를 참조하세요.
              </p>
            </div>
          </SubSection>
        </Section>

        {/* ───── 3. 팝업 설명 ───── */}
        <Section id="modals" title="3. 팝업 설명" color="violet">

          <SubSection label="팝업 1" title="의사 프로필 🔗 공통 컴포넌트">
            <div className="mb-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-blue-800 mb-1">🔗 공통 컴포넌트 — 홈 탭에서의 사용 방식</p>
              <p className="text-xs text-blue-900">이 팝업은 명의찾기 탭, 커뮤니티 탭 등 여러 화면에서 사용되는 공통 컴포넌트입니다. 여기서는 홈 탭에서의 진입 방식과 사용 맥락만 정의합니다.</p>
            </div>
            <Table
              headers={['항목', '설명', '비고']}
              rows={[
                ['진입 방식', '주요 질환 인기 명의 섹션의 의사 카드 터치 시', '—'],
                ['전달 데이터', '선택한 의사 정보 (이름, 병원, 진료과, 프로필 등)', '—'],
                ['상세 스펙', '📄 공통 컴포넌트 정의서 참조', '의사 정보, 리뷰 분석, 리뷰 목록, 북마크 등 전체 기능'],
              ]}
            />
          </SubSection>

          <SubSection label="팝업 2" title="커뮤니티 게시글 상세 (홈·통합검색 경로)">
            <div className="mb-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-blue-800 mb-1">구현상 이름 (참고)</p>
              <p className="text-xs text-blue-900">
                프로토타입에서는 홈·통합검색에서 연 <strong>상세 모달</strong>과 커뮤니티 탭 피드의 상세가 <strong>같은 UX를 목표로</strong> 하되, 코드상 모듈이 나뉘어 있을 수 있습니다. 기획·디자인은 <strong>화면 패턴(본문·공감·댓글·더보기)</strong>을 기준으로 맞추면 됩니다.
              </p>
            </div>
            <Table
              headers={['항목', '설명', '비고']}
              rows={[
                ['진입', '추천글 카드 터치', '비회원 열람 한도는 정책(데모에서만 적용될 수 있음)'],
                ['내용', '제목·본문·메타·댓글 등', '공통 컴포넌트 정의서의 게시글 상세 패턴 준수'],
                ['공감', '회원: 토글·재탭 취소 · 비회원: 로그인 유도', '카드에는 표시만'],
                ['상세', '댓글·더보기·커뮤니티 이동 등', '공통 문서 참조'],
              ]}
            />
            <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-emerald-800 mb-3">👥 비회원 / 회원 (상세 모달)</p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-emerald-900 mb-1">비회원</p>
                  <ul className="text-sm text-emerald-800 space-y-1 ml-4">
                    <li>• 댓글 입력창 비활성화 (자물쇠 아이콘)</li>
                    <li>• 하단 노란 안내 배너 + 로그인하기</li>
                    <li>• 게시글 공감 탭 시 로그인 유도 모달</li>
                    <li>• ⋮ 더보기: 공유하기만 (신고 숨김)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-900 mb-1">회원 (홈 구역 4 카드 → 동일 상세 모달)</p>
                  <ul className="text-sm text-emerald-800 space-y-1 ml-4">
                    <li>• 열람 한도 없이 상세 열기·본문·이미지 열람</li>
                    <li>• 게시글 공감 토글·재탭 취소(홈 추천 카드와 숫자 연동 목표)</li>
                    <li>• 댓글·답글 작성·전송, 댓글/답글 공감</li>
                    <li>• ⋮ 공유 / 본인 글 수정·삭제 / 타인 글·댓글 신고</li>
                    <li>• 글에 연동된 병원·의사 카드 등 부가 액션(프로젝트 정의서 기준)</li>
                  </ul>
                </div>
              </div>
            </div>
          </SubSection>

          <SubSection label="팝업 3" title="건강 기사 — 팝업 없이 외부 링크로 즉시 이동">
            <Table
              headers={['기능', '설명', '비고']}
              rows={[
                ['기사 열기', '새 탭에서 외부 기사 사이트로 즉시 이동', '팝업 없이 바로 이동'],
                ['이용 자격', '회원/비회원 구분 없이 누구나', '—'],
              ]}
            />
          </SubSection>

          <SubSection label="공통" title="리뷰 작성 🔗 공통 컴포넌트">
            <div className="mb-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-blue-800 mb-1">🔗 공통 컴포넌트 — 홈 탭에서의 사용 방식</p>
              <p className="text-xs text-blue-900">이 팝업은 의사 프로필 팝업 내부에서 호출되는 공통 컴포넌트입니다.</p>
            </div>
            <Table
              headers={['항목', '설명', '비고']}
              rows={[
                ['진입 방식', '의사 프로필 팝업 → 리뷰 작성 버튼 터치', '회원만 가능. 비회원은 로그인 유도 안내 표시'],
                ['상세 스펙', '📄 공통 컴포넌트 정의서 참조', '별점 선택, 리뷰 작성, 제출/취소 등 전체 기능'],
              ]}
            />
            <Note>
              비회원이 리뷰 작성 버튼을 터치하면 「로그인 유도 안내」 컴포넌트가 먼저 표시됩니다.
            </Note>
          </SubSection>

          <SubSection label="공통" title="로그인 유도 안내 🔗 공통 컴포넌트">
            <div className="mb-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-blue-800 mb-1">🔗 공통 컴포넌트 — 홈 탭에서의 사용 방식</p>
              <p className="text-xs text-blue-900">이 컴포넌트는 전체 앱에서 사용되는 공통 컴포넌트입니다.</p>
            </div>
            <Table
              headers={['항목', '설명', '비고']}
              rows={[
                ['진입 방식', '비회원이 즐겨찾기 또는 리뷰쓰기 버튼 터치 시', '의사 프로필 팝업 내부에서 표시'],
                ['상세 스펙', '📄 공통 컴포넌트 정의서 참조', '표시 형태, 문구, 로그인 경로 등'],
              ]}
            />
          </SubSection>
        </Section>

        {/* ───── 4. 회원/비회원 기능 차이 ───── */}
        <Section id="auth" title="4. 회원 / 비회원 기능 차이" color="emerald">
          <Table
            headers={['기능', '비회원', '회원', '비고']}
            rows={[
              ['홈 화면 전체 보기', '✅ 가능', '✅ 가능', '—'],
              ['질환 탭으로 명의 탐색', '✅ 가능', '✅ 가능', '—'],
              ['의사 프로필 열람', '✅ 가능', '✅ 가능', '—'],
              ['의사 즐겨찾기', '❌ 로그인 유도', '✅ 가능', '—'],
              ['의사 리뷰쓰기', '❌ 로그인 유도', '✅ 가능', '—'],
              ['커뮤니티 추천글 읽기', '✅ 가능', '✅ 가능', '—'],
              ['커뮤니티 게시글 공감 (상세 모달)', '❌ 로그인 유도', '✅ 토글(재탭 취소)', '홈·검색 경로 상세'],
              ['커뮤니티 댓글 작성', '❌ 입력창 비활성 + 안내문', '✅ 가능', '—'],
              ['커뮤니티 게시글 ⋮ 더보기 메뉴', '공유하기만 (신고 숨김)', '공유 + 수정/삭제 또는 공유 + 신고', '작성자 여부에 따라 분기 — 공통 명세'],
              ['건강 정보 열람', '✅ 가능', '✅ 가능', '—'],
            ]}
          />
          <Note>
            현재 웹 기본 상태는 비회원입니다. 로그인하면 회원 기능이 활성화됩니다.
          </Note>
        </Section>

        {/* 푸터 */}
      </div>
    </div>
  );
}

/* ─── 재사용 컴포넌트 ─── */

function Section({ id, title, color, children }: { id: string; title: string; color: string; children: React.ReactNode }) {
  const borderColors: Record<string, string> = {
    blue: 'border-blue-500',
    indigo: 'border-indigo-500',
    violet: 'border-violet-500',
    emerald: 'border-emerald-500',
    amber: 'border-amber-500',
  };
  const bgColors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-900',
    indigo: 'bg-indigo-50 text-indigo-900',
    violet: 'bg-violet-50 text-violet-900',
    emerald: 'bg-emerald-50 text-emerald-900',
    amber: 'bg-amber-50 text-amber-900',
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

function SubSection({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  const { navigateToCommonSpec } = useAppNavigation();
  const isCommonComponentLink = title.includes('🔗 공통 컴포넌트');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3.5">
      <div className="flex items-center gap-2 mb-3">
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
      {children}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
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

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
      <span className="text-blue-500 text-sm mt-0.5">ℹ️</span>
      <p className="text-xs text-blue-800">{children}</p>
    </div>
  );
}