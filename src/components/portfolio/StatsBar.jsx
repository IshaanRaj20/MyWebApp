import { Trophy, Award, Star, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

const statItems = [
  { key: "award", label: "Awards", icon: Award, gradient: "from-blue-500 to-blue-600" },
  { key: "trophy", label: "Trophies", icon: Trophy, gradient: "from-sky-400 to-blue-500" },
  { key: "accomplishment", label: "Accomplishments", icon: Star, gradient: "from-blue-600 to-indigo-600" },
  { key: "game", label: "Games", icon: Gamepad2, gradient: "from-indigo-500 to-purple-600" },
];

export default function StatsBar({ achievements }) {
  const counts = {
    award: achievements.filter(a => a.category === "award").length,
    trophy: achievements.filter(a => a.category === "trophy").length,
    accomplishment: achievements.filter(a => a.category === "accomplishment").length,
    game: achievements.filter(a => a.category === "game").length,
  };

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
      {statItems.map((item, i) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
          className={`bg-gradient-to-br ${item.gradient} rounded-2xl p-4 sm:p-6 text-white text-center shadow-lg`}
        >
          <item.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 opacity-90" />
          <div className="text-2xl sm:text-4xl font-heading font-bold">{counts[item.key]}</div>
          <div className="text-xs sm:text-sm font-body opacity-80 mt-1">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}