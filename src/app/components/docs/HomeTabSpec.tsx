// 홈탭 화면정의서 — 화면·사용 흐름 관점 (시범 화면 참고 · 예시 데이터)
import type { ReactNode } from 'react';
import { useAppNavigation } from '../../contexts/AppNavigationContext';
import { DISEASE_CATEGORIES, DOCTORS } from '@/constants/doctor-data';
import { SpecDocLink } from './SpecDocLink';

export function HomeTabSpec() {
  const { navigateToHomeWithCategory, navigateToChat, navigateToCommunity, openDoctorProfile } = useAppNavigation();

  // 시연용: 폐암 카테고리 첫 번째 의사 예시
  const sampleDoctor = DOCTORS.find(d => d.diseaseArea === '폐암') || DOCTORS[0];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-sm">
      {/* 문서 헤더 */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-3 py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">v0.6</span>
          <span className="bg-white/10 text-blue-100 text-[10px] px-2 py-0.5 rounded-full">2026.03.27</span>
          <span className="bg-yellow-400/90 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">🎨 화면·경험</span>
        </div>
        <h1 className="text-base font-black mb-1">홈 화면</h1>
        <p className="text-blue-200 text-[10px]">화면·동작·터치 반응 (옆 시범 화면 참고)</p>
      </div>

      <div className="px-3 py-4 space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-3">
          <p className="text-xs font-bold text-amber-900 mb-1">📌 이 문서의 범위</p>
          <ul className="text-[11px] text-amber-900 space-y-1 list-disc list-inside leading-relaxed">
            <li><strong>다루는 것:</strong> 영역 구획, 시각적 패턴, 터치·스크롤·모달 등 사용자 경험, 회원/비회원 구분 같은 정책 방향.</li>
            <li><strong>참고만 하는 것:</strong> 옆에 띄운 <strong>시범·데모 화면</strong>의 배치와 동작. 화면에 보이는 숫자·글·명의·게시글 목록은 <strong>가짜 예시</strong>이므로, 실제 서비스의 순위·노출 방식과 같다고 보지 않습니다.</li>
            <li><strong>실서비스:</strong> 어떤 글·의사가 올라올지, 한도 숫자 등은 시스템·운영 정책에 따르며, 본 문서는 그때 화면이 어떻게 보이고 사용자에게 어떻게 보여야 하는지를 적습니다.</li>
          </ul>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-3">
          <p className="text-xs font-bold text-blue-900 mb-1">🧭 비회원 기준 정책</p>
          <ul className="text-[11px] text-blue-900 space-y-1 list-disc list-inside leading-relaxed">
            <li><strong>기본 경험:</strong> 비회원은 핵심 흐름을 맛보기로 경험할 수 있으나, 횟수·기능 제한이 있습니다.</li>
            <li><strong>회원 확장:</strong> 가입 후에는 한도 완화, 잠금 해제, 저장/작성 권한이 확장됩니다.</li>
            <li>
              <strong>문서 운영:</strong> 본 문서는 비회원·공통 기준을 적고, 회원만 달라지는 내용은{' '}
              <SpecDocLink to="homeMemberDelta">회원전용 홈 화면 정의서</SpecDocLink>에서만 다룹니다.
            </li>
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
              <p className="text-xs font-bold text-blue-800 mb-1">🔍 통합 검색 — 화면 배치 (시범 화면과 동일)</p>
              <p className="text-xs text-blue-900">
                상단 바에는 <strong>로고만</strong> 두고, 통합 검색은 <strong>반응형 웹</strong> UI에서 페이지 헤더 바깥·<strong>메인 뷰(모바일 우선 폭의 콘텐츠 영역) 우상단에 고정</strong>된 돋보기 버튼으로 배치합니다(홈·명의 찾기·커뮤니티에서 공통).
                페이지 헤더 줄과 겹치지 않으며, 본문을 세로 스크롤해도 버튼 위치는 유지되는 것이 UX 목표입니다.
              </p>
            </div>
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['AIGA 로고 (왼쪽)', '이미지 로고', '헤더 안쪽. 메뉴 이동은 아래쪽 탭 줄을 사용'],
                ['헤더 우측', '비움', '통합 검색은 헤더 밖·가운데 본문 영역 우상단 고정 돋보기(위 박스). 별도 설치 앱이 아니라 웹 브라우저 기준'],
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
            {/* 미리보기 이동 버튼 */}
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
                ['목록·순위', '화면은 카드 목록·탭 전환. 실제 누가 올라올지·순서는 운영·기획에서 정함(시범 화면은 예시)', '—'],
              ]}
            />
            <p className="mt-3 text-xs text-rose-800 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 leading-relaxed">
              <strong>비회원:</strong> 카드 터치로 프로필을 열 때 소모되는 &quot;프로필 조회&quot; 한도는 명의 찾기·통합 검색과 <strong>동일 전역 카운터</strong>입니다.
            </p>
            {/* 미리보기 이동 */}
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
              <p className="text-sm font-bold text-indigo-800 mb-1">🔗 불러오기·오류·빈 화면</p>
              <p className="text-sm text-indigo-900">
                &quot;불러오는 중&quot;, 오류, 내용이 없을 때 보여 줄 안내는{' '}
                <SpecDocLink to="commonDataStates" className="font-bold text-indigo-700">
                  공통 UI 정의서 → 3. 데이터 상태 화면
                </SpecDocLink>
                를 참조하세요.
              </p>
            </div>
          </SubSection>

          <SubSection label="구역 4" title="커뮤니티 추천글 가로 스크롤">
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['제목·더보기', '\"커뮤니티 추천글\" 제목 + \"더보기 →\" 버튼. 더보기 클릭 시 커뮤니티 탭으로 이동', '—'],
                ['카드 수', '최대 5장. 최근 3개월 이내 작성된 글 중 인기 점수(좋아요×10 + 댓글×3 + 조회수×1) 상위 20~30개에서 랜덤으로 5개 선택하여 표시', '정렬 기준: 인기 점수 기반 랜덤 샘플링'],
                ['스크롤 방식', '가로 스크롤(터치에 맞게 부드럽게). 안쪽·바깥 스크롤이 겹치지 않게 처리, 아이폰 Safari에서도 자연스럽게', '—'],
                ['카드 내용', '작성자 프로필 사진 · 닉네임 · 날짜 (24시간 이내: N분, N시간 전 / 7일 이내: N일 전 / 그 이후: YYYY.MM.DD) · 글 제목(최대 2줄, 초과 시 말줄임표) · 내용 미리보기(본문 첫 50자, 초과 시 ... 표시) · 공감 수 · 댓글 수', '조회수는 표시하지 않음 (v1.1 변경)'],
                ['인증 뱃지', '인증된 작성자 카드에 체크 뱃지 표시', '—'],
                ['카드 터치 시', '해당 커뮤니티 글 상세 팝업 열림 + 조회수 집계 시작', '조회수는 화면에 숫자로 보이지 않고, 서버에서만 집계'],
                ['조회수 증가 조건', '팝업을 열고 3초 이상 머무름 + 같은 사용자가 24시간 이내 읽지 않은 글일 때만 +1', '실수 클릭 제외, 어뷰징 방지, 인기 점수 산출 및 운영 데이터 분석에 활용'],
              ]}
            />
            <div className="mb-3 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5">
              <p className="text-xs text-rose-900 leading-relaxed">
                <strong>비회원 사용량(전역):</strong> 추천글 상세를 열 때 차감되는 &quot;게시글 열람&quot; 한도는 홈만의 숫자가 아니라, <strong>커뮤니티·통합 검색·홈이 공유하는 동일 카운터</strong>입니다. 검색 3회·프로필 열람 3회·게시글 열람 5회 역시 탭과 무관하게 전역 합산됩니다.
              </p>
            </div>
            <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-slate-900 mb-2">👥 비회원 기준 — 추천글 섹션</p>
              <Table
                headers={['기능', '비회원 기준', '비고']}
                rows={[
                  ['추천글 카드·가로 스크롤', '✅ 열람', 'UI 기준 동작. 카드에는 공감·댓글 수만 표시(카드에서 직접 공감 불가)'],
                  [
                    '카드 터치 → 상세 팝업',
                    '✅ 가능. 비회원 게시글 열람 한도 정책이면 1회 차감, 소진 시 한도 안내',
                    '조회수 +1 타이머·3초·24시간 규칙은 동일',
                  ],
                  ['상세: 본문·질환 태그·첨부 이미지', '✅ 열람', '이미지는 라이트박스 등으로 확대'],
                  ['상세: 게시글 공감', '❌ 탭 시 로그인 유도', '회원전용 정의서에서 정의'],
                  ['상세: 댓글·답글', '❌ 입력 비활성·하단 안내', '회원전용 정의서에서 정의'],
                  ['상세: ⋮ 더보기 메뉴', '공유하기만 노출', '신고/수정/삭제 등은 회원전용 정의서에서 정의'],
                  ['더보기 → 커뮤니티 탭', '✅ 이동', '구역 4는 샘플 5개, 커뮤니티 탭은 전체 목록'],
                ]}
              />
              <p className="mt-3 text-xs text-slate-700">
                회원전용 확장(열람 한도 완화, 공감·댓글 작성, 신고·수정/삭제)은{' '}
                <SpecDocLink to="homeMemberDelta">회원전용 홈 화면 정의서</SpecDocLink>를 참조합니다.
              </p>
            </div>
            <div className="mt-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-green-800 mb-1">✅ 게시글 0개 시 빈 화면 처리</p>
              <p className="text-xs text-green-900">
                <span className="font-semibold">처리 방식:</span> 게시글이 하나도 없을 때 카드를 숨기지 않고 &quot;첫 번째 글을 작성해보세요&quot; 문구
              </p>
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
              <p className="text-xs text-amber-900">
                <span className="font-semibold">화면 표시:</span> 조회수는 카드에 숫자로 보이지 않습니다. 서버에서만 집계해 인기 점수·운영
                분석에 쓰고, 이후 마이페이지 &quot;내가 쓴 글&quot;에서 작성자에게만 보여 줄 수 있습니다.
              </p>
            </div>
            {/* 미리보기 이동 */}
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
              <p className="text-sm font-bold text-indigo-800 mb-1">🔗 불러오기·오류·빈 화면</p>
              <p className="text-sm text-indigo-900">
                &quot;불러오는 중&quot;, 오류, 내용이 없을 때 보여 줄 안내는{' '}
                <SpecDocLink to="commonDataStates" className="font-bold text-indigo-700">
                  공통 UI 정의서 → 3. 데이터 상태 화면
                </SpecDocLink>
                를 참조하세요.
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
              <p className="text-sm font-bold text-indigo-800 mb-1">🔗 불러오기·오류·빈 화면</p>
              <p className="text-sm text-indigo-900">
                &quot;불러오는 중&quot;, 오류, 내용이 없을 때 보여 줄 안내는{' '}
                <SpecDocLink to="commonDataStates" className="font-bold text-indigo-700">
                  공통 UI 정의서 → 3. 데이터 상태 화면
                </SpecDocLink>
                를 참조하세요.
              </p>
            </div>
            <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm font-bold text-green-800 mb-1">💡 데이터 (시범 화면 vs 목표)</p>
              <p className="text-sm text-green-900">
                <strong>목표 화면:</strong> 외부 건강 미디어 등에서 가져온 기사를 카드로 보여 주고, 탭 시 <strong>팝업 없이</strong> 원문으로
                이동, 스크롤할 때마다 더 불러오기.
              </p>
              <p className="text-sm text-green-900 mt-1">
                <strong>시범 화면:</strong> 고정된 예시 목록을 반복해 무한 스크롤을 보여 줄 수 있음 — 실제 서비스 피드와 같지 않을 수
                있습니다.
              </p>
            </div>
          </SubSection>

          <SubSection label="구역 6" title="하단 탭 메뉴 🔗 공통 UI">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <p className="text-sm text-indigo-900">
                <span className="font-bold">🔗 공통 UI</span>
                <br />
                하단 탭 줄은 여러 주요 화면에서 같은 모양으로 쓰입니다. 배치·터치 영역 등은{' '}
                <SpecDocLink to="commonLayout" className="font-bold text-indigo-700">
                  공통 UI 정의서 → 4. 레이아웃 (하단 탭 메뉴)
                </SpecDocLink>
                를 참조하세요.
              </p>
            </div>
          </SubSection>
        </Section>

        {/* ───── 3. 팝업 설명 ───── */}
        <Section id="modals" title="3. 팝업 설명" color="violet">

          <SubSection label="팝업 1" title="의사 프로필 🔗 공통 UI">
            <div className="mb-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-blue-800 mb-1">🔗 공통 UI — 홈 탭에서 쓰는 방식</p>
              <p className="text-xs text-blue-900">
                이 팝업은 명의 찾기·커뮤니티 등 여러 화면에서 같은 형태로 쓰입니다. 여기서는 홈에서 어떻게 열리는지만 적습니다.
              </p>
            </div>
            <Table
              headers={['항목', '설명', '비고']}
              rows={[
                ['진입 방식', '주요 질환 인기 명의 섹션의 의사 카드 터치 시', '—'],
                ['전달 데이터', '선택한 의사 정보 (이름, 병원, 진료과, 프로필 등)', '—'],
                [
                  '상세 스펙',
                  <SpecDocLink key="c1" to="commonModals">
                    📄 공통 UI 정의서 참조
                  </SpecDocLink>,
                  '의사 정보, 리뷰 분석, 리뷰 목록, 북마크 등 전체 기능',
                ],
              ]}
            />
          </SubSection>

          <SubSection label="팝업 2" title="커뮤니티 게시글 상세 (홈·통합검색 경로)">
            <div className="mb-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-blue-800 mb-1">작업용 참고</p>
              <p className="text-xs text-blue-900">
                시범 화면에서는 홈·통합 검색에서 연 <strong>글 상세 창</strong>과 커뮤니티 피드의 상세가 <strong>같은 쓰임을 목표로</strong>{' '}
                합니다. 개발 과정에서 화면이 나뉘어 있을 수 있어도, 기획·디자인은 <strong>본문·공감·댓글·더보기</strong> 패턴이 같게 맞추면
                됩니다.
              </p>
            </div>
            <Table
              headers={['항목', '설명', '비고']}
              rows={[
                ['진입', '추천글 카드 터치', '비회원 열람 한도는 정책(데모에서만 적용될 수 있음)'],
                [
                  '내용',
                  '제목·본문·메타·댓글 등',
                  <>
                    공통 UI 정의서의 <SpecDocLink to="commonModals">게시글 상세 패턴</SpecDocLink> 준수
                  </>,
                ],
                ['공감', '탭 시 로그인 유도', '카드에는 표시만'],
                [
                  '상세',
                  '댓글·더보기·커뮤니티 이동 등',
                  <SpecDocLink key="c2" to="commonModals">
                    공통 문서 참조
                  </SpecDocLink>,
                ],
              ]}
            />
            <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-emerald-800 mb-3">👥 비회원 기준 — 글 상세 창</p>
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
              </div>
              <p className="mt-3 text-xs text-emerald-800">
                회원전용에서 달라지는 동작은{' '}
                <SpecDocLink to="homeMemberDelta">회원전용 홈 화면 정의서</SpecDocLink>를 참조합니다.
              </p>
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

          <SubSection label="공통" title="리뷰 작성 🔗 공통 UI">
            <div className="mb-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-blue-800 mb-1">🔗 공통 UI — 홈 탭에서 쓰는 방식</p>
              <p className="text-xs text-blue-900">의사 프로필 창 안에서 여는 리뷰 작성 화면은 다른 탭과도 같은 정의를 따릅니다.</p>
            </div>
            <Table
              headers={['항목', '설명', '비고']}
              rows={[
                ['진입 방식', '의사 프로필 팝업 → 리뷰 작성 버튼 터치', '회원만 가능. 비회원은 로그인 유도 안내 표시'],
                [
                  '상세 스펙',
                  <SpecDocLink key="c3" to="commonModals">
                    📄 공통 UI 정의서 참조
                  </SpecDocLink>,
                  '별점 선택, 리뷰 작성, 제출/취소 등 전체 기능',
                ],
              ]}
            />
            <Note>비회원이 리뷰 작성 버튼을 누르면 「로그인 유도 안내」 창이 먼저 뜹니다.</Note>
          </SubSection>

          <SubSection label="공통" title="로그인 유도 안내 🔗 공통 UI">
            <div className="mb-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-blue-800 mb-1">🔗 공통 UI — 홈 탭에서 쓰는 방식</p>
              <p className="text-xs text-blue-900">로그인을 권하는 안내 창은 앱 전반에서 같은 형태를 씁니다.</p>
            </div>
            <Table
              headers={['항목', '설명', '비고']}
              rows={[
                ['진입 방식', '비회원이 즐겨찾기 또는 리뷰쓰기 버튼 터치 시', '의사 프로필 팝업 내부에서 표시'],
                [
                  '상세 스펙',
                  <SpecDocLink key="c4" to="commonModals">
                    📄 공통 UI 정의서 참조
                  </SpecDocLink>,
                  '표시 형태, 문구 등',
                ],
              ]}
            />
            <Note>
              👉 로그인 유도 모달에서 로그인(가입) 버튼 탭 시 이후의 진행 흐름은{' '}
              <SpecDocLink to="mypageOverview">마이페이지 화면정의서</SpecDocLink>에 정리된 [공통 로그인/회원가입 플로우 정책]을 공통으로
              따름.
            </Note>
          </SubSection>
        </Section>

        {/* ───── 4. 비회원 기준 기능 요약 ───── */}
        <Section id="auth" title="4. 비회원 기준 기능 요약" color="emerald">
          <Table
            headers={['기능', '비회원 기준', '비고']}
            rows={[
              ['홈 화면 전체 보기', '✅ 가능', '—'],
              ['질환 탭으로 명의 탐색', '✅ 가능', '—'],
              ['의사 프로필 열람', '✅ 가능 (전역 한도 정책 적용)', '한도는 홈/명의찾기/통합검색 공용'],
              ['의사 즐겨찾기', '❌ 로그인 유도', '회원전용 기능'],
              ['의사 리뷰쓰기', '❌ 로그인 유도', '회원전용 기능'],
              ['커뮤니티 추천글 읽기', '✅ 가능 (전역 한도 정책 적용)', '—'],
              ['커뮤니티 게시글 공감/댓글', '❌ 로그인 유도 또는 입력 비활성', '회원전용 기능'],
              ['커뮤니티 게시글 ⋮ 더보기 메뉴', '공유하기만 (신고 숨김)', '회원전용 기능'],
              ['건강 정보 열람', '✅ 가능', '외부 링크로 즉시 이동'],
            ]}
          />
          <Note>
            회원전용에서 달라지는 내용은{' '}
            <SpecDocLink to="homeMemberDelta">회원전용 홈 화면 정의서</SpecDocLink>에서만 관리합니다.
          </Note>
        </Section>

        {/* 푸터 */}
      </div>
    </div>
  );
}

/* ─── 문서용 블록 (Section·표 등) ─── */

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
    <section id={id} className="scroll-mt-36">
      <div className={`flex items-center gap-1.5 mb-3 pb-2 border-b ${borderColors[color]}`}>
        <h2 className={`text-sm font-black px-2.5 py-1 rounded ${bgColors[color]}`}>{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function SubSection({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  const { navigateToCommonSpec } = useAppNavigation();
  const isCommonComponentLink = title.includes('🔗 공통 UI');

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

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
      <span className="text-blue-500 text-sm mt-0.5">ℹ️</span>
      <p className="text-xs text-blue-800">{children}</p>
    </div>
  );
}