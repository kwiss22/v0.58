// 커뮤니티 탭 화면정의서 — UI/UX (v0.58 · 프로토타입 참고·더미 데이터와 구분)

import { Heart, MessageCircle, Shield, BadgeCheck, ThumbsUp, User, Plus, MoreVertical, ArrowLeft, Search, X, Flag, Pencil, Trash2 } from 'lucide-react';
import { SpecDocLink } from './SpecDocLink';

export function CommunityTabSpec() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">커뮤니티 탭</span>
            <span className="bg-white/10 text-purple-100 text-xs px-3 py-1 rounded-full">UI/UX 화면정의서</span>
            <span className="bg-green-400/90 text-green-900 text-xs font-bold px-3 py-1 rounded-full">✅ v0.58 · UI/UX 중심</span>
          </div>
          <h1 className="text-3xl font-black mb-2">💬 커뮤니티 탭</h1>
          <p className="text-purple-200 text-sm">환자들이 경험을 공유하고 소통하는 게시판 · 프로토타입 화면은 레이아웃·인터랙션 참고용 (피드 내용은 더미)</p>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* 1. 개요 */}
        <section id="community-overview" className="scroll-mt-36 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">📌 개요</h2>
          <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900 leading-relaxed space-y-1">
            <p className="font-bold text-amber-950 mb-1">문서 범위</p>
            <p>본 문서는 <strong>UI/UX·정책·인터랙션</strong>을 정의합니다. 옆 <strong>데모 화면</strong>의 게시글·숫자·댓글 등은 <strong>더미</strong>이며 실제 서비스 데이터와 동일하지 않습니다. API·신고 처리·저장소 등은 실서비스 설계에 맞게 별도 확정합니다.</p>
            <p>
              <span className="font-bold">데모 번호(C01~C08):</span> 시범 화면의 동그란 번호와 이 문서의 동일 번호 블록이 짝입니다. 번호를 누르면 이쪽으로 스크롤됩니다. (C07은 상세가 모달·공통 탭 연결이라 피드에는 번호가 없을 수 있습니다.)
            </p>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              커뮤니티는 환자들이 <strong className="text-purple-600">병원·의사 방문 후기</strong>,{' '}
              <strong className="text-purple-600">치료 경험</strong>, <strong className="text-purple-600">궁금한 점</strong>을 자유롭게 공유하는 공간입니다.
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-3">
              <div className="font-bold text-purple-900 mb-2">핵심 가치</div>
              <ul className="space-y-2 text-xs text-purple-900">
                <li className="flex items-start gap-2">
                  <span>🛡️</span>
                  <span><strong>신뢰도</strong>: 병원진료인증 배지로 실제 경험 후기 구분</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✅</span>
                  <span><strong>전문성</strong>: 의사 인증 배지로 의료진 표시</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🔒</span>
                  <span><strong>안전성</strong>: 신고 기능으로 부적절한 콘텐츠 차단</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. 화면 구성 */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">🖼️ 화면 구성</h2>

          <div className="space-y-8">

            {/* 2.1 헤더 */}
            <div id="community-tag-c01" className="scroll-mt-32">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
                  title="데모 화면과 동일 번호"
                >
                  C01
                </span>
                <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                헤더
              </h3>
              <div className="ml-8 space-y-3">
                {/* 실제 헤더 UI 예시 */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold text-gray-900">커뮤니티</h1>
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="font-medium text-purple-900 mb-2 text-sm">헤더 구성 요소 (UI/UX — 프로토타입과 동일)</div>
                  <ul className="space-y-1.5 text-xs text-purple-900">
                    <li>• <strong>커뮤니티 페이지 상단 바</strong>: 좌측에 <strong>「커뮤니티」</strong> 제목만 표시 (이 줄 안에는 돋보기 없음)</li>
                    <li>• <strong>통합 검색</strong>: <strong>반응형 웹</strong> 전역 레이아웃에서 홈·명의 찾기·커뮤니티일 때 <strong>메인 뷰 우상단 고정</strong> 돋보기(본문 스크롤과 무관) — 커뮤니티 페이지 헤더 내부가 아님</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* 2.2 카테고리 필터 */}
            <div id="community-tag-c02" className="scroll-mt-32">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
                  title="데모 화면과 동일 번호"
                >
                  C02
                </span>
                <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                카테고리 필터
              </h3>
              <div className="ml-8 space-y-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-gray-700 mb-3">표시 조건: <span className="font-normal text-gray-600">전역 검색 중이거나 특정 유저 필터 중일 때는 자동으로 숨겨짐 (AnimatePresence)</span></p>

                  {/* 1차 필터 예시 */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">① 1차 필터 탭 (searchFilter · userFilter 없을 때 표시 — 검색/유저 필터 활성 시 1·2차 전체 숨겨짐)</p>
                    <div className="flex gap-2">
                      <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white">질병별</span>
                      <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600">진료과별</span>
                    </div>
                  </div>

                  {/* 2차 칩 행 예시 */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">② 2차 칩 행 — <strong>질병별</strong> 선택 시</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-600 text-white">전체</span>
                      {['고혈압', '당뇨', '무릎통증', '암'].map(d => (
                        <span key={d} className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{d}</span>
                      ))}
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-300 bg-white text-gray-500 flex items-center gap-1">
                        <Search className="w-3 h-3" />질환 검색
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">② 2차 칩 행 — <strong>진료과별</strong> 선택 시</p>
                    <div className="flex flex-wrap gap-2">
                      {['전체', '내과', '외과', '소아과', '피부과', '...'].map(d => (
                        <span key={d} className={`px-3 py-1.5 rounded-full text-xs font-medium ${d === '전체' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{d}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="font-medium text-blue-900 mb-2 text-sm">질환 검색 버튼 동작</div>
                  <ul className="space-y-1.5 text-xs text-blue-900">
                    <li>• 클릭 시 칩 행이 <strong>질환명 검색 입력창</strong>으로 교체 (슬라이드 전환 애니메이션)</li>
                    <li>• 좌측 ← 버튼: 검색 모드 종료 → 칩 행으로 복귀</li>
                    <li>• 검색창 플레이스홀더: <strong>"질환명 검색..."</strong></li>
                    <li>• 실시간 필터링: DISEASE_LIST 전체 목록에서 검색어 포함 항목만 표시</li>
                    <li>• 인기 질환 칩에 없는 질환 선택 시: 해당 질환명 칩이 X 버튼과 함께 표시됨</li>
                  </ul>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <div className="font-medium text-indigo-900 mb-2 text-sm">검색 결과 표시 규칙 (카테고리 필터 내부)</div>
                  <ul className="space-y-1.5 text-xs text-indigo-900">
                    <li>• <strong>입력 전</strong>: 결과 칩 영역은 표시하지 않음 (검색창만 노출)</li>
                    <li>• <strong>결과 있음</strong>: 검색어와 부분 일치하는 질환명을 최대 <strong>10개</strong> 칩으로 표시 (카테고리 소스는 내부 질환 DB·질환 그룹 분류 기준)</li>
                    <li>• <strong>결과 없음</strong>: &quot;검색 결과가 없습니다. 다른 질환명을 검색해 보세요.&quot; 안내 문구 표시</li>
                    <li>• <strong>결과 선택</strong>: 질환 칩 탭 시 즉시 해당 질환으로 필터 적용 → 검색 모드 종료 → 검색어 초기화</li>
                    <li>• <strong>필터 효과</strong>: 선택된 질환과 정확히 일치하는 게시글만 목록에 남고, 목록 상단 총 건수도 즉시 갱신</li>
                  </ul>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="font-medium text-emerald-900 mb-2 text-sm">필터 결과 상태 정의 (피드 영역)</div>
                  <ul className="space-y-1.5 text-xs text-emerald-900">
                    <li>• <strong>(공통) 결과 0개</strong>: 빈 상태 카드 표시 (아이콘 + &quot;아직 [선택 카테고리] 후기가 없어요&quot; + 안내 문구)</li>
                    <li>• <strong>(공통) 결과 1개 이상</strong>: 게시글 카드 목록 표시, 상단에 <strong>총 n건</strong> 실시간 반영</li>
                    <li>• <strong>(공통) 결과가 많을 때</strong>: 페이지네이션 없이 같은 목록 영역에서 연속 표시하며, 사용자 스크롤로 탐색</li>
                    <li>• <strong>(공통) 정렬 유지</strong>: 최신순/인기순 상태를 유지한 채 필터 결과에 재적용</li>
                    <li>• <strong>(공통) 고정/스크롤 분리</strong>: 카테고리 필터, 정렬 헤더, 우상단 통합검색 진입점은 결과 수와 무관하게 유지되며, <strong>게시글 목록 영역만</strong> 결과 수에 따라 스크롤됨</li>
                    <li>• <strong>(비회원 Base)</strong>: 결과 0개 안내 문구는 &quot;다른 카테고리를 선택해 보세요.&quot;</li>
                    <li>• <strong>(비회원 Base)</strong>: 비회원 사용량 배너(조건부), 우하단 글쓰기 버튼 미노출</li>
                    <li>
                      • <strong>(회원전용)</strong>: 결과 0개 문구/글쓰기 버튼/임시저장 배너 등 확장 동작은 회원 탭(
                      <SpecDocLink to="communityMemberBizOverview">CommunityTabSpecBiz</SpecDocLink>) 참조
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                  <p className="text-xs font-bold text-yellow-800 mb-1">📌 커뮤니티 내 검색과 통합 검색의 차이</p>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    <li>• <strong>카테고리 필터 내 "질환 검색"</strong>: 질환명으로 게시글 필터링 (커뮤니티 전용)</li>
                    <li>• <strong>통합 검색 모달</strong>: 우상단 고정 돋보기 → 명의/병원/커뮤니티 탭으로 결과 확인. <strong>「커뮤니티에서 더 보기」</strong>는 <strong>커뮤니티 탭으로만 전환</strong>하며, 검색어는 커뮤니티 필터로 넘기지 않음(정책 확정)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2.3 헤더~피드 사이 배너 */}
            <div id="community-tag-c03" className="scroll-mt-32">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
                  title="데모 화면과 동일 번호"
                >
                  C03
                </span>
                <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                헤더 하단 배너 영역
              </h3>
              <div className="ml-8 space-y-3">
                <p className="text-xs text-gray-500">헤더와 피드 목록 사이에 상황에 따라 최대 3종의 배너가 표시됩니다.</p>

                {/* 면책 고지 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">① 면책 고지 배너 — 항상 표시</div>
                  <div className="p-3 bg-gray-50 flex items-center justify-center gap-1.5">
                    <div className="w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center text-gray-400 text-[9px]">i</div>
                    <p className="text-xs text-gray-400">이 커뮤니티의 내용은 의료 전문가의 조언을 대체하지 않습니다.</p>
                  </div>
                </div>

                {/* 비회원 사용량 배너 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">② 비회원 사용량 배너 — 비회원 + 조회 횟수 소진/경고 시</div>
                  <div className="p-3 bg-amber-50 space-y-2">
                    <p className="text-xs text-amber-800 font-semibold">게시글 열람 한도 전역 안내</p>
                    <p className="text-xs text-amber-700">
                      비회원이면 피드 상단에 <strong>무료 이용 한도 안내 배너</strong>(황색·연한 주황 톤의 가로 띠)가 조건부로 나타납니다. 이 화면에서는 주로 <strong>오늘 남은 게시글 보기 횟수</strong>를 알려 주며, 잔여 1회 이하일 때는 경고 느낌, 0회일 때는 소진 안내와 가입·로그인 유도 문구를 보여 줍니다. 이미 한도를 다 쓴 뒤 다시 시도하면{' '}
                      <strong>한도 초과 안내 팝업</strong>(화면 가운데 뜨는 안내 창)으로 이어질 수 있습니다.
                    </p>
                    <p className="text-xs text-amber-700">
                      <strong>중요:</strong> 이 배너에 쓰이는 &quot;오늘 남은 게시글 열람&quot; 수치는 커뮤니티 탭만의 숫자가 아니라, <strong>홈 추천글·통합 검색·커뮤니티 피드 등 어디에서 글 상세를 열든 같은 전역 카운터</strong>와 연동됩니다. 수치·차감 시점·모달 문구의 단일 기준은 통합검색 정의서 「8. 비회원 사용량 제한」과 동일합니다.
                    </p>
                    <p className="text-xs text-amber-600">문구·색·간격 등 시각적 세부는 디자인 시안·프로토타입 화면을 기준으로 맞춥니다.</p>
                  </div>
                </div>

                {/* 임시저장 배너 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">③ 임시저장 이어쓰기 배너 — 로그인한 사용자 + 이 기기에 작성 중인 초안이 남아 있을 때</div>
                  <div className="p-3 bg-amber-50 flex items-center justify-between">
                    <span className="text-xs text-amber-700">⏱ 작성 중인 임시저장 글이 있어요</span>
                    <span className="text-xs font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">이어서 쓰기</span>
                  </div>
                  <div className="px-3 pb-3 pt-2 space-y-1.5">
                    <p className="text-xs text-gray-500">→ 「이어서 쓰기」를 누르면 글쓰기 화면이 연다.</p>
                    <p className="text-xs text-gray-500">→ 글쓰기 화면 위에 <strong>반투명 배경 + 가운데 확인 카드</strong>가 자동으로 뜬다.</p>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-1">
                      <p className="text-xs font-bold text-amber-800 mb-1.5">임시저장 불러오기 확인</p>
                      <ul className="space-y-1 text-xs text-amber-700">
                        <li>• 형태: 화면을 살짝 어둡게 덮고, 가운데 둥근 흰 카드로 메시지를 보여 준다.</li>
                        <li>• 타이틀: <strong>「AIGA」</strong></li>
                        <li>• 메시지: "이전에 작성 중이던 글이 있습니다. 불러올까요?" 류의 문구</li>
                        <li>• 저장 시각 + 제목(또는 질문 제목) 미리보기 — 예: 시:분 저장 · 제목 한 줄</li>
                        <li>• <strong>취소(삭제)</strong>: 이 기기에 남은 초안을 지우고 빈 글쓰기로 시작</li>
                        <li>• <strong>불러오기</strong>: 마지막에 저장된 글·사진 배치를 그대로 되살린다 (흐름 상세는 10절).</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.4 피드 목록 헤더 (총 건수 + 정렬) */}
            <div id="community-tag-c04" className="scroll-mt-32">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
                  title="데모 화면과 동일 번호"
                >
                  C04
                </span>
                <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                피드 목록 헤더 (총 건수 + 정렬)
              </h3>
              <div className="ml-8 space-y-3">
                {/* 실제 UI 예시 */}
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">총 24건</span>
                  <div className="flex items-center gap-3">
                    <button className="text-sm font-medium text-gray-900">최신순</button>
                    <div className="w-px h-3 bg-gray-300"></div>
                    <button className="text-sm font-medium text-gray-400">인기순</button>
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="font-medium text-purple-900 mb-2 text-sm">정렬 필터 상세</div>
                  <ul className="space-y-1.5 text-xs text-purple-900">
                    <li>• <strong>위치</strong>: 피드 카드 목록 바로 위 (헤더 영역 아님)</li>
                    <li>• <strong>정렬 항목</strong>: <span className="text-green-700 font-bold">최신순</span> / <span className="text-blue-700 font-bold">인기순</span> — 2가지만 존재 (댓글많은순 없음)</li>
                    <li>• <strong>인기순 기준</strong>: likeCount + comments 합산값 내림차순</li>
                    <li>• <strong>활성 탭</strong>: 진한 회색(#111), 비활성: 연한 회색(text-gray-400)</li>
                    <li>• <strong>총 건수</strong>: 현재 필터/검색 조건 적용 후 결과 수 실시간 표시</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2.5 유저 필터 배너 */}
            <div id="community-tag-c05" className="scroll-mt-32">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
                  title="데모 화면과 동일 번호"
                >
                  C05
                </span>
                <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                유저 필터 배너 (조건부)
              </h3>
              <div className="ml-8 space-y-3">
                <div className="bg-blue-50 rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-sm text-blue-700"><span className="font-bold">익명23</span>님의 글만 보는 중</span>
                  <button className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100">
                    <X className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• <strong>표시 조건</strong>: 프로필 팝업에서 "이 사용자 글만 보기" 클릭 시 (파란색)</li>
                    <li>• <strong>X 버튼</strong>: 유저 필터 해제 → 전체 목록으로 복귀</li>
                    <li>• 유저 필터 활성화 시 카테고리 필터 자동 숨김</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 작성자 프로필 창 — 팝업 상세 정의 (신규) */}
            <div className="ml-8 space-y-3">
              <h4 className="text-sm font-bold text-gray-900">👤 작성자 프로필 창 — 팝업 상세 정의</h4>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-2 text-sm">형태</div>
                <p className="text-xs text-gray-700">화면 중앙 카드 팝업</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-2 text-sm">표시 항목</div>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li>• 프로필 이미지 (없으면 기본 아이콘)</li>
                  <li>• 닉네임 (익명XX 형식)</li>
                  <li>• 의사 인증 배지 (해당 시)</li>
                  <li>• 작성한 게시글 수</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-2 text-sm">버튼 구성</div>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li>• <strong>이 사용자 글만 보기</strong>: 모든 사용자(비회원·회원 공통) 노출</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="font-medium text-blue-900 mb-2 text-sm">동작 — 이 사용자 글만 보기</div>
                <ul className="space-y-1 text-xs text-blue-900">
                  <li>• 비회원·회원 모두 로그인 없이 이용 가능 (게시글 목록 보기 허용 기능에 해당)</li>
                  <li>• 클릭 시 팝업 닫힘 → 커뮤니티 피드 상단에 &quot;{'{닉네임}'}님의 글만 보는 중&quot; 유저 필터 배너 표시</li>
                  <li>• 배너 형태: 파란색 텍스트 + 우측 X 버튼</li>
                  <li>• 피드 목록은 해당 유저의 게시글만 필터링, 상단 총 건수 즉시 갱신</li>
                  <li>• 카테고리 필터(질병별/진료과별) 자동 숨김</li>
                  <li>• X 버튼 클릭 시 유저 필터 해제 → 전체 피드 복귀</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-2 text-sm">팝업 닫기</div>
                <p className="text-xs text-gray-700">X 버튼 또는 배경 딤 클릭</p>
              </div>
            </div>

            {/* 2.6 게시글 카드 (목록) */}
            <div id="community-tag-c06" className="scroll-mt-32">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
                  title="데모 화면과 동일 번호"
                >
                  C06
                </span>
                <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">6</span>
                게시글 카드 (목록)
              </h3>
              <div className="ml-8 space-y-3">
                {/* 실제 카드 예시 */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    {/* 프로필 아바타 */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* 작성자 정보 */}
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="text-sm font-bold text-gray-900">익명23</span>
                        <span className="text-xs text-gray-400">2시간 전</span>
                        <span className="text-xs text-gray-400">(수정됨)</span>
                      </div>
                      {/* 제목 + 인증 배지 */}
                      <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight flex items-start gap-2">
                        <span className="flex-1">서울대병원 심장내과 진료 후기</span>
                        <span className="flex-shrink-0 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Shield className="w-3 h-3" />인증
                        </span>
                      </h3>
                      {/* 질환 태그 */}
                      <div className="mb-2">
                        <span className="text-xs text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">고혈압</span>
                      </div>
                      {/* 본문 미리보기 */}
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">
                        3개월간 가슴 통증으로 고생하다가 진료를 받았습니다. 정확한 진단과 친절한 설명에 감사드립니다...
                      </p>
                      {/* 액션 바 */}
                      <div className="flex items-center gap-3 text-sm pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-pink-600">
                          <Heart className="w-4 h-4 fill-pink-100" />
                          <span className="text-xs">공감해요</span>
                          <span className="font-medium text-xs">24</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs">8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 구성 요소 설명 */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="font-medium text-purple-900 mb-2 text-sm">카드 구성 요소</div>
                  <ul className="space-y-1.5 text-xs text-purple-900">
                    <li>• <strong>프로필 아이콘</strong>: User 아이콘 (파란색 그라데이션 원형). 클릭 시 유저 프로필 팝업 (작성자 프로필 창)</li>
                    <li>• <strong>작성자명</strong>: 가입 시 설정 또는 <strong>My 페이지에서 등록한 닉네임</strong> 기준으로 표시</li>
                    <li>• <strong>작성 시간</strong>: "5분 전", "3시간 전", "2일 전" 형식</li>
                    <li>• <strong>(수정됨) 표시</strong>: 작성 후 수정한 경우 회색으로 표시. 호버 시 수정 일시 툴팁</li>
                    <li>• <strong>제목 + 인증 배지</strong>: 병원진료인증(isVerified=true)일 때 VerificationBadge 표시</li>
                    <li>• <strong>질환 태그</strong>: disease 필드가 있을 경우 보라색 칩으로 표시</li>
                    <li>• <strong>본문 미리보기</strong>: 요약 텍스트를 카드에서 <strong>최대 2줄</strong>까지만 표시하고, 길면 뒤는 생략(…) 처리</li>
                    <li>• <strong>상세 확인</strong>: 카드에서는 미리보기만 보여 주며, <strong>본문 전체는 게시글 상세 화면(게시글 상세(피드))</strong>에서 확인한다.</li>
                    <li>• <strong>첨부 이미지</strong>: 이미지 수에 따라 그리드·높이 변동
                      <ul className="ml-4 mt-0.5 space-y-0.5 text-xs text-purple-800">
                        <li>- 1장: 1열(전체 너비), <strong>h-48 (192px)</strong></li>
                        <li>- 2장: 2열 그리드, <strong>h-32 (128px)</strong></li>
                        <li>- 3장: 3열 그리드, <strong>h-24 (96px)</strong></li>
                        <li>- <strong>4장 이상: 3장까지만 표시</strong>, 3번째 이미지 위에 <code className="bg-purple-100 px-1 rounded">+N</code> 반투명 딤 오버레이 (<code className="bg-purple-100 px-1 rounded">bg-black/50</code>)</li>
                        <li>- 이미지 간격: <code className="bg-purple-100 px-1 rounded">gap-1.5</code></li>
                        <li>- <strong>탭 동작</strong>: 이미지 단독 탭 → 라이트박스 없음. 카드 전체 탭 → 게시글 상세(피드) 이동 (상세에서 라이트박스 제공)</li>
                      </ul>
                    </li>
                    <li>• <strong>통계</strong>: 공감해요(하트 + 숫자) + 댓글 수 — <span className="text-red-600 font-bold">조회수 없음</span></li>
                  </ul>
                </div>

              </div>
            </div>

            {/* 2.7 게시글 상세 화면 */}
            <div id="community-tag-c07" className="scroll-mt-32">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
                  title="데모 화면과 동일 번호"
                >
                  C07
                </span>
                <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">7</span>
                게시글 상세 화면 (게시글 상세(피드))
              </h3>
              <div className="ml-8">
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
                  <span className="text-indigo-400 text-lg mt-0.5">🔗</span>
                  <div>
                    <p className="text-sm font-bold text-indigo-900 mb-1">공통 팝업 — 상세 명세는 공통 탭에서 확인</p>
                    <p className="text-xs text-indigo-700 mb-2">
                      홈·커뮤니티 화면에서 공용으로 사용되는 팝업입니다. 화면 구성, 더보기 메뉴 권한 분리, 댓글 더보기 패턴 등 전체 명세는
                      아래 위치에서 확인하세요. 댓글 0건일 때는 <strong>첫 댓글을 작성해보세요</strong> 안내를 표시합니다(
                      <SpecDocLink to="commonModals">공통 탭</SpecDocLink> 명세와 동일).
                    </p>
                    <div className="bg-white border border-indigo-200 rounded-lg px-3 py-2 text-xs text-indigo-800 font-medium">
                      <SpecDocLink to="commonModals">공통 탭 → 1. 팝업 UI (모달) → 2. 커뮤니티 게시글 상세 팝업</SpecDocLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.8 글쓰기 FAB */}
            <div id="community-tag-c08" className="scroll-mt-32">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
                  title="데모 화면과 동일 번호"
                >
                  C08
                </span>
                <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">8</span>
                글쓰기 버튼 (우하단 둥근 버튼)
              </h3>
              <div className="ml-8 space-y-3">
                <div className="bg-white border border-gray-200 rounded-lg p-4 relative" style={{ minHeight: '80px' }}>
                  <p className="text-xs text-gray-500">피드 영역 (스크롤)</p>
                  <div className="absolute bottom-3 right-3 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg">
                    <Plus className="w-5 h-5" />
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <ul className="space-y-1.5 text-xs text-purple-900">
                    <li>• <strong>누가 보나</strong>: <span className="text-green-700 font-bold">로그인한 사용자에게만</span> 보인다. 로그인 전에는 이 버튼이 아예 나오지 않는다.</li>
                    <li>• <strong>위치</strong>: 화면을 스크롤해도 <strong>항상 우하단</strong>에 붙어 있다.</li>
                    <li>• <strong>모양</strong>: 파란색 원형 + 더하기(+) 아이콘</li>
                    <li>• <strong>탭</strong>: 글쓰기 창이 열린다. 이 기기에 <strong>작성 중이던 초안</strong>이 있으면 먼저 &quot;이어 쓸까요?&quot; 같은 확인 화면이 뜨고, <strong>불러오기</strong> / <strong>버리고 새로</strong>를 고를 수 있다.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. 배지 시스템 */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">🏅 배지 시스템</h2>

          <div className="space-y-4">
            {/* 병원진료인증 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-base font-bold text-blue-900">병원진료인증</span>
              </div>
              <ul className="space-y-2 text-sm text-blue-900">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>의미</strong>: 실제로 해당 병원을 방문한 환자가 작성한 후기</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>인증 방법</strong>: 진료 영수증 / 처방전 / 예약 확인서 제출 → OCR 자동 인식 검증 후 승인</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>표시 위치</strong>: 게시글 카드 제목 옆 (VerificationBadge 컴포넌트)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>UI</strong>: 파란색 배경 + 방패 아이콘 + "인증" 텍스트</span>
                </li>
              </ul>
            </div>

            {/* 의사 인증 */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck className="w-5 h-5 text-green-600" />
                <span className="text-base font-bold text-green-900">의사 인증</span>
              </div>
              <ul className="space-y-2 text-sm text-green-900">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>의미</strong>: 의사 면허번호로 본인 인증을 완료한 의료진</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>표시 위치</strong>: 게시글, 댓글, 리뷰 모두 표시</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. 인터랙션 */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">👆 사용자 인터랙션</h2>

          {/* 로그인 유도 공통 안내 */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
            <p className="text-xs font-bold text-blue-800 mb-1">🔗 비회원 제한 공통 동작 — 로그인 유도 팝업</p>
            <p className="text-xs text-blue-700">
              아래 인터랙션에서 비회원이 제한 기능을 클릭하면 <strong>로그인 유도 팝업</strong>이 뜹니다.
              (배경을 살짝 어둡게 하고, 가운데 흰 카드로 안내 — 하단에 잠깐 나오는 알림과 다름)
              문구·버튼 배치 등은 <SpecDocLink to="commonModals">공통 탭</SpecDocLink> 화면정의서를 참고합니다.
            </p>
            <p className="text-xs text-indigo-900 bg-indigo-50 border border-indigo-200 rounded-lg px-2.5 py-2 mt-2">
              👉 버튼 탭 시 이후의 진행 흐름은{' '}
              <SpecDocLink to="mypageOverview">마이페이지 화면정의서</SpecDocLink>에 정리된 [공통 로그인/회원가입 플로우 정책]을 공통으로
              따름.
            </p>
          </div>

          <div className="space-y-6">
            {/* 4.1 공감해요 */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                공감해요 (게시글 좋아요)
              </h3>
              <div className="ml-8 grid grid-cols-2 gap-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="text-xs font-bold text-gray-500 mb-2">비회원</div>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li>• 하트 아이콘은 회색·비활성 모양 (눌러도 공감되지 않음)</li>
                    <li>• 클릭 시 로그인 유도 팝업 표시</li>
                    <li>• 기획상 이 버튼은 &quot;공감&quot; 동작에 해당</li>
                  </ul>
                </div>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                  <div className="text-xs font-bold text-pink-700 mb-2">회원</div>
                  <ul className="space-y-1.5 text-xs text-pink-900">
                    <li>• 클릭 시 하트 색상 변경 (회색 ↔ 빨강/핑크 톤)</li>
                    <li>• 숫자 즉시 +1 / -1</li>
                    <li>• 재클릭 시 취소</li>
                  </ul>
                </div>
              </div>
              <div className="ml-8 mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-xs font-bold text-gray-800 mb-1">📍 경로별 UX (프로토타입 참고)</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• <strong>커뮤니티 탭</strong>: 피드 → 상세에서 공감 토글</li>
                  <li>• <strong>홈 추천글 · 통합 검색</strong>: 상세 모달에서 동일한 토글 패턴. 카드에는 공감 수 표시만</li>
                  <li>• <strong>실서비스</strong>에서는 서버/전역 상태로 화면 간 일치시킬 수 있음. 프로토타입은 화면마다 따로 둘 수 있음</li>
                </ul>
              </div>
            </div>

            {/* 4.2 댓글 작성 */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                댓글 작성
              </h3>
              <div className="ml-8 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="text-xs font-bold text-gray-500 mb-2">비회원</div>
                    <ul className="space-y-1.5 text-xs text-gray-700">
                      <li>• 입력창 비활성화</li>
                      <li>• 플레이스홀더: "로그인 후 댓글을 작성할 수 있습니다"</li>
                      <li>• 클릭 시 로그인 유도 팝업 표시</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-xs font-bold text-blue-700 mb-2">회원</div>
                    <ul className="space-y-1.5 text-xs text-blue-900">
                      <li>• 입력창 활성화</li>
                      <li>• 플레이스홀더: "댓글을 입력하세요"</li>
                      <li>• 등록 버튼 클릭 시 즉시 목록에 추가</li>
                    </ul>
                  </div>
                </div>
                {/* 댓글 작성자 표시 방식 안내 */}
                <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded-r-lg">
                  <p className="text-xs font-bold text-orange-800 mb-1">📌 댓글 작성자 표시 방식</p>
                  <p className="text-xs text-orange-700">댓글 작성자명은 가입 시 설정 또는 <strong>My 페이지에서 등록한 닉네임</strong> 기준으로 표시합니다. 의사 인증 사용자는 닉네임 옆에 의사 인증 배지 표시.</p>
                </div>
                {/* 댓글 예시 */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">건강지킴이</span>
                        <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          <BadgeCheck className="w-3 h-3" />
                          <span className="font-medium">의사 인증</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        저도 비슷한 증상 있었는데 정말 공감돼요! 정보 감사합니다 👍
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>1시간 전</span>
                        <button className="flex items-center gap-1 hover:text-red-500">
                          <Heart className="w-3 h-3" />
                          <span>12</span>
                        </button>
                        <button className="hover:text-blue-600">답글</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4.3 댓글 좋아요 */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                댓글 좋아요
              </h3>
              <div className="ml-8 grid grid-cols-2 gap-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="text-xs font-bold text-gray-500 mb-2">비회원</div>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li>• 하트 아이콘은 연한 회색·비활성 모양</li>
                    <li>• 클릭 시 <span className="text-green-700 font-bold">로그인 유도 팝업</span> 표시 — 비회원이면 공감 불가</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="text-xs font-bold text-red-700 mb-2">회원</div>
                  <ul className="space-y-1.5 text-xs text-red-900">
                    <li>• 아이콘: <strong>Heart (하트)</strong> — ThumbsUp 아님</li>
                    <li>• 클릭 시 ❤️ 색상 변경 (회색 ↔ <strong>빨강, text-red-500</strong>)</li>
                    <li>• 숫자 즉시 +1 / -1</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4.4 답글 */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-indigo-500" />
                답글 (대댓글)
              </h3>
              <div className="ml-8 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-indigo-900">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span><strong>비회원</strong>: &quot;답글&quot; 버튼을 누르면 <span className="text-green-700 font-bold">로그인 유도 팝업</span>만 뜨고, 답글 입력창은 열리지 않음</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span><strong>회원</strong>: "답글" 버튼 클릭 시 해당 댓글 아래 입력창 표시</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span><strong>UI</strong>: 들여쓰기(대댓글 계층)로 표시. 별도 @멘션 기능은 없음</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 신고 기능 */}
        <section id="community-spec-section-5" className="scroll-mt-36 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">🚨 신고 기능</h2>

          <div className="space-y-4">
            {/* 신고 권한 */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="font-bold text-red-900 mb-3 text-sm">신고 권한</div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="bg-white border border-red-200 rounded p-3">
                  <div className="font-bold text-green-700 mb-1">✅ 회원 (타인 게시글/댓글)</div>
                  <p className="text-gray-600">신고하기 메뉴 표시 → 신고하기 창 열림</p>
                </div>
                <div className="bg-white border border-red-200 rounded p-3">
                  <div className="font-bold text-red-600 mb-1">❌ 본인 게시글/댓글</div>
                  <p className="text-gray-600">더보기 메뉴에 신고 항목 없음 (자기 글 신고 불가)</p>
                </div>
                <div className="bg-white border border-red-200 rounded p-3">
                  <div className="font-bold text-red-600 mb-1">❌ 비회원</div>
                  <p className="text-gray-600">⋮ 더보기 메뉴 자체는 노출됨. <strong>회원에게만</strong> 신고하기 항목이 보이고, 비회원에게는 숨김 (공유하기는 표시됨)</p>
                </div>
              </div>
            </div>

            {/* 신고 프로세스 */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="font-bold text-red-900 mb-3 text-sm">신고 프로세스</div>
              <div className="space-y-3">
                <div className="bg-white border border-red-200 rounded p-3">
                  <div className="text-xs font-bold text-red-700 mb-2">1️⃣ 신고 버튼 진입</div>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• 게시글 상세: 우상단 ⋮ 더보기 메뉴 → "신고하기"</li>
                    <li>• 댓글: 댓글 우측 ⋮ 더보기 메뉴 → "신고하기"</li>
                    <li>• 클릭 시 신고하기 창 열림 (어떤 글·댓글인지, 작성자 이름 등이 함께 전달됨)</li>
                  </ul>
                </div>

                <div className="bg-white border border-red-200 rounded p-3">
                  <div className="text-xs font-bold text-red-700 mb-2">2️⃣ 신고 사유 선택 (신고하기 창)</div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div>
                      <p className="text-xs font-bold text-gray-600 mb-1">게시글 신고 사유 (7종)</p>
                      <ul className="space-y-0.5 text-xs text-gray-600">
                        <li>• 광고/홍보성 게시글</li>
                        <li>• 욕설/인신공격</li>
                        <li>• 허위 정보</li>
                        <li>• 개인정보 노출</li>
                        <li>• 중복 게시글</li>
                        <li>• 의료법 위반 소지</li>
                        <li>• 기타 (상세 내용 입력)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-600 mb-1">댓글 신고 사유 (6종)</p>
                      <ul className="space-y-0.5 text-xs text-gray-600">
                        <li>• 욕설/인신공격</li>
                        <li>• 허위 정보</li>
                        <li>• 개인정보 노출</li>
                        <li>• 도배/스팸</li>
                        <li>• 의료법 위반 소지</li>
                        <li>• 기타 (상세 내용 입력)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-red-200 rounded p-3">
                  <div className="text-xs font-bold text-red-700 mb-2">3️⃣ 신고 접수</div>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• "신고가 접수되었습니다" 토스트 메시지 표시 (완료 알림(짧은 메시지))</li>
                    <li>• 신고 결과는 알림 없음 (완전 무통보 정책)</li>
                  </ul>
                </div>

                <div className="bg-white border border-red-200 rounded p-3">
                  <div className="text-xs font-bold text-red-700 mb-2">4️⃣ 관리자 처리 (A안: 완전 수동)</div>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• 승인: 콘텐츠 삭제 → 신고 당한 작성자에게 My 페이지 배너로만 안내 (신고한 사람에게는 결과 미통보)</li>
                    <li>• 기각: 아무 변화 없음 (신고한 사람 / 신고 당한 사람 모두 무통보)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
              <div className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                <span>⚠️</span>
                <span>완전 무통보 정책 (A안)</span>
              </div>
              <ul className="space-y-1.5 text-sm text-orange-800">
                <li>• 신고한 사람: 접수 토스트만 표시, 처리 결과 알 수 없음</li>
                <li>• 신고 당한 사람: My 페이지 상단 배너로만 확인</li>
                <li>• 배너 예시: "귀하의 게시글/댓글이 커뮤니티 가이드라인에 따라 삭제되었습니다."</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. 비회원 제한 정책 */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">🔒 비회원 제한 정책</h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-r-lg">
            <div className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
              <span>⚠️</span>
              <span>A방식: 비활성화 + 클릭 시 로그인 유도 팝업</span>
            </div>
            <div className="text-sm text-yellow-800">
              비회원은 아래 기능을 사용할 수 없으며, 클릭 시 <strong>로그인 유도 팝업</strong>(화면 가운데 안내 카드)이 표시됩니다. 또한 게시글 조회는 <strong>비회원 사용량 제한</strong> 정책이 별도 적용됩니다.
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-bold text-rose-900 mb-2">📊 비회원 사용량 제한 (전역 통합)</h3>
            <ul className="text-xs text-rose-900 space-y-1.5 list-disc pl-5 leading-relaxed">
              <li>
                <strong>탭마다 따로가 아닙니다.</strong> 검색 실행(하루 3회), 명의 프로필 상세 열람(하루 3회), 커뮤니티 게시글 본문 상세 열람(하루 5회)은 각각 <strong>앱 전역에서 하나의 카운터</strong>를 씁니다. 홈·명의 찾기·통합 검색 전체 창·커뮤니티 중 <strong>어느 화면에서 소비하든</strong> 같은 잔여 횟수가 줄고, 배너·검색창 잠금·한도 안내 창에 동시에 반영됩니다. (프로토타입: 이 브라우저에 저장된 값으로 맞춤)
              </li>
              <li>
                <strong>검색 실행:</strong> 명의 찾기 탭에서 하는 검색과 통합 검색 전체 창에서 하는 검색이 <strong>같은 3회 한도</strong>를 공유합니다.
              </li>
              <li>
                <strong>명의 프로필 열람:</strong> 홈 인기 명의 카드, 명의 찾기, 통합 검색 명의 탭 등에서 의사 프로필 상세가 열릴 때 <strong>같은 3회 한도</strong>를 공유합니다.
              </li>
              <li>
                <strong>게시글 열람(글 상세 열기):</strong> 홈 추천글, 통합 검색의 게시글 탭, 커뮤니티 피드 등에서 글 상세 창이 열릴 때 <strong>같은 5회 한도</strong>를 공유합니다.
              </li>
              <li>
                커뮤니티 화면에서는 주로 <strong>게시글 열람</strong> 배너가 보이지만, 사용자가 다른 탭에서 검색·프로필을 이미 소진한 경우에도 전역 상태에 맞춰 안내가 바뀔 수 있습니다.
              </li>
            </ul>
            <p className="text-xs text-rose-800 mt-2 border-t border-rose-200 pt-2">
              수치·UI 패턴·한도 안내 흐름의 상세 나열은{' '}
              <SpecDocLink to="searchGuestUsage">통합검색 화면정의서 「비회원 사용량 제한」</SpecDocLink> 및{' '}
              <SpecDocLink to="doctorGuestUsage">명의 찾기 화면정의서 「비회원 사용량 제한」</SpecDocLink>과 맞춥니다. 구현·검수 시에는 앱에
              반영된 비회원 한도(잔여 횟수) 처리 규칙과 일치하는지 확인합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="font-medium text-red-900 mb-2 text-sm flex items-center gap-2">
                <span>❌</span>
                <span>비회원 제한 기능</span>
              </div>
              <ul className="space-y-1 text-xs text-red-900">
                <li>• 게시글 작성 (로그인 전에는 우하단 글쓰기 버튼 없음)</li>
                <li>• 공감해요 버튼</li>
                <li>• 댓글 작성</li>
                <li>• 댓글 좋아요</li>
                <li>• 답글 작성</li>
                <li>• <strong>신고하기</strong> (더보기 메뉴 미노출 또는 로그인 유도 팝업)</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="font-medium text-green-900 mb-2 text-sm flex items-center gap-2">
                <span>✅</span>
                <span>비회원 허용 기능</span>
              </div>
              <ul className="space-y-1 text-xs text-green-900">
                <li>• 게시글 목록 보기 (사용량 제한 적용)</li>
                <li>• 게시글 상세 보기 (사용량 제한 적용)</li>
                <li>• 댓글 목록 보기</li>
                <li>• 카테고리 필터 (질병별/진료과별)</li>
                <li>• 정렬 변경 (최신순/인기순)</li>
                <li>• 통합 검색 (통합 검색 전체 창) 진입</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 8. 공통 컴포넌트 참조 */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">🔗 공통 컴포넌트 참조</h2>

          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              커뮤니티에서 사용되는 일부 컴포넌트는 앱 전체에서 공통으로 사용됩니다.
              자세한 UI/UX 정의는 <SpecDocLink to="commonModals">공통 탭</SpecDocLink>을 참조하세요.
            </p>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="font-bold text-indigo-900 mb-3">공통 탭에서 확인할 수 있는 항목</div>
              <ul className="space-y-2 text-sm text-indigo-900">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>
                    <strong>로그인 유도 팝업</strong>: 비회원이 제한 기능을 눌렀을 때. 모양·문구는{' '}
                    <SpecDocLink to="commonModals">공통 탭</SpecDocLink> 화면정의서를 참고합니다. 👉 버튼 탭 이후 흐름은{' '}
                    <SpecDocLink to="mypageOverview">마이페이지 화면정의서</SpecDocLink>에 정리된 [공통 로그인/회원가입 플로우 정책]을
                    공통으로 따름.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>
                    <strong>커뮤니티 게시글 상세 팝업</strong>: 홈·커뮤니티 공통 팝업 —{' '}
                    <SpecDocLink to="commonModals">공통 탭 1절(팝업 UI) 게시글 상세</SpecDocLink> 참조
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>
                    <strong>완료 알림(짧은 메시지)</strong>: 작업 완료 알림 (글 작성/수정/삭제, 신고 접수 등) —{' '}
                    <SpecDocLink to="commonToasts">공통 탭(알림 UI)</SpecDocLink> 참조
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>
                    <strong>하단 네비게이션 바</strong>: 커뮤니티 탭 포함 —{' '}
                    <SpecDocLink to="commonLayout">공통 탭 4절(레이아웃)</SpecDocLink> 참조
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>
                    <strong>통합 검색 전체 창 (통합 검색)</strong>: 상단 돋보기 아이콘 진입 —{' '}
                    <SpecDocLink to="commonModals">공통 탭 통합 검색 안내</SpecDocLink> /{' '}
                    <SpecDocLink to="searchGuestOverview">통합검색 탭</SpecDocLink> 참조
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>
                    <strong>무료 이용 한도 안내 배너 · 한도 초과 안내 팝업</strong>: 비회원에게 남은 검색·프로필 보기·글 보기 횟수를 알려
                    주는 상단 띠와, 한도를 넘겼을 때 뜨는 가운데 안내 창입니다. 커뮤니티에서는 주로 <strong>게시글 보기</strong> 한도를
                    안내합니다. 정책·전역 합산은 본 문서 6절 및{' '}
                    <SpecDocLink to="searchGuestTabScrollSummary">통합검색 정의서 §8</SpecDocLink>을 참고하세요.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="font-bold text-amber-900 mb-2">커뮤니티 탭 전용 컴포넌트 (공통 탭 비해당)</div>
              <ul className="space-y-1 text-sm text-amber-900">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>신고하기 창 (신고 모달)</strong>: 커뮤니티 전용. 게시글 7종 / 댓글 6종 사유 — 본 문서{' '}
                    <SpecDocLink to="communityGuestReport">5절(신고 기능)</SpecDocLink> 참조
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong>글쓰기·수정 화면 (글쓰기)</strong>: 게시글 작성/수정. 임시저장 기능 포함 — 본 문서{' '}
                    <SpecDocLink to="communityGuestCompose">9절(화면정의)</SpecDocLink> ·{' '}
                    <SpecDocLink to="communityGuestDraftDetail">10절(임시저장)</SpecDocLink> 참조
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>작성자 프로필 창</strong>: 작성자 아이콘 클릭 시. "이 사람 글만 보기" 포함</span>
                </li>
              </ul>
            </div>

            <SpecDocLink
              to="commonModals"
              className="w-full block text-center bg-indigo-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-sm no-underline hover:text-white"
            >
              공통 탭으로 이동하기 →
            </SpecDocLink>
          </div>
        </section>

        {/* 9. 글쓰기·수정 화면 화면정의서 (회원 · 커뮤니티) */}
        <section id="community-spec-section-9" className="scroll-mt-36 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">📝 글쓰기·수정 화면 (회원 · 커뮤니티)</h2>
          <p className="text-xs text-gray-500 mb-5">
            <strong className="text-gray-700">UI/UX 정의</strong> — 진입: 커뮤니티 탭 <strong className="text-gray-700">글쓰기(+)</strong> 또는 <strong className="text-gray-700">게시글 수정</strong>.
            프로토타입에서는 이 화면이 별도 화면으로 구현되어 있습니다.
          </p>

          <div className="space-y-5 text-sm text-gray-700">

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="font-bold text-purple-900 mb-2 text-sm">📌 목적</div>
              <p className="text-xs text-purple-900 leading-relaxed">
                치료·진료 경험을 <strong>제목 · 질환 · 본문(텍스트+이미지 인터리브) · 메타</strong>와 함께 등록하거나, 기존 글을 수정한다.
                본문은 <strong>한 개의 입력 영역</strong> 안에서 글을 쓰다가, 원하는 위치에 커서를 두고 사진을 끼워 넣는 <strong>통합 입력</strong> 방식을 사용한다.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-gray-900 mb-3 text-sm">🚪 진입 · 표시 조건</div>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="text-left py-2 pr-3 font-bold text-gray-700 w-28">진입</th>
                    <th className="text-left py-2 font-bold text-gray-700">조건 · 비고</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 align-top">신규 작성</td>
                    <td className="py-2">커뮤니티 화면 우하단 <strong>글쓰기(+)</strong> 버튼 탭. <strong className="text-gray-800">로그인한 사용자에게만</strong> 버튼이 보인다(비로그인·게스트는 숨김).</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 align-top">수정</td>
                    <td className="py-2">게시글 상세 등에서 수정 진입 시. 헤더 문구 <strong>「게시글 수정」</strong>, 푸터 주요 액션 <strong>「수정 완료」</strong>.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 align-top">임시저장 배너</td>
                    <td className="py-2">
                      이전에 이 기기에 <strong>임시 저장된 초안</strong>이 있으면, 글쓰기 창을 연 직후 맨 앞에{' '}
                      <strong>「불러오시겠습니까?」</strong> 확인 창이 뜬다(
                      <SpecDocLink to="communityGuestDraftDetail">10절</SpecDocLink>). 반투명 배경으로 글쓰기 폼을 덮는다.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-gray-900 mb-3 text-sm">🖼️ 화면 구성 (위 → 아래)</div>
              <ol className="space-y-4 text-xs text-gray-700 list-decimal list-inside">
                <li>
                  <span className="font-bold text-gray-800">헤더</span>
                  <ul className="mt-1 ml-4 list-disc space-y-1 text-gray-600">
                    <li>타이틀: 신규 <strong>「치료 정보 나누기」</strong> / 수정 <strong>「게시글 수정」</strong></li>
                    <li>자동저장 표시: 마지막 저장 시각 또는 「저장됨」(간헐적)</li>
                    <li>
                      X 버튼: 입력이 있으면 <strong>임시저장 후</strong> 닫기(
                      <SpecDocLink to="communityGuestDraftDetail">10절</SpecDocLink>). 푸터 「취소」와 동작 구분.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold text-gray-800">질환명 *</span> — 검색·칩 선택 또는 직접 추가. 선택 시 <strong>진료과 자동 매핑</strong>(파란 안내 카드) 또는 목록에 없는 질환은 <strong>주황 톤 안내</strong> 아래에서 진료과를 직접 고른다.</li>
                <li>
                  <span className="font-bold text-gray-800">제목 *</span> — 한 줄 입력.{' '}
                  <strong>최대 50자</strong>까지 쓸 수 있고, 입력 칸 <strong>오른쪽 아래</strong>에{' '}
                  <strong>지금 쓴 글자 수 / 50</strong>이 실시간으로 보인다. 50자에 도달하면{' '}
                  <strong>더 이상 입력되지 않는다</strong>(붙여넣기 포함).</li>
                <li>
                  <span className="font-bold text-gray-800">내용 *</span>
                  <ul className="mt-1 ml-4 list-disc space-y-1 text-gray-600">
                    <li><strong>민감정보 경고 배너</strong>(노란 박스, 병원 인증 안내와 비슷한 톤): 주민번호·전화·상세 주소 등 본문·사진에 올리지 말 것 안내. <strong>「사진 추가」</strong>를 누르면 배너가 잠깐 더 눈에 띄게 강조된다.</li>
                    <li><strong>통합 입력 칸</strong>(테두리 하나로 묶음): 위쪽은 본문 입력(안내 문구·스크롤), 아래쪽 구분선 아래 <strong>사진 추가</strong> 버튼(왼쪽) + <strong>남은 장수 (n/10)</strong>, 10장이면 버튼 비활성화.</li>
                    <li>이미지 형식 JPG·PNG·WEBP, 여러 장 선택 가능. 올리면 <strong>용량·크기를 알아서 줄여</strong> 서비스에 맞게 저장한다.</li>
                    <li>글자 수 안내: 최소 50자 미만이면 주황색 계열 안내 · 게시 시 <strong>제목·본문</strong>은 의미 있는 글이 채워져 있어야 한다(앞뒤 공백만으로는 불가).</li>
                    <li>보조 문구: 용량·본문에서 이미지 선택 삭제 힌트.</li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold text-gray-800">병원진료인증 (신규만)</span> — 체크 시 아래에서 이어지는 <strong>인증·첨부 안내 팝업</strong>이 연다.</li>
                <li>
                  <span className="font-bold text-gray-800">수정 안내 / 작성 팁</span> — 모드에 따라 안내 박스.</li>
                <li>
                  <span className="font-bold text-gray-800">푸터</span> — <strong>취소</strong>(지금까지 적은 내용을 임시 저장하지 않고 닫기) · <strong>게시하기 / 수정 완료</strong>(조건 확인 후 등록·수정 처리, 초안은 비우고 예약돼 있던 자동 저장도 멈춤).</li>
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="font-bold text-blue-900 mb-2 text-sm">✅ 유효성 검사 (게시/수정 완료 시)</div>
              <ul className="space-y-1 text-xs text-blue-900">
                <li>• 제목: 공백 제외 내용 필수, <strong>길이는 최대 50자</strong>(초과 입력 불가)</li>
                <li>• 본문: 공백 제외 입력 필수</li>
                <li>• 질환명 선택/입력 필수</li>
                <li>• 진료과 값 필수(자동 매핑 또는 사용자 선택)</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="font-bold text-green-900 mb-2 text-sm">📤 게시·수정 시 넘어가는 정보</div>
              <p className="text-xs text-green-900 mb-2">
                글쓰기 창에서 <strong>게시하기·수정 완료</strong>를 누르면 커뮤니티 목록·상세에 반영된다. 본문은 검색·미리보기용 <strong>글 텍스트</strong>와, 글·사진이 섞인 <strong>표시 순서</strong>가 함께 전달되어 피드·상세에서 작성할 때와 같은 순서로 보인다.
              </p>
              <ul className="space-y-1 text-xs text-green-800">
                <li>• 제목, 본문 글, 진료과, 역할, 질환, 연령대·감정(선택), 인증 요청 여부·첨부, 사진 목록, 글·사진 순서(해당 시)</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="font-bold text-amber-900 mb-2 text-sm">⚠️ 정책 · UX 메모</div>
              <ul className="space-y-1 text-xs text-amber-900">
                <li>• 민감정보: 경고 배너 상시 + 사진 추가 직전 시각적 강조.</li>
                <li>• 게시에 성공한 뒤에는, 입력 멈춤 후 잠깐 뒤에 도는 <strong>자동 임시저장</strong>이 초안을 다시 만들지 않도록 처리한다.</li>
                <li>
                  • 임시저장이 어디에·어떻게 쌓이는지는 <SpecDocLink to="communityGuestDraftDetail">10절</SpecDocLink> 참조.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 10. 글쓰기·수정 화면 — 임시저장(기기 저장) 상세 */}
        <section id="community-spec-section-10" className="scroll-mt-36 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">💾 글쓰기·수정 화면 — 임시저장(이 기기에 보관)</h2>
          <p className="text-xs text-gray-500 mb-4">사용자 관점에서는 &quot;작성 중이던 글이 이 폰/PC에 남아 있다&quot;로 이해하면 된다. (구현: 브라우저 저장소)</p>

          <div className="space-y-5">

            {/* 저장 위치 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-gray-900 mb-3 text-sm">📦 어디에 남는지</div>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-700">
                <div className="bg-white border border-gray-200 rounded p-3">
                  <div className="font-bold text-gray-800 mb-1">새 글</div>
                  <p className="text-gray-600">‘새로 쓰기’로 열었을 때의 초안이 이 기기 전용 저장 칸에 쌓인다.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded p-3">
                  <div className="font-bold text-gray-800 mb-1">수정 중인 글</div>
                  <p className="text-gray-600">수정 화면마다 따로 초안을 둬, 다른 글과 섞이지 않게 한다.</p>
                </div>
              </div>
              <div className="mt-3 bg-orange-50 border-l-4 border-orange-400 p-3 rounded-r-lg">
                <p className="text-xs font-bold text-orange-800">📎 글과 사진까지</p>
                <p className="text-xs text-orange-700 mt-0.5">
                  글자뿐 아니라 <strong>입력 화면에 보이던 본문 상태·첨부한 사진 정보</strong>도 함께 보관해, &quot;불러오기&quot;를 누르면 <strong>사진 위치·순서까지 되살릴 수 있다</strong>. 예전 형식의 초안이 있으면 그 형식도 읽어 준다.
                </p>
              </div>
            </div>

            {/* 저장 트리거 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="font-bold text-blue-900 mb-3 text-sm">⚙️ 임시저장 트리거 2가지</div>
              <div className="space-y-3">
                <div className="bg-white border border-blue-200 rounded p-3">
                  <div className="text-xs font-bold text-blue-800 mb-2">① 자동 임시저장 (입력이 잠깐 멈춘 뒤)</div>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• 제목·질환·진료과·역할·연령대·감정을 고치거나, 본문에 글·사진을 넣을 때마다 “곧 저장” 예약이 잡힌다.</li>
                    <li>• <strong>마지막으로 고친 뒤 약 3초가 지나면</strong> 이 기기에 초안이 한 번 저장된다.</li>
                    <li>• 헤더에 잠깐 <strong>「저장됨」</strong>이 뜨고, 이어서 <strong>「시:분 저장」</strong> 형태로 마지막 저장 시각을 보여 준다.</li>
                    <li>• <strong>게시하기·수정 완료</strong>를 누르면 예약된 자동 저장을 멈추고, 방금 게시한 내용으로 초안이 다시 생기지 않게 한다.</li>
                  </ul>
                </div>
                <div className="bg-white border border-blue-200 rounded p-3">
                  <div className="text-xs font-bold text-blue-800 mb-2">② X(닫기) 버튼 자동저장</div>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• 제목·내용·질환명 중 하나라도 입력돼 있으면 <strong>즉시 저장 후 닫기</strong></li>
                    <li>• 아무 내용도 없으면 저장 생략 후 닫기</li>
                    <li className="text-red-500">• 푸터 취소 버튼은 저장 없이 닫기 — 의도적 포기 시</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 복원 다이얼로그 */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="font-bold text-amber-900 mb-3 text-sm">🔄 임시저장 복원 다이얼로그 — 글쓰기·수정 화면 재진입 시</div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-white border border-amber-200 rounded p-3">
                  <div className="text-xs font-bold text-amber-800 mb-2">표시 조건</div>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• 글쓰기(또는 수정) 창이 <strong>막 열렸을 때</strong> 이 기기에 남은 초안이 있는지 본다.</li>
                    <li>• 제목·본문·질환명 등 <strong>의미 있는 내용이 남아 있을 때</strong> 확인 창을 띄운다.</li>
                    <li>• <strong>수정</strong>일 때는, 지금 편집 중인 원문과 초안이 <strong>다를 때만</strong> 물어 본다(같으면 방해하지 않음).</li>
                  </ul>
                </div>
                <div className="bg-white border border-amber-200 rounded p-3">
                  <div className="text-xs font-bold text-amber-800 mb-2">UI 형태</div>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• 글쓰기·수정 화면 위에 딤(bg-black/40) 레이어</li>
                    <li>• 흰 카드: rounded-2xl, max-w-xs, shadow-2xl</li>
                    <li>• 타이틀 <strong>"AIGA"</strong> + 메시지 + 저장시각 미리보기</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white border border-amber-200 rounded p-3">
                <div className="text-xs font-bold text-amber-800 mb-2">버튼 동작</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="inline-block px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg font-medium mb-1">취소(삭제)</div>
                    <p className="text-gray-600">이 기기에 남아 있던 초안을 지우고, 비어 있는 글쓰기 화면으로 시작한다.</p>
                    <p className="text-gray-500 mt-0.5">수정 모드: 「취소(원본으로)」는 저장해 둔 초안만 버리고, 글의 원래 저장본 기준으로 이어 쓴다.</p>
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1.5 bg-blue-600 text-white rounded-lg font-medium mb-1">불러오기</div>
                    <p className="text-gray-600">저장돼 있던 입력값·본문·사진 배치를 그대로 글쓰기 칸에 되살린다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 자동 삭제 */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="font-bold text-green-900 mb-2 text-sm">🗑️ 초안이 사라지는 때</div>
              <ul className="space-y-1.5 text-xs text-green-900">
                <li>• <strong>게시하기 / 수정 완료</strong>로 글이 정상 등록·반영된 뒤</li>
                <li>• 확인 창에서 <strong>취소(삭제)</strong>로 초안을 버릴 때</li>
                <li>• 등록이 끝난 직후 커뮤니티 화면에서도 한 번 더 비워 두어, 다음에 열 때 불필요한 알림이 없게 한다.</li>
              </ul>
            </div>

            {/* 푸터 버튼 구성 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-gray-900 mb-3 text-sm">🔘 글쓰기·수정 화면 푸터 버튼 구성 (v0.58 기준)</div>
              <div className="flex gap-2 mb-3 max-w-sm">
                <div className="flex-1 px-4 py-2.5 text-center text-sm font-medium bg-gray-100 text-gray-700 rounded-lg">취소</div>
                <div className="flex-1 px-4 py-2.5 text-center text-sm font-medium bg-blue-600 text-white rounded-lg">게시하기</div>
              </div>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>• <strong>취소</strong>: 저장 없이 닫기</li>
                <li>• <strong>게시하기 / 수정 완료</strong>: 입력 조건을 만족할 때만 등록·수정 처리, 이어서 이 기기 초안 삭제</li>
              </ul>
            </div>

          </div>
        </section>


      </div>
    </div>
  );
}