import { Play, User } from "lucide-react";
import { cn } from "@/lib/utils";

const carouselDots = [0, 1, 2, 3];

export function LatestCard() {
  return (
    <div className="rounded-xl border border-cyan-100 bg-cyan-50/70 p-5">
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm font-semibold text-indigo-600">Latest from Bitscale</span>
        <div className="flex items-center gap-1.5">
          {carouselDots.map((dot, idx) => (
            <span
              key={dot}
              className={cn(
                "h-1.5 rounded-full transition-colors",
                idx === 0 ? "w-6 bg-indigo-500" : "w-1.5 bg-zinc-300"
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative shrink-0 w-44 h-28 rounded-lg overflow-hidden bg-gradient-to-br from-amber-100 to-orange-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
              <Play className="size-4 text-white fill-white ml-0.5" />
            </div>
          </div>
          <div className="absolute bottom-1.5 right-1.5 h-7 w-7 rounded-full bg-zinc-700 border-2 border-white flex items-center justify-center">
            <User className="size-3 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-zinc-900 mb-1">
            How to Integrate 2 Way HubSpot
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">
            Prerequisites for this Integration is that you should have a HubSpot account and Copy the API key. We simple aad our API key through the integrations pa...
          </p>
          <p className="text-xs text-zinc-400 mt-2">Posted today</p>
        </div>
      </div>
    </div>
  );
}
