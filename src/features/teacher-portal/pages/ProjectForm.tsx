import { useNavigate, useLocation } from "react-router";
import { useMemo } from "react";
import { useFormState } from "../context/FormContext";
import { Info, Eye, AlertTriangle } from "lucide-react";
import { getProjectTypeLabel, makeProjectTypeValue } from "../utils/projectTypes";

const PROGRAMS = ["BMI", "BMT", "BTB", "DAISY", "MMI"];
const PO_YEARS = ["PO 2018", "PO 2025"];

type ProjectTypeOption = { label: string; value: string; credits?: string };

const projectTypeOption = (programPoId: string, label: string, credits: string): ProjectTypeOption => ({
  label,
  value: makeProjectTypeValue(programPoId, label),
  credits
});

const PROGRAM_PROJECT_TYPES: Record<string, ProjectTypeOption[]> = {
  "BMI-PO 2018": [
    projectTypeOption("BMI-PO 2018", "Informatikprojekt 1", "5 CP"),
    projectTypeOption("BMI-PO 2018", "Informatikprojekt 2", "5 CP"),
    projectTypeOption("BMI-PO 2018", "Medienprojekt A/B", "5 CP")
  ],
  "BMI-PO 2025": [
    projectTypeOption("BMI-PO 2025", "Informatikprojekt 1", "5 CP"),
    projectTypeOption("BMI-PO 2025", "Informatikprojekt 2", "5 CP"),
    projectTypeOption("BMI-PO 2025", "Medienprojekt A/B", "5 CP")
  ],
  "BTB-PO 2018": [
    projectTypeOption("BTB-PO 2018", "Projekt 5 CP", "5 CP"),
    projectTypeOption("BTB-PO 2018", "Projekt 10 CP", "10 CP")
  ],
  "BTB-PO 2025": [
    projectTypeOption("BTB-PO 2025", "Projekt A/B", "5 CP"),
    projectTypeOption("BTB-PO 2025", "Projekterweiterung A/B", "5 CP")
  ],
  "BMT-PO 2018": [
    projectTypeOption("BMT-PO 2018", "Medienprojekt A/B", "5 CP"),
    projectTypeOption("BMT-PO 2018", "Medienprojekt A1/B1", "5 CP"),
    projectTypeOption("BMT-PO 2018", "Medienprojekt A2/B2", "5 CP")
  ],
  "BMT-PO 2025": [
    projectTypeOption("BMT-PO 2025", "Basisprojekt", "5 CP"),
    projectTypeOption("BMT-PO 2025", "Projekt Medientechnik", "5 CP"),
    projectTypeOption("BMT-PO 2025", "Medientechnik Erweiterung", "5 CP")
  ],
  "MMI-PO 2018": [
    projectTypeOption("MMI-PO 2018", "Masterprojekt 1", "10 CP"),
    projectTypeOption("MMI-PO 2018", "Masterprojekt 2", "10 CP"),
    projectTypeOption("MMI-PO 2018", "Masterprojekt 3", "10 CP"),
    projectTypeOption("MMI-PO 2018", "Individuelles Projekt", "10 CP")
  ],
  "MMI-PO 2025": [
    projectTypeOption("MMI-PO 2025", "Masterprojekt 1", "10 CP"),
    projectTypeOption("MMI-PO 2025", "Masterprojekt 2", "10 CP"),
    projectTypeOption("MMI-PO 2025", "Masterprojekt 3", "10 CP"),
    projectTypeOption("MMI-PO 2025", "Individuelles Projekt", "10 CP")
  ]
};

