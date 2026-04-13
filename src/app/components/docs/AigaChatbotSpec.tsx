import React from 'react';
import { useUser } from '../../contexts/UserContext';

const DEV_CHAT_URL = 'https://aigadev.kormedi.com/ko/chat';

const FIGMA_SB_URL =
  'https://www.figma.com/design/8hVPzPSXOcbws7VEAZ2TVT/%ED%97%88%ED%94%84%EB%A1%9C-_2025--%EC%95%8C%ED%8C%8C-?node-id=40000817-3275&t=FZvHePSObKdBvTW1-1';

function DevServerLinkBlock() {
  return (
    <section className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-indigo-950 mb-2 flex items-center gap-2" id="dev-server-ref">
        <span className="text-xl" aria-hidden>
          🔗
        </span>
        실제 구현 화면 (Dev 서버) 참조
      </h2>
      <p className="text-xs text-indigo-900 leading-relaxed mb-4">
        스펙 문서와 화면이 다를 경우 <strong>항상 아래 구현 URL을 우선</strong>합니다. 링크는 새 탭에서 열립니다.
      </p>
      <a
        href={DEV_CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 break-all text-sm font-bold text-indigo-700 hover:text-indigo-900 underline underline-offset-2 decoration-indigo-300 hover:decoration-indigo-600 transition-colors"
      >
        {DEV_CHAT_URL}
        <span aria-hidden className="text-indigo-500 shrink-0">
          ↗
        </span>
      </a>
    </section>
  );
}

function FigmaSbLinkBlock() {
  return (
    <section className="bg-violet-50 border border-violet-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-violet-950 mb-2 flex items-center gap-2">
        <span className="text-xl" aria-hidden>
          🔗
        </span>
        Figma SB
      </h2>
      <p className="text-xs text-violet-900 leading-relaxed mb-4">
        디자인·프레임 참조용 Figma 링크입니다. 새 탭에서 열립니다.
      </p>
      <a
        href={FIGMA_SB_URL}
        target="_blank"
        rel="noopener noreferrer"
        title={FIGMA_SB_URL}
        className="inline-flex items-center gap-2 text-sm font-bold text-violet-800 hover:text-violet-950 underline underline-offset-2 decoration-violet-300 hover:decoration-violet-600 transition-colors"
      >
        Figma SB
        <span aria-hidden className="text-violet-500 shrink-0">
          ↗
        </span>
      </a>
      <p className="mt-3 text-[11px] text-violet-700/90 break-all font-mono leading-relaxed">{FIGMA_SB_URL}</p>
    </section>
  );
}

/** 회원: UI 설명 축약 + 비회원과의 차이(토큰·리셋·이력)만 명시 */
function AigaChatbotSpecMember() {
  return (
    <>
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-900 leading-relaxed">
        <span className="font-bold text-amber-950">문서 범위:</span> 본 탭은 채팅 화면 코드가 아니라{' '}
        <strong>회원 기준 정책 요약</strong>만 다룹니다. UI·레이아웃은 비회원 탭과 동일하며 Dev·Figma를 기준으로 합니다.
      </div>

      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">1. UI 및 인터랙션 (비회원과 동일)</h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            챗봇 진입점, 초기 화면, 대화 말풍선 등 모든 UI/UX는{' '}
            <strong className="text-gray-900">「비회원 탭 정책과 동일」</strong>합니다.
          </p>
          <p>
            상세 화면은 🔗{' '}
            <a
              href={DEV_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              [실제 구현 화면 (Dev 서버)]
            </a>
            을 기준으로 유지합니다.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
          2. 대화 사용량 정책 <span className="text-amber-600">(★비회원과의 차이점)</span>
        </h2>
        <ul className="space-y-4 text-sm text-gray-700 leading-relaxed list-none pl-0">
          <li className="border-l-4 border-amber-400 pl-4">
            <p className="font-bold text-gray-900 mb-1">토큰 상향</p>
            <p>
              로그인 시 비회원보다 상향된 &ldquo;회원 전용 일일 토큰 한도&rdquo;가 적용됩니다. (현재 Dev 서버 기준 동일)
            </p>
          </li>
          <li className="border-l-4 border-amber-400 pl-4">
            <p className="font-bold text-gray-900 mb-1">한도 리셋</p>
            <p>토큰을 모두 소진한 뒤, 마지막 사용 시점 기준 24시간 후에 자동으로 리셋됩니다.</p>
          </li>
          <li className="border-l-4 border-amber-400 pl-4">
            <p className="font-bold text-gray-900 mb-1">이력 보존</p>
            <p>비회원과 달리 대화 이력이 계정에 영구 저장됩니다.</p>
          </li>
        </ul>
      </section>

      <DevServerLinkBlock />
      <FigmaSbLinkBlock />
    </>
  );
}

/** 비회원: 기존 상세 본문 (진입점·UI·SSOT 링크) */
function AigaChatbotSpecGuest() {
  return (
    <>
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-900 leading-relaxed">
        <span className="font-bold text-amber-950">문서 범위:</span> 본 탭은 프로토타입 앱 안의 채팅 화면 코드나 컴포넌트 스펙을 새로 정의하지 않습니다. 기획·디자인·검수 시
        <strong> 진입점·정책·외부 SSOT 링크</strong>만 확인하세요.
      </div>

      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">1. 진입점 (Entry Point)</h2>
        <ul className="space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5">
          <li>
            <strong>경로:</strong> 하단 GNB(글로벌 내비게이션)에서 <strong>[AIGA챗봇]</strong> 탭을 눌렀을 때 해당 기능 영역으로
            진입합니다.
          </li>
        </ul>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
          2. UI 및 인터랙션 로직 (현재 개발 완료된 화면 기준)
        </h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            초기 웰컴 화면과 이후 대화 인터랙션(말풍선, 입력창, 상태 변화 등)의 프론트엔드 UI/UX는{' '}
            <strong className="text-gray-900">개발 서버에 이미 구현된 상태</strong>입니다.
          </p>
          <p>
            별도 피그마·텍스트 스펙으로 재정의하지 않으며,{' '}
            <strong className="text-gray-900">실제 구현 화면(URL)을 SSOT(단일 진실 공급원)</strong>으로 삼아 유지·보수합니다.
          </p>
        </div>
      </section>

      <DevServerLinkBlock />
      <FigmaSbLinkBlock />
    </>
  );
}

/**
 * AIGA 챗봇 — 화면정의서(정책·SSOT 안내 전용).
 * 실제 채팅 UI(Chat.tsx 등) 구현은 포함하지 않습니다.
 */
export function AigaChatbotSpec() {
  const { role } = useUser();
  const isMember = role === 'member';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">AIGA 챗봇</span>
            <span className="bg-white/10 text-sky-100 text-xs px-3 py-1 rounded-full">UI/UX 화면정의서</span>
            <span className="bg-yellow-400/90 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">🎨 UI/UX</span>
            <span className="bg-white/15 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">v0.6</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isMember ? 'bg-blue-400/90 text-blue-950' : 'bg-gray-600/80 text-gray-100'
              }`}
            >
              {isMember ? '회원' : '비회원'}
            </span>
          </div>
          <h1 className="text-3xl font-black mb-2">🤖 AIGA 챗봇</h1>
          <p className="text-sky-100 text-sm leading-relaxed max-w-3xl">
            {isMember ? (
              <>
                하단 GNB의 <strong className="text-white">AIGA챗봇</strong>에 대한{' '}
                <strong className="text-white">회원 전용 정책 요약</strong>입니다. UI는 비회원과 동일하며 Dev 서버를 참조합니다.
              </>
            ) : (
              <>
                하단 GNB의 <strong className="text-white">AIGA챗봇</strong> 진입·정책·SSOT(단일 기준)만 정리합니다. 말풍선·입력창 등
                상세 UI는 <strong className="text-white">개발 서버 구현 화면</strong>을 따릅니다.
              </>
            )}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {isMember ? <AigaChatbotSpecMember /> : <AigaChatbotSpecGuest />}
      </div>
    </div>
  );
}
