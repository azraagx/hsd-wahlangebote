import { useState } from "react";
import type { Page, StudentApplication} from "@/features/student-portal/types";
import { MeinBereichSubNav } from "@/features/student-portal/components/MeinBereichSubNav";
import { StatusBadge } from "@/features/student-portal/components/StatusBadge";
import { useApplications } from "@/features/student-portal/state/ApplicationContext";import {
  HSD_BLUE,
  HSD_BORDER,
  HSD_BORDER_LIGHT,
  HSD_DARK,
  HSD_GRAY,
  HSD_TEAL,
} from "@/features/student-portal/styles/tokens";
import { ApplicationViewModal } from "@/features/student-portal/components/ApplicationViewModal";
export function BewerbungenPage({
  setPage,
}: {
  setPage: (p: Page) => void;
}) {
  const [categoryFilter, setCategoryFilter] =
    useState<string>("Alle");

  const [selectedApplication, setSelectedApplication] =
    useState<StudentApplication | null>(null);

  const { submittedApplications } = useApplications();
  const applications = submittedApplications;

  const filteredBewerbungen = applications.filter((bewerbung) => {
    if (categoryFilter === "Alle") {
      return true;
    }
if (categoryFilter === "Vertiefungen") {
    return [
      "Vertiefung A",
      "Vertiefung B",
      "Vertiefung C",
      "Vertiefung D",
    ].includes(bewerbung.kategorie);
  }

  if (categoryFilter === "Medienprojekte") {
    return bewerbung.kategorie.startsWith("Medienprojekt");
  }

  if (categoryFilter === "Informatikprojekte") {
    return bewerbung.kategorie.startsWith("Informatikprojekt");
  }

  return bewerbung.kategorie === categoryFilter;
});
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl mb-1" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
            Mein Bereich
          </h1>
          <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            Meine Bewerbungen · Sommersemester 2026
          </p>
        </div>
        <div className="sm:text-right sm:pt-1">
          <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            Mein Studium: BMI 2018
          </p>
        </div>
      </div>

      <MeinBereichSubNav page="bewerbungen" setPage={setPage} />

      {/* Category filters */}
      <div className="mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            Filtern nach:
          </span>
          {["Alle", "Vertiefungen", "Medienprojekte", "Informatikprojekte", "Individuelle Vertiefung"].map((filter) => (
            <button
              key={filter}
              onClick={() => setCategoryFilter(filter)}
              className="px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={{
                fontFamily: "'Segoe UI', sans-serif",
                backgroundColor: categoryFilter === filter ? HSD_BLUE : "transparent",
                color: categoryFilter === filter ? "white" : HSD_GRAY,
                border: `1.5px solid ${categoryFilter === filter ? HSD_BLUE : HSD_BORDER_LIGHT}`,
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Applications table – desktop */}
      <div
        className="bg-white rounded-lg overflow-hidden hidden sm:block"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: HSD_BORDER_LIGHT }}>
          <h2 className="text-lg font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
            Meine Bewerbungen
          </h2>
          <span className="text-sm" style={{ color: HSD_GRAY, fontFamily: "'Segoe UI', sans-serif" }}>
            {filteredBewerbungen.length} Einträge
          </span>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              {["Modul / Vertiefung", "Typ", "Bewerbungsdatum", "Status"].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY, borderBottom: `1px solid ${HSD_BORDER_LIGHT}` }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBewerbungen.map((b, i) => (
              <tr
                key={b.id}
                className="hover:bg-gray-50 transition-colors"
                style={{ borderBottom: i < filteredBewerbungen.length - 1 ? `1px solid ${HSD_BORDER_LIGHT}` : "none" }}
              >
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                    {b.titel}
                  </p>
                  <p className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                    Angebot #{b.angebotId}
                  </p>
                  {b.motivationText && (
                    <button
                      type="button"
                      onClick={() => setSelectedApplication(b)}
                      className="mt-2 text-xs font-semibold hover:underline"
                      style={{ color: HSD_BLUE }}
                    >
                      Bewerbung einsehen
                    </button>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: b.kategorie === "Vertiefung" ? "#e0f4f8" : "#f0f0f8",
                      color: b.kategorie === "Vertiefung" ? HSD_TEAL : "#5a5a9a",
                    }}
                  >
                    {b.kategorie}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                    {b.datum}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={b.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Applications cards – mobile */}
      <div className="sm:hidden space-y-3">
        {filteredBewerbungen.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-lg p-4"
            style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <p className="text-sm font-semibold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                  {b.titel}
                </p>
                <p className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                  {b.kategorie} · Angebot #{b.angebotId}
                </p>
              </div>
              <StatusBadge status={b.status} />
            </div>
            <p className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Beworben am {b.datum}
            </p>
          </div>
        ))}
      </div>
      {selectedApplication && (
        <ApplicationViewModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
      </div>
  );
}