import { useCallback, useState } from "react";
import type { ModulAngebot, ModulCategory, Page, StudentApplication } from "@/features/student-portal/types";
import { DraggableApplicationCard } from "@/features/student-portal/components/DraggableApplicationCard";
import { modulAngebote } from "@/features/student-portal/data/moduleOffers";
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

export function ModulwahlPage({ onSelectAngebot, setPage, navigateWithScroll, selectedCategory }: { onSelectAngebot?: (angebot: ModulAngebot) => void; setPage?: (p: Page) => void; navigateWithScroll?: (page: Page, section?: string) => void; selectedCategory?: ModulCategory | null }) {
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
