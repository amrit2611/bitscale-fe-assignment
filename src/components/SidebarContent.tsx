"use client";

import Image from "next/image";
import { ChevronRight, ChevronUp, ChevronsUpDown, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { navGroups } from "@/data/nav";

export function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="px-4 py-4 border-b border-zinc-100 flex items-center gap-1 shrink-0">
        <Image src="/bitscale-logo.png" alt="Bitscale" width={22} height={22} priority />
        <span className="text-xl font-bold italic tracking-tight text-zinc-900">
          itscale
        </span>
      </div>

      <button
        type="button"
        className="flex items-center gap-3 px-4 py-3 border-b border-zinc-100 hover:bg-zinc-50 transition-colors text-left shrink-0"
        onClick={onItemClick}
      >
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-amber-200 via-orange-300 to-rose-300 shrink-0" />
        <span className="flex-1 text-sm font-medium text-zinc-900">GTM Spaces</span>
        <ChevronsUpDown className="size-4 text-zinc-400" />
      </button>

      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="px-3 mb-2">
              <span className="text-xs font-medium text-zinc-400">
                {group.label}
              </span>
            </div>
            <ul className="space-y-0.5">
              {group.items.map((item, idx) => {
                const isActive = group.label === "Home" && idx === 0;
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-disabled={item.disabled}
                      onClick={(e) => {
                        if (item.disabled) {
                          e.preventDefault();
                          return;
                        }
                        onItemClick?.();
                      }}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : "text-zinc-700 hover:bg-zinc-50",
                        item.disabled && "text-zinc-400 cursor-not-allowed"
                      )}
                    >
                      <Icon className={cn("size-4 shrink-0", isActive && "text-indigo-700")} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge === "rocket" && (
                        <span className="inline-flex items-center justify-center h-5 w-7 rounded-full bg-amber-50">
                          <Rocket className="size-3 text-amber-600 -rotate-45" />
                        </span>
                      )}
                      {isActive && (
                        <ChevronRight className="size-4 text-indigo-400" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <button
        type="button"
        className="border-t border-zinc-100 px-4 py-3 flex items-center gap-1 bg-zinc-50 hover:bg-zinc-100 transition-colors shrink-0"
        onClick={onItemClick}
      >
        <Image src="/bitscale-logo.png" alt="" width={16} height={16} />
        <span className="text-sm font-bold italic tracking-tight text-zinc-900 mr-2">
          itscale
        </span>
        <span className="flex-1 text-xs text-zinc-500 leading-tight text-left">Get Support at Bitscale</span>
        <ChevronUp className="size-4 text-zinc-400" />
      </button>
    </div>
  );
}
