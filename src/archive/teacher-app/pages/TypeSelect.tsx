import React from "react";
import { useNavigate } from "react-router";
import { FolderGit2, BookOpen, CopyPlus, Sparkles } from "lucide-react";
import { useFormState } from "../context/FormContext";

export default function TypeSelect() {
  const navigate = useNavigate();
  const { offerType, setOfferType } = useFormState();

  const [projectMode, setProjectMode] = React.useState<"new" | "existing">("new");

  const handleNext = () => {
    if (offerType === "project") {
      navigate(projectMode === "existing" ? "/create-project?mode=existing" : "/create-project");
    }
    if (offerType === "specialization") navigate("/import-specialization");
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <button
          onClick={() => navigate("/")}
          className="-ml-4 mb-4 px-3 py-2 hover:bg-gray-100 rounded transition-colors"
          style={{ color: '#00718b', fontSize: '14px' }}
        >
          ← Zurück zum Dashboard
        </button>
        <h1 style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, fontSize: '32px', color: '#e3000f' }}>
          Angebotsart wählen
        </h1>
        <p className="mt-2" style={{ color: '#6a737b', fontSize: '14px' }}>
          Was möchten Sie für das kommende Semester erstellen?
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Project Option */}
        <div
          className={`bg-white rounded-lg border shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-8 cursor-pointer transition-all hover:shadow-[0px_4px_8px_rgba(0,0,0,0.12)] ${
            offerType === 'project' ? 'border-[#00afd7] ring-2 ring-[#00afd7]/20' : 'border-[rgba(0,0,0,0.13)]'
          }`}
          onClick={() => setOfferType('project')}
        >
          <div className={`mb-6 inline-flex rounded-lg p-3 ${offerType === 'project' ? 'bg-[#e0f4f8]' : 'bg-gray-100'}`}>
            <FolderGit2 className="h-6 w-6" style={{ color: offerType === 'project' ? '#00afd7' : '#6a737b' }} />
          </div>
          <h3 className="mb-3 text-lg font-bold" style={{ color: '#1d2125' }}>Projekt</h3>
          <p className="mb-6" style={{ color: '#6a737b', fontSize: '14px' }}>
            Für Informatikprojekt 1/2 oder Medienprojekt. Die inhaltlichen und organisatorischen Angaben werden manuell für das jeweilige Semester eingetragen.
          </p>

          {offerType === 'project' && (
            <div className="mt-6 pt-6 border-t border-gray-200 animate-in fade-in">
              <div className="text-sm font-semibold mb-4" style={{ color: '#1d2125' }}>Wie möchten Sie fortfahren?</div>
              <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                <div
                  className={`flex items-start gap-3 rounded-md border p-4 cursor-pointer transition-all ${
                    projectMode === 'new' ? 'border-[#00afd7] bg-[#e0f4f8]/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={(e) => { e.stopPropagation(); setProjectMode('new'); }}
                >
                  <div className="mt-1 relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-gray-400">
                    {projectMode === 'new' && <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#00afd7' }} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-medium mb-1" style={{ color: '#1d2125', fontSize: '14px' }}>
                      <Sparkles className="h-4 w-4" style={{ color: '#00afd7' }} />
                      Komplett neues Projekt erstellen
                    </div>
                    <p style={{ color: '#6a737b', fontSize: '12px' }}>Starten Sie mit einem leeren Formular.</p>
                  </div>
                </div>
                <div
                  className={`flex items-start gap-3 rounded-md border p-4 cursor-pointer transition-all ${
                    projectMode === 'existing' ? 'border-[#00afd7] bg-[#e0f4f8]/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={(e) => { e.stopPropagation(); setProjectMode('existing'); }}
                >
                  <div className="mt-1 relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-gray-400">
                    {projectMode === 'existing' && <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#00afd7' }} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-medium mb-1" style={{ color: '#1d2125', fontSize: '14px' }}>
                      <CopyPlus className="h-4 w-4" style={{ color: '#6a737b' }} />
                      Vorhandenes Projekt auswählen & bearbeiten
                    </div>
                    <p style={{ color: '#6a737b', fontSize: '12px' }}>Übernehmen Sie die Daten eines vergangenen Projekts.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Specialization Option */}
        <div
          className={`bg-white rounded-lg border shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-8 cursor-pointer transition-all hover:shadow-[0px_4px_8px_rgba(0,0,0,0.12)] ${
            offerType === 'specialization' ? 'border-[#00afd7] ring-2 ring-[#00afd7]/20' : 'border-[rgba(0,0,0,0.13)]'
          }`}
          onClick={() => setOfferType('specialization')}
        >
          <div className={`mb-6 inline-flex rounded-lg p-3 ${offerType === 'specialization' ? 'bg-[#e0f4f8]' : 'bg-gray-100'}`}>
            <BookOpen className="h-6 w-6" style={{ color: offerType === 'specialization' ? '#00afd7' : '#6a737b' }} />
          </div>
          <h3 className="mb-3 text-lg font-bold" style={{ color: '#1d2125' }}>Vertiefung / Wahlpflichtangebot</h3>
          <p style={{ color: '#6a737b', fontSize: '14px' }}>
            Vorhandene Moduldaten (Inhalte, Ziele, Prüfungsform) können bequem aus dem Modulhandbuch (MHB/PO) übernommen werden.
          </p>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={handleNext}
          disabled={!offerType}
          className="px-8 py-3 rounded-lg font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#00afd7', fontSize: '14px' }}
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
