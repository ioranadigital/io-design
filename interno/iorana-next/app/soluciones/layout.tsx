import Breadcrumbs from "@/components/Breadcrumbs";

export default function SolucionesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-22 pb-4">
        <Breadcrumbs />
      </div>
      {children}
    </>
  );
}
