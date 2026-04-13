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
          <p className="text-blue-100 text-sm">
            구현 소스: <code className="bg-white/10 px-1 rounded">MyPage.tsx</code> · 상단 헤더 색은 서비스와 동일하게{' '}
            <code className="bg-white/10 px-1 rounded">bg-blue-600</code> (#2563EB 계열)
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3">📌 개요</h2>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li>• 상단 제목 고정: <strong>마이페이지</strong> (흰 글씨, 파란 배경 바)</li>
            <li>• <code className="bg-gray-100 px-1 rounded">useUser()</code> 기준 <strong>비회원(isGuest)</strong> / <strong>회원(isMember)</strong> 본문 분기</li>
            <li>• 하단 글로벌 내비에서 <strong>MY</strong> 탭이 이 화면에 대응</li>
            <li>• 회원 본문은 <code className="bg-gray-100 px-1 rounded">max-w-2xl</code> 가운데 정렬, 하단 탭바 여백 고려 <code className="bg-gray-100 px-1 rounded">pb-24</code></li>
          </ul>
        </section>

        {!isMember ? (
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-3">🔓 비회원 화면 정의</h2>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li>• 상단 헤더는 회원과 동일하게 <strong>마이페이지</strong> 유지</li>
              <li>• 중앙: 유저 아이콘 원 + 제목 <strong>로그인이 필요합니다</strong></li>
              <li>• 서브: <strong>나만의 건강 관리를 시작하세요!</strong></li>
              <li>• CTA: <strong>카카오톡으로 3초 만에 시작</strong> (데모에서 회원 전환), <strong>네이버로 시작하기</strong></li>
              <li>• <strong>나중에 하기</strong> → <code className="bg-gray-100 px-1 rounded">navigateToPreviousTab()</code></li>
              <li>• 닉네임·내 활동·고객지원·탈퇴 등 회원 전용 블록은 비노출</li>
            </ul>
          </section>
        ) : (
          <section className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
            <h2 className="text-lg font-bold text-gray-900">✅ 회원 화면 정의</h2>

            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">1) 상단 영역</h3>
              <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
                <li>프로필 아이콘(그라데이션 원) + 이메일 <code className="bg-gray-100 px-1 rounded text-xs">fassionmap@kakao.com</code> (샘플 고정)</li>
                <li>우측 <strong>로그아웃</strong> 아이콘 버튼 → 확인 후 게스트 전환</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">2) 닉네임 설정</h3>
              <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
                <li>라벨: 닉네임 <span className="text-red-500">(필수)</span></li>
                <li>입력: 최대 10자, 안내 문구 &quot;최소 2자, 최대 10자(한글,영문,숫자,_만 가능)&quot;</li>
                <li><strong>저장하기</strong> → 2~10자 검증, 미충족 시 alert</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">3) 내 활동</h3>
              <p className="text-sm text-gray-600 mb-2">
                섹션 제목 <strong>내 활동</strong> 아래 흰 카드(<code className="bg-gray-100 px-1 rounded text-xs">rounded-xl border</code>) 안에 탭 + 스크롤 영역.
              </p>
              <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5 mb-3">
                <li>탭 라벨·카운트: <strong>게시글 (myPosts.length)</strong> | <strong>댓글 (myComments.length)</strong> | <strong>후기 (myReviews.length)</strong> | <strong>저장 (savedDoctorsList.length)</strong></li>
                <li>저장 탭 = 기존 &quot;저장한 의료진&quot; 데이터(<code className="bg-gray-100 px-1 rounded text-xs">useSavedDoctors</code>), 라벨만 짧게 <strong>저장</strong></li>
                <li>선택 탭: 파란 글씨 + 하단 파란 인디케이터 막대</li>
                <li>탭 버튼: 좁은 폭 대비 <code className="bg-gray-100 px-1 rounded text-xs">text-[11px] sm:text-sm</code></li>
                <li>콘텐츠 스크롤 박스 높이 고정: <code className="bg-gray-100 px-1 rounded">h-[360px] overflow-y-auto</code></li>
              </ul>

              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">3-1. 게시글 탭</h4>
              <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5 mb-3">
                <li>행 구분: <code className="bg-gray-100 px-1 rounded text-xs">divide-y divide-gray-100</code></li>
                <li>행 클릭(삭제된 글 제외) → <strong>PostDetailModal</strong> 오픈, 전달 데이터는 내 글 + 닉네임 매핑(<code className="bg-gray-100 px-1 rounded text-xs">CommunityPost</code> 형태)</li>
                <li>각 행: 진료과 칩, 상대 시간, 제목·요약 2줄 클램프, 좋아요/댓글/조회 수 아이콘</li>
                <li>우측 상단 <strong>휴지통</strong>: 클릭 시 이벤트 전파 중단 → 확인 다이얼로그 → 목록 제거 + 토스트</li>
                <li><code className="bg-gray-100 px-1 rounded text-xs">localStorage</code> 신고/삭제 ID 반영 시: 상단 빨간 안내 배너 + 본문 <code className="bg-gray-100 px-1 rounded text-xs">opacity-40</code>, 클릭 비활성</li>
                <li>목록 0건: FileText 아이콘 + &quot;작성한 글이 없습니다&quot;</li>
              </ul>

              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">3-2. 댓글 탭</h4>
              <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5 mb-3">
                <li>원글 제목 한 줄, 댓글 본문, 공감 수, 상대 시간</li>
                <li>행 클릭(삭제 제외) → <strong>PostDetailModal</strong> (내 글 postId 매칭 → 커뮤니티 제목 매칭 → 없으면 합성 원글)</li>
                <li>휴지통 → 확인 + 토스트 + 목록 제거</li>
                <li>신고 삭제 처리 UI는 게시글과 동일 패턴</li>
              </ul>

              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">3-3. 후기 탭</h4>
              <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5 mb-3">
                <li>카드 스타일: 의사 프로필 모달 내 <strong>AIGA 리뷰 개별 카드</strong>와 동일 — <code className="bg-gray-100 px-1 rounded text-xs">bg-white border border-gray-200 rounded-lg p-4</code>, 카드 간 <code className="bg-gray-100 px-1 rounded text-xs">space-y-3 p-2</code></li>
                <li>상단: 닉네임(굵게) — 화면에는 현재 닉네임 입력값과 동기 · 방문 인증 시 초록 배지(체크 아이콘 + &quot;방문인증&quot;)</li>
                <li>우측 상단 <strong>휴지통</strong> → 확인(&quot;후기를 삭제하시겠습니까?&quot;) → 토스트 &quot;후기가 삭제되었습니다.&quot; → 제거</li>
                <li>날짜 줄: <code className="bg-gray-100 px-1 rounded text-xs">text-xs text-gray-500</code> (예: 수정됨 문구 포함 가능)</li>
                <li>별점 2×2 그리드: 친절·배려 / 치료 만족 / 쉬운 설명 / 추천 의향 — 노란 별 + 점수, 막대는 <code className="bg-gray-100 px-1 rounded text-xs">#22C55E</code></li>
                <li>본문: 후기 텍스트, <code className="bg-gray-100 px-1 rounded text-xs">line-clamp-3</code></li>
                <li>하단: 좌측 의사·진료과·병원 한 줄(회색 작은 글씨), 우측 <strong className="text-blue-600">프로필 보기 &gt;</strong></li>
                <li>카드 전체 또는 &quot;프로필 보기&quot; 클릭 → <strong>DoctorProfileModal</strong> (후기에 묶인 <code className="bg-gray-100 px-1 rounded text-xs">doctorPayload</code>로 구성)</li>
                <li>후기 0건: 회색 Star, &quot;아직 작성한 후기가 없어요&quot;, 보조 문구, 파란 버튼 <strong>명의 찾고 후기 남기기</strong> → <code className="bg-gray-100 px-1 rounded text-xs">navigateToDoctorSearch()</code></li>
              </ul>

              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">3-4. 저장 탭</h4>
              <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
                <li>저장한 의료진 목록(이름·과·병원·전문·평점, 저장 해제 버튼)</li>
                <li>행 클릭 → <strong>DoctorProfileModal</strong></li>
                <li>0건: 북마크 아이콘 + &quot;저장한 의료진이 없습니다&quot;</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">4) 모달·외부 연동</h3>
              <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
                <li><strong>PostDetailModal</strong>: 게시글/댓글에서 진입 시. 좋아요/댓글 수는 내 게시글 ID에 한해 <code className="bg-gray-100 px-1 rounded text-xs">myPosts</code> state 동기화</li>
                <li><strong>DoctorProfileModal</strong>: 후기·저장 탭. <code className="bg-gray-100 px-1 rounded text-xs">getDoctorById</code>로 검증 배지 등 보조</li>
                <li>채팅/명의 찾기 이동은 상세 모달 내 버튼에서 <code className="bg-gray-100 px-1 rounded text-xs">navigateToChat</code> / <code className="bg-gray-100 px-1 rounded text-xs">navigateToDoctorSearch</code></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">5) 고객지원 · 하단</h3>
              <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
                <li>공지사항 / 이용약관 / 개인정보 처리방침 / 의견 보내기 — 행 단위 버튼 + 우측 Chevron (현재 alert 플레이스홀더)</li>
                <li><strong>탈퇴하기</strong> 텍스트 링크 → 확인 후 게스트 전환</li>
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
