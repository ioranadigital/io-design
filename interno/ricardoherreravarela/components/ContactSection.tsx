"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgprwgg";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className="py-24 px-6"
    >
      <div className="max-w-5xl mx-auto glass rounded-[4rem] p-8 md:p-16 relative overflow-hidden shadow-2xl border border-white/50">
        <div className="grid md:grid-cols-2 gap-16 relative z-10">
          {/* Left — contact info */}
          <div className="text-left flex flex-col justify-center">
            <h2
              id="contacto-heading"
              className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight"
            >
              Contactar
            </h2>

            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              Estoy disponible si necesitas consultorías estratégicas y/o
              proyectos de infraestructura digital.
            </p>

            <div className="space-y-6">
              <Link
                href="https://linkedin.com/in/ricardoherreravarela"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-slate-700 hover:text-blue-600 transition-all group"
                aria-label="Conectar en LinkedIn con Ricardo Herrera Varela"
              >
                <span className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </span>
                <span className="font-bold tracking-tight">
                  Conecta en LinkedIn
                </span>
              </Link>
            </div>
          </div>

          {/* Right — contact form */}
          <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-inner">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="font-bold text-xl text-slate-900">
                  ¡Mensaje enviado!
                </p>
                <p className="text-slate-500 text-sm">
                  Gracias por ponerte en contacto. Te responderé lo antes posible.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
                aria-label="Formulario de contacto"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-2"
                  >
                    Tu Nombre
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Escribe tu nombre..."
                    className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-2"
                  >
                    Email de contacto
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="nombre@empresa.com"
                    className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="¿En qué puedo ayudarte?"
                    className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-300 resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm text-center" role="alert">
                    Algo fue mal. Por favor, inténtalo de nuevo.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-blue-600 hover:scale-[1.02] transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 w-80 h-80 bg-blue-100 rounded-full blur-[100px] opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-200 rounded-full blur-[100px] opacity-40"
        />
      </div>
    </section>
  );
}
