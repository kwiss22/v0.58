// 글쓰기 / 수정 모달 컴포넌트
import { X, Shield, Search, Check, Plus, ChevronDown, ImagePlus, Save, AlertCircle } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { VerificationRequestModal, VerificationData } from '@/app/components/VerificationRequestModal';
import { processImages, ResizedImage } from '@/app/utils/imageResize';
import type { PostBodySegment } from '@/constants/community-data';

interface InitialPostData {
  title: string;
  content: string;
  department: string;
  userRole: 'patient' | 'caregiver';
  ageGroup?: string;
  disease?: string;
  emotion?: 'good' | 'normal' | 'bad' | 'very_bad';
  attachedImages?: ResizedImage[];
  bodySegments?: PostBodySegment[];
}

interface WritePostModalProps {
  onClose: () => void;
  onSubmit: (post: {
    title: string;
    content: string;
    department: string;
    userRole: 'patient' | 'caregiver';
    ageGroup?: string;
    disease?: string;
    emotion?: 'good' | 'normal' | 'bad' | 'very_bad';
    requestVerification?: boolean;
    verificationData?: { receiptImage?: string };
    attachedImages?: ResizedImage[];
    bodySegments?: PostBodySegment[];
  }) => void;
  initialData?: InitialPostData;
  isEditMode?: boolean;
  postId?: string; // 수정 모드 시 게시글 ID (edit draft 키 생성용)
}

// ─── 상수 ───────────────────────────────────────────────────────────────────
const RECENT_DISEASES_KEY = 'aiga_custom_diseases';
const DRAFT_KEY = 'aiga_post_draft';
const EDIT_DRAFT_PREFIX = 'aiga_edit_draft_';
const MAX_RECENT = 5;
/** 제목 입력 상한(글자 수). 초과 시 입력·붙여넣기 모두 막음 */
const TITLE_MAX_LENGTH = 50;

const ALL_DISEASES = [
  '역류성식도염', '아토피', '천식', '당뇨', '고혈압', '비염',
  '위염', '장염', '감기', '독감', '폐렴', '축농증',
  '중이염', '편도염', '피부염', '건선', '두드러기', '여드름',
  '관절염', '요통', '디스크', '골절', '염좌', '타박상',
  '우울증', '불안장애', '불면증', '공황장애',
  '결막염', '백내장', '녹내장', '난시', '근시',
  '열성경련', '수족구', '빈혈', '갑상선', '통풍',
  '허리디스크', '위궤양', '대장염', '습진', '기관지염', '부정맥',
];

const COMMON_DISEASES = [
  '역류성식도염', '아토피', '천식', '당뇨', '고혈압', '비염',
  '위염', '관절염', '우울증', '열성경련', '공황장애', '허리디스크',
];

const DISEASE_DEPT_MAP: Record<string, string> = {
  '역류성식도염': '소화기내과',
  '위염': '소화기내과',
  '장염': '소화기내과',
  '위궤양': '소화기내과',
  '대장염': '소화기내과',
  '아토피': '피부과',
  '피부염': '피부과',
  '건선': '피부과',
  '두드러기': '피부과',
  '여드름': '피부과',
  '습진': '피부과',
  '천식': '호흡기내과',
  '폐렴': '호흡기내과',
  '기관지염': '호흡기내과',
  '당뇨': '내분비내과',
  '갑상선': '내분비내과',
  '고혈압': '순환기내과',
  '부정맥': '순환기내과',
  '비염': '이비인후과',
  '축농증': '이비인후과',
  '중이염': '이비인후과',
  '편도염': '이비인후과',
  '관절염': '정형외과',
  '요통': '정형외과',
  '디스크': '정형외과',
  '골절': '정형외과',
  '염좌': '정형외과',
  '타박상': '정형외과',
  '허리디스크': '정형외과',
  '우울증': '정신건강의학과',
  '불안장애': '정신건강의학과',
  '불면증': '정신건강의학과',
  '공황장애': '정신건강의학과',
  '결막염': '안과',
  '백내장': '안과',
  '녹내장': '안과',
  '난시': '안과',
  '근시': '안과',
  '열성경련': '소아청소년과',
  '수족구': '소아청소년과',
  '감기': '내과',
  '독감': '내과',
  '빈혈': '내과',
  '통풍': '내과',
};

const DEPARTMENTS = [
  '소화기내과', '피부과', '호흡기내과', '내분비내과', '순환기내과',
  '이비인후과', '정형외과', '정신건강의학과', '안과', '소아청소년과',
  '내과', '외과', '산부인과', '비뇨기과', '신경과', '재활의학과', '기타',
];

/** 질환명 기준 초기 진료과 (서버에 department 없을 때 매핑) */
function initialDepartmentFromProps(data?: InitialPostData): string {
  if (data?.department) return data.department;
  if (data?.disease) {
    return DISEASE_DEPT_MAP[data.disease] ?? '기타';
  }
  return '';
}

