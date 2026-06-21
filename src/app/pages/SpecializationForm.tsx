import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Search, CheckCircle2, ChevronRight, Eye, Download, X } from "lucide-react";
import { useFormState } from "../context/FormContext";

const mockModules = [
  {
    id: "m1",
    name: "Web Engineering",
    tags: ["Web", "Software Architektur"],
    programs: ["BMI-PO 2018", "BMI-PO 2025", "MMI-PO 2025"]
  },
  {
    id: "m2",
    name: "Einführung Künstliche Intelligenz",
    tags: ["KI", "Python"],
    programs: ["BMI-PO 2025", "BMT-PO 2025", "DAISY-PO 2018", "DAISY-PO 2025"]
  },
  {
    id: "m3",
    name: "User Experience Design",
    tags: ["UX", "Design"],
    programs: ["BMI-PO 2018", "BMI-PO 2025", "BMT-PO 2018", "BMT-PO 2025", "MMI-PO 2018", "MMI-PO 2025"]
  },
  {
    id: "m4",
    name: "Mobile App-Entwicklung",
    tags: ["App-Entwicklung", "UX"],
    programs: ["BMI-PO 2025", "BMT-PO 2025"]
  },
];

const availableTags = ["Java", "Web", "KI", "UX", "Datenbanken", "App-Entwicklung"];
const PROGRAMS = ["BMI", "BMT", "BTB", "DAISY", "MMI", "TRADY"];
const PO_YEARS = ["PO 2018", "PO 2025"];

