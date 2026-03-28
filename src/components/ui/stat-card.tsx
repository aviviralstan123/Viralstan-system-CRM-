import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({ title, value, change, changeType = "positive", icon: Icon, iconColor }: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fade-in relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-4">
          <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{title}</p>
          <div className="space-y-2">
            <p className="text-4xl font-black tracking-tighter text-foreground group-hover:gradient-text transition-all duration-300">{value}</p>
            {change && (
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm",
                    changeType === "positive" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                    changeType === "negative" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                    changeType === "neutral" && "bg-muted text-muted-foreground"
                  )}
                >
                  {change}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className={cn(
          "rounded-2xl p-4 transition-all duration-500 group-hover:rotate-12 shadow-xl", 
          iconColor || "bg-primary/5 text-primary group-hover:gradient-primary group-hover:text-white group-hover:shadow-primary/30"
        )}>
          <Icon className="h-7 w-7 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}
