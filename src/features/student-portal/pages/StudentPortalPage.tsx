import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ModulwahlUebersichtPage } from "@/features/student-portal/pages/ModulwahlUebersichtPage";
import type {
  Page,
  ModulCategory,
  ModulAngebot,
} from "@/features/student-portal/types";

import { NavBar } from "@/features/student-portal/components/NavBar";
import { ApplicationModal } from "@/features/student-portal/components/ApplicationModal";

import { HomePage } from "@/features/student-portal/pages/HomePage";
import { BewerbungenPage } from "@/features/student-portal/pages/BewerbungenPage";
import { StundenplanPage } from "@/features/student-portal/pages/StundenplanPage";
import { MeineKursePage } from "@/features/student-portal/pages/MeineKursePage";
import { ModulwahlPage } from "@/features/student-portal/pages/ModulwahlPage";
import { BMI2018Page } from "@/features/student-portal/pages/BMI2018Page";
import { StudienverlaufsplanPage } from "@/features/student-portal/pages/StudienverlaufsplanPage";
import { AngebotDetailPage } from "@/features/student-portal/pages/AngebotDetailPage";

// ─── App ──────────────────────────────────────────────────────────────────────
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
          {page === "modulwahlUebersicht" && (<ModulwahlUebersichtPage setPage={setPage} onSelectCategory={handleSelectCategory}/>)}
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