export type ApplicationStatus = "pending" | "accepted" | "rejected";

export interface TeacherApplication {
  id: string;
  offerId: string;
  studentName: string;
  studentId: string;
  studyProgram: string;
  semester: number;
  submittedAt: string;
  priority: number;
  status: ApplicationStatus;
  motivation: string;
  experience: string;
}

const names = [
  "Mina Weber",
  "Jonas Richter",
  "Lea Hoffmann",
  "Samir Kaya",
  "Nora Schmitt",
  "Elias Becker",
  "Amelie Fischer",
  "Tobias Wagner"
];

const programs = ["BMI-PO 2025", "BMT-PO 2025", "BTB-PO 2018", "MMI-PO 2025", "BMI-PO 2018"];

const motivations = [
  "Ich moechte meine praktischen Kenntnisse vertiefen und in einem realistischen Projektkontext Verantwortung uebernehmen. Besonders spannend finde ich die Verbindung aus Konzeption, Umsetzung und gemeinsamer Reflexion im Team.",
  "Das Angebot passt sehr gut zu meinen bisherigen Interessen. Ich bringe erste Erfahrungen aus Studienprojekten mit und moechte diese gezielt ausbauen, insbesondere im Bereich Prototyping und Nutzerfeedback.",
  "Ich interessiere mich fuer interdisziplinaere Projektarbeit und moechte lernen, wie man fachliche Anforderungen in tragfaehige Loesungen uebersetzt. Mir ist wichtig, aktiv im Team mitzuarbeiten.",
  "Ich sehe das Projekt als gute Gelegenheit, mein technisches Profil zu schaerfen und gleichzeitig strukturierter zu dokumentieren. Ich arbeite zuverlaessig und kann mich schnell in neue Werkzeuge einarbeiten."
];

const experiences = [
  "Grundlagen in Web-Technologien, Git und agiler Teamarbeit.",
  "Erfahrung mit Gestaltung, Recherche und einfachen interaktiven Prototypen.",
  "Programmierkenntnisse aus den ersten Semestern und Interesse an Medienproduktion.",
  "Vorkenntnisse in Projektorganisation, Praesentationen und technischer Dokumentation."
];

const makeNumericSeed = (offerId: string) =>
  offerId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

export const getMockApplicationsForOffer = (offerId: string, count?: number): TeacherApplication[] => {
  const seed = makeNumericSeed(offerId);
  const applicationCount = count ?? Math.max(4, (seed % 6) + 3);

  return Array.from({ length: applicationCount }, (_, index) => {
    const nameIndex = (seed + index) % names.length;
    const programIndex = (seed + index * 2) % programs.length;

    return {
      id: `${offerId}-application-${index + 1}`,
      offerId,
      studentName: names[nameIndex],
      studentId: `s${(100000 + seed + index * 137).toString().slice(-6)}`,
      studyProgram: programs[programIndex],
      semester: ((seed + index) % 6) + 2,
      submittedAt: `2026-04-${(2 + index).toString().padStart(2, "0")}, ${10 + (index % 7)}:${index % 2 === 0 ? "15" : "40"} Uhr`,
      priority: (index % 3) + 1,
      status: "pending",
      motivation: motivations[(seed + index) % motivations.length],
      experience: experiences[(seed + index) % experiences.length]
    };
  });
};
