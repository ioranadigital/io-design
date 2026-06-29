import Breadcrumbs from "@/components/Breadcrumbs";

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-0">
        <Breadcrumbs />
      </div>
      {children}
    </>
  );
}
