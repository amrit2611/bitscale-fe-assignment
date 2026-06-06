import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { WelcomeBar } from "@/components/WelcomeBar";
import { LatestCard } from "@/components/LatestCard";
import { DemoCard } from "@/components/DemoCard";
import { GridsTable } from "@/components/GridsTable";

export default function Home() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-zinc-50">
          <WelcomeBar />
          <div className="px-4 sm:px-8 pb-10 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <LatestCard />
              <DemoCard />
            </div>
            <GridsTable />
          </div>
        </main>
      </div>
    </div>
  );
}
