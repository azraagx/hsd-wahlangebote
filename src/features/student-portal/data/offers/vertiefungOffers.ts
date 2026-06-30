import type {
  ModulAngebot,
  ModulCategory,
} from "@/features/student-portal/types";

interface VertiefungOfferData {
  id: number;
  titel: string;
  modulKuerzel: string;
  katalog: "Katalog A" | "Katalog B";
  eligibleCategories: ModulCategory[];
  beschreibung: string;
  detailBeschreibung: string;
  anforderungen: string;
  inhalteZiele: string[];
}

function createVertiefungOffer(
  data: VertiefungOfferData,
): ModulAngebot {
  return {
    id: data.id,
    titel: data.titel,
    professoren: ["Wird noch bekannt gegeben"],
    beschreibung: data.beschreibung,
    kategorie: `${data.katalog} · ${data.modulKuerzel}`,
    detailBeschreibung: data.detailBeschreibung,
    anforderungen: data.anforderungen,

    // Beispieldaten für den demonstrierten Wahlprozess
    platze: 20,
    semester: "Sommersemester 2026",
    modulTyp: data.eligibleCategories.join(" / "),
    eligibleCategories: data.eligibleCategories,
    status: "Open",
    deadline: "08.04.2026, 08:00 Uhr",

    inhalteZiele: data.inhalteZiele,

    organisation: {
      rhythm: "Wöchentlich, 4 SWS",
      workload: "ca. 150 Stunden pro Semester",
      projectType: "Vertiefungsmodul",
      language: "Deutsch",
      format: "Präsenz oder hybrid",
      availability: "Sommersemester 2026",
    },

    bewerbungsinfo: {
      type: "Priorisiertes Bewerbungsverfahren",
      motivationLetter: false,
      selectionProcess:
        "Vergabe nach Priorität und verfügbaren Plätzen",
      multipleApplications: true,
      reusable: true,
    },
  };
}

