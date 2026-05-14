'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface LeadGenProps {
  headline?: string;
  fields: ('email' | 'phone' | 'name' | 'service' | 'message')[];
  ctaLabel: string;
  onSubmit: (data: any) => Promise<void>;
  honeypot?: boolean;
  className?: string;
}

export default function LeadGen({
  headline,
  fields,
  ctaLabel,
  onSubmit,
  honeypot = true,
  className = '',
}: LeadGenProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await onSubmit(data);
      setSubmitted(true);
      e.currentTarget.reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={cn('w-full px-4 py-16 md:py-24 bg-white', className)}>
      <div className="max-w-md mx-auto">
        {headline && <h2 className="text-2xl font-bold mb-6 text-center">{headline}</h2>}

        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            ✓ Gracias por tu interés. Te contactaremos pronto.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {honeypot && (
            <input type="hidden" name="website" style={{ display: 'none' }} />
          )}

          {fields.includes('name') && (
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {fields.includes('email') && (
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {fields.includes('phone') && (
            <input
              type="tel"
              name="phone"
              placeholder="+34 XXX XX XX XX"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {fields.includes('service') && (
            <select
              name="service"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona un servicio</option>
              <option value="service1">Servicio 1</option>
              <option value="service2">Servicio 2</option>
              <option value="service3">Servicio 3</option>
            </select>
          )}

          {fields.includes('message') && (
            <textarea
              name="message"
              placeholder="Cuéntanos más..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Enviando...' : ctaLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