function initialShowDeptOverride(data?: InitialPostData): boolean {
  if (!data?.disease) return false;
  if (data.department) return false;
  return !DISEASE_DEPT_MAP[data.disease];
}

function pruneImageMeta(root: HTMLElement, meta: Map<string, ResizedImage>) {
  const ids = new Set(
    [...root.querySelectorAll('img[data-rid]')].map(el => el.getAttribute('data-rid')).filter((x): x is string => !!x),
  );
  for (const id of meta.keys()) {
    if (!ids.has(id)) meta.delete(id);
  }
}

function makeImageElement(img: ResizedImage): HTMLImageElement {
  const imgEl = document.createElement('img');
  imgEl.src = img.thumbnail || img.url;
  imgEl.setAttribute('data-rid', img.id);
  imgEl.setAttribute('alt', img.name);
  imgEl.contentEditable = 'false';
  imgEl.draggable = false;
  imgEl.className =
    'mx-auto my-2 block max-h-56 max-w-full rounded-lg border border-gray-200 object-contain select-none';
  return imgEl;
}

function getPlainTextFromEditor(root: HTMLElement): string {
  return (root.innerText || '').replace(/\u200b/g, '').trim();
}

/** 에디터 DOM 순서대로 텍스트·이미지 세그먼트 생성 (게시 후 동일 순서 표시용) */
function getBodySegmentsFromEditor(root: HTMLElement): PostBodySegment[] {
  const out: PostBodySegment[] = [];
  let textAcc = '';

  function flushText() {
    if (textAcc.length > 0) {
      out.push({ type: 'text', text: textAcc });
      textAcc = '';
    }
  }

  function walk(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      textAcc += (node.textContent || '').replace(/\u200b/g, '');
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tag = el.tagName;
    if (tag === 'IMG' && el.hasAttribute('data-rid')) {
      flushText();
      const rid = el.getAttribute('data-rid');
      if (rid) out.push({ type: 'image', imageId: rid });
      return;
    }
    if (tag === 'BR') {
      textAcc += '\n';
      return;
    }
    for (const child of Array.from(node.childNodes)) {
      walk(child);
    }
  }

  for (const child of Array.from(root.childNodes)) {
    walk(child);
  }
  flushText();
  return out;
}

function getOrderedImagesFromEditor(root: HTMLElement, meta: Map<string, ResizedImage>): ResizedImage[] {
  const out: ResizedImage[] = [];
  root.querySelectorAll('img[data-rid]').forEach(el => {
    const id = el.getAttribute('data-rid');
    if (id && meta.has(id)) out.push(meta.get(id)!);
  });
  return out;
}

function countEditorImages(root: HTMLElement): number {
  return root.querySelectorAll('img[data-rid]').length;
}

function getEditorCharCount(root: HTMLElement): number {
  return (root.innerText || '').replace(/\u200b/g, '').length;
}

function insertImagesAtCaret(
  editor: HTMLElement,
  images: ResizedImage[],
  meta: Map<string, ResizedImage>,
  savedRange: Range | null,
) {
  editor.focus();
  const sel = window.getSelection();
  let range: Range;
  if (savedRange && editor.contains(savedRange.commonAncestorContainer)) {
    range = savedRange.cloneRange();
  } else {
    range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false);
  }
  sel?.removeAllRanges();
  sel?.addRange(range);

  for (const im of images) {
    if (countEditorImages(editor) >= 10) break;
    meta.set(im.id, im);
    const imgEl = makeImageElement(im);
    range.insertNode(imgEl);
    range.setStartAfter(imgEl);
    range.collapse(true);
  }
  sel?.removeAllRanges();
  sel?.addRange(range);
}

function fillEditorFromDraft(el: HTMLElement, draft: PostDraft, meta: Map<string, ResizedImage>) {
  if (draft.editorHtml && draft.editorHtml.trim()) {
    meta.clear();
    if (draft.imagesMetaJson) {
      try {
        const pairs = JSON.parse(draft.imagesMetaJson) as [string, ResizedImage][];
        for (const [id, im] of pairs) meta.set(id, im);
      } catch {
        /* ignore */
      }
    }
    el.innerHTML = draft.editorHtml;
    pruneImageMeta(el, meta);
    if (!el.innerHTML.trim()) {
      el.appendChild(document.createElement('br'));
    }
    return;
  }
  if (draft.blocksJson && fillEditorFromBlocksJson(el, draft.blocksJson, meta)) {
    return;
  }
  el.innerHTML = '';
  meta.clear();
  const text = draft.content ?? '';
  if (text) {
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      el.appendChild(document.createTextNode(line));
      if (i < lines.length - 1) el.appendChild(document.createElement('br'));
    });
  }
  if (!text.trim()) {
    el.appendChild(document.createElement('br'));
  }
}

