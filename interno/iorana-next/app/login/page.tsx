"use client";

import { useState } from "react";
import { createClient } from '@/lib/supabase/supabaseClient';
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Credenciales inválidas. Revisa tu email y contraseña.");
      setLoading(false);
      return;
    }

    // Redirigir al dashboard tras éxito
    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#05111d] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <span className="text-[#ff8c00] font-black text-4xl tracking-tighter">iORANA</span>
          <p className="text-[#7fa8c9] text-sm mt-2 font-medium">Panel de Control Privado</p>
        </div>

        <div className="bg-[#08223a] border border-white/5 p-8 rounded-[2rem] shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-[#ff8c00] uppercase tracking-widest mb-2 ml-1">
                Email de Consultor
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@iorana.digital"
                  className="w-full bg-[#0a2b49] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-[#ff8c00] transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#ff8c00] uppercase tracking-widest mb-2 ml-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0a2b49] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-[#ff8c00] transition-all text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff8c00] hover:bg-white text-[#08223a] font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#ff8c00]/10"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "ACCEDER AL PANEL"
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-[10px] text-white/20 uppercase tracking-[0.2em]">
          Acceso restringido a personal autorizado
        </p>
      </div>
    </main>
  );
}