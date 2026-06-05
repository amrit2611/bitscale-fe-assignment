"use client";

import { useState } from "react";
import { Building2, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FindPeopleModal } from "@/components/FindPeopleModal";

export function WelcomeBar() {
  const [findPeopleOpen, setFindPeopleOpen] = useState(false);

  return (
    <>
      <div className="flex items-end justify-between gap-4 px-8 pt-8 pb-6">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Welcome back, Tim!</h1>
          <p className="text-sm text-zinc-500 mt-1">Here&apos;s your daily scoop on Bitscale!</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 rounded-lg">
            <Building2 className="size-4 text-emerald-600" />
            Find Companies
          </Button>
          <Button
            variant="outline"
            className="gap-2 rounded-lg"
            onClick={() => setFindPeopleOpen(true)}
          >
            <Users className="size-4 text-violet-600" />
            Find People
          </Button>
          <Button className="gap-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800">
            <Plus className="size-4" />
            New Grid
          </Button>
        </div>
      </div>

      <FindPeopleModal open={findPeopleOpen} onOpenChange={setFindPeopleOpen} />
    </>
  );
}
