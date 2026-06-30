import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type {
  ModulAngebot,
  ModulCategory,
  StudentApplication,
} from "@/features/student-portal/types";

const STORAGE_KEY = "hsd-student-applications";

interface AddApplicationInput {
  angebot: ModulAngebot;
  kategorie: ModulCategory;
  motivationText?: string;
}

interface ApplicationContextValue {
  applications: StudentApplication[];
  submittedApplications: StudentApplication[];
  hasUnsavedChanges: boolean;
  addApplication: (input: AddApplicationInput) => boolean;
  removeApplication: (id: number) => void;
  moveApplication: (fromIndex: number, toIndex: number) => void;
  saveApplications: () => void;
  hasApplication: (angebotId: number) => boolean;
  updateApplicationMotivation: (id: number,motivationText: string) => void;
}

const ApplicationContext = createContext<ApplicationContextValue | undefined>(
  undefined,
);

function loadApplications(): StudentApplication[] {
  try {
    const storedApplications = localStorage.getItem(STORAGE_KEY);

    if (!storedApplications) {
      return [];
    }

    return JSON.parse(storedApplications) as StudentApplication[];
  } catch {
    return [];
  }
}

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] =
    useState<StudentApplication[]>(loadApplications);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const hasApplication = (angebotId: number) =>
    applications.some((application) => application.angebotId === angebotId);

  const addApplication = ({
    angebot,
    kategorie,
    motivationText,
  }: AddApplicationInput) => {
    if (hasApplication(angebot.id)) {
      return false;
    }

    const application: StudentApplication = {
      id: Date.now(),
      angebotId: angebot.id,
      titel: angebot.titel,
      kategorie,
      status: "entwurf",
      prioritat: applications.length + 1,
      motivationText: motivationText?.trim() || undefined,
    };

    setApplications((current) => [...current, application]);
    setHasUnsavedChanges(true);

    return true;
  };

  const removeApplication = (id: number) => {
    setApplications((current) =>
      current
        .filter((application) => application.id !== id)
        .map((application, index) => ({
          ...application,
          prioritat: index + 1,
        })),
    );

    setHasUnsavedChanges(true);
  };

  const updateApplicationMotivation = (
  id: number,
  motivationText: string
) => {
  setApplications((current) =>
    current.map((application) =>
      application.id === id
        ? {
            ...application,
            motivationText: motivationText.trim(),
          }
        : application
    )
  );

  setHasUnsavedChanges(true);
};

  const moveApplication = (fromIndex: number, toIndex: number) => {
    setApplications((current) => {
      const updated = [...current];
      const [movedApplication] = updated.splice(fromIndex, 1);

      updated.splice(toIndex, 0, movedApplication);

      return updated.map((application, index) => ({
        ...application,
        prioritat: index + 1,
      }));
    });

    setHasUnsavedChanges(true);
  };

  const saveApplications = () => {
    const savedApplications: StudentApplication[] = applications.map(
      (application) => ({
        ...application,
        status:
          application.status === "entwurf"
            ? "in_bearbeitung"
            : application.status,
        datum: application.datum ?? new Date().toLocaleDateString("de-DE"),
      }),
    );

    setApplications(savedApplications);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedApplications));
    setHasUnsavedChanges(false);
  };

  const submittedApplications = applications.filter(
    (application) => application.status !== "entwurf",
  );

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        submittedApplications,
        hasUnsavedChanges,
        addApplication,
        removeApplication,
        moveApplication,
        saveApplications,
        hasApplication,
        updateApplicationMotivation,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error(
      "useApplications muss innerhalb des ApplicationProviders verwendet werden.",
    );
  }

  return context;
}