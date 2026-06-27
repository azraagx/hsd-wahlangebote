import React, { createContext, useContext, useState, useCallback } from "react";

type OfferType = "project" | "specialization" | null;

export interface SavedItem {
  id: string;
  name: string;
  semester: string;
  itemType: 'project' | 'specialization';
  data: any;
  savedAt: string;
}

interface PrototypeState {
  offerType: OfferType;
  autoSave: boolean;
  projectData: any;
  specializationData: any;
  validationStatus: 'success' | 'warning' | null;
  semesterData: any;
  lastSavedItemId: string | null;
  editingItemId: string | null;
  setOfferType: (type: OfferType) => void;
  setEditingItemId: (id: string | null) => void;
  setAutoSave: (val: boolean) => void;
  updateProjectData: (data: any) => void;
  updateSpecializationData: (data: any) => void;
  setValidationStatus: (status: 'success' | 'warning' | null) => void;
  updateSemesterData: (data: any) => void;
  resetFlow: () => void;
  resetProjectData: () => void;
  saveProject: () => void;
  saveSpecialization: () => void;
  getSavedItems: () => SavedItem[];
  loadProject: (projectId: string) => void;
}

const FormContext = createContext<PrototypeState | undefined>(undefined);

const STORAGE_KEY = 'savedItems_v2';

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [offerType, setOfferType] = useState<OfferType>(null);
  const [autoSave, setAutoSave] = useState(true);

  const [projectData, setProjectData] = useState({
    name: "",
    type: [],
    studyPrograms: [],
    masterExtraEffort: "",
    moodleId: "",
    reuseRule: "none",
    notifyStudents: false,
    electiveArea: "",
    description: "",
    goals: "",
    content: "",
    requirements: "",
    minPlaces: "",
    maxPlaces: "",
    moodleLink: "",
    firstMeeting: "",
    regularMeeting: "",
    location: "",
    applicationType: "",
    motivationLetterTemplate: ""
  });

  const [specializationData, setSpecializationData] = useState({
    selectedModule: null as any,
    studyPrograms: [] as string[],
    places: "30",
    moodleLink: "",
    moodleId: "",
    applicationType: "Direkte Anmeldung",
    meetings: "Mittwochs, 14:00 Uhr",
    location: "Raum B04",
    groupWish: false,
    extraNotes: "Laptop erforderlich",
    masterStudentNotes: "",
    notifyStudents: false,
    reuseRule: "none"
  });

  const [validationStatus, setValidationStatus] = useState<'success' | 'warning' | null>('success');

  const [semesterData, setSemesterData] = useState({
    semester: "Wintersemester 26/27",
    status: "Entwurf"
  });

  const [lastSavedItemId, setLastSavedItemId] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const updateProjectData = (data: any) => setProjectData(prev => ({ ...prev, ...data }));
  const updateSpecializationData = (data: any) => setSpecializationData(prev => ({ ...prev, ...data }));
  const updateSemesterData = (data: any) => setSemesterData(prev => ({ ...prev, ...data }));
  const resetProjectData = () => setProjectData({
    name: "",
    type: [],
    studyPrograms: [],
    masterExtraEffort: "",
    moodleId: "",
    reuseRule: "none",
    notifyStudents: false,
    electiveArea: "",
    description: "",
    goals: "",
    content: "",
    requirements: "",
    minPlaces: "",
    maxPlaces: "",
    moodleLink: "",
    firstMeeting: "",
    regularMeeting: "",
    location: "",
    applicationType: "",
    motivationLetterTemplate: ""
  });

  const resetFlow = () => {
    setOfferType(null);
    setValidationStatus(null);
    setSemesterData({ semester: "Wintersemester 26/27", status: "Entwurf" });
    setEditingItemId(null);
    resetProjectData();
  };

  const getSavedItems = useCallback((): SavedItem[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const items: SavedItem[] = stored ? JSON.parse(stored) : [];

      // Migrate old 'savedProjects' format
      const oldStored = localStorage.getItem('savedProjects');
      if (oldStored) {
        const oldProjects = JSON.parse(oldStored);
        const migratedIds = new Set(items.map(i => i.id));
        for (const p of oldProjects) {
          if (!migratedIds.has(p.id)) {
            items.push({ ...p, itemType: 'project' } as SavedItem);
          }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        localStorage.removeItem('savedProjects');
      }

      return items;
    } catch {
      return [];
    }
  }, []);

  const clampNonNegative = (value: string) => {
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) return "";
    return Math.max(0, parsed).toString();
  };

  const saveProject = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const items = getSavedItems();
      const now = Date.now();
      const recentDuplicate = items.find(p =>
        p.itemType === 'project' &&
        p.name === projectData.name &&
        p.semester === semesterData.semester &&
        (now - new Date(p.savedAt).getTime()) < 5000
      );

      if (editingItemId) {
        const existingIndex = items.findIndex(item => item.id === editingItemId && item.itemType === 'project');
        const updatedItem: SavedItem = {
          id: editingItemId,
          name: projectData.name,
          semester: semesterData.semester,
          itemType: 'project',
          data: {
            ...projectData,
            minPlaces: clampNonNegative(projectData.minPlaces),
            maxPlaces: clampNonNegative(projectData.maxPlaces)
          },
          savedAt: new Date().toISOString()
        };

        if (existingIndex >= 0) {
          items[existingIndex] = updatedItem;
        } else {
          items.push(updatedItem);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        setLastSavedItemId(editingItemId);
        setEditingItemId(null);
        return;
      }

      if (recentDuplicate) {
        setLastSavedItemId(recentDuplicate.id);
        return;
      }

      const newItem: SavedItem = {
        id: `project-${Date.now()}`,
        name: projectData.name,
        semester: semesterData.semester,
        itemType: 'project',
        data: {
          ...projectData,
          minPlaces: clampNonNegative(projectData.minPlaces),
          maxPlaces: clampNonNegative(projectData.maxPlaces)
        },
        savedAt: new Date().toISOString()
      };
      items.push(newItem);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      setLastSavedItemId(newItem.id);
      setEditingItemId(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  }, [projectData, semesterData, getSavedItems, editingItemId]);

  const saveSpecialization = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const items = getSavedItems();
      const now = Date.now();
      const moduleName = specializationData.selectedModule?.name || "Unbenanntes Modul";
      const recentDuplicate = items.find(p =>
        p.itemType === 'specialization' &&
        p.name === moduleName &&
        p.semester === semesterData.semester &&
        (now - new Date(p.savedAt).getTime()) < 5000
      );

      if (editingItemId) {
        const existingIndex = items.findIndex(item => item.id === editingItemId && item.itemType === 'specialization');
        const updatedItem: SavedItem = {
          id: editingItemId,
          name: moduleName,
          semester: semesterData.semester,
          itemType: 'specialization',
          data: {
            ...specializationData,
            places: clampNonNegative(specializationData.places)
          },
          savedAt: new Date().toISOString()
        };

        if (existingIndex >= 0) {
          items[existingIndex] = updatedItem;
        } else {
          items.push(updatedItem);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        setLastSavedItemId(editingItemId);
        setEditingItemId(null);
        return;
      }

      if (recentDuplicate) {
        setLastSavedItemId(recentDuplicate.id);
        return;
      }

      const newItem: SavedItem = {
        id: `spec-${Date.now()}`,
        name: moduleName,
        semester: semesterData.semester,
        itemType: 'specialization',
        data: {
          ...specializationData,
          places: clampNonNegative(specializationData.places)
        },
        savedAt: new Date().toISOString()
      };
      items.push(newItem);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      setLastSavedItemId(newItem.id);
      setEditingItemId(null);
    } catch (error) {
      console.error('Error saving specialization:', error);
    }
  }, [specializationData, semesterData, getSavedItems, editingItemId]);

  const loadProject = useCallback((projectId: string) => {
    const items = getSavedItems();
    const item = items.find(p => p.id === projectId);
    if (item && item.itemType === 'project') {
      setProjectData(item.data);
    }
  }, [getSavedItems]);

  return (
    <FormContext.Provider value={{
      offerType, setOfferType,
      autoSave, setAutoSave,
      projectData, updateProjectData,
      specializationData, updateSpecializationData,
      validationStatus, setValidationStatus,
      semesterData, updateSemesterData,
      lastSavedItemId,
      editingItemId,
      resetFlow,
      resetProjectData,
      saveProject,
      saveSpecialization,
      setEditingItemId,
      getSavedItems,
      loadProject
    }}>
      {children}
    </FormContext.Provider>
  );
}

export const useFormState = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormState must be used within a FormProvider");
  }
  return context;
};
