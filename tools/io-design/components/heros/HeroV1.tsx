'use client';

import { cn } from '@/lib/utils';

interface HeroV1Props {
  headline: string;
  subheadline?: string;
  ctaLabel: string;
  ctaHref?: string;
  image: string;
  variant?: 'imageRight' | 'imageLeft' | 'imageTop';
  trustSignal?: string;
  className?: string;
}

export default function HeroV1({
  headline,
  subheadline,
  ctaLabel,
  ctaHref = '#contact',
  image,
  variant = 'imageRight',
  trustSignal,
  className = '',
}: HeroV1Props) {
  const isImageTop = variant === 'imageTop';
  const isImageLeft = variant === 'imageLeft';

  return (
    <section className={cn('w-full px-4 py-16 md:py-24 bg-white', className)}>
      <div className="max-w-7xl mx-auto">
        <div
          className={cn(
            'grid gap-8 md:gap-12 items-center',
            isImageTop ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
          )}
        >
          {isImageLeft && (
            <div className="order-1">
              <img
                src={image}
                alt={headline}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className={cn('space-y-6', isImageLeft ? 'order-2' : '')}>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {headline}
              </h1>
              {subheadline && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {subheadline}
                </p>
              )}
            </div>

            {trustSignal && (
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span className="text-lg">✓</span>
                {trustSignal}
              </p>
            )}

            <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              <a href={ctaHref}>{ctaLabel}</a>
            </button>
          </div>

          {!isImageLeft && !isImageTop && (
            <div>
              <img
                src={image}
                alt={headline}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        {isImageTop && (
          <div className="mt-12">
            <img
              src={image}
              alt={headline}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
