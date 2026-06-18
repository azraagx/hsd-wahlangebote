import { useEffect, useState } from "react";
import type { ModulCategory, Page, StudentApplication } from "@/features/student-portal/types";
import { DraggableApplicationCard } from "@/features/student-portal/components/DraggableApplicationCard";
import { MeinBereichSubNav } from "@/features/student-portal/components/MeinBereichSubNav";
import { bewerbungen } from "@/features/student-portal/data/applications";
import {
  HSD_BLUE,
  HSD_BORDER,
  HSD_BORDER_LIGHT,
  HSD_DARK,
  HSD_GRAY,
  HSD_LINK,
  HSD_RED,
} from "@/features/student-portal/styles/tokens";

export function BewerbungenPage({ setPage, scrollTarget, clearScrollTarget, onSelectCategory }: { setPage: (p: Page) => void; scrollTarget: string | null; clearScrollTarget: () => void; onSelectCategory?: (category: ModulCategory) => void }) {
  const [categoryFilter, setCategoryFilter] = useState<string>("Alle");
  const [semester, setSemester] = useState(4);
  const courses = coursesBySemester[semester] ?? [];

  const filteredBewerbungen = categoryFilter === "Alle"
    ? bewerbungen
    : bewerbungen.filter(b => b.typ === categoryFilter || b.modul.includes(categoryFilter));

  useEffect(() => {
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          clearScrollTarget();
        }, 100);
      }
    }
  }, [scrollTarget, clearScrollTarget]);

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

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        {[
          { label: "Gesamt", value: bewerbungen.length, color: HSD_BLUE, bg: "#e0f4f8" },
          { label: "Angenommen", value: bewerbungen.filter(b => b.status === "angenommen").length, color: "#155724", bg: "#D4EDDA" },
          { label: "In Bearbeitung", value: bewerbungen.filter(b => b.status === "in_bearbeitung").length, color: "#856404", bg: "#FFF3CD" },
          { label: "Abgelehnt", value: bewerbungen.filter(b => b.status === "abgelehnt").length, color: "#842029", bg: "#F8D7DA" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg p-4"
            style={{ backgroundColor: stat.bg, border: `1px solid ${HSD_BORDER}` }}
          >
            <p className="text-2xl font-bold" style={{ color: stat.color, fontFamily: "'Segoe UI', sans-serif" }}>
              {stat.value}
            </p>
            <p className="text-xs mt-0.5" style={{ color: HSD_GRAY, fontFamily: "'Segoe UI', sans-serif" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Category filters */}
      <div className="mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            Filtern nach:
          </span>
          {["Alle", "Vertiefung A", "Vertiefung B", "Medienprojekt A", "Medienprojekt B", "Wahlmodul"].map((filter) => (
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
                    {b.name}
                  </p>
                  <p className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                    {b.modul}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: b.typ === "Vertiefung" ? "#e0f4f8" : "#f0f0f8",
                      color: b.typ === "Vertiefung" ? HSD_TEAL : "#5a5a9a",
                    }}
                  >
                    {b.typ}
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
                  {b.name}
                </p>
                <p className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                  {b.modul} · {b.typ}
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

      {/* Modulwahl section */}
      <div
        id="modulwahl-section"
        className="bg-white rounded-lg p-5 mt-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h2 className="text-lg font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>Modulwahl</h2>
          <div className="flex flex-wrap gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((sem) => (
              <button
                key={sem}
                onClick={() => setSemester(sem)}
                className="px-3.5 py-1 rounded-full text-sm font-semibold transition-all"
                style={{
                  fontFamily: "'Segoe UI', sans-serif",
                  backgroundColor: semester === sem ? HSD_BLUE : "transparent",
                  color: semester === sem ? "white" : HSD_GRAY,
                  border: `1.5px solid ${semester === sem ? HSD_BLUE : HSD_BORDER_LIGHT}`,
                }}
              >
                {sem}. Sem
              </button>
            ))}
          </div>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onNavigate={course.isPlaceholder && course.category && onSelectCategory
                  ? () => onSelectCategory(course.category as ModulCategory)
                  : undefined
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10" style={{ color: HSD_GRAY, fontFamily: "'Segoe UI', sans-serif" }}>
            Keine Kurse für dieses Semester verfügbar.
          </div>
        )}
      </div>
    </div>
  );
}