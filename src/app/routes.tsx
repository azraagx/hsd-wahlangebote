import { createBrowserRouter } from "react-router";
import Layout from "@/features/teacher-portal/components/Layout";
import Dashboard from "@/features/teacher-portal/pages/Dashboard";
import TypeSelect from "@/features/teacher-portal/pages/TypeSelect";
import ProjectForm from "@/features/teacher-portal/pages/ProjectForm";
import SpecializationForm from "@/features/teacher-portal/pages/SpecializationForm";
import Preview from "@/features/teacher-portal/pages/Preview";
import Success from "@/features/teacher-portal/pages/Success";
import PublishedList from "@/features/teacher-portal/pages/PublishedList";
import PublishedDetail from "@/features/teacher-portal/pages/PublishedDetail";
import ApplicationsReview from "@/features/teacher-portal/pages/ApplicationsReview";
import StudentPortalPage from "@/features/student-portal/pages/StudentPortalPage";

export const router = createBrowserRouter([
  { path: "/student", Component: StudentPortalPage },
  {
    path: "/lehrender",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "select-type", Component: TypeSelect },
      { path: "create-project", Component: ProjectForm },
      { path: "import-specialization", Component: SpecializationForm },
      { path: "preview", Component: Preview },
      { path: "success", Component: Success },
      { path: "published", Component: PublishedList },
      { path: "published/:id", Component: PublishedDetail },
      { path: "published/:id/applications", Component: ApplicationsReview },
      { path: "*", Component: () => { window.location.href = "/lehrender"; return null; } },
    ],
  },
  { path: "/", Component: () => { window.location.href = "/student"; return null; } },
]);
