"use client";

import { useMemo, useState } from "react";
import {
  Star,
  Search,
  ArrowUp,
  MoreHorizontal,
  ChevronDown,
  Users as UsersIcon,
  Link2,
  Building2 as BuildingIcon,
  LayoutList,
  Eye,
  Pencil,
  Copy,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { gridRows } from "@/data/grids";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Tab = "my-grids" | "starred";

const avatarPalette = [
  "from-amber-200 to-orange-300",
  "from-pink-200 to-rose-300",
  "from-violet-200 to-purple-300",
  "from-sky-200 to-blue-300",
  "from-emerald-200 to-teal-300",
  "from-yellow-200 to-amber-300",
];

function avatarGradient(name: string) {
  const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return avatarPalette[hash % avatarPalette.length];
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function GridsTable() {
  const [tab, setTab] = useState<Tab>("my-grids");
  const [query, setQuery] = useState("");
  const [workbookOpen, setWorkbookOpen] = useState(true);
  const [starred, setStarred] = useState<Record<string, boolean>>({
    "4": true,
    "5": true,
    "6": true,
    "10": true,
  });

  const visibleRows = useMemo(() => {
    const base = tab === "starred" ? gridRows.filter((r) => starred[r.id]) : gridRows;
    if (!query.trim()) return base;
    const q = query.trim().toLowerCase();
    return base.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.editedBy.name.toLowerCase().includes(q)
    );
  }, [tab, query, starred]);

  const toggleStar = (id: string) =>
    setStarred((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-6 border-b border-zinc-200 -mb-px overflow-x-auto">
          <button
            type="button"
            onClick={() => setTab("my-grids")}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
              tab === "my-grids"
                ? "border-indigo-600 text-indigo-700"
                : "border-transparent text-zinc-500 hover:text-zinc-900"
            )}
          >
            My Grids
          </button>
          <button
            type="button"
            onClick={() => setTab("starred")}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
              tab === "starred"
                ? "border-indigo-600 text-indigo-700"
                : "border-transparent text-zinc-500 hover:text-zinc-900"
            )}
          >
            Starred
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="size-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search grids and workbooks..."
              className="h-9 w-full sm:w-80 rounded-lg bg-zinc-100 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <button
            type="button"
            className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 hover:bg-zinc-200 shrink-0"
            aria-label="Toggle view"
            onClick={() => console.info("[bitscale-demo] view toggle — coming soon")}
          >
            <LayoutList className="size-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="text-left text-xs border-b border-zinc-200">
              <th className="py-2.5 pl-3 pr-2 w-10"></th>
              <th className="py-2.5 px-2 w-10"></th>
              <th className="py-2.5 px-2">
                <span className="inline-flex items-center gap-1 text-zinc-700 font-medium">
                  Name <ArrowUp className="size-3" />
                </span>
              </th>
              <th className="py-2.5 px-2 font-medium text-zinc-700">Edited by</th>
              <th className="py-2.5 px-2 font-medium text-zinc-700">Last edited</th>
              <th className="py-2.5 px-2 font-medium text-zinc-700 w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-sm text-zinc-400">
                  No grids match &ldquo;{query}&rdquo;.
                </td>
              </tr>
            )}
            {visibleRows.map((row) => {
              const Icon = row.icon;
              const isStarred = !!starred[row.id];
              const isExpandable = row.isWorkbook;
              return (
                <tr
                  key={row.id}
                  className="border-b border-zinc-100 last:border-b-0 hover:bg-zinc-50 transition-colors"
                >
                  <td className="py-3 pl-3 pr-2">
                    {isExpandable && (
                      <button
                        type="button"
                        onClick={() => setWorkbookOpen((v) => !v)}
                        aria-label={workbookOpen ? "Collapse" : "Expand"}
                      >
                        <ChevronDown
                          className={cn(
                            "size-4 text-zinc-400 transition-transform",
                            !workbookOpen && "-rotate-90"
                          )}
                        />
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    <button
                      type="button"
                      onClick={() => toggleStar(row.id)}
                      aria-label={isStarred ? "Unstar" : "Star"}
                    >
                      <Star
                        className={cn(
                          "size-4 transition-colors",
                          isStarred
                            ? "text-amber-400 fill-amber-400"
                            : "text-zinc-300 hover:text-zinc-400"
                        )}
                      />
                    </button>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2.5">
                      {row.isWorkbook ? (
                        <span className="flex items-center gap-1">
                          <span className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center">
                            <UsersIcon className="size-3 text-amber-700" />
                          </span>
                          <span className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center">
                            <Link2 className="size-3 text-violet-700" />
                          </span>
                          <span className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                            <BuildingIcon className="size-3 text-emerald-700" />
                          </span>
                        </span>
                      ) : (
                        <span className="h-7 w-7 rounded-md bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                          <Icon className={cn("size-4", row.iconColor)} />
                        </span>
                      )}
                      <span className="text-sm text-zinc-900">{row.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-6 w-6 rounded-full bg-gradient-to-br shrink-0 flex items-center justify-center text-[10px] font-semibold text-white",
                          avatarGradient(row.editedBy.name)
                        )}
                      >
                        {initials(row.editedBy.name)}
                      </span>
                      <span className="text-sm text-zinc-700 whitespace-nowrap">{row.editedBy.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-sm text-zinc-600 whitespace-nowrap">{row.lastEdited}</td>
                  <td className="py-3 px-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center h-7 w-7 rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                          aria-label="Row actions"
                        >
                          <MoreHorizontal className="size-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => console.info(`[bitscale-demo] view ${row.name}`)}>
                          <Eye className="size-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.info(`[bitscale-demo] rename ${row.name}`)}>
                          <Pencil className="size-4" /> Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.info(`[bitscale-demo] duplicate ${row.name}`)}>
                          <Copy className="size-4" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-rose-600"
                          onClick={() => console.info(`[bitscale-demo] delete ${row.name}`)}
                        >
                          <Trash2 className="size-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
