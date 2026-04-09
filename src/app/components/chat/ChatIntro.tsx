export function ChatIntro() {
  return (
    <div className="flex flex-col items-center text-center px-4 py-12">
      {/* Main Greeting */}
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        안녕하세요, AIGA입니다. 😊
      </h2>

      {/* Question */}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        어떤 증상으로 힘드신가요?
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-700 leading-relaxed mb-4 max-w-md">
        저는 주요 질환을 위주로 국내 상급종합병원<br />
        전문의를 안내해드리는 AI 어시스턴트입니다.
      </p>

      {/* Sub Description */}
      <p className="text-sm text-gray-400 max-w-md">
        증상이나 질환명 등을 알려주시면 적합한 전문의를 찾아드리겠습니다
      </p>
    </div>
  );
}
