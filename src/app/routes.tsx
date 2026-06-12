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

export const router = createBrowserRouter([
  {
    path: "/",
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
      { path: "*", Component: () => { window.location.href = "/"; return null; } },
    ],
  },
]);