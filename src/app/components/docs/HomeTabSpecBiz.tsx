// 홈탭 화면정의서 — UI/UX (비기술 버전)
import { useAppNavigation } from '../../contexts/AppNavigationContext';
import { DISEASE_CATEGORIES, DOCTORS } from '@/constants/doctor-data';

export function HomeTabSpecBiz() {
  const { navigateToHome, navigateToHomeWithCategory, navigateToChat, navigateToCommunity, openDoctorProfile } = useAppNavigation();
  
  // 샘플 의사 데이터 (폐암 카테고리의 첫 번째 의사)
  const sampleDoctor = DOCTORS.find(d => d.diseaseArea === '폐암') || DOCTORS[0];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-sm">
      {/* 문서 헤더 - 컴팩트 */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white px-3 py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">v0.6</span>
          <span className="bg-white/10 text-purple-100 text-[10px] px-2 py-0.5 rounded-full">2026.03.27</span>
          <span className="bg-yellow-400/90 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">🎨 UI/UX</span>
        </div>
        <h1 className="text-base font-black mb-1">홈 화면</h1>
        <p className="text-purple-200 text-[10px]">기획·디자인 논의용</p>
      </div>

      <div className="px-3 py-4 space-y-4">{/* ───── 1. 화면 개요 ───── */}
        <BizSection id="overview" title="1. 화면 개요" color="violet">
          <BizTable
            headers={['항목', '내용']}
            rows={[
              ['화면 이름', '홈 화면 (첫 번째 탭)'],
              ['진입 방법', '웹을 처음 열거나, 하단 탭 메뉴에서 "홈" 터치'],
              ['대상 사용자', '비회원 · 회원 공통 (일부 기능만 구분)'],
              ['화면의 목적', 'AI 챗봇으로 자연스럽게 유도 / 질환별 명의 탐색 / 커뮤니티 추천글 열람 / 건강 정보 읽기'],
              ['화면 형태', '상단 고정 헤더 + 위아래 스크롤 콘텐츠 + 하단 탭 메뉴'],
              ['기준 화면', '모바일 우선, PC/태블릿은 가운데 정렬로 표시'],
            ]}
          />
        </BizSection>

        {/* ───── 2. 화면 구성 ───── */}
        <BizSection id="layout" title="2. 화면 구성 (위에서 아래 순서)" color="indigo">

          <BizBlock label="구역 1" title="상단 헤더">
            <BizTable
              headers={['요소', '설명', '비고']}
              rows={[
                ['AIGA 로고 (왼쪽)', '웹 로고 이미지', '터치해도 아무 반응 없음'],
                ['오른쪽 영역', '현재 비워둠', '추후 알림·검색 아이콘 추가 예정 — 기획 확정 필요'],
              ]}
            />
          </BizBlock>

          <BizBlock label="구역 2" title="AI 챗봇 배너">
            <BizTable
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
          </BizBlock>

          <BizBlock label="구역 3" title="주요 질환 인기 명의">
            <BizTable
              headers={['요소', '설명', '비고']}
              rows={[
                ['섹션 제목', '"주요 질환 인기 명의"', '—'],
                ['질환 탭 (최대 10개)', '400여 개 표준진료분야 중 월별 기간(1주~1개월 선택 가능) 동안 검색 랭킹 상위 10개를 가로 스크롤로 표시', '기준: 명의찾기 검색,AI 챗봇 검색,추천 클릭 합산 랭킹'],
                ['기본 선택 탭', '랭킹 1위 질환이 기본 선택 상태로 표시됨', '—'],
                ['탭 선택 시', '해당 질환의 명의 목록이 즉시 바뀜', '—'],
                ['의사 카드', '프로필 사진 · 이름 · 병원명 · 진료과 · 화살표 (터치 시 프로필 팝업 이동)', '최대 7명, 검색량 많은 순'],
                ['카드 터치 시', '해당 의사 상세 모달 열림', '—'],
                ['현재 데이터', 'aiga 의사 데이터', '—'],
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
                <p className="text-xs text-indigo-600 font-medium mb-2">의사 카드 터치 시 프로필 모달 열기:</p>
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
          </BizBlock>

          <BizBlock label="구역 4" title="커뮤니티 추천글 가로 스크롤" file="home/CommunityPostCard.tsx">
            {/* 기존 알림 박스 제거 */}
            <InfoTable headers={['항목', '설명']}>
              <InfoRow label="제목·더보기" value="'커뮤니티 추천글' 제목 + '더보기 →' 버튼. 더보기 클릭 시 커뮤니티 탭으로 이동" />
              <InfoRow label="카드 수" value="최대 5장. 최근 3개월 이내 작성된 글 중 인기 점수(좋아요×10 + 댓글×3 + 조회수) 상위 20~30개에서 랜덤으로 5개 선택하여 표시" />
              <InfoRow label="스크롤 방식" value="가로 스크롤 (overflowX: auto + WebkitOverflowScrolling: touch). 인라인 스타일로 적용하여 부모 overflow-y-auto와의 충돌 방지 + iOS Safari 터치 스크롤 최적화" />
            </InfoTable>
            <BizTable
              headers={['요소', '설명', '비고']}
              rows={[
                ['카드 내용', '작성자 프로필 사진 · 닉네임 · 날짜 (24시간 이내: N분, N시간 전 / 7일 이내: N일 전 / 그 이후: YYYY.MM.DD) · 글 제목(최대 2줄, 초과 시 말줄임표) · 내용 미리보기(본문 첫 50자, 초과 시 ... 표시) · 공감 수 · 댓글 수', '조회수는 표시하지 않음 (v0.6 기준)'],
                ['인증 뱃지', '인증된 작성자 카드에 체크 뱃지 표시', '—'],
                ['카드 터치 시', '해당 커뮤니티 글 상세 모달 열림 + 조회수 카운팅 시작', '조회수는 화면에 표시하지 않으나 백엔드에서 수집'],
                ['조회수 증가 조건', '모달 열고 3초 이상 머무름 + 같은 사용자가 24시간 이내 읽지 않은 글일 때만 +1', '실수 클릭 제외, 어뷰징 방지, 인기 점수 산출 및 운영 데이터 분석에 활용'],
              ]}
            />
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-slate-900 mb-2">회원 vs 비회원 (구역 4 → 상세 모달)</p>
              <p className="text-xs text-slate-800 mb-2">
                비회원: 카드·상세 열람(열람 한도 정책 시 차감), 공감·댓글·답글·신고 불가, ⋮는 공유만.
                회원: 열람 한도 없음(consumePostView 항상 통과), 게시글·댓글 공감, 댓글·답글 작성, ⋮에서 공유·본인글 수정·삭제·타인 신고, 더보기로 커뮤니티 전체 기능.
              </p>
              <p className="text-xs text-slate-600">구현 참고: PostDetailModal · UsageLimitContext(isMember)</p>
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
          </BizBlock>

          <BizBlock label="구역 5" title="건강 정보 — 외부 소스 실시간 무한 스크롤">
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm font-bold text-blue-800 mb-1">🔄 변경 — 코메디닷컴 등 외부에서 실시간으로 기사 가져오기</p>
              <p className="text-sm text-blue-900">건강 정보를 코메디닷컴 같은 외부 건강 미디어에서 실시간으로 가져와 표시합니다. 스크롤을 내릴 때마다 계속해서 새로운 기사가 추가되는 진짜 무한 스크롤입니다.</p>
            </div>
            <BizTable
              headers={['요소', '설명', '비고']}
              rows={[
                ['첫 진입 시', '건강 정보 카드 4개 표시', '—'],
                ['스크롤 내리면', '4개씩 새로운 기사 추가로 불러옴', '끝이 없이 계속 이어짐'],
                ['기사 출처', '코메디닷컴 등 외부 건강 미디어', '실시간으로 최신 기사 공급'],
                ['카드 터치 시', '새 탭으로 외부 기사 바로 열림', '건강 기사 모달 없음(외부 링크만)'],
                ['카드 이미지', '기사 원문의 이미지', '외부 소스 썸네일 사용'],
              ]}
            />
            <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <p className="text-sm font-bold text-indigo-800 mb-1">🔗 데이터 상태 처리</p>
              <p className="text-sm text-indigo-900">
                로딩 중, 에러 발생, 데이터 없음 상태 표시는 <span className="font-bold text-indigo-700">공통 컴포넌트 문서 → 3. 데이터 상태 UI</span>를 참조하세요.
              </p>
            </div>
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm font-bold text-green-800 mb-1">💡 프로토타입 개발 참고</p>
              <p className="text-sm text-green-900">현재 개발 단계에서는 샘플 기사 12개를 반복하여 표시하는 임시 방식을 사용 중입니다. 실제 서비스 오픈 시 코메디닷컴 RSS 또는 API를 연동하여 실시간 기사로 교체될 예정입니다.</p>
            </div>
          </BizBlock>

          <BizBlock label="구역 6" title="하단 탭 메뉴">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <p className="text-sm text-indigo-900">
                <span className="font-bold">🔗 공통 컴포넌트</span><br />
                하단 탭 메뉴는 모든 주요 화면에서 재사용되는 전역 레이아웃 컴포넌트입니다. 자세한 내용은 <span className="font-bold text-indigo-700">공통 컴포넌트 문서 → 3. 레이아웃 컴포넌트 (하단 탭 메뉴)</span>를 참조하세요.
              </p>
            </div>
          </BizBlock>
        </BizSection>

        {/* ───── 3. 모달 설명 ───── */}
        <BizSection id="modals" title="3. 모달 설명" color="violet">

          <BizBlock label="모달 1" title="의사 프로필 🔗 공통 컴포넌트">
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm font-bold text-blue-800 mb-1">🔗 공통 컴포넌트 — 홈 탭에서의 사용 방식</p>
              <p className="text-sm text-blue-900">이 모달은 명의찾기 탭, 커뮤니티 탭 등 여러 화면에서 사용되는 공통 컴포넌트입니다. 여기서는 홈 탭에서의 진입 방식과 사용 맥락만 정의합니다.</p>
            </div>
            <BizTable
              headers={['항목', '설명', '비고']}
              rows={[
                ['진입 방식', '주요 질환 인기 명의 섹션의 의사 카드 터치 시', '—'],
                ['전달 데이터', '선택한 의사 정보 (이름, 병원, 진료과, 프로필 등)', '—'],
                ['상세 스펙', '📄 공통 컴포넌트 정의서 참조', '의사 정보, 리뷰, 북마크 등 전체 기능 상세'],
              ]}
            />
          </BizBlock>

          {/* ─────────────────────────────────────────────────────────────
              보류: 내 주변 명의 병원 모달
              홈 화면 진입 경로가 제거되어 현재 접근 불가능 상태입니다.
              기능 재배치 또는 다른 화면에서의 재활용 여부 기획 결정 대기 중입니다.
          ──────────────────────────────────────────────────────────────── */}
          {/* <BizBlock label="모달 2" title="내 주변 명의 병원 — ⚠️ 홈 화면 진입 경로 제거됨">
            <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-bold text-amber-800 mb-2">⚠️ v0.6 기준 — 홈 화면에서 이 모달로 들어가는 카드(버튼)가 없습니다</p>
              <p className="text-sm text-amber-900">모달 자체는 아직 코드에 보존되어 있으나, 홈 화면에서 접근할 수 없습니다. 이 기능을 다른 탭이나 화면에서 재활용할지 기획 결정이 필요합니다.</p>
            </div>
            <BizTable
              headers={['기능', '설명', '비고']}
              rows={[
                ['병원 유형 필터', '전체 / 상급종병원 / 종합병원 / 의원', '—'],
                ['지도 (왼쪽)', '구글 지도 표시', '정책 확정: 위치 동의 시 실제 좌표를 지도에 반영. 거부 시 서울 중심으로 표시'],
                ['병원 목록 (오른쪽)', '병원명 · 유형 뱃지 · 별점 · 거리 · 교수 수 · 주소', '현재 샘플 7개'],
                ['길찾기 버튼', '카카오맵 앱 또는 웹으로 연결되어 찾기 시작', '✅ 처리됨'],
                ['전화하기 버튼', '스마트폰: 전화번호로 바로 전화 / PC: 전화번호 클립보드 복사', '✅ 처리됨'],
              ]}
            />
          </BizBlock> */}

          <BizBlock label="모달 2" title="커뮤니티 게시글 🔗 공통 컴포넌트">
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm font-bold text-blue-800 mb-1">🔗 공통 컴포넌트 — 홈 탭에서의 사용 방식</p>
              <p className="text-sm text-blue-900">이 모달은 커뮤니티 탭 등 여러 화면에서 사용되는 공통 컴포넌트입니다. 여기서는 홈 탭에서의 진입 방식과 사용 맥락만 정의합니다.</p>
            </div>
            <BizTable
              headers={['항목', '설명', '비고']}
              rows={[
                ['진입 방식', '커뮤니티 추천글 카드 터치 시', '—'],
                ['전달 데이터', '선택한 게시글 정보 (제목, 본문, 작성자, 댓글 등)', '—'],
                ['상세 스펙', '📄 공통 컴포넌트 정의서 참조', '게시글 열람, 댓글 작성 등 전체 기능 상세'],
              ]}
            />
            <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-sm font-bold text-emerald-800 mb-3">👥 비회원 / 회원 구분</p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-emerald-900 mb-1">비회원 (isGuest=true)</p>
                  <ul className="text-sm text-emerald-800 space-y-1 ml-4">
                    <li>• 댓글 입력창 비활성화 (readOnly) + 자물쇠 아이콘 표시</li>
                    <li>• 하단에 노란색 인라인 배너 (bg-amber-50) 표시</li>
                    <li>• 배너 내용: "⚠️ 로그인하면 댓글을 작성하고 공감을 표현할 수 있습니다"</li>
                    <li>• 노란색 "로그인하기" 버튼 (bg-amber-400 hover:bg-amber-500)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-900 mb-1">회원 (isGuest=false)</p>
                  <ul className="text-sm text-emerald-800 space-y-1 ml-4">
                    <li>• 댓글 입력창 활성화 + 전송 버튼 표시</li>
                    <li>• 하단 인라인 배너 없음</li>
                    <li>• 댓글 작성, 공감 등 모든 기능 사용 가능</li>
                  </ul>
                </div>
              </div>
            </div>
          </BizBlock>

          <BizBlock label="모달 3" title="건강 기사 — 모달 없이 외부 링크로 즉시 이동">
            <BizTable
              headers={['기능', '설명', '비고']}
              rows={[
                ['기사 열기', '새 탭에서 외부 기사 사이트로 즉시 이동', '모달 없이 바로 이동'],
                ['이용 자격', '회원/비회원 구분 없이 누구나', '—'],
              ]}
            />
          </BizBlock>

          <BizBlock label="공통" title="리뷰 작성 🔗 공통 컴포넌트">
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm font-bold text-blue-800 mb-1">🔗 공통 컴포넌트 — 홈 탭에서의 사용 방식</p>
              <p className="text-sm text-blue-900">이 모달은 의사 프로필 모달 내부에서 호출되는 공통 컴포넌트입니다.</p>
            </div>
            <BizTable
              headers={['항목', '설명', '비고']}
              rows={[
                ['진입 방식', '의사 프로필 모달 → 리뷰 작성 버튼 터치', '—'],
                ['상세 스펙', '📄 공통 컴포넌트 정의서 참조', '별점, 리뷰 작성 등 전체 기능 상세'],
              ]}
            />
            <BizNote>
              비회원이 리뷰 작성 버튼을 터치하면 "로그인 유도 안내" 컴포넌트가 먼저 표시됩니다.
            </BizNote>
          </BizBlock>

          <BizBlock label="공통" title="로그인 유도 안내 🔗 공통 컴포넌트">
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm font-bold text-blue-800 mb-1">🔗 공통 컴포넌트 — 홈 탭에서의 사용 방식</p>
              <p className="text-sm text-blue-900">이 컴포넌트는 전체 앱에서 사용되는 공통 컴포넌트입니다.</p>
            </div>
            <BizTable
              headers={['항목', '설명', '비고']}
              rows={[
                ['진입 방식', '비회원이 즐겨찾기 또는 리뷰쓰기 버튼 터치 시', '—'],
                ['상세 스펙', '📄 공통 컴포넌트 정의서 참조', '표시 형태, 문구, 로그인 경로 등'],
              ]}
            />
          </BizBlock>
        </BizSection>

        {/* ───── 4. 회원/비회원 기능 차이 ───── */}
        <BizSection id="auth" title="4. 회원 / 비회원 기능 차이" color="emerald">
          <BizTable
            headers={['기능', '비회원', '회원', '비고']}
            rows={[
              ['홈 화면 전체 보기', '✅ 가능', '✅ 가능', '—'],
              ['질환 탭으로 명의 탐색', '✅ 가능', '✅ 가능', '—'],
              ['의사 프로필 열람', '✅ 가능', '✅ 가능', '—'],
              ['의사 즐겨찾기', '❌ 로그인 유도', '✅ 가능', '—'],
              ['의사 리뷰쓰기', '❌ 로그인 유도', '✅ 가능', '—'],
              ['커뮤니티 추천글 읽기', '✅ 가능', '✅ 가능', '—'],
              ['커뮤니티 댓글 작성', '❌ 입력창 비활성 + 안내문', '✅ 가능', '—'],
              ['건강 정보 열람', '✅ 가능', '✅ 가능', '—'],
            ]}
          />
          <BizNote>
            현재 웹 기본 상태는 비회원입니다. 로그인하면 회원 기능이 활성화됩니다.
          </BizNote>
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

function BizTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
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