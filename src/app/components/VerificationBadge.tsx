// 검증 배지 컴포넌트
import { Check, Shield } from 'lucide-react';

interface VerificationBadgeProps {
  type: 'verified' | 'expert' | 'trusted';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function VerificationBadge({ type, size = 'md', showLabel = false }: VerificationBadgeProps) {
  const configs = {
    verified: {
      icon: Check,
      label: '병원 진료 인증',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
    expert: {
      icon: Shield,
      label: '의료진 인증',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-700',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
    },
    trusted: {
      icon: Check,
      label: '신뢰 사용자',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
  };

  if (showLabel) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
        <Icon className={`${sizeClasses[size]} fill-current`} />
        <span className={`${textSizeClasses[size]} font-medium`}>{config.label}</span>
      </span>
    );
  }

  return (
    <span className="relative group inline-flex items-center justify-center">
      <span className={`${
        size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-6 h-6' : 'w-7 h-7'
      } rounded-full ${
        type === 'verified' ? 'bg-blue-500' : type === 'expert' ? 'bg-purple-500' : 'bg-green-500'
      } flex items-center justify-center shadow-sm`}>
        <Icon className={`${sizeClasses[size]} text-white fill-current`} />
      </span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {config.label}
      </span>
    </span>
  );
}