import type { ModulAngebot } from "@/features/student-portal/types";
import {
  HSD_BLUE,
  HSD_BORDER_LIGHT,
  HSD_DARK,
  HSD_GRAY,
  HSD_RED,
} from "@/features/student-portal/styles/tokens";

interface ApplicationModalProps {
  angebot: ModulAngebot;
  motivationText: string;
  onMotivationTextChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export function ApplicationModal({
  angebot,
  motivationText,
  onMotivationTextChange,
  onCancel,
  onSubmit,
}: ApplicationModalProps) {
  const wordCount =
    motivationText.trim().length === 0
      ? 0
      : motivationText.trim().split(/\s+/).filter((word) => word.length > 0).length;

  const requiresMotivationLetter = angebot.bewerbungsinfo.motivationLetter;
  const isMedienprojekt =
    angebot.modulCategory === "Medienprojekt A" ||
    angebot.modulCategory === "Medienprojekt B";

  const isSubmitDisabled = requiresMotivationLetter && motivationText.trim().length < 50;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100 }}
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg w-full mx-4 max-h-[85vh] overflow-y-auto"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          maxWidth: requiresMotivationLetter ? "700px" : "550px",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}
            >
              {requiresMotivationLetter ? "Bewerbung schreiben" : "Bewerbung bestätigen"}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="mb-4">
            <p
              className="text-sm font-semibold mb-2"
              style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}
            >
              {angebot.titel}
            </p>
            <p
              className="text-xs mb-4"
              style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}
            >
              {angebot.modulTyp} · {angebot.semester}
            </p>
          </div>

          {requiresMotivationLetter ? (
            <div className="mb-4">
              <p
                className="text-sm mb-4 leading-relaxed"
                style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}
              >
                {isMedienprojekt
                  ? "Für dieses Medienprojekt ist ein Motivationsschreiben erforderlich."
                  : "Bitte verfassen Sie ein Motivationsschreiben für Ihre Bewerbung. Erklären Sie, warum Sie an diesem Projekt teilnehmen möchten und welche Erfahrungen oder Interessen Sie mitbringen."}
              </p>

              <label
                className="block text-sm font-semibold mb-2"
                style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}
              >
                Motivationsschreiben *
              </label>

              <textarea
                value={motivationText}
                onChange={(event) => onMotivationTextChange(event.target.value)}
                placeholder={
                  isMedienprojekt
                    ? "Beschreiben Sie Ihre Motivation, Ihre Interessen und warum Sie an diesem Medienprojekt teilnehmen möchten."
                    : "Beschreiben Sie Ihre Motivation, Ihre Interessen und warum Sie an diesem Projekt teilnehmen möchten."
                }
                className="w-full rounded-lg p-3 text-sm"
                style={{
                  fontFamily: "'Segoe UI', sans-serif",
                  color: HSD_DARK,
                  border: `1px solid ${HSD_BORDER_LIGHT}`,
                  minHeight: "240px",
                  resize: "vertical",
                }}
                maxLength={3500}
              />

              <div className="flex justify-between items-center mt-2">
                <p
                  className="text-xs"
                  style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}
                >
                  * Pflichtfeld
                </p>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: "'Segoe UI', sans-serif",
                    color: wordCount > 3000 ? HSD_RED : HSD_GRAY,
                  }}
                >
                  {wordCount} / 3500 Wörter
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p
                className="text-sm mb-4"
                style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}
              >
                Sie sind dabei, sich für dieses Angebot zu bewerben. Ihre Bewerbung wird zur
                Prioritätenliste hinzugefügt.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-lg text-sm font-bold transition-colors"
              style={{
                backgroundColor: "white",
                color: HSD_GRAY,
                border: `1px solid ${HSD_BORDER_LIGHT}`,
                fontFamily: "'Segoe UI', sans-serif",
              }}
            >
              Abbrechen
            </button>

            <button
              onClick={onSubmit}
              disabled={isSubmitDisabled}
              className="flex-1 py-3 rounded-lg text-sm font-bold transition-colors"
              style={{
                backgroundColor: isSubmitDisabled ? "#cccccc" : HSD_BLUE,
                color: "white",
                fontFamily: "'Segoe UI', sans-serif",
                cursor: isSubmitDisabled ? "not-allowed" : "pointer",
                opacity: isSubmitDisabled ? 0.6 : 1,
              }}
            >
              {isMedienprojekt ? "Bewerbung abschicken" : "Bewerbung absenden"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}