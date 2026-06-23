import type { Course } from "@/features/student-portal/types";

export const coursesBySemester: Record<number, Course[]> = {
  1: [
    { id: 1, name: "Grundlagen der Programmierung", modulNr: "BMI 01", dozent: "Prof. Dr. Müller", ects: 5, beschreibung: "Einführung in imperative und objektorientierte Programmierung mit Java.", color: "#6C5CE7" },
    { id: 2, name: "Mathematik 1", modulNr: "BMI 02", dozent: "Prof. Dr. Schmidt", ects: 5, beschreibung: "Lineare Algebra, Analysis und diskrete Mathematik für Informatiker.", color: "#00B894" },
    { id: 3, name: "Einführung in die Medieninformatik", modulNr: "BMI 03", dozent: "Prof. Dr. Weber", ects: 5, beschreibung: "Überblick über das Fachgebiet, Medienformate und digitale Kommunikation.", color: "#0984E3" },
    { id: 4, name: "Grundlagen der Gestaltung", modulNr: "BMI 04", dozent: "Prof. Dr. Fischer", ects: 5, beschreibung: "Farblehre, Kompositionsprinzipien und visuelle Kommunikation.", color: "#E17055" },
  ],
  2: [
    { id: 1, name: "Algorithmen & Datenstrukturen", modulNr: "BMI 11", dozent: "Prof. Dr. Bauer", ects: 5, beschreibung: "Sortier- und Suchalgorithmen, Graphen, Bäume und Komplexitätsanalyse.", color: "#6C5CE7" },
    { id: 2, name: "Mathematik 2", modulNr: "BMI 12", dozent: "Prof. Dr. Schmidt", ects: 5, beschreibung: "Stochastik, Wahrscheinlichkeitsrechnung und Statistik.", color: "#00B894" },
    { id: 3, name: "Webentwicklung Grundlagen", modulNr: "BMI 13", dozent: "Prof. Dr. Hofmann", ects: 5, beschreibung: "HTML, CSS, JavaScript und grundlegende Web-Technologien.", color: "#0984E3" },
    { id: 4, name: "Datenbankensysteme", modulNr: "BMI 14", dozent: "Prof. Dr. Koch", ects: 5, beschreibung: "Relationale Datenbanken, SQL, ER-Modellierung und Normalisierung.", color: "#FDCB6E" },
  ],
  3: [
    { id: 1, name: "Softwaretechnik", modulNr: "BMI 21", dozent: "Prof. Dr. Lange", ects: 5, beschreibung: "Agile Methoden, Scrum, UML-Modellierung und Software-Qualität.", color: "#6C5CE7" },
    { id: 2, name: "Medienproduktion", modulNr: "BMI 22", dozent: "Prof. Dr. Braun", ects: 5, beschreibung: "Produktion digitaler Medieninhalte: Video, Audio und Interaktivität.", color: "#E17055" },
    { id: 3, name: "Human-Computer Interaction", modulNr: "BMI 23", dozent: "Prof. Dr. Schulz", ects: 5, beschreibung: "Grundlagen der Usability und User-Centered Design.", color: "#0984E3" },
    { id: 4, name: "Netzwerke & Kommunikation", modulNr: "BMI 24", dozent: "Prof. Dr. Zimmermann", ects: 5, beschreibung: "TCP/IP, Protokolle und Grundlagen der Netzsicherheit.", color: "#00B894" },
  ],
    4: [
    {
      id: 1,
      name: "Bild und Ton",
      modulNr: "BMI 52",
      dozent: "Prof. Dr. Krüger",
      ects: 5,
      beschreibung: "Gestaltung und Implementierung interaktiver Anwendungen und Interfaces.",
      color: "#6C5CE7",
      category: "Pflichtmodul",
      action: {
        type: "openCourse",
        label: "Zum Kurs",
      },
    },
    {
      id: 2,
      name: "IT-Sicherheit",
      modulNr: "BMI 26",
      dozent: "Prof. Dr. Wolff",
      ects: 5,
      beschreibung: "Kryptographie, Schwachstellenanalyse und sichere Systemarchitekturen.",
      color: "#D63031",
      category: "Pflichtmodul",
      action: {
        type: "openCourse",
        label: "Zum Kurs",
      },
    },
    {
      id: 3,
      name: "Vertiefung A",
      modulNr: "VT-A",
      dozent: "",
      ects: 10,
      beschreibung: "Wählen Sie aus verschiedenen Angeboten im Bereich UX, Interaction Design und verwandten Themen.",
      color: "#E17055",
      category: "Vertiefung A",
      action: {
        type: "openOffers",
        label: "Angebote ansehen",
      },
    },
    {
      id: 4,
      name: "Vertiefung B",
      modulNr: "VT-B",
      dozent: "",
      ects: 10,
      beschreibung: "Wählen Sie aus verschiedenen Angeboten im Bereich Software Engineering, Web-Technologien und verwandten Themen.",
      color: "#0984E3",
      category: "Vertiefung B",
      action: {
        type: "openOffers",
        label: "Angebote ansehen",
      },
    },
    {
      id: 5,
      name: "Medienprojekt A",
      modulNr: "MP-A",
      dozent: "",
      ects: 10,
      beschreibung: "Wählen Sie aus verschiedenen interdisziplinären Medienprojekten mit Fokus auf Konzeption und praktische Umsetzung.",
      color: "#FDCB6E",
      category: "Medienprojekt A",
      action: {
        type: "openOffers",
        label: "Angebote ansehen",
      },
    },
  ],
  5: [
    { id: 1, name: "Machine Learning", modulNr: "BMI 78", dozent: "Prof. Dr. Hansen", ects: 5, beschreibung: "Supervised und Unsupervised Learning, neuronale Netze und Evaluierung.", color: "#6C5CE7" },
    { id: 2, name: "Mobile App-Entwicklung", modulNr: "BMI 55", dozent: "Prof. Dr. Schneider", ects: 5, beschreibung: "Native und cross-platform Entwicklung für iOS und Android.", color: "#00B894" },
    { id: 3, name: "Projektseminar", modulNr: "BMI 60", dozent: "Prof. Dr. Kaufmann", ects: 10, beschreibung: "Interdisziplinäres Praxisprojekt in Teams mit externen Partnern.", color: "#FDCB6E" },
  ],
  6: [
    { id: 1, name: "Entrepreneurship & Innovation", modulNr: "BMI 81", dozent: "Prof. Dr. Berger", ects: 5, beschreibung: "Startup-Methoden, Business Model Canvas und Innovations-Management.", color: "#E17055" },
    { id: 2, name: "Cloud Computing", modulNr: "BMI 79", dozent: "Prof. Dr. Hoffmann", ects: 5, beschreibung: "AWS, Azure und GCP – Infrastruktur, Skalierung und Serverless.", color: "#0984E3" },
    { id: 3, name: "Bachelorarbeit Vorbereitung", modulNr: "BMI 90", dozent: "Prof. Dr. Werner", ects: 5, beschreibung: "Wissenschaftliches Arbeiten, Expose-Erstellung und Methodenwahl.", color: "#00B894" },
  ],
  7: [
    { id: 1, name: "Bachelorarbeit", modulNr: "BMI 99", dozent: "Individuelle Betreuung", ects: 12, beschreibung: "Eigenständige wissenschaftliche Abschlussarbeit im gewählten Schwerpunkt.", color: "#6C5CE7" },
    { id: 2, name: "Kolloquium", modulNr: "BMI 100", dozent: "Prüfungsausschuss", ects: 3, beschreibung: "Präsentation und Verteidigung der Bachelorarbeit vor dem Prüfungsausschuss.", color: "#D63031" },
  ],
};

