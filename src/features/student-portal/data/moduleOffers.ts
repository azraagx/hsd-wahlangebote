import type { ModulAngebot } from "@/features/student-portal/types";

export const modulAngebote: ModulAngebot[] = [
  {
    id: 1,
    titel: "Interdisziplinäres Projekt: Konzeption – Prototyping – Umsetzung der Produktvision",
    professoren: ["Prof. Gabriele Schade-Trapp", "Dr. Christina Kanalakis", "Michael Ignatieff"],
    beschreibung: "Warum ist gerne ein Projekt, das an Möglichkeit a?",
    kategorie: "TRADY, MTCADY, M3DT, DAISY, MDPR",
    detailBeschreibung: "In diesem interdisziplinären Projekt entwickeln Sie in einem Team ein Produkt von der ersten Idee bis zum funktionierenden Prototyp. Sie lernen dabei Konzepte wie Design Thinking, agile Entwicklungsmethoden und selbstständiges Arbeiten.",
    anforderungen: "Eigenverantwortung, Teamfähigkeit, grundlegende Programmierkenntnisse",
    platze: 24,
    semester: "Sommersemester 2026",
    modulTyp: "Medienprojekt A",
    modulCategory: "Medienprojekt A",
    status: "Open",
    deadline: "08.04.2026, 08:00 Uhr",
    inhalteZiele: [
      "Design Thinking und agile Entwicklungsmethoden kennenlernen",
      "Von der Produktidee zum funktionsfähigen Prototyp",
      "Teamarbeit in interdisziplinären Projekten",
      "Selbstständige Projekt- und Zeitplanung",
      "Präsentation und Dokumentation von Projektergebnissen"
    ],
    organisation: {
      rhythm: "Wöchentliche Projektmeetings, 4 SWS",
      workload: "ca. 150 Stunden pro Semester",
      projectType: "Teamarbeit (4-5 Studierende)",
      language: "Deutsch / Englisch nach Absprache",
      format: "Präsenz + Remote nach Vereinbarung",
      availability: "Sommersemester 2026"
    },
    anwesenheitspflicht: {
      required: true,
      description: "Anwesenheitspflicht: Ja – regelmäßige Teilnahme an Projektmeetings und Präsentationen erforderlich. Mindestens 80% Anwesenheit bei Präsenzterminen."
    },
    bewerbungsinfo: {
      type: "Priorisiertes Bewerbungsverfahren",
      motivationLetter: true,
      selectionProcess: "Vergabe nach Priorität und verfügbaren Plätzen",
      multipleApplications: true,
      reusable: false
    }
  },
  {
    id: 2,
    titel: "Projekt(rahmen): Konzept für die praxisorientierte Umsetzung den Medienbereiches",
    professoren: ["Prof. Dr. rer. nat. Michael Marmann", "Dipl.-Ing. Marc Hofmann"],
    beschreibung: "Projektion für Ihre Projektierung",
    kategorie: "TRADY, MTDA29Y, MDPR",
    detailBeschreibung: "Entwicklung innovativer Medienkonzepte mit Fokus auf praktische Umsetzbarkeit. Das Projekt verbindet theoretische Grundlagen mit hands-on Erfahrung in der Medienproduktion.",
    anforderungen: "Interesse an Medienproduktion, Grundkenntnisse in Videoschnitt oder Grafikdesign",
    platze: 20,
    semester: "Sommersemester 2026",
    modulTyp: "Medienprojekt B",
    modulCategory: "Medienprojekt B",
    status: "Few spots left",
    deadline: "08.04.2026, 08:00 Uhr",
    inhalteZiele: [
      "Konzeption und Planung von Medienprojekten",
      "Praktische Medienproduktion (Video, Audio, Print)",
      "Projektmanagement im Medienbereich",
      "Zielgruppenanalyse und Content-Strategie"
    ],
    organisation: {
      rhythm: "Wöchentliche Projektsitzungen, 4 SWS",
      workload: "ca. 150 Stunden pro Semester",
      projectType: "Teamarbeit (3-4 Studierende)",
      language: "Deutsch",
      format: "Präsenz (Medien-Labor)",
      availability: "Sommersemester 2026"
    },
    anwesenheitspflicht: {
      required: true,
      description: "Anwesenheitspflicht: Ja – regelmäßige Teilnahme an Projektmeetings und Zwischen­präsentationen erforderlich."
    },
    bewerbungsinfo: {
      type: "Priorisiertes Bewerbungsverfahren",
      motivationLetter: true,
      selectionProcess: "Vergabe nach Priorität und verfügbaren Plätzen",
      multipleApplications: true,
      reusable: false
    }
  },
  {
    id: 3,
    titel: "Projekt(rahmen): Mobile",
    professoren: ["Prof. Dr.-Ing. Christian Noss"],
    beschreibung: "Mobile-first Entwicklung moderner Anwendungen",
    kategorie: "TRADY, MTCADY",
    detailBeschreibung: "In diesem Projekt konzentrieren wir uns auf die Entwicklung von Mobile-First Anwendungen. Sie lernen die Besonderheiten mobiler Plattformen kennen und entwickeln eine eigene App.",
    anforderungen: "Programmierkenntnisse, Interesse an Mobile Development",
    platze: 18,
    semester: "Sommersemester 2026",
    modulTyp: "Vertiefung A",
    modulCategory: "Vertiefung A",
    status: "Open",
    deadline: "08.04.2026, 08:00 Uhr",
    inhalteZiele: [
      "Mobile-First Design Prinzipien",
      "Native und Cross-Platform Entwicklung",
      "Mobile User Experience Design",
      "Performance-Optimierung für mobile Geräte",
      "App-Publishing und Distribution"
    ],
    organisation: {
      rhythm: "Wöchentlich, 4 SWS",
      workload: "ca. 300 Stunden pro Semester",
      projectType: "Einzelarbeit oder Zweierteams",
      language: "Deutsch",
      format: "Hybrid (Präsenz + Online)",
      availability: "Sommersemester 2026"
    },
    bewerbungsinfo: {
      type: "Priorisiertes Bewerbungsverfahren",
      motivationLetter: false,
      selectionProcess: "Vergabe nach Priorität und verfügbaren Plätzen",
      multipleApplications: true,
      reusable: true
    }
  }
];