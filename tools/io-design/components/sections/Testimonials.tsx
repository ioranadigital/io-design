'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Testimonial {
  name: string;
  role?: string;
  text: string;
  image?: string;
  stars?: 1 | 2 | 3 | 4 | 5;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

export default function Testimonials({
  testimonials,
  autoplay = true,
  autoplayInterval = 5000,
  className = '',
}: TestimonialsProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, testimonials.length]);

  return (
    <section className={cn('w-full px-4 py-16 md:py-24 bg-gray-50', className)}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-lg">
          {testimonials.length > 0 && (
            <>
              <div className="mb-6">
                {testimonials[current].stars && (
                  <p className="text-yellow-500 text-2xl">
                    {'★'.repeat(testimonials[current].stars)}
                    {'☆'.repeat(5 - testimonials[current].stars)}
                  </p>
                )}
              </div>

              <p className="text-xl md:text-2xl font-medium mb-6 italic">
                "{testimonials[current].text}"
              </p>

              <div className="flex items-center gap-4 mb-8">
                {testimonials[current].image && (
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold">{testimonials[current].name}</p>
                  {testimonials[current].role && (
                    <p className="text-gray-600 text-sm">
                      {testimonials[current].role}
                    </p>
                  )}
                </div>
              </div>

              {testimonials.length > 1 && (
                <div className="flex justify-center gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={cn(
                        'w-2 h-2 rounded-full transition-colors',
                        current === idx ? 'bg-blue-600' : 'bg-gray-300'
                      )}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
