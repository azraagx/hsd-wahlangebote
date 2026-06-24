import { bewerbungen, assignedCourses } from "@/features/student-portal/data/applications";
import { coursesBySemester } from "@/features/student-portal/data/courses";
import { modulAngebote } from "@/features/student-portal/data/moduleOffers";
import { schedule } from "@/features/student-portal/data/schedule";
import type { ModulCategory } from "@/features/student-portal/types";

export const studentPortalService = {
  getApplications() {
    return bewerbungen;
  },

  getAssignedCourses() {
    return assignedCourses;
  },

  getCoursesBySemester(semester: number) {
    return coursesBySemester[semester] ?? [];
  },

  getModuleOffers(category?: ModulCategory | null) {
    if (!category) {
      return modulAngebote;
    }

    return modulAngebote.filter((angebot) => angebot.modulCategory === category);
  },

  getSchedule() {
    return schedule;
  },
};