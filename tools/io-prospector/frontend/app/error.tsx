'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#09090b',
        color: '#fafafa',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '2rem',
      }}
    >
      <div style={{ maxWidth: '500px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.875rem', marginBottom: '1rem' }}>Error</h2>
        <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
          {error?.message || 'Algo salió mal'}
        </p>
        <button
          onClick={() => reset()}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
          }}
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
