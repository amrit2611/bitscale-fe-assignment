import { Coins } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-end gap-3 px-8 py-4 border-b border-zinc-200 bg-white">
      <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 border border-emerald-100">
        <Coins className="size-4 text-emerald-600" />
        <span className="text-sm font-medium text-zinc-900">450000/5500000</span>
      </div>

      <span className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white">
        Booster Plan
      </span>

      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-200 via-orange-300 to-rose-300" />
    </header>
  );
}
