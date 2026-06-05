import { ClipboardCheck, CheckCircle2, Circle } from "lucide-react";
import { demoChecklist, demoProgress } from "@/data/demoChecklist";

export function DemoCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="h-9 w-9 rounded-lg bg-zinc-900 flex items-center justify-center shrink-0">
          <ClipboardCheck className="size-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-zinc-900">Complete product demo</h3>
          <p className="text-xs text-zinc-500 mt-0.5">{demoProgress.caption}</p>
        </div>
      </div>

      <div className="relative mb-4">
        <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full"
            style={{ width: `${demoProgress.percent}%` }}
          />
        </div>
        <span className="absolute -top-5 right-0 text-xs font-medium text-emerald-600">
          {demoProgress.percent}%
        </span>
      </div>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        {demoChecklist.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            {item.done ? (
              <CheckCircle2 className="size-4 text-blue-600 fill-blue-100" />
            ) : (
              <Circle className="size-4 text-zinc-300" />
            )}
            <span className="text-sm text-zinc-700">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
