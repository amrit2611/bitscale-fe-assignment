import {
  FileSpreadsheet,
  Briefcase,
  Building2,
  Upload,
  Users,
  Map,
  Search,
  Box,
  ListChecks,
  type LucideIcon,
} from "lucide-react";

export type GridRow = {
  id: string;
  name: string;
  type: "workbook" | "linkedin" | "salesnav" | "company" | "csv" | "people" | "maps" | "search" | "factors" | "list";
  icon: LucideIcon;
  iconColor: string;
  editedBy: { name: string; avatarUrl?: string };
  lastEdited: string;
  isWorkbook?: boolean;
  starred?: boolean;
};

export const gridRows: GridRow[] = [
  {
    id: "1",
    name: "Workbook - Testing design Ideas for grid and workbook",
    type: "workbook",
    icon: FileSpreadsheet,
    iconColor: "text-amber-600",
    editedBy: { name: "Sam Taylor" },
    lastEdited: "06 Aug, 2025",
    isWorkbook: true,
  },
  {
    id: "2",
    name: "LinkedIn",
    type: "linkedin",
    icon: Briefcase,
    iconColor: "text-blue-600",
    editedBy: { name: "Chris Parker" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: "3",
    name: "Sales nav",
    type: "salesnav",
    icon: Briefcase,
    iconColor: "text-sky-600",
    editedBy: { name: "Jone Doe" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: "4",
    name: "find company",
    type: "company",
    icon: Building2,
    iconColor: "text-emerald-600",
    editedBy: { name: "Alex Morgan" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: "5",
    name: "import csv",
    type: "csv",
    icon: Upload,
    iconColor: "text-violet-600",
    editedBy: { name: "Drew Wilson" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: "6",
    name: "Find people",
    type: "people",
    icon: Users,
    iconColor: "text-rose-600",
    editedBy: { name: "Jone Doe" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: "7",
    name: "Google maps",
    type: "maps",
    icon: Map,
    iconColor: "text-purple-600",
    editedBy: { name: "Jone Doe" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: "8",
    name: "google search results",
    type: "search",
    icon: Search,
    iconColor: "text-orange-600",
    editedBy: { name: "Jone Doe" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: "9",
    name: "factors",
    type: "factors",
    icon: Box,
    iconColor: "text-pink-600",
    editedBy: { name: "Jone Doe" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: "10",
    name: "Hubspot List - 10 (05 Aug 25)",
    type: "list",
    icon: ListChecks,
    iconColor: "text-orange-500",
    editedBy: { name: "Jone Doe" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: "11",
    name: "Hubspot List - 11 (05 Aug 25)",
    type: "list",
    icon: ListChecks,
    iconColor: "text-orange-500",
    editedBy: { name: "Jone Doe" },
    lastEdited: "06 Aug, 2025",
  },
];
