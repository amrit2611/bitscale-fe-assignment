import { SidebarContent } from "@/components/SidebarContent";

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 shrink-0 border-r border-zinc-200">
      <SidebarContent />
    </aside>
  );
}
