import { Send, Sparkles } from "lucide-react";

interface ChatSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export function ChatSearchInput({ value, onChange, onSubmit, placeholder = "폐암 수술 경험이 가장 많은 흉부외과 명의 찾아줘" }: ChatSearchInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-4 sticky bottom-0 z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-3xl mx-auto relative">
        {/* AI Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Sparkles className="w-5 h-5 text-blue-600" />
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full pl-12 pr-14 py-4 border-2 border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
        />

        {/* Send Button */}
        <button
          onClick={onSubmit}
          disabled={!value.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}