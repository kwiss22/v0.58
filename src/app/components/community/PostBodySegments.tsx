// 게시글 본문 — bodySegments(텍스트·이미지 인터리브) 렌더링
import { useMemo } from 'react';
import type { CommunityPost, PostBodySegment } from '@/constants/community-data';

type Attached = NonNullable<CommunityPost['attachedImages']>[number];

export function PostBodySegments(props: {
  bodySegments: PostBodySegment[];
  attachedImages?: CommunityPost['attachedImages'];
  variant: 'detail' | 'feed';
  /** 상세: 라이트박스용 (첨부 배열 기준 인덱스) */
  onImageClick?: (img: Attached, galleryIndex: number) => void;
  className?: string;
}) {
  const { bodySegments, attachedImages, variant, onImageClick, className = '' } = props;

  const imgById = useMemo(() => {
    const m = new Map<string, Attached>();
    attachedImages?.forEach((im) => m.set(im.id, im));
    return m;
  }, [attachedImages]);

  const galleryIndexById = useMemo(() => {
    const m = new Map<string, number>();
    attachedImages?.forEach((im, i) => m.set(im.id, i));
    return m;
  }, [attachedImages]);

  const imgCls =
    variant === 'detail'
      ? 'max-h-72 w-auto object-contain bg-gray-50'
      : 'h-28 w-full object-cover rounded-lg';

  const wrapCls = variant === 'detail' ? 'space-y-3 mb-4' : 'space-y-2 mb-2';
  const textCls =
    variant === 'detail'
      ? 'text-sm text-gray-700 leading-relaxed whitespace-pre-wrap'
      : 'text-sm text-gray-600 leading-relaxed whitespace-pre-wrap line-clamp-6';

  return (
    <div className={className}>
      <div className={wrapCls}>
        {bodySegments.map((seg, i) => {
          if (seg.type === 'text') {
            return (
              <p key={`t-${i}`} className={textCls}>
                {seg.text}
              </p>
            );
          }
          const img = imgById.get(seg.imageId);
          if (!img) return null;
          const gi = galleryIndexById.get(seg.imageId) ?? 0;

          const inner = (
            <img src={variant === 'feed' ? (img.thumbnail || img.url) : img.url} alt={img.name} className={imgCls} />
          );

          if (onImageClick) {
            return (
              <button
                key={`i-${seg.imageId}-${i}`}
                type="button"
                className="block w-full rounded-xl overflow-hidden border border-gray-200 hover:opacity-90 transition-opacity text-left"
                style={{ maxWidth: '100%' }}
                onClick={(e) => {
                  e.preventDefault();
                  onImageClick(img, gi);
                }}
              >
                {inner}
              </button>
            );
          }

          return (
            <div key={`i-${seg.imageId}-${i}`} className="rounded-xl overflow-hidden border border-gray-200">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
