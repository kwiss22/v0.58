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
          <p className="text-blue-100 text-sm">현재 구현된 MyPage.tsx 기준으로 회원/비회원 화면을 정의</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3">📌 개요</h2>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li>• 상단 제목은 고정: <strong>마이페이지</strong></li>
            <li>• 본문은 role에 따라 비회원 화면 또는 회원 화면으로 분기</li>
            <li>• 하단 탭 기준 서비스 탭은 <strong>MY</strong>에 해당</li>
          </ul>
        </section>

        {!isMember ? (
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-3">🔓 비회원 화면 정의</h2>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li>• 중앙 아이콘 + 제목: <strong>로그인이 필요합니다</strong></li>
              <li>• 서브 문구: <strong>나만의 건강 관리를 시작하세요!</strong></li>
              <li>• 로그인 CTA 2개: 카카오/네이버 버튼 노출</li>
              <li>• <strong>나중에 하기</strong> 버튼으로 이전 탭 복귀</li>
              <li>• 내 활동/고객지원/탈퇴 등 회원 전용 영역은 미노출</li>
            </ul>
          </section>
        ) : (
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-3">✅ 회원 화면 정의</h2>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li>• 상단 프로필 행: 이메일 표시 + 로그아웃 아이콘 버튼</li>
              <li>• 닉네임 설정: 2~10자 안내 + 저장 버튼</li>
              <li>• 내 활동 탭 3종: 게시글 / 댓글 / 저장한 의료진</li>
              <li>• 탭 콘텐츠 영역: 고정 높이 스크롤 영역(<code className="bg-gray-100 px-1 rounded">h-[360px]</code>)</li>
              <li>• 신고로 삭제된 항목은 빨간 안내 배너 + 본문 반투명 처리</li>
              <li>• 고객지원: 공지사항/이용약관/개인정보 처리방침/의견 보내기</li>
              <li>• 하단 액션: 탈퇴하기</li>
            </ul>
          </section>
        )}

      </div>
    </div>
  );
}

