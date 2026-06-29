import React from "react";
import Link from "next/link";
import { LayoutDashboard, Users, BarChart3, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#05111d]">
      {/* Sidebar Fijo */}
      <aside className="w-64 border-r border-white/5 bg-[#08223a] p-6 flex flex-col sticky top-0 h-screen">
        <div className="mb-10 px-2">
          <span className="text-[#ff8c00] font-black text-2xl tracking-tighter">iORANA</span>
          <span className="text-white/40 text-[10px] block uppercase tracking-[0.2em] font-bold mt-1">
            CRM Console
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 bg-[#ff8c00]/10 text-[#ff8c00] rounded-xl font-bold transition-all border border-[#ff8c00]/20"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link 
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 text-[#7fa8c9] hover:bg-white/5 hover:text-white rounded-xl transition-all"
          >
            <Users size={18} /> Leads
          </Link>
          <Link 
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 text-[#7fa8c9] hover:bg-white/5 hover:text-white rounded-xl transition-all"
          >
            <BarChart3 size={18} /> Rendimiento
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/5">
          <button className="flex items-center gap-3 px-4 py-3 text-red-400/40 hover:text-red-400 w-full transition-all text-sm font-medium">
            <LogOut size={18} /> Finalizar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-white/5 bg-[#08223a]/30 backdrop-blur-md flex items-center justify-end px-8 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-white">Consultor SEO</p>
              <p className="text-[10px] text-[#7fa8c9]">iorana.digital</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ff8c00] to-[#ffa500] flex items-center justify-center text-[#08223a] font-black shadow-lg shadow-[#ff8c00]/10">
              A
            </div>
          </div>
        </header>
        
        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}