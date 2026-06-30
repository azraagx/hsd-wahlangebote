import { useEffect, useState, useCallback } from "react";
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
import { useSearchParams } from "react-router";
import { BackButton } from "@/features/student-portal/components/BackButton";
import { useApplications } from "@/features/student-portal/state/ApplicationContext";
// ─── App ──────────────────────────────────────────────────────────────────────
// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const { addApplication } = useApplications();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = (searchParams.get("view") as Page | null) ?? "home";

  const setPage = useCallback(
    (nextPage: Page) => {
      if(nextPage === page){
        return;
      }
      const nextParams = new URLSearchParams(searchParams);

      if (nextPage === "home") {
        nextParams.delete("view");
      } else {
        nextParams.set("view", nextPage);
      }

      setSearchParams(nextParams);
    },
    [page, searchParams, setSearchParams],
  );
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const [selectedAngebot, setSelectedAngebot] = useState<ModulAngebot | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [motivationText, setMotivationText] = useState("");
  const selectedCategory =
  (searchParams.get("category") as ModulCategory | null) ?? null;
  const navigateWithScroll = useCallback((targetPage: Page, targetSection?: string) => {
    setPage(targetPage);
    if (targetSection) {
      setScrollTarget(targetSection);
    }
  }, [setPage]);
  useEffect(() => {
  if (page === "modulwahl" && !selectedCategory) {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set("view", "modulwahlUebersicht");
    nextParams.delete("category");

    setSearchParams(nextParams, { replace: true });
  }
}, [page, selectedCategory, searchParams, setSearchParams]);
useEffect(() => {
  if (page === "angebotDetail" && !selectedAngebot) {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set(
      "view",
      selectedCategory ? "modulwahl" : "modulwahlUebersicht"
    );

    setSearchParams(nextParams, { replace: true });
  }
}, [
  page,
  selectedAngebot,
  selectedCategory,
  searchParams,
  setSearchParams,
]);
  const handleSelectAngebot = useCallback((angebot: ModulAngebot) => {
    setSelectedAngebot(angebot);
    setPage("angebotDetail");
  }, [setPage]);

  const handleSelectCategory = useCallback(
  (category: ModulCategory) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set("view", "modulwahl");
    nextParams.set("category", category);

    setSearchParams(nextParams);
  },
  [searchParams, setSearchParams],
);
  const handleApplyFromDetail = useCallback(() => {
    setMotivationText("");
    setShowApplicationModal(true);
  }, []);

  const handleApply = useCallback(() => {
    if (!selectedAngebot || !selectedCategory) {
      return;
      }
    const wasAdded = addApplication({
    angebot: selectedAngebot,
    kategorie: selectedCategory,
    motivationText,
  });

  if (!wasAdded) {
    alert("Sie haben sich bereits für dieses Angebot beworben.");
    return;
  }

  setShowApplicationModal(false);
  setMotivationText("");
  setPage("modulwahl");

  alert(
    `Die Bewerbung für "${selectedAngebot.titel}" wurde zur Prioritätenliste hinzugefügt.`,
  );
}, [
  selectedAngebot,
  selectedCategory,
  motivationText,
  addApplication,
  setPage,
]);  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-full" style={{ backgroundColor: "#f4f6f8", fontFamily: "'Segoe UI', sans-serif" }}>
        <NavBar page={page} setPage={setPage} />

        <main
          className="mx-auto px-6 py-6"
          style={{ maxWidth: page === "modulwahl" ? "1400px" : "1200px", paddingTop: "calc(61px + 24px)" }}
        >
          {page !== "home" && <BackButton />}
          {page === "home" && <HomePage setPage={setPage} />}
          {page === "modulwahlUebersicht" && (<ModulwahlUebersichtPage setPage={setPage} onSelectCategory={handleSelectCategory}/>)}
{page === "bewerbungen" && (
  <BewerbungenPage setPage={setPage} />
)}          {page === "stundenplan" && <StundenplanPage setPage={setPage} />}
          {page === "kurse" && <MeineKursePage setPage={setPage} />}
{page === "modulwahl" && selectedCategory && (
  <ModulwahlPage
    onSelectAngebot={handleSelectAngebot}
    setPage={setPage}
    navigateWithScroll={navigateWithScroll}
    selectedCategory={selectedCategory}
  />
)}
          {page === "bmi2018" && <BMI2018Page setPage={setPage} />}
          {page === "studienverlaufsplan" && <StudienverlaufsplanPage setPage={setPage} navigateWithScroll={navigateWithScroll} />}
          {page === "angebotDetail" && selectedAngebot && <AngebotDetailPage angebot={selectedAngebot} setPage={setPage} onApply={handleApplyFromDetail} />}
        </main>

           {showApplicationModal && selectedAngebot && (
          <ApplicationModal
            angebot={selectedAngebot}
            selectedCategory={selectedCategory}
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