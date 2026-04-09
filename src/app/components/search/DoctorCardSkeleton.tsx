// 의사 카드 스켈레톤 - DoctorCard 레이아웃과 동일한 구조

export function DoctorCardSkeleton() {
  return (
    <div className="w-full bg-white p-4 flex items-start gap-3 border-b border-gray-100">
      {/* 프로필 이미지 스켈레톤 */}
      <div className="w-20 h-20 rounded-2xl bg-gray-200 animate-pulse flex-shrink-0" />

      {/* 콘텐츠 */}
      <div className="flex-1 space-y-2 pt-1">
        {/* 병원명 라인 */}
        <div className="flex items-center justify-between">
          <div className="h-3.5 bg-gray-200 animate-pulse rounded-md w-28" />
          <div className="h-3 bg-gray-200 animate-pulse rounded-md w-10" />
        </div>

        {/* 의사 이름 */}
        <div className="h-5 bg-gray-200 animate-pulse rounded-md w-24" />

        {/* 전공 태그 */}
        <div className="flex gap-2 pt-1">
          <div className="h-6 bg-gray-200 animate-pulse rounded-lg w-20" />
        </div>
      </div>

      {/* 화살표 자리 */}
      <div className="w-5 h-5 rounded bg-gray-200 animate-pulse flex-shrink-0 mt-2" />
    </div>
  );
}

/** 스켈레톤 N개를 한 번에 렌더링 */
export function DoctorCardSkeletonList({ count = 10 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <DoctorCardSkeleton key={i} />
      ))}
    </>
  );
}
