import { Trophy, Award, Star, Calendar, Gamepad2, Download } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const categoryConfig = {
  award: { icon: Award, color: "bg-blue-100 text-blue-600", label: "Award" },
  trophy: { icon: Trophy, color: "bg-sky-100 text-sky-600", label: "Trophy" },
  accomplishment: { icon: Star, color: "bg-indigo-100 text-indigo-600", label: "Accomplishment" },
  game: { icon: Gamepad2, color: "bg-purple-100 text-purple-600", label: "Game" },
};

export default function AchievementCard({ achievement, index }) {
  const config = categoryConfig[achievement.category] || categoryConfig.award;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-card rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-border/50 group"
    >
      {achievement.image_url && (
        <div className="h-40 overflow-hidden">
          <img
            src={achievement.image_url}
            alt={achievement.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 text-xs font-body font-medium px-2.5 py-1 rounded-full ${config.color}`}>
            <Icon className="w-3.5 h-3.5" />
            {config.label}
          </span>
          {achievement.date_earned && (
            <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {format(new Date(achievement.date_earned), "MMM yyyy")}
            </span>
          )}
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground leading-tight mb-2">
          {achievement.title}
        </h3>
        {achievement.description && (
          <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-3">
            {achievement.description}
          </p>
        )}
        {achievement.category === "game" && (
          <div className="mt-4">
            {achievement.download_url ? (
              <a
                href={achievement.download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-body font-medium px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Game
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground border border-dashed border-border px-4 py-2 rounded-full">
                <Download className="w-4 h-4" />
                Download link coming soon
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}