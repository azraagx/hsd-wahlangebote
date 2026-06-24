import type { Page } from "@/features/student-portal/types";
import { MeinBereichSubNav } from "@/features/student-portal/components/MeinBereichSubNav";
import { studentPortalService } from "@/features/student-portal/services/studentPortalService";
import {
  HSD_BORDER,
  HSD_DARK,
  HSD_GRAY,
  HSD_LINK,
} from "@/features/student-portal/styles/tokens";

export function MeineKursePage({ setPage }: { setPage: (p: Page) => void }) {
  const assignedCourses = studentPortalService.getAssignedCourses();
  return (
    <div>
      {/* Back button */}
      <div className="mb-3">
        <button
          onClick={() => setPage("bewerbungen")}
          className="text-sm hover:underline"
          style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_LINK }}
        >
          ← Zurück zu Meine Bewerbungen
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl mb-1" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
          Mein Bereich
        </h1>
        <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
          Mein Bereich · Sommersemester 2026
        </p>
      </div>

      <MeinBereichSubNav page="kurse" setPage={setPage} />

      <div
        className="bg-white rounded-lg p-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>Meine Kurse</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {assignedCourses.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow"
              style={{ border: `1px solid ${HSD_BORDER}` }}
            >
              <div
                className="h-[90px] flex items-center justify-center"
                style={item.img ? { backgroundImage: `url(${item.img})`, backgroundSize: "cover", backgroundPosition: "top left" } : { backgroundColor: item.color }}
              />
              <div className="p-3">
                <a href="#" className="text-sm font-medium leading-snug block mb-0.5" style={{ color: HSD_LINK, fontFamily: "'Segoe UI', sans-serif" }} onClick={(e) => e.preventDefault()}>
                  {item.title}
                </a>
                <p className="text-xs truncate" style={{ color: HSD_GRAY, fontFamily: "'Segoe UI', sans-serif" }}>
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
