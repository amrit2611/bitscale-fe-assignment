"use client";

import { useState } from "react";
import { Play, User } from "lucide-react";
import { cn } from "@/lib/utils";

const carouselItems = [
  {
    title: "How to Integrate 2 Way HubSpot",
    body: "Prerequisites for this Integration is that you should have a HubSpot account and Copy the API key. We simple aad our API key through the integrations pa...",
    posted: "Posted today",
  },
  {
    title: "Building your first Workbook",
    body: "Workbooks let you stack Grids into a workflow. Start with a Find People grid, layer enrichment on top, then export to your CRM in a single click.",
    posted: "Posted 2 days ago",
  },
  {
    title: "Customising the waterfall providers",
    body: "Configure the order in which BitScale tries Apollo, Hunter, and Snov, plus per-domain fallbacks for higher hit rates and lower credit burn.",
    posted: "Posted 5 days ago",
  },
  {
    title: "BitAgent: AI lead qualification",
    body: "BitAgent reads each lead's company, role, and signals to score qualification automatically, so your SDR queue is sorted by intent, not arrival time.",
    posted: "Posted last week",
  },
];

export function LatestCard() {
  const [index, setIndex] = useState(0);
  const item = carouselItems[index];

  return (
    <div className="rounded-xl border border-cyan-100 bg-cyan-50/70 p-5">
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm font-semibold text-indigo-600">Latest from Bitscale</span>
        <div className="flex items-center gap-1.5">
          {carouselItems.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setIndex(idx)}
              aria-label={`Show update ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === index
                  ? "w-6 bg-indigo-500"
                  : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative shrink-0 w-32 sm:w-44 h-24 sm:h-28 rounded-lg overflow-hidden bg-gradient-to-br from-amber-100 to-orange-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => console.info("[bitscale-demo] play video — coming soon")}
              className="h-10 w-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/50 transition-colors"
              aria-label="Play video"
            >
              <Play className="size-4 text-white fill-white ml-0.5" />
            </button>
          </div>
          <div className="absolute bottom-1.5 right-1.5 h-7 w-7 rounded-full bg-zinc-700 border-2 border-white flex items-center justify-center">
            <User className="size-3 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-zinc-900 mb-1">{item.title}</h3>
          <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">{item.body}</p>
          <p className="text-xs text-zinc-400 mt-2">{item.posted}</p>
        </div>
      </div>
    </div>
  );
}
