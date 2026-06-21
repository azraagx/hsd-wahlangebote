import { useNavigate, useLocation } from "react-router";
import { useMemo } from "react";
import { useFormState } from "../context/FormContext";
import { Info, Eye, Download, AlertTriangle } from "lucide-react";

const PROGRAMS = ["BMI", "BMT", "BTB", "DAISY", "MMI", "TRADY"];
const PO_YEARS = ["PO 2018", "PO 2025"];

export default function ProjectForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const isExistingMode = new URLSearchParams(location.search).get("mode") === "existing";
  const isEditMode = new URLSearchParams(location.search).get("edit") === "true";
  const { projectData, updateProjectData, getSavedItems, loadProject } = useFormState();

  const savedProjects = useMemo(() => getSavedItems().filter(i => i.itemType === 'project'), [getSavedItems]);

  const handleNext = () => {
    navigate("preview");
  };

  const selectedProjectTypes: string[] = Array.isArray(projectData.type) ? projectData.type : [projectData.type];

  const toggleProjectType = (projectType: string) => {
    if (selectedProjectTypes.includes(projectType)) {
      const updated = selectedProjectTypes.filter(t => t !== projectType);
      updateProjectData({ type: updated });
    } else {
      updateProjectData({ type: [...selectedProjectTypes, projectType] });
    }
  };

  const hasInformatikprojekt = selectedProjectTypes.some(type =>
    type === "Informatikprojekt 1" || type === "Informatikprojekt 2"
  );

  const hasMedienprojekt = selectedProjectTypes.some(type =>
    type === "Medienprojekt A" || type === "Medienprojekt B"
  );

  const showInfoAlert = hasInformatikprojekt;
  const isCombination = hasInformatikprojekt && hasMedienprojekt;

  const selectedPrograms: string[] = projectData.studyPrograms || [];

  const toggleProgram = (id: string) => {
    if (selectedPrograms.includes(id)) {
      updateProjectData({ studyPrograms: selectedPrograms.filter(p => p !== id) });
    } else {
      updateProjectData({ studyPrograms: [...selectedPrograms, id] });
    }
  };

  const isMasterSelected = selectedPrograms.some(p => p.startsWith("MMI") || p.startsWith("DAISY") || p.startsWith("TRADY"));
  const isBachelorSelected = selectedPrograms.some(p => !p.startsWith("MMI") && !p.startsWith("DAISY") && !p.startsWith("TRADY"));

  const showMasterWarning = isMasterSelected && isBachelorSelected;
  const isNextDisabled = showMasterWarning && (!projectData.masterExtraEffort || projectData.masterExtraEffort.trim() === "");

  const handleMoodleImport = () => {
    if (!projectData.moodleId) return;
    alert("Moodle-Daten erfolgreich aus ID " + projectData.moodleId + " importiert.");
    updateProjectData({
      moodleLink: "https://moodle.hochschule.de/course/view.php?id=" + projectData.moodleId,
      description: projectData.description || "Importierte Beschreibung aus Moodle...",
    });
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00afd7] focus:border-transparent";
  const textareaClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00afd7] focus:border-transparent resize-vertical";
  const labelClass = "block text-xs font-semibold mb-1";

  return (
    <div className="mx-auto max-w-5xl pb-20">
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
            {isEditMode ? "Angebot bearbeiten" : isExistingMode ? "Vorhandenes Projekt fortführen" : "Neues Projekt anlegen"}
          </h1>
          <p className="mt-2" style={{ color: '#6a737b', fontSize: '14px' }}>
            Erfassen Sie die Details für Ihr Projektangebot.
          </p>
        </div>
        <button
          onClick={() => navigate("preview")}
          className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-gray-50 transition-colors"
          style={{ borderColor: '#00afd7', color: '#00afd7', fontSize: '14px' }}
        >
          <Eye className="h-4 w-4" /> Vorschau ansehen
        </button>
      </div>

      {isExistingMode && (
        <div className="mb-6 bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-6">
          <label className={labelClass} style={{ color: '#1d2125' }}>Vorhandenes Projekt auswählen</label>
          <select
            className={inputClass}
            style={{ maxWidth: '600px', fontSize: '14px' }}
            onChange={(e) => {
              const value = e.target.value;

              if (value.startsWith("project-")) {
                loadProject(value);
              } else if (value === "proj1") {
                updateProjectData({
                  name: "Web-App Entwicklung mit React",
                  type: ["Informatikprojekt 1", "Informatikprojekt 2"],
                  description: "Entwicklung einer modernen Web-Anwendung mit React und Tailwind CSS.",
                  goals: "Die Studierenden lernen moderne Web-Technologien kennen und können eine vollständige Anwendung entwickeln.",
                  content: "React, Tailwind CSS, REST-APIs, Git, Deployment",
                  requirements: "Grundlagen der Programmierung (z.B. aus Programmieren 1)",
                  studyPrograms: ["BMI-PO 2025", "MMI-PO 2025"],
                  masterExtraEffort: "Eine zusätzliche Ausarbeitung im Umfang von 10 Seiten über erweiterte React-Patterns.",
                  minPlaces: "5",
                  maxPlaces: "20",
                  firstMeeting: "15.10.2026, 10:00 Uhr",
                  regularMeeting: "Dienstags, 10:00 - 11:30 Uhr",
                  location: "Raum A01",
                  applicationType: "Motivationsschreiben",
                  motivationLetterTemplate: "Bitte beschreiben Sie Ihre Vorkenntnisse in Web-Technologien und warum Sie an diesem Projekt teilnehmen möchten.",
                  moodleId: "4512",
                  moodleLink: "https://moodle.hochschule.de/course/view.php?id=4512",
                  reuseRule: "winter",
                  notifyStudents: false
                });
              } else if (value === "proj2") {
                updateProjectData({
                  name: "KI in der Bildgebung",
                  type: ["Medienprojekt A", "Medienprojekt B"],
                  description: "Forschungsprojekt zur Anwendung von KI-Modellen in der medizinischen Bildgebung.",
                  goals: "Verstehen von KI-Algorithmen im medizinischen Kontext und praktische Anwendung.",
                  content: "Machine Learning, Computer Vision, medizinische Bildverarbeitung, Python",
                  requirements: "Kenntnisse in Programmierung, Interesse an KI und Medizin",
                  studyPrograms: ["BMT-PO 2018"],
                  masterExtraEffort: "",
                  minPlaces: "3",
                  maxPlaces: "10",
                  firstMeeting: "16.10.2026, 14:00 Uhr",
                  regularMeeting: "Mittwochs, 14:00 - 16:00 Uhr",
                  location: "Labor B12",
                  applicationType: "Direkte Anmeldung",
                  motivationLetterTemplate: "",
                  moodleId: "",
                  moodleLink: "",
                  reuseRule: "summer",
                  notifyStudents: false
                });
              }
            }}
          >
            <option value="">-- Bitte wählen --</option>
            <optgroup label="Beispielprojekte">
              <option value="proj1">WiSe 23/24 - Web-App Entwicklung mit React (Prof. Schmidt)</option>
              <option value="proj2">SoSe 23 - KI in der Bildgebung (Prof. Müller)</option>
            </optgroup>
            {savedProjects.length > 0 && (
              <optgroup label="Gespeicherte Projekte">
                {savedProjects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.semester} - {project.name}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
          <p className="text-xs mt-2" style={{ color: '#6a737b' }}>
            Die Daten des gewählten Projekts werden in das Formular geladen und können angepasst werden.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {/* Allgemeine Angaben */}
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-6">
          <h2 className="text-lg font-bold mb-4 pb-3 border-b" style={{ color: '#1d2125', borderColor: '#dee2e6' }}>
            Allgemeine Angaben
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="projectName" className={labelClass} style={{ color: '#6a737b' }}>Projektname</label>
              <input
                id="projectName"
                type="text"
                value={projectData.name}
                onChange={e => updateProjectData({ name: e.target.value })}
                placeholder="z.B. Mixed Reality Art"
                className={inputClass}
                style={{ fontSize: '14px' }}
              />
            </div>

            <div>
              <label className={labelClass} style={{ color: '#6a737b' }}>Projektart(en)</label>
              <div className="grid grid-cols-2 gap-3">
                {["Informatikprojekt 1", "Informatikprojekt 2", "Medienprojekt A", "Medienprojekt B"].map(projectType => {
                  const isChecked = selectedProjectTypes.includes(projectType);
                  return (
                    <div
                      key={projectType}
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${
                        isChecked ? 'border-[#00afd7] bg-[#e0f4f8]' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => toggleProjectType(projectType)}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleProjectType(projectType)}
                          className="w-4 h-4"
                          style={{ accentColor: '#00afd7' }}
                        />
                        <div className="flex-1">
                          <div className="font-medium" style={{ color: '#1d2125', fontSize: '14px' }}>{projectType}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {showInfoAlert && (
              <div className="bg-[#e0f4f8] border border-[#00afd7] rounded-lg p-4 flex gap-3">
                <Info className="h-5 w-5 shrink-0 mt-0.5" style={{ color: '#00afd7' }} />
                <div>
                  <div className="font-semibold mb-1" style={{ color: '#005b70', fontSize: '14px' }}>
                    Hinweis zum Anfängerniveau
                  </div>
                  <p style={{ color: '#005b70', fontSize: '14px' }}>
                    {isCombination
                      ? "Da Sie dieses Angebot auch als Informatikprojekt anbieten möchten, muss es anfängerfreundlich formuliert sein. Bitte Voraussetzungen, Lernziele und Aufgaben passend zum Niveau der Informatikprojekte beschreiben."
                      : "Dieses Projekt muss anfängerfreundlich formuliert sein. Bitte Voraussetzungen, Lernziele und Aufgaben passend zum Niveau beschreiben."
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Studiengänge */}
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-6">
          <h2 className="text-lg font-bold mb-4 pb-3 border-b" style={{ color: '#1d2125', borderColor: '#dee2e6' }}>
            Studiengänge & WPM-Zuordnung
          </h2>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-100 border-b">
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
                    <div key={id} className="p-3 border-l flex items-center justify-center" style={{ borderColor: '#dee2e6' }}>
                      <div className="flex flex-col items-center gap-1">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleProgram(id)}
                          className="w-4 h-4"
                          style={{ accentColor: '#00afd7' }}
                        />
                        {isChecked && (
                          <span className="text-[10px] font-semibold" style={{ color: '#155724' }}>Ausgewählt</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {showMasterWarning && (
            <div className="mt-4 bg-amber-50 border border-amber-400 rounded-lg p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
              <div className="flex-1">
                <div className="font-semibold mb-1 text-amber-800" style={{ fontSize: '14px' }}>
                  Achtung: Dies ist ein Bachelor-Modul.
                </div>
                <p className="text-amber-900 mb-3" style={{ fontSize: '14px' }}>
                  Bitte definieren Sie zwingend die Zusatzleistung für Master-Studierende, um dem Master-Niveau gerecht zu werden.
                </p>
                <div>
                  <label htmlFor="masterExtraEffort" className={labelClass} style={{ color: '#6a737b' }}>
                    Zusatzleistung für Master-Studierende *
                  </label>
                  <textarea
                    id="masterExtraEffort"
                    value={projectData.masterExtraEffort || ""}
                    onChange={e => updateProjectData({ masterExtraEffort: e.target.value })}
                    placeholder="z.B. Zusätzliche 10-seitige wissenschaftliche Ausarbeitung..."
                    className={textareaClass}
                    rows={3}
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Inhalte & Ziele */}
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-6">
          <h2 className="text-lg font-bold mb-4 pb-3 border-b" style={{ color: '#1d2125', borderColor: '#dee2e6' }}>
            Inhalte & Ziele
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="description" className={labelClass} style={{ color: '#6a737b' }}>Kurzbeschreibung</label>
              <textarea
                id="description"
                value={projectData.description}
                onChange={e => updateProjectData({ description: e.target.value })}
                className={textareaClass}
                rows={3}
                style={{ fontSize: '14px' }}
              />
            </div>
            <div>
              <label htmlFor="goals" className={labelClass} style={{ color: '#6a737b' }}>Lernziele</label>
              <textarea
                id="goals"
                value={projectData.goals}
                onChange={e => updateProjectData({ goals: e.target.value })}
                className={textareaClass}
                rows={3}
                style={{ fontSize: '14px' }}
              />
            </div>
            <div>
              <label htmlFor="content" className={labelClass} style={{ color: '#6a737b' }}>Inhalte</label>
              <textarea
                id="content"
                value={projectData.content}
                onChange={e => updateProjectData({ content: e.target.value })}
                className={textareaClass}
                rows={3}
                style={{ fontSize: '14px' }}
              />
            </div>
            <div>
              <label htmlFor="requirements" className={labelClass} style={{ color: '#6a737b' }}>Voraussetzungen</label>
              <textarea
                id="requirements"
                value={projectData.requirements}
                onChange={e => updateProjectData({ requirements: e.target.value })}
                className={textareaClass}
                rows={3}
                style={{ fontSize: '14px' }}
              />
            </div>
          </div>
        </div>

        {/* Organisation */}
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-6">
          <h2 className="text-lg font-bold mb-4 pb-3 border-b" style={{ color: '#1d2125', borderColor: '#dee2e6' }}>
            Organisation
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="minPlaces" className={labelClass} style={{ color: '#6a737b' }}>Min. Plätze</label>
              <input
                id="minPlaces"
                type="number"
                value={projectData.minPlaces}
                onChange={e => updateProjectData({ minPlaces: e.target.value })}
                className={inputClass}
                style={{ fontSize: '14px' }}
              />
            </div>
            <div>
              <label htmlFor="maxPlaces" className={labelClass} style={{ color: '#6a737b' }}>Max. Plätze</label>
              <input
                id="maxPlaces"
                type="number"
                value={projectData.maxPlaces}
                onChange={e => updateProjectData({ maxPlaces: e.target.value })}
                className={inputClass}
                style={{ fontSize: '14px' }}
              />
            </div>
            <div>
              <label htmlFor="firstMeeting" className={labelClass} style={{ color: '#6a737b' }}>Erstes Treffen (Kick-off)</label>
              <input
                id="firstMeeting"
                type="text"
                value={projectData.firstMeeting}
                onChange={e => updateProjectData({ firstMeeting: e.target.value })}
                className={inputClass}
                style={{ fontSize: '14px' }}
              />
            </div>
            <div>
              <label htmlFor="regularMeeting" className={labelClass} style={{ color: '#6a737b' }}>Regelmäßige Treffen</label>
              <input
                id="regularMeeting"
                type="text"
                value={projectData.regularMeeting}
                onChange={e => updateProjectData({ regularMeeting: e.target.value })}
                className={inputClass}
                style={{ fontSize: '14px' }}
              />
            </div>
            <div>
              <label htmlFor="location" className={labelClass} style={{ color: '#6a737b' }}>Ort / Raum</label>
              <input
                id="location"
                type="text"
                value={projectData.location}
                onChange={e => updateProjectData({ location: e.target.value })}
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
                  value={projectData.moodleId || ""}
                  onChange={e => updateProjectData({ moodleId: e.target.value })}
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
              {projectData.moodleLink && (
                <p className="text-xs mt-1" style={{ color: '#155724' }}>Verknüpft: {projectData.moodleLink}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bewerbung & Verwaltung */}
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-6">
          <h2 className="text-lg font-bold mb-4 pb-3 border-b" style={{ color: '#1d2125', borderColor: '#dee2e6' }}>
            Bewerbung & Verwaltung
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label htmlFor="applicationType" className={labelClass} style={{ color: '#6a737b' }}>Bewerbungsart</label>
                <select
                  id="applicationType"
                  value={projectData.applicationType}
                  onChange={e => updateProjectData({ applicationType: e.target.value })}
                  className={inputClass}
                  style={{ fontSize: '14px' }}
                >
                  <option value="Direkte Anmeldung">Direkte Anmeldung</option>
                  <option value="Motivationsschreiben">Motivationsschreiben</option>
                </select>
              </div>

              {projectData.applicationType === "Motivationsschreiben" && (
                <div className="animate-in fade-in">
                  <label htmlFor="motivationLetterTemplate" className={labelClass} style={{ color: '#6a737b' }}>
                    Erwartungen an das Motivationsschreiben
                  </label>
                  <textarea
                    id="motivationLetterTemplate"
                    value={projectData.motivationLetterTemplate}
                    onChange={e => updateProjectData({ motivationLetterTemplate: e.target.value })}
                    placeholder="Was sollen die Studierenden beantworten?"
                    className={textareaClass}
                    rows={4}
                    style={{ fontSize: '14px' }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="reuseRule" className={labelClass} style={{ color: '#6a737b' }}>
                  Weiterverwendung in Folgesemestern
                </label>
                <select
                  id="reuseRule"
                  value={projectData.reuseRule || "none"}
                  onChange={e => updateProjectData({ reuseRule: e.target.value })}
                  className={inputClass}
                  style={{ fontSize: '14px' }}
                >
                  <option value="summer">Jedes Sommersemester</option>
                  <option value="winter">Jedes Wintersemester</option>
                  <option value="every">In jedem Semester</option>
                  <option value="none">Nur in diesem Semester (keine Wiederholung)</option>
                </select>
              </div>

              {isEditMode && (
                <div className="flex items-center justify-between p-4 border rounded-md bg-red-50 border-red-200">
                  <div>
                    <div className="text-sm font-semibold text-red-900">Studierende benachrichtigen</div>
                    <div className="text-xs text-red-700">Bei Speicherung werden Bewerber über Änderungen informiert.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={projectData.notifyStudents || false}
                    onChange={e => updateProjectData({ notifyStudents: e.target.checked })}
                    className="w-10 h-5"
                    style={{ accentColor: '#e3000f' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-8 flex justify-between items-center bg-white p-4 rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] sticky bottom-6 z-10">
        <span className="text-sm" style={{ color: '#6a737b' }}>Alle Änderungen werden automatisch im Entwurf gespeichert.</span>
        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className="px-8 py-3 rounded-lg font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#00afd7', fontSize: '14px' }}
        >
          Weiter zur Überprüfung
        </button>
      </div>
    </div>
  );
}
