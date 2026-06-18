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
function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const studyPrograms = [
    {
      id: "bsc-mi",
      title: "B. Sc. Medieninformatik",
      description: "Informatik trifft auf kreative Mediengestaltung. Entwickeln Sie innovative digitale Lösungen.",
      image: imgCourse,
      buttons: [
        { label: "PO 2018", action: () => setPage("studienverlaufsplan") },
        { label: "PO 2025", action: () => setPage("bmi2018") }
      ]
    },
    {
      id: "beng-mt",
      title: "B. Eng. Medientechnik",
      description: "Technik und Medien vereint. Von der Audiotechnik bis zur Videoproduktion.",
      color: "#E17055",
      buttons: [
        { label: "PO 2018", action: () => { } },
        { label: "PO 2025", action: () => { } }
      ]
    },
    {
      id: "msc-mi",
      title: "M. Sc. Medieninformatik",
      description: "Vertiefen Sie Ihr Wissen in Human-Computer Interaction, Data Science oder Software Engineering.",
      color: "#6C5CE7",
      buttons: [
        { label: "PO 2018", action: () => { } },
        { label: "PO 2025", action: () => { } }
      ]
    },
    {
      id: "wahlangebote",
      title: "Wahlangebote",
      description: "Studiengangsübergreifende Wahlmodule und Vertiefungen für alle Studierenden.",
      color: "#00B894",
      buttons: [
        { label: "Zu den Angeboten", action: () => setPage("modulwahl") }
      ]
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl mb-2" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
          Fachbereich Medien
        </h1>
        <p className="text-base" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
          Hochschule Düsseldorf · University of Applied Sciences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studyPrograms.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-lg overflow-hidden flex flex-col"
            style={{
              border: `2px solid ${HSD_BORDER_LIGHT}`,
              boxShadow: "0 2px 4px rgba(0,0,0,0.08)"
            }}
          >
            {/* Header/Image */}
            <div
              className="h-48 flex items-center justify-center"
              style={program.image
                ? { backgroundImage: `url(${program.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                : { backgroundColor: program.color || HSD_BLUE }
              }
            >
              {!program.image && (
                <span className="text-white text-3xl font-bold opacity-70">
                  {program.title.substring(0, 3)}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                {program.title}
              </h2>
              <p className="text-sm leading-relaxed mb-6 flex-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                {program.description}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                {program.buttons.map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={btn.action}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:opacity-90"
                    style={{
                      backgroundColor: idx === 0 ? HSD_RED : HSD_BLUE,
                      color: "white",
                      fontFamily: "'Segoe UI', sans-serif"
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Modulwahl Page Components ────────────────────────────────────────────────


function ModulwahlPage({ onSelectAngebot, setPage, navigateWithScroll, selectedCategory }: { onSelectAngebot?: (angebot: ModulAngebot) => void; setPage?: (p: Page) => void; navigateWithScroll?: (page: Page, section?: string) => void; selectedCategory?: ModulCategory | null }) {
  const [selectedAngebot, setSelectedAngebot] = useState<ModulAngebot | null>(null);
  const [applications, setApplications] = useState<StudentApplication[]>([
    { id: 1, angebotId: 999, titel: "Interaktive Systeme", kategorie: "Vertiefung A", status: "pending", prioritat: 1 },
    { id: 2, angebotId: 998, titel: "Mobile Anwendungen", kategorie: "TRADY, MDPR", status: "accepted", prioritat: 2 }
  ]);

  // Filter angebote based on selected category
  const filteredAngebote = selectedCategory
    ? modulAngebote.filter(a => a.modulCategory === selectedCategory)
    : modulAngebote;

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setApplications((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, removed);
      return updated.map((app, idx) => ({ ...app, prioritat: idx + 1 }));
    });
  }, []);

  const handleApply = (angebot: ModulAngebot) => {
    const exists = applications.find(a => a.angebotId === angebot.id);
    if (exists) {
      alert("Sie haben sich bereits für dieses Angebot beworben.");
      return;
    }

    const newApp: StudentApplication = {
      id: Date.now(),
      angebotId: angebot.id,
      titel: angebot.titel,
      kategorie: angebot.kategorie,
      status: "pending",
      prioritat: applications.length + 1
    };

    setApplications([...applications, newApp]);
    setSelectedAngebot(null);
  };

  const handleRemove = (id: number) => {
    setApplications(prev => prev.filter(a => a.id !== id).map((app, idx) => ({ ...app, prioritat: idx + 1 })));
  };

  return (
    <div>
      {/* Back button */}
      <div className="mb-3">
        <button
          onClick={() => navigateWithScroll ? navigateWithScroll("bewerbungen", "modulwahl-section") : setPage("bewerbungen")}
          className="text-sm hover:underline"
          style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_LINK }}
        >
          ← Zurück zu Meine Bewerbungen
        </button>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
          {selectedCategory || "MEDIENPROJEKT Δ"}
        </h1>
        <div className="flex items-center gap-2 text-sm" style={{ color: HSD_GRAY, fontFamily: "'Segoe UI', sans-serif" }}>
          <a href="#" style={{ color: HSD_LINK }} onClick={(e) => e.preventDefault()}>Kurs</a>
          <span>›</span>
          <span>Externer Tool</span>
        </div>
      </div>

      {/* Info Banner */}
      <div
        className="bg-white rounded-lg p-5 mb-6"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <h2 className="text-base font-bold mb-3" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
          Meine Bewerbungen für ein Wahl-Angebot zu diesem Wahlpflicht-Modul
        </h2>
        <p className="text-sm mb-4 leading-relaxed" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
          Mehr Infos finden Sie auf der <a href="#" style={{ color: HSD_LINK }} onClick={(e) => e.preventDefault()}>Fachbereichs-Webseite für Wahlmodule</a>,
          dort finden Sie auch rechts oben eine ausführliche Anleitung.
        </p>

        {/* Timeline */}
        <div className="bg-gray-50 rounded-lg p-4" style={{ border: `1px solid ${HSD_BORDER_LIGHT}` }}>
          <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
            📅 Termine
          </h3>
          <div className="space-y-2 text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            <div className="flex justify-between">
              <span>Ende Bewerbung:</span>
              <span className="font-semibold" style={{ color: HSD_DARK }}>08.04.2026 08:00</span>
            </div>
            <div className="flex justify-between">
              <span>Runde 1:</span>
              <span className="font-semibold" style={{ color: HSD_DARK }}>09.04.2026 14:00</span>
            </div>
            <div className="flex justify-between">
              <span>Runde 2-5:</span>
              <span className="font-semibold" style={{ color: HSD_DARK }}>09.04 - 10.04.2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column split-screen layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* LEFT: Angebote */}
        <div>
          <div
            className="bg-white rounded-lg p-5"
            style={{
              border: `2px solid ${HSD_BORDER_LIGHT}`,
              boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
              minHeight: "600px"
            }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: `2px solid ${HSD_BORDER_LIGHT}` }}>
              <span className="text-xl">📚</span>
              <h2 className="text-lg font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                Angebote
              </h2>
            </div>
            <div className="space-y-3 overflow-y-auto" style={{ maxHeight: "520px" }}>
              {filteredAngebote.map((angebot) => (
                <div
                  key={angebot.id}
                  className="rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: "#f0faff",
                    border: `2px solid ${HSD_BLUE}`,
                    borderLeft: `6px solid ${HSD_BLUE}`
                  }}
                  onClick={() => onSelectAngebot ? onSelectAngebot(angebot) : setSelectedAngebot(angebot)}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold flex-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_LINK }}>
                      {angebot.titel.substring(0, 70)}...
                    </h3>
                    <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: HSD_TEAL, color: "white" }}>
                      {angebot.platze} Plätze
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                    👤 {angebot.professoren.join(", ")}
                  </p>
                  <p className="text-xs mb-3 leading-relaxed" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                    {angebot.beschreibung}
                  </p>
                  <div className="flex items-center justify-between pt-2" style={{ borderTop: `1px solid ${HSD_BORDER_LIGHT}` }}>
                    <span className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                      {angebot.kategorie}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: HSD_LINK }}>
                      Details ansehen →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Meine Bewerbungen */}
        <div>
          <div
            className="bg-white rounded-lg p-5 flex flex-col"
            style={{
              border: `2px solid ${HSD_BORDER_LIGHT}`,
              boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
              minHeight: "600px"
            }}
          >
            <div className="mb-4 pb-3" style={{ borderBottom: `2px solid ${HSD_BORDER_LIGHT}` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">📋</span>
                <h2 className="text-lg font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                  Ihre Bewerbungen
                </h2>
              </div>
              <p className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                Sortieren Sie Ihre Bewerbungen nach Priorität (Drag & Drop) · Oben = Höchste Priorität
              </p>
            </div>

            <div className="flex-1 overflow-y-auto mb-4" style={{ maxHeight: "420px" }}>
              {applications.length === 0 ? (
                <div className="text-center py-8 rounded-lg" style={{ backgroundColor: "#f8f9fa", border: `1px dashed ${HSD_BORDER_LIGHT}` }}>
                  <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                    Sie haben noch keine Bewerbungen abgegeben.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app, index) => (
                    <DraggableApplicationCard
                      key={app.id}
                      app={app}
                      index={index}
                      moveCard={moveCard}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4" style={{ borderTop: `2px solid ${HSD_BORDER_LIGHT}` }}>
              <button
                className="w-full py-3 rounded-lg text-sm font-bold transition-colors hover:opacity-90"
                style={{
                  backgroundColor: HSD_RED,
                  color: "white",
                  fontFamily: "'Segoe UI', sans-serif"
                }}
              >
                💾 Änderungen speichern
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedAngebot && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100 }}
          onClick={() => setSelectedAngebot(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                  {selectedAngebot.titel}
                </h2>
                <button
                  onClick={() => setSelectedAngebot(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold mb-2" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                  Professoren:
                </p>
                <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                  {selectedAngebot.professoren.join(", ")}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold mb-2" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                  Kategorie:
                </p>
                <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                  {selectedAngebot.kategorie}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold mb-2" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                  Beschreibung:
                </p>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                  {selectedAngebot.detailBeschreibung}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold mb-2" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                  Anforderungen:
                </p>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                  {selectedAngebot.anforderungen}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleApply(selectedAngebot)}
                  className="flex-1 py-3 rounded-lg text-sm font-bold transition-colors"
                  style={{
                    backgroundColor: HSD_BLUE,
                    color: "white",
                    fontFamily: "'Segoe UI', sans-serif"
                  }}
                >
                  Jetzt bewerben
                </button>
                <button
                  onClick={() => setSelectedAngebot(null)}
                  className="flex-1 py-3 rounded-lg text-sm font-bold transition-colors"
                  style={{
                    backgroundColor: "white",
                    color: HSD_GRAY,
                    border: `1px solid ${HSD_BORDER_LIGHT}`,
                    fontFamily: "'Segoe UI', sans-serif"
                  }}
                >
                  Schließen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mein Bereich – Sub Nav ───────────────────────────────────────────────────


// ─── Bewerbungen Page ─────────────────────────────────────────────────────────
function BewerbungenPage({ setPage, scrollTarget, clearScrollTarget, onSelectCategory }: { setPage: (p: Page) => void; scrollTarget: string | null; clearScrollTarget: () => void; onSelectCategory?: (category: ModulCategory) => void }) {
  const [categoryFilter, setCategoryFilter] = useState<string>("Alle");
  const [semester, setSemester] = useState(4);
  const courses = coursesBySemester[semester] ?? [];

  const filteredBewerbungen = categoryFilter === "Alle"
    ? bewerbungen
    : bewerbungen.filter(b => b.typ === categoryFilter || b.modul.includes(categoryFilter));

  useEffect(() => {
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          clearScrollTarget();
        }, 100);
      }
    }
  }, [scrollTarget, clearScrollTarget]);

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl mb-1" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
            Mein Bereich
          </h1>
          <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            Meine Bewerbungen · Sommersemester 2026
          </p>
        </div>
        <div className="sm:text-right sm:pt-1">
          <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            Mein Studium: BMI 2018
          </p>
        </div>
      </div>

      <MeinBereichSubNav page="bewerbungen" setPage={setPage} />

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        {[
          { label: "Gesamt", value: bewerbungen.length, color: HSD_BLUE, bg: "#e0f4f8" },
          { label: "Angenommen", value: bewerbungen.filter(b => b.status === "angenommen").length, color: "#155724", bg: "#D4EDDA" },
          { label: "In Bearbeitung", value: bewerbungen.filter(b => b.status === "in_bearbeitung").length, color: "#856404", bg: "#FFF3CD" },
          { label: "Abgelehnt", value: bewerbungen.filter(b => b.status === "abgelehnt").length, color: "#842029", bg: "#F8D7DA" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg p-4"
            style={{ backgroundColor: stat.bg, border: `1px solid ${HSD_BORDER}` }}
          >
            <p className="text-2xl font-bold" style={{ color: stat.color, fontFamily: "'Segoe UI', sans-serif" }}>
              {stat.value}
            </p>
            <p className="text-xs mt-0.5" style={{ color: HSD_GRAY, fontFamily: "'Segoe UI', sans-serif" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Category filters */}
      <div className="mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            Filtern nach:
          </span>
          {["Alle", "Vertiefung A", "Vertiefung B", "Medienprojekt A", "Medienprojekt B", "Wahlmodul"].map((filter) => (
            <button
              key={filter}
              onClick={() => setCategoryFilter(filter)}
              className="px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={{
                fontFamily: "'Segoe UI', sans-serif",
                backgroundColor: categoryFilter === filter ? HSD_BLUE : "transparent",
                color: categoryFilter === filter ? "white" : HSD_GRAY,
                border: `1.5px solid ${categoryFilter === filter ? HSD_BLUE : HSD_BORDER_LIGHT}`,
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Applications table – desktop */}
      <div
        className="bg-white rounded-lg overflow-hidden hidden sm:block"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: HSD_BORDER_LIGHT }}>
          <h2 className="text-lg font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
            Meine Bewerbungen
          </h2>
          <span className="text-sm" style={{ color: HSD_GRAY, fontFamily: "'Segoe UI', sans-serif" }}>
            {filteredBewerbungen.length} Einträge
          </span>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              {["Modul / Vertiefung", "Typ", "Bewerbungsdatum", "Status"].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY, borderBottom: `1px solid ${HSD_BORDER_LIGHT}` }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBewerbungen.map((b, i) => (
              <tr
                key={b.id}
                className="hover:bg-gray-50 transition-colors"
                style={{ borderBottom: i < filteredBewerbungen.length - 1 ? `1px solid ${HSD_BORDER_LIGHT}` : "none" }}
              >
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                    {b.name}
                  </p>
                  <p className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                    {b.modul}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: b.typ === "Vertiefung" ? "#e0f4f8" : "#f0f0f8",
                      color: b.typ === "Vertiefung" ? HSD_TEAL : "#5a5a9a",
                    }}
                  >
                    {b.typ}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                    {b.datum}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={b.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Applications cards – mobile */}
      <div className="sm:hidden space-y-3">
        {filteredBewerbungen.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-lg p-4"
            style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <p className="text-sm font-semibold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                  {b.name}
                </p>
                <p className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                  {b.modul} · {b.typ}
                </p>
              </div>
              <StatusBadge status={b.status} />
            </div>
            <p className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              Beworben am {b.datum}
            </p>
          </div>
        ))}
      </div>

      {/* Modulwahl section */}
      <div
        id="modulwahl-section"
        className="bg-white rounded-lg p-5 mt-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h2 className="text-lg font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>Modulwahl</h2>
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
                onNavigate={course.isPlaceholder && course.category && onSelectCategory
                  ? () => onSelectCategory(course.category as ModulCategory)
                  : undefined
                }
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

// ─── Stundenplan Page ─────────────────────────────────────────────────────────
function StundenplanPage({ setPage }: { setPage: (p: Page) => void }) {
  const SLOT_H = 64;

  return (
    <div>
      {/* Back button */}
      <div className="mb-3">
        <button
          onClick={() => setPage("bewerbungen")}
          className="text-sm hover:underline"
          style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_LINK }}
        >
          ← Zurück zu Meine Bewerbungen
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl mb-1" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
          Mein Bereich
        </h1>
        <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
          Mein Bereich · Sommersemester 2026
        </p>
      </div>

      <MeinBereichSubNav page="stundenplan" setPage={setPage} />

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        {[
          { label: "Vorlesung", color: "#6C5CE7" },
          { label: "Übung / Lab", color: "#D63031" },
          { label: "Vertiefung", color: "#E17055" },
          { label: "Seminar / Projekt", color: "#FDCB6E" },
          { label: "Pflichtmodul", color: "#0984E3" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: l.color }} />
            <span className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
              {l.label}
            </span>
          </div>
        ))}
      </div>

      <div
        className="bg-white rounded-lg overflow-hidden"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <div className="p-4 border-b" style={{ borderColor: HSD_BORDER_LIGHT }}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
              Stundenplan – SoSe 2026
            </h2>
            <span className="text-xs px-2 py-1 rounded" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY, backgroundColor: "#f8f9fa", border: `1px solid ${HSD_BORDER_LIGHT}` }}>
              📅 HSD Planer
            </span>
          </div>
          <p className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            KW 18 · 28.04. – 02.05.2026
          </p>
        </div>

        <div className="overflow-x-auto">
          <div style={{ minWidth: "640px" }}>
            <div className="flex" style={{ borderBottom: `1px solid ${HSD_BORDER_LIGHT}` }}>
              <div className="flex-shrink-0 w-16" />
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="flex-1 text-center py-2.5 text-sm font-semibold"
                  style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK, borderLeft: `1px solid ${HSD_BORDER_LIGHT}` }}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="flex relative">
              <div className="flex-shrink-0 w-16">
                {TIME_SLOTS.map((time) => (
                  <div
                    key={time}
                    className="flex items-start justify-center text-xs pt-1"
                    style={{
                      height: `${SLOT_H}px`,
                      fontFamily: "'Segoe UI', sans-serif",
                      color: HSD_GRAY,
                      borderBottom: `1px solid ${HSD_BORDER_LIGHT}`,
                    }}
                  >
                    {time}
                  </div>
                ))}
              </div>

              {DAYS.map((day, dayIdx) => (
                <div
                  key={day}
                  className="flex-1 relative"
                  style={{ borderLeft: `1px solid ${HSD_BORDER_LIGHT}` }}
                >
                  {TIME_SLOTS.map((_, slotIdx) => (
                    <div
                      key={slotIdx}
                      style={{
                        height: `${SLOT_H}px`,
                        borderBottom: `1px solid ${HSD_BORDER_LIGHT}`,
                        backgroundColor: slotIdx % 2 === 0 ? "transparent" : "rgba(0,0,0,0.01)",
                      }}
                    />
                  ))}

                  {schedule
                    .filter((e) => e.day === dayIdx)
                    .map((entry, i) => (
                      <div
                        key={i}
                        className="absolute left-0.5 right-0.5 rounded-md px-2 py-1.5 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        style={{
                          top: `${entry.startSlot * SLOT_H + 2}px`,
                          height: `${entry.duration * SLOT_H - 4}px`,
                          backgroundColor: entry.color,
                          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                        }}
                      >
                        <p
                          className="text-xs font-semibold leading-tight text-white truncate"
                          style={{ fontFamily: "'Segoe UI', sans-serif" }}
                        >
                          {entry.title}
                        </p>
                        <p
                          className="text-xs leading-tight mt-0.5"
                          style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Segoe UI', sans-serif" }}
                        >
                          {TIME_SLOTS[entry.startSlot]} – {TIME_SLOTS[entry.startSlot + entry.duration] ?? "19:30"}
                        </p>
                        <p
                          className="text-xs leading-tight mt-0.5"
                          style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Segoe UI', sans-serif" }}
                        >
                          📍 {entry.room}
                        </p>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Meine Kurse Page ─────────────────────────────────────────────────────────
function MeineKursePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div>
      {/* Back button */}
      <div className="mb-3">
        <button
          onClick={() => setPage("bewerbungen")}
          className="text-sm hover:underline"
          style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_LINK }}
        >
          ← Zurück zu Meine Bewerbungen
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl mb-1" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
          Mein Bereich
        </h1>
        <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
          Mein Bereich · Sommersemester 2026
        </p>
      </div>

      <MeinBereichSubNav page="kurse" setPage={setPage} />

      <div
        className="bg-white rounded-lg p-5"
        style={{ border: `1px solid ${HSD_BORDER}`, boxShadow: "0 2px 2px rgba(0,0,0,0.06)" }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>Meine Kurse</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {assignedCourses.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow"
              style={{ border: `1px solid ${HSD_BORDER}` }}
            >
              <div
                className="h-[90px] flex items-center justify-center"
                style={item.img ? { backgroundImage: `url(${item.img})`, backgroundSize: "cover", backgroundPosition: "top left" } : { backgroundColor: item.color }}
              />
              <div className="p-3">
                <a href="#" className="text-sm font-medium leading-snug block mb-0.5" style={{ color: HSD_LINK, fontFamily: "'Segoe UI', sans-serif" }} onClick={(e) => e.preventDefault()}>
                  {item.title}
                </a>
                <p className="text-xs truncate" style={{ color: HSD_GRAY, fontFamily: "'Segoe UI', sans-serif" }}>
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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