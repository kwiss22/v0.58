import type { ReactNode } from 'react';
import { useAppNavigation } from '../../contexts/AppNavigationContext';
import { SpecDocLink } from './SpecDocLink';

export function DoctorSearchSpec() {
  const { navigateToChat, navigateToDoctorSearch } = useAppNavigation();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-sm">
      {/* 문서 헤더 */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white px-3 py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">v0.58</span>
          <span className="bg-yellow-400/90 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">🎨 UI/UX</span>
        </div>
        <h1 className="text-base font-black mb-1">명의 찾기 화면</h1>
        <p className="text-teal-200 text-[10px]">UI/UX · 프로토타입 화면 참고 (명의 목록은 더미 가능)</p>
      </div>

      <div className="px-3 py-4 space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 text-[11px] text-amber-900 leading-relaxed space-y-1">
          <p>
            <span className="font-bold">문서 범위:</span> 레이아웃·검색·카드·모달 등 사용자 경험. 데모에 나오는 의사·병원 데이터는 샘플이며 실제 DB/API와 동일하지 않습니다.
          </p>
          <p>
            <span className="font-bold">데모 번호(D01~D07):</span> 시범 화면의 동그란 번호와 이 문서의 동일 번호 블록이 짝입니다. 번호를 누르면 이쪽으로 스크롤됩니다.
          </p>
        </div>

        {/* ───── 1. 화면 개요 ───── */}
        <Section id="overview" title="1. 화면 개요" color="teal">
          <Table
            headers={['항목', '내용']}
            rows={[
              ['화면 이름', '명의 찾기 (세 번째 탭)'],
              ['진입 방법', '하단 탭 메뉴에서 "명의찾기" 터치 / 홈 화면 질환 탭 → "더보기" 터치 / AI 챗봇에서 명의찾기 연동'],
              ['대상 사용자', '비회원 · 회원 공통'],
              ['화면의 목적', '질환명·병원명·의사명으로 직접 검색하여 원하는 명의를 탐색'],
              ['화면 형태', '상단 고정 헤더(검색창 + 카테고리) + 결과 목록 스크롤 + 하단 탭 메뉴'],
              ['기준 화면', '모바일 우선, PC/태블릿은 가운데 정렬로 표시'],
            ]}
          />
        </Section>

        {/* ───── 2. 화면 구성 ───── */}
        <Section id="layout" title="2. 화면 구성 (위에서 아래 순서)" color="cyan">

          <SubSection label="구역 1" title="상단 헤더" specAnchorId="doctor-tag-d01" tagCode="D01">
            <div className="mb-3 bg-cyan-50 border border-cyan-200 rounded-xl px-3 py-2">
              <p className="text-xs font-bold text-cyan-900 mb-1">통합 검색 — UI 배치 (프로토타입과 동일)</p>
              <p className="text-xs text-cyan-800">
                페이지 헤더에는 제목만 있고 돋보기는 없습니다. 통합 검색은 <strong>반응형 웹</strong> 전역 레이아웃에서 <strong>메인 뷰 우상단 고정</strong> 돋보기 버튼으로 열리며(본문 스크롤과 별도 레이어), 홈·명의 찾기·커뮤니티 탭에서 공통입니다.
              </p>
            </div>
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['화면 제목', '"명의 찾기" 텍스트 (왼쪽 정렬)', '—'],
                ['헤더 우측', '비움', '통합 검색은 헤더 밖·반응형 웹 메인 뷰 우상단 고정(위 박스)'],
              ]}
            />
          </SubSection>

          <SubSection label="구역 2" title="통합 검색창" specAnchorId="doctor-tag-d02" tagCode="D02">
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['플레이스홀더', '"질환명, 병원명, 의사명 검색"', '—'],
                ['왼쪽 아이콘', '돋보기 아이콘 (검색 의미 전달)', '—'],
                ['오른쪽 버튼', '입력 내용이 있을 때만 X 버튼 표시 → 터치 시 검색어 전체 삭제', '—'],
                ['검색 방식', '타이핑 즉시 실시간 필터링 (엔터 불필요)', '—'],
                ['다중 키워드', '공백으로 단어를 구분하면 모든 단어가 포함된 결과만 표시 (AND 조건)', '예: "폐암 서울아산" 입력 시 두 단어 모두 포함된 의사만 표시'],
                ['대소문자', '구분 없음', '—'],
                ['부분 일치', '포함 검색 (includes)', '—'],
              ]}
            />

            <h4 className="text-xs font-bold text-gray-900 mb-2 mt-4">🔍 검색 대상 필드</h4>
            <div className="grid grid-cols-2 gap-2">
              {['의사 이름', '병원명', '전문과', '질환 분야 (암, 폐암, 위염, #로봇수술 등)'].map((field) => (
                <div key={field} className="bg-teal-50 border border-teal-100 rounded-lg px-3 py-2 text-xs text-teal-800 font-medium">
                  {field}
                </div>
              ))}
            </div>

            <h4 className="text-xs font-bold text-gray-900 mb-2 mt-4">💬 입력 상태별 화면</h4>
            <div className="space-y-2">
              {[
                { state: '포커스 + 입력 없음', action: '아무것도 표시하지 않음' },
                { state: '포커스 + 입력 중', action: '연관검색어 드롭다운 표시 (마지막 단어 기준)' },
                { state: '검색 실행', action: '드롭다운 닫힘 → 결과 목록 표시' },
                { state: '결과 0건', action: '안내 문구 + AI 챗봇 유도 배너 표시' },
              ].map((item, i) => (
                <div key={i} className="border border-green-200 bg-green-50 rounded-lg px-3 py-2.5">
                  <div className="mb-1">
                    <span className="text-xs font-bold text-gray-900">{item.state}</span>
                  </div>
                  <p className="text-xs text-gray-600">→ {item.action}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl">
              <span className="text-teal-700 text-xs font-medium">🎯 화면 시나리오:</span>
              <button
                onClick={() => navigateToDoctorSearch('폐암')}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-lg transition-colors"
              >
                명의 찾기로 이동
              </button>
            </div>
          </SubSection>

          <SubSection label="구역 3" title="연관검색어 드롭다운" specAnchorId="doctor-tag-d03" tagCode="D03">
            <div className="mb-3 bg-teal-50 border border-teal-200 rounded-xl px-3 py-2.5">
              <p className="text-xs font-bold text-teal-800 mb-1">💡 동작 방식</p>
              <p className="text-xs text-teal-900">검색창에 글자를 입력하면 마지막 단어를 기준으로 연관 검색어를 추천합니다. 앞 단어는 유지하고 마지막 단어만 교체하여 자연스러운 다중 검색을 지원합니다.</p>
            </div>
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['표시 조건', '검색창 포커스 상태 + 마지막 단어가 1글자 이상일 때', '—'],
                ['추천 기준', '마지막 단어가 포함된 결과를 의사 데이터에서 실시간 추출', '—'],
                ['추천 유형', '질환 (주황), 진료과 (보라), 병원 (청록), 명의 이름 (파랑) 4가지', '색상으로 유형 구분'],
                ['표시 순서', '질환 → 진료과 → 병원 → 명의 이름 순', '—'],
                ['최대 개수', '질환 4개 · 진료과 3개 · 병원 3개 · 명의 4개 이내', '—'],
                ['하이라이트', '매칭된 글자를 파란색 볼드로 강조', '—'],
                ['선택 시', '앞 단어는 그대로 두고 마지막 단어만 선택한 추천어로 교체 후 검색', '예: "간암 병" → "병원내과" 선택 → "간암 병원내과" 로 교체'],
                ['닫힘 조건', '항목 선택 / 포커스 아웃 / ESC 키', '—'],
              ]}
            />
          </SubSection>

          <SubSection label="구역 4" title="카테고리 필터" specAnchorId="doctor-tag-d04" tagCode="D04">
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['구조', '2단계 (대분류 → 중분류)', '—'],
                ['스크롤 방식', '가로 스크롤 (스크롤바 숨김)', '—'],
                ['검색창과 관계', '검색어와 AND 조건으로 동시 적용', '—'],
                ['1단계 대분류 항목', 'DB 데이터를 따름', '—'],
                ['2단계 중분류 항목', 'DB 데이터를 따름', '—'],
              ]}
            />

            <div className="space-y-2 mt-4">
              {[
                { label: '선택 안 한 상태', action: '대분류 전체 필터 적용', color: 'bg-sky-500 text-white' },
                { label: '중분류 선택 시', action: '해당 중분류로 필터 좁힘', color: 'bg-white border border-sky-200 text-sky-700' },
                { label: '이미 선택된 항목 재클릭', action: '선택 해제 (한 단계 위로 복귀)', color: 'bg-gray-100 text-gray-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${item.color}`}>{item.label}</span>
                  <span className="text-gray-500">→ {item.action}</span>
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection label="구역 5" title="검색 결과 헤더" specAnchorId="doctor-tag-d05" tagCode="D05">
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['결과 수', '"총 N명의 명의" 형식으로 표시', '필터링 후 실시간 업데이트'],
                ['정렬 드롭다운', '현재 선택된 정렬 기준 표시 + 터치 시 선택 메뉴 펼침', '—'],
              ]}
            />

            <h4 className="text-xs font-bold text-gray-900 mb-2 mt-4">🔃 정렬 옵션 (3가지)</h4>
            <div className="space-y-2">
              {[
                { label: '환자 경험순', desc: '리뷰 수(진료 경험 많은 순) 기준', default: true },
                { label: '동료의사 추천순', desc: '동료 의사 추천 점수 기준', default: false },
                { label: '거리순', desc: '내 위치 기준 가까운 순. 위치 권한 필요', default: false },
              ].map((opt, i) => (
                <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-lg px-3 py-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900">{opt.label}</span>
                      {opt.default && <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-1.5 py-0.5 rounded-full">기본값</span>}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection label="구역 6" title="의사 카드 목록" specAnchorId="doctor-tag-d06" tagCode="D06">
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['로딩 시', '스켈레톤 카드 10개 표시 (실제 카드와 동일한 레이아웃)', '✅ 구현 완료'],
                ['카드 구분선', '카드 하단에 연한 회색 구분선 (border-b border-gray-100)', '✅ 구현 완료'],
                ['무한스크롤', '스크롤이 하단 sentinel에 닿으면 10개씩 추가 로드', '✅ 구현 완료'],
                ['추가 로딩 시', '스켈레톤 3개 + "불러오는 중..." 텍스트', '✅ 구현 완료'],
                ['전체 로드 완료', '"총 N명의 명의를 모두 확인했습니다" 문구 (10명 이상일 때만)', '✅ 구현 완료'],
                ['호버 효과', '카드 배경이 연한 회색으로 변경 (hover:bg-gray-50)', '—'],
              ]}
            />

            <h4 className="text-xs font-bold text-gray-900 mb-2 mt-4">📋 카드 구성 요소</h4>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-2 text-xs">
              <div className="flex gap-3">
                <div className="w-14 h-14 rounded-xl bg-gray-300 flex-shrink-0 flex items-center justify-center text-gray-400 text-[10px]">이미지</div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">병원명</span>
                    <span className="text-gray-400">📍 N.Nkm</span>
                  </div>
                  <div className="font-bold text-gray-900">의사 이름</div>
                  <span className="inline-block bg-teal-600 text-white text-[10px] px-2 py-0.5 rounded-md">전문과</span>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {[
                { field: '병원명', desc: '의사가 소속된 병원 이름', status: '✅ 구현' },
                { field: '거리', desc: '위치 권한 허용 시에만 표시. 병원까지의 직선 거리', status: '✅ 구현' },
                { field: '의사 이름', desc: '볼드 강조', status: '✅ 구현' },
                { field: '전문과', desc: '청록색 배경 태그로 표시', status: '✅ 구현' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-white border border-gray-100 rounded-lg px-3 py-2">
                  <div className="flex-1">
                    <span className="text-xs font-bold text-gray-900">{item.field}</span>
                    <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${
                    item.status.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                  }`}>{item.status.split(' ')[0]}</span>
                </div>
              ))}
            </div>

            <Note>
              카드 터치 시 의사 프로필 상세 팝업이 열립니다. 팝업 스펙은{' '}
              <SpecDocLink to="commonModals" className="font-bold text-blue-700">
                공통 컴포넌트 문서
              </SpecDocLink>
              를 참조하세요.
            </Note>
          </SubSection>

          <SubSection label="구역 7" title="과 0건 — 빈 상태 화면" specAnchorId="doctor-tag-d07" tagCode="D07">
            <div className="mb-3 bg-teal-50 border border-teal-200 rounded-xl px-3 py-2.5">
              <p className="text-xs font-bold text-teal-800 mb-1">✅ 정책 확정</p>
              <p className="text-xs text-teal-900">검색 결과가 0건일 때 검색어 수정 안내 + AI 챗봇 유도 배너를 표시합니다.</p>
            </div>
            <Table
              headers={['요소', '설명', '비고']}
              rows={[
                ['아이콘', '검색 X 아이콘 (회색, 가운데 정렬)', '—'],
                ['안내 문구', '"질환명, 병원명, 의사 이름이 정확한지 확인해 주세요."', '—'],
                ['AI 챗봇 배너', '"원하는 의사를 못 찾으셨나요? AI챗봇에게 물어보시면 질환에 딱 맞는 명의를 찾을 수 있어요."', '—'],
                ['배너 터치 시', 'AI 챗봇 탭로 이동', '—'],
              ]}
            />
            <div className="mt-4 flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
              <span className="text-blue-700 text-xs font-medium">🎯 화면 시나리오:</span>
              <button
                onClick={navigateToChat}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
              >
                AI 챗봇으로 이동
              </button>
            </div>
          </SubSection>

        </Section>

        {/* ───── 3. 위치 권한 정책 ───── */}
        <Section id="location" title="3. 위치 권한 정책" color="sky">
          <div className="bg-sky-50 border border-sky-200 rounded-xl px-3 py-3 mb-3">
            <p className="text-xs font-bold text-sky-800 mb-1">✅ 확정 정책</p>
            <p className="text-xs text-sky-900">명의찾기 화면 최초 진입 시 위치 권한을 요청합니다. 이후 재진입 시에는 묻지 않습니다.</p>
          </div>
          
          {/* 🆕 위치 권한 요청 모달 UI 추가 */}
          <div className="bg-pink-50 border-2 border-pink-400 rounded-xl px-4 py-3 mb-4">
            <h3 className="text-sm font-black text-pink-900 mb-3">🆕 위치 권한 요청 모달</h3>
            
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-pink-200">
                <h4 className="text-xs font-bold text-gray-900 mb-2">📍 표시 시점</h4>
                <Table
                  headers={['상황', '동작']}
                  rows={[
                    ['최초 페이지 진입', '이 브라우저에 위치 허용 여부를 아직 저장하지 않았을 때 자동 표시'],
                    ['"거리순" 정렬 클릭', '권한이 거부되어 있을 때 재표시'],
                    ['재진입 시', '이전 선택 기억 — 모달 미표시'],
                  ]}
                />
              </div>

              <div className="bg-white rounded-lg p-3 border border-pink-200">
                <h4 className="text-xs font-bold text-gray-900 mb-2">🎨 UI 디자인 (크롬 스타일)</h4>
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-w-xs mx-auto">
                  <div className="px-3 py-2.5 relative">
                    <button className="absolute top-2 right-2 text-gray-400 text-xs">✕</button>
                    <p className="font-semibold text-gray-900 text-xs mb-1 pr-5">위치 액세스 허용됨</p>
                    <p className="text-xs text-gray-700 mb-3">이 사이트는 위치에 액세스할 수 있습니다.</p>
                    
                    <div className="space-y-2">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <span className="w-3.5 h-3.5 mt-0.5 rounded-full border-2 border-purple-600 bg-purple-600 flex items-center justify-center flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        </span>
                        <span className="text-xs text-gray-800">이 사이트의 위치 액세스 계속 허용</span>
                      </label>
                      
                      <label className="flex items-start gap-2 cursor-pointer">
                        <span className="w-3.5 h-3.5 mt-0.5 rounded-full border-2 border-gray-400 flex-shrink-0"></span>
                        <span className="text-xs text-gray-500">https://aiga.kormedi.com의 위치 액세스 항상 차단</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end px-3 pb-3">
                    <button className="px-4 py-1.5 bg-purple-600 text-white text-xs font-semibold rounded-full">
                      완료
                    </button>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-gray-600">• 보라색 라디오 버튼 (#7C3AED)</p>
                  <p className="text-xs text-gray-600">• 상단 우측 X 버튼으로 닫기 가능</p>
                  <p className="text-xs text-gray-600">• 데모에서 쓰는 저장 이름: <code className="bg-gray-100 px-1 rounded">aiga_location_permission</code> (개발 문서용 표기)</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-pink-200">
                <h4 className="text-xs font-bold text-gray-900 mb-2">⚙️ 동작 로직</h4>
                <Table
                  headers={['사용자 선택', '동작']}
                  rows={[
                    ['허용 선택 + 완료', 'GPS 좌표 획득 → 거리 재계산 → "거리순" 정렬 자동 적용'],
                    ['차단 선택 + 완료', '거리 정보 없이 표시, "거리순" 정렬 버튼 비활성화'],
                    ['GPS 실패 시', '서울시청 좌표(37.5665, 126.978)로 폴백 처리'],
                    ['X 버튼 클릭', '모달 닫기 (선택 저장 안 함)'],
                  ]}
                />
              </div>
            </div>
          </div>

          <Table
            headers={['상황', '처리 방식', '비고']}
            rows={[
              ['최초 진입 (권한 미결정)', '위치 권한 요청 모달 표시', '✅ 구현 완료'],
              ['권한 허용', '내 위치 기준 거리 계산. 정렬이 \"거리순\"으로 자동 전환', '✅ 구현 완료'],
              ['권한 거부', '거리 정보 미표시. 기본 정렬(환자 경험순) 유지', '✅ 구현 완료'],
              ['거리순 정렬 선택 (권한 없음)', '위치 권한 요청 모달 재표시', '✅ 구현 완료'],
              ['재진입 시', '이전 응답 기억 — 다시 묻지 않고 바로 처리', '✅ 구현 완료'],
            ]}
          />

          {/* Aiga 챗봇에서 진입한 경우 */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-black text-blue-700 bg-blue-100 px-2.5 py-1 rounded-lg">🤖 Aiga 챗봇에서 진입한 경우</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 mb-3">
              <p className="text-xs text-blue-900">챗봇도 위치 기반 서비스(근처 병원 추천)를 제공합니다. 챗봇에서 이미 위치 권한을 처리한 사용자는 명의찾기 진입 시 <strong>중복으로 묻지 않으며</strong>, 이전 응답이 그대로 이어집니다.</p>
            </div>

            <h4 className="text-xs font-bold text-gray-900 mb-2">✅ 챗봇에서 이미 위치 동의를 한 경우</h4>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
              <Table
                headers={['상황', '처리 방식']}
                rows={[
                  ['명의찾기 진입 시', '위치 권한 팝업 미표시 — 바로 서비스 시작'],
                  ['의사 카드', '병원까지의 거리 즉시 표시 (N.Nkm)'],
                  ['정렬 기준', '거리순으로 자동 전환'],
                ]}
              />
            </div>

            <h4 className="text-xs font-bold text-gray-900 mb-2">❌ 챗봇에서 위치 동의를 하지 않은 (또는 거부한) 경우</h4>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <Table
                headers={['상황', '처리 방식']}
                rows={[
                  ['챗봇에서 아직 응답 안 한 경우', '명의찾기 진입 시 위치 권한 팝업 표시 — 여기서 허용/거부 선택'],
                  ['팝업에서 허용', '거리 표시 시작. 거리순 정렬 자동 전환'],
                  ['팝업에서 거부', '거리 정보 미표시. 기본 정렬(환자 경험순) 유지'],
                  ['챗봇에서 명시적으로 거부한 경우', '명의찾기에서도 팝업 미표시. 거리 정보 미표시. 기본 정렬 유지'],
                ]}
              />
              <div className="mt-2 p-2 bg-amber-100 rounded-lg">
                <p className="text-[10px] text-amber-800 font-bold">💡 거부 이력 처리 원칙</p>
                <p className="text-[10px] text-amber-700 mt-0.5">챗봇에서 한 번 거부했다면, 명의찾기에서 다시 묻지 않습니다. 단, 사용자가 직접 거리순 정렬을 선택하는 시점에는 재요청합니다.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ───── 4. 공통 컴포넌트 연계 ───── */}
        <Section id="common" title="4. 공통 컴포넌트 연계" color="indigo">
          <p className="text-xs text-gray-500 mb-3">
            아래 팝업·컴포넌트는 명의찾기 화면에서도 사용되며, 상세 스펙은{' '}
            <SpecDocLink to="commonModals">공통 문서</SpecDocLink>에 정의되어 있습니다.
          </p>
          <div className="space-y-2">
            {[
              { name: '의사 프로필 상세 팝업', trigger: '의사 카드 터치 시', desc: '프로필·경력·학력·AI 소셜리뷰·리뷰쓰기 포함' },
              { name: '로그인 유도 안내', trigger: '비회원이 즐겨찾기 버튼 터치 시', desc: '로그인 필요 안내 + 로그인 버튼' },
              { name: '리뷰 작성 팝업', trigger: '의사 프로필 팝업 내 리뷰쓰기 버튼 터치 (회원만)', desc: '공통 리뷰 작성 컴포넌트' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-indigo-100 rounded-lg px-3 py-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-indigo-900">{item.name}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">진입: {item.trigger}</p>
                    <p className="text-[10px] text-gray-500">{item.desc}</p>
                  </div>
                  <SpecDocLink
                    to="commonModals"
                    className="text-[10px] text-indigo-600 hover:text-indigo-800 whitespace-nowrap flex-shrink-0"
                  >
                    공통 문서 →
                  </SpecDocLink>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-indigo-900 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2 mt-2">
            👉 &quot;로그인 유도 안내&quot;에서 로그인(가입) 버튼 탭 시 이후의 진행 흐름은{' '}
            <SpecDocLink to="mypageOverview">마이페이지 화면정의서</SpecDocLink>에 정리된 [공통 로그인/회원가입 플로우 정책]을 공통으로
            따름.
          </p>
        </Section>

        {/* ───── 5. 비회원(Base) 기준 기능 요약 ───── */}
        <Section id="auth" title="5. 비회원(Base) 기준 기능 요약" color="emerald">
          {/* 🆕 비회원 사용량 제한 추가 */}
          <div id="doctor-spec-guest-usage" className="scroll-mt-36 bg-pink-50 border-2 border-pink-400 rounded-xl px-4 py-3 mb-4">
            <h3 className="text-sm font-black text-pink-900 mb-3">🆕 비회원 사용량 제한</h3>
            <p className="text-xs text-pink-900 bg-white/80 border border-pink-200 rounded-lg px-3 py-2 mb-3 leading-relaxed">
              <strong>전역 통합:</strong> 아래 검색·프로필·게시글 열람 한도는 <strong>명의 찾기 탭만의 독립 카운터가 아닙니다.</strong> 홈 탭, 통합 검색 전체 창, 커뮤니티 탭과 <strong>같은 남은 횟수</strong>를 씁니다(프로토타입: 이 브라우저에 저장). 어느 화면에서든 1회를 쓰면 모든 화면의 잔여 횟수·배너·잠금 안내에 같이 반영됩니다.
            </p>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-pink-200">
                <h4 className="text-xs font-bold text-gray-900 mb-2">📊 사용량 한도</h4>
                <Table
                  headers={['항목', '한도', '초기화 시점']}
                  rows={[
                    ['검색 실행', '하루 3회', '매일 자정 (00:00) — 통합 검색과 동일 카운트'],
                    ['프로필 조회', '하루 3회', '매일 자정 (00:00) — 홈·통합검색 등 프로필 열람과 동일 카운트'],
                    ['게시글 본문 열람', '하루 5회', '매일 자정 (00:00) — 홈·커뮤니티·통합검색 글 상세와 동일 카운트'],
                  ]}
                />
              </div>

              <div className="bg-white rounded-lg p-3 border border-pink-200">
                <h4 className="text-xs font-bold text-gray-900 mb-2">⚠️ 경고 배너 (1회 남았을 때)</h4>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">⚠️</span>
                      <span className="text-amber-700">오늘 무료 검색 <strong>1회</strong> 남았어요</span>
                    </div>
                    <button className="text-blue-500 text-xs font-medium">가입하기</button>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">• 위치: 검색 결과 목록 최상단</p>
                <p className="text-xs text-gray-600">• 표시 조건: 남은 횟수가 1회일 때만</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-pink-200">
                <h4 className="text-xs font-bold text-gray-900 mb-2">🔒 한도 소진 배너 (0회 남았을 때)</h4>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span>🔒</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium mb-0.5">오늘 무료 검색을 모두 사용했어요</p>
                      <p className="text-gray-500 text-[10px] mb-2">내일 자정에 초기화돼요</p>
                      <button className="text-blue-600 text-xs">지금 가입하면 바로 이용 가능 →</button>
                    </div>
                    <span className="text-[10px] text-amber-600 bg-amber-100 rounded-full px-2 py-0.5">3회/일</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">• 위치: 검색 결과 목록 최상단</p>
                <p className="text-xs text-gray-600">• 표시 조건: 남은 횟수가 0회일 때</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-pink-200">
                <h4 className="text-xs font-bold text-gray-900 mb-2">🔒 검색창 잠금 상태 (검색 한도 소진 시)</h4>
                <div className="space-y-2">
                  <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-400 text-xs">
                    🔍 질환명, 병원명, 의사 이름 검색
                  </div>
                  <p className="text-xs text-gray-600">• 검색창이 비활성화 상태 (회색 처리)</p>
                  <p className="text-xs text-gray-600">• 클릭 시 → 한도 초과 모달 팝업</p>
                  <p className="text-xs text-gray-600">• 연관검색어 드롭다운 숨김</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-pink-200">
                <h4 className="text-xs font-bold text-gray-900 mb-2">📱 한도 초과 모달</h4>
                <div className="bg-white border-2 border-blue-400 rounded-xl overflow-hidden max-w-xs mx-auto">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xs">🔒</span>
                      <span className="font-bold text-white text-xs">검색 한도 초과</span>
                    </div>
                    <span className="text-white text-xs">✕</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <span>🔒</span>
                      </div>
                      <p className="text-gray-900 font-semibold text-xs">오늘 무료 검색을 모두 사용했어요</p>
                      <p className="text-[10px] text-gray-600">비회원은 하루 3회까지 검색할 수 있어요</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 space-y-1">
                      <p className="text-[10px] font-semibold text-blue-900">회원가입하면 더 많은 기능을!</p>
                      <div className="text-[10px] text-blue-700 space-y-0.5">
                        <p>✓ 의사 프로필 무제한 저장</p>
                        <p>✓ 리뷰 작성 및 공유</p>
                        <p>✓ AI 챗봇 더 많은 대화</p>
                        <p>✓ 대화 이력 영구 저장</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <button className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg text-xs">
                        카카오톡으로 3초 만에 시작
                      </button>
                      <button className="w-full bg-green-600 text-white font-bold py-2 rounded-lg text-xs">
                        네이버로 시작하기
                      </button>
                      <button className="w-full text-[10px] text-gray-500 py-1">나중에 하기</button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-indigo-900 bg-indigo-50 border border-indigo-200 rounded-lg px-2.5 py-2 mt-2">
                  👉 위 모달 내 가입·로그인 관련 버튼 탭 시 이후의 진행 흐름은{' '}
                  <SpecDocLink to="mypageOverview">마이페이지 화면정의서</SpecDocLink>에 정리된 [공통 로그인/회원가입 플로우 정책]을
                  공통으로 따름.
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-gray-600">• <strong>검색 한도 초과 시</strong>: 검색창 클릭 → 모달 팝업</p>
                  <p className="text-xs text-gray-600">• <strong>프로필 한도 초과 시</strong>: 의사 카드 클릭 → 모달 팝업</p>
                  <p className="text-xs text-gray-600">• 모달 내용은 한도 타입에 따라 문구 변경</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-pink-200">
                <h4 className="text-xs font-bold text-gray-900 mb-2">🔐 프로필 조회 제한</h4>
                <Table
                  headers={['상황', '동작']}
                  rows={[
                    ['프로필 조회 횟수 남음', '의사 카드 클릭 → 프로필 모달 오픈 → 조회 횟수 1 차감'],
                    ['프로필 조회 횟수 소진', '의사 카드 클릭 → 한도 초과 모달 팝업 (프로필 미노출)'],
                    ['카드 UI', '잠금 표시 없음 (클릭 시점에만 제한 적용)'],
                  ]}
                />
              </div>
            </div>
          </div>

          <Table
            headers={['기능', '비회원(Base)', '비고']}
            rows={[
              ['검색 · 필터링', '✅ 가능 (하루 3회)', '검색 실행 시 횟수 차감 — 통합 검색·홈 등과 전역 동일 카운터'],
              ['의사 카드 목록 열람', '✅ 가능', '—'],
              ['의사 프로필 상세 열람', '✅ 가능 (하루 3회)', '카드 클릭 시 횟수 차감 — 홈·통합검색 등과 전역 동일 카운터'],
              ['AI 소셜리뷰 확인', '✅ 가능', '—'],
              ['다른 환자 리뷰 읽기', '✅ 가능', '—'],
              ['의사 즐겨찾기', '❌ 로그인 유도', '회원 확장 기능'],
              ['리뷰쓰기', '❌ 로그인 유도', '회원 확장 기능'],
              ['거리 정보 표시', '위치 권한에 따라', 'GPS 권한 기준'],
            ]}
          />
          <p className="text-xs text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 mt-2">
            회원전용 확장은 회원 탭(
            <SpecDocLink to="doctorMemberDelta">DoctorSearchSpecBiz</SpecDocLink>)에서만 관리합니다.
          </p>
        </Section>

      </div>
    </div>
  );
}

/* ─── 재사용 컴포넌트 ─── */

function Section({ id, title, color, children }: { id: string; title: string; color: string; children: React.ReactNode }) {
  const borderColors: Record<string, string> = {
    teal: 'border-teal-500',
    cyan: 'border-cyan-500',
    sky: 'border-sky-500',
    indigo: 'border-indigo-500',
    emerald: 'border-emerald-500',
    rose: 'border-rose-500',
  };
  const bgColors: Record<string, string> = {
    teal: 'bg-teal-50 text-teal-900',
    cyan: 'bg-cyan-50 text-cyan-900',
    sky: 'bg-sky-50 text-sky-900',
    indigo: 'bg-indigo-50 text-indigo-900',
    emerald: 'bg-emerald-50 text-emerald-900',
    rose: 'bg-rose-50 text-rose-900',
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

function SubSection({
  label,
  title,
  children,
  specAnchorId,
  tagCode,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  specAnchorId?: string;
  tagCode?: string;
}) {
  return (
    <div
      id={specAnchorId}
      className={`bg-white rounded-lg border border-gray-200 p-3.5 ${specAnchorId ? 'scroll-mt-32' : ''}`}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {tagCode && (
          <span
            className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
            title="데모 화면과 동일 번호"
          >
            {tagCode}
          </span>
        )}
        <span className="bg-gray-800 text-white text-xs font-bold px-2 py-0.5 rounded flex-shrink-0">{label}</span>
        <h3 className="text-sm font-bold text-gray-900 truncate">{title}</h3>
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