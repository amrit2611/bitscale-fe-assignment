import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { WelcomeBar } from "@/components/WelcomeBar";
import { LatestCard } from "@/components/LatestCard";
import { DemoCard } from "@/components/DemoCard";
import { GridsTable } from "@/components/GridsTable";

export default function Home() {
  return (
    <div className="flex flex-1 min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-zinc-50">
        <Header />
        <WelcomeBar />
        <div className="px-8 pb-10 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <LatestCard />
            <DemoCard />
          </div>
          <GridsTable />
        </div>
      </main>
    </div>
  );
}
