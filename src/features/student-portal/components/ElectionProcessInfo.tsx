import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import {
  HSD_BLUE,
  HSD_BORDER,
  HSD_BORDER_LIGHT,
  HSD_DARK,
  HSD_GRAY,
  HSD_LINK,
} from "@/features/student-portal/styles/tokens";

interface AllocationRound {
  label: string;
  deadline: string;
}

interface ElectionProcessInfoProps {
  applicationDeadline: string;
  rounds: AllocationRound[];
  infoUrl: string;
  guideUrl: string;
}

export function ElectionProcessInfo({
  applicationDeadline,
  rounds,
  infoUrl,
  guideUrl,
}: ElectionProcessInfoProps) {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    "Angebote ansehen",
    "Angebote zur Bewerbungsliste hinzufügen",
    "Bewerbungen nach Priorität sortieren",
    "Änderungen speichern",
    "Ergebnis der Vergaberunden abwarten",
  ];

  return (
    <section
      className="mb-6 bg-white rounded-lg p-5"
      style={{
        border: `1px solid ${HSD_BORDER}`,
        boxShadow: "0 2px 2px rgba(0,0,0,0.06)",
      }}
    >
      <h2
        className="mb-3 text-base font-bold"
        style={{ color: HSD_DARK }}
      >
        So funktioniert die Bewerbung
      </h2>

      <p
        className="mb-5 text-sm leading-relaxed"
        style={{ color: HSD_GRAY }}
      >
        Stellen Sie bis zum Ende der Bewerbungsphase Ihre Wunschliste
        zusammen. Ordnen Sie die Angebote nach Priorität, sodass Ihr
        bevorzugtes Angebot oben steht. In den Vergaberunden wird jeweils
        die höchste noch offene Bewerbung bearbeitet, bis Sie eine Zusage
        erhalten.
      </p>

      <ol className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-2 text-sm">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: HSD_BLUE }}
            >
              {index + 1}
            </span>
            <span style={{ color: HSD_DARK }}>{step}</span>
          </li>
        ))}
      </ol>

      <div
        className="mb-5 border-l-4 px-4 py-3"
        style={{
          borderColor: HSD_BLUE,
          backgroundColor: "#eaf7fb",
          color: HSD_DARK,
        }}
      >
        <p className="text-sm font-semibold">
          Wichtig: Ihre Reihenfolge wird erst übernommen, nachdem Sie auf
          „Änderungen speichern“ geklickt haben.
        </p>
      </div>

      <div
        className="grid gap-3 border-t pt-4 sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderColor: HSD_BORDER_LIGHT }}
      >
        <div>
          <p className="text-xs font-semibold uppercase" style={{ color: HSD_GRAY }}>
            Bewerbungsschluss
          </p>
          <p className="mt-1 text-sm font-semibold" style={{ color: HSD_DARK }}>
            {applicationDeadline}
          </p>
        </div>

        {rounds.map((round) => (
          <div key={round.label}>
            <p className="text-xs font-semibold uppercase" style={{ color: HSD_GRAY }}>
              {round.label}
            </p>
            <p className="mt-1 text-sm font-semibold" style={{ color: HSD_DARK }}>
              {round.deadline}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="mt-5 flex w-full items-center justify-between border-t pt-4 text-left text-sm font-semibold"
        style={{ borderColor: HSD_BORDER_LIGHT, color: HSD_LINK }}
      >
        Ausführliche Informationen zum Wahlprozess
        <ChevronDown
          className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 text-sm leading-relaxed" style={{ color: HSD_GRAY }}>
          <div>
            <h3 className="font-semibold" style={{ color: HSD_DARK }}>
              Informations- und Bewerbungsphase
            </h3>
            <p>
              Eine Woche vor Vorlesungsbeginn startet die Informations- und
              Bewerbungsphase. Ab diesem Zeitpunkt stehen die verfügbaren
              Wahlangebote und deren Detailinformationen online bereit.
            </p>
          </div>

          <div>
            <h3 className="font-semibold" style={{ color: HSD_DARK }}>
              Informationsveranstaltungen
            </h3>
            <p>
              Anbieterinnen und Anbieter können zusätzliche Präsenz- oder
              Onlinetermine anbieten. Die jeweiligen Informationen stehen in
              den Beschreibungen der Angebote.
            </p>
          </div>

          <div>
            <h3 className="font-semibold" style={{ color: HSD_DARK }}>
              Zuteilungsphase
            </h3>
            <p>
              Die Platzvergabe erfolgt in fünf Runden. Nach jeder Runde sehen
              Sie, ob Sie eine Zusage erhalten haben oder die nächste
              Bewerbung Ihrer Wunschliste berücksichtigt wird.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={infoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold hover:underline"
              style={{ color: HSD_LINK }}
            >
              Weitere Informationen
              <ExternalLink className="h-4 w-4" />
            </a>

            <a
              href={guideUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold hover:underline"
              style={{ color: HSD_LINK }}
            >
              Anleitung zur Bewerbung
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}