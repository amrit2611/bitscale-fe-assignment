"use client";

import { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { gridRows } from "@/data/grids";

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
  const [starred, setStarred] = useState<Record<string, boolean>>({
    "4": true,
    "5": true,
    "6": true,
    "10": true,
  });

  const visibleRows = tab === "starred" ? gridRows.filter((r) => starred[r.id]) : gridRows;

  const toggleStar = (id: string) =>
    setStarred((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 border-b border-zinc-200 -mb-px">
          <button
            type="button"
            onClick={() => setTab("my-grids")}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors",
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
              "pb-3 text-sm font-medium border-b-2 transition-colors",
              tab === "starred"
                ? "border-indigo-600 text-indigo-700"
                : "border-transparent text-zinc-500 hover:text-zinc-900"
            )}
          >
            Starred
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="size-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search grids and workbooks..."
              className="h-9 w-80 rounded-lg bg-zinc-100 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <button
            type="button"
            className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            aria-label="Toggle view"
          >
            <LayoutList className="size-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wide border-b border-zinc-200">
              <th className="py-2.5 pl-3 pr-2 w-10"></th>
              <th className="py-2.5 px-2 w-10"></th>
              <th className="py-2.5 px-2">
                <span className="inline-flex items-center gap-1 text-zinc-700 normal-case font-medium">
                  Name <ArrowUp className="size-3" />
                </span>
              </th>
              <th className="py-2.5 px-2 normal-case font-medium text-zinc-700">Edited by</th>
              <th className="py-2.5 px-2 normal-case font-medium text-zinc-700">Last edited</th>
              <th className="py-2.5 px-2 normal-case font-medium text-zinc-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const Icon = row.icon;
              const isStarred = !!starred[row.id];
              return (
                <tr
                  key={row.id}
                  className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
                >
                  <td className="py-3 pl-3 pr-2">
                    {row.isWorkbook && (
                      <ChevronDown className="size-4 text-zinc-400" />
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
                      <span className="text-sm text-zinc-700">{row.editedBy.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-sm text-zinc-600">{row.lastEdited}</td>
                  <td className="py-3 px-2">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center h-7 w-7 rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                      aria-label="Row actions"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
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
