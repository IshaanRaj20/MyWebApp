const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Loader2 } from "lucide-react";
import HeroSection from "../components/portfolio/HeroSection";
import StatsBar from "../components/portfolio/StatsBar";
import AchievementGrid from "../components/portfolio/AchievementGrid";
import AddAchievementDialog from "../components/portfolio/AddAchievementDialog";

export default function Home() {
  const queryClient = useQueryClient();

  const { data: achievements, isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: () => db.entities.Achievement.list("-created_date"),
    initialData: []
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["achievements"] });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <div className="max-w-5xl mx-auto px-4 -mt-6 relative z-10">
        <StatsBar achievements={achievements} />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
            My Achievements
          </h2>
          <AddAchievementDialog onAdd={handleRefresh} />
        </div>

        {isLoading ?
        <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div> :

        <AchievementGrid achievements={achievements} />
        }
      </div>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border">
        <p className="text-sm text-muted-foreground font-body">Made with 💙 by Ishaan Raj

        </p>
      </footer>
    </div>);

}