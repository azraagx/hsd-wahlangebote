import type { ScheduleEntry } from "@/features/student-portal/types";

export const schedule: ScheduleEntry[] = [
  { day: 0, startSlot: 1, duration: 2, title: "Interaktive Systeme", room: "E.101", color: "#6C5CE7" },
  { day: 0, startSlot: 4, duration: 2, title: "IT-Sicherheit", room: "B.204", color: "#D63031" },
  { day: 1, startSlot: 0, duration: 2, title: "Interaktive Systeme", room: "D.301", color: "#E17055" },
  { day: 1, startSlot: 3, duration: 2, title: "Mobile Anwendungen", room: "A.102", color: "#0984E3" },
  { day: 2, startSlot: 1, duration: 3, title: "Projektseminar", room: "Lab 3", color: "#FDCB6E" },
  { day: 3, startSlot: 0, duration: 2, title: "IT-Sicherheit Übung", room: "B.204", color: "#D63031" },
  { day: 3, startSlot: 3, duration: 2, title: "Interaktive Systeme Lab", room: "Media Lab", color: "#6C5CE7" },
  { day: 4, startSlot: 2, duration: 2, title: "myHSD Projekt", room: "D.301", color: "#E17055" },
];

export const TIME_SLOTS = ["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30"];
export const DAYS = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];