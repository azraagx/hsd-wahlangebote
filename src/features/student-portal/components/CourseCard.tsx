import type { Course } from "@/features/student-portal/types";
import { HSD_BORDER, HSD_DARK, HSD_GRAY, HSD_LINK } from "@/features/student-portal/styles/tokens";

interface CourseCardProps {
  course: Course;
  onNavigate?: () => void;
}

export function CourseCard({ course, onNavigate }: CourseCardProps) {
  return (
    <div
      className="rounded-lg border bg-white p-4"
      style={{ borderColor: HSD_BORDER }}
    >
      <div className="mb-3 flex items-start gap-3">
        <div
          className="h-10 w-10 shrink-0 rounded"
          style={{ backgroundColor: course.color }}
        />
        <div>
          <h3 className="text-sm font-bold" style={{ color: HSD_DARK }}>
            {course.name}
          </h3>
          <p className="text-xs" style={{ color: HSD_GRAY }}>
            {course.modulNr} · {course.ects} ECTS
          </p>
        </div>
      </div>

      <p className="mb-3 text-sm leading-relaxed" style={{ color: HSD_GRAY }}>
        {course.beschreibung}
      </p>

      <p className="mb-3 text-xs" style={{ color: HSD_GRAY }}>
        {course.dozent}
      </p>

      {course.isPlaceholder && onNavigate && (
        <button
          onClick={onNavigate}
          className="text-sm font-semibold hover:underline"
          style={{ color: HSD_LINK }}
        >
          Angebote ansehen
        </button>
      )}
    </div>
  );
}