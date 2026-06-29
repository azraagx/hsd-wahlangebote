import type { Page } from "@/features/student-portal/types";
import { MeinBereichSubNav } from "@/features/student-portal/components/MeinBereichSubNav";
import { DAYS, TIME_SLOTS } from "@/features/student-portal/data/schedule";
import { studentPortalService } from "@/features/student-portal/services/studentPortalService";
import {
  HSD_BLUE,
  HSD_BORDER,
  HSD_BORDER_LIGHT,
  HSD_DARK,
  HSD_GRAY,
  HSD_LINK,
} from "@/features/student-portal/styles/tokens";

export function StundenplanPage({ setPage }: { setPage: (p: Page) => void }) {
  const schedule = studentPortalService.getSchedule();
  const SLOT_H = 64;

  return (
    <div>
      {/* Back button */}
      

      <div className="mb-6">
        <h1 className="text-3xl mb-1" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
          Mein Bereich
        </h1>
        <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
          Mein Bereich · Sommersemester 2026
        </p>
      </div>

      <MeinBereichSubNav page="stundenplan" setPage={setPage} />

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        {[
          { label: "Vorlesung", color: "#6C5CE7" },
          { label: "Übung / Lab", color: "#D63031" },
          { label: "Vertiefung", color: "#E17055" },
          { label: "Seminar / Projekt", color: "#FDCB6E" },
          { label: "Pflichtmodul", color: "#0984E3" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: l.color }} />
            <span className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              {l.label}
            </span>
          </div>
        ))}
      </div>

      <div
        className="bg-white rounded-lg overflow-hidden"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <div className="p-4 border-b" style={{ borderColor: HSD_BORDER_LIGHT }}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              Stundenplan – SoSe 2026
            </h2>
            <span className="text-xs px-2 py-1 rounded" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY, backgroundColor: "#f8f9fa", border: `1px solid ${HSD_BORDER_LIGHT}` }}>
              📅 HSD Planer
            </span>
          </div>
          <p className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            KW 18 · 28.04. – 02.05.2026
          </p>
        </div>

        <div className="overflow-x-auto">
          <div style={{ minWidth: "640px" }}>
            <div className="flex" style={{ borderBottom: `1px solid ${HSD_BORDER_LIGHT}` }}>
              <div className="flex-shrink-0 w-16" />
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="flex-1 text-center py-2.5 text-sm font-semibold"
                  style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK, borderLeft: `1px solid ${HSD_BORDER_LIGHT}` }}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="flex relative">
              <div className="flex-shrink-0 w-16">
                {TIME_SLOTS.map((time) => (
                  <div
                    key={time}
                    className="flex items-start justify-center text-xs pt-1"
                    style={{
                      height: `${SLOT_H}px`,
                      fontFamily: "'Segoe UI', sans-serif",
                      color: HSD_GRAY,
                      borderBottom: `1px solid ${HSD_BORDER_LIGHT}`,
                    }}
                  >
                    {time}
                  </div>
                ))}
              </div>

              {DAYS.map((day, dayIdx) => (
                <div
                  key={day}
                  className="flex-1 relative"
                  style={{ borderLeft: `1px solid ${HSD_BORDER_LIGHT}` }}
                >
                  {TIME_SLOTS.map((_, slotIdx) => (
                    <div
                      key={slotIdx}
                      style={{
                        height: `${SLOT_H}px`,
                        borderBottom: `1px solid ${HSD_BORDER_LIGHT}`,
                        backgroundColor: slotIdx % 2 === 0 ? "transparent" : "rgba(0,0,0,0.01)",
                      }}
                    />
                  ))}

                  {schedule
                    .filter((e) => e.day === dayIdx)
                    .map((entry, i) => (
                      <div
                        key={i}
                        className="absolute left-0.5 right-0.5 rounded-md px-2 py-1.5 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        style={{
                          top: `${entry.startSlot * SLOT_H + 2}px`,
                          height: `${entry.duration * SLOT_H - 4}px`,
                          backgroundColor: entry.color,
                          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                        }}
                      >
                        <p
                          className="text-xs font-semibold leading-tight text-white truncate"
                          style={{ fontFamily: "'Segoe UI', sans-serif" }}
                        >
                          {entry.title}
                        </p>
                        <p
                          className="text-xs leading-tight mt-0.5"
                          style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Segoe UI', sans-serif" }}
                        >
                          {TIME_SLOTS[entry.startSlot]} – {TIME_SLOTS[entry.startSlot + entry.duration] ?? "19:30"}
                        </p>
                        <p
                          className="text-xs leading-tight mt-0.5"
                          style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Segoe UI', sans-serif" }}
                        >
                          📍 {entry.room}
                        </p>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}