function fillEditorFromInitial(el: HTMLElement, initial: InitialPostData | undefined, meta: Map<string, ResizedImage>) {
  el.innerHTML = '';
  meta.clear();
  if (initial?.bodySegments?.length) {
    const imgMap = new Map((initial.attachedImages || []).map(im => [im.id, im]));
    for (const seg of initial.bodySegments) {
      if (seg.type === 'text') {
        const lines = seg.text.split('\n');
        lines.forEach((line, i) => {
          el.appendChild(document.createTextNode(line));
          if (i < lines.length - 1) el.appendChild(document.createElement('br'));
        });
      } else {
        const im = imgMap.get(seg.imageId);
        if (im) {
          meta.set(im.id, im);
          el.appendChild(makeImageElement(im));
        }
      }
    }
    if (!el.childNodes.length) {
      el.appendChild(document.createElement('br'));
    }
    return;
  }
  const text = initial?.content ?? '';
  if (text) {
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      el.appendChild(document.createTextNode(line));
      if (i < lines.length - 1) el.appendChild(document.createElement('br'));
    });
  }
  for (const im of initial?.attachedImages || []) {
    meta.set(im.id, im);
    el.appendChild(makeImageElement(im));
    el.appendChild(document.createElement('br'));
  }
  if (!text && !(initial?.attachedImages?.length)) {
    el.appendChild(document.createElement('br'));
  }
}

/** 구버전 blocksJson 복원 */
function fillEditorFromBlocksJson(el: HTMLElement, blocksJson: string, meta: Map<string, ResizedImage>): boolean {
  try {
    const raw = JSON.parse(blocksJson) as unknown;
    if (!Array.isArray(raw)) return false;
    el.innerHTML = '';
    meta.clear();
    for (const item of raw) {
      if (!item || typeof item !== 'object') continue;
      const o = item as Record<string, unknown>;
      if (o.type === 'text' && typeof o.text === 'string') {
        const lines = o.text.split('\n');
        lines.forEach((line, i) => {
          el.appendChild(document.createTextNode(line));
          if (i < lines.length - 1) el.appendChild(document.createElement('br'));
        });
      } else if (o.type === 'image' && o.image && typeof o.image === 'object') {
        const im = o.image as ResizedImage;
        meta.set(im.id, im);
        el.appendChild(makeImageElement(im));
        el.appendChild(document.createElement('br'));
      }
    }
    return true;
  } catch {
    return false;
  }
}

// localStorage helpers
function loadRecentDiseases(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_DISEASES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveRecentDisease(name: string) {
  const existing = loadRecentDiseases().filter(d => d !== name);
  const updated = [name, ...existing].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_DISEASES_KEY, JSON.stringify(updated));
}

// 임시저장 helpers
interface PostDraft {
  title: string;
  content: string;
  /** 통합 에디터 HTML (임시저장 복원용) */
  editorHtml?: string;
  /** 이미지 메타(JSON). innerHTML의 data-rid와 매칭 */
  imagesMetaJson?: string;
  /** 구버전 임시저장 */
  blocksJson?: string;
  selectedDisease: string;
  department: string;
  userRole: 'patient' | 'caregiver';
  ageGroup: string;
  emotion: string;
  savedAt: string;
}

function loadDraft(key = DRAFT_KEY): PostDraft | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveDraft(draft: Omit<PostDraft, 'savedAt'>, key = DRAFT_KEY) {
  localStorage.setItem(key, JSON.stringify({ ...draft, savedAt: new Date().toISOString() }));
}

function clearDraft(key = DRAFT_KEY) {
  localStorage.removeItem(key);
}

