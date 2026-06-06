import { Coins } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-3 px-4 sm:px-8 py-3 sm:py-4 border-b border-zinc-200 bg-white shrink-0">
      <MobileNav />

      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 sm:px-3 py-1.5 border border-emerald-100">
          <Coins className="size-4 text-emerald-600 shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-zinc-900 whitespace-nowrap">450000/5500000</span>
        </div>

        <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white">
          Booster Plan
        </span>

        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-200 via-orange-300 to-rose-300 shrink-0" />
      </div>
    </header>
  );
}