export default function ProjectForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const isExistingMode = new URLSearchParams(location.search).get("mode") === "existing";
  const isEditMode = new URLSearchParams(location.search).get("edit") === "true";
  const { projectData, updateProjectData, getSavedItems, loadProject } = useFormState();

  const savedProjects = useMemo(() => getSavedItems().filter(i => i.itemType === 'project'), [getSavedItems]);

  const handleNext = () => {
    navigate("/lehrender/preview");
  };

  const selectedProjectTypes: string[] = (Array.isArray(projectData.type) ? projectData.type : [projectData.type]).filter(Boolean);

  const toggleProjectType = (projectType: string) => {
    if (selectedProjectTypes.includes(projectType)) {
      const updated = selectedProjectTypes.filter(t => t !== projectType);
      updateProjectData({ type: updated });
    } else {
      updateProjectData({ type: [...selectedProjectTypes, projectType] });
    }
  };

  const hasInformatikprojekt = selectedProjectTypes.some(type =>
    getProjectTypeLabel(type) === "Informatikprojekt 1" || getProjectTypeLabel(type) === "Informatikprojekt 2"
  );

  const hasMedienprojekt = selectedProjectTypes.some(type =>
    getProjectTypeLabel(type).includes("Medienprojekt")
  );

  const showInfoAlert = hasInformatikprojekt;
  const isCombination = hasInformatikprojekt && hasMedienprojekt;

  const isMasterSelected = selectedProjectTypes.some(type => 
    getProjectTypeLabel(type).includes("Masterprojekt") || getProjectTypeLabel(type).includes("Individuelles Projekt")
  );
  const isBachelorSelected = selectedProjectTypes.some(type => 
    !getProjectTypeLabel(type).includes("Masterprojekt") && !getProjectTypeLabel(type).includes("Individuelles Projekt")
  );

  const showMasterWarning = isMasterSelected && isBachelorSelected;
  const isNextDisabled = showMasterWarning && (!projectData.masterExtraEffort || projectData.masterExtraEffort.trim() === "");

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00afd7] focus:border-transparent";
  const textareaClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00afd7] focus:border-transparent resize-vertical";
  const labelClass = "block text-xs font-semibold mb-1";

  const clampNonNegative = (value: string) => {
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) return "";
    return Math.max(0, parsed).toString();
  };

  return (
    <div className="mx-auto max-w-5xl pb-20">
      <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/lehrender/select-type")}
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
          onClick={() => navigate("/lehrender/preview")}
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
              }
            }}
          >
            <option value="">-- Bitte wählen --</option>
            {savedProjects.length === 0 ? (
              <option value="" disabled>
                Noch keine Projekte erstellt
              </option>
            ) : (
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

          <div className="space-y-6">
            {PROGRAMS.map(prog => (
              <div key={prog} className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-3 font-semibold" style={{ color: '#1d2125', fontSize: '14px', borderColor: '#dee2e6' }}>
                  {prog}
                </div>
                <div className="grid grid-cols-2 gap-0">
                  {PO_YEARS.map(po => {
                    const programPoId = `${prog}-${po}`;
                    const projectsForThisProgramPo = PROGRAM_PROJECT_TYPES[programPoId] || [];
                    
                    return (
                      <div key={po} className="p-4 border-r border-b last:border-r-0" style={{ borderColor: '#dee2e6' }}>
                        <div className="font-semibold mb-3" style={{ color: '#1d2125', fontSize: '13px' }}>
                          {po}
                        </div>
                        {projectsForThisProgramPo.length > 0 ? (
                          <div className="space-y-2">
                            {projectsForThisProgramPo.map(project => {
                              const isChecked = selectedProjectTypes.includes(project.value);
                              return (
                                <div
                                  key={project.value}
                                  className={`flex items-start gap-2 p-2 rounded cursor-pointer transition-colors ${
                                    isChecked ? 'bg-[#e0f4f8]' : 'hover:bg-gray-50'
                                  }`}
                                  onClick={() => toggleProjectType(project.value)}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleProjectType(project.value)}
                                    onClick={e => e.stopPropagation()}
                                    className="w-4 h-4 mt-0.5"
                                    style={{ accentColor: '#00afd7' }}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium" style={{ color: '#1d2125', fontSize: '12px' }}>
                                      {project.label}
                                    </div>
                                    {project.credits && (
                                      <div className="text-xs" style={{ color: '#6a737b', fontSize: '11px' }}>
                                        {project.credits}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-400" style={{ fontSize: '11px' }}>
                            Keine Projekte verfügbar
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
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
                placeholder="z.B. Entwicklung eines webbasierten Campus-Systems"
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
                placeholder="z.B. Einführung in React und Node.js"
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
                placeholder="z.B. Frontend-Entwicklung, REST-APIs, Deployment"
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
                placeholder="z.B. Grundlagen der Programmierung"
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
                min={0}
                value={projectData.minPlaces}
                onChange={e => updateProjectData({ minPlaces: clampNonNegative(e.target.value) })}
                placeholder="z.B. 5"
                className={inputClass}
                style={{ fontSize: '14px' }}
              />
            </div>
            <div>
              <label htmlFor="maxPlaces" className={labelClass} style={{ color: '#6a737b' }}>Max. Plätze</label>
              <input
                id="maxPlaces"
                type="number"
                min={0}
                value={projectData.maxPlaces}
                onChange={e => updateProjectData({ maxPlaces: clampNonNegative(e.target.value) })}
                placeholder="z.B. 20"
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
                placeholder="z.B. 12.10.2026, 10:00 Uhr"
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
                placeholder="z.B. Dienstags, 10:00 - 11:30 Uhr"
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
                placeholder="z.B. Raum A01"
                className={inputClass}
                style={{ fontSize: '14px' }}
              />
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
                  <option value="">-- Bitte wählen --</option>
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
                    placeholder="z.B. Bitte beschreiben Sie Ihre Vorkenntnisse und warum Sie an diesem Projekt teilnehmen möchten."
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
