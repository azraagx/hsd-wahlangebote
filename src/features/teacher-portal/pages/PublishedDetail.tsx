import { useNavigate, useParams } from "react-router";
import { Users, FileText, BarChart3, Clock, Eye, FileEdit, CheckCircle2, BookOpen, FolderGit2 } from "lucide-react";
import { useFormState, SavedItem } from "../context/FormContext";
import { useEffect, useState } from "react";
import { mockModules } from "../data/mockModules";
import { getProjectTypeLabel } from "../utils/projectTypes";
import { getMockApplicationsForOffer } from "../data/mockApplications";

export default function PublishedDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getSavedItems, loadProject, setOfferType, updateSpecializationData, setEditingItemId } = useFormState();
  const [item, setItem] = useState<SavedItem | null>(null);

  useEffect(() => {
    const savedItems = getSavedItems();
    let found = savedItems.find(p => p.id === id);
    
    // Falls nicht in saved items, prüfe mock modules
    if (!found) {
      const mockModule = mockModules.find(m => m.id === id);
      if (mockModule) {
        found = {
          id: mockModule.id,
          name: mockModule.name,
          semester: "Wintersemester 26/27",
          itemType: 'specialization' as const,
          data: {
            selectedModule: mockModule,
            studyPrograms: mockModule.programs
          },
          savedAt: new Date().toISOString()
        };
      }
    }
    
    if (found) setItem(found);
  }, [id, getSavedItems]);

  if (!item) {
    return (
      <div className="mx-auto max-w-5xl pb-20">
        <button
          onClick={() => navigate("/lehrender/published")}
          className="-ml-4 mb-4 px-3 py-2 hover:bg-gray-100 rounded transition-colors"
          style={{ color: '#00718b', fontSize: '14px' }}
        >
          ← Zurück zur Übersicht
        </button>
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-12 text-center">
          <p style={{ color: '#6a737b', fontSize: '14px' }}>Angebot nicht gefunden.</p>
        </div>
      </div>
    );
  }

  const isProject = item.itemType === 'project';

  const maxPlaces = parseInt(isProject ? item.data?.maxPlaces || "0" : item.data?.places || "0");
  const meeting = isProject ? item.data?.regularMeeting : (item.data?.meetings || "");
  const location = isProject ? item.data?.location : (item.data?.location || "");
  const applicationType = isProject ? item.data?.applicationType : (item.data?.applicationType || "");
  const projectTypes: string[] = isProject ? (item.data?.type || []) : [];
  const tags: string[] = !isProject ? (item.data?.selectedModule?.tags || []) : [];
  const studyPrograms = !isProject ? (item.data?.studyPrograms || item.data?.selectedModule?.programs || []) : [];
  const specializationDescription = !isProject ? (item.data?.selectedModule?.description || item.data?.description || "") : "";
  const specializationCategory = !isProject ? (item.data?.selectedModule?.category || item.data?.category || "") : "";
  const specializationExamination = !isProject ? (item.data?.selectedModule?.examinationForm || item.data?.examinationForm || "") : "";
  const specializationExtraNotes = !isProject ? (item.data?.extraNotes || "") : "";
  const specializationMasterNotes = !isProject ? (item.data?.masterStudentNotes || "") : "";

  const applications = getMockApplicationsForOffer(item.id).length;
  const utilizationPercent = maxPlaces > 0 ? Math.round((applications / maxPlaces) * 100) : 0;

  const handleEdit = () => {
    if (isProject) {
      loadProject(item.id);
      setEditingItemId(item.id);
      setOfferType('project');
      navigate('/lehrender/create-project?edit=true');
    } else {
      updateSpecializationData({
        selectedModule: item.data?.selectedModule || null,
        studyPrograms: item.data?.studyPrograms || item.data?.selectedModule?.programs || [],
        places: item.data?.places || "",
        moodleLink: item.data?.moodleLink || "",
        moodleId: item.data?.moodleId || "",
        applicationType: item.data?.applicationType || "",
        meetings: item.data?.meetings || "",
        location: item.data?.location || "",
        groupWish: item.data?.groupWish || false,
        extraNotes: item.data?.extraNotes || "",
        masterStudentNotes: item.data?.masterStudentNotes || "",
        notifyStudents: item.data?.notifyStudents || false,
        reuseRule: item.data?.reuseRule || "none"
      });
      setEditingItemId(item.id);
      setOfferType('specialization');
      navigate('/lehrender/import-specialization?edit=true');
    }
  };

  return (
    <div className="mx-auto max-w-5xl pb-20">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="w-full sm:w-auto">
          <button
            onClick={() => navigate("/lehrender/published")}
            className="-ml-4 mb-4 px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            style={{ color: '#00718b', fontSize: '14px' }}
          >
            ← Zurück zur Übersicht
          </button>

          <div className="flex gap-2 mb-2 flex-wrap items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#28a745' }}></div>
              Veröffentlicht
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border" style={{ borderColor: '#dee2e6', color: '#6a737b' }}>
              {isProject ? <FolderGit2 className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
              {isProject ? 'Projekt' : 'Vertiefung'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium border" style={{ borderColor: '#dee2e6', color: '#6a737b' }}>
              {item.semester}
            </span>
          </div>

          <h1 style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, fontSize: '32px', color: '#e3000f' }}>
            {item.name}
          </h1>

          {isProject && projectTypes.length > 0 && (
            <p className="mt-2" style={{ color: '#6a737b', fontSize: '14px' }}>
              {projectTypes.map(getProjectTypeLabel).join(", ")}
            </p>
          )}
          {!isProject && tags.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#e0f4f8', color: '#005b70' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(`/lehrender/published/${item.id}/applications`)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border font-bold hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#00afd7', color: '#00718b', fontSize: '14px' }}
          >
            <FileText className="h-4 w-4" /> Bewerbungen ansehen
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#00afd7', fontSize: '14px' }}
          >
            <FileEdit className="h-4 w-4" /> Angebot bearbeiten
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full p-3" style={{ backgroundColor: '#e0f4f8' }}>
            <Users className="h-6 w-6" style={{ color: '#00afd7' }} />
          </div>
          <div className="text-3xl font-bold mb-1" style={{ color: '#1d2125' }}>{maxPlaces}</div>
          <div className="text-sm font-medium" style={{ color: '#6a737b' }}>Verfügbare Plätze</div>
        </div>

        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full p-3" style={{ backgroundColor: '#fee' }}>
            <FileText className="h-6 w-6" style={{ color: '#e3000f' }} />
          </div>
          <div className="text-3xl font-bold mb-1" style={{ color: '#1d2125' }}>{applications}</div>
          <div className="text-sm font-medium" style={{ color: '#6a737b' }}>Bewerbungen</div>
        </div>

        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full p-3" style={{ backgroundColor: '#fef3cd' }}>
            <BarChart3 className="h-6 w-6" style={{ color: '#f59e0b' }} />
          </div>
          <div className="text-3xl font-bold mb-1" style={{ color: utilizationPercent > 100 ? '#f59e0b' : '#1d2125' }}>
            {utilizationPercent}%
          </div>
          <div className="text-sm font-medium" style={{ color: '#6a737b' }}>Auslastung</div>
        </div>

        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full p-3" style={{ backgroundColor: '#e9d5ff' }}>
            <Clock className="h-6 w-6" style={{ color: '#9333ea' }} />
          </div>
          <div className="text-base font-bold mb-1 min-h-[36px] flex items-center justify-center text-center" style={{ color: '#1d2125' }}>
            {meeting || "–"}
          </div>
          <div className="text-sm font-medium" style={{ color: '#6a737b' }}>Termin</div>
        </div>
      </div>

      {/* Details */}
      {isProject && (
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-6 mb-6">
          <h2 className="font-bold mb-4 pb-3 border-b" style={{ color: '#1d2125', fontSize: '16px', borderColor: '#dee2e6', fontFamily: "'Segoe UI', sans-serif" }}>
            Projektdetails
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {item.data?.description && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Kurzbeschreibung</div>
                <div style={{ color: '#1d2125', fontSize: '14px', lineHeight: 1.6 }}>{item.data.description}</div>
              </div>
            )}
            {item.data?.requirements && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Voraussetzungen</div>
                <div style={{ color: '#1d2125', fontSize: '14px', lineHeight: 1.6 }}>{item.data.requirements}</div>
              </div>
            )}
            {location && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Ort / Raum</div>
                <div style={{ color: '#1d2125', fontSize: '14px' }}>{location}</div>
              </div>
            )}
            {applicationType && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Bewerbungsart</div>
                <div style={{ color: '#1d2125', fontSize: '14px' }}>{applicationType}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {!isProject && (
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-6 mb-6">
          <h2 className="font-bold mb-4 pb-3 border-b" style={{ color: '#1d2125', fontSize: '16px', borderColor: '#dee2e6', fontFamily: "'Segoe UI', sans-serif" }}>
            Vertiefungsdetails
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {specializationCategory && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Kategorie</div>
                <div style={{ color: '#1d2125', fontSize: '14px' }}>{specializationCategory}</div>
              </div>
            )}
            {specializationExamination && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Prüfungsform</div>
                <div style={{ color: '#1d2125', fontSize: '14px' }}>{specializationExamination}</div>
              </div>
            )}
            {studyPrograms.length > 0 && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Studiengänge</div>
                <div style={{ color: '#1d2125', fontSize: '14px' }}>{studyPrograms.join(", ")}</div>
              </div>
            )}
            {location && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Ort / Raum</div>
                <div style={{ color: '#1d2125', fontSize: '14px' }}>{location}</div>
              </div>
            )}
            {meeting && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Termin</div>
                <div style={{ color: '#1d2125', fontSize: '14px' }}>{meeting}</div>
              </div>
            )}
            {applicationType && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Bewerbungsart</div>
                <div style={{ color: '#1d2125', fontSize: '14px' }}>{applicationType}</div>
              </div>
            )}
            {specializationDescription && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Inhalte & Ziele</div>
                <div style={{ color: '#1d2125', fontSize: '14px', lineHeight: 1.6 }}>{specializationDescription}</div>
              </div>
            )}
            {specializationExtraNotes && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Zusatzhinweise</div>
                <div style={{ color: '#1d2125', fontSize: '14px' }}>{specializationExtraNotes}</div>
              </div>
            )}
            {specializationMasterNotes && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Hinweise für Masterstudenten</div>
                <div style={{ color: '#1d2125', fontSize: '14px' }}>{specializationMasterNotes}</div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="rounded-lg p-6 border mb-8 flex items-start gap-4" style={{ backgroundColor: '#f4f6f8', borderColor: '#dee2e6' }}>
        <div className="mt-1">
          <CheckCircle2 className="h-5 w-5" style={{ color: '#155724' }} />
        </div>
        <div>
          <div className="font-semibold" style={{ color: '#1d2125', fontSize: '14px' }}>Angebot ist live</div>
          <p className="mt-1 leading-relaxed" style={{ color: '#6a737b', fontSize: '14px' }}>
            Das Angebot ist im Studierenden-Portal sichtbar. Änderungen können Sie über den Button „Angebot bearbeiten" vornehmen –
            dort haben Sie auch die Möglichkeit, Bewerber über Änderungen zu benachrichtigen.
          </p>
        </div>
      </div>

      <div className="flex justify-end border-t pt-6" style={{ borderColor: '#dee2e6' }}>
        <button
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          style={{ color: '#1d2125', fontSize: '14px' }}
          onClick={() => navigate("/lehrender/preview", { state: { source: "published", item } })}
        >
          <Eye className="h-4 w-4" /> Studierenden-Vorschau ansehen
        </button>
      </div>
    </div>
  );
}