export const vertiefungOffers: ModulAngebot[] = [
  createVertiefungOffer({
    id: 101,
    titel: "Interaktive Systeme",
    modulKuerzel: "ISY",
    katalog: "Katalog A",
    eligibleCategories: ["Vertiefung A", "Vertiefung C"],
    beschreibung:
      "Konzeption und Entwicklung interaktiver Anwendungen.",
    detailBeschreibung:
      "Das Modul beschäftigt sich mit der nutzerzentrierten Konzeption, Gestaltung und Umsetzung interaktiver Systeme.",
    anforderungen:
      "Grundkenntnisse in Programmierung und Interesse an Mensch-Computer-Interaktion.",
    inhalteZiele: [
      "Grundlagen der Mensch-Computer-Interaktion",
      "Nutzerzentrierte Entwicklung",
      "Konzeption interaktiver Systeme",
      "Prototyping und Evaluation",
    ],
  }),

  createVertiefungOffer({
    id: 102,
    titel: "Web Frameworks",
    modulKuerzel: "WebFrameW",
    katalog: "Katalog A",
    eligibleCategories: ["Vertiefung A", "Vertiefung C"],
    beschreibung:
      "Entwicklung moderner Webanwendungen mit aktuellen Frameworks.",
    detailBeschreibung:
      "In diesem Modul werden Aufbau, Einsatz und Bewertung moderner Web-Frameworks behandelt.",
    anforderungen:
      "Grundkenntnisse in Webprogrammierung und Softwareentwicklung.",
    inhalteZiele: [
      "Architektur moderner Webanwendungen",
      "Komponentenbasierte Entwicklung",
      "Client- und serverseitige Frameworks",
      "Entwicklung wartbarer Webanwendungen",
    ],
  }),

  createVertiefungOffer({
    id: 103,
    titel: "Künstliche Intelligenz und Data Science",
    modulKuerzel: "KIDS",
    katalog: "Katalog A",
    eligibleCategories: ["Vertiefung A", "Vertiefung C"],
    beschreibung:
      "Grundlagen und Anwendungen von KI und Data Science.",
    detailBeschreibung:
      "Das Modul vermittelt grundlegende Methoden zur Analyse von Daten und zur Entwicklung intelligenter Systeme.",
    anforderungen:
      "Programmierkenntnisse sowie Grundlagen in Mathematik und Statistik.",
    inhalteZiele: [
      "Grundlagen künstlicher Intelligenz",
      "Datenaufbereitung und Datenanalyse",
      "Einführung in maschinelles Lernen",
      "Bewertung datenbasierter Modelle",
    ],
  }),

  createVertiefungOffer({
    id: 104,
    titel: "Security Engineering",
    modulKuerzel: "SecEng",
    katalog: "Katalog A",
    eligibleCategories: ["Vertiefung A", "Vertiefung C"],
    beschreibung:
      "Entwicklung und Bewertung sicherer Softwaresysteme.",
    detailBeschreibung:
      "Das Modul behandelt Methoden und Vorgehensweisen zur Berücksichtigung von Sicherheit während der Softwareentwicklung.",
    anforderungen:
      "Grundkenntnisse in Software Engineering und IT-Sicherheit.",
    inhalteZiele: [
      "Sicherheitsanforderungen analysieren",
      "Bedrohungen und Risiken bewerten",
      "Sichere Softwarearchitekturen entwickeln",
      "Sicherheitsmaßnahmen überprüfen",
    ],
  }),

  createVertiefungOffer({
    id: 201,
    titel: "Multimediales Erzählen",
    modulKuerzel: "MMerz",
    katalog: "Katalog B",
    eligibleCategories: ["Vertiefung B", "Vertiefung D"],
    beschreibung:
      "Konzeption und Gestaltung multimedialer Erzählformen.",
    detailBeschreibung:
      "Das Modul untersucht, wie Geschichten medienübergreifend konzipiert, gestaltet und vermittelt werden können.",
    anforderungen:
      "Interesse an Storytelling, Gestaltung und digitalen Medien.",
    inhalteZiele: [
      "Grundlagen des Storytellings",
      "Multimediale Dramaturgie",
      "Konzeption digitaler Erzählformate",
      "Verbindung verschiedener Medienformen",
    ],
  }),

  createVertiefungOffer({
    id: 202,
    titel: "Kommunikationsdesign",
    modulKuerzel: "KommDes",
    katalog: "Katalog B",
    eligibleCategories: ["Vertiefung B", "Vertiefung D"],
    beschreibung:
      "Visuelle Gestaltung und zielgerichtete Kommunikation.",
    detailBeschreibung:
      "Das Modul vermittelt Grundlagen und Methoden für die Entwicklung visueller Kommunikationskonzepte.",
    anforderungen:
      "Interesse an Gestaltung, Typografie und visueller Kommunikation.",
    inhalteZiele: [
      "Visuelle Kommunikationskonzepte entwickeln",
      "Typografie und Layout einsetzen",
      "Gestaltungsentscheidungen begründen",
      "Mediengerechte Entwürfe erstellen",
    ],
  }),

  createVertiefungOffer({
    id: 203,
    titel: "Digitale Filmproduktion",
    modulKuerzel: "DigFilmP",
    katalog: "Katalog B",
    eligibleCategories: ["Vertiefung B", "Vertiefung D"],
    beschreibung:
      "Planung und Umsetzung digitaler Filmproduktionen.",
    detailBeschreibung:
      "Das Modul begleitet den Produktionsprozess von der ersten Idee über die Aufnahme bis zur Postproduktion.",
    anforderungen:
      "Interesse an Filmgestaltung und praktischer Medienproduktion.",
    inhalteZiele: [
      "Filmprojekte planen",
      "Kamera und Ton einsetzen",
      "Dreharbeiten organisieren",
      "Material schneiden und nachbearbeiten",
    ],
  }),

  createVertiefungOffer({
    id: 204,
    titel: "Techniknutzung und Technikaneignung",
    modulKuerzel: "TNTE",
    katalog: "Katalog B",
    eligibleCategories: ["Vertiefung B", "Vertiefung D"],
    beschreibung:
      "Untersuchung der Nutzung und Aneignung technischer Systeme.",
    detailBeschreibung:
      "Das Modul betrachtet, wie Menschen technische Systeme wahrnehmen, verwenden und in ihren Alltag integrieren.",
    anforderungen:
      "Interesse an Mediennutzung, Technik und gesellschaftlichen Fragestellungen.",
    inhalteZiele: [
      "Techniknutzung analysieren",
      "Aneignungsprozesse verstehen",
      "Nutzungskontexte untersuchen",
      "Technische Entwicklungen kritisch reflektieren",
    ],
  }),
];