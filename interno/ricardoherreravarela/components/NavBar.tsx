import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#portafolio", label: "Proyectos Destacados" },
  { href: "#contacto", label: "Contacto" },
];

export function NavBar() {
  return (
    <header>
      <nav
        aria-label="Navegación principal"
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 glass rounded-2xl px-6 py-4 flex justify-between items-center shadow-sm"
      >
        <Link href="/" aria-label="Inicio — Ricardo Herrera Varela">
          <Image
            src="/logoricardoherrera.png"
            alt="Ricardo Herrera Varela"
            width={160}
            height={40}
            className="h-8 md:h-10 w-auto object-contain transition-transform hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-slate-600 list-none">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="hover:text-blue-600 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile spacer — hamburger can be added later */}
        <div className="w-10 md:hidden" aria-hidden="true" />
      </nav>
    </header>
  );
}
