export interface MockModule {
  id: string;
  name: string;
  tags: string[];
  programs: string[];
  category: string;
  examinationForm: string;
  description: string;
}

export const mockModules: MockModule[] = [
  {
    id: "m1",
    name: "Interaktive Systeme",
    tags: ["Interaktivität", "Mediensysteme", "Vertiefung"],
    programs: ["BMI-PO 2018", "BMI-PO 2025"],
    category: "Vertiefung / Wahlpflicht",
    examinationForm: "Klausur / Projekt",
    description: "Vermittlung von Kenntnissen und Methoden im Bereich interaktiver Mediensysteme."
  },
  {
    id: "m2",
    name: "Pencils and Polygons",
    tags: ["Wahlmodul", "Projekt", "Medientechnik"],
    programs: ["BMI-PO 2018", "BMI-PO 2025", "BMT-PO 2018", "BMT-PO 2025", "BTB-PO 2025", "MMI-PO 2025"],
    category: "Wahlmodul / Projekt",
    examinationForm: "Projekt, Seminar + Praktikum",
    description: "Praktische Projektarbeit und interdisziplinäre Bearbeitung komplexer medientechnischer Fragestellungen."
  },
  {
    id: "m3",
    name: "Digital Literacy & AI Literacy",
    tags: ["Wahlmodul", "Fachmodul", "Digitalität", "KI"],
    programs: ["BMI-PO 2018", "BMI-PO 2025", "BMT-PO 2018", "BMT-PO 2025", "BTB-PO 2025", "MMI-PO 2018", "MMI-PO 2025", "TRADY-PO 2026"],
    category: "Wahlmodul / Fachmodul",
    examinationForm: "Portfolio (Seminar + Praktikum)",
    description: "Die Studierenden erkennen die Bedeutung der Digitalkompetenz, verstehen die Konzepte der Künstlichen Intelligenz (KI), können digitale Werkzeuge kritisch bewerten und eigene Projekte mit KI-Elementen umsetzen."
  },
  {
    id: "m4",
    name: "E-Business",
    tags: ["Wahlmodul", "Wahlkatalog", "E-Business"],
    programs: ["BMI-PO 2018", "BMI-PO 2025", "BMT-PO 2018", "BMT-PO 2025", "BTB-PO 2025"],
    category: "Wahlmodul / Wahlkatalog",
    examinationForm: "Portfolio / Seminar",
    description: "Vermittlung von Geschäftsmodellen, Online-Strategien und Architekturen für webbasierte Geschäftsprozesse."
  },
  {
    id: "m5",
    name: "Corporate Learning",
    tags: ["Wahlmodul", "Vertiefung", "Learning"],
    programs: ["BMI-PO 2018", "BMT-PO 2018"],
    category: "Wahlmodul / Vertiefung",
    examinationForm: "Portfolio",
    description: "Formen des digital gestützten Lernens und die Implementierung von Wissensmanagement in Organisationsstrukturen."
  }
];
