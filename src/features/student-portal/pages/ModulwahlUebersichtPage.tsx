import { useState } from "react";
import type { Course, ModulCategory, Page } from "@/features/student-portal/types";
import { CourseCard } from "@/features/student-portal/components/CourseCard";
import { MeinBereichSubNav } from "@/features/student-portal/components/MeinBereichSubNav";
import { studentPortalService } from "@/features/student-portal/services/studentPortalService";
import {
  HSD_BLUE,
  HSD_BORDER,
  HSD_BORDER_LIGHT,
  HSD_DARK,
  HSD_GRAY,
} from "@/features/student-portal/styles/tokens";

export function ModulwahlUebersichtPage({
  setPage,
  onSelectCategory,
}: {
  setPage: (p: Page) => void;
  onSelectCategory?: (category: ModulCategory) => void;
}) {
  const [semester, setSemester] = useState(4);
  const courses = studentPortalService.getCoursesBySemester(semester);

  const handleCourseAction = (course: Course) => {
    if (course.action?.type === "openOffers" && course.category && onSelectCategory) {
      onSelectCategory(course.category);
      return;
    }

    if (course.action?.type === "openCourse") {
      alert(`Kurs öffnen: ${course.name}`);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <h1
            className="text-3xl mb-1"
            style={{
              fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif",
              fontWeight: 300,
              color: HSD_DARK,
            }}
          >
            Mein Bereich
          </h1>
          <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            Modulwahl · Sommersemester 2026
          </p>
        </div>
        <div className="sm:text-right sm:pt-1">
          <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            Mein Studium: BMI 2018
          </p>
        </div>
      </div>

      <MeinBereichSubNav page="modulwahlUebersicht" setPage={setPage} />

      <div
        id="modulwahl-section"
        className="bg-white rounded-lg p-5 mt-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h2 className="text-lg font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
            Modulwahl
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
                onAction={handleCourseAction}
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