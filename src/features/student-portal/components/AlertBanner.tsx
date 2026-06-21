import { HSD_BLUE, HSD_DARK, HSD_GRAY } from "@/features/student-portal/styles/tokens";

export function AlertBanner() {
  return (
    <div
      className="mb-6 rounded-lg border p-4"
      style={{
        backgroundColor: "#e6f7fb",
        borderColor: HSD_BLUE,
      }}
    >
      <p className="text-sm font-semibold" style={{ color: HSD_DARK }}>
        Wahlphase Sommersemester 2026
      </p>
      <p className="mt-1 text-sm" style={{ color: HSD_GRAY }}>
        Die Bewerbung fuer Wahlmodule, Vertiefungen und Projekte ist bis zum 08.04.2026 um 08:00 Uhr moeglich.
      </p>
    </div>
  );
}