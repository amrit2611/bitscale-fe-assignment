"use client";

import { Search, ChevronDown, Save, Eye, SearchX, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { findPeopleFields } from "@/data/findPeopleFields";

type FindPeopleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const resultColumns = ["NAME", "TITLE", "HEADLINE", "LINKEDIN URL", "COMPANY", "COMPANY URL", "COMPANY"];

export function FindPeopleModal({ open, onOpenChange }: FindPeopleModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1080px] p-0 overflow-hidden gap-0">
        <DialogTitle className="sr-only">Find People</DialogTitle>
        <div className="flex h-[600px]">
          <div className="w-80 border-r border-zinc-200 bg-white flex flex-col">
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-zinc-900">Find People</h2>
              <button
                type="button"
                className="text-xs text-zinc-500 hover:text-zinc-700 inline-flex items-center gap-1"
              >
                <ChevronDown className="size-3" />
                Saved Search
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {findPeopleFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.id}>
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 mb-1.5">
                      <Icon className="size-4 text-zinc-500" />
                      {field.label}
                    </label>
                    {field.type === "input" ? (
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        className="w-full h-9 px-3 rounded-lg bg-zinc-50 border border-zinc-200 text-sm placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      />
                    ) : (
                      <button
                        type="button"
                        className="w-full h-9 px-3 rounded-lg bg-zinc-50 border border-zinc-200 text-sm text-zinc-400 flex items-center justify-between hover:border-zinc-300"
                      >
                        <span>{field.placeholder}</span>
                        <ChevronDown className="size-4 text-zinc-400" />
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
              >
                <Save className="size-4" />
                Save Search
              </button>
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-lg bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800"
              >
                <Eye className="size-4" />
                Preview Result
              </button>
            </div>
          </div>

          <div className="flex-1 bg-white flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-100">
              <p className="text-xs text-zinc-500">
                Found 0 companies. Click preview to view results
              </p>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600">
                  <Search className="size-3" />
                  8000/50000
                </span>
                <button type="button" className="text-xs font-medium text-orange-600 hover:underline inline-flex items-center gap-1">
                  <Lock className="size-3" />
                  Unlock <span className="font-bold">100,000</span> leads with Enterprise Plan*
                </button>
              </div>
            </div>

            <div className="border-b border-zinc-100 overflow-x-auto">
              <div className="flex items-center gap-0 px-5 py-2 text-[10px] font-medium text-zinc-400 tracking-wider min-w-max">
                {resultColumns.map((col, idx) => (
                  <span key={idx} className="px-3 whitespace-nowrap">{col}</span>
                ))}
              </div>
            </div>

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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
