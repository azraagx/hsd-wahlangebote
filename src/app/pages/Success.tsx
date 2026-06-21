import { useNavigate } from "react-router";
import { CheckCircle, Plus, LayoutDashboard, ExternalLink } from "lucide-react";
import { useFormState } from "../context/FormContext";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function Success() {
  const navigate = useNavigate();
  const { offerType, projectData, specializationData, semesterData, resetFlow, saveProject, saveSpecialization, lastSavedItemId } = useFormState();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00afd7', '#d4edda', '#ffffff']
    });

    if (offerType === 'project') {
      saveProject();
    } else if (offerType === 'specialization') {
      saveSpecialization();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = offerType === 'project'
    ? projectData.name
    : (specializationData.selectedModule?.name || "Unbenanntes Modul");

  const subtitle = offerType === 'project'
    ? Array.isArray(projectData.type) ? projectData.type.join(", ") : projectData.type
    : "Vertiefung / Wahlpflichtangebot";

  const handleCreateAnother = () => {
    resetFlow();
    navigate("select-type");
  };

  const handleDashboard = () => {
    resetFlow();
    navigate("..");
  };

  return (
    <div className="mx-auto max-w-3xl py-12">
      <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] relative overflow-hidden">
        <div className="p-12 text-center flex flex-col items-center">

          <div className="rounded-full bg-[#d4edda] p-4 mb-6">
            <CheckCircle className="h-12 w-12" style={{ color: '#155724' }} />
          </div>

          <h1 className="text-3xl font-bold mb-2" style={{ color: '#1d2125', fontFamily: "'Segoe UI', sans-serif", fontWeight: 700, fontSize: '28px' }}>
            Ihr Angebot wurde veröffentlicht!
          </h1>
          <p className="mb-8 max-w-md" style={{ color: '#6a737b', fontSize: '14px' }}>
            Das Angebot ist nun für Studierende sichtbar und Bewerbungen sind möglich.
          </p>

          <div className="w-full bg-[#f4f6f8] border border-[#dee2e6] rounded-lg p-6 mb-8 text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 border-b pb-2" style={{ color: '#1d2125', borderColor: '#dee2e6', fontFamily: "'Segoe UI', sans-serif", fontWeight: 600 }}>
              Zusammenfassung
            </h3>

            <div className="grid gap-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-xs font-semibold" style={{ color: '#6a737b' }}>Angebot</div>
                <div className="col-span-2 font-medium" style={{ color: '#1d2125', fontSize: '14px' }}>{title}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-xs font-semibold" style={{ color: '#6a737b' }}>Typ</div>
                <div className="col-span-2" style={{ color: '#1d2125', fontSize: '14px' }}>{subtitle}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-xs font-semibold" style={{ color: '#6a737b' }}>Semester</div>
                <div className="col-span-2" style={{ color: '#1d2125', fontSize: '14px' }}>{semesterData.semester}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-xs font-semibold" style={{ color: '#6a737b' }}>Status</div>
                <div className="col-span-2 flex items-center gap-1.5 font-medium" style={{ color: '#155724' }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#28a745' }}></div>
                  <span style={{ fontSize: '14px' }}>Veröffentlicht</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={handleDashboard}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              style={{ color: '#1d2125', fontSize: '14px' }}
            >
              <LayoutDashboard className="h-4 w-4" /> Zur Übersicht
            </button>
            <button
              onClick={() => navigate(lastSavedItemId ? `published/${lastSavedItemId}` : "published")}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              style={{ color: '#1d2125', fontSize: '14px' }}
            >
              <ExternalLink className="h-4 w-4" /> Angebot ansehen
            </button>
            <button
              onClick={handleCreateAnother}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#00afd7', fontSize: '14px' }}
            >
              <Plus className="h-4 w-4" /> Weiteres erstellen
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
