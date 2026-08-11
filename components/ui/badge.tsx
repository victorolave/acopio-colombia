import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "caution" | "muted";
  className?: string;
};

const TONES = {
  neutral: "bg-ink-100 text-ink-700 ring-ink-300",
  brand: "bg-brand-50 text-brand-700 ring-brand-100",
  caution: "bg-caution-50 text-caution-700 ring-caution-100",
  muted: "bg-white text-ink-500 ring-ink-300",
} as const;

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
