'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Load Sidebar only on client, skip during SSR para evitar problemas con usePathname()
const Sidebar = dynamic(() => import('./Sidebar').then(mod => ({ default: mod.Sidebar })), {
  ssr: false,
  loading: () => <div className="fixed top-0 left-0 h-screen w-60 bg-zinc-900 border-r border-zinc-800" />,
});

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="fixed top-0 left-0 h-screen w-60 bg-zinc-900 border-r border-zinc-800" />}>
        <Sidebar />
      </Suspense>
      <main className="ml-60 flex-1 min-w-0 p-8 overflow-y-auto overflow-x-hidden min-h-screen">
        {children}
      </main>
    </>
  );
}