function formatSavedAt(iso: string): string {
  const d = new Date(iso);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

// ──── 컴포넌트 ───────────────────────────────────────────────────────────────
export function WritePostModal({ onClose, onSubmit, initialData, isEditMode = false, postId }: WritePostModalProps) {
  // 모드별 draft 키
  const draftKey = isEditMode && postId ? `${EDIT_DRAFT_PREFIX}${postId}` : DRAFT_KEY;

  // ── 기본 폼 state
  const [title, setTitle] = useState(() => (initialData?.title ?? '').slice(0, TITLE_MAX_LENGTH));
  const [department, setDepartment] = useState(() => initialDepartmentFromProps(initialData));
  const [userRole, setUserRole] = useState<'patient' | 'caregiver'>(initialData?.userRole || 'patient');
  const [ageGroup, setAgeGroup] = useState(initialData?.ageGroup || '');
  const [emotion, setEmotion] = useState<'good' | 'normal' | 'bad' | 'very_bad' | ''>(initialData?.emotion || '');
  const [requestVerification, setRequestVerification] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);

  // ── 임시저장 state
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const [draftInfo, setDraftInfo] = useState<PostDraft | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** 게시 완료 후 대기 중인 자동저장 타이머가 draft를 다시 쓰지 않도록 */
  const suppressAutoSaveRef = useRef(false);

  const cancelPendingAutoSave = useCallback(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => cancelPendingAutoSave(), [cancelPendingAutoSave]);

  // ── 통합 본문 에디터 (텍스트·이미지)
  const editorRef = useRef<HTMLDivElement>(null);
  const imageMetaRef = useRef<Map<string, ResizedImage>>(new Map());
  const savedRangeRef = useRef<Range | null>(null);
  const [editorInit, setEditorInit] = useState<{ kind: 'initial' | 'draft'; nonce: number } | null>(null);
  const [contentLen, setContentLen] = useState(0);
  const [editorImageCount, setEditorImageCount] = useState(0);
  const [editorTick, setEditorTick] = useState(0);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [privacyWarnPulse, setPrivacyWarnPulse] = useState(false);
  const privacyWarnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pulsePrivacyBanner = useCallback(() => {
    if (privacyWarnTimerRef.current) clearTimeout(privacyWarnTimerRef.current);
    setPrivacyWarnPulse(true);
    privacyWarnTimerRef.current = setTimeout(() => {
      setPrivacyWarnPulse(false);
      privacyWarnTimerRef.current = null;
    }, 4000);
  }, []);

  useEffect(() => () => {
    if (privacyWarnTimerRef.current) clearTimeout(privacyWarnTimerRef.current);
  }, []);

  // ── 질환명 통합 검색 state (triggerAutoSave deps보다 먼저 선언해야 TDZ 방지)
  const [selectedDisease, setSelectedDisease] = useState<string>(initialData?.disease || '');
  const [diseaseQuery, setDiseaseQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentDiseases, setRecentDiseases] = useState<string[]>(loadRecentDiseases);
  const [showDeptOverride, setShowDeptOverride] = useState(() => initialShowDeptOverride(initialData));
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ── 마운트 시 임시저장 확인 (신규 + 수정 모두)
  useEffect(() => {
    let showBanner = false;
    const draft = loadDraft(draftKey);
    if (draft && (draft.title || draft.content || draft.selectedDisease)) {
      if (isEditMode) {
        const isDifferent =
          draft.title !== (initialData?.title || '') ||
          draft.content !== (initialData?.content || '') ||
          draft.selectedDisease !== (initialData?.disease || '');
        if (isDifferent) {
          setDraftInfo(draft);
          setShowDraftBanner(true);
          showBanner = true;
        }
      } else {
        setDraftInfo(draft);
        setShowDraftBanner(true);
        showBanner = true;
      }
    }
    if (!showBanner) {
      setEditorInit({ kind: 'initial', nonce: 1 });
    }
  }, [draftKey]);

  const syncEditorDom = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    pruneImageMeta(el, imageMetaRef.current);
    setContentLen(getPlainTextFromEditor(el).length);
    setEditorImageCount(countEditorImages(el));
    setEditorTick(t => t + 1);
  }, []);

  // 에디터 초기 채우기 (임시저장 배너 없을 때 / 불러오기·버리기 후)
  useEffect(() => {
    if (!editorInit) return;
    const el = editorRef.current;
    if (!el) return;
    if (editorInit.kind === 'initial') {
      fillEditorFromInitial(el, initialData, imageMetaRef.current);
    } else if (draftInfo) {
      fillEditorFromDraft(el, draftInfo, imageMetaRef.current);
    }
    pruneImageMeta(el, imageMetaRef.current);
    setContentLen(getPlainTextFromEditor(el).length);
    setEditorImageCount(countEditorImages(el));
    setEditorTick(t => t + 1);
  }, [editorInit, draftInfo, initialData]);

  useEffect(() => {
    const onSel = () => {
      const editor = editorRef.current;
      if (!editor) return;
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      const r = sel.getRangeAt(0);
      if (editor.contains(r.commonAncestorContainer)) {
        savedRangeRef.current = r.cloneRange();
      }
    };
    document.addEventListener('selectionchange', onSel);
    return () => document.removeEventListener('selectionchange', onSel);
  }, []);

  // ── 자동저장 (3초 debounce) — 신규·수정 모두 동작
  const triggerAutoSave = useCallback(() => {
    if (suppressAutoSaveRef.current) return;
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      if (suppressAutoSaveRef.current) return;
      const el = editorRef.current;
      const plain = el ? getPlainTextFromEditor(el) : '';
      if (title || plain || selectedDisease) {
        saveDraft({
          title,
          content: plain,
          editorHtml: el?.innerHTML ?? '',
          imagesMetaJson: JSON.stringify([...imageMetaRef.current.entries()]),
          selectedDisease,
          department,
          userRole,
          ageGroup,
          emotion,
        }, draftKey);
        setLastSavedAt(formatSavedAt(new Date().toISOString()));
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2000);
      }
    }, 3000);
  }, [title, editorTick, selectedDisease, department, userRole, ageGroup, emotion, draftKey]);

  const openImagePicker = () => {
    const el = editorRef.current;
    if (!el || countEditorImages(el) >= 10) return;
    pulsePrivacyBanner();
    requestAnimationFrame(() => imageInputRef.current?.click());
  };

  const handleEditorImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;

    for (const file of files) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert(`${file.name}: JPG, PNG, WEBP 형식만 첨부할 수 있어요.`);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name}: 파일 크기는 5MB 이하여야 해요.`);
        return;
      }
    }

    const editor = editorRef.current;
    if (!editor) return;

    processImages(files)
      .then(resizedImages => {
        if (!resizedImages.length) return;
        const remaining = 10 - countEditorImages(editor);
        if (remaining <= 0) return;
        const slice = resizedImages.slice(0, remaining);
        if (slice.length < resizedImages.length) {
          alert('이미지는 최대 10장까지 첨부할 수 있어요.');
        }
        insertImagesAtCaret(editor, slice, imageMetaRef.current, savedRangeRef.current);
        syncEditorDom();
      })
      .catch(error => {
        console.error('Image processing failed:', error);
        alert('이미지 처리 중 오류가 발생했습니다.');
      });
  };

  // 자동저장 트리거 (주요 필드 변경 시)
  useEffect(() => {
    triggerAutoSave();
  }, [title, editorTick, selectedDisease, department, userRole, ageGroup, emotion, triggerAutoSave]);

  // 검색 결과
  const trimmed = diseaseQuery.trim();
  const filteredDiseases = trimmed
    ? ALL_DISEASES.filter(d => d.includes(trimmed))
    : [];
  const hasExactMatch = ALL_DISEASES.includes(trimmed);
  const showAddOption = trimmed.length >= 1 && !hasExactMatch;

  // 드롭다운 바깥 클릭 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        searchRef.current && !searchRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 질환 선택 (목록 or 최근 or 커스텀 추가)
  const handleSelectDisease = (name: string, isCustom = false) => {
    setSelectedDisease(name);
    setDiseaseQuery('');
    setIsSearchFocused(false);
    // 진료과 자동 매핑
    const mapped = DISEASE_DEPT_MAP[name];
    if (mapped) {
      setDepartment(mapped);
      setShowDeptOverride(false);
    } else {
      setDepartment('기타');
      setShowDeptOverride(true); // 커스텀 질환이면 진료과 선택 표시
    }
    // 커스텀 질환이면 localStorage 저장
    if (isCustom || !ALL_DISEASES.includes(name)) {
      saveRecentDisease(name);
      setRecentDiseases(loadRecentDiseases());
    }
  };

  // 선택 해제
  const handleClearDisease = () => {
    setSelectedDisease('');
    setDepartment('');
    setShowDeptOverride(false);
    setDiseaseQuery('');
    setTimeout(() => searchRef.current?.focus(), 50);
  };

  // 인증
  const handleVerificationClick = () => {
    if (!requestVerification) {
      setRequestVerification(true);
      setShowVerificationModal(true);
    } else {
      setRequestVerification(false);
      setVerificationData(null);
    }
  };

  // 임시저장 불러오기
  const handleRestoreDraft = () => {
    if (!draftInfo) return;
    setTitle((draftInfo.title ?? '').slice(0, TITLE_MAX_LENGTH));
    setSelectedDisease(draftInfo.selectedDisease);
    setDepartment(draftInfo.department);
    setUserRole(draftInfo.userRole);
    setAgeGroup(draftInfo.ageGroup);
    setEmotion(draftInfo.emotion as 'good' | 'normal' | 'bad' | 'very_bad' | '');
    setShowDraftBanner(false);
    setLastSavedAt(draftInfo.savedAt ? formatSavedAt(draftInfo.savedAt) : null);
    setEditorInit({ kind: 'draft', nonce: Date.now() });
  };

  // 임시저장 버리기
  const handleDiscardDraft = () => {
    clearDraft(draftKey);
    setShowDraftBanner(false);
    setDraftInfo(null);
    setEditorInit({ kind: 'initial', nonce: Date.now() });
  };

  // 닫기 버튼 — 내용 있으면 자동 임시저장 후 닫기
  const handleClose = () => {
    const el = editorRef.current;
    const plain = el ? getPlainTextFromEditor(el) : '';
    if (title || plain || selectedDisease) {
      saveDraft({
        title,
        content: plain,
        editorHtml: el?.innerHTML ?? '',
        imagesMetaJson: JSON.stringify([...imageMetaRef.current.entries()]),
        selectedDisease,
        department,
        userRole,
        ageGroup,
        emotion,
      }, draftKey);
    }
    onClose();
  };

  // 제출
  const handleSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    const el = editorRef.current;
    const plainBody = el ? getPlainTextFromEditor(el) : '';
    if (!title.trim() || !plainBody) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    if (!selectedDisease.trim()) {
      alert('질환명을 선택하거나 입력해주세요.');
      return;
    }
    if (!department) {
      alert('진료과를 선택해주세요.');
      return;
    }
    const attached = el ? getOrderedImagesFromEditor(el, imageMetaRef.current) : [];
    const bodySegments = el ? getBodySegmentsFromEditor(el) : [];
    suppressAutoSaveRef.current = true;
    cancelPendingAutoSave();
    clearDraft(draftKey); // 완료 시 해당 draft 삭제
    onSubmit({
      title: title.trim(),
      content: plainBody,
      department,
      userRole,
      ageGroup: ageGroup || undefined,
      disease: selectedDisease.trim(),
      emotion: emotion || undefined,
      requestVerification,
      verificationData: requestVerification ? verificationData || undefined : undefined,
      attachedImages: attached.length > 0 ? attached : undefined,
      bodySegments: bodySegments.length > 0 ? bodySegments : undefined,
    });
    onClose();
  };

  // 드롭다운에서 보여줄 항목 결정
  const showDropdown = isSearchFocused;
  const showRecentSection = recentDiseases.length > 0 && !trimmed;
  const showCommonSection = !trimmed;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[calc(100%-2rem)] overflow-hidden flex flex-col">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">
              {isEditMode ? '게시글 수정' : '치료 정보 나누기'}
            </h2>
            {/* 자동저장 표시 - 신규/수정 모두 표시 */}
            {lastSavedAt && (
              <span className={`flex items-center gap-1 text-xs transition-all duration-300 ${justSaved ? 'text-green-600' : 'text-gray-400'}`}>
                <Save className="w-3 h-3" />
                {justSaved ? '저장됨' : `${lastSavedAt} 저장`}
              </span>
            )}
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* ── Form ─────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ── 질환명 통합 검색 ──────────────────────────────────── */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-900">
              질환명 <span className="text-red-500">*</span>
            </label>

            {/* 선택 완료 상태: 확정 태그 */}
            {selectedDisease ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full">
                  <Check className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-medium">{selectedDisease}</span>
                  <button
                    type="button"
                    onClick={handleClearDisease}
                    className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-xs text-gray-400">다른 질환으로 꾸려면 × 클릭</span>
              </div>
            ) : (
              /* 검색 인터페이스 */
              <div className="relative">
                {/* 검색 입력창 */}
                <div className={`flex items-center gap-2 px-4 py-3 border-2 rounded-xl transition-colors ${
                  isSearchFocused ? 'border-blue-500 bg-white' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}>
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={diseaseQuery}
                    onChange={e => setDiseaseQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="질환명 검색 또는 직접 입력..."
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                  {diseaseQuery && (
                    <button
                      type="button"
                      onClick={() => setDiseaseQuery('')}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* ── 드롭다운 ── */}
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-72 overflow-y-auto"
                  >
                    {/* 검색 결과가 있을 때 */}
                    {trimmed && filteredDiseases.length > 0 && (
                      <div className="p-3">
                        <p className="text-xs text-gray-400 font-medium mb-2 px-1">검색 결과</p>
                        <div className="flex flex-wrap gap-2">
                          {filteredDiseases.map(d => (
                            <button
                              key={d}
                              type="button"
                              onMouseDown={e => { e.preventDefault(); handleSelectDisease(d); }}
                              className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                              {/* 검색어 하이라이트 */}
                              {d.split(trimmed).map((part, i, arr) => (
                                <span key={i}>
                                  {part}
                                  {i < arr.length - 1 && (
                                    <span className="text-blue-600 font-bold">{trimmed}</span>
                                  )}
                                </span>
                              ))}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 검색어 있는데 결과 없음 */}
                    {trimmed && filteredDiseases.length === 0 && (
                      <div className="px-4 py-3">
                        <p className="text-xs text-gray-400 mb-2">일치하는 질환명이 없습니다</p>
                      </div>
                    )}

                    {/* 직접 추가 버튼 */}
                    {showAddOption && (
                      <div className={`px-3 pb-3 ${filteredDiseases.length > 0 ? 'border-t border-gray-100 pt-3' : 'pt-1'}`}>
                        <button
                          type="button"
                          onMouseDown={e => { e.preventDefault(); handleSelectDisease(trimmed, true); }}
                          className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-left"
                        >
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                            <Plus className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div>
                            <span className="text-sm text-blue-700 font-medium">
                              '{trimmed}' 추가하기
                            </span>
                            <p className="text-xs text-blue-500 mt-0.5">목록에 없는 질환을 직접 등록합니다</p>
                          </div>
                        </button>
                      </div>
                    )}

                    {/* 자주 찾는 질환 */}
                    {showCommonSection && (
                      <div className="p-3">
                        <p className="text-xs text-gray-400 font-medium mb-2 px-1">주 찾는 질환</p>
                        <div className="flex flex-wrap gap-2">
                          {COMMON_DISEASES.map(d => (
                            <button
                              key={d}
                              type="button"
                              onMouseDown={e => { e.preventDefault(); handleSelectDisease(d); }}
                              className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 검색어 없이 비어 있을 때 힌트 */}
                    {!trimmed && recentDiseases.length === 0 && (
                      <div className="p-3" />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── 진료과 확인 / 커스텀 질환 시 선택 ──────────────── */}
          {department && selectedDisease && !showDeptOverride && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-blue-500 font-medium">질환명에 맞춰 진료과가 자동 선택되었어요</p>
                  <p className="text-sm font-bold text-gray-900">
                    {department}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 커스텀 질환 → 진료과 직접 선택 */}
          {showDeptOverride && selectedDisease && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shrink-0">
                  <ChevronDown className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-sm font-bold text-gray-900">
                  진료과를 선택해주세요
                </p>
                <span className="text-xs text-amber-600">직접 입력한 질환은 진료과를 수동 설정합니다</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {DEPARTMENTS.map(dept => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setDepartment(dept)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      department === dept
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── 제목 ────────────────────────────────────────────── */}
          <div>
            <label htmlFor="write-post-title" className="block text-sm font-bold text-gray-900 mb-3">
              제목 <span className="text-red-500">*</span>
            </label>
            <div className="rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
              <input
                id="write-post-title"
                type="text"
                value={title}
                maxLength={TITLE_MAX_LENGTH}
                onChange={e => setTitle(e.target.value)}
                placeholder="진료 경험을 요약한 제목을 입력하세요"
                className="w-full rounded-t-lg border-0 bg-transparent px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                aria-describedby="write-post-title-counter"
                autoComplete="off"
              />
              <div className="flex justify-end px-3 pb-2 pt-0">
                <span
                  id="write-post-title-counter"
                  className={`text-xs tabular-nums ${
                    title.length >= TITLE_MAX_LENGTH ? 'font-medium text-orange-600' : 'text-gray-500'
                  }`}
                  aria-live="polite"
                >
                  {title.length}/{TITLE_MAX_LENGTH}
                </span>
              </div>
            </div>
          </div>

          {/* ── 내용 (통합 입력: 텍스트 + 커서 위치 이미지) ─────────── */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              내용 <span className="text-red-500">*</span>
            </label>

            <div
              className={`mb-3 rounded-lg border p-3 flex items-start gap-2 transition-all duration-300 ${
                privacyWarnPulse
                  ? 'bg-yellow-100 border-yellow-400 ring-2 ring-yellow-300 shadow-sm'
                  : 'bg-yellow-50 border-yellow-200'
              }`}
              role="note"
              aria-live="polite"
            >
              <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-700 leading-relaxed">
                개인정보 보호를 위해{' '}
                <span className="font-semibold">주민등록번호, 전화번호, 상세 주소</span> 등 민감한 정보는 본문과 사진에
                올리지 마세요. 사진을 첨부할 때도 촬영/스크린샷에 다른 정보가 보이지 않도록 가려 주세요.
              </p>
            </div>

            <div
              className={`border rounded-lg overflow-hidden transition-colors ${
                contentLen === 0
                  ? 'border-gray-200 focus-within:ring-2 focus-within:ring-blue-500'
                  : contentLen < 50
                    ? 'border-orange-400 bg-orange-50 focus-within:ring-2 focus-within:ring-orange-400'
                    : 'border-green-400 bg-green-50 focus-within:ring-2 focus-within:ring-green-500'
              }`}
            >
              <div className="relative overflow-hidden">
                {contentLen === 0 && editorImageCount === 0 && (
                  <div className="pointer-events-none absolute left-4 top-3 right-4 text-sm text-gray-400 whitespace-pre-line break-words leading-relaxed z-0">
                    {`진료 경험을 자세히 공유해주세요
- 어떤 증상이 있었나요?
- 어떤 치료를 받았나요?
- 결과는 어땠나요?

- 리뷰는 최소 50자 이상이어야 합니다. 욕설, 비방, 무의미한 반복적인 글귀는 삭제될 수 있습니다.`}
                  </div>
                )}
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  lang="ko"
                  translate="no"
                  className={`relative z-[1] w-full min-h-[120px] max-h-[min(70vh,520px)] overflow-y-auto px-4 py-3 outline-none bg-transparent`}
                  onInput={syncEditorDom}
                  onBlur={syncEditorDom}
                />
              </div>

              {/* 내용 textarea 하단 구분선 */}
              <div className="border-t border-gray-100" />

              {/* 구분선 아래 사진 추가 버튼 */}
              <div className="p-3 flex items-center justify-start gap-3">
                <button
                  type="button"
                  onMouseDown={e => e.preventDefault()}
                  disabled={editorImageCount >= 10}
                  onClick={openImagePicker}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    editorImageCount >= 10
                      ? 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ImagePlus className="w-4 h-4" />
                  사진 추가
                </button>
                <span className="text-sm text-gray-600 tabular-nums">
                  ({editorImageCount}/10)
                </span>
              </div>

              <input
                ref={imageInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleEditorImageInput}
                className="hidden"
              />
            </div>

            <div className="mt-2 space-y-1">
              <div
                className={`flex flex-wrap items-center justify-between gap-2 text-xs transition-colors ${
                  contentLen === 0
                    ? 'text-gray-400'
                    : contentLen < 50
                      ? 'text-orange-500'
                      : 'text-green-600'
                }`}
              >
                <span>
                  {contentLen === 0 && '최소 50자 이상 작성해주세요'}
                  {contentLen > 0 && contentLen < 50 && (
                    <span className="flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400" />
                      {50 - contentLen}자 더 작성하면 등록할 수 있어요
                    </span>
                  )}
                  {contentLen >= 50 && (
                    <span className="flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                      작성 조건 충족 ✓
                    </span>
                  )}
                </span>
                <span className={`tabular-nums font-medium ${contentLen >= 50 ? 'text-green-600' : ''}`}>
                  {contentLen}자
                </span>
              </div>
              {contentLen > 0 && contentLen < 50 && (
                <div className="h-1 bg-orange-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-400 rounded-full transition-all duration-150"
                    style={{ width: `${(contentLen / 50) * 100}%` }}
                  />
                </div>
              )}
            </div>

            <p className="mt-2 text-xs text-gray-400">JPG·PNG·WEBP, 장당 5MB 이하 · 본문에서 이미지를 선택해 삭제할 수 있어요</p>
          </div>

          {/* ── 병원 인증 (새 글 작성 시에만) ─────────────────── */}
          {!isEditMode && (
            <div className="space-y-3">
              <div
                onClick={handleVerificationClick}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  requestVerification
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={requestVerification}
                    onChange={() => {}}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">
                      🏥 병원 진료 인증하고 신뢰 배지 받기
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      실제 진료 증빙 시 신뢰도가 높아지고 더 많은 용자에게 노출됩니다
                    </p>
                  </div>
                  {requestVerification && verificationData && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-bold">
                      <Shield className="w-4 h-4" />
                      <span>인증 준비</span>
                    </div>
                  )}
                </div>
              </div>
              {showVerificationModal && (
                <VerificationRequestModal
                  onClose={() => { setShowVerificationModal(false); setRequestVerification(false); }}
                  onVerificationData={data => { setVerificationData(data); setShowVerificationModal(false); }}
                />
              )}
            </div>
          )}

          {/* ── 수정 모드 안내 ───────────────────────────────────── */}
          {isEditMode && (
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-xs text-amber-700">
                ✏️ <span className="font-medium">수정 안내:</span> 인증 배지는 수정 후에도 유지됩니다. 내용을 변경해도 기존 공감·댓글은 사라지지 않습니다.
              </p>
            </div>
          )}

          {/* ── 작성 팁 ─────────────────────────────────────────── */}
          {!isEditMode && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs text-gray-500">
                💡 <span className="font-medium">작성 팁:</span> 구체적인 증상, 치료 과정, 결과를 상세히 작성하면 다른 환우들에게 더 큰 도움이 됩니다.
              </p>
            </div>
          )}
        </form>

        {/* ── Footer ────────────────────────────────────────────── */}
        <div className="p-4 border-t border-gray-200 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {isEditMode ? '수정 완료' : '게시하기'}
          </button>
        </div>

        {/* ── 임시저장 복원 (카드 전체 덮음, DOM 맨 위 레이어로 클릭 보장) ── */}
        {showDraftBanner && draftInfo && (
          <div
            className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 p-6 pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="draft-restore-title"
          >
            <div
              className="relative z-[101] w-full max-w-xs rounded-2xl bg-white p-6 shadow-2xl pointer-events-auto"
              onMouseDown={e => e.stopPropagation()}
              onClick={e => e.stopPropagation()}
            >
              <p id="draft-restore-title" className="mb-3 text-base font-bold text-gray-900">
                AIGA
              </p>
              <p className="mb-1 text-sm leading-relaxed text-gray-600">
                {isEditMode
                  ? '기존에 수정 중이던 데이터가 있습니다. 불러오시겠습니까?'
                  : '기존에 작성중인 게시데이터가 있습니다. 불러오시겠습니까?'}
              </p>
              {draftInfo.savedAt && (
                <p className="mb-5 text-xs text-gray-400">
                  {formatSavedAt(draftInfo.savedAt)} 저장
                  {draftInfo.title ? ` · ${draftInfo.title}` : draftInfo.selectedDisease ? ` · ${draftInfo.selectedDisease}` : ''}
                </p>
              )}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleDiscardDraft}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                  {isEditMode ? '취소(원본으로)' : '취소(삭제)'}
                </button>
                <button
                  type="button"
                  onClick={handleRestoreDraft}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  불러오기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}