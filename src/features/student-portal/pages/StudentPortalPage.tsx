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
import { BMI2018Page } from "@/features/student-portal/pages/BMI2018Page";
import { StudienverlaufsplanPage } from "@/features/student-portal/pages/StudienverlaufsplanPage";
import { AngebotDetailPage } from "@/features/student-portal/pages/AngebotDetailPage";
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


// ─── Studienverlaufsplan Page ─────────────────────────────────────────────────



// ─── Angebot Detail Page ──────────────────────────────────────────────────────

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