import type { Page } from "@/features/student-portal/types";
import {
  HSD_BLUE,
  HSD_BORDER,
  HSD_BORDER_LIGHT,
  HSD_DARK,
  HSD_GRAY,
  HSD_LINK,
  HSD_RED,
} from "@/features/student-portal/styles/tokens";

export function StudienverlaufsplanPage({ setPage, navigateWithScroll }: { setPage: (p: Page) => void; navigateWithScroll?: (page: Page, section?: string) => void }) {
  const semesters = [
    {
      sem: 1,
      modules: [
        { title: "Objektorientierte Programmierung 1", cp: 5, color: "#FFD93D" },
        { title: "Rechnernetze", cp: 5, color: "#6BCB77" },
        { title: "Webprogrammierung", cp: 5, color: "#4D96FF" },
        { title: "Mediengestaltung 1", cp: 5, color: "#FF6B9D" },
        { title: "Rechnerarchitektur und Professionelles Studieren", cp: 5, color: "#FFD93D" },
        { title: "Mathematik 1", cp: 5, color: "#6BCB77" }
      ]
    },
    {
      sem: 2,
      modules: [
        { title: "Objektorientierte Programmierung 2", cp: 5, color: "#FFD93D" },
        { title: "Datenbanksysteme 1", cp: 5, color: "#4D96FF" },
        { title: "Informatikprojekt 1", cp: 5, color: "#FF6B9D" },
        { title: "Formale Modelle und Algorithmen", cp: 5, color: "#6BCB77" },
        { title: "Mediengestaltung 2", cp: 5, color: "#FF6B9D" },
        { title: "Mathematik 2", cp: 5, color: "#6BCB77" }
      ]
    },
    {
      sem: 3,
      modules: [
        { title: "Software Engineering", cp: 5, color: "#FFD93D" },
        { title: "Datenbanksysteme 2", cp: 5, color: "#4D96FF" },
        { title: "Informatikprojekt 2", cp: 5, color: "#FF6B9D" },
        { title: "Grundlagen der Computergrafik", cp: 5, color: "#4D96FF" },
        { title: "Mensch-Computer-Interaktion", cp: 5, color: "#FF6B9D" },
        { title: "Mathematik 3", cp: 5, color: "#6BCB77" }
      ]
    },
    {
      sem: 4,
      modules: [
        { title: "Web Engineering", cp: 5, color: "#4D96FF" },
        { title: "IT-Sicherheit", cp: 5, color: "#FFD93D" },
        { title: "Vertiefung A", cp: 5, color: "#9D84B7" },
        { title: "Vertiefung B", cp: 5, color: "#9D84B7" },
        { title: "Medienprojekt A", cp: 5, color: "#FF6B9D" },
        { title: "Digitale Bild- und Tontechnik", cp: 5, color: "#FF6B9D" }
      ]
    },
    {
      sem: 5,
      modules: [
        { title: "Betriebssysteme", cp: 5, color: "#FFD93D" },
        { title: "Vertiefung C", cp: 5, color: "#9D84B7" },
        { title: "Vertiefung D", cp: 5, color: "#9D84B7" },
        { title: "Medienprojekt B", cp: 5, color: "#FF6B9D" },
        { title: "Grundlagen der Betriebswirtschaft", cp: 5, color: "#6BCB77" },
        { title: "Projektmanagement, Medien- und IT-Recht", cp: 5, color: "#6BCB77" }
      ]
    },
    {
      sem: 6,
      modules: [
        { title: "Externes Semester", cp: 30, color: "#95E1D3", fullWidth: true }
      ]
    },
    {
      sem: 7,
      modules: [
        { title: "Individuelle Vertiefung", cp: 10, color: "#9D84B7" },
        { title: "Wissenschaftliche Vertiefung", cp: 5, color: "#6BCB77" },
        { title: "Bachelorarbeit mit Kolloquium", cp: 15, color: "#FFD93D" }
      ]
    }
  ];

  return (
    <div>
      {/* Back button */}
     

      <div className="mb-6">
        <h1 className="text-3xl mb-2" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
          Studienverlaufsplan der PO 2018
        </h1>
        <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
          Studienbeginn zwischen WiSe 2018/19 und WiSe 2024/2025
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="mb-6 flex flex-col sm:flex-row justify-end gap-4">
        <button
          onClick={() => setPage("modulwahlUebersicht")}
          className="px-5 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300"
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            backgroundColor: "#e9ecef",
            color: HSD_GRAY,
            border: `1px solid ${HSD_BORDER_LIGHT}`
          }}
        >
          Zur Modulwahl
        </button>
        <button
          onClick={() => setPage("stundenplan")}
          className="px-5 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300"
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            backgroundColor: "#e9ecef",
            color: HSD_GRAY,
            border: `1px solid ${HSD_BORDER_LIGHT}`
          }}
        >
          Mein Stundenplan
        </button>
      </div>

      <div
        className="bg-white rounded-lg p-6"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 4px rgba(0,0,0,0.08)" }}
      >
        <div className="space-y-6">
          {semesters.map((semester) => (
            <div key={semester.sem} className="flex gap-4">
              {/* Semester label */}
              <div
                className="flex-shrink-0 w-20 flex items-start justify-center pt-3"
                style={{ fontFamily: "'Segoe UI', sans-serif" }}
              >
                <span className="text-base font-bold" style={{ color: HSD_DARK }}>
                  {semester.sem}. Sem
                </span>
              </div>

              {/* Modules grid */}
              <div className="flex-1">
                <div className={semester.modules[0]?.fullWidth ? "w-full" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"}>
                  {semester.modules.map((module, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg p-3 ${module.fullWidth ? "w-full" : ""}`}
                      style={{
                        backgroundColor: module.color,
                        border: `1px solid rgba(0,0,0,0.1)`
                      }}
                    >
                      <h3 className="text-sm font-semibold mb-1 text-white leading-snug" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                        {module.title}
                      </h3>
                      <p className="text-xs font-bold text-white opacity-90" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                        {module.cp} CP
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total CP */}
        <div className="mt-6 pt-6" style={{ borderTop: `2px solid ${HSD_BORDER_LIGHT}` }}>
          <div className="flex justify-between items-center">
            <span className="text-base font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              Gesamt
            </span>
            <span className="text-xl font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_RED }}>
              210 CP
            </span>
          </div>
        </div>
      </div>
    </div>
  );}