import type {
  ModulAngebot,
  ModulCategory,
} from "@/features/student-portal/types";

interface ProjectOfferData {
  id: number;
  titel: string;
  professoren: string[];
  eligibleCategories: ModulCategory[];
  beschreibung: string;
  detailBeschreibung: string;
  anforderungen: string;
  inhalteZiele: string[];
  projectType: string;
}

function createProjectOffer(
  data: ProjectOfferData,
): ModulAngebot {
  return {
    id: data.id,
    titel: data.titel,
    professoren: data.professoren,
    beschreibung: data.beschreibung,
    kategorie: "Semesterbezogenes Projektangebot",
    detailBeschreibung: data.detailBeschreibung,
    anforderungen: data.anforderungen,

    // Demodaten, später durch Lehrenden-Angebote ersetzbar
    platze: 20,
    semester: "Sommersemester 2026",
    modulTyp: data.eligibleCategories.join(" / "),
    eligibleCategories: data.eligibleCategories,
    status: "Open",
    deadline: "08.04.2026, 08:00 Uhr",

    inhalteZiele: data.inhalteZiele,

    organisation: {
      rhythm: "Wöchentliche Projektsitzung, 4 SWS",
      workload: "ca. 150 Stunden pro Semester",
      projectType: data.projectType,
      language: "Deutsch",
      format: "Präsenz und selbstständige Projektarbeit",
      availability: "Sommersemester 2026",
    },

    anwesenheitspflicht: {
      required: true,
      description:
        "Regelmäßige Teilnahme an Projektterminen und Präsentationen ist erforderlich.",
    },

    bewerbungsinfo: {
      type: "Priorisiertes Bewerbungsverfahren",
      motivationLetter: true,
      selectionProcess:
        "Vergabe nach Priorität, Motivation und verfügbaren Plätzen",
      multipleApplications: true,
      reusable: false,
    },
  };
}

export const projectOffers: ModulAngebot[] = [
  createProjectOffer({
    id: 301,
    titel:
      "Konzeption, Prototyping und Umsetzung einer Produktvision",
    professoren: ["Prof. Gabriele Schade-Trapp"],
    eligibleCategories: ["Medienprojekt A", "Medienprojekt B"],
    beschreibung:
      "Entwicklung eines interaktiven Medienprodukts von der Idee bis zum Prototyp.",
    detailBeschreibung:
      "In diesem Projekt entwickeln Studierende gemeinsam eine Produktidee und setzen sie als funktionsfähigen Prototyp um.",
    anforderungen:
      "Interesse an Konzeption, Gestaltung und interdisziplinärer Teamarbeit.",
    inhalteZiele: [
      "Nutzerbedürfnisse untersuchen",
      "Produktideen entwickeln und bewerten",
      "Interaktive Prototypen erstellen",
      "Projektergebnisse präsentieren und dokumentieren",
    ],
    projectType: "Teamarbeit mit 4 bis 5 Studierenden",
  }),

  createProjectOffer({
    id: 302,
    titel: "Pencils and Polygons",
    professoren: ["Lehrende werden noch bekannt gegeben"],
    eligibleCategories: ["Medienprojekt A", "Medienprojekt B"],
    beschreibung:
      "Gestaltung und Umsetzung visueller Inhalte zwischen Illustration und 3D.",
    detailBeschreibung:
      "Das Projekt verbindet gestalterische Grundlagen mit digitalen Produktionsmethoden und der praktischen Umsetzung visueller Konzepte.",
    anforderungen:
      "Interesse an Gestaltung, Illustration und digitalen Medien.",
    inhalteZiele: [
      "Visuelle Konzepte entwickeln",
      "Gestalterische Entwürfe erstellen",
      "Zwei- und dreidimensionale Inhalte verbinden",
      "Ergebnisse in einem gemeinsamen Medienprojekt umsetzen",
    ],
    projectType: "Interdisziplinäre Teamarbeit",
  }),

  createProjectOffer({
    id: 303,
    titel: "Mobile Anwendungen",
    professoren: ["Prof. Dr.-Ing. Christian Noss"],
    eligibleCategories: [
      "Informatikprojekt 1",
      "Informatikprojekt 2",
    ],
    beschreibung:
      "Konzeption und Entwicklung einer mobilen Anwendung.",
    detailBeschreibung:
      "In diesem Projekt wird eine mobile Anwendung von der Anforderungsanalyse über die technische Konzeption bis zur Umsetzung entwickelt.",
    anforderungen:
      "Grundkenntnisse in Programmierung und Softwareentwicklung.",
    inhalteZiele: [
      "Anforderungen an mobile Anwendungen analysieren",
      "Eine geeignete Softwarearchitektur entwickeln",
      "Benutzeroberflächen implementieren",
      "Die Anwendung testen und dokumentieren",
    ],
    projectType: "Teamarbeit mit 3 bis 4 Studierenden",
  }),

  createProjectOffer({
    id: 304,
    titel: "Web-App Engineering",
    professoren: ["Lehrende werden noch bekannt gegeben"],
    eligibleCategories: [
      "Informatikprojekt 1",
      "Informatikprojekt 2",
    ],
    beschreibung:
      "Planung und Umsetzung einer modernen Webanwendung.",
    detailBeschreibung:
      "Das Projekt behandelt die gemeinsame Entwicklung einer Webanwendung mit Frontend, Anwendungslogik und strukturierter Datenhaltung.",
    anforderungen:
      "Grundkenntnisse in Webprogrammierung und Interesse an Software Engineering.",
    inhalteZiele: [
      "Anforderungen und User Stories formulieren",
      "Eine komponentenbasierte Anwendung entwickeln",
      "Daten strukturiert verarbeiten",
      "Qualität durch Tests und Dokumentation sichern",
    ],
    projectType: "Agile Teamarbeit mit 3 bis 4 Studierenden",
  }),
];