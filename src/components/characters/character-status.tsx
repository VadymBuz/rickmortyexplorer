import { cn } from "@/lib/utils";

const statusStyles: Record<string, { label: string; className: string }> = {
  Alive: { label: "Alive", className: "text-alive" },
  Dead: { label: "Dead", className: "text-dead" },
};

const unknownStatus = { label: "Status unknown", className: "text-muted-foreground" };

export function CharacterStatus({
  status,
  className,
}: {
  status: string | null;
  className?: string;
}) {
  const { label, className: colorClassName } = (status && statusStyles[status]) || unknownStatus;

  return (
    <span className={cn("inline-flex items-center gap-1.5 font-medium", colorClassName, className)}>
      <span aria-hidden className="size-2 shrink-0 rounded-full bg-current" />
      {label}
    </span>
  );
}
