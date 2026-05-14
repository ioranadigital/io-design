'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NewsletterProps {
  placeholder?: string;
  ctaLabel?: string;
  onSubmit: (email: string) => Promise<void>;
  className?: string;
}

export default function Newsletter({
  placeholder = 'tu@email.com',
  ctaLabel = 'Suscribirse',
  onSubmit,
  className = '',
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await onSubmit(email);
      setEmail('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Newsletter signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={cn('w-full px-4 py-8 bg-gray-50', className)}>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading || submitted}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {submitted ? '✓' : ctaLabel}
          </button>
        </form>
        {submitted && (
          <p className="text-sm text-green-600 mt-2">Gracias por suscribirte</p>
        )}
      </div>
    </section>
  );
}
