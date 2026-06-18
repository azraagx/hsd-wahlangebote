import { createBrowserRouter } from "react-router";
import StudentPortalPage from "@/features/student-portal/pages/StudentPortalPage";

export const router = createBrowserRouter([
  { path: "/", Component: StudentPortalPage },
  { path: "/student", Component: StudentPortalPage },
  { path: "*", Component: StudentPortalPage },
]);