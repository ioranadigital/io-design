'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>Error</h1>
      <p style={{ fontSize: '20px', marginBottom: '32px' }}>
        Algo salió mal: {error.message}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4D32A5',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
