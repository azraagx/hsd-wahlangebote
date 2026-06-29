import { useLocation, useNavigate } from "react-router";
import { User, Users, MapPin, Calendar, Clock, AlertCircle, Send } from "lucide-react";
import { Button } from "@/app/components/ui";
import { SavedItem, useFormState } from "../context/FormContext";
import { getProjectTypeLabel } from "../utils/projectTypes";

export default function Preview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { offerType, projectData, specializationData, semesterData, updateProjectData, updateSpecializationData, setOfferType, setEditingItemId } = useFormState();

  const previewItem = (location.state as { source?: string; item?: SavedItem } | null)?.item;
  const isPublishedPreview = (location.state as { source?: string } | null)?.source === 'published' && !!previewItem;
  const isProject = isPublishedPreview ? previewItem.itemType === 'project' : offerType === 'project';

  // Prepare data for view based on type
  const title = isPublishedPreview ? previewItem.name : (isProject ? projectData.name : (specializationData.selectedModule?.name || "Unbenanntes Modul"));
  const projectTypes = isProject && Array.isArray((isPublishedPreview ? previewItem.data?.type : projectData.type)) ? (isPublishedPreview ? previewItem.data.type : projectData.type) : [];
  const places = isProject ? (isPublishedPreview ? previewItem.data?.maxPlaces : projectData.maxPlaces) : (isPublishedPreview ? previewItem.data?.places : specializationData.places);
  const appType = isProject ? (isPublishedPreview ? previewItem.data?.applicationType : projectData.applicationType) : (isPublishedPreview ? previewItem.data?.applicationType : specializationData.applicationType);
  const reqs = isProject ? (isPublishedPreview ? previewItem.data?.requirements : projectData.requirements) : "Voraussetzungen aus Modulhandbuch...";
  const content = isProject ? (isPublishedPreview ? previewItem.data?.content : projectData.content) : "Inhalte aus Modulhandbuch...";
  const goals = isProject ? (isPublishedPreview ? previewItem.data?.goals : projectData.goals) : "";
  const description = isProject ? (isPublishedPreview ? previewItem.data?.description : projectData.description) : (isPublishedPreview ? previewItem.data?.selectedModule?.description : "");
  const meetings = isProject ? (isPublishedPreview ? previewItem.data?.regularMeeting : projectData.regularMeeting) : (isPublishedPreview ? previewItem.data?.meetings : specializationData.meetings);
  const locationValue = isProject ? (isPublishedPreview ? previewItem.data?.location : projectData.location) : (isPublishedPreview ? previewItem.data?.location : specializationData.location);
  const firstMeeting = isProject ? (isPublishedPreview ? previewItem.data?.firstMeeting : projectData.firstMeeting) : "";

  const handleBack = () => {
    if (isPublishedPreview && previewItem?.id) {
      navigate(`/lehrender/published/${previewItem.id}`);
      return;
    }
    navigate(offerType === 'project' ? "/lehrender/create-project" : "/lehrender/import-specialization");
  };

  const handleSecondaryAction = () => {
    if (isPublishedPreview && previewItem?.id) {
      setEditingItemId(previewItem.id);
      if (previewItem.itemType === 'project') {
        updateProjectData(previewItem.data || {});
        setOfferType('project');
        navigate(`/lehrender/create-project?edit=true`);
      } else {
        updateSpecializationData({
          ...(previewItem.data || {}),
          selectedModule: previewItem.data?.selectedModule || null,
          studyPrograms: previewItem.data?.studyPrograms || previewItem.data?.selectedModule?.programs || []
        });
        setOfferType('specialization');
        navigate(`/lehrender/import-specialization?edit=true`);
      }
      return;
    }
    navigate("/lehrender/success");
  };

  return (
    <div className="mx-auto max-w-5xl pb-20">
      <div className="mb-8">
        <Button variant="ghost" onClick={handleBack} className="-ml-4 mb-4" style={{ color: '#00718b' }}>
          {isPublishedPreview ? '← Zurück zum Angebot' : '← Zurück zur Bearbeitung'}
        </Button>
        <h1 style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: '#e3000f', fontSize: '32px' }}>Studierenden-Vorschau</h1>
        <p className="mt-2" style={{ color: '#6a737b' }}>So wird Ihr Angebot den Studierenden im Portal angezeigt.</p>
      </div>

      {/* Preview Content - Student View Design */}
      <div className="space-y-4">

        {/* Main Card - Header */}
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-4">
            <div className="flex-1 space-y-2">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type: string) => (
                  <div key={type} className="bg-[#e0f4f8] px-2 py-1 rounded text-xs font-semibold" style={{ color: '#005b70' }}>
                    {getProjectTypeLabel(type)}
                  </div>
                ))}
                <div className="bg-[#d4edda] px-2 py-1 rounded text-xs font-semibold" style={{ color: '#155724' }}>
                  Offen
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold" style={{ color: '#1d2125', fontFamily: "'Segoe UI', sans-serif" }}>{title}</h2>
              <p style={{ color: '#6a737b', fontSize: '14px' }}>{semesterData.semester}</p>
            </div>

            {/* Apply Button */}
            <Button
              disabled
              className="px-6 py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: '#00afd7', fontSize: '14px' }}
            >
              Jetzt bewerben
            </Button>
          </div>

          {/* Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t" style={{ borderColor: '#dee2e6' }}>
            <div>
              <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Lehrende</div>
              <div style={{ color: '#1d2125', fontSize: '14px' }}>Prof. Dr. Musterperson</div>
            </div>
            <div>
              <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Verfügbare Plätze</div>
              <div className="font-bold" style={{ color: '#1d2125', fontSize: '14px' }}>{places} Plätze</div>
            </div>
            <div>
              <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Bewerbungsfrist</div>
              <div style={{ color: '#1d2125', fontSize: '14px' }}>08.04.2026, 08:00 Uhr</div>
            </div>
          </div>
        </div>

        {/* Description Card */}
        {description && (
          <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-5">
            <h3 className="text-lg font-bold mb-3" style={{ color: '#1d2125' }}>Kurzbeschreibung</h3>
            <p style={{ color: '#6a737b', fontSize: '14px', lineHeight: '1.625' }}>{description}</p>
          </div>
        )}

        {/* Content & Goals Card */}
        {(content || goals) && (
          <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-5">
            <h3 className="text-lg font-bold mb-3" style={{ color: '#1d2125' }}>Inhalte & Ziele</h3>
            <div className="space-y-2">
              {content && content.split(',').map((item: string, idx: number) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span style={{ color: '#00afd7', fontSize: '14px' }}>•</span>
                  <span style={{ color: '#6a737b', fontSize: '14px' }}>{item.trim()}</span>
                </div>
              ))}
              {goals && !content && (
                <p style={{ color: '#6a737b', fontSize: '14px', lineHeight: '1.625' }}>{goals}</p>
              )}
            </div>
          </div>
        )}

        {/* Requirements Card */}
        {reqs && (
          <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-5">
            <h3 className="text-lg font-bold mb-3" style={{ color: '#1d2125' }}>Voraussetzungen</h3>
            <p style={{ color: '#6a737b', fontSize: '14px', lineHeight: '1.625' }}>{reqs}</p>
          </div>
        )}

        {/* Organization Card */}
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-5">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#1d2125' }}>Organisation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            {meetings && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Rhythmus</div>
                <div style={{ color: '#1d2125', fontSize: '14px' }}>{meetings}</div>
              </div>
            )}
            {firstMeeting && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Erstes Treffen</div>
                <div style={{ color: '#1d2125', fontSize: '14px' }}>{firstMeeting}</div>
              </div>
            )}
            {locationValue && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Ort</div>
                <div style={{ color: '#1d2125', fontSize: '14px' }}>{locationValue}</div>
              </div>
            )}
            <div>
              <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Verfügbarkeit</div>
              <div style={{ color: '#1d2125', fontSize: '14px' }}>{semesterData.semester}</div>
            </div>
          </div>
        </div>

        {/* Application Info Card */}
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_1px_rgba(0,0,0,0.06)] p-5">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#1d2125' }}>Bewerbungsinformationen</h3>
          <div className="space-y-3">
            <div>
              <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Bewerbungstyp</div>
              <div style={{ color: '#1d2125', fontSize: '14px' }}>{appType}</div>
            </div>
            {appType === 'Motivationsschreiben' && isProject && projectData.motivationLetterTemplate && (
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#6a737b' }}>Erwartungen an das Motivationsschreiben</div>
                <div className="bg-red-50 p-3 rounded border border-red-100 italic" style={{ color: '#e3000f', fontSize: '14px' }}>
                  "{projectData.motivationLetterTemplate}"
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Master Extra Effort Warning */}
        {isProject && projectData.masterExtraEffort && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-1">Zusatzleistung für Master-Studierende</h4>
                <p className="text-amber-700 text-sm whitespace-pre-line">{projectData.masterExtraEffort}</p>
              </div>
            </div>
          </div>
        )}

        {/* Apply Button Bottom */}
        <div className="flex justify-center pt-4">
          <Button
            disabled
            className="px-8 py-3 rounded-lg font-bold text-white"
            style={{ backgroundColor: '#00afd7', fontSize: '14px' }}
          >
            Jetzt bewerben
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between pt-8 mt-8 border-t">
        <Button variant="outline" onClick={handleBack}>
          {isPublishedPreview ? 'Zurück zur Übersicht' : 'Zurück zur Bearbeitung'}
        </Button>
        {isPublishedPreview ? (
          <Button size="lg" className="bg-[#00afd7] hover:opacity-90 text-white" onClick={handleSecondaryAction}>
            Angebot bearbeiten
          </Button>
        ) : (
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => navigate("/lehrender/success")}>
            Angebot Veröffentlichen
          </Button>
        )}
      </div>
    </div>
  );
}