export default function SpecializationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = new URLSearchParams(location.search).get("edit") === "true";
  const { specializationData, updateSpecializationData } = useFormState();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const selectedPrograms: string[] = specializationData.studyPrograms || [];

  const filteredModules = mockModules.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = activeTags.length === 0 || activeTags.some(tag => m.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const handleNext = () => navigate("preview");

  const handleMoodleImport = () => {
    if (!specializationData.moodleId) return;
    alert("Moodle-Daten erfolgreich aus ID " + specializationData.moodleId + " importiert.");
    updateSpecializationData({
      moodleLink: "https://moodle.hochschule.de/course/view.php?id=" + specializationData.moodleId,
      extraNotes: specializationData.extraNotes || "Importierte Notizen aus Moodle...",
    });
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00afd7] focus:border-transparent";
  const textareaClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00afd7] focus:border-transparent resize-vertical";
  const labelClass = "block text-xs font-semibold mb-1";

  return (
    <div className="mx-auto max-w-5xl pb-20">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("select-type")}
            className="-ml-4 mb-4 px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            style={{ color: '#00718b', fontSize: '14px' }}
          >
            ← Zurück zur Auswahl
          </button>
          <h1 style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, fontSize: '32px', color: '#e3000f' }}>
            {isEditMode ? "Vertiefung bearbeiten" : "Vertiefung aus Modulhandbuch übernehmen"}
          </h1>
          <p className="mt-2" style={{ color: '#6a737b', fontSize: '14px' }}>
            Suchen Sie ein bestehendes Modul und ergänzen Sie die semesterbezogenen Daten.
          </p>
        </div>
        {specializationData.selectedModule && (
          <button
            onClick={() => navigate("preview")}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#00afd7', color: '#00afd7', fontSize: '14px' }}
          >
            <Eye className="h-4 w-4" /> Vorschau ansehen
          </button>
        )}
      </div>

      {/* Step 1: Module Search */}
      {!specializationData.selectedModule ? (
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-6 mb-6">
          <h2 className="font-bold mb-4 pb-3 border-b" style={{ color: '#1d2125', fontSize: '16px', borderColor: '#dee2e6', fontFamily: "'Segoe UI', sans-serif" }}>
            Modul aus Modulhandbuch wählen
          </h2>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#6a737b' }} />
            <input
              type="text"
              placeholder="Modul suchen (z.B. nach Name oder Kürzel)..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00afd7] focus:border-transparent"
              style={{ fontSize: '14px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs font-semibold py-1 mr-1" style={{ color: '#6a737b' }}>Filter:</span>
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
                style={{
                  backgroundColor: activeTags.includes(tag) ? '#00afd7' : 'transparent',
                  borderColor: activeTags.includes(tag) ? '#00afd7' : '#dee2e6',
                  color: activeTags.includes(tag) ? '#fff' : '#6a737b'
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Module List */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {filteredModules.map((mod, idx) => (
              <div
                key={mod.id}
                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#f4f6f8] transition-colors ${idx !== filteredModules.length - 1 ? 'border-b border-gray-100' : ''}`}
                onClick={() => updateSpecializationData({ selectedModule: mod, studyPrograms: mod.programs })}
              >
                <div className="flex-1">
                  <div className="font-medium mb-1" style={{ color: '#1d2125', fontSize: '15px' }}>{mod.name}</div>
                  <div className="flex gap-2 flex-wrap">
                    {mod.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#e0f4f8', color: '#005b70' }}>{t}</span>
                    ))}
                    <span className="text-xs" style={{ color: '#6a737b' }}>{mod.programs.length} Studiengänge</span>
                  </div>
                </div>
                <button
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-md border hover:bg-[#e0f4f8] transition-colors ml-4"
                  style={{ borderColor: '#00afd7', color: '#00afd7', fontSize: '13px' }}
                >
                  Übernehmen <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ))}
            {filteredModules.length === 0 && (
              <div className="p-8 text-center" style={{ color: '#6a737b', fontSize: '14px' }}>
                Keine Module gefunden. Bitte passen Sie Ihre Suche an.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Selected Module Banner */}
          <div className="bg-white rounded-lg border border-[#00afd7] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: '#00afd7' }} />
              <div>
                <div className="font-semibold" style={{ color: '#1d2125', fontSize: '14px' }}>
                  Modul ausgewählt: {specializationData.selectedModule.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#6a737b' }}>
                  Moduldaten wurden automatisch aus dem Modulhandbuch übernommen
                </div>
              </div>
            </div>
            <button
              onClick={() => updateSpecializationData({ selectedModule: null })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#dee2e6', color: '#6a737b', fontSize: '13px' }}
            >
              <X className="h-3.5 w-3.5" /> Ändern
            </button>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Read-only module data */}
            <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-6">
              <div className="flex justify-between items-center mb-4 pb-3 border-b" style={{ borderColor: '#dee2e6' }}>
                <h2 className="font-bold" style={{ color: '#1d2125', fontSize: '15px', fontFamily: "'Segoe UI', sans-serif" }}>
                  Moduldaten (aus MHB/PO)
                </h2>
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#f4f6f8', color: '#6a737b', border: '1px solid #dee2e6' }}>
                  Read-only
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Modulname</div>
                  <div style={{ color: '#1d2125', fontSize: '14px' }}>{specializationData.selectedModule.name}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Studiengang</div>
                  <div style={{ color: '#1d2125', fontSize: '14px' }}>Medieninformatik (BMI 2025)</div>
                </div>
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Modulkategorie</div>
                  <div style={{ color: '#1d2125', fontSize: '14px' }}>Vertiefung / Wahlpflicht</div>
                </div>
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Prüfungsform</div>
                  <div style={{ color: '#1d2125', fontSize: '14px' }}>Portfolioprüfung (Projektarbeit & Präsentation)</div>
                </div>
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Inhalte und Ziele</div>
                  <div style={{ color: '#6a737b', fontSize: '13px', lineHeight: 1.6 }}>
                    Die Studierenden erlernen fortgeschrittene Konzepte. Sie sind in der Lage, komplexe Architekturen zu planen und umzusetzen. Der Fokus liegt auf praxisnaher Anwendung in agilen Teams.
                  </div>
                </div>
                <div className="pt-3 border-t" style={{ borderColor: '#dee2e6' }}>
                  <p className="text-xs italic" style={{ color: '#adb5bd' }}>
                    Diese Daten sind an das Modulhandbuch gebunden und können hier nicht bearbeitet werden.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Editable semester data */}
            <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-6">
              <h2 className="font-bold mb-4 pb-3 border-b" style={{ color: '#1d2125', fontSize: '15px', borderColor: '#dee2e6', fontFamily: "'Segoe UI', sans-serif" }}>
                Semesterbezogene Angaben
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="places" className={labelClass} style={{ color: '#6a737b' }}>Plätze</label>
                    <input
                      id="places"
                      type="number"
                      value={specializationData.places}
                      onChange={e => updateSpecializationData({ places: e.target.value })}
                      className={inputClass}
                      style={{ fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="appType" className={labelClass} style={{ color: '#6a737b' }}>Bewerbungsart</label>
                    <select
                      id="appType"
                      value={specializationData.applicationType}
                      onChange={e => updateSpecializationData({ applicationType: e.target.value })}
                      className={inputClass}
                      style={{ fontSize: '14px' }}
                    >
                      <option>Direkte Anmeldung</option>
                      <option>Losverfahren</option>
                      <option>Motivationsschreiben</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="meetings" className={labelClass} style={{ color: '#6a737b' }}>Termine</label>
                  <input
                    id="meetings"
                    type="text"
                    value={specializationData.meetings}
                    onChange={e => updateSpecializationData({ meetings: e.target.value })}
                    className={inputClass}
                    style={{ fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label htmlFor="loc" className={labelClass} style={{ color: '#6a737b' }}>Ort / Raum</label>
                  <input
                    id="loc"
                    type="text"
                    value={specializationData.location}
                    onChange={e => updateSpecializationData({ location: e.target.value })}
                    className={inputClass}
                    style={{ fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label htmlFor="moodleId" className={labelClass} style={{ color: '#6a737b' }}>Moodle-Import (Kurs-ID)</label>
                  <div className="flex gap-2">
                    <input
                      id="moodleId"
                      type="text"
                      value={specializationData.moodleId || ""}
                      onChange={e => updateSpecializationData({ moodleId: e.target.value })}
                      placeholder="z.B. 4512"
                      className={inputClass}
                      style={{ fontSize: '14px' }}
                    />
                    <button
                      onClick={handleMoodleImport}
                      className="px-4 py-2 rounded-md font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap"
                      style={{ backgroundColor: '#00afd7', fontSize: '14px' }}
                    >
                      <Download className="h-4 w-4" /> Import
                    </button>
                  </div>
                  {specializationData.moodleLink && (
                    <p className="text-xs mt-1" style={{ color: '#155724' }}>Verknüpft: {specializationData.moodleLink}</p>
                  )}
                </div>

                {/* Gruppenwunsch */}
                <div className="flex items-center justify-between p-3 border rounded-md" style={{ borderColor: '#dee2e6', backgroundColor: '#f4f6f8' }}>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#1d2125' }}>Gruppenwunsch erlaubt</div>
                    <div className="text-xs" style={{ color: '#6a737b' }}>Studierende können Partner angeben</div>
                  </div>
                  <button
                    onClick={() => updateSpecializationData({ groupWish: !specializationData.groupWish })}
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#00afd7] focus:ring-offset-1"
                    style={{ backgroundColor: specializationData.groupWish ? '#00afd7' : '#dee2e6' }}
                  >
                    <span
                      className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm"
                      style={{ transform: specializationData.groupWish ? 'translateX(24px)' : 'translateX(4px)' }}
                    />
                  </button>
                </div>

                <div>
                  <label htmlFor="notes" className={labelClass} style={{ color: '#6a737b' }}>Zusatzhinweise für Studierende</label>
                  <textarea
                    id="notes"
                    value={specializationData.extraNotes}
                    onChange={e => updateSpecializationData({ extraNotes: e.target.value })}
                    className={textareaClass}
                    rows={3}
                    style={{ fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label htmlFor="masterNotes" className={labelClass} style={{ color: '#6a737b' }}>Hinweise für Masterstudenten</label>
                  <textarea
                    id="masterNotes"
                    value={specializationData.masterStudentNotes || ""}
                    onChange={e => updateSpecializationData({ masterStudentNotes: e.target.value })}
                    placeholder="z.B. Erweiterte Anforderungen für Master-Studierende..."
                    className={textareaClass}
                    rows={3}
                    style={{ fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label htmlFor="reuseRule" className={labelClass} style={{ color: '#6a737b' }}>Weiterverwendung in Folgesemestern</label>
                  <select
                    id="reuseRule"
                    value={specializationData.reuseRule || "none"}
                    onChange={e => updateSpecializationData({ reuseRule: e.target.value })}
                    className={inputClass}
                    style={{ fontSize: '14px' }}
                  >
                    <option value="none">Nur dieses Semester (Keine Wiederholung)</option>
                    <option value="auto">Automatisch ins nächste Semester übernehmen</option>
                    <option value="ask">Vor dem nächsten Semester nachfragen</option>
                  </select>
                </div>

                {/* Notify students – only in edit mode */}
                {isEditMode && (
                  <div className="flex items-center justify-between p-4 border rounded-md mt-2" style={{ backgroundColor: '#fff5f5', borderColor: '#fca5a5' }}>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: '#991b1b' }}>Studierende benachrichtigen</div>
                      <div className="text-xs" style={{ color: '#b91c1c' }}>Bei Speicherung werden Bewerber über Änderungen informiert.</div>
                    </div>
                    <button
                      onClick={() => updateSpecializationData({ notifyStudents: !specializationData.notifyStudents })}
                      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                      style={{ backgroundColor: specializationData.notifyStudents ? '#e3000f' : '#dee2e6' }}
                    >
                      <span
                        className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm"
                        style={{ transform: specializationData.notifyStudents ? 'translateX(24px)' : 'translateX(4px)' }}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Study Programs Matrix (read-only) */}
          <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-6">
            <div className="flex justify-between items-center mb-4 pb-3 border-b" style={{ borderColor: '#dee2e6' }}>
              <h2 className="font-bold" style={{ color: '#1d2125', fontSize: '15px', fontFamily: "'Segoe UI', sans-serif" }}>
                Studiengänge & WPM-Zuordnung
              </h2>
              <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#f4f6f8', color: '#6a737b', border: '1px solid #dee2e6' }}>
                Read-only (aus Modulhandbuch)
              </span>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-100 border-b" style={{ borderColor: '#dee2e6' }}>
                <div className="p-3 font-semibold" style={{ color: '#1d2125', fontSize: '14px' }}>Studiengang</div>
                {PO_YEARS.map(po => (
                  <div key={po} className="p-3 font-semibold text-center border-l" style={{ color: '#1d2125', fontSize: '14px', borderColor: '#dee2e6' }}>
                    {po}
                  </div>
                ))}
              </div>
              {PROGRAMS.map(prog => (
                <div key={prog} className="grid grid-cols-3 border-b last:border-0" style={{ borderColor: '#dee2e6' }}>
                  <div className="p-3 font-medium flex items-center" style={{ color: '#1d2125', fontSize: '14px' }}>{prog}</div>
                  {PO_YEARS.map(po => {
                    const id = `${prog}-${po}`;
                    const isChecked = selectedPrograms.includes(id);
                    return (
                      <div key={id} className="p-3 border-l flex items-center justify-center" style={{ borderColor: '#dee2e6', backgroundColor: isChecked ? '#f0fdf4' : '#fafafa' }}>
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className="w-4 h-4 rounded border-2 flex items-center justify-center"
                            style={{
                              borderColor: isChecked ? '#155724' : '#dee2e6',
                              backgroundColor: isChecked ? '#155724' : 'transparent'
                            }}
                          >
                            {isChecked && (
                              <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
                                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          {isChecked && (
                            <span className="text-[10px] font-semibold" style={{ color: '#155724' }}>Zugeordnet</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Action Bar */}
      {specializationData.selectedModule && (
        <div className="mt-8 flex justify-between items-center bg-white p-4 rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] sticky bottom-6 z-10">
          <span className="text-sm" style={{ color: '#6a737b' }}>Alle Änderungen werden automatisch im Entwurf gespeichert.</span>
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-lg font-bold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#00afd7', fontSize: '14px' }}
          >
            Weiter zur Überprüfung
          </button>
        </div>
      )}
    </div>
  );
}
