import { useState } from "react";
import type { ModulAngebot, ModulCategory, Page } from "@/features/student-portal/types";
import { DraggableApplicationCard } from "@/features/student-portal/components/DraggableApplicationCard";
import { studentPortalService } from "@/features/student-portal/services/studentPortalService";
import {
  HSD_BLUE,
  HSD_BORDER,
  HSD_BORDER_LIGHT,
  HSD_DARK,
  HSD_GRAY,
  HSD_LINK,
  HSD_RED,
  HSD_TEAL,
} from "@/features/student-portal/styles/tokens";
import { ElectionProcessInfo } from "@/features/student-portal/components/ElectionProcessInfo";
import { useApplications } from "@/features/student-portal/state/ApplicationContext";

export function ModulwahlPage({ onSelectAngebot, setPage, navigateWithScroll, selectedCategory }: { onSelectAngebot?: (angebot: ModulAngebot) => void; setPage?: (p: Page) => void; navigateWithScroll?: (page: Page, section?: string) => void; selectedCategory?: ModulCategory | null }) {
  const [selectedAngebot, setSelectedAngebot] = useState<ModulAngebot | null>(null);
  const {
  applications,
  addApplication,
  removeApplication,
  moveApplication,
  saveApplications,
  hasUnsavedChanges,
} = useApplications();

  const filteredAngebote = studentPortalService.getModuleOffers(selectedCategory);

  const currentApplications = selectedCategory
  ? applications.filter(
      (application) => application.kategorie === selectedCategory
    )
  : [];

const moveCurrentApplication = (
  fromIndex: number,
  toIndex: number
) => {
  const fromApplication = currentApplications[fromIndex];
  const toApplication = currentApplications[toIndex];

  if (!fromApplication || !toApplication) {
    return;
  }

  const globalFromIndex = applications.findIndex(
    (application) => application.id === fromApplication.id
  );

  const globalToIndex = applications.findIndex(
    (application) => application.id === toApplication.id
  );

  moveApplication(globalFromIndex, globalToIndex);
};

  const handleApply = (angebot: ModulAngebot) => {
    if (!selectedCategory) {
    setPage?.("modulwahlUebersicht");
     return;
    }
  const wasAdded = addApplication({
    angebot,
    kategorie: selectedCategory,
  });
  if(!wasAdded){
    alert("Sie haben sich bereits für dieses Angebot beworben");
    return;
  }
  setSelectedAngebot(null);
};

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
          {selectedCategory }
        </h1>
        <div className="flex items-center gap-2 text-sm" style={{ color: HSD_GRAY, fontFamily: "'Segoe UI', sans-serif" }}>
          <a href="#" style={{ color: HSD_LINK }} onClick={(e) => e.preventDefault()}>Kurs</a>
          <span>›</span>
          <span>Externer Tool</span>
        </div>
      </div>

      {/* Info Banner */}
      <ElectionProcessInfo
        applicationDeadline="Beginn der Bewerbungen: 30.03.2026 13:00 Uhr 
                             Ende der Bewerbungen: 8.04.2026 08:00 Uhr"
        rounds={[
          {label: "Runde 1", deadline: "08.04.2026, 14:00 Uhr"},
          { label: "Runde 2", deadline: "09.04.2026, 08:00 Uhr" },
          { label: "Runde 3", deadline: "09.04.2026, 14:00 Uhr" },
          { label: "Runde 4", deadline: "10.04.2026, 08:00 Uhr" },
          { label: "Runde 5", deadline: "10.04.2026, 14:00 Uhr" },
        ]}
        infoUrl="https://medien.hs-duesseldorf.de/studium/wahlangebote"
        guideUrl="https://medien.hs-duesseldorf.de/studium/wahlangebote/Documents/Wahl-Angebot%20in%20Moodle%20-%20Informieren%20und%20Bewerben.pdf"
      />

        {/* Timeline */}
        

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
              {filteredAngebote.map((angebot) => {
  const existingApplication = applications.find(
    (application) => application.angebotId === angebot.id
  );

  const isAlreadyApplied = Boolean(existingApplication);

  return (
    <div
      key={angebot.id}
      aria-disabled={isAlreadyApplied}
      className={`rounded-lg p-4 transition-all ${
        isAlreadyApplied
          ? "cursor-not-allowed"
          : "cursor-pointer hover:shadow-lg hover:scale-[1.02]"
      }`}
      style={{
        backgroundColor: isAlreadyApplied ? "#f1f3f5" : "#f0faff",
        border: `2px solid ${
          isAlreadyApplied ? HSD_BORDER_LIGHT : HSD_BLUE
        }`,
        borderLeft: `6px solid ${
          isAlreadyApplied ? HSD_GRAY : HSD_BLUE
        }`,
        opacity: isAlreadyApplied ? 0.65 : 1,
      }}
      onClick={() => {
        if (isAlreadyApplied) {
          return;
        }

        if (onSelectAngebot) {
          onSelectAngebot(angebot);
        } else {
          setSelectedAngebot(angebot);
        }
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3
          className="text-sm font-semibold flex-1"
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            color: isAlreadyApplied ? HSD_GRAY : HSD_LINK,
          }}
        >
          {angebot.titel}
        </h3>

        <span
          className="text-xs font-bold px-2 py-1 rounded"
          style={{
            backgroundColor: isAlreadyApplied ? HSD_GRAY : HSD_TEAL,
            color: "white",
          }}
        >
          {angebot.platze} Plätze
        </span>
      </div>

      <p
        className="text-xs mb-2"
        style={{ color: HSD_GRAY }}
      >
        Lehrende: {angebot.professoren.join(", ")}
      </p>

      <p
        className="text-xs mb-3 leading-relaxed"
        style={{ color: HSD_DARK }}
      >
        {angebot.beschreibung}
      </p>

      <div
        className="flex items-center justify-between pt-2"
        style={{ borderTop: `1px solid ${HSD_BORDER_LIGHT}` }}
      >
        <span className="text-xs" style={{ color: HSD_GRAY }}>
          {angebot.kategorie}
        </span>

        <span
          className="text-xs font-semibold"
          style={{
            color: isAlreadyApplied ? HSD_GRAY : HSD_LINK,
          }}
        >
          {existingApplication
            ? `Bereits für ${existingApplication.kategorie} beworben`
            : "Details ansehen →"}
        </span>
      </div>
    </div>
  );
})}
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
              {currentApplications.length === 0 ? (
                <div className="text-center py-8 rounded-lg" style={{ backgroundColor: "#f8f9fa", border: `1px dashed ${HSD_BORDER_LIGHT}` }}>
                  <p className="text-sm" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                    Sie haben noch keine Bewerbungen abgegeben.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentApplications.map((app, index) => (
                    <DraggableApplicationCard
                      key={app.id}
                      app={app}
                      index={index}
                      moveCard={moveCurrentApplication}
                      onRemove={removeApplication}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4" style={{ borderTop: `2px solid ${HSD_BORDER_LIGHT}` }}>
              <button
                  type="button"
                  onClick={saveApplications}
                  disabled={!hasUnsavedChanges}
                  className="w-full py-3 rounded-lg text-sm font-bold transition-colors hover:opacity-90 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: HSD_RED,
                    color: "white",
                    opacity: hasUnsavedChanges ? 1 : 0.5,
                    fontFamily: "'Segoe UI', sans-serif",
                  }}
                >
                Änderungen speichern
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
