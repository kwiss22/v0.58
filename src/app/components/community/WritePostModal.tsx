import { X } from 'lucide-react';
import { useState } from 'react';
import { categories } from '@/constants/community-data';

interface WritePostModalProps {
  onClose: () => void;
  onSubmit: (data: { category: string; title: string; content: string }) => void;
}

export function WritePostModal({ onClose, onSubmit }: WritePostModalProps) {
  const [category, setCategory] = useState('internal');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    onSubmit({ category, title, content });
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col animate-slide-up">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">진료 후기 작성</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 카테고리 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            >
              {categories
                .filter((cat) => cat.id !== 'all')
                .map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              maxLength={100}
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {title.length}/100
            </div>
          </div>

          {/* 내용 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="진료 경험을 자세히 공유해주세요.&#10;&#10;- 어떤 증상으로 상담받으셨나요?&#10;- 상담 후 어떤 도움을 받으셨나요?&#10;- 추천하고 싶은 점이 있나요?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
              rows={10}
              maxLength={2000}
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {content.length}/2000
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              💡 <strong>커뮤니티 가이드</strong>
              <br />
              • AI 가상 캐릭터 상담 후기를 공유해주세요
              <br />
              • 타인을 비방하거나 허위 사실을 작성하지 말아주세요
              <br />• 개인정보가 포함되지 않도록 주의해주세요
            </p>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-2 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors"
          >
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
}