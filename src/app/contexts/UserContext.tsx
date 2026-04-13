import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'guest' | 'member';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  /** SNS 다채널 통합 시 플랫폼별 외부 ID·현재 로그인 채널 등은 `snsAccountMerge` 스텁·백엔드 스키마로 확장 */
}

interface UserContextType {
  role: UserRole;
  user: User | null;
  setRole: (role: UserRole) => void;
  isGuest: boolean;
  isMember: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// 샘플 회원 데이터
const SAMPLE_USER: User = {
  id: 'user-001',
  name: '김사용자',
  email: 'user@example.com',
  avatar: '👤',
  bio: '건강한 삶을 위해 노력하고 있습니다',
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('guest');

  const user = role === 'member' ? SAMPLE_USER : null;
  const isGuest = role === 'guest';
  const isMember = role === 'member';

  return (
    <UserContext.Provider
      value={{
        role,
        user,
        setRole,
        isGuest,
        isMember,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
