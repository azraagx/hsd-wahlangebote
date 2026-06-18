import { useState, useCallback, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import imgProfile from "@/imports/1440WDefault/acc4291260e1f05f1a14cc0893d23296c2967e5d.png";
import imgCourse from "@/imports/1440WDefault/344178e81f62bc421593dc0e4202a66e0f23556b.png";
import type {
  Page,
  ModulCategory,
  StatusType,
  Bewerbung,
  Course,
  ScheduleEntry,
  ModulAngebot,
  StudentApplication,
} from "@/features/student-portal/types";

import {
  HSD_RED,
  HSD_BLUE,
  HSD_TEAL,
  HSD_LINK,
  HSD_DARK,
  HSD_GRAY,
  HSD_BORDER,
  HSD_BORDER_LIGHT,
} from "@/features/student-portal/styles/tokens";

import { bewerbungen, assignedCourses } from "@/features/student-portal/data/applications";
import { coursesBySemester } from "@/features/student-portal/data/courses";
import { schedule, TIME_SLOTS, DAYS } from "@/features/student-portal/data/schedule";
import { modulAngebote } from "@/features/student-portal/data/moduleOffers";
import { StatusBadge } from "@/features/student-portal/components/StatusBadge";
import { StatusBadge } from "@/features/student-portal/components/StatusBadge";
import { AlertBanner } from "@/features/student-portal/components/AlertBanner";
import { CourseCard } from "@/features/student-portal/components/CourseCard";
import { NavBar } from "@/features/student-portal/components/NavBar";
import { ApplicationModal } from "@/features/student-portal/components/ApplicationModal";
import { MeinBereichSubNav } from "@/features/student-portal/components/MeinBereichSubNav";
import { DraggableApplicationCard } from "@/features/student-portal/components/DraggableApplicationCard";
import { HomePage } from "@/features/student-portal/pages/HomePage";
import { BewerbungenPage } from "@/features/student-portal/pages/BewerbungenPage";
import { StundenplanPage } from "@/features/student-portal/pages/StundenplanPage";
import { MeineKursePage } from "@/features/student-portal/pages/MeineKursePage";
import { ModulwahlPage } from "@/features/student-portal/pages/ModulwahlPage";
// ─── Design tokens from import ───────────────────────────────────────────────


// ─── Types ────────────────────────────────────────────────────────────────────
type Page = "home" | "bewerbungen" | "stundenplan" | "kurse" | "modulwahl" | "bmi2018" | "studienverlaufsplan" | "angebotDetail";

type ModulCategory = "Vertiefung A" | "Vertiefung B" | "Medienprojekt A" | "Medienprojekt B" | "Informatikprojekt 1" | "Informatikprojekt 2" | "Pflichtmodul" | "Wahlmodul";

type StatusType = "angenommen" | "in_bearbeitung" | "abgelehnt";

interface Bewerbung {
  id: number;
  name: string;
  typ: "Wahlmodul" | "Vertiefung" | "Vertiefung A" | "Vertiefung B";
  datum: string;
  status: StatusType;
  modul: string;
}

interface Course {
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

interface ScheduleEntry {
  day: number;
  startSlot: number;
  duration: number;
  title: string;
  room: string;
  color: string;
}

interface ModulAngebot {
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

interface StudentApplication {
  id: number;
  angebotId: number;
  titel: string;
  kategorie: string;
  status: "pending" | "accepted" | "rejected";
  prioritat: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────



const DND_TYPE = "APPLICATION_CARD";


// ─── Navigation ───────────────────────────────────────────────────────────────

// ─── Alert Banner ─────────────────────────────────────────────────────────────


// ─── Course Card ──────────────────────────────────────────────────────────────


// ─── Homepage (Startseite) ────────────────────────────────────────────────────


// ─── Modulwahl Page Components ────────────────────────────────────────────────



// ─── Mein Bereich – Sub Nav ───────────────────────────────────────────────────


// ─── Bewerbungen Page ─────────────────────────────────────────────────────────


// ─── Stundenplan Page ─────────────────────────────────────────────────────────


// ─── Meine Kurse Page ─────────────────────────────────────────────────────────

// ─── BMI 2018 Page (Semester Selection) ──────────────────────────────────────
function BMI2018Page({ setPage }: { setPage: (p: Page) => void }) {
  const [semester, setSemester] = useState(4);
  const courses = coursesBySemester[semester] ?? [];

  return (
    <div>
      {/* Back button */}
      <div className="mb-3">
        <button
          onClick={() => setPage("home")}
          className="text-sm hover:underline"
          style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_LINK }}
        >
          ← Zurück zur Startseite
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl mb-2" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
          B. Sc. Medieninformatik
        </h1>
        <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
          Prüfungsordnung 2018 · Modulübersicht und Semesterauswahl
        </p>
      </div>

      <div
        className="bg-white rounded-lg p-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h2 className="text-lg font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
            Wählen Sie Ihr Semester
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((sem) => (
              <button
                key={sem}
                onClick={() => setSemester(sem)}
                className="px-3.5 py-1 rounded-full text-sm font-semibold transition-all"
                style={{
                  fontFamily: "'Segoe UI', sans-serif",
                  backgroundColor: semester === sem ? HSD_BLUE : "transparent",
                  color: semester === sem ? "white" : HSD_GRAY,
                  border: `1.5px solid ${semester === sem ? HSD_BLUE : HSD_BORDER_LIGHT}`,
                }}
              >
                {sem}. Sem
              </button>
            ))}
          </div>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onNavigate={course.modulNr === "VT-A" ? () => setPage("modulwahl") : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10" style={{ color: HSD_GRAY, fontFamily: "'Segoe UI', sans-serif" }}>
            Keine Kurse für dieses Semester verfügbar.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Studienverlaufsplan Page ─────────────────────────────────────────────────
function StudienverlaufsplanPage({ setPage, navigateWithScroll }: { setPage: (p: Page) => void; navigateWithScroll?: (page: Page, section?: string) => void }) {
  const semesters = [
    {
      sem: 1,
      modules: [
        { title: "Objektorientierte Programmierung 1", cp: 5, color: "#FFD93D" },
        { title: "Rechnernetze", cp: 5, color: "#6BCB77" },
        { title: "Webprogrammierung", cp: 5, color: "#4D96FF" },
        { title: "Mediengestaltung 1", cp: 5, color: "#FF6B9D" },
        { title: "Rechnerarchitektur und Professionelles Studieren", cp: 5, color: "#FFD93D" },
        { title: "Mathematik 1", cp: 5, color: "#6BCB77" }
      ]
    },
    {
      sem: 2,
      modules: [
        { title: "Objektorientierte Programmierung 2", cp: 5, color: "#FFD93D" },
        { title: "Datenbanksysteme 1", cp: 5, color: "#4D96FF" },
        { title: "Informatikprojekt 1", cp: 5, color: "#FF6B9D" },
        { title: "Formale Modelle und Algorithmen", cp: 5, color: "#6BCB77" },
        { title: "Mediengestaltung 2", cp: 5, color: "#FF6B9D" },
        { title: "Mathematik 2", cp: 5, color: "#6BCB77" }
      ]
    },
    {
      sem: 3,
      modules: [
        { title: "Software Engineering", cp: 5, color: "#FFD93D" },
        { title: "Datenbanksysteme 2", cp: 5, color: "#4D96FF" },
        { title: "Informatikprojekt 2", cp: 5, color: "#FF6B9D" },
        { title: "Grundlagen der Computergrafik", cp: 5, color: "#4D96FF" },
        { title: "Mensch-Computer-Interaktion", cp: 5, color: "#FF6B9D" },
        { title: "Mathematik 3", cp: 5, color: "#6BCB77" }
      ]
    },
    {
      sem: 4,
      modules: [
        { title: "Web Engineering", cp: 5, color: "#4D96FF" },
        { title: "IT-Sicherheit", cp: 5, color: "#FFD93D" },
        { title: "Vertiefung A", cp: 5, color: "#9D84B7" },
        { title: "Vertiefung B", cp: 5, color: "#9D84B7" },
        { title: "Medienprojekt A", cp: 5, color: "#FF6B9D" },
        { title: "Digitale Bild- und Tontechnik", cp: 5, color: "#FF6B9D" }
      ]
    },
    {
      sem: 5,
      modules: [
        { title: "Betriebssysteme", cp: 5, color: "#FFD93D" },
        { title: "Vertiefung C", cp: 5, color: "#9D84B7" },
        { title: "Vertiefung D", cp: 5, color: "#9D84B7" },
        { title: "Medienprojekt B", cp: 5, color: "#FF6B9D" },
        { title: "Grundlagen der Betriebswirtschaft", cp: 5, color: "#6BCB77" },
        { title: "Projektmanagement, Medien- und IT-Recht", cp: 5, color: "#6BCB77" }
      ]
    },
    {
      sem: 6,
      modules: [
        { title: "Externes Semester", cp: 30, color: "#95E1D3", fullWidth: true }
      ]
    },
    {
      sem: 7,
      modules: [
        { title: "Individuelle Vertiefung", cp: 10, color: "#9D84B7" },
        { title: "Wissenschaftliche Vertiefung", cp: 5, color: "#6BCB77" },
        { title: "Bachelorarbeit mit Kolloquium", cp: 15, color: "#FFD93D" }
      ]
    }
  ];

  return (
    <div>
      {/* Back button */}
      <div className="mb-3">
        <button
          onClick={() => setPage("home")}
          className="text-sm hover:underline"
          style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_LINK }}
        >
          ← Zurück zur Startseite
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl mb-2" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
          Studienverlaufsplan der PO 2018
        </h1>
        <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
          Studienbeginn zwischen WiSe 2018/19 und WiSe 2024/2025
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="mb-6 flex flex-col sm:flex-row justify-end gap-4">
        <button
          onClick={() => navigateWithScroll ? navigateWithScroll("bewerbungen", "modulwahl-section") : setPage("bewerbungen")}
          className="px-5 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300"
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            backgroundColor: "#e9ecef",
            color: HSD_GRAY,
            border: `1px solid ${HSD_BORDER_LIGHT}`
          }}
        >
          Zur Modulwahl
        </button>
        <button
          onClick={() => setPage("stundenplan")}
          className="px-5 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300"
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            backgroundColor: "#e9ecef",
            color: HSD_GRAY,
            border: `1px solid ${HSD_BORDER_LIGHT}`
          }}
        >
          Mein Stundenplan
        </button>
      </div>

      <div
        className="bg-white rounded-lg p-6"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 4px rgba(0,0,0,0.08)" }}
      >
        <div className="space-y-6">
          {semesters.map((semester) => (
            <div key={semester.sem} className="flex gap-4">
              {/* Semester label */}
              <div
                className="flex-shrink-0 w-20 flex items-start justify-center pt-3"
                style={{ fontFamily: "'Segoe UI', sans-serif" }}
              >
                <span className="text-base font-bold" style={{ color: HSD_DARK }}>
                  {semester.sem}. Sem
                </span>
              </div>

              {/* Modules grid */}
              <div className="flex-1">
                <div className={semester.modules[0]?.fullWidth ? "w-full" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"}>
                  {semester.modules.map((module, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg p-3 ${module.fullWidth ? "w-full" : ""}`}
                      style={{
                        backgroundColor: module.color,
                        border: `1px solid rgba(0,0,0,0.1)`
                      }}
                    >
                      <h3 className="text-sm font-semibold mb-1 text-white leading-snug" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                        {module.title}
                      </h3>
                      <p className="text-xs font-bold text-white opacity-90" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                        {module.cp} CP
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total CP */}
        <div className="mt-6 pt-6" style={{ borderTop: `2px solid ${HSD_BORDER_LIGHT}` }}>
          <div className="flex justify-between items-center">
            <span className="text-base font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              Gesamt
            </span>
            <span className="text-xl font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_RED }}>
              210 CP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Angebot Detail Page ──────────────────────────────────────────────────────
function AngebotDetailPage({ angebot, setPage, onApply }: { angebot: ModulAngebot; setPage: (p: Page) => void; onApply: () => void }) {
  const statusColors = {
    "Open": { bg: "#D4EDDA", text: "#155724" },
    "Few spots left": { bg: "#FFF3CD", text: "#856404" },
    "Closed": { bg: "#F8D7DA", text: "#842029" }
  };

  const statusCfg = statusColors[angebot.status];

  return (
    <div>
      {/* Back button */}
      <div className="mb-3">
        <button
          onClick={() => setPage("modulwahl")}
          className="text-sm hover:underline"
          style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_LINK }}
        >
          ← Zurück zur Modulwahl
        </button>
      </div>

      {/* Header Card */}
      <div
        className="bg-white rounded-lg p-6 mb-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 4px rgba(0,0,0,0.08)" }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-semibold px-2 py-1 rounded"
                style={{ backgroundColor: "#e0f4f8", color: HSD_TEAL }}
              >
                {angebot.modulTyp}
              </span>
              <span
                className="text-xs font-semibold px-2 py-1 rounded"
                style={{ backgroundColor: statusCfg.bg, color: statusCfg.text }}
              >
                {angebot.status === "Open" ? "Offen" : angebot.status === "Few spots left" ? "Wenige Plätze frei" : "Geschlossen"}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.titel}
            </h1>
            <p className="text-sm mb-3" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              {angebot.semester}
            </p>
          </div>
          <button
            onClick={onApply}
            className="px-6 py-3 rounded-lg text-sm font-bold transition-colors hover:opacity-90"
            style={{
              backgroundColor: HSD_BLUE,
              color: "white",
              fontFamily: "'Segoe UI', sans-serif",
              minWidth: "140px"
            }}
          >
            Jetzt bewerben
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4" style={{ borderTop: `1px solid ${HSD_BORDER_LIGHT}` }}>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Lehrende
            </p>
            <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.professoren.join(", ")}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Verfügbare Plätze
            </p>
            <p className="text-sm font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.platze} Plätze
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Bewerbungsfrist
            </p>
            <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.deadline}
            </p>
          </div>
        </div>
      </div>

      {/* Kurzbeschreibung */}
      <div
        className="bg-white rounded-lg p-5 mb-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
          Kurzbeschreibung
        </h2>
        <p className="text-sm leading-relaxed" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
          {angebot.detailBeschreibung}
        </p>
      </div>

      {/* Inhalte & Ziele */}
      <div
        className="bg-white rounded-lg p-5 mb-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
          Inhalte & Ziele
        </h2>
        <ul className="space-y-2">
          {angebot.inhalteZiele.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              <span style={{ color: HSD_BLUE }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Voraussetzungen */}
      <div
        className="bg-white rounded-lg p-5 mb-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
          Voraussetzungen
        </h2>
        <p className="text-sm leading-relaxed" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
          {angebot.anforderungen}
        </p>
      </div>

      {/* Organisation */}
      <div
        className="bg-white rounded-lg p-5 mb-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
          Organisation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Rhythmus
            </p>
            <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.organisation.rhythm}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Workload
            </p>
            <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.organisation.workload}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Projekttyp
            </p>
            <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.organisation.projectType}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Sprache
            </p>
            <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.organisation.language}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Format
            </p>
            <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.organisation.format}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Verfügbarkeit
            </p>
            <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.organisation.availability}
            </p>
          </div>
        </div>
      </div>

      {/* Anwesenheitspflicht - only for Medienprojekt A/B */}
      {angebot.anwesenheitspflicht && (
        <div
          className="bg-white rounded-lg p-5 mb-5"
          style={{ border: `2px solid ${HSD_BLUE}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)", backgroundColor: "#f0faff" }}
        >
          <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
            Anwesenheitspflicht
          </h2>
          <p className="text-sm leading-relaxed" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
            {angebot.anwesenheitspflicht.description}
          </p>
        </div>
      )}

      {/* Bewerbungsprozess - for motivation letter requirement */}
      {angebot.bewerbungsinfo.motivationLetter && (
        <div
          className="bg-white rounded-lg p-5 mb-5"
          style={{ border: `2px solid ${HSD_RED}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)", backgroundColor: "#fff5f5" }}
        >
          <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
            Bewerbungsprozess
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
            <strong>Für dieses Medienprojekt ist ein Motivationsschreiben erforderlich.</strong>
          </p>
          <p className="text-sm leading-relaxed" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            Bitte erklären Sie in Ihrer Bewerbung:
          </p>
          <ul className="mt-2 space-y-1 ml-4">
            <li className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              • Warum Sie an diesem Projekt teilnehmen möchten
            </li>
            <li className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              • Relevante Erfahrungen oder Interessen
            </li>
            <li className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              • Ihre Erwartungen und Ziele für das Projekt
            </li>
          </ul>
        </div>
      )}

      {/* Bewerbungsinformationen */}
      <div
        className="bg-white rounded-lg p-5 mb-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
          Bewerbungsinformationen
        </h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Bewerbungstyp
            </p>
            <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.bewerbungsinfo.type}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Motivationsschreiben
            </p>
            <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.bewerbungsinfo.motivationLetter ? "Erforderlich" : "Nicht erforderlich"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Auswahlverfahren
            </p>
            <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.bewerbungsinfo.selectionProcess}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Mehrfachbewerbungen
            </p>
            <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.bewerbungsinfo.multipleApplications ? "Erlaubt" : "Nicht erlaubt"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Wiederverwendung in Folgesemestern
            </p>
            <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              {angebot.bewerbungsinfo.reusable ? "Möglich" : "Nicht möglich"}
            </p>
          </div>
        </div>
      </div>

      {/* Lehrende */}
      <div
        className="bg-white rounded-lg p-5 mb-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
          Lehrende
        </h2>
        <div className="space-y-3">
          {angebot.professoren.map((prof, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: HSD_BLUE, fontSize: "14px" }}
              >
                {prof.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                  {prof}
                </p>
                <p className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                  Fachbereich Medien
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-center pt-4 pb-6">
        <button
          onClick={onApply}
          className="px-8 py-3 rounded-lg text-sm font-bold transition-colors hover:opacity-90"
          style={{
            backgroundColor: HSD_BLUE,
            color: "white",
            fontFamily: "'Segoe UI', sans-serif"
          }}
        >
          Jetzt bewerben
        </button>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const [selectedAngebot, setSelectedAngebot] = useState<ModulAngebot | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [motivationText, setMotivationText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ModulCategory | null>(null);

  const navigateWithScroll = useCallback((targetPage: Page, targetSection?: string) => {
    setPage(targetPage);
    if (targetSection) {
      setScrollTarget(targetSection);
    }
  }, []);

  const handleSelectAngebot = useCallback((angebot: ModulAngebot) => {
    setSelectedAngebot(angebot);
    setPage("angebotDetail");
  }, []);

  const handleSelectCategory = useCallback((category: ModulCategory) => {
    setSelectedCategory(category);
    setPage("modulwahl");
  }, []);

  const handleApplyFromDetail = useCallback(() => {
    setMotivationText("");
    setShowApplicationModal(true);
  }, []);

  const handleApply = useCallback(() => {
    if (selectedAngebot) {
      // Application logic here - this would normally add to applications list
      setShowApplicationModal(false);
      setMotivationText("");
      alert(`Bewerbung für "${selectedAngebot.titel}" wurde erfolgreich eingereicht.`);
    }
  }, [selectedAngebot]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-full" style={{ backgroundColor: "#f4f6f8", fontFamily: "'Segoe UI', sans-serif" }}>
        <NavBar page={page} setPage={setPage} />

        <main
          className="mx-auto px-6 py-6"
          style={{ maxWidth: page === "modulwahl" ? "1400px" : "1200px", paddingTop: "calc(61px + 24px)" }}
        >
          {page === "home" && <HomePage setPage={setPage} />}
          {page === "bewerbungen" && <BewerbungenPage setPage={setPage} scrollTarget={scrollTarget} clearScrollTarget={() => setScrollTarget(null)} onSelectCategory={handleSelectCategory} />}
          {page === "stundenplan" && <StundenplanPage setPage={setPage} />}
          {page === "kurse" && <MeineKursePage setPage={setPage} />}
          {page === "modulwahl" && <ModulwahlPage onSelectAngebot={handleSelectAngebot} setPage={setPage} navigateWithScroll={navigateWithScroll} selectedCategory={selectedCategory} />}
          {page === "bmi2018" && <BMI2018Page setPage={setPage} />}
          {page === "studienverlaufsplan" && <StudienverlaufsplanPage setPage={setPage} navigateWithScroll={navigateWithScroll} />}
          {page === "angebotDetail" && selectedAngebot && <AngebotDetailPage angebot={selectedAngebot} setPage={setPage} onApply={handleApplyFromDetail} />}
        </main>

           {showApplicationModal && selectedAngebot && (
          <ApplicationModal
            angebot={selectedAngebot}
            motivationText={motivationText}
            onMotivationTextChange={setMotivationText}
            onCancel={() => {
              setShowApplicationModal(false);
              setMotivationText("");
            }}
            onSubmit={handleApply}
          />
        )}
      </div>
    </DndProvider>
  );
}