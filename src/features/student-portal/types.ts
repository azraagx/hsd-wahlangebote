export type Page =
  | "home"
  | "bewerbungen"
  | "stundenplan"
  | "kurse"
  | "modulwahl"
  | "bmi2018"
  | "studienverlaufsplan"
  | "angebotDetail";

export type ModulCategory =
  | "Vertiefung A"
  | "Vertiefung B"
  | "Vertiefung c"
  | "Vertiefung D"
  | "Medienprojekt A"
  | "Medienprojekt B"
  | "Informatikprojekt 1"
  | "Informatikprojekt 2"
  | "Pflichtmodul"
  | "Wahlmodul"
  | "Wissenschaftliche Vertiefung"
  | "Individuelle Vertiefung";

export type StatusType = "angenommen" | "in_bearbeitung" | "abgelehnt";

export interface Bewerbung {
  id: number;
  name: string;
  typ: "Wahlmodul" | "Vertiefung" | "Vertiefung A" | "Vertiefung B";
  datum: string;
  status: StatusType;
  modul: string;
}

export type CourseActionType = "openoffers" | "openCourse";

export interface CourseAction {
  type: CourseActionType;
  label: String;
}
export interface Course {
  id: number;
  name: string;
  modulNr: string;
  dozent: string;
  ects: number;
  beschreibung: string;
  color: string;
  category?: ModulCategory;
  isPlaceholder?: boolean;
}

export interface ScheduleEntry {
  day: number;
  startSlot: number;
  duration: number;
  title: string;
  room: string;
  color: string;
}

export interface ModulAngebot {
  id: number;
  titel: string;
  professoren: string[];
  beschreibung: string;
  kategorie: string;
  detailBeschreibung: string;
  anforderungen: string;
  platze: number;
  semester: string;
  modulTyp: string;
  modulCategory: ModulCategory;
  status: "Open" | "Few spots left" | "Closed";
  deadline: string;
  inhalteZiele: string[];
  organisation: {
    rhythm: string;
    workload: string;
    projectType: string;
    language: string;
    format: string;
    availability: string;
  };
  anwesenheitspflicht?: {
    required: boolean;
    description: string;
  };
  bewerbungsinfo: {
    type: string;
    motivationLetter: boolean;
    selectionProcess: string;
    multipleApplications: boolean;
    reusable: boolean;
  };
}

export interface StudentApplication {
  id: number;
  angebotId: number;
  titel: string;
  kategorie: string;
  status: "pending" | "accepted" | "rejected";
  prioritat: number;
}