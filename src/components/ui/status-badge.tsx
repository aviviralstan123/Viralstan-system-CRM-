import { cn } from "@/lib/utils";

type StatusVariant = "success" | "warning" | "danger" | "info" | "neutral";

const variantStyles: Record<StatusVariant, string> = {
  success: "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400",
  warning: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  danger: "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
  info: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
  neutral: "bg-gray-500/10 text-gray-600 border-gray-500/20 dark:text-gray-400",
};

interface StatusBadgeProps {
  label: string;
  variant: StatusVariant;
  className?: string;
}

export function StatusBadge({ label, variant, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      <span className={cn(
        "h-1.5 w-1.5 rounded-full",
        variant === "success" && "bg-green-600 dark:bg-green-400",
        variant === "warning" && "bg-amber-600 dark:bg-amber-400",
        variant === "danger" && "bg-red-600 dark:bg-red-400",
        variant === "info" && "bg-blue-600 dark:bg-blue-400",
        variant === "neutral" && "bg-gray-600 dark:bg-gray-400"
      )} />
      {label}
    </span>
  );
}

export function getInvoiceStatusVariant(status: string): StatusVariant {
  switch (status) {
    case "paid": case "completed": case "active": case "published": case "won": return "success";
    case "pending": case "contacted": case "qualified": case "draft": return "warning";
    case "overdue": case "failed": case "lost": case "inactive": case "hidden": return "danger";
    case "new": case "prospect": case "proposal": return "info";
    default: return "neutral";
  }
}
