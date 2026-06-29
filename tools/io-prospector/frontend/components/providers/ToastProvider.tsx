'use client';

import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <div suppressHydrationWarning>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#18181b',
              color: '#f4f4f5',
              border: '1px solid #3f3f46',
            },
          }}
        />
      </div>
    </>
  );
}
