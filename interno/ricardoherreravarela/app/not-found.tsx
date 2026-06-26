import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f8fafc]">
      <div className="max-w-lg text-center">
        <p className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs mb-4">
          Error 404
        </p>
        <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-6 tracking-tight">
          404
        </h1>
        <p className="text-xl text-slate-500 mb-10 leading-relaxed">
          Esta página no existe. Puede que haya sido movida o eliminada.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl shadow-blue-200 hover:scale-105 transition-transform"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
