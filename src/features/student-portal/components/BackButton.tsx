import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { HSD_LINK } from "@/features/student-portal/styles/tokens";

interface BackButtonProps {
  label?: string;
}

export function BackButton({ label = "Zurück" }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
      style={{ color: HSD_LINK }}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
}