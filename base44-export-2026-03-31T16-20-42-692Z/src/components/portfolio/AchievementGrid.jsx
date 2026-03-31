import { useState } from "react";
import { Trophy, Award, Star, LayoutGrid, Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AchievementCard from "./AchievementCard";

const filters = [
  { key: "all", label: "All", icon: LayoutGrid },
  { key: "award", label: "Awards", icon: Award },
  { key: "trophy", label: "Trophies", icon: Trophy },
  { key: "accomplishment", label: "Accomplishments", icon: Star },
  { key: "game", label: "Games", icon: Gamepad2 },
];

export default function AchievementGrid({ achievements }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? achievements
    : achievements.filter(a => a.category === activeFilter);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
              activeFilter === f.key
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-muted-foreground hover:bg-muted border border-border"
            }`}
          >
            <f.icon className="w-4 h-4" />
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((achievement, index) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Trophy className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground font-body">No achievements in this category yet!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}