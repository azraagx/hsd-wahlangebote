import type { ModulAngebot, Page } from "@/features/student-portal/types";
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
export function AngebotDetailPage({ angebot, setPage, onApply }: { angebot: ModulAngebot; setPage: (p: Page) => void; onApply: () => void }) {
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
