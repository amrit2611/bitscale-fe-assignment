import {
  LayoutDashboard,
  BookOpen,
  Cable,
  FileText,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  disabled?: boolean;
  badge?: "rocket";
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Home",
    items: [
      { label: "My Dashboard", icon: LayoutDashboard, href: "#dashboard" },
      { label: "Playbooks", icon: BookOpen, href: "#playbooks", disabled: true, badge: "rocket" },
      { label: "Integrations", icon: Cable, href: "#integrations" },
    ],
  },
  {
    label: "Other",
    items: [
      { label: "Documentation", icon: FileText, href: "#docs" },
      { label: "Settings", icon: Settings, href: "#settings" },
    ],
  },
];
