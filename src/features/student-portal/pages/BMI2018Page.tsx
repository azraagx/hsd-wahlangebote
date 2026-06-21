import { useState } from "react";
import type { Page } from "@/features/student-portal/types";
import { CourseCard } from "@/features/student-portal/components/CourseCard";
import { coursesBySemester } from "@/features/student-portal/data/courses";
import {
  HSD_BLUE,
  HSD_BORDER,
  HSD_BORDER_LIGHT,
  HSD_DARK,
  HSD_GRAY,
  HSD_LINK,
} from "@/features/student-portal/styles/tokens";

export function BMI2018Page({ setPage }: { setPage: (p: Page) => void }) {
  const [semester, setSemester] = useState(4);
  const courses = coursesBySemester[semester] ?? [];

  return (
    <div>
      {/* Back button */}
      <div className="mb-3">
        <button
          onClick={() => setPage("home")}
          className="text-sm hover:underline"
          style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_LINK }}
        >
          ← Zurück zur Startseite
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl mb-2" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
          B. Sc. Medieninformatik
        </h1>
        <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
          Prüfungsordnung 2018 · Modulübersicht und Semesterauswahl
        </p>
      </div>

      <div
        className="bg-white rounded-lg p-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h2 className="text-lg font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
            Wählen Sie Ihr Semester
          </h2>
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
                onNavigate={course.modulNr === "VT-A" ? () => setPage("modulwahl") : undefined}
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