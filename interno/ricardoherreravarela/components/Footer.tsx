export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-16 text-center text-slate-400 text-[10px] uppercase tracking-[0.3em]">
      <p>
        &copy; {year} Ricardo Herrera Varela
      </p>
    </footer>
  );
}
