import { useState } from "react";
import { X } from "lucide-react";
import type { StudentApplication } from "@/features/student-portal/types";
import { useApplications } from "@/features/student-portal/state/ApplicationContext";
import {
  HSD_BLUE,
  HSD_BORDER,
  HSD_DARK,
  HSD_GRAY,
  HSD_LINK,
} from "@/features/student-portal/styles/tokens";
import { useNavigate } from "react-router";

interface ApplicationViewModalProps {
  application: StudentApplication;
  onClose: () => void;
  editable?: boolean;
}

export function ApplicationViewModal({
  application,
  onClose,
  editable = false,
}: ApplicationViewModalProps) {
  const { updateApplicationMotivation } = useApplications();

  const [motivationText, setMotivationText] = useState(
    application.motivationText ?? ""
  );

  const canSave = motivationText.trim().length >= 50;

  const handleSave = () => {
    if (!canSave) {
      return;
    }

    updateApplicationMotivation(application.id, motivationText);
    onClose();
  };

  const navigate = useNavigate();

const canEdit =
  application.status === "entwurf" ||
  application.status === "in_bearbeitung";

const openApplicationPage = () => {
  onClose();

  navigate(
    `/student?view=modulwahl&category=${encodeURIComponent(
      application.kategorie
    )}`
  );
};
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-view-title"
        className="w-full max-w-2xl rounded-lg bg-white p-6"
        style={{
          border: `1px solid ${HSD_BORDER}`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-sm" style={{ color: HSD_GRAY }}>
              {application.kategorie}
            </p>

            <h2
              id="application-view-title"
              className="text-xl font-bold"
              style={{ color: HSD_DARK }}
            >
              {application.titel}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fenster schließen"
            className="p-1"
            style={{ color: HSD_GRAY }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <h3
          className="mb-2 text-sm font-semibold"
          style={{ color: HSD_DARK }}
        >
          Eingereichter Bewerbungstext
        </h3>

        {editable ? (
          <>
            <textarea
              value={motivationText}
              onChange={(event) => setMotivationText(event.target.value)}
              className="min-h-64 w-full resize-y rounded-lg p-4 text-sm leading-relaxed"
              style={{
                border: `1px solid ${HSD_BORDER}`,
                color: HSD_DARK,
                backgroundColor: "white",
              }}
            />

            <p className="mt-1 text-xs" style={{ color: HSD_GRAY }}>
              {motivationText.length} Zeichen · mindestens 50 Zeichen
            </p>
          </>
        ) : (
          <div
            className="max-h-96 overflow-y-auto whitespace-pre-wrap rounded-lg p-4 text-sm leading-relaxed"
            style={{
              border: `1px solid ${HSD_BORDER}`,
              color: HSD_DARK,
              backgroundColor: "#f8f9fa",
            }}
          >
            {application.motivationText}
          </div>
        )}

        <div className="mt-5 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold hover:underline"
            style={{ color: HSD_LINK }}
          >
            {editable ? "Abbrechen" : "Schließen"}
          </button>
        
        {!editable && canEdit && (
        <button
            type="button"
            onClick={openApplicationPage}
            className="text-sm font-semibold hover:underline"
            style={{ color: HSD_BLUE }}
        >
            Auf Wahlseite bearbeiten →
        </button>
        )}

          {editable && (
            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed"
              style={{
                backgroundColor: HSD_BLUE,
                opacity: canSave ? 1 : 0.5,
              }}
            >
              Änderungen übernehmen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}