'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title?: string;
  items: FAQItem[];
  variant?: 'default' | 'cards';
  generateSchema?: boolean;
  className?: string;
}

export default function FAQAccordion({
  title,
  items,
  variant = 'default',
  generateSchema = true,
  className = '',
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = generateSchema ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  return (
    <section className={cn('w-full px-4 py-16 md:py-24 bg-white', className)}>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-3xl mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {title}
          </h2>
        )}

        {variant === 'default' && (
          <div className="space-y-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left font-semibold flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  {item.question}
                  <span
                    className={cn(
                      'text-2xl transition-transform',
                      openIndex === idx && 'rotate-45'
                    )}
                  >
                    +
                  </span>
                </button>

                {openIndex === idx && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-gray-700">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {variant === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200"
              >
                <h3 className="font-semibold mb-3 text-lg">{item.question}</h3>
                <p className="text-gray-700 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
