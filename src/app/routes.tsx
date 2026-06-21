import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TypeSelect from "./pages/TypeSelect";
import ProjectForm from "./pages/ProjectForm";
import SpecializationForm from "./pages/SpecializationForm";
import Preview from "./pages/Preview";
import Success from "./pages/Success";
import PublishedList from "./pages/PublishedList";
import PublishedDetail from "./pages/PublishedDetail";
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
      { path: "*", Component: () => { window.location.href = "/lehrender"; return null; } },
    ],
  },
  { path: "/", Component: () => { window.location.href = "/student"; return null; } },
]);
