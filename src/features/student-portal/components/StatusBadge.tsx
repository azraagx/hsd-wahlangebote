import type { StatusType } from "@/features/student-portal/types";
import { HSD_RED } from "@/features/student-portal/styles/tokens";

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    entwurf: {
  label: "Entwurf",
  bg: "#E2E3E5",
  color: "#41464B",
},
    angenommen: { label: "Angenommen", color: "#00a65a", bg: "#e8f5e9" },
    in_bearbeitung: { label: "In Bearbeitung", color: "#f39c12", bg: "#fff8e1" },
    abgelehnt: { label: "Abgelehnt", color: HSD_RED, bg: "#fdecea" },
  };

  const config = statusConfig[status];

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      {config.label}
    </span>
  );
}