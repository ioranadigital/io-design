'use client';

import { cn } from '@/lib/utils';

interface HeroGradientProps {
  headline: string;
  subheadline?: string;
  ctaLabel: string;
  ctaHref?: string;
  gradient: 'vibrante' | 'corporativo' | 'minimalista';
  contentPosition?: 'center' | 'left' | 'right';
  className?: string;
}

const gradientMap = {
  vibrante: 'from-cyan-400 via-blue-500 to-purple-600',
  corporativo: 'from-blue-600 to-amber-500',
  minimalista: 'from-gray-800 to-gray-900',
};

export default function HeroGradient({
  headline,
  subheadline,
  ctaLabel,
  ctaHref = '#contact',
  gradient = 'corporativo',
  contentPosition = 'center',
  className = '',
}: HeroGradientProps) {
  const alignMap = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  };

  return (
    <section
      className={cn(
        `relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br ${gradientMap[gradient]} text-white`,
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className={alignMap[contentPosition]}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {headline}
          </h1>

          {subheadline && (
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
              {subheadline}
            </p>
          )}

          <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            <a href={ctaHref}>{ctaLabel}</a>
          </button>
        </div>
      </div>
    </section>
  );
}
