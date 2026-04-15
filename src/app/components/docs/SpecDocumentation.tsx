import { HomeTabSpec } from './HomeTabSpec';
import { HomeTabSpecBiz } from './HomeTabSpecBiz';
import { CommonComponentsSpec } from './CommonComponentsSpec';
import { CommonComponentsSpecBiz } from './CommonComponentsSpecBiz';
import { DoctorSearchSpec } from './DoctorSearchSpec';
import { DoctorSearchSpecBiz } from './DoctorSearchSpecBiz';
import { SearchScenarioSpec } from './SearchScenarioSpec';
import { SearchScenarioSpecBiz } from './SearchScenarioSpecBiz';
import { CommunityTabSpec } from './CommunityTabSpec';
import { CommunityTabSpecBiz } from './CommunityTabSpecBiz';
import { MyPageSpec } from './MyPageSpec';
import { UpdateSummary } from './UpdateSummary';
import { AigaChatbotSpec } from './AigaChatbotSpec';
import { useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useAppNavigation } from '../../contexts/AppNavigationContext';

export function SpecDocumentation() {
  const { specTab, setSpecTab, openGlobalSearch, pendingSpecSectionId, clearPendingSpecSection } =
    useAppNavigation();
  const { role } = useUser();

  useEffect(() => {
    if (!pendingSpecSectionId) return;

    const targetId = pendingSpecSectionId;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        clearPendingSpecSection();
      }
    };

    timers.push(setTimeout(tryScroll, 0));
    timers.push(setTimeout(tryScroll, 80));
    timers.push(setTimeout(tryScroll, 200));
    timers.push(
      setTimeout(() => {
        if (cancelled) return;
        if (document.getElementById(targetId)) tryScroll();
        else clearPendingSpecSection();
      }, 450),
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [specTab, role, pendingSpecSectionId, clearPendingSpecSection]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 - 컴팩트 버전 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between gap-2">
            {/* 문서 제목 */}
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-black text-gray-900">Aiga 정의서</h1>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  role === 'member'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {role === 'member' ? '회원' : '비회원'}
              </span>
              <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                🎨 UI/UX
              </span>
            </div>

            {/* 버전 정보 */}
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              v0.58
            </span>
          </div>

          {/* 하위 탭 네비게이션 */}
          <div className="mt-2 flex items-center gap-1 border-b border-gray-200 -mb-px overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSpecTab('home')}
              className={`px-2 py-1 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                specTab === 'home'
                  ? 'border-violet-600 text-violet-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📱 홈
            </button>
            <button
              onClick={() => setSpecTab('aiga-chatbot-spec')}
              className={`px-2 py-1 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                specTab === 'aiga-chatbot-spec'
                  ? 'border-sky-600 text-sky-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🤖 AIGA 챗봇
            </button>
            <button
              onClick={() => setSpecTab('doctor')}
              className={`px-2 py-1 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                specTab === 'doctor'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🔍 명의찾기
            </button>
            <button
              onClick={() => setSpecTab('community')}
              className={`px-2 py-1 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                specTab === 'community'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              💬 커뮤니티
            </button>
            <button
              onClick={() => setSpecTab('mypage-spec')}
              className={`px-2 py-1 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                specTab === 'mypage-spec'
                  ? 'border-cyan-600 text-cyan-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🙋 마이페이지
            </button>
            <button
              onClick={() => setSpecTab('common')}
              className={`px-2 py-1 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                specTab === 'common'
                  ? 'border-violet-600 text-violet-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🔗 공통
            </button>
            <button
              onClick={() => setSpecTab('search-spec')}
              className={`px-2 py-1 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                specTab === 'search-spec'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🔗 공통(통합검색)
            </button>
          </div>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div>
        {specTab === 'update' ? (
          <UpdateSummary />
        ) : specTab === 'aiga-chatbot-spec' ? (
          <AigaChatbotSpec />
        ) : specTab === 'search-spec' ? (
          role === 'member' ? (
            <SearchScenarioSpecBiz onTestSearch={openGlobalSearch} />
          ) : (
            <SearchScenarioSpec onTestSearch={openGlobalSearch} />
          )
        ) : specTab === 'doctor' ? (
          role === 'member' ? <DoctorSearchSpecBiz /> : <DoctorSearchSpec />
        ) : specTab === 'community' ? (
          role === 'member' ? <CommunityTabSpecBiz /> : <CommunityTabSpec />
        ) : specTab === 'mypage-spec' ? (
          <MyPageSpec />
        ) : role === 'member' ? (
          <>
            {specTab === 'home' && <HomeTabSpecBiz />}
            {specTab === 'common' && <CommonComponentsSpecBiz onTestSearch={openGlobalSearch} />}
          </>
        ) : (
          <>
            {specTab === 'home' && <HomeTabSpec />}
            {specTab === 'common' && <CommonComponentsSpec onTestSearch={openGlobalSearch} />}
          </>
        )}
      </div>
    </div>
  );
}
