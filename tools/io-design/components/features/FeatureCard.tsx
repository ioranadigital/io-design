'use client';

import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  variant?: 'icon-top' | 'icon-left' | 'icon-right';
  className?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  variant = 'icon-top',
  className = '',
}: FeatureCardProps) {
  const isHorizontal = variant !== 'icon-top';

  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow',
        isHorizontal ? 'flex items-start gap-4' : '',
        className
      )}
    >
      {(variant === 'icon-left' || variant === 'icon-top') && (
        <div className="text-4xl flex-shrink-0">{icon}</div>
      )}

      <div className={cn(!isHorizontal ? 'text-center' : '')}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      {variant === 'icon-right' && (
        <div className="text-4xl flex-shrink-0 ml-auto">{icon}</div>
      )}
    </div>
  );
}
