import AdminHeader from "@/components/layouts/super-admin-header";
import SuperAdminSidebar from "@/components/sidebar/super-admin-sidebar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <AdminHeader />
      <div className="flex flex-row w-full">
        <SuperAdminSidebar />
        <div className="flex w-full bg-black/5">{children}</div>
      </div>
    </div>
  );
}
