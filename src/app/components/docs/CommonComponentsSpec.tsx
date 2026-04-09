// 공통 컴포넌트 정의서 — 기획·디자인 논의용
import { Pencil, Trash2, Flag } from 'lucide-react';

export function CommonComponentsSpec({ onTestSearch }: { onTestSearch?: (keyword: string) => void }) {
  return (
    <div className="bg-gray-50 font-sans">
      {/* 문서 헤더 */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">공통 컴포넌트 정의서 v0.6</span>
            <span className="bg-white/10 text-emerald-100 text-xs px-3 py-1 rounded-full">2026.03.27</span>
            <span className="bg-yellow-400/90 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">🎨 UI/UX</span>
          </div>
          <h1 className="text-3xl font-black mb-2">🔗 Aiga — 공통 UI 컴포넌트</h1>
          <p className="text-emerald-200 text-sm">여러 화면에서 공통으로 사용되는 팝업, 알림, 레이아웃 UI 정의</p>
          <div className="mt-4 bg-white/10 rounded-xl px-4 py-3 text-sm text-emerald-100 space-y-1">
            <p className="font-bold text-white">📋 이 문서의 목적</p>
            <p>• 홈, 명의찾기, 커뮤니티 등 여러 화면에서 공통으로 사용되는 UI 요소들을 정의합니다</p>
            <p>• 각 UI 요소가 어떤 상황에서 나타나고, 사용자에게 어떤 기능을 제공하는지 설명합니다</p>
            <p>• 회원과 비회원의 경험 차이, 특수 상황 처리 방식을 명확히 합니다</p>
            <p className="text-emerald-50/95 pt-1 border-t border-white/10 mt-2">• <strong className="text-white">데모 화면</strong>은 패턴 확인용입니다. 목록·숫자·이름 등은 더미일 수 있으며 실제 서비스 데이터와 같지 않습니다.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">

        {/* ───── 1. 팝업 UI ───── */}
        <Section id="modals" title="1. 팝업 UI (모달)" color="emerald">

          <SubSection label="1" title="의사 프로필 상세 팝업">
            <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-sm font-bold text-emerald-800 mb-1">🔗 재사용 팝업</p>
              <p className="text-sm text-emerald-900">홈, 명의찾기, 커뮤니티 화면에서 의사 카드를 터치하면 표시</p>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">📍 어디서 볼 수 있나요?</h4>
            <div className="space-y-2">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-bold text-gray-900">홈 화면</p>
                <p className="text-xs text-gray-600">\"주요 질환 인기 명의\" 섹션에서 의사 카드 터치 시</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-bold text-gray-900">명의찾기 화면</p>
                <p className="text-xs text-gray-600">검색 결과 목록에서 의사 카드 터치 시</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-bold text-gray-900">커뮤니티 화면</p>
                <p className="text-xs text-gray-600">게시글에 태그된 의사 이름 터치 시</p>
              </div>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">✨ 제공하는 정보</h4>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 space-y-3">
              <div>
                <p className="font-bold text-blue-900 text-sm mb-1">프로필 영역</p>
                <p className="text-xs text-blue-800">의사 이름, 소속 병원, 진료과, 전문분야</p>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm mb-1">경력 섹션 (항상 표시)</p>
                <p className="text-xs text-blue-800">총 경력 연수, 주요 경력 사항</p>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm mb-1">학력 섹션 (항상 표시)</p>
                <p className="text-xs text-blue-800">학위, 졸업 학교</p>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm mb-1">논문 (1~3편: 항상 표시 / 4편↑: 아코디언)</p>
                <p className="text-xs text-blue-800">발표 논문 목록 (현재는 샘플 데이터) — 4편 이상 시 건수 표시 + 접기/펼치기</p>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm mb-1">의료진 인증 · 정보 수정 요청 (논문 ↔ AI 소셜리뷰 사이)</p>
                <p className="text-xs text-blue-800">
                  가로 최대 2버튼: <strong>의료진 인증 요청</strong>(회원: 채움·짙은 배경 / 비회원: 회색·Lock·탭 시 로그인 안내), <strong>의사 정보 수정 요청</strong>(외곽선·밝은 배경·<strong>비회원·회원 항상 노출</strong>).{' '}
                  <strong>의료진 인증 요청</strong>의 운영별 노출·비활성 규칙 등은 <strong>별도 의사 인증 화면정의서</strong>에서 상세 기술합니다.{' '}
                  <strong>의료진 인증 요청</strong> 기능·연동 상세도 동일 문서에서 다룹니다(현재 데모는 토스트).{' '}
                  <strong>의사 정보 수정 요청</strong> 탭 시 <strong>의사정보 수정 요청</strong> 모달: 문의 입력(필수 최소 10자)·제출·안내, 제출 성공 시 토스트(실연동 전).{' '}
                  해당 모달 오버레이는 <strong>서비스(앱) 화면 영역</strong> 안에만 표시되어 스펙 패널을 가리지 않습니다.
                </p>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm mb-1">AI 소셜리뷰</p>
                <p className="text-xs text-blue-800">
                  틸색 섹션 제목 + 정보(ℹ️) 아이콘. <strong>4개 지표</strong>를 원형 아이콘·라벨·숫자로 표시: 친절·배려, 치료 만족, 쉬운 설명, 추천 의향(각 0~5점대 점수, 데이터는 의사·AI 요약 기반).
                </p>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm mb-1">AIGA 리뷰</p>
                <p className="text-xs text-blue-800">
                  틸색 섹션 제목. <strong>환자 작성 리뷰 목록</strong>(작성자, 별점, 4항 평점, 본문, 인증 배지, 첨부 사진 그리드 → ImageLightbox). 상단에 평균 평점·항목별 막대 요약 가능. 회원에게만 <strong>임시저장 이어쓰기</strong> 배너 조건부. 하단 고정 <strong>리뷰쓰기</strong>(비회원 Lock + LoginRequiredToast).
                </p>
              </div>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">🎯 사용자가 할 수 있는 행동</h4>
            <Table
              headers={['기능', '회원', '비회원', '설명']}
              rows={[
                ['의사 정보 보기', '✅', '✅', '모든 사용자가 의사의 상세 정보 열람 가능'],
                ['AI 소셜리뷰 보기', '✅', '✅', '4지표(친절·배려, 치료 만족, 쉬운 설명, 추천 의향) 숫자·아이콘으로 확인'],
                ['다른 환자 리뷰 읽기 (AIGA 리뷰)', '✅', '✅', '리뷰 카드 목록·첨부 이미지(ImageLightbox) 열람'],
                ['의료진 인증 요청', '✅', '✅(비활성)', '비회원·회원 모두 버튼 노출. 비회원: 잠금·회색 UI, 탭 시 로그인 안내(LoginRequiredToast). 회원: 데모 토스트. 실서비스 노출 규칙은 별도 의사 인증 화면정의서'],
                ['의사 정보 수정 요청', '✅', '✅', '비회원·회원 모두 항상 노출. 2차 모달·서비스 영역 오버레이. 제출·연동 상세는 별도 의사 인증 화면정의서 참고'],
                ['리뷰쓰기', '✅', '❌', '비회원은 버튼이 회색 비활성화 상태 (Lock 아이콘) + 클릭 시 \"로그인 필요\" 안내 표시'],
                ['즐겨찾기', '✅', '❌', '비회원은 버튼이 회색 비활성화 상태 (Lock 아이콘) + 클릭 시 \"로그인 필요\" 안내 표시'],
              ]}
            />

            {/* ── 비회원 버튼 비활성화 상태 상세 ── */}
            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">🔒 비회원 버튼 비활성화 상태 상세</h4>
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 space-y-4">
              <p className="text-xs text-red-800 font-bold">비회원이 아래 두 버튼을 클릭하면 LoginRequiredToast 모달이 표시됩니다.</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-red-200 rounded-lg p-3">
                  <p className="text-xs font-bold text-gray-900 mb-2">📝 리뷰쓰기 버튼 (비회원)</p>
                  <div className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2 mb-2.5">
                    <span className="text-gray-400 text-sm">🔒</span>
                    <span className="text-gray-400 text-xs">리뷰쓰기</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    <li>• 버튼 색상: 회색(비활성화)</li>
                    <li>• 자물쇠(Lock) 아이콘 표시</li>
                    <li>• 클릭 → LoginRequiredToast 모달</li>
                  </ul>
                </div>
                <div className="bg-white border border-red-200 rounded-lg p-3">
                  <p className="text-xs font-bold text-gray-900 mb-2">🔖 즐겨찾기 버튼 (비회원)</p>
                  <div className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2 mb-2.5">
                    <span className="text-gray-400 text-sm">🔒</span>
                    <span className="text-gray-400 text-xs">즐겨찾기</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    <li>• 버튼 색상: 회색(비활성화)</li>
                    <li>• 자물쇠(Lock) 아이콘 표시</li>
                    <li>• 클릭 → LoginRequiredToast 모달</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white border border-red-200 rounded-lg p-3">
                <p className="text-xs font-bold text-red-800 mb-2">🪟 LoginRequiredToast 모달 동작 방식</p>
                <ul className="text-xs text-red-700 space-y-1">
                  <li>• 배경 딤처리(어두운 반투명 오버레이) 적용</li>
                  <li>• 화면 <strong>중앙</strong>에 카드 형태 모달 표시</li>
                  <li>• 모달 내부: 안내 문구 + 로그인하기 버튼</li>
                  <li className="text-red-500 font-bold">⚠️ 단순 하단 토스트 알림이 아닌 중앙 카드 모달임 — 이름(LoginRequiredToast)과 실제 동작 혼동 주의</li>
                </ul>
              </div>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">⚠️ 특수 상황</h4>
            <div className="space-y-2">
              {[
                {
                  icon: '🖼️',
                  case: '의사 프로필 사진이 없는 경우',
                  action: '기본 사용자 아이콘으로 대체',
                },
                {
                  icon: '💬',
                  case: '리뷰가 하나도 없는 경우',
                  action: '\"첫 리뷰를 작성해보세요\" 안내 문구 표시',
                },
                {
                  icon: '🔒',
                  case: '비회원이 즐겨찾기 버튼 누름',
                  action: 'LoginRequiredToast 모달 표시 — 배경 딤처리 + 화면 중앙 카드',
                },
                {
                  icon: '✍️',
                  case: '비회원이 리뷰 작성 버튼 누름',
                  action: 'LoginRequiredToast 모달 표시 — 배경 딤처리 + 화면 중앙 카드',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <div className="mb-1">
                        <span className="text-sm font-bold text-gray-900">{item.case}</span>
                      </div>
                      <p className="text-xs text-gray-600">→ {item.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── AIGA 리뷰 카드 이미지 표시 정책 ── */}
            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">🖼️ AIGA 리뷰 카드 — 첨부 이미지 표시 정책</h4>
            <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-2">(추후 논의 후 적용 예정)</p>
            <div className="space-y-3">
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <p className="text-xs font-bold text-teal-800 mb-2">리뷰 카드 내 이미지 그리드 (커뮤니티 목록과 동일 정책)</p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-white border border-teal-200 rounded-lg p-2.5">
                    <p className="text-[10px] font-bold text-teal-700 mb-1">1장</p>
                    <ul className="text-[10px] text-gray-600 space-y-0.5">
                      <li>• 1열 (전체 너비)</li>
                      <li>• 높이: <code className="bg-gray-100 px-1 rounded">h-48</code></li>
                    </ul>
                  </div>
                  <div className="bg-white border border-teal-200 rounded-lg p-2.5">
                    <p className="text-[10px] font-bold text-teal-700 mb-1">2장</p>
                    <ul className="text-[10px] text-gray-600 space-y-0.5">
                      <li>• 2열 균등 분할</li>
                      <li>• 높이: <code className="bg-gray-100 px-1 rounded">h-32</code></li>
                    </ul>
                  </div>
                  <div className="bg-white border border-teal-200 rounded-lg p-2.5">
                    <p className="text-[10px] font-bold text-teal-700 mb-1">3장 이상</p>
                    <ul className="text-[10px] text-gray-600 space-y-0.5">
                      <li>• 3열 균등 분할</li>
                      <li>• 높이: <code className="bg-gray-100 px-1 rounded">h-24</code></li>
                      <li>• 3번째 슬롯에 <strong>+N 오버레이</strong></li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white border border-teal-100 rounded-lg p-3 mb-2">
                  <p className="text-[10px] font-bold text-gray-700 mb-1">+N 오버레이 상세 규칙</p>
                  <ul className="text-[10px] text-gray-600 space-y-0.5">
                    <li>• 노출 조건: 전체 이미지 수 &gt; 3장일 때만 3번째 슬롯에 표시</li>
                    <li>• 오버레이 텍스트: <code className="bg-gray-100 px-1 rounded">+{'{'}총장수 - 3{'}'}</code> (예: 5장이면 <code className="bg-gray-100 px-1 rounded">+2</code>)</li>
                    <li>• 스타일: 검정 반투명 배경(<code className="bg-gray-100 px-1 rounded">bg-black/50</code>) + 흰 텍스트</li>
                    <li>• 클릭 시 ImageLightbox가 3번째 이미지부터 열림</li>
                  </ul>
                </div>
                <div className="bg-white border border-teal-100 rounded-lg p-3">
                  <p className="text-[10px] font-bold text-gray-700 mb-1">이미지 탭(클릭) 동작</p>
                  <ul className="text-[10px] text-gray-600 space-y-0.5">
                    <li>• 어느 슬롯을 탭해도 <strong>ImageLightbox</strong> 뷰어 열림</li>
                    <li>• 탭한 이미지의 인덱스부터 시작 (1번 탭 → 1번째, 2번 탭 → 2번째 …)</li>
                    <li>• Lightbox에서는 <strong>첨부된 전체 이미지</strong>를 탐색 가능</li>
                    <li>• Lightbox는 의사 프로필 팝업 내부에 마운트 (최상위 z-index)</li>
                  </ul>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-bold text-blue-800 mb-1.5">ImageLightbox 뷰어 동작 (리뷰 카드 공통)</p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• 이전 / 다음 화살표 버튼으로 이미지 간 이동</li>
                  <li>• 상단 카운터: <code className="bg-blue-100 px-1 rounded">N / 전체장수</code></li>
                  <li>• 하단 썸네일 스트립 (2장 이상일 때만 표시)</li>
                  <li>• 배경 딤(어두운 오버레이) + X 버튼 또는 배경 클릭으로 닫기</li>
                  <li>• 키보드 방향키(←/→) 및 ESC 키 지원</li>
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-[10px] font-bold text-amber-800 mb-1.5">⚠️ 리뷰 카드(목록) vs ImageLightbox(상세) 역할 구분</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border border-amber-100 rounded p-2">
                    <p className="text-[10px] font-bold text-gray-700 mb-1">리뷰 카드 (목록 역할)</p>
                    <ul className="text-[10px] text-gray-600 space-y-0.5">
                      <li>• 최대 3슬롯만 노출</li>
                      <li>• 초과분은 +N 오버레이로 압축</li>
                      <li>• 반응형 그리드로 레이아웃</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-amber-100 rounded p-2">
                    <p className="text-[10px] font-bold text-gray-700 mb-1">ImageLightbox (상세 역할)</p>
                    <ul className="text-[10px] text-gray-600 space-y-0.5">
                      <li>• 전체 이미지 개수 제한 없음</li>
                      <li>• 한 장씩 전체화면 표시</li>
                      <li>• 하단 썸네일로 빠른 이동</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </SubSection>

          <SubSection label="2" title="커뮤니티 게시글 상세 팝업">
            <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-sm font-bold text-emerald-800 mb-1">진입 경로별 모듈 (프로토타입 — 개발 참고)</p>
              <ul className="text-sm text-emerald-900 space-y-1 list-disc list-inside">
                <li><strong>CommunityPostModal</strong> — 홈 추천글, 통합 검색의 커뮤니티 결과 등</li>
                <li><strong>PostDetailModal</strong> — 커뮤니티 탭 피드</li>
              </ul>
              <p className="text-xs text-emerald-800 mt-2"><strong>기획·UX 기준</strong>은 두 경로 모두 같은 게시글 상세 패턴(본문·공감·댓글·더보기)을 목표로 합니다.</p>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">📍 어디서 볼 수 있나요?</h4>
            <div className="space-y-2">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-bold text-gray-900">홈 화면</p>
                <p className="text-xs text-gray-600">«커뮤니티 추천글» 카드 터치 → CommunityPostModal</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-bold text-gray-900">통합 검색</p>
                <p className="text-xs text-gray-600">커뮤니티 결과 카드 터치 → CommunityPostModal (검색어 변경 시 세션 내 공감 오버라이드 초기화)</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-bold text-gray-900">커뮤니티 탭</p>
                <p className="text-xs text-gray-600">피드 카드 터치 → PostDetailModal</p>
              </div>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">✨ 제공하는 정보</h4>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 space-y-2 text-sm">
              <p>• 게시글 제목과 전체 본문 내용</p>
              <p>• 작성자 정보 (닉네임, 프로필 사진)</p>
              <p>• 태그 (예: #무릎통증, #강남병원)</p>
              <p>• 작성일시, 좋아요 수, 댓글 수</p>
              <p>• 댓글 및 대댓글 목록 (0건이면 안내: 첫 댓글을 작성해보세요)</p>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">🎯 사용자가 할 수 있는 행동</h4>
            <Table
              headers={['기능', '회원', '비회원', '설명']}
              rows={[
                ['게시글 읽기', '✅', '✅', '모든 사용자가 전체 내용 열람 가능'],
                ['게시글 공감(좋아요)', '✅ 토글·재탭 취소', '❌ LoginRequiredToast', 'CommunityPostModal·PostDetailModal 공통 패턴. 화면별 state라 탭 간 자동 동기는 없음'],
                ['댓글 읽기', '✅', '✅', '다른 사용자들의 댓글 확인 가능'],
                ['댓글 작성', '✅', '❌', '비회원은 입력창이 비활성화되며 \"로그인 필요\" 안내'],
                ['커뮤니티 탭 이동', '✅', '✅', '\"커뮤니티에서 더 보기\" 등으로 커뮤니티 탭 전환'],
              ]}
            />

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">⚠️ 특수 상황</h4>
            <div className="space-y-2">
              {[
                {
                  icon: '💬',
                  case: '댓글이 하나도 없는 경우',
                  action: '\"첫 댓글을 작성해보세요\" 안내 문구 (PostDetailModal·CommunityPostModal)',
                },
                {
                  icon: '🔒',
                  case: '비회원이 댓글 입력창 터치',
                  action: '입력창 비활성화 + \"로그인이 필요합니다\" 안내 + 로그인 버튼',
                },
                {
                  icon: '📜',
                  case: '게시글 내용이 매우 긴 경우',
                  action: '스크롤로 전체 내용 확인 가능',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <div className="mb-1">
                        <span className="text-sm font-bold text-gray-900">{item.case}</span>
                      </div>
                      <p className="text-xs text-gray-600">→ {item.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── 상세 UI 명세 (CommunityTabSpec 2.7에서 이관) ── */}
            <div className="mt-5 border-t border-gray-100 pt-5 space-y-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">상세 UI 명세 (PostDetailModal)</p>

              {/* 화면 구성 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-3 text-sm">화면 구성</div>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li>• <strong>헤더</strong>: <span className="text-red-600 font-bold">"게시글" 텍스트(좌)</span> + ⋮ 더보기 메뉴 + <span className="text-red-600 font-bold">X 닫기 버튼(우)</span> — ← 뒤로가기 버튼 없음</li>
                  <li>• <strong>작성자 정보</strong>: 프로필 아이콘 + "익명XX" + 작성일 + (수정됨)</li>
                  <li>• <strong>본문</strong>: 제목 + 전체 내용 + 질환 태그 + 첨부 이미지 (탭 → ImageLightbox 확대 뷰어)</li>
                  <li>• <strong>액션 바</strong>: <span className="text-red-600 font-bold">공감해요 버튼 + 댓글 수 — 2가지만 존재 (AI상담하기·명의찾기 버튼 없음)</span></li>
                  <li>• <strong>병원 미니카드</strong> (조건부): post.hospital 데이터가 있을 때 액션 바 아래 표시. 병원명·별점·거리·진료과 + "병원 정보" 버튼 (onHospitalClick). 배경: blue-50 → indigo-50 그라데이션</li>
                  <li>• <strong>의사 미니카드</strong> (조건부): post.doctor도 있을 때 병원 미니카드 내부에 중첩. "AI 맞춤 의사 추천" 배지(teal) + 의사 프로필 이미지 + 이름 + 전문과목 + "상세보기" 버튼 (onDoctorClick → DoctorProfileModal)</li>
                  <li>• <strong>댓글 영역</strong>: 댓글 목록 + 답글(대댓글) 지원 + 입력창. 댓글 0건 시 중앙 안내 <strong>첫 댓글을 작성해보세요</strong></li>
                </ul>
              </div>

              {/* 더보기 메뉴 권한 분리 */}
              <div>
                <div className="font-medium text-gray-900 text-sm mb-2">⋮ 더보기 메뉴 — 권한에 따라 노출 항목이 다름</div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg mb-3">
                  <p className="text-xs font-bold text-yellow-800 mb-1">⚠️ 공유하기는 모든 사용자에게 항상 최상단 노출</p>
                  <p className="text-xs text-yellow-700">더보기 드롭다운 최상단에 <strong>공유하기</strong>가 항상 표시됩니다 (비회원 포함). 구분선 아래에 사용자 역할별 항목이 추가됩니다.</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-xs font-bold text-blue-800 mb-2">작성자 본인 (회원)</div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-white rounded px-2 py-1.5">
                        <span className="text-gray-400 text-base leading-none">↗</span>
                        <span>공유하기</span>
                      </div>
                      <div className="border-t border-gray-100" />
                      <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-white rounded px-2 py-1.5">
                        <Pencil className="w-3.5 h-3.5 text-gray-500" />
                        <span>수정하기</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-white rounded px-2 py-1.5">
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        <span>삭제하기</span>
                      </div>
                    </div>
                    <p className="text-xs text-blue-700 mt-2">신고 항목 없음 (본인 글 신고 불가)</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="text-xs font-bold text-gray-700 mb-2">타인 (회원)</div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-white rounded px-2 py-1.5">
                        <span className="text-gray-400 text-base leading-none">↗</span>
                        <span>공유하기</span>
                      </div>
                      <div className="border-t border-gray-100" />
                      <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-white rounded px-2 py-1.5">
                        <Flag className="w-3.5 h-3.5 text-red-500" />
                        <span>신고하기</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">수정/삭제 항목 없음</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="text-xs font-bold text-red-700 mb-2">비회원 (게스트)</div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-white rounded px-2 py-1.5">
                        <span className="text-gray-400 text-base leading-none">↗</span>
                        <span>공유하기</span>
                      </div>
                    </div>
                    <p className="text-xs text-red-700 mt-2">⋮ 메뉴 자체는 노출됨. 공유하기만 표시, 신고하기는 <code className="bg-red-100 px-1 rounded text-red-700">!isGuest</code> 조건으로 숨겨짐</p>
                    <p className="text-xs text-red-600 mt-1">수정/삭제/신고 모두 불가</p>
                  </div>
                </div>
              </div>

              {/* 댓글 더보기 메뉴 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="text-xs font-bold text-gray-700 mb-1">댓글 더보기 메뉴도 동일 패턴 적용</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 댓글 작성자 본인: 수정 / 삭제</li>
                  <li>• 타인 (회원): 신고</li>
                  <li>• 비회원: 접근 불가</li>
                </ul>
              </div>

              {/* 첨부 이미지 처리 방식 */}
              <div>
                <div className="font-medium text-gray-900 text-sm mb-2">🖼️ 첨부 이미지 처리 방식</div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="text-xs font-bold text-gray-700 mb-2">업로드 제한 (작성 시)</div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• <strong>최대 장수</strong>: 10장</li>
                      <li>• <strong>허용 형식</strong>: JPG · PNG · WEBP</li>
                      <li>• <strong>장당 용량</strong>: 5MB 이하</li>
                      <li>• 10장 도달 시 업로드 버튼 비활성화</li>
                      <li>• 카운터 표시: <code className="bg-gray-100 px-1 rounded">N/10</code></li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="text-xs font-bold text-gray-700 mb-2">상세 모달 본문 이미지 표시 방식</div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• <code className="bg-gray-100 px-1 rounded">flex-wrap gap-2</code> 로 전체 이미지 나열</li>
                      <li>• <strong>개수 제한 없음</strong> — 첨부된 이미지 전부 표시 (+N 오버레이 없음)</li>
                      <li>• 목록 카드(커뮤니티·리뷰)와 달리 상세 모달에서는 모두 노출</li>
                      <li>• 이미지 탭 → <strong>ImageLightbox</strong> 뷰어 오버레이</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-xs font-bold text-blue-800 mb-1.5">ImageLightbox 뷰어 동작</div>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• 이전 / 다음 화살표 버튼으로 이미지 간 이동</li>
                    <li>• 상단 카운터: <code className="bg-blue-100 px-1 rounded">N / 전체장수</code></li>
                    <li>• 하단 썸네일 스트립 (2장 이상일 때만 표시)</li>
                    <li>• 배경 딤(어두운 오버레이) + X 버튼 또는 배경 클릭으로 닫기</li>
                    <li>• 키보드 방향키(←/→) 및 ESC 키 지원</li>
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                  <p className="text-[10px] font-bold text-amber-800 mb-1.5">⚠️ 목록(카드) vs 상세 모달 이미지 표시 정책 차이</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white border border-amber-100 rounded p-2">
                      <p className="text-[10px] font-bold text-gray-700 mb-1">커뮤니티 목록 카드</p>
                      <ul className="text-[10px] text-gray-600 space-y-0.5">
                        <li>• 최대 3슬롯만 노출</li>
                        <li>• 초과분: +N 오버레이</li>
                        <li>• 1/2/3열 반응형 그리드</li>
                      </ul>
                    </div>
                    <div className="bg-white border border-amber-100 rounded p-2">
                      <p className="text-[10px] font-bold text-gray-700 mb-1">게시글 상세 모달 본문</p>
                      <ul className="text-[10px] text-gray-600 space-y-0.5">
                        <li>• 전체 이미지 모두 표시</li>
                        <li>• +N 오버레이 없음</li>
                        <li>• flex-wrap 자유 배치</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </SubSection>

          <SubSection label="3" title="리뷰 작성 팝업">
            <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-sm font-bold text-emerald-800 mb-1">🔗 중첩 팝업</p>
              <p className="text-sm text-emerald-900">의사 프로필 팝업 안에서 \"리뷰 작성\" 버튼을 누르면 위에 한 번 더 표시</p>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">📍 언제 나타나나요?</h4>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4">
              <p className="text-sm font-bold text-amber-900 mb-2">진입 흐름</p>
              <div className="space-y-1 text-xs text-amber-800">
                <p>1️⃣ 의사 카드 터치 → 의사 프로필 팝업 열림</p>
                <p>2️⃣ \"리뷰 작성\" 버튼 터치 (회원만 가능)</p>
                <p>3️⃣ 리뷰 작성 팝업이 의사 프로필 팝업 위에 표시</p>
              </div>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">✨ 사용자가 입력하는 내용</h4>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <p><span className="font-bold text-red-600">• 별점 선택 (필수):</span> 1~5점 중 선택</p>
              <p><span className="font-bold text-red-600">• 리뷰 내용 (필수):</span> 최소 50자 이상 (최대 글자 수 제한 없음)</p>
              <p><span className="font-bold text-gray-600">• 사진 첨부 (선택):</span> 최대 10장, JPG·PNG·WEBP, 장당 5MB 이하</p>
              <p className="text-xs text-gray-500 mt-2">→ 별점과 리뷰 내용(50자 이상) 모두 작성해야 제출 가능. 사진은 선택사항.</p>
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <p className="text-xs font-bold text-amber-800 mb-1">📏 글자 수 정책</p>
                <ul className="text-xs text-amber-700 space-y-0.5">
                  <li>• <strong>최소 50자</strong>: "좋아요" 같은 의미 없는 한 줄 리뷰 방지, 실질적 정보 보장</li>
                  <li>• <strong>최대 제한 없음</strong>: 충분히 상세한 경험을 자유롭게 작성 가능하도록 허용</li>
                </ul>
              </div>
            </div>

            {/* ── 이미지 첨부 스펙 ── */}
            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">🖼️ 이미지 첨부 (WritePostModal과 동일 UI/UX)</h4>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-xs font-bold text-gray-700 mb-2">업로드 제한</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>최대 장수</strong>: 10장</li>
                    <li>• <strong>허용 형식</strong>: JPG · PNG · WEBP</li>
                    <li>• <strong>장당 용량</strong>: 5MB 이하</li>
                    <li>• 10장 도달 시 버튼 비활성화</li>
                    <li>• 카운터 표시: <code className="bg-gray-100 px-1 rounded">N/10</code></li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-xs font-bold text-gray-700 mb-2">썸네일 그리드</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <code className="bg-gray-100 px-1 rounded">flex-wrap</code> 96×96 타일</li>
                    <li>• 호버 시 어두운 오버레이</li>
                    <li>• 우측 상단 ✕ 버튼으로 삭제</li>
                    <li>• 마지막 타일: 점선 "+ 추가" 버튼 (10장 미만 시)</li>
                  </ul>
                </div>
              </div>
              {/* 이미지 UI 프리뷰 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <p className="text-xs font-bold text-gray-700 mb-2">UI 프리뷰</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-600 text-xs">
                    <span>🖼</span><span>사진 첨부</span>
                  </div>
                  <span className="text-xs text-gray-400">2/10 · JPG·PNG·WEBP, 장당 5MB 이하</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-blue-100 flex items-center justify-center">
                    <span className="text-xs text-blue-400">사진1</span>
                    <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-gray-900/70 rounded-full flex items-center justify-center">
                      <span className="text-white text-[8px]">✕</span>
                    </div>
                  </div>
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-green-100 flex items-center justify-center">
                    <span className="text-xs text-green-400">사진2</span>
                    <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-gray-900/70 rounded-full flex items-center justify-center">
                      <span className="text-white text-[8px]">✕</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-0.5 text-gray-400">
                    <span className="text-base">+</span>
                    <span className="text-[10px]">추가</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-bold text-blue-800 mb-1">⚠️ 이미지는 임시저장에 포함되지 않음</p>
                <p className="text-xs text-blue-700">X 버튼 닫기 시 이미지는 유지되지 않으며, 복원 다이얼로그에서 불러오기 시 텍스트·별점만 복원됩니다.</p>
              </div>
            </div>

            {/* ── 플레이스홀더 & 안내 문구 ── */}
            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">💬 플레이스홀더 & 안내 문구</h4>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
              <p className="text-xs text-blue-700 font-bold">※ 실제 서비스 화면에 표시되는 텍스트는 서비스 화면을 참고하세요.</p>

              <div className="space-y-2">
                <div className="bg-white border border-blue-100 rounded-lg p-3">
                  <p className="text-xs font-bold text-gray-800 mb-1.5">리뷰 내용 텍스트 영역</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 mb-2">
                    <p className="text-xs text-gray-400">예) 리뷰는 최소 50자 이상이어야 합니다. 욕설, 비방, 무의미한 반복작성 글은 삭제될 수 있습니다.</p>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    <li>• 플레이스홀더: 실제 서비스 화면 참고</li>
                    <li>• 글자 수 카운터: 현재 입력 글자 수만 표시 (예: <code className="bg-gray-100 px-1 rounded">23자</code>)</li>
                    <li>• 50자 미만 시 카운터가 빨간색으로 표시되며 부족한 글자 수 안내 (예: <code className="bg-gray-100 px-1 rounded">23자 (최소 50자 이상 · 27자 더 입력 필요)</code>)</li>
                    <li>• 50자 이상 달성 시 초록색으로 변경 (예: <code className="bg-gray-100 px-1 rounded">✓ 최소 글자 수 충족</code>)</li>
                  </ul>
                </div>

                <div className="bg-white border border-blue-100 rounded-lg p-3">
                  <p className="text-xs font-bold text-gray-800 mb-1.5">저장하기 버튼 활성화 조건</p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    <li>• <strong>비활성(회색)</strong>: 별점 항목 중 1개라도 미입력 또는 리뷰 50자 미만</li>
                    <li>• <strong>활성(파란색)</strong>: 별점 4개 항목 모두 입력 + 리뷰 50자 이상 달성 시 자동 전환</li>
                    <li>• 비활성 상태에서는 클릭 자체가 동작하지 않음 (경고 없음)</li>
                    <li>• 버튼 라벨: <code className="bg-gray-100 px-1 rounded">저장하기</code> (취소 버튼 없음 — X 아이콘으로 닫기)</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">🎯 사용자 행동</h4>
            <div className="space-y-2">
              {/* 버튼 시각 상태 프리뷰 */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-700 mb-3">🎨 저장하기 버튼 시각 상태</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="bg-gray-200 text-gray-400 rounded-lg py-2.5 px-4 text-sm font-semibold mb-1.5 cursor-not-allowed">
                      저장하기
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold">비활성 (회색)</p>
                    <p className="text-[10px] text-gray-400">조건 미충족 시</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-600 text-white rounded-lg py-2.5 px-4 text-sm font-semibold mb-1.5">
                      저장하기
                    </div>
                    <p className="text-[10px] text-blue-700 font-bold">활성 (파란색)</p>
                    <p className="text-[10px] text-gray-400">조건 충족 시 자동 전환</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm font-bold text-green-900">저장하기 버튼 터치 (활성 상태)</p>
                <p className="text-xs text-green-700">→ 리뷰가 저장되고 팝업이 닫힙니다</p>
              </div>
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-3">
                <p className="text-sm font-bold text-gray-500">저장하기 버튼 터치 (비활성 상태)</p>
                <p className="text-xs text-gray-400">→ 아무 동작 없음 (경고 없음, 클릭 자체가 막힘)</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-sm font-bold text-gray-900">X 버튼 또는 바깥 영역 터치</p>
                <p className="text-xs text-gray-600">→ 작성 중이던 내용은 저장되지 않고 팝업이 닫힙니다</p>
              </div>
            </div>

            {/* 확정된 정책 */}
            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">✅ 확정된 정책</h4>
            <div className="space-y-2">
              {[
                { item: '별점 미입력 또는 리뷰 50자 미만 시', decision: '저장하기 버튼 비활성화 (회색) — 경고 alert 없음, 클릭 자체 차단' },
                { item: '버튼 구성', decision: '저장하기 버튼 1개만 표시. 취소 버튼 없음 — 닫기는 우측 상단 X 아이콘 사용' },
                { item: '최대 글자 수', decision: '제한 없음 — 최소 50자 이상만 충족하면 제출 가능' },
                { item: '입력 중 닫기 시도', decision: 'X 버튼 터치 시 경고 없이 현재 입력 내용을 즉시 임시저장 후 팝업 닫힘 — 다음 진입 시 복원 다이얼로그 표시' },
              ].map((item, i) => (
                <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm font-bold text-green-900">{item.item}</p>
                  <p className="text-xs text-green-700">✓ {item.decision}</p>
                </div>
              ))}
            </div>

            {/* 임시저장 동작 정의 */}
            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">📦 임시저장 동작 정의</h4>
            <div className="space-y-3">

              {/* 저장 위치 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-800 mb-2">🗄️ 저장 위치 (localStorage)</p>
                <div className="bg-white border border-gray-200 rounded p-3 mb-2">
                  <p className="text-xs text-gray-500 mb-1">키 형식</p>
                  <code className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">{'aiga_review_draft_{doctorId}'}</code>
                  <p className="text-xs text-gray-400 mt-1.5">의사별 독립 저장 — 다른 의사 프로필을 열어도 각자의 임시저장 유지</p>
                </div>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded-r-lg">
                  <p className="text-xs font-bold text-orange-800">⚠️ 인증 파일(verificationData)은 임시저장 제외</p>
                  <p className="text-xs text-orange-700 mt-0.5">저장 항목: 리뷰 내용 · 친절 · 배려 · 치료 만족 · 쉬운 설명 · 추천 의향 점수 · 인증요청 여부(boolean) · 저장시각</p>
                </div>
              </div>

              {/* 저장 트리거 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs font-bold text-blue-900 mb-3">⚙️ 임시저장 트리거 2가지</p>
                <div className="space-y-2">
                  <div className="bg-white border border-blue-200 rounded p-3">
                    <p className="text-xs font-bold text-blue-800 mb-1.5">① 자동저장 (3초 debounce)</p>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• 별점 슬라이더 또는 리뷰 내용 변경 시 3초 뒤 자동 저장</li>
                      <li>• 헤더 우측에 <code className="bg-gray-100 px-1 rounded">HH:MM 임시저장</code> 타임스탬프 표시</li>
                      <li>• 저장 직후 2초간 <code className="bg-gray-100 px-1 rounded">저장됨 ✓</code> 표시 후 타임스탬프로 전환</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-blue-200 rounded p-3">
                    <p className="text-xs font-bold text-blue-800 mb-1.5">② X 버튼 터치 시 즉시저장</p>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• 리뷰 내용 또는 별점 중 하나라도 입력값이 있으면 즉시 localStorage 저장</li>
                      <li>• 경고 다이얼로그 없이 바로 팝업 닫힘</li>
                      <li>• 모든 값이 기본값(빈 텍스트 + 별점 0)이면 저장 안 함</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 복원 다이얼로그 */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-xs font-bold text-amber-900 mb-3">🔄 복원 다이얼로그 — 리뷰 작성 팝업 재진입 시</p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-white border border-amber-200 rounded p-3">
                    <p className="text-xs font-bold text-amber-800 mb-1.5">표시 조건</p>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• 팝업 마운트 시 localStorage 확인</li>
                      <li>• 해당 의사의 임시저장 데이터가 있을 때</li>
                      <li>• 내용 또는 별점 중 하나라도 값이 있을 때</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-amber-200 rounded p-3">
                    <p className="text-xs font-bold text-amber-800 mb-1.5">UI 형태</p>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• 팝업 위에 딤(bg-black/40) 레이어</li>
                      <li>• 흰 카드: rounded-2xl, max-w-xs, shadow-2xl</li>
                      <li>• 타이틀 <strong>"AIGA"</strong> + 메시지 + 저장시각 미리보기</li>
                    </ul>
                  </div>
                </div>
                {/* 복원 다이얼로그 프리뷰 */}
                <div className="bg-white border-2 border-amber-300 rounded-xl overflow-hidden max-w-xs mx-auto shadow-md mb-3">
                  <div className="px-5 pt-4 pb-3">
                    <p className="text-xs font-black text-gray-900 mb-1">AIGA</p>
                    <p className="text-xs text-gray-700 mb-2">기존에 작성 중인 리뷰 데이터가 있습니다.<br />불러오시겠습니까?</p>
                    <div className="bg-amber-50 border border-amber-200 rounded px-2 py-1.5 text-[10px] text-amber-800">
                      <span className="font-bold">14:32 저장</span>
                      <span className="text-amber-600 ml-1">· 진료를 받으면서 느낀 점은…</span>
                    </div>
                  </div>
                  <div className="flex border-t border-gray-100">
                    <div className="flex-1 py-2.5 text-center text-xs text-gray-500 font-medium">취소(삭제)</div>
                    <div className="flex-1 py-2.5 text-center text-xs text-blue-600 font-bold border-l border-gray-100">불러오기</div>
                  </div>
                </div>
                <ul className="space-y-1 text-xs text-amber-800">
                  <li>• <strong>취소(삭제)</strong>: localStorage 데이터 삭제 후 빈 폼으로 시작</li>
                  <li>• <strong>불러오기</strong>: 리뷰 내용 + 별점 4개 + 인증요청 여부 전체 복원 (인증 파일 제외)</li>
                </ul>
              </div>

              {/* 의사 프로필 팝업 내 이어쓰기 배너 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-800 mb-2">🏥 의사 프로필 팝업 — 이어쓰기 배너</p>
                <p className="text-xs text-gray-500 mb-2">표시 조건: 회원 로그인 + 해당 의사의 임시저장 데이터 존재</p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center justify-between mb-2">
                  <span className="text-xs text-amber-700">⏱ 작성 중인 임시저장 리뷰가 있어요</span>
                  <span className="text-xs font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">이어서 쓰기</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  <li>• AIGA 리뷰 섹션 상단에 표시</li>
                  <li>• "이어서 쓰기" 터치 → ReviewWriteModal 열림 (복원 다이얼로그 자동 표시)</li>
                  <li>• 비회원에게는 배너 미표시</li>
                </ul>
              </div>

              {/* 임시저장 삭제 시점 */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-xs font-bold text-red-800 mb-1.5">🗑️ 임시저장 자동 삭제 시점</p>
                <ul className="text-xs text-red-700 space-y-0.5">
                  <li>• 저장하기 버튼으로 리뷰 제출 성공 시</li>
                  <li>• 복원 다이얼로그에서 "취소(삭제)" 선택 시</li>
                </ul>
              </div>
            </div>
          </SubSection>

          <SubSection label="4" title="통합 검색 모달 (GlobalSearchModal)">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🔎</span>
                <p className="text-sm font-bold text-amber-900">상세 정의서 별도 탭에서 관리</p>
              </div>
              <p className="text-sm text-amber-800 mb-4">
                통합 검색 모달(GlobalSearchModal)은 내용이 많아 전용 탭으로 분리하여 관리합니다.
              </p>
              <div className="bg-white rounded-xl border border-amber-200 px-4 py-3.5 flex items-start gap-3">
                <span className="text-amber-400 mt-0.5 text-base">→</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">🔗 공통(통합검색) 탭에서 확인</p>
                  <ul className="mt-1.5 space-y-0.5 text-xs text-gray-500">
                    <li>• 개요 (배치 탭, 진입 방식, 검색 범위)</li>
                    <li>• UI 구조 (헤더·바디·서브 모달)</li>
                    <li>• 화면 상태 4종 (Empty / 증상어 / 결과없음 / 결과)</li>
                    <li>• 검색어 분류 로직 (3단계 분기 + Alias 확장)</li>
                    <li>• 결과 영역 상세 스펙 (명의·병원·커뮤니티·Aiga 배너)</li>
                    <li>• 검증 시나리오 6종 (클릭 시 실제 모달 실행)</li>
                  </ul>
                </div>
              </div>
            </div>
            <Note>
              홈·명의 찾기·커뮤니티 3개 탭에 <strong>공통 배치</strong>됩니다. 검색 아이콘(돋보기) 스펙은 <strong>4. 레이아웃 → 2번 통합 검색 아이콘 (메인 뷰 우상단 고정)</strong>을 참조하세요.
            </Note>
          </SubSection>

        </Section>

        {/* ───── 2. 알림 UI ──── */}
        <Section id="toasts" title="2. 알림 UI (토스트)" color="amber">

          <SubSection label="1" title="로그인 필요 안내">
            <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-sm font-bold text-emerald-800 mb-1">🔗 전역 공통 알림</p>
              <p className="text-sm text-emerald-900">앱 전체에서 비회원이 회원 전용 기능을 사용하려 할 때 표시</p>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">📍 언제 나타나나요?</h4>
            <div className="space-y-2">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm font-bold text-red-900">비회원이 즐겨찾기 버튼 터치</p>
                <p className="text-xs text-red-700">→ 의사 프로필 팝업에서</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm font-bold text-red-900">비회원이 리뷰쓰기 버튼 터치</p>
                <p className="text-xs text-red-700">→ 의사 프로필 팝업에서</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-sm font-bold text-gray-700">향후 확장 예정</p>
                <p className="text-xs text-gray-500">→ 명의찾기, 커뮤니티 등 모든 로그인 필요 기능</p>
              </div>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">🎨 화면에 표시되는 모습</h4>
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-xl p-4 text-center">
              <p className="text-sm mb-3">로그인이 필요한 기능입니다</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold pointer-events-none">
                로그인하기
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              → 화면 하단 중앙에 3초간 표시되며, 버튼 터치 시 로그인 화면으로 이동
            </p>
          </SubSection>

        </Section>

        {/* ───── 3. 데이터 상태 UI ───── */}
        <Section id="data-states" title="3. 데이터 상태 UI" color="emerald">

          <div className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5">
            <p className="text-sm font-bold text-blue-900 mb-2">🌐 전역 공통 패턴</p>
            <p className="text-sm text-blue-800 mb-3">
              홈, 명의찾기, 커뮤니티 등 모든 화면에서 서버 데이터를 불러올 때 사용자에게 일관된 피드백을 제공합니다.
            </p>
            <p className="text-xs text-blue-700">
              → 각 구역/섹션은 독립적으로 데이터를 가져오므로, 어떤 구역은 로딩 중이고 어떤 구역은 이미 표시되거나 에러가 발생할 수 있습니다.
            </p>
          </div>

          <SubSection label="1" title="로딩 중 (Loading)">
            <h4 className="text-sm font-bold text-gray-900 mb-2">📍 언제 나타나나요?</h4>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <p>• 서버에서 데이터를 불러오는 동안</p>
              <p>• 초기 화면 진입 시</p>
              <p>• 새로고침 버튼을 눌렀을 때</p>
              <p>• 필터/정렬 옵션을 변경했을 때</p>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">🎨 화면에 표시되는 모습</h4>
            <div className="bg-white border-2 border-blue-200 rounded-xl p-8 text-center">
              <div className="inline-flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-600">불러오는 중...</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              → 파란색 회전 아이콘 + \"불러오는 중...\" 텍스트
            </p>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">✨ 사용 예시</h4>
            <div className="space-y-2">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm font-bold text-blue-900">홈 화면 — 건강 정보 구역</p>
                <p className="text-xs text-blue-700">카드 목록을 불러오는 동안 로딩 표시</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm font-bold text-blue-900">홈 화면 — 인기 명의 구역</p>
                <p className="text-xs text-blue-700">질환별 탭의 의사 목록을 불러오는 동안 로딩 표시</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm font-bold text-blue-900">홈 화면 — 커뮤니티 추천글 구역</p>
                <p className="text-xs text-blue-700">인기 게시글 목록을 불러오는 동안 로딩 표시</p>
              </div>
            </div>

            <Note>
              로딩 시간이 매우 짧은 경우(0.5초 이하), 깜빡임 방지를 위해 로딩 UI를 표시하지 않을 수 있습니다. (정책 검토 필요)
            </Note>
          </SubSection>

          <SubSection label="2" title="에러 발생 (Error)">
            <h4 className="text-sm font-bold text-gray-900 mb-2">📍 언제 나타나나요?</h4>
            <div className="bg-red-50 rounded-xl p-4 space-y-2 text-sm">
              <p className="text-red-900">• 서버 응답이 없거나 오류 발생</p>
              <p className="text-red-900">• 인터넷 연결 끊김</p>
              <p className="text-red-900">• 서버 내부 오류</p>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">🎨 화면에 표시되는 모습</h4>
            <div className="bg-white border-2 border-red-200 rounded-xl p-8 text-center">
              <div className="inline-flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                  <span className="text-3xl">⚠️</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">데이터를 불러올 수 없습니다</p>
                  <p className="text-xs text-gray-600">네트워크 상태를 확인해주세요</p>
                </div>
                <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors pointer-events-none">
                  다시 시도
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              → 경고 아이콘 + 에러 메시지 + \"다시 시도\" 버튼
            </p>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">🎯 사용자 행동</h4>
            <div className="space-y-2">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm font-bold text-green-900">\"다시 시도\" 버튼 터치</p>
                <p className="text-xs text-green-700">→ 해당 구역의 데이터를 다시 불러오기 시도</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-sm font-bold text-gray-900">다른 구역은 정상 작동</p>
                <p className="text-xs text-gray-600">→ 에러가 발생한 구역만 영향받고, 나머지 구역은 정상 표시</p>
              </div>
            </div>
          </SubSection>

          <SubSection label="3" title="데이터 없음 (Empty)">
            <h4 className="text-sm font-bold text-gray-900 mb-2">📍 언제 나타나나요?</h4>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <p>• 서버 응답은 성공했지만 표시할 데이터가 0건</p>
              <p>• 검색 결과가 없을 때</p>
              <p>• 필터 조건에 맞는 항목이 없을 때</p>
              <p>• 아직 작성된 게시글/리뷰가 없을 때</p>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">🎨 화면에 표시되는 모습</h4>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center">
              <div className="inline-flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                  <span className="text-3xl">📭</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">표시할 내용이 없습니다</p>
                  <p className="text-xs text-gray-600">다른 조건으로 검색해보세요</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              → 빈 우편함 아이콘 + 안내 메시지
            </p>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">✨ 상황별 메시지 예시</h4>
            <Table
              headers={['상황', '제목 메시지', '부가 설명']}
              rows={[
                ['검색 결과 없음', '검색 결과가 없습니다', '다른 검색어를 시도해보세요'],
                ['필터 결과 없음', '조건에 맞는 항목이 없습니다', '필터를 변경해보세요'],
                ['리뷰 없음', '아직 작성된 리뷰가 없습니다', '첫 리뷰를 작성해보세요'],
                ['게시글 없음', '아직 작성된 게시글이 없습니다', '첫 게시글을 작성해보세요'],
              ]}
            />

            <Note>
              빈 화면(Empty)은 \"에러\"가 아니라 \"정상 응답\"입니다. 사용자에게 부적절한 느낌보다는 \"다음 행동\"을 유도하는 메시지로 표현합니다.
            </Note>
          </SubSection>

        </Section>

        {/* ───── 4. 레이아웃 컴포넌트 ───── */}
        <Section id="layout" title="4. 레이아웃 컴포넌트 (하단 탭 메뉴)" color="emerald">

          <SubSection label="1" title="하단 탭 메뉴 (BottomTabBar)">
            <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-sm font-bold text-emerald-800 mb-1">🔗 전역 고정 컴포넌트</p>
              <p className="text-sm text-emerald-900">모든 주요 화면 하단에 고정되어 표시되는 탭 네비게이션</p>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">📍 어디서 볼 수 있나요?</h4>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <p>• 홈·AIGA챗봇·명의 찾기·커뮤니티·MY 각각의 메인 화면 하단에 동일 바가 붙습니다.</p>
              <p>• 구현 참고: <code className="text-xs bg-white px-1 rounded border">BottomTabBar</code> — 좌→우 5칸 그리드, 라벨은 프로토타입과 동일합니다.</p>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">🎯 탭 구성</h4>
            <Table
              headers={['순서·라벨', '화면', '비고']}
              rows={[
                ['1 · 홈', '홈 화면 (HomePage)', '재터치 시 최상단 이동 · 다른 탭 후 재진입 시 스크롤 유지(아래 확정)'],
                ['2 · AIGA챗봇', 'AI 챗봇 화면 (ChatPage)', '홈 AI 배너 등과 동일한 목적지'],
                ['3 · 명의 찾기', '명의 찾기 화면 (DoctorSearchPage)', '질환·지역 등 의료진 검색·탐색'],
                ['4 · 커뮤니티', '커뮤니티 화면 (CommunityPage)', '게시글 피드·글쓰기 등'],
                ['5 · MY', '마이페이지 (MyPage)', '프로필·설정·활동 등(상세는 마이 스펙 참조)'],
              ]}
            />

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">✨ 사용자 경험</h4>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 space-y-3">
              <div>
                <p className="font-bold text-blue-900 text-sm mb-1">탭 전환</p>
                <p className="text-xs text-blue-800">탭을 터치하면 해당 화면으로 즉시 이동</p>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm mb-1">활성 표시</p>
                <p className="text-xs text-blue-800">현재 화면의 탭은 파란색으로 강조, 다른 탭은 회색</p>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm mb-1">고정 위치</p>
                <p className="text-xs text-blue-800">화면 하단에 항상 고정되어 스크롤해도 사라지지 않음</p>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm mb-1">홈 탭 — 스크롤 동작 (확정)</p>
                <p className="text-xs text-blue-800">
                  • <strong>재터치</strong>: 이미 홈에 있는 상태에서 홈 탭을 다시 누르면 화면 <strong>최상단</strong>으로 스크롤 이동합니다.
                </p>
                <p className="text-xs text-blue-800 mt-1">
                  • <strong>재진입</strong>: 다른 탭(AIGA 등)으로 이동했다가 홈 탭으로 돌아오면, 떠나기 전에 보던 <strong>스크롤 위치를 유지</strong>합니다.
                </p>
              </div>
            </div>

            <Note>
              탭을 전환할 때 브라우저 뒤로가기 버튼 동작 정책도 함께 정의가 필요합니다. (특히 Android 기기에서 물리 뒤로가기 버튼)
            </Note>
          </SubSection>

          <SubSection label="2" title="통합 검색 아이콘 (메인 뷰 우상단 고정)">
            <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-sm font-bold text-emerald-800 mb-1">🔗 전역 고정 컴포넌트 · 반응형 웹</p>
              <p className="text-sm text-emerald-900 mb-2">
                <strong>상단 헤더 바(AIGA 로고가 있는 줄) 안에는 두지 않습니다.</strong> 홈 탭 구역 1과 같이 로고만 헤더에 두고, 돋보기는 <strong>메인 뷰(모바일 우선 폭·가운데 정렬 영역) 우상단</strong>에 별도로 고정합니다.
              </p>
              <p className="text-xs text-emerald-800">
                네이티브 앱 단일 프레임이 아니라 <strong>브라우저 기반 반응형 웹</strong> 기준이며, 홈·명의 찾기·커뮤니티에서 동일 패턴입니다.
              </p>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">📍 표시 위치</h4>
            <Table
              headers={['화면', '위치', '비고']}
              rows={[
                ['홈', '메인 뷰 우상단 고정 돋보기 (헤더 바 밖)', '✅ 확정'],
                ['명의 찾기', '메인 뷰 우상단 고정 돋보기 (헤더 바 밖)', '✅ 확정'],
                ['커뮤니티', '메인 뷰 우상단 고정 돋보기 (헤더 바 밖)', '✅ 확정'],
                ['AIGA챗봇', '미표시', '챗봇 화면은 자체 입력창 사용'],
                ['MY', '미표시', '마이 전용 헤더·메뉴 구조(반응형 웹 전역 정책상 통합검색 미노출)'],
              ]}
            />

            <h4 className="text-sm font-bold text-gray-900 mb-2 mt-4">🎯 동작</h4>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 space-y-2 text-sm">
              <p>• 터치 시 <strong>GlobalSearchModal (팝업 UI → 5번)</strong> 오버레이 표시</p>
              <p>• 아이콘 형태: 돋보기 (lucide-react Search)</p>
              <p>• 아이콘 크기 및 색상: 각 탭 상단 영역과 시각적으로 맞출 것(통일 권장)</p>
              <p className="text-xs text-blue-900">
                • <strong>레이아웃</strong>: 헤더 행과 <strong>별도 레이어</strong>로 두어, 본문 세로 스크롤과 무관하게 우상단에 보이게 함(구현·좌표는 통합검색 시나리오 탭·프로토타입 참고).
              </p>
            </div>

            <Note>
              이 아이콘을 터치했을 때 열리는 모달의 상세 스펙은 <strong>1. 팝업 UI → 5번 통합 검색 모달</strong>을 참조하세요.
            </Note>
          </SubSection>

        </Section>

      </div>
    </div>
  );
}

/* ─── 재사용 컴포넌트 ─── */

function Section({ id, title, color, children }: { id: string; title: string; color: string; children: React.ReactNode }) {
  const borderColors: Record<string, string> = {
    emerald: 'border-emerald-500',
    amber: 'border-amber-500',
  };
  const bgColors: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-900',
    amber: 'bg-amber-50 text-amber-900',
  };
  return (
    <section id={id}>
      <div className={`flex items-center gap-3 mb-5 pb-3 border-b-2 ${borderColors[color]}`}>
        <h2 className={`text-lg font-black px-3 py-1 rounded-lg ${bgColors[color]}`}>{title}</h2>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function SubSection({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-lg">{label}</span>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((h, i) => (
              <th key={i} className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3 border-b border-gray-100">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              {row.map((cell, ci) => (
                <td key={ci} className={`px-4 py-3 text-gray-700 align-top border-b border-gray-50 ${ci === 0 ? 'font-medium text-gray-900 whitespace-nowrap' : ''}`}>
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
    <div className="mt-3 flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
      <span className="text-blue-500">ℹ️</span>
      <p className="text-xs text-blue-800">{children}</p>
    </div>
  );
}