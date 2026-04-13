// 화면정의서 업데이트 요약 문서 (2026.03.27)

export function UpdateSummary() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">화면정의서 업데이트</span>
            <span className="bg-white/10 text-indigo-100 text-xs px-3 py-1 rounded-full">2026.03.27</span>
            <span className="bg-yellow-400/90 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">📝 수정 예정</span>
          </div>
          <h1 className="text-2xl font-black mb-2">🔄 화면정의서 수정 내용 요약</h1>
          <p className="text-indigo-200 text-sm">최근 구현된 기능을 반영하기 위한 화면정의서 업데이트 항목</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">

        {/* ━━━━━ 1. 명의찾기 탭 ━━━━━ */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-5 py-4">
            <h2 className="text-lg font-black text-white">📍 1. DoctorSearchSpec.tsx (명의찾기 탭)</h2>
          </div>
          <div className="p-5 space-y-5">

            {/* 수정 1 */}
            <div className="border-l-4 border-teal-500 pl-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">✏️ 수정 1: 통합검색 아이콘 설명 명확화</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
                <p className="text-xs font-bold text-red-800 mb-1">❌ 현재 (삭제 예정)</p>
                <p className="text-xs text-red-900">
                  "오른쪽 영역: 통합 검색 아이콘 (돋보기) - 터치 시 통합 검색 전체 창 오버레이 표시"
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs font-bold text-green-800 mb-1">✅ 수정 후 (추가 예정)</p>
                <p className="text-xs text-green-900 font-medium mb-2">
                  "오른쪽 영역: 통합 검색 아이콘 (돋보기)"
                </p>
                <ul className="text-xs text-green-900 space-y-1 ml-4">
                  <li>• 터치 시 통합 검색 전체 창(화면을 가득 채우는 검색)이 열림</li>
                  <li>• 명의/병원/게시글을 한 번에 검색할 수 있는 통합 검색 기능 제공</li>
                  <li>• 홈·명의찾기·커뮤니티 탭 공통 노출 (동일한 UI/기능)</li>
                  <li>• 비회원은 하루 3회까지 무료 검색 가능</li>
                </ul>
              </div>
            </div>

            {/* 수정 2 */}
            <div className="border-l-4 border-teal-500 pl-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">✏️ 수정 2: 검색창 기능 설명 (명의찾기 탭 전용 검색)</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs font-bold text-green-800 mb-2">✅ 추가 설명</p>
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <p className="text-xs font-bold text-gray-900 mb-2">💡 명의찾기 탭 검색 vs 통합검색 차이</p>
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 py-1.5 text-left font-bold">구분</th>
                        <th className="px-2 py-1.5 text-left font-bold">명의찾기 탭 검색</th>
                        <th className="px-2 py-1.5 text-left font-bold">통합 검색 전체 창</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-2 py-1.5 text-gray-600">위치</td>
                        <td className="px-2 py-1.5">명의찾기 탭 내부 검색창</td>
                        <td className="px-2 py-1.5">우측 상단 돋보기 아이콘 → 전체 화면 검색 창</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1.5 text-gray-600">검색 대상</td>
                        <td className="px-2 py-1.5 font-bold text-teal-700">의사만 검색</td>
                        <td className="px-2 py-1.5 font-bold text-purple-700">명의/병원/게시글 통합 검색</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1.5 text-gray-600">결과 표시</td>
                        <td className="px-2 py-1.5">현재 화면에서 필터링</td>
                        <td className="px-2 py-1.5">검색 창 안에서 탭으로 구분 표시</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1.5 text-gray-600">사용량 제한</td>
                        <td className="px-2 py-1.5">제한 없음 (로컬 필터링)</td>
                        <td className="px-2 py-1.5">비회원 하루 3회</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 수정 3 */}
            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">⚠️ 수정 3: 연관검색어 드롭다운 구현 상태 확인 필요</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs font-bold text-amber-800 mb-2">🤔 현재 상태 불명확</p>
                <p className="text-xs text-amber-900 mb-2">
                  현재 문서: "포커스 + 입력 중 → 연관검색어 드롭다운 표시 (마지막 단어 기준) ✅ 구현 완료"
                </p>
                <p className="text-xs text-amber-800 font-bold">
                  → 실제 구현 여부 확인 후 상태 업데이트 필요
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ━━━━━ 2. 공통 컴포넌트 ━━━━━ */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-4">
            <h2 className="text-lg font-black text-white">🔗 2. CommonComponentsSpec.tsx (공통 컴포넌트)</h2>
          </div>
          <div className="p-5 space-y-5">

            {/* 추가 1 */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">➕ 추가 1: 리뷰 작성 50자 제한 규칙</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-bold text-blue-800 mb-2">✅ 의사 프로필 모달 - 리뷰 작성 섹션에 추가</p>
                <div className="bg-white rounded-lg p-3 border border-blue-200 space-y-2">
                  <div>
                    <p className="text-xs font-bold text-gray-900">📝 작성 규칙</p>
                    <ul className="text-xs text-gray-700 ml-4 mt-1 space-y-0.5">
                      <li>• 최소 50자 이상 작성해야 제출 가능</li>
                      <li>• 플레이스홀더에 안내 문구 포함: "최소 50자 이상 작성해주세요"</li>
                      <li>• 50자 미만 시 제출 버튼 비활성화</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">💬 UX 안내</p>
                    <p className="text-xs text-gray-700">입력창 하단에 현재 글자 수 표시 (예: "15 / 50자")</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 2 */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">➕ 추가 2: 병원 상세 모달 섹션</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-bold text-blue-800 mb-2">✅ 신규 섹션 추가</p>
                <div className="bg-white rounded-lg p-3 border border-blue-200 space-y-2">
                  <div>
                    <p className="text-xs font-bold text-gray-900">🏥 병원 상세 모달</p>
                    <p className="text-xs text-gray-700 mb-2">명의찾기, 통합검색에서 병원 카드 터치 시 표시</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">제공 정보</p>
                    <ul className="text-xs text-gray-700 ml-4 space-y-0.5">
                      <li>• 병원명, 주소, 전화번호, 운영 시간</li>
                      <li>• 병원 평점 (별점)</li>
                      <li>• 환자 리뷰 목록</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">사용자 행동</p>
                    <ul className="text-xs text-gray-700 ml-4 space-y-0.5">
                      <li>• 리뷰 작성 (회원 전용, 50자 제한 동일)</li>
                      <li>• 지도 보기 (외부 링크)</li>
                      <li>• 전화 걸기 (외부 링크)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 3 */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">➕ 추가 3: 댓글 신고/수정 기능 (커뮤니티)</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-bold text-blue-800 mb-2">✅ 커뮤니티 게시글 상세 - 댓글 관련 기능</p>
                <div className="bg-white rounded-lg p-3 border border-blue-200 space-y-3">
                  <div>
                    <p className="text-xs font-bold text-gray-900">🚨 댓글 신고</p>
                    <ul className="text-xs text-gray-700 ml-4 mt-1 space-y-0.5">
                      <li>• 댓글 우측 ••• 메뉴 → "신고하기" 선택</li>
                      <li>• 신고 사유 선택 모달 표시 (욕설/광고/도배/기타)</li>
                      <li>• 데모(이 브라우저 저장): 같은 댓글에 신고가 5번 쌓이면 자동으로 가림 처리</li>
                      <li>• 블라인드 댓글은 "신고가 접수된 댓글입니다" 회색 박스로 표시</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">✏️ 댓글 수정</p>
                    <ul className="text-xs text-gray-700 ml-4 mt-1 space-y-0.5">
                      <li>• 본인 댓글만 ••• 메뉴에서 "수정" 선택 가능</li>
                      <li>• 인라인 편집 UI로 전환 (입력창 + 취소/저장 버튼)</li>
                      <li>• 저장 시 댓글 내용 업데이트, 수정 시각 갱신</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 4 */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">➕ 추가 4: 로그인 유도 팝업 디자인 통일</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-bold text-blue-800 mb-2">✅ 로그인 유도 팝업</p>
                <div className="bg-white rounded-lg p-3 border border-blue-200 space-y-2">
                  <div>
                    <p className="text-xs font-bold text-gray-900">🎨 디자인 특징</p>
                    <ul className="text-xs text-gray-700 ml-4 space-y-0.5">
                      <li>• 하단에서 슬라이드 업 애니메이션으로 등장</li>
                      <li>• 그라데이션 배경 (blue → indigo)</li>
                      <li>• 기능별 맞춤 메시지 (예: "리뷰 작성", "댓글 작성", "저장")</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">📍 사용 위치</p>
                    <ul className="text-xs text-gray-700 ml-4 space-y-0.5">
                      <li>• 의사 프로필 창: 리뷰 작성, 북마크 시도</li>
                      <li>• 병원 상세 창: 리뷰 작성 시도</li>
                      <li>• 커뮤니티: 댓글 작성, 게시글 작성 시도</li>
                      <li>• 통합검색: 북마크 시도</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 5 */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">➕ 추가 5: 비회원 사용량 제한 안내</h3>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-xs font-bold text-purple-800 mb-2">⚠️ 비회원 제한 규칙 명시</p>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 py-1.5 text-left font-bold">기능</th>
                        <th className="px-2 py-1.5 text-left font-bold">비회원 제한</th>
                        <th className="px-2 py-1.5 text-left font-bold">제한 초과 시</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-2 py-1.5 text-gray-900">통합검색</td>
                        <td className="px-2 py-1.5 text-gray-700">하루 3회</td>
                        <td className="px-2 py-1.5 text-gray-700">검색창 차단 + 로그인 유도</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1.5 text-gray-900">의사 프로필 조회</td>
                        <td className="px-2 py-1.5 text-gray-700">하루 3회</td>
                        <td className="px-2 py-1.5 text-gray-700">프로필 대신 로그인 유도 팝업</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1.5 text-gray-900">커뮤니티 게시글 열람</td>
                        <td className="px-2 py-1.5 text-gray-700">하루 5회</td>
                        <td className="px-2 py-1.5 text-gray-700">게시글 상세 대신 로그인 유도 팝업</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-600 mt-2">
                    ※ 데모는 이 브라우저에 남은 횟수를 저장, 매일 자정 초기화
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ━━━━━ 3. 통합검색 ━━━━━ */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-4">
            <h2 className="text-lg font-black text-white">🔍 3. SearchScenarioSpec.tsx (통합 검색 전체 창)</h2>
          </div>
          <div className="p-5 space-y-5">

            {/* 수정 1 */}
            <div className="border-l-4 border-violet-500 pl-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">✏️ 수정 1: 검색 결과 탭 구성 업데이트</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
                <p className="text-xs font-bold text-red-800 mb-1">❌ 현재 (2개 탭)</p>
                <p className="text-xs text-red-900">명의 탭 / 게시글 탭</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs font-bold text-green-800 mb-2">✅ 수정 후 (3개 탭)</p>
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">명의 탭</span>
                      <span className="text-xs text-gray-700">의사 검색 결과 (이름/병원/전문분야)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2 py-1 rounded">병원 탭</span>
                      <span className="text-xs text-gray-700">병원 검색 결과 (병원명/주소)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded">게시글 탭</span>
                      <span className="text-xs text-gray-700">커뮤니티 게시글 검색 (제목/내용)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 1 */}
            <div className="border-l-4 border-violet-500 pl-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">➕ 추가 2: 비회원 검색 제한 UI</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-bold text-blue-800 mb-2">⚠️ 3회 초과 시 UI 변화</p>
                <div className="bg-white rounded-lg p-3 border border-blue-200 space-y-2">
                  <div>
                    <p className="text-xs font-bold text-gray-900">🚫 검색창 차단</p>
                    <ul className="text-xs text-gray-700 ml-4 space-y-0.5">
                      <li>• 플레이스홀더: "오늘 무료 검색을 모두 사용했어요"</li>
                      <li>• 검색창은 입력만 막고 안내 문구는 유지</li>
                      <li>• 회색 배경 + 자물쇠 아이콘 표시</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">💬 안내 배너</p>
                    <p className="text-xs text-gray-700">
                      "로그인하면 무제한 검색이 가능해요" 노란색 배너 표시
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 3 */}
            <div className="border-l-4 border-violet-500 pl-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">➕ 추가 3: 검색 시나리오 테스트 케이스</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-bold text-blue-800 mb-2">✅ 추가 시나리오</p>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 py-1.5 text-left font-bold">검색어</th>
                        <th className="px-2 py-1.5 text-left font-bold">예상 결과</th>
                        <th className="px-2 py-1.5 text-left font-bold">비고</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-2 py-1.5 text-gray-900">"서울아산병원"</td>
                        <td className="px-2 py-1.5 text-gray-700">병원 탭에 결과, 명의 탭에 소속 의사들</td>
                        <td className="px-2 py-1.5 text-gray-600">병원 검색</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1.5 text-gray-900">"폐암 수술"</td>
                        <td className="px-2 py-1.5 text-gray-700">명의 탭 + 게시글 탭 결과</td>
                        <td className="px-2 py-1.5 text-gray-600">질환 검색</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1.5 text-gray-900">"로봇수술"</td>
                        <td className="px-2 py-1.5 text-gray-700">전문분야 태그 매칭된 의사들</td>
                        <td className="px-2 py-1.5 text-gray-600">시술 검색</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ━━━━━ 요약 ━━━━━ */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 p-6">
          <h2 className="text-base font-black text-indigo-900 mb-4">📊 수정 항목 요약</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0">명의찾기</span>
              <div className="text-xs text-gray-800">
                <p className="font-bold mb-1">3개 항목 수정</p>
                <p className="text-gray-600">통합검색 설명 명확화, 검색 비교표 추가, 연관검색 상태 확인</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0">공통 컴포넌트</span>
              <div className="text-xs text-gray-800">
                <p className="font-bold mb-1">5개 항목 추가</p>
                <p className="text-gray-600">리뷰 50자 제한, 병원 모달, 댓글 신고/수정, 로그인 유도, 사용량 제한</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-violet-500 text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0">통합검색</span>
              <div className="text-xs text-gray-800">
                <p className="font-bold mb-1">3개 항목 수정</p>
                <p className="text-gray-600">탭 구성 업데이트(병원 추가), 비회원 제한 UI, 검색 시나리오</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// Helper Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-bold text-gray-900 border-b-2 border-gray-200 pb-2">{title}</h3>
      {children}
    </section>
  );
}
