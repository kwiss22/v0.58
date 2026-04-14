// 통합 검색 전체 창 화면정의서 — 홈·명의 찾기·커뮤니티 탭에서 공통으로 사용

import React, { Fragment } from 'react';
import { SpecDocLink } from './SpecDocLink';

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
  sub?: React.ReactNode;
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
        {sub != null && sub !== '' && <div className="text-[11px] text-gray-400 mt-0.5">{sub}</div>}
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

  /** 검증 시나리오 분류(기획·검증용 표기 — 내부 코드명 사용 안 함) */
  type ScenarioKind = '질환·진료과 검색' | '병원명 검색' | '증상·상담형 질문';

  const scenarios: {
    label: string;
    keyword: string;
    expects: string[];
    desc: string;
    kind: ScenarioKind;
    status: string;
  }[] = [
    { label: '질환 검색', keyword: '간암', expects: ['명의', '게시글'], desc: '간암 전문 명의 + 관련 게시글', kind: '질환·진료과 검색', status: '✅' },
    { label: '병원 검색', keyword: '서울아산병원', expects: ['병원', '게시글'], desc: '병원 카드 + 관련 게시글', kind: '병원명 검색', status: '✅' },
    { label: '비슷한 말 자동 연결', keyword: '허리디스크', expects: ['명의', '게시글'], desc: '척추/디스크 명의 + 경험담 게시글', kind: '질환·진료과 검색', status: '✅' },
    { label: '진료과 검색', keyword: '소화기내과', expects: ['명의', '게시글'], desc: '소화기내과 전문 명의', kind: '질환·진료과 검색', status: '✅' },
    { label: '병원 검색 2', keyword: '세브란스', expects: ['병원', '게시글'], desc: '세브란스 병원 + 게시글', kind: '병원명 검색', status: '✅' },
    { label: '증상어 감지', keyword: '배가 아파요', expects: [], desc: 'Aiga 챗봇 연결 화면 — 검색 결과 미표시', kind: '증상·상담형 질문', status: '✅' },
  ];

  const kindTagColor: Record<ScenarioKind, 'blue' | 'teal' | 'violet'> = {
    '증상·상담형 질문': 'blue',
    '병원명 검색': 'teal',
    '질환·진료과 검색': 'violet',
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
                <p className="text-base font-black text-violet-900">통합 검색 전체 창</p>
              </div>
              <p className="text-xs text-violet-600">홈·명의 찾기·커뮤니티에서 동일하게 쓰는 검색 화면</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[10px] font-bold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">공통</span>
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">UI 스펙</span>
              <span className="text-[10px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">v0.58</span>
            </div>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            홈·명의 찾기·커뮤니티에서 <strong>화면 오른쪽 위 돋보기</strong>로 진입하는 전체 화면 검색입니다.
            <strong> UI/UX·분기·레이아웃</strong>을 정의하며, 프로토타입의 검색 대상 데이터는 <strong>더미</strong>입니다. 실서비스는 API·인덱스에 따릅니다.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 text-[11px] text-blue-900 leading-relaxed">
          <strong>운영 원칙:</strong> 이 문서는 통합검색의 <strong>비회원·공통(Base) 화면</strong>만 다룹니다(검색창·탭·목록·비회원 한도 등).
          <strong> 회원 전용 이용 경험</strong>(한도 안내가 사라진 뒤의 체감, 카드 열기 이후 저장·댓글 등)은 <strong>회원 역할</strong>로 볼 때 열리는{' '}
          <SpecDocLink to="searchMemberBizRoot">회원용 통합검색 안내 문서</SpecDocLink>에 모았습니다.
        </div>

        {/* ── 1. 개요 ── */}
        <section id="spec-search-overview" className="scroll-mt-36">
          <SectionHeader emoji="📋" title="1. 개요" color="violet" />
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
            <SpecRow label="화면 이름"   value="통합 검색 전체 창 (기획·디자인 기준)" />
            <SpecRow label="배치 탭"      value={
              <div className="flex gap-1.5 flex-wrap">
                <Tag color="violet">홈</Tag>
                <Tag color="teal">명의찾기</Tag>
                <Tag color="purple">커뮤니티</Tag>
                <span className="text-[11px] text-gray-400">· Chat·My 탭 제외</span>
              </div>
            } />
            <SpecRow label="진입 방식"    value="각 탭에서 화면 오른쪽 위 돋보기를 눌러 열기" sub="프로토타입: 홈·명의 찾기·커뮤니티 탭에서만 노출" />
            <SpecRow label="표시 방식"    value="어두운 배경 위에 검색 창이 화면을 가득 채움" sub="아래 탭 메뉴보다 앞에 보이게 하는 것이 목표" />
            <SpecRow label="닫기"         value="취소 버튼 · ESC 키 · 결과 항목을 눌러 다른 화면으로 갈 때 자동으로 닫힘" />
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
        <section id="spec-search-ui-structure" className="scroll-mt-36">
          <SectionHeader emoji="🧩" title="2. UI 구조" color="teal" />

          {/* 헤더 영역 */}
          <p className="text-xs font-bold text-gray-700 mb-2">헤더 영역 (스크롤해도 위에 고정)</p>
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 mb-4">
            <SpecRow label="돋보기 아이콘"  value="검색을 나타내는 작은 돋보기 아이콘(회색 톤)" />
            <SpecRow label="텍스트 입력창"  value="안내 문구: «명의, 병원, 질환, 게시글 검색» — 창이 열리면 곧바로 입력할 수 있게 포커스" />
            <SpecRow label="자동완성"       value="글을 입력 중이면 연관 검색어 목록이 아래에 펼쳐짐" sub="항목을 고르면 방금 친 단어가 제안어로 바뀜" />
            <SpecRow label="용어 정의" value="검색 결과 라벨 UI 용어(카테고리 태그/결과 유형 배지/필터 칩)" />
            <SpecRow
              label="Search Category Tag"
              value="검색어 옆에 붙는 ‘질환’, ‘진료과’ 등의 분류 라벨"
              sub="색 카테고리 태그: 검색어/제안어가 어떤 분류인지 즉시 식별하도록 돕는 태그"
            />
            <SpecRow
              label="Result Type Badge"
              value="특정 항목이 어떤 성격(결과 유형)인지 보여주는 배지형 UI"
              sub="검색 결과 유형 배지: 목록 항목의 유형(예: 질환/진료과/병원 등)을 구분"
            />
            <SpecRow
              label="Filter Chip / Label"
              value="검색 결과의 속성을 한눈에 보여주는 칩(라벨) 형태 UI"
              sub="필터 칩: 문서 내 태그/라벨/칩은 동일한 시각 패턴으로 취급"
            />
            <SpecRow label="X 버튼"         value="검색어가 있을 때만 보임 · 누르면 입력 내용만 지움" />
            <SpecRow 
              label="🔒 가입하기 버튼" 
              value="검색 한도 소진 시 우측 표시 · 황색 배경 · 탭 시 한도 초과 안내 팝업" 
              isNew
            />
            <SpecRow label="취소 버튼"      value="누르면 검색 창 전체 닫기" />
          </div>

          {/* 🆕 사용량 배너 (비회원 전용) */}
          <div className="bg-pink-50 border-2 border-pink-400 rounded-xl p-4 mb-4">
            <p className="text-xs font-bold text-pink-900 mb-2">🆕 사용량 배너 (비회원 전용)</p>
            <div className="bg-white rounded-xl border border-pink-200 divide-y divide-pink-100">
              <SpecRow label="위치" value="검색 헤더 바로 아래 고정" isNew />
              <SpecRow label="안내 UI" value="비회원 무료 이용 한도 안내 배너 — 검색 잔여·소진 문구(헤더 아래)" isNew />
              <SpecRow label="경고 배너" value="⚠️ 오늘 무료 검색 1회 남았어요 [가입하기]" sub="잔여 1회일 때 황색 배경으로 표시" isNew />
              <SpecRow label="한도 소진 배너" value="🔒 오늘 무료 검색을 모두 사용했어요 · 내일 자정에 초기화 · 3회/일" sub="잔여 0회일 때 표시" isNew />
            </div>
          </div>

          {/* 🆕 탭 바 */}
          <div className="bg-pink-50 border-2 border-pink-400 rounded-xl p-4 mb-4">
            <p className="text-xs font-bold text-pink-900 mb-2">🆕 탭 바 (결과 있을 때만 표시)</p>
            <div className="bg-white rounded-xl border border-pink-200 divide-y divide-pink-100">
              <SpecRow label="표시 조건" value="검색어가 있고, 증상·상담형이 아니며, 결과가 1건 이상일 때" isNew />
              <SpecRow label="탭 구성" value={
                <div className="flex gap-1.5">
                  <Tag color="teal">명의 (N명)</Tag>
                  <Tag color="blue">병원 (N개)</Tag>
                  <Tag color="purple">커뮤니티 (N개)</Tag>
                </div>
              } sub="결과 있는 탭만 동적으로 표시" isNew />
              <SpecRow label="선택 상태" value="선택된 탭은 파란 글자 + 아래쪽 파란 줄로 강조" isNew />
              <SpecRow label="자동 전환" value="검색어 입력 시 결과 있는 첫 번째 탭으로 자동 이동" isNew />
            </div>
          </div>

          {/* 바디 영역 — 수정됨 */}
          <p className="text-xs font-bold text-gray-700 mb-2">
            본문 영역 (세로 스크롤) 
            <span className="ml-2 text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded-full">수정됨</span>
          </p>
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 mb-4">
            <SpecRow label="Aiga 배너"      value="질환·진료과형 검색일 때 결과 맨 위에 고정 · 누르면 AI 챗봇 탭으로 이동하고 검색 창은 닫힘" />
            <SpecRow 
              label="명의 탭" 
              value="처음 10명 표시, 아래로 내리면 10명씩 더 불러옴 · 로딩 중에는 돌아가는 표시" 
              sub="하단 «명의 찾기에서 더 보기» 버튼"
              isModified
            />
            <SpecRow 
              label="병원 탭" 
              value="처음 10곳 표시, 아래로 내리면 10곳씩 더 불러옴 · 로딩 중에는 돌아가는 표시" 
              sub="하단 «소속 명의 보기» 버튼은 항상 노출"
              isModified
            />
            <SpecRow 
              label="커뮤니티 탭" 
              value="처음 10개 표시, 아래로 내리면 10개씩 더 불러옴 · 로딩 중에는 돌아가는 표시" 
              sub="하단 «커뮤니티에서 더 보기» 버튼"
              isModified
            />
            <SpecRow 
              label="더 보기(목록)" 
              value="한 번에 10건씩 · 목록 맨 아래에 도달하면 10건씩 추가로 불러옴" 
              isModified
            />
          </div>

          {/* 하위 창 */}
          <p className="text-xs font-bold text-gray-700 mb-2">하위 창 (결과에서 카드를 눌렀을 때)</p>
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
            <SpecRow
              label="명의 탭"
              value="명의 프로필 상세 창"
              sub={
                <>
                  비회원: 프로필 조회 횟수 차감 (하루 3회, 홈·명의 찾기·통합 검색이 같은 남은 횟수를 씀). UI 골격은{' '}
                  <SpecDocLink to="commonModals">공통 컴포넌트 문서(의사 프로필)</SpecDocLink> 참조.
                </>
              }
            />
            <SpecRow label="병원 탭"   value="병원 정보 창 (소속 명의 포함)" sub="사용량 제한 없음" />
            <SpecRow
              label="게시글 탭"
              value="게시글 상세(홈·통합검색)"
              sub={
                <>
                  비회원: 게시글 열람 횟수 차감 (하루 5회, 홈·커뮤니티·통합 검색이 같은 남은 횟수를 씀). 회원 경험은{' '}
                  <SpecDocLink to="searchMemberBizRoot">회원용 통합검색 안내 문서</SpecDocLink>·
                  <SpecDocLink to="communityMemberBizOverview">회원용 커뮤니티 안내 문서</SpecDocLink> 참조
                </>
              }
            />
          </div>
        </section>

        {/* ── 3. 화면 상태 ── */}
        <section id="spec-search-states" className="scroll-mt-36">
          <SectionHeader emoji="📺" title="3. 화면 상태" color="blue" />
          <p className="text-xs text-red-600 font-semibold mb-2">🔴 수정: 4종 → 5종 (한도 차단 상태 추가)</p>
          <div className="space-y-2.5">
            <div id="spec-search-state-1" className="scroll-mt-36">
              <StateCard
                color="gray"
                title="① 검색어 없음 (처음 열었을 때)"
                condition="검색창이 비어 있음(처음 들어왔거나 X로 지운 뒤)"
                ui="Aiga 안내 배너 («증상이 있으신가요?» · «질문하기» 버튼)"
                sub="AI 챗봇과 연결된 경우에만 이 배너가 보임"
              />
            </div>
            <div id="spec-search-state-2" className="scroll-mt-36">
              <StateCard
                color="blue"
                title="② 증상·상담형으로 이해한 경우"
                condition="«배가 아파요»처럼 증상을 말하는 문장으로 판단될 때"
                ui="챗봇 안내 + «Aiga에게 질문하기» 버튼 · 명의·병원·게시글 목록은 숨김"
                sub="버튼을 누르면 AI 챗봇 탭으로 이동하며, 입력했던 말이 첫 메시지로 넘어감"
              />
            </div>
            <div id="spec-search-state-3" className="scroll-mt-36">
              <StateCard
                color="gray"
                title="③ 결과 없음"
                condition="검색어는 있는데 증상형이 아니고, 찾은 결과가 0건일 때"
                ui="검색 없음 아이콘 + «결과 없음» 문구 + 챗봇으로 유도하는 카드"
              />
            </div>
            <div id="spec-search-state-4" className="scroll-mt-36">
              <StateCard
                color="teal"
                title="④ 검색 결과가 있을 때"
                condition="검색어가 있고 증상형이 아니며, 결과가 1건 이상일 때"
                ui="탭 줄 + [질환일 때 Aiga 배너] + 선택한 탭의 목록(더 보기 방식)"
                sub="탭마다 명의·병원·커뮤니티 결과를 나눠 보여줌"
              />
            </div>
            <div id="spec-search-state-5" className="scroll-mt-36">
              <StateCard
                color="amber"
                title="🆕 ⑤ 한도까지 쓴 경우 (비회원)"
                condition="비회원이고, 오늘 무료 검색을 이미 다 썼을 때"
                ui="가운데 자물쇠 + «오늘 무료 검색을 모두 사용했어요» + 회원가입·로그인 버튼"
                sub="검색창은 읽기 전용 · 오른쪽에 «가입하기» 버튼 표시"
                isNew
              />
            </div>
          </div>
        </section>

        {/* ── 4. 검색어 분류 로직 ── */}
        <section id="spec-search-branch-logic" className="scroll-mt-36">
          <SectionHeader emoji="🔀" title="4. 검색어 분류 로직 (순서대로 판단하는 3단계)" color="amber" />

          <div className="space-y-2.5 mb-4">
            {/* 1순위 */}
            <div className="border-2 border-blue-200 bg-blue-50/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[11px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">1순위</span>
                <span className="text-sm font-bold text-blue-900">1단계 — 증상·상담형으로 볼 때</span>
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
                <span className="text-sm font-bold text-teal-900">2단계 — 병원 이름으로 볼 때</span>
              </div>
              <div className="space-y-1 text-[11px] text-teal-900">
                <p><span className="font-semibold">조건</span> — 샘플 병원 목록에 적은 말이 들어가는 병원이 있을 때</p>
                <p><span className="font-semibold">데이터</span> — 데모에서는 의사 정보에 묶인 병원 이름을 모아서 만든 목록(실서비스는 검색 API 기준)</p>
                <p className="font-semibold mt-1">→ 결과: 병원 탭 + 커뮤니티 탭</p>
              </div>
            </div>

            {/* 3순위 */}
            <div className="border-2 border-violet-200 bg-violet-50/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[11px] font-bold bg-violet-600 text-white px-2 py-0.5 rounded-full">3순위</span>
                <span className="text-sm font-bold text-violet-900">3단계 — 질환·진료과·의사 이름으로 볼 때</span>
              </div>
              <div className="space-y-1 text-[11px] text-violet-900">
                <p><span className="font-semibold">조건</span> — 위 두 경우가 아니고, 명의 쪽에 맞는 결과가 있을 때(이름·병원·전문과·질환 분야·태그 등으로 맞춤)</p>
                <p><span className="font-semibold">맞춰 보는 항목</span> — 의사 이름 · 병원 · 전문과 · 질환 분야 · 태그 등</p>
                <p className="font-semibold mt-1">→ 결과: 명의 탭 + Aiga 배너 + 커뮤니티 탭</p>
              </div>
            </div>
          </div>

          {/* 비슷한 말 자동 연결 */}
          <p className="text-xs font-bold text-gray-700 mb-2">⚡ 비슷한 말 자동 연결 — 동의어 처리</p>
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
            동의어 확장은 <strong>마지막 단어만</strong>이 아니라 <strong>통째로 친 문장</strong>을 기준으로 적용합니다.
            실서비스에서는 동의어·별칭 목록을 따로 관리하는 편이 좋습니다.
          </Note>
        </section>

        {/* ── 5. 결과 영역 상세 ── */}
        <section id="spec-search-results-detail" className="scroll-mt-36">
          <SectionHeader emoji="📊" title="5. 결과 영역 상세 스펙" color="purple" />

          {/* 명의 탭 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Tag color="teal">명의 탭</Tag>
              <span className="text-[11px] text-gray-400">«병원 이름만 찾는 경우»가 아닐 때만 이 탭을 씀</span>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
              <SpecRow label="아이콘"       value="사람 실루엣 아이콘(청록색 톤)" />
              <SpecRow label="카드 구성"    value="동그란 프로필 사진 · 이름 · 병원명·전문과 · 태그 최대 3개" />
              <SpecRow 
                label="하이라이트" 
                value={
                  <span>
                    검색어와 겹치는 글자 <span className="bg-yellow-100 text-yellow-800 rounded px-1">노란 배경</span>으로 강조
                  </span>
                } 
                isNew
              />
              <SpecRow 
                label="카드 클릭" 
                value="명의 프로필 상세 열림 · 비회원은 전역 프로필 열람 한도에서 1회 차감" 
                sub="한도 소진 시 한도 초과 안내 팝업"
                isNew
              />
              <SpecRow 
                label="무한 스크롤" 
                value="10명씩 불러옴 · 목록 맨 아래에 닿으면 10명 더 불러옴" 
                sub="다 불러오면 «명의 N명 모두 표시됨» 문구"
                isModified
              />
              <SpecRow 
                label="페이지 이동" 
                value="«명의 찾기에서 더 보기» → 명의 찾기 탭으로 이동하고 검색어는 넘김 · 통합 검색 창은 닫힘" 
                isNew
              />
            </div>
          </div>

          {/* 병원 탭 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Tag color="blue">병원 탭</Tag>
              <span className="text-[11px] text-gray-400">«병원 이름으로 찾는 경우»에만 이 탭을 씀</span>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
              <SpecRow label="아이콘"       value="건물 아이콘(파란색 톤)" />
              <SpecRow label="카드 구성"    value="병원 아이콘(연한 파란 배경) · 병원명 · 소속 명의 수 · 전문과 태그" />
              <SpecRow 
                label="하이라이트" 
                value={
                  <span>
                    병원명 검색어 일치 부분 <span className="bg-yellow-100 text-yellow-800 rounded px-1">노란색 배경</span>
                  </span>
                } 
                isNew
              />
              <SpecRow label="카드 클릭"      value="병원 정보 창 열림 (사용량 제한 없음)" />
              <SpecRow 
                label="무한 스크롤" 
                value="10곳씩 불러옴 · 목록 맨 아래에 닿으면 10곳 더 불러옴" 
                sub="다 불러오면 «병원 N개 모두 표시됨» 문구"
                isModified
              />
            </div>
          </div>

          {/* 커뮤니티 탭 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Tag color="purple">커뮤니티 탭</Tag>
              <span className="text-[11px] text-gray-400">검색어가 있고 증상형이 아니면, 다른 탭과 함께 이 탭도 씀</span>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
              <SpecRow label="아이콘"       value="말풍선 아이콘(보라색 톤)" />
              <SpecRow label="카드 구성"    value="아이콘(연한 보라 배경) · 인증 뱃지 · 질환명 태그 · 제목 · 요약 · 좋아요/댓글/시간" />
              <SpecRow label="검색 대상"    value="제목 · 요약 · 질환 · 진료과 · 관련 의사 이름 등 글 안의 텍스트" />
              <SpecRow 
                label="카드 클릭" 
                value="게시글 상세 열림 · 비회원은 전역 게시글 열람 한도에서 1회 차감" 
                sub="한도 소진 시 한도 초과 안내 팝업"
                isNew
              />
              <SpecRow 
                label="무한 스크롤" 
                value="10개씩 불러옴 · 목록 맨 아래에 닿으면 10개 더 불러옴" 
                sub="다 불러오면 «게시글 N개 모두 확인했습니다» 문구"
                isModified
              />
              <SpecRow 
                label="페이지 이동" 
                value="«커뮤니티에서 더 보기» → 커뮤니티 탭으로 전환하고 통합 검색 창은 닫힘 (검색어는 커뮤니티 안의 필터에는 자동으로 안 넘어감)" 
                isNew
              />
            </div>
          </div>

          {/* Aiga 배너 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag color="blue">Aiga 배너</Tag>
              <span className="text-[11px] text-gray-400">질환·진료과형 검색일 때만 결과 맨 위에 고정</span>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
              <SpecRow label="구성"     value="챗봇 아이콘(진한 파랑) · «Aiga에게 ○○ 질문하기» · «AI가 맞춤 명의·병원을 추천해드려요»" />
              <SpecRow label="배경"     value="연한 파랑~남색 그라데이션, 얇은 파란 테두리" />
              <SpecRow label="클릭 시"  value="AI 챗봇 탭으로 이동 · 지금 친 검색어가 첫 질문으로 넘어감 · 통합 검색 창은 닫힘" />
            </div>
          </div>
        </section>

        {/* ── 6. 검색 아이콘 배치 ── */}
        <section id="spec-search-icon-placement" className="scroll-mt-36">
          <SectionHeader emoji="📍" title="6. 검색 아이콘 배치 (탭별 공통)" color="gray" />
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 mb-3">
            <SpecRow label="위치"     value="메인 화면 본문 오른쪽 위(스크롤해도 같은 자리에 보이게 배치)" sub="전체 브라우저 창에 딱 붙는 방식은 아님" />
            <SpecRow label="크기"     value="동그란 버튼 한 칸 크기(손가락으로 누르기 좋게)" />
            <SpecRow label="스타일"   value="흰 배경 · 얇은 테두리 · 살짝 그림자" />
            <SpecRow label="마우스 올렸을 때"     value="연한 파란 배경 · 테두리 강조" />
            <SpecRow label="아이콘"   value="돋보기 아이콘(회색 톤)" />
            <SpecRow label="노출 탭"  value={
              <div className="flex gap-1.5">
                <Tag color="violet">홈</Tag>
                <Tag color="teal">명의 찾기</Tag>
                <Tag color="purple">커뮤니티</Tag>
              </div>
            } />
            <SpecRow label="미노출 탭" value="AI 챗봇 · MY (검색이 없는 탭)" />
          </div>
          <Note>
            아래 탭 메뉴로 다른 탭을 고르면, 검색 창이 열려 있었을 때 <strong>자동으로 닫히는 것</strong>이 맞습니다.
          </Note>
        </section>

        {/* 🆕 ── 7. 비회원 사용량 제한 ── */}
        <section id="spec-search-usage-limit" className="scroll-mt-36">
          <div className="bg-pink-50 border-2 border-pink-400 rounded-xl p-5">
            <SectionHeader emoji="🔒" title="7. 비회원 사용량 제한" color="rose" />
            
            <div className="space-y-4">
              <p className="text-[11px] text-rose-900 bg-white border border-rose-200 rounded-lg px-3 py-2 leading-relaxed">
                <strong>전역 통합:</strong> 여기서 말하는 검색·프로필·게시글 열람 한도는 <strong>통합 검색 창 안에서만 따로 도는 숫자가 아닙니다.</strong> 홈, 명의 찾기, 커뮤니티와 <strong>같은 «오늘 남은 횟수»</strong>를 씁니다(프로토타입: 이 브라우저에 저장된 같은 기준값). 한 화면에서 1회를 쓰면 다른 화면의 안내 배너·검색창 잠금·한도 안내 창에도 같이 반영되는 것이 맞습니다.
              </p>
              <p className="text-[11px] text-indigo-900 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2">
                👉 본 절의 한도 차단·가입/로그인 CTA 버튼 탭 시 이후의 진행 흐름은{' '}
                <SpecDocLink to="mypageOverview">마이페이지 화면정의서</SpecDocLink>에 정리된 [공통 로그인/회원가입 플로우 정책]을 공통으로 따름.
              </p>
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
                <p className="text-[11px] text-gray-600">• 표시 조건: 오늘 남은 무료 검색이 딱 1회일 때</p>
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
                <p className="text-[11px] text-gray-600">• 표시 조건: 오늘 남은 무료 검색이 0회일 때</p>
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
                  <p className="text-[11px] text-gray-600">• 검색창은 입력만 막고, 안내 문구는 그대로 보임</p>
                  <p className="text-[11px] text-gray-600">• 연관 검색어 목록은 숨김</p>
                  <p className="text-[11px] text-gray-600">• 비회원이 한도까지 썼거나, 검색이 막힌 다른 이유가 있으면 이 상태</p>
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
                <p className="text-[11px] text-gray-600">• 표시 조건: 위와 같이 검색이 막혀야 할 때</p>
                <p className="text-[11px] text-gray-600">• 검색 결과 영역 전체를 대체</p>
              </div>

              {/* 카드 클릭 제한 */}
              <div className="bg-white rounded-xl border border-pink-200 p-4">
                <p className="text-xs font-bold text-gray-900 mb-3">🎯 카드 클릭 시 제한</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[11px] text-gray-500 w-20 flex-shrink-0">명의 카드</span>
                    <span className="text-[11px] text-gray-700">프로필 조회 가능 시 → 명의 프로필 상세 열림 + 횟수 차감<br/>한도 소진 시 → 한도 초과 안내 팝업</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[11px] text-gray-500 w-20 flex-shrink-0">병원 카드</span>
                    <span className="text-[11px] text-gray-700">제한 없음 → 병원 정보 창 열림</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[11px] text-gray-500 w-20 flex-shrink-0">게시글 카드</span>
                    <span className="text-[11px] text-gray-700">열람 가능 시 → 게시글 상세 열림 + 횟수 차감<br/>한도 소진 시 → 한도 초과 안내 팝업</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🆕 ── 8. 탭/무한스크롤 운영 요약 ── */}
        <section id="spec-search-tab-scroll-summary" className="scroll-mt-36">
          <div className="bg-pink-50 border-2 border-pink-400 rounded-xl p-5">
            <SectionHeader emoji="📑" title="8. 탭/무한스크롤 운영 요약" color="rose" />
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-pink-200 p-4">
                <p className="text-xs font-bold text-gray-900 mb-2">🗂️ 탭/무한스크롤 규칙 (중복 제거 요약)</p>
                <ul className="space-y-1 text-[11px] text-gray-700 list-disc pl-4">
                  <li>결과 탭, 카운트 배지, 자동 전환 규칙은 <strong>2. UI 구조</strong> 기준.</li>
                  <li>목록별 10개 단위 로드/하단 감지/완료 문구는 <strong>5. 결과 영역 상세 스펙</strong> 기준.</li>
                  <li>«명의찾기에서 더 보기» / «커뮤니티에서 더 보기» 이동 규칙도 <strong>5절</strong>의 정의를 단일 기준으로 사용.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. 테스트 시나리오 ── */}
        <section id="spec-search-test-scenarios" className="scroll-mt-36">
          <SectionHeader emoji="🧪" title="9. 검증 시나리오" color="amber" />

          {onTestSearch && (
            <div className="mb-4 flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-xl px-4 py-3">
              <span className="text-violet-500">▶</span>
              <p className="text-xs text-violet-700 font-medium">
                카드를 누르면 왼쪽 서비스 화면에서 실제 통합 검색 결과를 바로 확인할 수 있습니다
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
                  <Tag color={kindTagColor[s.kind]}>{s.kind}</Tag>
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
                    <Fragment key={e}>
                      <Tag color={e === '명의' ? 'teal' : e === '병원' ? 'blue' : 'purple'}>{e}</Tag>
                    </Fragment>
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
