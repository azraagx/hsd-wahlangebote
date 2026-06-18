import type { Bewerbung } from "@/features/student-portal/types";
export const bewerbungen: Bewerbung[] = [
  { id: 1, name: "Machine Learning & KI", typ: "Wahlmodul", datum: "12.03.2026", status: "angenommen", modul: "BMI 78" },
  { id: 2, name: "Vertiefung A – UX & Interaction Design", typ: "Vertiefung A", datum: "05.03.2026", status: "in_bearbeitung", modul: "VT-A" },
  { id: 3, name: "Entrepreneurship & Innovation", typ: "Wahlmodul", datum: "28.02.2026", status: "abgelehnt", modul: "BMI 81" },
  { id: 4, name: "Vertiefung B – Software Engineering", typ: "Vertiefung B", datum: "01.04.2026", status: "angenommen", modul: "VT-B" },
  { id: 5, name: "Datenbanken für Fortgeschrittene", typ: "Wahlmodul", datum: "15.04.2026", status: "in_bearbeitung", modul: "BMI 65" },
];

export const assignedCourses = [
  { id: 1, title: "BMI 52: Interaktive Systeme SoSe 2026", category: "Vertiefung A", sem: "4. Semester", img: imgCourse },
  { id: 2, title: "IT-Sicherheit", category: "Pflichtmodul", sem: "4. Semester", color: "#D63031" },
  { id: 3, title: "Web Engineering", category: "Vertiefung A", sem: "4. Semester", color: "#E17055" },
  { id: 4, title: "Web Engineering Projekt", category: "Vertiefung B", sem: "4. Semester", color: "#0984E3" },
  { id: 5, title: "Digitale Medienproduktion", category: "Medienprojekt A", sem: "4. Semester", color: "#FDCB6E" },
];
