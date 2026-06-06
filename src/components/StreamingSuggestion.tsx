"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useStreamingText } from "@/hooks/useStreamingText";

type StreamingSuggestionProps = {
  keyword: string;
};

const suggestionPool = [
  { label: "Company Headcount: 100-500", reason: "narrows results to mid-market" },
  { label: "Person Location: United States", reason: "highest match density" },
  { label: "Management Level: Director+", reason: "matches the seniority signal" },
  { label: "Company Headcount: 50-200", reason: "best fit for early-stage GTM" },
  { label: "Person Location: India, UK, USA", reason: "broaden the geo window" },
  { label: "Management Level: Owner, Founder", reason: "decision-maker bias" },
];

function hashString(s: string): number {
  return s.split("").reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0, 7);
}

function deterministicSuggestions(keyword: string) {
  const h = hashString(keyword.toLowerCase());
  const resultCount = 3 + (h % 18);
  const seen = new Set<number>();
  const picks: typeof suggestionPool = [];
  let i = 0;
  while (picks.length < 3 && i < 12) {
    const idx = (h + i * 7) % suggestionPool.length;
    if (!seen.has(idx)) {
      seen.add(idx);
      picks.push(suggestionPool[idx]);
    }
    i += 1;
  }
  return { resultCount, picks };
}

function buildAnalysis(keyword: string) {
  const { resultCount, picks } = deterministicSuggestions(keyword);
  const text = [
    `Searching for "${keyword}"...`,
    "",
    `Looks like ~${resultCount}k profiles match this keyword in our verified data set.`,
    "",
    "To tighten the result quality, try these filters:",
  ].join("\n");
  return { text, picks };
}

export function StreamingSuggestion({ keyword }: StreamingSuggestionProps) {
  const { text, picks } = buildAnalysis(keyword);
  const { displayed, isComplete } = useStreamingText(text, 14);

  return (
    <div className="flex-1 px-8 py-8 overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-sm">
          <Sparkles className="size-3.5 text-white" />
        </div>
        <span className="text-sm font-semibold text-zinc-900">AI Suggestions</span>
        <span className="text-xs text-zinc-400">
          {isComplete ? "ready" : "thinking..."}
        </span>
        {!isComplete && (
          <motion.span
            className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-indigo-500"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>

      <pre className="text-sm text-zinc-700 leading-relaxed font-sans whitespace-pre-wrap mb-6 min-h-32">
        {displayed}
        {!isComplete && (
          <motion.span
            className="inline-block w-1.5 h-4 bg-indigo-500 align-middle ml-0.5"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </pre>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
            className="space-y-2"
          >
            {picks.map((pick) => (
              <motion.button
                key={pick.label}
                type="button"
                onClick={() => console.info(`[bitscale-demo] apply suggestion: ${pick.label}`)}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg border border-indigo-100 bg-indigo-50/40 hover:bg-indigo-50 transition-colors group"
              >
                <Sparkles className="size-4 text-indigo-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate">{pick.label}</p>
                  <p className="text-xs text-zinc-500 truncate">{pick.reason}</p>
                </div>
                <ArrowRight className="size-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}

            <motion.p
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1 },
              }}
              className="text-xs text-zinc-400 pt-2"
            >
              Suggestions update as you refine the keyword. Apply any to add it as a filter on the left.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
