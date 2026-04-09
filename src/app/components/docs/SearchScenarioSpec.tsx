// 통합 검색 모달 화면정의서 — 공통 컴포넌트 (명의찾기·커뮤니티·홈 탭 공통)

import React from 'react';

interface SearchScenarioSpecProps {
  onTestSearch?: (keyword: string) => void;
}

/* ─── 재사용 UI ─── */
function SectionHeader({ emoji, title, color = 'violet' }: { emoji: string; title: string; color?: string }) {
  const borderMap: Record<string, string> = {
    violet: 'border-violet-400',
    teal:   'border-teal-400',
    blue:   'border-blue-400',
    amber:  'border-amber-400',
    purple: 'border-purple-400',
    gray:   'border-gray-300',
    rose:   'border-rose-400',
  };
  return (
    <div className={`flex items-center gap-2 pb-2 mb-4 border-b-2 ${borderMap[color] ?? borderMap.violet}`}>
      <span className="text-base">{emoji}</span>
      <span className="text-sm font-black text-gray-900">{title}</span>
    </div>
  );
}

function SpecRow({ label, value, sub, isNew, isModified }: { 
  label: string; 
  value: React.ReactNode; 
  sub?: string;
  isNew?: boolean;
  isModified?: boolean;
}) {
  return (
    <div className={`flex gap-3 py-2 border-b border-gray-100 last:border-0 ${isNew ? 'bg-pink-50' : ''}`}>
      <span className={`text-xs w-28 flex-shrink-0 pt-0.5 ${isModified ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
        {label}
      </span>
      <div className="flex-1">
        <span className={`text-xs ${isModified ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>{value}</span>
        {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function Tag({ children, color = 'gray' }: { children: React.ReactNode; color?: string }) {
  const cls: Record<string, string> = {
    teal:   'bg-teal-50 text-teal-700',
    blue:   'bg-blue-50 text-blue-700',
    purple: 'bg-purple-50 text-purple-700',
    amber:  'bg-amber-50 text-amber-700',
    gray:   'bg-gray-100 text-gray-700',
    violet: 'bg-violet-50 text-violet-700',
    green:  'bg-green-50 text-green-700',
    red:    'bg-red-50 text-red-700',
  };
  return (
    <span className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded ${cls[color] ?? cls.gray}`}>
      {children}
    </span>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-[11px] text-amber-800 leading-relaxed">
      {children}
    </div>
  );
}

function StateCard({ title, condition, ui, sub, color = 'gray', isNew }: {
  title: string; condition: string; ui: string; sub?: string; color?: string; isNew?: boolean;
}) {
  const borderMap: Record<string, string> = {
    blue:   'border-blue-200 bg-blue-50/40',
    teal:   'border-teal-200 bg-teal-50/40',
    gray:   'border-gray-200 bg-white',
    violet: 'border-violet-200 bg-violet-50/40',
    amber:  'border-amber-200 bg-amber-50/40',
  };
  return (
    <div className={`border rounded-xl p-3.5 ${isNew ? 'bg-pink-50 border-pink-400' : borderMap[color] ?? borderMap.gray}`}>
      <p className="text-xs font-bold text-gray-900 mb-1.5">{title}</p>
      <div className="space-y-1">
        <div className="flex gap-2">
          <span className="text-[11px] text-gray-400 w-10 flex-shrink-0">조건</span>
          <span className="text-[11px] text-gray-700">{condition}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[11px] text-gray-400 w-10 flex-shrink-0">UI</span>
          <span className="text-[11px] text-gray-700">{ui}</span>
        </div>
        {sub && (
          <div className="flex gap-2">
            <span className="text-[11px] text-gray-400 w-10 flex-shrink-0">비고</span>
            <span className="text-[11px] text-gray-500">{sub}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── 메인 컴포넌트 ─── */
export function SearchScenarioSpec({ onTestSearch }: SearchScenarioSpecProps) {

  const scenarios = [
    { label: '질환 검색',   keyword: '간암',      expects: ['명의', '게시글'], desc: '간암 전문 명의 + 관련 게시글', branch: 'isDiseaseQuery', status: '✅' },
    { label: '병원 검색',   keyword: '서울아산병원', expects: ['병원', '게시글'], desc: '병원 카드 + 관련 게시글', branch: 'isHospitalQuery', status: '✅' },
    { label: 'Alias 확장', keyword: '허리디스크', expects: ['명의', '게시글'], desc: '척추/디스크 명의 + 경험담 게시글', branch: 'isDiseaseQuery', status: '✅' },
    { label: '진료과 검색', keyword: '소화기내과', expects: ['명의', '게시글'], desc: '소화기내과 전문 명의', branch: 'isDiseaseQuery', status: '✅' },
    { label: '병원 검색 2', keyword: '세브란스',   expects: ['병원', '게시글'], desc: '세브란스 병원 + 게시글', branch: 'isHospitalQuery', status: '✅' },
    { label: '증상어 감지', keyword: '배가 아파요', expects: [],                desc: 'Aiga 챗봇 연결 화면 — 검색 결과 미표시', branch: 'isSymptomQuery', status: '✅' },
  ];

  const branchColor: Record<string, string> = {
    isSymptomQuery:  'blue',
    isHospitalQuery: 'teal',
    isDiseaseQuery:  'violet',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-7">

        {/* ── 문서 헤더 ── */}
        <div className="bg-gradient-to-br from-violet-50 to-amber-50 border-2 border-violet-200 rounded-2xl p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🔎</span>
                <p className="text-base font-black text-violet-900">통합 검색 모달</p>
              </div>
              <p className="text-xs text-violet-600">공통 컴포넌트 · GlobalSearchModal</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[10px] font-bold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">공통</span>
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">UI 스펙</span>
              <span className="text-[10px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">v0.6</span>
            </div>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            홈·명의 찾기·커뮤니티에서 <strong>반응형 웹 메인 뷰 우상단 고정 돋보기</strong>로 진입하는 전역 검색 모달입니다.
            <strong> UI/UX·분기·레이아웃</strong>을 정의하며, 프로토타입의 검색 대상 데이터는 <strong>더미</strong>입니다. 실서비스는 API·인덱스에 따릅니다.
          </p>
        </div>

        {/* ── 1. 개요 ── */}
        <section>
          <SectionHeader emoji="📋" title="1. 개요" color="violet" />
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
            <SpecRow label="컴포넌트명"   value={<code className="text-violet-700 bg-violet-50 px-1.5 py-0.5 rounded text-[11px]">GlobalSearchModal</code>} />
            <SpecRow label="배치 탭"      value={
              <div className="flex gap-1.5 flex-wrap">
                <Tag color="violet">홈</Tag>
                <Tag color="teal">명의찾기</Tag>
                <Tag color="purple">커뮤니티</Tag>
                <span className="text-[11px] text-gray-400">· Chat·My 탭 제외</span>
              </div>
            } />
            <SpecRow label="진입 방식"    value="각 탭에서 반응형 웹 메인 뷰 우상단 고정 돋보기 탭" sub="프로토타입: home · search · community 탭에서 노출" />
            <SpecRow label="표시 방식"    value="앱 화면 영역 위 풀스크린 오버레이(어두운 딤 + 모달)" sub="z-index로 탭바 위까지 덮는 UX 목표" />
            <SpecRow label="닫기"         value="취소 버튼 탭 · ESC 키 · 검색 결과 항목 이동 시 자동 닫힘" />
            <SpecRow label="검색 범위"    value={
              <div className="flex gap-1.5 flex-wrap">
                <Tag color="teal">명의</Tag>
                <Tag color="blue">병원</Tag>
                <Tag color="purple">커뮤니티 게시글</Tag>
              </div>
            } />
            <SpecRow label="데이터 (프로토타입)"  value="명의·병원·게시글 샘플 집합으로 시연" sub="실서비스: 검색 API·인덱스 — 본 문서는 결과 UI·한도·분기 패턴만 규정" />
          </div>
        </section>

        {/* ── 2. UI 구조 ── */}
        <section>
          <SectionHeader emoji="🧩" title="2. UI 구조" color="teal" />

          {/* 헤더 영역 */}
          <p className="text-xs font-bold text-gray-700 mb-2">헤더 영역 (sticky)</p>
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 mb-4">
            <SpecRow label="돋보기 아이콘"  value="lucide-react Search · w-5 h-5 · text-gray-400 · flex-shrink-0" />
            <SpecRow label="텍스트 입력창"  value='placeholder="명의, 병원, 질환, 게시글 검색" · 자동 포커스 (open 후 80ms)' />
            <SpecRow label="자동완성"       value="입력 포커스 + 마지막 단어 존재 시 SearchSuggestions 드롭다운 표시" sub="선택 시 마지막 단어를 해당 제안어로 교체" />
            <SpecRow label="X 버튼"         value="query 존재 시 노출 · 탭 시 입력 초기화" />
            <SpecRow 
              label="🔒 가입하기 버튼" 
              value="검색 한도 소진 시 우측 표시 · 황색 배경 (bg-amber-50) · 탭 시 GuestLimitModal 오픈" 
              isNew
            />
            <SpecRow label="취소 버튼"      value="탭 시 모달 닫기 (onClose)" />
          </div>

          {/* 🆕 사용량 배너 (비회원 전용) */}
          <div className="bg-pink-50 border-2 border-pink-400 rounded-xl p-4 mb-4">
            <p className="text-xs font-bold text-pink-900 mb-2">🆕 사용량 배너 (비회원 전용)</p>
            <div className="bg-white rounded-xl border border-pink-200 divide-y divide-pink-100">
              <SpecRow label="위치" value="검색 헤더 바로 아래 고정" isNew />
              <SpecRow label="컴포넌트" value="UsageLimitBanner (types=['search'])" isNew />
              <SpecRow label="경고 배너" value="⚠️ 오늘 무료 검색 1회 남았어요 [가입하기]" sub="잔여 1회일 때 황색 배경으로 표시" isNew />
              <SpecRow label="한도 소진 배너" value="🔒 오늘 무료 검색을 모두 사용했어요 · 내일 자정에 초기화 · 3회/일" sub="잔여 0회일 때 표시" isNew />
            </div>
          </div>

          {/* 🆕 탭 바 */}
          <div className="bg-pink-50 border-2 border-pink-400 rounded-xl p-4 mb-4">
            <p className="text-xs font-bold text-pink-900 mb-2">🆕 탭 바 (결과 있을 때만 표시)</p>
            <div className="bg-white rounded-xl border border-pink-200 divide-y divide-pink-100">
              <SpecRow label="표시 조건" value="query 존재 + !isSymptomQuery + totalCount > 0" isNew />
              <SpecRow label="탭 구성" value={
                <div className="flex gap-1.5">
                  <Tag color="teal">명의 (N명)</Tag>
                  <Tag color="blue">병원 (N개)</Tag>
                  <Tag color="purple">커뮤니티 (N개)</Tag>
                </div>
              } sub="결과 있는 탭만 동적으로 표시" isNew />
              <SpecRow label="선택 상태" value="파란색 텍스트 (text-blue-600) · 하단 파란 바 (bg-blue-600 h-0.5)" isNew />
              <SpecRow label="자동 전환" value="검색어 입력 시 결과 있는 첫 번째 탭으로 자동 이동" isNew />
            </div>
          </div>

          {/* 바디 영역 — 수정됨 */}
          <p className="text-xs font-bold text-gray-700 mb-2">
            바디 영역 (flex-1 overflow-y-auto) 
            <span className="ml-2 text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded-full">수정됨</span>
          </p>
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 mb-4">
            <SpecRow label="Aiga 배너"      value="isDiseaseQuery 시 결과 최상단 고정 노출 · 탭 시 ChatPage 이동 + 모달 닫기" />
            <SpecRow 
              label="명의 탭" 
              value="10개씩 무한 스크롤 · Intersection Observer · 로딩 스피너" 
              sub="하단 '명의찾기 페이지에서 더 보기' 버튼"
              isModified
            />
            <SpecRow 
              label="병원 탭" 
              value="10개씩 무한 스크롤 · Intersection Observer · 로딩 스피너" 
              sub="하단 '소속 명의 보기' 버튼 항상 노출"
              isModified
            />
            <SpecRow 
              label="커뮤니티 탭" 
              value="10개씩 무한 스크롤 · Intersection Observer · 로딩 스피너" 
              sub="하단 '커뮤니티 페이지에서 더 보기' 버튼"
              isModified
            />
            <SpecRow 
              label="무한 스크롤" 
              value="PAGE_SIZE = 10 · 하단 sentinel 도달 시 10개씩 추가 로드" 
              isModified
            />
          </div>

          {/* 서브 모달 */}
          <p className="text-xs font-bold text-gray-700 mb-2">서브 모달 (결과 항목 탭 시)</p>
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
            <SpecRow label="명의 탭"   value="DoctorProfileModal — 명의 프로필 상세" sub="비회원: 프로필 조회 횟수 차감 (하루 3회)" />
            <SpecRow label="병원 탭"   value="HospitalCardModal — 병원 정보 + 소속 명의" sub="사용량 제한 없음" />
            <SpecRow label="게시글 탭" value="CommunityPostModal — 게시글 본문 상세" sub="비회원: 게시글 열람 횟수 차감 (하루 5회). 회원: 게시글 공감 토글(재탭 취소). 검색어(q) 변경 시 세션 내 공감 오버라이드 초기화" />
          </div>
        </section>

        {/* ── 3. 화면 상태 ── */}
        <section>
          <SectionHeader emoji="📺" title="3. 화면 상태" color="blue" />
          <p className="text-xs text-red-600 font-semibold mb-2">🔴 수정: 4종 → 5종 (한도 차단 상태 추가)</p>
          <div className="space-y-2.5">
            <StateCard
              color="gray"
              title="① Empty State — 검색어 없음"
              condition="query = '' (초기 진입 또는 X 버튼으로 초기화)"
              ui="Aiga 안내 배너 노출 ('증상이 있으신가요? · 질문하기' 버튼)"
              sub="ChatPage 연동 시에만 표시"
            />
            <StateCard
              color="blue"
              title="② 증상어 감지 화면"
              condition="isSymptomQuery = true (동사 어미 또는 증상 명사 감지)"
              ui="Bot 아이콘 + 안내 문구 + 'Aiga에게 질문하기' 버튼 · 검색 결과 미표시"
              sub="탭 시 ChatPage 이동 · 초기 메시지 = 입력 쿼리"
            />
            <StateCard
              color="gray"
              title="③ 결과 없음"
              condition="query 존재 + isSymptomQuery = false + totalCount = 0"
              ui="SearchX 아이콘 + '결과 없음' 문구 + Aiga 챗봇 유도 카드"
            />
            <StateCard
              color="teal"
              title="④ 검색 결과"
              condition="query 존재 + isSymptomQuery = false + totalCount > 0"
              ui="탭 바 + [Aiga 배너] + 선택된 탭 결과 (무한 스크롤)"
              sub="탭별로 명의/병원/커뮤니티 결과 표시"
            />
            <StateCard
              color="amber"
              title="🆕 ⑤ 한도 차단 화면 (비회원 전용)"
              condition="effectivelyBlocked = true (검색 한도 0회)"
              ui="중앙 Lock 아이콘 + '오늘 무료 검색을 모두 사용했어요' + 회원가입 버튼"
              sub="검색창 readOnly 상태 · 우측 🔒 가입하기 버튼 표시"
              isNew
            />
          </div>
        </section>

        {/* ── 4. 검색어 분류 로직 ── */}
        <section>
          <SectionHeader emoji="🔀" title="4. 검색어 분류 로직 (상호 배타적 3단계)" color="amber" />

          <div className="space-y-2.5 mb-4">
            {/* 1순위 */}
            <div className="border-2 border-blue-200 bg-blue-50/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[11px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">1순위</span>
                <span className="text-sm font-bold text-blue-900">isSymptomQuery — 증상어</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-blue-900">
                <p><span className="font-semibold">감지 방식 ①</span> — 동사 어미로 끝나는 경우</p>
                <p className="text-blue-700 pl-2">아요·어요·해요·아파요·아픔·아프다·있어요·없어요·심해요·납니다·습니다·ㅂ니다·이에요·예요·느껴요·합니다·힘들어요</p>
                <p><span className="font-semibold">감지 방식 ②</span> — 증상 명사 포함 (공백 포함 복합어)</p>
                <p className="text-blue-700 pl-2">기침·두통·발열·열감·복통·구역질·구토·설사·변비·어지럼·피로감·불면증·가려움·부종·저림·이명·흉통·혈뇨·혈변·오한·호흡곤란·소화불량·식욕부진·체중감소·관절통·근육통</p>
                <p className="font-semibold mt-2">→ 결과: 증상어 감지 화면 (Aiga 챗봇 연결, 검색 결과 미표시)</p>
              </div>
            </div>

            {/* 2순위 */}
            <div className="border-2 border-teal-200 bg-teal-50/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[11px] font-bold bg-teal-600 text-white px-2 py-0.5 rounded-full">2순위</span>
                <span className="text-sm font-bold text-teal-900">isHospitalQuery — 병원명</span>
              </div>
              <div className="space-y-1 text-[11px] text-teal-900">
                <p><span className="font-semibold">조건</span> — ALL_HOSPITALS 내 병원명에 입력어가 포함(includes)되는 경우</p>
                <p><span className="font-semibold">데이터</span> — DOCTORS DB에서 hospital 필드 집계 (buildHospitalList)</p>
                <p className="font-semibold mt-1">→ 결과: 병원 탭 + 커뮤니티 탭</p>
              </div>
            </div>

            {/* 3순위 */}
            <div className="border-2 border-violet-200 bg-violet-50/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[11px] font-bold bg-violet-600 text-white px-2 py-0.5 rounded-full">3순위</span>
                <span className="text-sm font-bold text-violet-900">isDiseaseQuery — 질환명/의사명</span>
              </div>
              <div className="space-y-1 text-[11px] text-violet-900">
                <p><span className="font-semibold">조건</span> — 위 2개 미해당 + 명의 검색 결과 존재 + 질환명·태그 매칭</p>
                <p><span className="font-semibold">검색 필드</span> — name · hospital · specialty · diseaseArea · tags</p>
                <p className="font-semibold mt-1">→ 결과: 명의 탭 + Aiga 배너 + 커뮤니티 탭</p>
              </div>
            </div>
          </div>

          {/* Alias 확장 */}
          <p className="text-xs font-bold text-gray-700 mb-2">⚡ Alias 확장 — 동의어 처리</p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-3">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {['입력어', '확장 검색어', '목적'].map((h) => (
                    <th key={h} className="px-3 py-2 text-left font-bold text-gray-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['허리디스크', '디스크, 척추', '비표준 표현 → 표준 질환명 매핑'],
                  ['목디스크',   '디스크, 척추', '비표준 표현 → 표준 질환명 매핑'],
                  ['요추',       '척추, 디스크', '의학 용어 → 통용 표현 확장'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-3 py-2 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Note>
            Alias 확장은 마지막 단어 기준이 아닌 <strong>전체 쿼리 기준</strong>으로 동작합니다 (getSearchTerms 함수).
            향후 관리 편의를 위해 별도 config 파일로 분리 검토 필요.
          </Note>
        </section>

        {/* ── 5. 결과 영역 상세 ── */}
        <section>
          <SectionHeader emoji="📊" title="5. 결과 영역 상세 스펙" color="purple" />

          {/* 명의 탭 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Tag color="teal">명의 탭</Tag>
              <span className="text-[11px] text-gray-400">isHospitalQuery = false 일 때만 노출</span>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
              <SpecRow label="아이콘"       value="lucide-react User · text-teal-600" />
              <SpecRow label="카드 구성"    value="프로필 이미지(w-10 h-10 rounded-full) · 이름 · 병원명·전문과 · 태그 최대 3개" />
              <SpecRow 
                label="하이라이트" 
                value={
                  <span>
                    검색어 일치 부분 <span className="bg-yellow-100 text-yellow-800 rounded px-1">노란색 배경</span> (bg-yellow-100 text-yellow-800)
                  </span>
                } 
                isNew
              />
              <SpecRow 
                label="카드 클릭" 
                value="DoctorProfileModal 오픈 · 비회원은 프로필 조회 횟수 차감 (consumeProfileView)" 
                sub="한도 소진 시 GuestLimitModal 팝업"
                isNew
              />
              <SpecRow 
                label="무한 스크롤" 
                value="10개씩 로드 · 하단 sentinel 도달 시 10개 추가" 
                sub="모두 로드 완료 시 '명의 N명 모두 표시됨' 문구"
                isModified
              />
              <SpecRow 
                label="페이지 이동" 
                value="명의찾기 페이지에서 더 보기 → DoctorSearchPage 이동 + 검색어 전달 + 모달 닫기" 
                isNew
              />
            </div>
          </div>

          {/* 병원 탭 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Tag color="blue">병원 탭</Tag>
              <span className="text-[11px] text-gray-400">isHospitalQuery = true 일 때만 노출</span>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
              <SpecRow label="아이콘"       value="lucide-react Building2 · text-blue-600" />
              <SpecRow label="카드 구성"    value="병원 아이콘(w-10 h-10 rounded-xl bg-blue-50) · 병원명 · 소속 명의 수 · 전문과 태그" />
              <SpecRow 
                label="하이라이트" 
                value={
                  <span>
                    병원명 검색어 일치 부분 <span className="bg-yellow-100 text-yellow-800 rounded px-1">노란색 배경</span>
                  </span>
                } 
                isNew
              />
              <SpecRow label="카드 클릭"      value="HospitalCardModal 오픈 (사용량 제한 없음)" />
              <SpecRow 
                label="무한 스크롤" 
                value="10개씩 로드 · 하단 sentinel 도달 시 10개 추가" 
                sub="모두 로드 완료 시 '병원 N개 모두 표시됨' 문구"
                isModified
              />
            </div>
          </div>

          {/* 커뮤니티 탭 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Tag color="purple">커뮤니티 탭</Tag>
              <span className="text-[11px] text-gray-400">query 존재 + !isSymptomQuery 시 항상 병행 노출</span>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
              <SpecRow label="아이콘"       value="lucide-react MessageCircle · text-purple-400" />
              <SpecRow label="카드 구성"    value="아이콘(w-10 h-10 rounded-xl bg-purple-50) · 인증 뱃지 · 질환명 태그 · 제목 · 요약 · 좋아요/댓글/시간" />
              <SpecRow label="검색 필드"    value="title · summary · disease · department · relatedDoctors" />
              <SpecRow 
                label="카드 클릭" 
                value="CommunityPostModal 오픈 · 비회원은 게시글 열람 횟수 차감 (consumePostView)" 
                sub="한도 소진 시 GuestLimitModal 팝업"
                isNew
              />
              <SpecRow 
                label="무한 스크롤" 
                value="10개씩 로드 · 하단 sentinel 도달 시 10개 추가" 
                sub="모두 로드 완료 시 '게시글 N개 모두 확인했습니다' 문구"
                isModified
              />
              <SpecRow 
                label="페이지 이동" 
                value="커뮤니티 페이지에서 더 보기 → CommunityPage로 탭 전환 + 모달 닫기 (검색어는 커뮤니티 필터에 전달되지 않음)" 
                isNew
              />
            </div>
          </div>

          {/* Aiga 배너 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag color="blue">Aiga 배너</Tag>
              <span className="text-[11px] text-gray-400">isDiseaseQuery = true 시 결과 최상단 고정</span>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
              <SpecRow label="구성"     value="Bot 아이콘(bg-blue-600) · 'Aiga에게 {query} 질문하기' · 'AI가 맞춤 명의·병원을 추천해드려요'" />
              <SpecRow label="배경"     value="gradient from-blue-50 to-indigo-50 · border-blue-100" />
              <SpecRow label="클릭 액션"  value="ChatPage 이동 · initialMessage = 입력 쿼리 · 모달 닫기" />
            </div>
          </div>
        </section>

        {/* ── 6. 검색 아이콘 배치 ── */}
        <section>
          <SectionHeader emoji="📍" title="6. 검색 아이콘 배치 (탭별 공통)" color="gray" />
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 mb-3">
            <SpecRow label="위치"     value="absolute top-3.5 right-4 z-30 (웹 메인 레이아웃 루트 relative 기준)" sub="본문 스크롤 영역 밖 → 우상단에 고정된 것처럼 동작. 브라우저 viewport 전체 고정(fixed)은 아님" />
            <SpecRow label="크기"     value="w-9 h-9 · rounded-full" />
            <SpecRow label="스타일"   value="bg-white · shadow-sm · border-gray-200" />
            <SpecRow label="호버"     value="bg-blue-50 · border-blue-300" />
            <SpecRow label="아이콘"   value="lucide-react Search · w-4.5 h-4.5 · text-gray-500" />
            <SpecRow label="노출 탭"  value={
              <div className="flex gap-1.5">
                <Tag color="violet">홈 (home)</Tag>
                <Tag color="teal">명의찾기 (search)</Tag>
                <Tag color="purple">커뮤니티 (community)</Tag>
              </div>
            } />
            <SpecRow label="미노출 탭" value="Chat · My (검색 불필요 탭)" />
          </div>
          <Note>
            탭 전환 시 모달이 열려 있었다면 <strong>자동으로 닫힘</strong> (onTabChange 핸들러에서 handleCloseSearch 호출).
          </Note>
        </section>

        {/* 🆕 ── 8. 비회원 사용량 제한 ── */}
        <section>
          <div className="bg-pink-50 border-2 border-pink-400 rounded-xl p-5">
            <SectionHeader emoji="🔒" title="8. 비회원 사용량 제한" color="rose" />
            
            <div className="space-y-4">
              {/* 한도 정책 */}
              <div className="bg-white rounded-xl border border-pink-200 p-4">
                <p className="text-xs font-bold text-gray-900 mb-3">📊 사용량 한도</p>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-3 py-2 text-left font-bold text-gray-700">항목</th>
                        <th className="px-3 py-2 text-left font-bold text-gray-700">한도</th>
                        <th className="px-3 py-2 text-left font-bold text-gray-700">차감 시점</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b border-gray-100">
                        <td className="px-3 py-2 text-gray-900 font-medium">검색 실행</td>
                        <td className="px-3 py-2 text-gray-700">하루 3회</td>
                        <td className="px-3 py-2 text-gray-700">검색어 최초 입력 시 1회 차감</td>
                      </tr>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <td className="px-3 py-2 text-gray-900 font-medium">프로필 조회</td>
                        <td className="px-3 py-2 text-gray-700">하루 3회</td>
                        <td className="px-3 py-2 text-gray-700">명의 카드 클릭 시 1회 차감</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-3 py-2 text-gray-900 font-medium">게시글 열람</td>
                        <td className="px-3 py-2 text-gray-700">하루 5회</td>
                        <td className="px-3 py-2 text-gray-700">커뮤니티 카드 클릭 시 1회 차감</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-gray-500 mt-2">초기화: 매일 자정 (00:00)</p>
              </div>

              {/* 경고 배너 */}
              <div className="bg-white rounded-xl border border-pink-200 p-4">
                <p className="text-xs font-bold text-gray-900 mb-2">⚠️ 경고 배너 (잔여 1회)</p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-amber-500">⚠️</span>
                    <span className="text-amber-700">오늘 무료 검색 <strong>1회</strong> 남았어요</span>
                    <button className="ml-auto text-blue-600 font-medium">가입하기</button>
                  </div>
                </div>
                <p className="text-[11px] text-gray-600">• 위치: 검색 헤더 바로 아래</p>
                <p className="text-[11px] text-gray-600">• 표시 조건: searchRemaining === 1</p>
              </div>

              {/* 한도 소진 배너 */}
              <div className="bg-white rounded-xl border border-pink-200 p-4">
                <p className="text-xs font-bold text-gray-900 mb-2">🔒 한도 소진 배너 (잔여 0회)</p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-2">
                  <div className="flex items-start gap-3 text-xs">
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
                <p className="text-[11px] text-gray-600">• 위치: 검색 헤더 바로 아래</p>
                <p className="text-[11px] text-gray-600">• 표시 조건: searchRemaining === 0</p>
              </div>

              {/* 검색창 잠금 */}
              <div className="bg-white rounded-xl border border-pink-200 p-4">
                <p className="text-xs font-bold text-gray-900 mb-2">🔒 검색창 잠금 상태</p>
                <div className="space-y-2">
                  <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-400 text-xs">
                    🔍 오늘 무료 검색을 모두 사용했어요
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-600">우측 버튼:</span>
                    <button className="bg-amber-50 border border-amber-200 text-amber-600 rounded-full px-3 py-1 text-xs font-semibold">
                      🔒 가입하기
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-600">• 검색창 readOnly 상태</p>
                  <p className="text-[11px] text-gray-600">• 연관검색어 드롭다운 숨김</p>
                  <p className="text-[11px] text-gray-600">• effectivelyBlocked = searchBlocked || (isGuest && !canSearch)</p>
                </div>
              </div>

              {/* 전체 화면 차단 */}
              <div className="bg-white rounded-xl border border-pink-200 p-4">
                <p className="text-xs font-bold text-gray-900 mb-2">🚫 전체 화면 차단</p>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center mb-2">
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <p className="text-sm text-gray-900 mb-1">오늘 무료 검색을 모두 사용했어요</p>
                  <p className="text-xs text-gray-400 mb-4">내일 자정에 초기화되거나, 지금 가입하면 바로 이용할 수 있어요</p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-medium">
                    👤 회원가입 · 로그인
                  </button>
                </div>
                <p className="text-[11px] text-gray-600">• 표시 조건: effectivelyBlocked = true</p>
                <p className="text-[11px] text-gray-600">• 검색 결과 영역 전체를 대체</p>
              </div>

              {/* 카드 클릭 제한 */}
              <div className="bg-white rounded-xl border border-pink-200 p-4">
                <p className="text-xs font-bold text-gray-900 mb-3">🎯 카드 클릭 시 제한</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[11px] text-gray-500 w-20 flex-shrink-0">명의 카드</span>
                    <span className="text-[11px] text-gray-700">프로필 조회 가능 시 → DoctorProfileModal 오픈 + 횟수 차감<br/>한도 소진 시 → GuestLimitModal 팝업</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[11px] text-gray-500 w-20 flex-shrink-0">병원 카드</span>
                    <span className="text-[11px] text-gray-700">제한 없음 → HospitalCardModal 오픈</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[11px] text-gray-500 w-20 flex-shrink-0">게시글 카드</span>
                    <span className="text-[11px] text-gray-700">열람 가능 시 → CommunityPostModal 오픈 + 횟수 차감<br/>한도 소진 시 → GuestLimitModal 팝업</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🆕 ── 9. 탭 구조 + 무한 스크롤 ── */}
        <section>
          <div className="bg-pink-50 border-2 border-pink-400 rounded-xl p-5">
            <SectionHeader emoji="📑" title="9. 탭 구조 + 무한 스크롤" color="rose" />
            
            <div className="space-y-4">
              {/* 탭 구조 */}
              <div className="bg-white rounded-xl border border-pink-200 p-4">
                <p className="text-xs font-bold text-gray-900 mb-3">🗂️ 탭 구조</p>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg border-b-2 border-blue-700">명의 (N명)</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">병원 (N개)</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">커뮤니티 (N개)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-[11px]">
                  <p className="text-gray-700">• <strong>동적 표시</strong>: 결과 있는 탭만 표시</p>
                  <p className="text-gray-700">• <strong>자동 전환</strong>: 검색어 입력 시 결과 있는 첫 탭으로 이동</p>
                  <p className="text-gray-700">• <strong>선택 상태</strong>: 파란색 텍스트 + 하단 파란 바 (h-0.5 bg-blue-600)</p>
                  <p className="text-gray-700">• <strong>카운트 배지</strong>: 각 탭 우측에 결과 수 표시</p>
                </div>
              </div>

              {/* 무한 스크롤 */}
              <div className="bg-white rounded-xl border border-pink-200 p-4">
                <p className="text-xs font-bold text-gray-900 mb-3">♾️ 무한 스크롤</p>
                <div className="overflow-x-auto rounded-lg border border-gray-200 mb-3">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-3 py-2 text-left font-bold text-gray-700">항목</th>
                        <th className="px-3 py-2 text-left font-bold text-gray-700">값</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b border-gray-100">
                        <td className="px-3 py-2 text-gray-900 font-medium">초기 로드</td>
                        <td className="px-3 py-2 text-gray-700">10개 (PAGE_SIZE = 10)</td>
                      </tr>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <td className="px-3 py-2 text-gray-900 font-medium">추가 로드</td>
                        <td className="px-3 py-2 text-gray-700">10개씩 (하단 sentinel 도달 시)</td>
                      </tr>
                      <tr className="bg-white border-b border-gray-100">
                        <td className="px-3 py-2 text-gray-900 font-medium">감지 방식</td>
                        <td className="px-3 py-2 text-gray-700">Intersection Observer (rootMargin: 120px)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-3 py-2 text-gray-900 font-medium">로딩 표시</td>
                        <td className="px-3 py-2 text-gray-700">Loader2 아이콘 회전 애니메이션</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="space-y-1 text-[11px]">
                  <p className="text-gray-700"><strong>State 관리</strong>: doctorVisible / hospitalVisible / postVisible</p>
                  <p className="text-gray-700"><strong>Sentinel Ref</strong>: doctorSentinelRef / hospitalSentinelRef / postSentinelRef</p>
                  <p className="text-gray-700"><strong>완료 문구</strong>:</p>
                  <p className="text-gray-500 pl-4">- 명의: "명의 N명 모두 표시됨"</p>
                  <p className="text-gray-500 pl-4">- 병원: "병원 N개 모두 표시됨"</p>
                  <p className="text-gray-500 pl-4">- 커뮤니티: "게시글 N개 모두 확인했습니다"</p>
                </div>
              </div>

              {/* 페이지 이동 버튼 */}
              <div className="bg-white rounded-xl border border-pink-200 p-4">
                <p className="text-xs font-bold text-gray-900 mb-3">🔗 페이지 이동 버튼</p>
                <div className="space-y-2">
                  <div className="border border-blue-200 bg-blue-50 rounded-lg p-3">
                    <p className="text-[11px] font-semibold text-blue-900 mb-1">명의 탭 하단</p>
                    <button className="w-full py-2 text-xs text-blue-600 font-medium border border-blue-200 rounded-lg bg-white flex items-center justify-center gap-1">
                      👤 명의찾기 페이지에서 더 보기 →
                    </button>
                    <p className="text-[10px] text-blue-700 mt-1">→ DoctorSearchPage 이동 + 검색어 전달 + 모달 닫기</p>
                  </div>
                  <div className="border border-purple-200 bg-purple-50 rounded-lg p-3">
                    <p className="text-[11px] font-semibold text-purple-900 mb-1">커뮤니티 탭 하단</p>
                    <button className="w-full py-2 text-xs text-blue-600 font-medium border border-blue-200 rounded-lg bg-white flex items-center justify-center gap-1">
                      💬 커뮤니티 페이지에서 더 보기 →
                    </button>
                    <p className="text-[10px] text-purple-700 mt-1">→ CommunityPage 탭 전환 + 모달 닫기 (검색어 미연동)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. 테스트 시나리오 ── */}
        <section>
          <SectionHeader emoji="🧪" title="7. 검증 시나리오" color="amber" />

          {onTestSearch && (
            <div className="mb-4 flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-xl px-4 py-3">
              <span className="text-violet-500">▶</span>
              <p className="text-xs text-violet-700 font-medium">
                카드를 클릭하면 왼쪽 서비스 화면에서 실제 GlobalSearchModal 결과를 확인할 수 있습니다
              </p>
            </div>
          )}

          <div className="space-y-2.5">
            {scenarios.map((s, i) => (
              <div
                key={i}
                onClick={() => onTestSearch?.(s.keyword)}
                className={`bg-white border-2 rounded-xl p-4 transition-all ${
                  onTestSearch
                    ? 'border-violet-100 cursor-pointer hover:border-violet-300 hover:shadow-md hover:bg-violet-50/30 active:scale-[0.99]'
                    : 'border-gray-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[11px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{s.label}</span>
                  <code className="text-xs font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded">"{s.keyword}"</code>
                  <Tag color={branchColor[s.branch] as 'blue' | 'teal' | 'violet'}>{s.branch}</Tag>
                  <span className="ml-auto text-[11px] font-bold text-green-600">{s.status} 검증완료</span>
                  {onTestSearch && (
                    <span className="text-[10px] text-violet-400 font-medium bg-violet-50 px-2 py-0.5 rounded-full border border-violet-100">
                      클릭하여 테스트 →
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-gray-400">예상:</span>
                  {s.expects.length > 0 ? s.expects.map((e) => (
                    <Tag key={e} color={e === '명의' ? 'teal' : e === '병원' ? 'blue' : 'purple'}>{e}</Tag>
                  )) : <Tag color="blue">챗봇 연결</Tag>}
                  <span className="text-[11px] text-gray-400 ml-1">— {s.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[11px] text-gray-500">
            이 시나리오는 <strong className="text-gray-700">화면정의서에서만 관리</strong>됩니다. 실제 서비스 화면에 표시되지 않습니다.
          </div>
        </section>

      </div>
    </div>
  );
}
