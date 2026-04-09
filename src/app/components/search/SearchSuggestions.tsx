// 연관검색어 드롭다운 컴포넌트
import { User, Building2, Stethoscope, Tag } from 'lucide-react';
import { DOCTORS } from '@/constants/doctor-data';

export type SuggestionType = 'doctor' | 'hospital' | 'specialty' | 'disease';

export interface Suggestion {
  type: SuggestionType;
  label: string;
  sub?: string;
}

const TYPE_META: Record<SuggestionType, { icon: React.ReactNode; color: string; bg: string; badge: string }> = {
  doctor:    { icon: <User className="w-3.5 h-3.5" />,        color: 'text-blue-600',   bg: 'bg-blue-50',   badge: '명의'  },
  hospital:  { icon: <Building2 className="w-3.5 h-3.5" />,   color: 'text-teal-600',   bg: 'bg-teal-50',   badge: '병원'  },
  specialty: { icon: <Stethoscope className="w-3.5 h-3.5" />, color: 'text-purple-600', bg: 'bg-purple-50', badge: '진료과' },
  disease:   { icon: <Tag className="w-3.5 h-3.5" />,         color: 'text-orange-600', bg: 'bg-orange-50', badge: '질환'  },
};

/**
 * 쿼리에서 마지막 단어 추출 (자동완성 기준 단어)
 * "간암 병" → "병" / "간암" → "간암" / "간암 " → "간암"
 */
export function extractLastWord(query: string): string {
  const words = query.trim().split(/\s+/).filter(Boolean);
  return words[words.length - 1]?.toLowerCase() ?? '';
}

/** DOCTORS 데이터 기반 연관검색어 생성 — 마지막 단어 기준 */
export function buildSuggestions(query: string): Suggestion[] {
  const lastWord = extractLastWord(query);
  if (!lastWord) return [];

  const results: Suggestion[] = [];
  const seen = new Set<string>();

  const add = (s: Suggestion) => {
    const key = `${s.type}:${s.label}`;
    if (!seen.has(key)) { seen.add(key); results.push(s); }
  };

  // ── 질환/태그 먼저 ──────────────────────────────────────────
  const diseaseSet = new Set<string>();
  DOCTORS.forEach((d) => {
    if (d.diseaseArea && d.diseaseArea.toLowerCase().includes(lastWord)) {
      d.diseaseArea.split(/[,;·]/).map(s => s.trim()).forEach((dis) => {
        if (dis.toLowerCase().includes(lastWord) && !diseaseSet.has(dis)) {
          diseaseSet.add(dis);
          add({ type: 'disease', label: dis });
        }
      });
    }
    (d.tags || []).forEach((tag) => {
      const clean = tag.replace('#', '').trim();
      if (clean.toLowerCase().includes(lastWord) && !diseaseSet.has(clean)) {
        diseaseSet.add(clean);
        add({ type: 'disease', label: clean });
      }
    });
  });

  // ── 진료과 ──────────────────────────────────────────────────
  const specialtySet = new Set<string>();
  DOCTORS.forEach((d) => {
    const sp = d.specialty.replace(/\s*\(.*?\)/g, '').trim();
    if (sp.toLowerCase().includes(lastWord) && !specialtySet.has(sp)) {
      specialtySet.add(sp);
      add({ type: 'specialty', label: sp });
    }
  });

  // ── 병원 ────────────────────────────────────────────────────
  const hospitalSet = new Set<string>();
  DOCTORS.forEach((d) => {
    if (d.hospital.toLowerCase().includes(lastWord) && !hospitalSet.has(d.hospital)) {
      hospitalSet.add(d.hospital);
      add({ type: 'hospital', label: d.hospital });
    }
  });

  // ── 명의 이름 ───────────────────────────────────────────────
  DOCTORS.forEach((d) => {
    if (d.name.toLowerCase().includes(lastWord)) {
      add({
        type: 'doctor',
        label: d.name,
        sub: `${d.hospital} · ${d.specialty.replace(/\s*\(.*?\)/g, '')}`,
      });
    }
  });

  // 타입별 최대 수 제한 후 반환
  const counts: Record<SuggestionType, number> = { disease: 0, specialty: 0, hospital: 0, doctor: 0 };
  const MAX: Record<SuggestionType, number>    = { disease: 4, specialty: 3, hospital: 3, doctor: 4 };

  return results.filter((s) => {
    if (counts[s.type] >= MAX[s.type]) return false;
    counts[s.type]++;
    return true;
  });
}

/** 마지막 단어만 하이라이트 (멀티워드 쿼리 대응) */
function Highlight({ text, query }: { text: string; query: string }) {
  const lastWord = extractLastWord(query);
  if (!lastWord) return <>{text}</>;
  const escaped = lastWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === lastWord ? (
          <span key={i} className="text-blue-600 font-semibold">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}

interface SearchSuggestionsProps {
  suggestions: Suggestion[];
  query: string;
  onSelect: (label: string) => void;
}

export function SearchSuggestions({ suggestions, query, onSelect }: SearchSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
      <ul>
        {suggestions.map((s, idx) => {
          const meta = TYPE_META[s.type];
          return (
            <li key={idx}>
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSelect(s.label)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
              >
                {/* 타입 아이콘 */}
                <div className={`w-7 h-7 rounded-full ${meta.bg} ${meta.color} flex items-center justify-center flex-shrink-0`}>
                  {meta.icon}
                </div>

                {/* 텍스트 */}
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-gray-900">
                    <Highlight text={s.label} query={query} />
                  </span>
                  {s.sub && (
                    <span className="text-xs text-gray-400 ml-1.5">{s.sub}</span>
                  )}
                </div>

                {/* 타입 뱃지 */}
                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${meta.bg} ${meta.color}`}>
                  {meta.badge}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}