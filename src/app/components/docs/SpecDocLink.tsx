import { cn } from '@/app/components/ui/utils';
import { useAppNavigation } from '@/app/contexts/AppNavigationContext';
import { useUser } from '@/app/contexts/UserContext';
import { SPEC_DOC_ROUTES, type SpecDocRouteId } from './specDocRoutes';

type SpecDocLinkProps = {
  to: SpecDocRouteId;
  children: React.ReactNode;
  className?: string;
};

/**
 * 화면정의서 내 교차 참조 — 클릭 시 해당 정의서 탭·섹션으로 스크롤 (앱 내장)
 */
export function SpecDocLink({ to, children, className }: SpecDocLinkProps) {
  const route = SPEC_DOC_ROUTES[to];
  const { openSpecSection } = useAppNavigation();
  const { setRole } = useUser();

  return (
    <button
      type="button"
      onClick={() => {
        if (route.role) setRole(route.role);
        openSpecSection({ tab: route.tab, sectionId: route.sectionId });
      }}
      className={cn(
        'inline p-0 m-0 align-baseline border-0 bg-transparent cursor-pointer text-indigo-600 underline underline-offset-2 decoration-indigo-300 hover:text-indigo-800 hover:decoration-indigo-500 font-semibold text-left max-w-full break-words',
        className,
      )}
    >
      {children}
    </button>
  );
}
