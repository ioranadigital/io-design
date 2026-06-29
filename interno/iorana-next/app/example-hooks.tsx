'use client';

import { useCalendlyLoader, useFormSubmit } from '@iorana/lib/hooks';
import { useState, FormEvent } from 'react';

// ============================================================================
// EJEMPLO 1: Usando useCalendlyLoader
// ============================================================================
export function CalendlySection() {
  const { containerRef, isLoading, isVisible, setIsVisible, scriptLoaded } =
    useCalendlyLoader({
      url: 'https://calendly.com/tu-usuario',
      provider: 'calendly',
      loadDelay: 200,
      onLoad: () => console.log('Calendly cargado'),
      onError: (error) => console.error('Error Calendly:', error),
    });

  return (
    <div ref={containerRef}>
      {!isVisible && (
        <button onClick={() => setIsVisible(true)}>
          Ver calendario
        </button>
      )}
      {isLoading && <p>Cargando...</p>}
      {isVisible && scriptLoaded && (
        <div className="calendly-inline-widget" data-url="https://calendly.com/tu-usuario" />
      )}
    </div>
  );
}

// ============================================================================
// EJEMPLO 2: Usando useFormSubmit con validación personalizada
// ============================================================================
interface ContactData {
  name: string;
  email: string;
  message: string;
}

export function ContactFormSection() {
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    message: '',
  });

  const { isSubmitting, submitStatus, submitMessage, handleSubmit } =
    useFormSubmit<ContactData>({
      webhookUrl: process.env.NEXT_PUBLIC_WEBHOOK_URL,
      successMessage: '✅ Mensaje enviado correctamente',
      errorMessage: '❌ Error al enviar el mensaje',
      onSubmitSuccess: (data) => {
        console.log('Formulario enviado:', data);
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      },
    });

  const handleFormChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación personalizada
    await handleSubmit(formData, (data) => {
      if (!data.name.trim()) return { valid: false, message: 'Nombre requerido' };
      if (!data.email.includes('@')) return { valid: false, message: 'Email inválido' };
      if (!data.message.trim()) return { valid: false, message: 'Mensaje requerido' };
      return { valid: true };
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleFormChange}
        placeholder="Tu nombre"
        disabled={isSubmitting}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleFormChange}
        placeholder="tu@email.com"
        disabled={isSubmitting}
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleFormChange}
        placeholder="Tu mensaje"
        disabled={isSubmitting}
      />

      {submitStatus !== 'idle' && (
        <div className={submitStatus === 'success' ? 'text-green-600' : 'text-red-600'}>
          {submitMessage}
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
