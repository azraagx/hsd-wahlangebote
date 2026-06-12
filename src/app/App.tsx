import { RouterProvider } from "react-router";
import { router } from "./routes";
import { FormProvider } from "./context/FormContext";

export default function App() {
  return (
    <FormProvider>
      <RouterProvider router={router} />
    </FormProvider>
  );
}

