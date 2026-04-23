import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import {
  TAG_MATCHING_LAB_ENTRIES,
  tagMatchingAnchorId,
  type TagMatchingEntry,
} from './tagMatchingRegistry';

function SpecBlock({
  entry,
  highlighted,
}: {
  entry: TagMatchingEntry;
  highlighted: boolean;
}) {
  const id = tagMatchingAnchorId(entry.displayNumber);
  return (
    <article
      id={id}
      className={`scroll-mt-4 rounded-xl border p-4 transition-shadow duration-300 ${
        highlighted
          ? 'border-amber-400 bg-amber-50 shadow-md ring-2 ring-amber-300/80'
          : 'border-slate-200 bg-white'
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-slate-900 px-2 text-xs font-bold text-white">
          {entry.displayNumber}
        </span>
        <h3 className="text-sm font-bold text-slate-900">{entry.specTitle}</h3>
      </div>
      <p className="text-sm leading-relaxed text-slate-600">{entry.specDescription}</p>
    </article>
  );
}

function DemoHotspot({
  entry,
  active,
  onSelect,
  styleAnchor,
}: {
  entry: TagMatchingEntry;
  active: boolean;
  onSelect: (e: TagMatchingEntry) => void;
  styleAnchor: CSSProperties;
}) {
  return (
    <button
      type="button"
      style={styleAnchor}
      data-demo-tag={entry.displayNumber}
      onClick={() => onSelect(entry)}
      className={`absolute flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold shadow-sm transition-all ${
        active
          ? 'z-10 scale-110 border-amber-500 bg-amber-400 text-amber-950'
          : 'z-[1] border-white bg-slate-900/85 text-white hover:bg-slate-800'
      }`}
      aria-label={`${entry.displayNumber} ${entry.shortLabel} — 화면정의서로 연결`}
    >
      {entry.displayNumber}
    </button>
  );
}

export function TagMatchingLabPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [flashTag, setFlashTag] = useState<string | null>(null);

  const scrollSpecTo = useCallback((displayNumber: string) => {
    const el = document.getElementById(tagMatchingAnchorId(displayNumber));
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const handleSelect = useCallback(
    (entry: TagMatchingEntry) => {
      setActiveTag(entry.displayNumber);
      setFlashTag(entry.displayNumber);
      scrollSpecTo(entry.displayNumber);
      window.history.replaceState(null, '', `#${tagMatchingAnchorId(entry.displayNumber)}`);
    },
    [scrollSpecTo],
  );

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash.startsWith('tag-matching-')) {
      const num = hash.replace('tag-matching-', '');
      const found = TAG_MATCHING_LAB_ENTRIES.some((e) => e.displayNumber === num);
      if (found) {
        setActiveTag(num);
        setFlashTag(num);
        requestAnimationFrame(() => scrollSpecTo(num));
      }
    }
  }, [scrollSpecTo]);

  useEffect(() => {
    if (!flashTag) return;
    const t = window.setTimeout(() => setFlashTag(null), 2200);
    return () => window.clearTimeout(t);
  }, [flashTag]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <header className="border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <h1 className="text-base font-bold text-slate-900">태그 매칭 실험 (데모 ↔ 정의서)</h1>
        <p className="mt-1 text-xs text-slate-500">
          왼쪽 번호를 누르면 오른쪽 동일 번호의 설명으로 스크롤됩니다. URL 해시로도 이동 가능합니다.
        </p>
      </header>

      <div className="flex flex-1 flex-col gap-3 p-3 md:flex-row md:gap-4 md:p-4">
        <section className="flex flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:max-w-md">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            데모 화면 (모의)
          </h2>
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-2xl border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="absolute left-3 right-3 top-3 h-10 rounded-lg bg-white shadow-sm" />
            <DemoHotspot
              entry={TAG_MATCHING_LAB_ENTRIES[0]}
              active={activeTag === '01'}
              onSelect={handleSelect}
              styleAnchor={{ top: '14px', left: '50%', transform: 'translateX(-50%)' }}
            />

            <div className="absolute left-3 right-3 top-16 h-11 rounded-full border border-slate-200 bg-white shadow-inner" />
            <DemoHotspot
              entry={TAG_MATCHING_LAB_ENTRIES[1]}
              active={activeTag === '02'}
              onSelect={handleSelect}
              styleAnchor={{ top: '68px', right: '12px' }}
            />

            <div className="absolute left-3 right-3 top-[7.5rem] flex gap-2 overflow-hidden">
              <span className="h-7 shrink-0 rounded-full bg-blue-100 px-3 text-xs leading-7 text-blue-800">
                칩 A
              </span>
              <span className="h-7 shrink-0 rounded-full bg-blue-100 px-3 text-xs leading-7 text-blue-800">
                칩 B
              </span>
            </div>
            <DemoHotspot
              entry={TAG_MATCHING_LAB_ENTRIES[2]}
              active={activeTag === '03'}
              onSelect={handleSelect}
              styleAnchor={{ top: '128px', left: '20px' }}
            />

            <div className="absolute bottom-8 left-3 right-3 top-[11rem] rounded-xl bg-white p-3 shadow-md">
              <div className="h-3 w-2/3 rounded bg-slate-200" />
              <div className="mt-2 h-3 w-full rounded bg-slate-100" />
              <div className="mt-2 h-3 w-5/6 rounded bg-slate-100" />
            </div>
            <DemoHotspot
              entry={TAG_MATCHING_LAB_ENTRIES[3]}
              active={activeTag === '04'}
              onSelect={handleSelect}
              styleAnchor={{ bottom: '36px', right: '16px' }}
            />
          </div>
          <p className="mt-3 text-[11px] text-slate-500">
            실제 앱에서는 각 영역에 <code className="rounded bg-slate-100 px-1">data-demo-tag</code> 와 동일한
            번호의 정의서 앵커를 맞춥니다.
          </p>
        </section>

        <section className="flex min-h-[50vh] flex-1 flex-col rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-inner">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            화면정의서 (모의)
          </h2>
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
            {TAG_MATCHING_LAB_ENTRIES.map((entry) => (
              <SpecBlock
                key={entry.displayNumber}
                entry={entry}
                highlighted={flashTag === entry.displayNumber}
              />
            ))}
            <div className="rounded-lg border border-dashed border-slate-300 bg-white/80 p-3 text-xs text-slate-500">
              실제 적용 시: 번호 마스터 표 1장, Figma 스티커 텍스트 = <strong>displayNumber</strong>, 정의서 블록{' '}
              <strong>id = tag-matching-NN</strong>.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
