'use client';

import { Suspense } from 'react';
import { RootLayoutClient } from '@/components/layout/RootLayoutClient';
import { ToastProvider } from '@/components/providers/ToastProvider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <Suspense fallback={<div className="ml-60 flex-1 min-w-0 p-8" />}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </Suspense>
    </ToastProvider>
  );
}
