import { useUser } from '../../contexts/UserContext';

export function MyPageSpec() {
  const { role } = useUser();
  const isMember = role === 'member';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">마이페이지</span>
            <span className="bg-white/10 text-blue-100 text-xs px-3 py-1 rounded-full">UI/UX 화면정의서</span>
          </div>
          <h1 className="text-3xl font-black mb-2">🙋 마이페이지</h1>
          <p className="text-blue-100 text-sm leading-relaxed">
            로그인 상태에 따라 보이는 내용이 달라지는 <strong>개인 영역</strong>입니다.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <section id="mypage-overview" className="scroll-mt-36 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-black text-gray-900 mb-4 pb-2 border-b border-gray-100">📌 개요</h2>
          {isMember && (
            <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">데모 번호(M01~M05):</span> 회원 마이 시범 화면의 동그란 번호와 아래{' '}
              <strong>로그인 후 화면</strong> 절의 동일 번호가 짝입니다. 번호를 누르면 이쪽으로 스크롤됩니다. 비회원 로그인
              유도 화면은 단일 화면이라 번호를 두지 않습니다.
            </div>
          )}
          <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
            <li>
              • <strong>역할:</strong> 이용자 본인의 계정 정보, 닉네임, 커뮤니티 활동(글·댓글·후기), 저장한 명의, 고객지원 링크를 한곳에서 제공합니다.
            </li>
            <li>
              • <strong>로그인 여부:</strong> <strong>로그인 전</strong>에는 로그인 유도 화면만 보이고, <strong>로그인 후</strong>에는 프로필·활동·설정이 보입니다. (스펙 패널 상단의 비회원/회원 전환으로 두 버전을 각각 확인할 수 있습니다.)
            </li>
            <li>
              • <strong>진입:</strong> 하단 글로벌 메뉴에서 <strong>MY</strong>를 누르면 이 화면으로 옵니다.
            </li>
            <li>
              • <strong>레이아웃:</strong> 본문은 모바일에서 읽기 좋은 <strong>최대 너비 안에서 가운데 정렬</strong>되며, 하단 고정 탭 메뉴와 겹치지 않도록 <strong>아래쪽 여백</strong>을 두었습니다.
            </li>
          </ul>
        </section>

        {!isMember ? (
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-3 pb-2 border-b border-gray-100">🔓 로그인 전 화면 (비회원 마이페이지)</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                상단 앱 바 제목은 로그인 후와 동일하게 <strong>마이페이지</strong>로 두어 같은 GNB 메뉴임을 인지시킵니다.
                닉네임·내 활동·고객지원·탈퇴 등 회원 전용 블록은 이 단계에서 보이지 않습니다.
              </p>
            </div>

            {/* [비회원 마이페이지 및 공통 로그인/가입 플로우 정책] — OAuth·약관 상태 구현 코드는 이 문서 범위 밖 */}
            <div className="pt-2 border-t border-gray-100 space-y-3">
              <h3 className="text-xs font-bold text-blue-800 tracking-wide uppercase bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                [비회원 마이페이지 및 공통 로그인/가입 플로우 정책]
              </h3>

              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                <p className="font-semibold text-gray-800">1. 진입 및 UI (비회원 마이페이지)</p>
                <ul className="space-y-1.5 list-disc pl-5">
                  <li>
                    <strong>노출 조건:</strong> <strong>비로그인</strong> 사용자가 하단 <strong>GNB</strong>에서{' '}
                    <strong>MY</strong> 탭을 탭해 진입할 때 이 화면을 노출합니다.
                  </li>
                  <li>
                    <strong>UI 구성 (중앙):</strong> 기본 프로필 <strong>Empty</strong> 아이콘과 함께{' '}
                    <strong>「로그인이 필요합니다」</strong>, 부가 문구 <strong>「나만의 건강 관리를 시작하세요!」</strong>를
                    노출합니다.
                  </li>
                  <li>
                    <strong>소셜 로그인 버튼:</strong>{' '}
                    <strong>[카카오톡으로 3초 만에 시작]</strong>, <strong>[네이버로 시작하기]</strong>를 세로로 배치해
                    주요 행동을 유도합니다.
                  </li>
                  <li>
                    <strong>하단 링크:</strong> <strong>[나중에 하기 &gt;]</strong> — 탭 시 <strong>홈 화면</strong> 또는
                    MY 진입 직전에 보고 있던 <strong>이전 화면</strong>으로 돌아갑니다.
                  </li>
                </ul>

                <p className="font-semibold text-gray-800 pt-2">2. [공통 로그인/회원가입 플로우 정책] (SNS 연동)</p>
                <p className="text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                  ※ 이 플로우는 마이페이지뿐 아니라, <strong>게시글 작성·댓글</strong> 등 다른 영역에서 뜨는{' '}
                  <strong>로그인 유도</strong>에도 동일하게 적용되는 <strong>전역(Global)</strong> 정책입니다.
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    <strong>[Step 1] 플랫폼 인증:</strong> 카카오/네이버 버튼 탭 시 해당 플랫폼{' '}
                    <strong>인증 화면</strong>으로 이동해 <strong>정보 제공 동의</strong>를 받습니다.
                  </li>
                  <li>
                    <strong>[Step 2] AIGA 약관 동의 (최초 가입 시):</strong>
                    <ul className="mt-1.5 list-[circle] pl-5 space-y-1 text-gray-700">
                      <li>
                        필수(서비스 이용, 위치기반, 개인정보 등) 및 선택(마케팅 수신) 약관을 노출합니다.
                      </li>
                      <li>
                        <strong>필수 항목을 모두 체크</strong>한 경우에만 <strong>[가입하기]</strong> 버튼을 활성화합니다.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>[Step 3] 가입·로그인 완료:</strong>
                    <ul className="mt-1.5 list-[circle] pl-5 space-y-1 text-gray-700">
                      <li>
                        가입 완료 화면에 <strong>「ㅇㅇㅇ님, 회원가입이 완료되었습니다.」</strong> 형태의 문구를 노출합니다
                        (닉네임·표기는 서비스 정책에 따름).
                      </li>
                      <li>
                        완료 화면에서 <strong>[AIGA와 대화하기]</strong>를 탭하면 <strong>메인 홈(챗봇)</strong>으로 이동하고,
                        <strong> 로그인 상태(세션)</strong>를 유지합니다.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-black text-gray-900 mb-1 pb-2 border-b border-gray-100">✅ 로그인 후 화면</h2>

            <div id="mypage-tag-m01" className="scroll-mt-32">
              <h3 className="text-sm font-bold text-blue-900 mb-2 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
                  title="데모 화면과 동일 번호"
                >
                  M01
                </span>
                1) 프로필 요약
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5">
                <li>왼쪽: 원형 프로필 영역(그라데이션 배경 + 사람 아이콘).</li>
                <li>로그인 계정 라벨 아래 <strong>이메일</strong>을 표시합니다. (데모에서는 샘플 주소)</li>
                <li>오른쪽: <strong>로그아웃</strong> 아이콘 — 누르면 한 번 확인한 뒤 비로그인 상태로 돌아갑니다.</li>
              </ul>

              {/* [로그아웃 팝업 정책] — 실제 화면 구현·로그아웃 처리는 이 문서 범위 밖 */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                <h4 className="text-xs font-bold text-blue-800 tracking-wide bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">[로그아웃 팝업 정책]</h4>
                <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
                  <p>
                    <strong>노출 조건:</strong> 마이페이지에서 <strong>로그아웃</strong> 버튼(아이콘)을 탭했을 때
                    노출합니다.
                  </p>
                  <p>
                    <strong>UI 형태:</strong> 화면 배경을 어둡게 하는 <strong>딤(Dim)</strong> 처리 후, 화면{' '}
                    <strong>중앙</strong>에 <strong>확인용 팝업 창</strong>을 띄웁니다.
                  </p>
                  <p className="font-semibold text-gray-800 pt-1">텍스트 내용</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>「로그아웃 하시겠습니까?」</li>
                    <li>「로그아웃 후 메인 화면으로 이동합니다.」</li>
                  </ul>
                  <p className="font-semibold text-gray-800 pt-1">버튼 및 동작</p>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>
                      <strong>[취소]:</strong> 팝업을 닫고 <strong>현재 마이페이지</strong> 화면을 유지합니다.
                    </li>
                    <li>
                      <strong>[확인]:</strong> 로그아웃(세션 종료·비로그인 상태 전환)을 처리한 뒤,{' '}
                      <strong>메인(홈) 화면</strong>으로 이동합니다.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="mypage-tag-m02" className="scroll-mt-32">
              <h3 className="text-sm font-bold text-blue-900 mb-2 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
                  title="데모 화면과 동일 번호"
                >
                  M02
                </span>
                2) 닉네임
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5">
                <li>필수 입력 필드로, 표시 이름에 쓰입니다.</li>
                <li>가입 시 시스템이 부여한 기본 닉네임이 초기값으로 들어갑니다.</li>
                <li>
                  빈 값일 때는 플레이스홀더 <strong>「새 닉네임을 입력하세요」</strong>를 보여 줍니다. (건강·생활과 어울리는
                  다정한 표현을 권장한다는 안내는 선택 사항으로 복지·커뮤니티 톤에 맞게 쓸 수 있습니다.)
                </li>
                <li>
                  입력란 아래에는 <strong className="text-gray-800">작은 글씨</strong>로 유효성 안내를 두어 본문과 위계를
                  나눕니다: <strong>최소 2자, 최대 10자</strong>, 허용 문자는 <strong>한글·영문·숫자·밑줄(_)</strong>만.
                </li>
                <li>
                  <strong>저장하기</strong> 버튼은 위 규칙을 만족하고, 마지막으로 <strong>성공 저장된 닉네임과 달라졌을
                  때만</strong> 활성화됩니다. 탭하면 서버에 중복 여부를 요청합니다.
                </li>
                <li>
                  <strong>중복 닉네임:</strong> 토스트로 <strong>「이미 사용 중인 닉네임 입니다」</strong>를 약 3초간 표시합니다.
                  입력값은 그대로 두고, 사용자가 내용을 바꾸기 전까지 저장 버튼은 다시 비활성에 가깝게 둡니다.
                </li>
                <li>
                  <strong>저장 성공:</strong> 토스트로 <strong>「닉네임이 변경되었습니다」</strong>를 약 3초간 표시합니다.
                  이후 앱 내 닉네임이 쓰이는 영역은 서버 응답 기준으로 일괄 반영됩니다.
                </li>
              </ul>
            </div>

            <section className="rounded-lg border border-red-200 bg-red-50/80 p-4 scroll-mt-32">
              <h3 className="text-sm font-bold text-red-900 mb-2">중요 노티스 — SNS 로그인·계정 통합</h3>
              <ul className="space-y-2 text-sm text-red-950/90 leading-relaxed list-disc pl-5">
                <li>
                  카카오·네이버 등으로 각각 가입한 사용자가 <strong>동일 이메일(또는 동일하게 식별되는 ID)</strong>를 쓰는
                  경우가 있을 수 있습니다.
                </li>
                <li>
                  서비스는 이를 <strong>통합 관리</strong>해야 합니다: 각 플랫폼이 발급하는 고유 <strong>uID</strong>를 함께
                  저장하고, <strong>현재 어떤 채널로 로그인했는지</strong>를 판별해 한 계정으로 묶어 세션·권한·표시 정보를
                  맞춥니다.
                </li>
                <li>
                  구현 세부(매칭 키, 충돌·탈퇴 처리)는 백엔드 정책에 따르며, 클라이언트는 연동 스펙에 맞는 식별자 전달만
                  담당합니다. (코드베이스에는 <code className="text-xs bg-white/60 px-1 rounded">snsAccountMerge</code>{' '}
                  스텁·주석으로 확장 지점을 두었습니다.)
                </li>
              </ul>
            </section>

            <div id="mypage-tag-m03" className="scroll-mt-32">
              <h3 className="text-sm font-bold text-blue-900 mb-2 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
                  title="데모 화면과 동일 번호"
                >
                  M03
                </span>
                3) 내 활동
              </h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                섹션 제목 아래 <strong>흰 카드</strong> 안에 네 가지 탭을 두고, 탭마다 목록이 바뀝니다. 목록 영역은{' '}
                <strong>높이를 일정하게 두고 안에서만 스크롤</strong>되어, 위·아래 다른 블록과 레이아웃이 흔들리지 않습니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5 mb-4">
                <li>
                  탭 이름과 함께 <strong>각각의 개수</strong>를 괄호에 표시합니다: 게시글 · 댓글 · 후기 · 저장.
                </li>
                <li>선택된 탭은 파란색 글씨와 아래 강조선으로 구분합니다.</li>
                <li>
                  <strong>저장</strong> 탭은 사용자가 명의 찾기 등에서 <strong>즐겨찾기한 의료진</strong> 목록입니다. (이전 명칭: 저장한 의료진)
                </li>
                <li>
                  <strong>게시글·댓글·후기·저장</strong> 네 탭의 목록은 모두 <strong>최신순(내림차순)</strong>으로 정렬합니다. 가장 최근에 활동한 항목이 맨 위에 옵니다.
                </li>
              </ul>

              <h4 className="text-xs font-bold text-gray-700 mb-2">게시글</h4>
              <ul className="space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5 mb-4">
                <li>
                  <strong>정렬:</strong> 작성·수정 시각 기준 <strong>최신순(내림차순)</strong>입니다.
                </li>
                <li>내가 쓴 글을 카드형 목록으로 보여 줍니다. 진료과 뱃지, 올린 지 얼마나 지났는지, 제목·요약 일부, 좋아요·댓글·조회 수를 한눈에 넣습니다.</li>
                <li>항목을 누르면 <strong>게시글 상세</strong>이 화면 위 레이어(모달)로 열립니다.</li>
                <li>삭제 아이콘은 목록에서 바로 삭제할 때 사용하며, 확인 후 삭제되었다는 알림이 뜹니다.</li>
                <li>운영 정책으로 숨겨진 글은 상단에 안내 배너가 붙고, 본문은 흐리게 보이며 눌러도 상세로 가지 않습니다.</li>
                <li>목록이 없을 때는 아이콘과 짧은 안내 문구로 비어 있음을 알립니다.</li>
              </ul>

              <h4 className="text-xs font-bold text-gray-700 mb-2">댓글</h4>
              <ul className="space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5 mb-4">
                <li>
                  <strong>정렬:</strong> 일반 댓글과 대댓글을 <strong>한 목록에 통합</strong>하여, 작성 시각 기준 <strong>최신순(내림차순)</strong>으로 노출합니다.
                </li>
                <li>
                  <strong>시각적 구분:</strong> 대댓글은 본문 텍스트 앞에 꺾인 화살표(<strong>↳</strong>) 아이콘을 붙여, 일반 댓글과 구분합니다.
                </li>
                <li>원글 제목 한 줄, 내가 단 댓글(또는 대댓글) 내용, 공감 수, 시간이 함께 보입니다.</li>
                <li>항목을 누르면 해당 맥락의 <strong>게시글 상세</strong>로 연결됩니다.</li>
                <li>삭제·신고 처리 표시 방식은 게시글과 같은 패턴을 따릅니다.</li>
              </ul>

              <h4 className="text-xs font-bold text-gray-700 mb-2">후기</h4>
              <ul className="space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5 mb-4">
                <li>
                  <strong>정렬:</strong> 작성 시각 기준 <strong>최신순(내림차순)</strong>입니다.
                </li>
                <li>
                  의사 프로필 화면에 있는 <strong>AIGA 리뷰 카드</strong>와 같은 시각 규칙(네 가지 별점 항목, 초록 진행 막대, 후기 본문, 하단에 의사·과·병원 한 줄)을 사용합니다.
                </li>
                <li>진료 인증이 있는 후기에는 닉네임 옆에 <strong>초록색 진료 인증</strong> 뱃지를 붙입니다.</li>
                <li>카드 전체 또는 <strong>프로필 보기</strong>를 누르면 해당 의사의 <strong>프로필 상세</strong>가 레이어로 열립니다.</li>
                <li>후기 삭제는 휴지통으로 처리하며, 확인 후 목록에서 사라지고 알림이 뜹니다.</li>
                <li>
                  후기가 없을 때는 별 아이콘과 안내 문구, <strong>명의 찾고 후기 남기기</strong> 버튼으로 명의 찾기 탭으로 유도합니다.
                </li>
              </ul>

              <h4 className="text-xs font-bold text-gray-700 mb-2">저장</h4>
              <ul className="space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5">
                <li>
                  <strong>정렬:</strong> 저장한 시각 기준 <strong>최신순(내림차순)</strong>입니다.
                </li>
                <li>저장해 둔 의료진 이름·과·병원·평점 등을 목록으로 보여 줍니다.</li>
                <li>행을 누르면 의사 <strong>프로필 상세</strong>로 연결됩니다.</li>
                <li>각 행에서 저장을 해제할 수 있습니다.</li>
                <li>목록이 없을 때는 북마크 아이콘과 안내 문구를 띄웁니다.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-blue-900 mb-2">4) 다른 화면과의 연결</h3>
              <ul className="space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5">
                <li>게시글·댓글 상세 레이어 안에서 채팅·명의 찾기로 이어지는 버튼이 있으면, 각각 채팅 화면·명의 찾기 탭으로 전환됩니다.</li>
                <li>후기·저장에서 연 의사 프로필은 동일한 상세 패턴을 사용합니다.</li>
              </ul>
            </div>

            <div id="mypage-tag-m04" className="scroll-mt-32">
              <h3 className="text-sm font-bold text-blue-900 mb-2 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
                  title="데모 화면과 동일 번호"
                >
                  M04
                </span>
                5) 고객지원 · 탈퇴
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5">
                <li>공지사항, 이용약관, 개인정보 처리방침, 의견 보내기를 한 블록에 모아, 행마다 오른쪽 화살표로 ‘다음 단계가 있다’는 느낌을 줍니다. (연결 동작은 서비스 정책에 맞게 구현)</li>
                <li id="mypage-tag-m05" className="scroll-mt-32">
                  <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-white mr-1.5 align-middle" title="데모 화면과 동일 번호">
                    M05
                  </span>
                  맨 아래 <strong>탈퇴하기</strong>는 보조적인 회색 톤의 텍스트 링크로 두어, 실수로 누르기 어렵게 하되 찾을 수는 있게 합니다. 확인 후 비로그인 상태가 됩니다.
                </li>
              </ul>

              {/* [이용약관 / 개인정보처리방침 상세페이지 정책] — 구현 스펙은 별도 화면/컴포넌트 문서에서 다룸 */}
              <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
                <h4 className="text-xs font-bold text-blue-800 tracking-wide bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                  [이용약관 / 개인정보처리방침 상세페이지 정책]
                </h4>
                <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <p className="font-semibold text-gray-800">1. 화면 이동 동작</p>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>
                      <strong>고객지원</strong> 메뉴에서 각 항목(이용약관, 개인정보처리방침 등)을 탭하면 해당{' '}
                      <strong>상세 페이지</strong>로 이동합니다.
                    </li>
                    <li>
                      기존 상세 페이지 UI 뼈대(<strong>App Bar</strong>, <strong>뒤로 가기</strong> 등)를 동일하게 사용합니다.
                    </li>
                  </ul>
                  <p className="font-semibold text-gray-800 pt-1">2. 내용 영역(Terms Content) 렌더링 세부 규칙</p>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>
                      <strong>구조 및 강조:</strong> 제목·소제목을 활용하고, 폰트 크기나 스타일을 달리해 구조적으로 보여 줍니다.
                    </li>
                    <li>
                      <strong>핵심 내용 강조:</strong> 서비스 이용 규칙, 개인정보 수집 항목, 이용 기간 등 사용자가 꼭 이해해야 할 문장은{' '}
                      <strong>굵게</strong> 하거나 색상을 달리해 시각적으로 구분합니다.
                    </li>
                    <li>
                      <strong>줄바꿈 및 스크롤:</strong> 본문은 화면 너비에 맞게 자연스럽게 줄 바꿈되며, 세로 스크롤로 전체를 읽을 수 있게 합니다.
                    </li>
                    <li>
                      <strong>링크 처리:</strong> 관련 웹사이트 링크는 탭 시 이동 가능하도록 색·밑줄 등으로 일반 본문과 구별합니다.
                    </li>
                    <li>
                      <strong>표(Table) 스크롤:</strong> 표 가로 폭이 기기보다 크면{' '}
                      <strong>표 영역에만 가로 스크롤</strong>을 두어, 전체 화면 레이아웃이 깨지지 않도록 합니다.
                    </li>
                  </ul>
                </div>
              </div>

              {/* [공지사항 목록 페이지 정책] — 실제 화면·라우팅·스크롤 구현은 이 문서 범위 밖 */}
              <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
                <h4 className="text-xs font-bold text-blue-800 tracking-wide bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">[공지사항 목록 페이지 정책]</h4>
                <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <p className="font-semibold text-gray-800">1. App Bar (상단 바)</p>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>
                      <strong>뒤로 가기 버튼:</strong> 탭 시 이전 화면으로 돌아갑니다.
                    </li>
                    <li>
                      <strong>타이틀:</strong> 상단에 <strong>「공지사항」</strong> 문구를 노출합니다.
                    </li>
                  </ul>
                  <p className="font-semibold text-gray-800 pt-1">2. 공지사항 목록 영역</p>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>
                      <strong>Empty State:</strong> 등록된 공지가 없을 때는{' '}
                      <strong>「등록된 공지사항이 없습니다.」</strong> 안내를 보여 줍니다.
                    </li>
                    <li>
                      <strong>목록 정렬 및 로드:</strong> 최신 공지가 맨 위에 오도록{' '}
                      <strong>내림차순(최신 우선)</strong>으로 정렬합니다. 데이터가 많아지면{' '}
                      <strong>무한 스크롤(Infinite Scroll)</strong> 방식으로 이어서 불러오는 동작을 전제로 합니다.
                    </li>
                    <li>
                      <strong>공지 아이템(제목 / 게시일):</strong> 제목이 길 경우{' '}
                      <strong>최대 줄 수를 제한</strong>하고, 넘치는 부분은 <strong>말줄임표(…)</strong>로 처리합니다 (
                      <strong>Text Truncation</strong>).
                    </li>
                    <li>
                      개별 항목(제목·게시일이 보이는 행)을 탭하면 해당 공지의{' '}
                      <strong>상세 내용 화면</strong>으로 이동합니다.
                    </li>
                  </ul>
                </div>
              </div>

              {/* [회원탈퇴 페이지 및 알림 팝업 정책] — 체크박스/버튼/모달 구현 코드는 이 문서 범위 밖 */}
              <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
                <h4 className="text-xs font-bold text-blue-800 tracking-wide bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                  [회원탈퇴 페이지 및 알림 팝업 정책]
                </h4>
                <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <p className="font-semibold text-gray-800">1. 진입 및 상단 바 (App Bar)</p>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>
                      마이페이지 하단 <strong>탈퇴하기</strong> 텍스트 링크를 탭하면 <strong>회원탈퇴</strong> 화면으로
                      진입합니다.
                    </li>
                    <li>
                      <strong>뒤로 가기:</strong> 이전 화면으로 돌아갑니다.
                    </li>
                    <li>
                      <strong>타이틀:</strong> 상단에 <strong>「회원탈퇴」</strong>를 표시합니다.
                    </li>
                  </ul>
                  <p className="font-semibold text-gray-800 pt-1">2. 안내 사항 및 확인 (체크박스 영역)</p>
                  <p>
                    상단 안내 문구: <strong>「탈퇴 전, 다음 사항을 꼭 확인해 주세요.」</strong>
                  </p>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>
                      <strong>2-a. 콘텐츠 삭제 불가 알림 (체크 필수):</strong> 리뷰에 기여한 글·댓글 등은 탈퇴로
                      삭제되지 않음을 안내합니다. 삭제를 원하면 <strong>탈퇴 전</strong> 사용자가 직접 삭제하도록
                      안내합니다.
                    </li>
                    <li>
                      <strong>2-b. 재가입 제한 사항 알림 (체크 필수):</strong> 삭제된 정보는 복구할 수 없으며, 탈퇴
                      후 <strong>24시간 동안 재가입이 불가</strong>함을 안내합니다.
                    </li>
                  </ul>
                  <p className="font-semibold text-gray-800 pt-1">3. 하단 「탈퇴하기」 버튼 상태 (조건부 활성화)</p>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>
                      <strong>Default (비활성화):</strong> 화면 진입 직후에는 버튼을 비활성 상태로 둡니다.
                    </li>
                    <li>
                      <strong>Active (활성화):</strong> 위 <strong>2-a</strong>, <strong>2-b</strong> 확인
                      항목(체크박스)이 <strong>모두 체크</strong>된 경우에만 버튼을 활성화합니다.
                    </li>
                  </ul>
                  <p className="font-semibold text-gray-800 pt-1">4. 팝업: 탈퇴 완료 알림</p>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>
                      하단에서 활성화된 <strong>「탈퇴하기」</strong>를 눌러 탈퇴 처리가{' '}
                      <strong>성공적으로 완료</strong>되었을 때 노출하는 <strong>모달 팝업</strong>입니다.
                    </li>
                    <li>
                      본문 문구:{' '}
                      <strong>
                        「회원 탈퇴가 완료되었습니다. 24시간 이후 재가입 부탁드립니다.」
                      </strong>
                    </li>
                    <li>
                      <strong>[확인]</strong> 버튼을 탭하면 팝업이 닫히고,{' '}
                      <strong>서비스 로그인 화면(비로그인 상태)</strong>으로 이동합니다.
                    </li>
                  </ul>
                </div>
                <section className="rounded-lg border border-red-200 bg-red-50/80 p-3 mt-2">
                  <h5 className="text-xs font-bold text-red-900 mb-1.5">
                    ⚠️ 백엔드 / 정책 중요 노티스
                  </h5>
                  <p className="text-sm text-red-950/90 leading-relaxed">
                    탈퇴 처리된 계정(식별자)은 <strong>탈퇴 시점으로부터 24시간 동안 재가입을 차단</strong>해야 합니다.
                  </p>
                </section>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
