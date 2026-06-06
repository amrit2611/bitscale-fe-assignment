"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, ChevronDown, Save, Eye, SearchX, Lock, X as XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { findPeopleFields } from "@/data/findPeopleFields";
import { StreamingSuggestion, type Suggestion } from "@/components/StreamingSuggestion";
import { cn } from "@/lib/utils";

type FindPeopleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const resultColumns = ["NAME", "TITLE", "HEADLINE", "LINKEDIN URL", "COMPANY", "COMPANY URL", "COMPANY"];

export function FindPeopleModal({ open, onOpenChange }: FindPeopleModalProps) {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    const t = setTimeout(() => setDebouncedKeyword(keyword.trim()), 500);
    return () => clearTimeout(t);
  }, [keyword]);

  useEffect(() => {
    if (!open) {
      setKeyword("");
      setDebouncedKeyword("");
      setFilters({});
    }
  }, [open]);

  const appliedFieldIds = useMemo(() => new Set(Object.keys(filters)), [filters]);
  const appliedCount = appliedFieldIds.size;

  const handleApply = (suggestion: Suggestion) => {
    setFilters((prev) => ({ ...prev, [suggestion.fieldId]: suggestion.value }));
  };

  const handleClearFilter = (fieldId: string) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  };

  const showStreaming = debouncedKeyword.length >= 3;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1080px] p-0 overflow-hidden gap-0">
        <DialogTitle className="sr-only">Find People</DialogTitle>
        <div className="flex h-[600px]">
          <div className="w-80 border-r border-zinc-200 bg-white flex flex-col shrink-0">
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-zinc-900">Find People</h2>
                {appliedCount > 0 && (
                  <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-semibold">
                    {appliedCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                className="text-xs text-zinc-500 hover:text-zinc-700 inline-flex items-center gap-1"
                onClick={() => console.info("[bitscale-demo] saved search — coming soon")}
              >
                <ChevronDown className="size-3" />
                Saved Search
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {findPeopleFields.map((field) => {
                const Icon = field.icon;
                const isKeyword = field.id === "keyword";
                const filterValue = filters[field.id];
                const hasFilter = Boolean(filterValue);
                return (
                  <div key={field.id}>
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 mb-1.5">
                      <Icon className="size-4 text-zinc-500" />
                      {field.label}
                      {hasFilter && (
                        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-medium text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded-full">
                          AI
                        </span>
                      )}
                    </label>
                    {field.type === "input" ? (
                      <input
                        type="text"
                        value={isKeyword ? keyword : undefined}
                        onChange={isKeyword ? (e) => setKeyword(e.target.value) : undefined}
                        placeholder={field.placeholder}
                        className="w-full h-9 px-3 rounded-lg bg-zinc-50 border border-zinc-200 text-sm placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      />
                    ) : (
                      <button
                        type="button"
                        className={cn(
                          "w-full h-9 px-3 rounded-lg border text-sm flex items-center justify-between transition-colors",
                          hasFilter
                            ? "bg-indigo-50/60 border-indigo-200 text-indigo-900 hover:bg-indigo-50"
                            : "bg-zinc-50 border-zinc-200 text-zinc-400 hover:border-zinc-300"
                        )}
                        onClick={() => {
                          if (hasFilter) {
                            handleClearFilter(field.id);
                          } else {
                            console.info(`[bitscale-demo] ${field.label} dropdown — coming soon`);
                          }
                        }}
                      >
                        <span className="truncate">
                          {hasFilter ? filterValue : field.placeholder}
                        </span>
                        {hasFilter ? (
                          <XIcon className="size-4 text-indigo-400 shrink-0" />
                        ) : (
                          <ChevronDown className="size-4 text-zinc-400 shrink-0" />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="px-5 py-3 border-t border-zinc-100 flex items-center gap-2">
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-lg bg-zinc-100 text-sm font-medium text-zinc-700 hover:bg-zinc-200"
                onClick={() => console.info("[bitscale-demo] save search — coming soon")}
              >
                <Save className="size-4" />
                Save Search
              </button>
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-lg bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800"
                onClick={() => console.info("[bitscale-demo] preview result — coming soon")}
              >
                <Eye className="size-4" />
                Preview Result
              </button>
            </div>
          </div>

          <div className="flex-1 bg-white flex flex-col min-w-0">
            <div className="flex items-center justify-between px-5 py-3 pr-12 border-b border-zinc-100 gap-4">
              <p className="text-xs text-zinc-500 shrink-0">
                Found 0 companies. Click preview to view results
              </p>
              <div className="flex items-center gap-4 shrink-0">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-orange-600">
                  <Search className="size-3" />
                  8000/50000
                </span>
                <button type="button" className="text-xs font-medium text-orange-600 hover:underline inline-flex items-center gap-1.5">
                  <Lock className="size-3" />
                  Unlock <span className="font-bold">100,000</span> leads with Enterprise Plan*
                </button>
              </div>
            </div>

            <div className="border-b border-zinc-100 overflow-x-auto">
              <div className="flex items-center gap-0 px-5 py-2 text-[10px] font-medium text-zinc-400 tracking-wider min-w-max">
                {resultColumns.map((col, idx) => (
                  <span key={`${col}-${idx}`} className="px-3 whitespace-nowrap">{col}</span>
                ))}
              </div>
            </div>

            {showStreaming ? (
              <StreamingSuggestion
                key={debouncedKeyword}
                keyword={debouncedKeyword}
                appliedFieldIds={appliedFieldIds}
                onApply={handleApply}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <div className="mb-5">
                  <div className="h-32 w-32 rounded-full bg-zinc-50 flex items-center justify-center">
                    <SearchX className="size-12 text-zinc-300" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-sm text-zinc-600 max-w-sm">
                  Start your Company search, preview, and import companies for enrichment by applying any filter in the left panel.
                </p>
                <p className="text-sm text-zinc-400 my-3">OR</p>
                <p className="text-sm text-zinc-600">Import companies from saved Search.</p>
                <p className="text-xs text-indigo-500 mt-4 italic">
                  Tip: type a keyword above to see AI suggestions.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
