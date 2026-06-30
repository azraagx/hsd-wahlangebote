import imgCourse from "@/imports/1440WDefault/344178e81f62bc421593dc0e4202a66e0f23556b.png";
import type { Page } from "@/features/student-portal/types";
import {
  HSD_BLUE,
  HSD_BORDER_LIGHT,
  HSD_DARK,
  HSD_GRAY,
  HSD_RED,
} from "@/features/student-portal/styles/tokens";

export function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const studyPrograms = [
    {
      id: "bsc-mi",
      title: "B. Sc. Medieninformatik",
      description: "Informatik trifft auf kreative Mediengestaltung. Entwickeln Sie innovative digitale Lösungen.",
      image: imgCourse,
      buttons: [
        { label: "PO 2018", action: () => setPage("studienverlaufsplan"),disabled: false, },
        { label: "PO 2025", action: () => {},disabled: true }
      ]
    },
    {
      id: "beng-mt",
      title: "B. Eng. Medientechnik",
      description: "Technik und Medien vereint. Von der Audiotechnik bis zur Videoproduktion.",
      color: "#E17055",
      buttons: [
        { label: "PO 2018", action: () => { }, disabled: true,},
        { label: "PO 2025", action: () => { }, disabled: true,}
      ]
    },
    {
      id: "msc-mi",
      title: "M. Sc. Medieninformatik",
      description: "Vertiefen Sie Ihr Wissen in Human-Computer Interaction, Data Science oder Software Engineering.",
      color: "#6C5CE7",
      buttons: [
        { label: "PO 2018", action: () => { },disabled: true, },
        { label: "PO 2025", action: () => { }, disabled: true,}
      ]
    },
    
  ];
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl mb-2" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: HSD_DARK }}>
          Fachbereich Medien
        </h1>
        <p className="text-base" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
          Hochschule Düsseldorf · University of Applied Sciences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studyPrograms.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-lg overflow-hidden flex flex-col"
            style={{
              border: `2px solid ${HSD_BORDER_LIGHT}`,
              boxShadow: "0 2px 4px rgba(0,0,0,0.08)"
            }}
          >
            {/* Header/Image */}
            <div
              className="h-48 flex items-center justify-center"
              style={program.image
                ? { backgroundImage: `url(${program.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                : { backgroundColor: program.color || HSD_BLUE }
              }
            >
              {!program.image && (
                <span className="text-white text-3xl font-bold opacity-70">
                  {program.title.substring(0, 3)}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
                {program.title}
              </h2>
              <p className="text-sm leading-relaxed mb-6 flex-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
                {program.description}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                {program.buttons.map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={btn.action}
                    disabled={btn.disabled}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:opacity-90"
                    style={{
                      backgroundColor: idx === 0 ? HSD_RED : HSD_BLUE,
                      color: "white",
                      fontFamily: "'Segoe UI', sans-serif"
                    }}
                    >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}