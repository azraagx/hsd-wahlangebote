import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CheckCircle2, FileText, XCircle, Mail, User, Clock, GraduationCap } from "lucide-react";
import { useFormState, SavedItem } from "../context/FormContext";
import { mockModules } from "../data/mockModules";
import { ApplicationStatus, getMockApplicationsForOffer } from "../data/mockApplications";

const statusLabels: Record<ApplicationStatus, string> = {
  pending: "Offen",
  accepted: "Angenommen",
  rejected: "Abgelehnt"
};

const statusStyles: Record<ApplicationStatus, { bg: string; color: string; border: string }> = {
  pending: { bg: "#fff3cd", color: "#856404", border: "#f5d36b" },
  accepted: { bg: "#d4edda", color: "#155724", border: "#a3d9af" },
  rejected: { bg: "#f8d7da", color: "#842029", border: "#f1aeb5" }
};

const STORAGE_PREFIX = "teacherApplicationStatuses:";

export default function ApplicationsReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getSavedItems } = useFormState();
  const [item, setItem] = useState<SavedItem | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, ApplicationStatus>>({});

  useEffect(() => {
    const savedItems = getSavedItems();
    let found = savedItems.find(savedItem => savedItem.id === id);

    if (!found) {
      const mockModule = mockModules.find(module => module.id === id);
      if (mockModule) {
        found = {
          id: mockModule.id,
          name: mockModule.name,
          semester: "Wintersemester 26/27",
          itemType: "specialization",
          data: {
            selectedModule: mockModule,
            studyPrograms: mockModule.programs
          },
          savedAt: new Date().toISOString()
        };
      }
    }

    if (found) setItem(found);
  }, [getSavedItems, id]);

  useEffect(() => {
    if (!id || typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
      setStatusOverrides(stored ? JSON.parse(stored) : {});
    } catch {
      setStatusOverrides({});
    }
  }, [id]);

  const applications = useMemo(() => {
    if (!id) return [];

    return getMockApplicationsForOffer(id).map(application => ({
      ...application,
      status: statusOverrides[application.id] || application.status
    }));
  }, [id, statusOverrides]);

  useEffect(() => {
    if (!selectedApplicationId && applications.length > 0) {
      setSelectedApplicationId(applications[0].id);
    }
  }, [applications, selectedApplicationId]);

  const selectedApplication = applications.find(application => application.id === selectedApplicationId) || applications[0];
  const availablePlaces = parseInt(item?.itemType === "project" ? item.data?.maxPlaces || "0" : item?.data?.places || "0", 10);

  const updateApplicationStatus = (applicationId: string, status: ApplicationStatus) => {
    if (!id) return;

    const updated = { ...statusOverrides, [applicationId]: status };
    setStatusOverrides(updated);

    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_PREFIX}${id}`, JSON.stringify(updated));
    }
  };

  const statusCounts = applications.reduce(
    (counts, application) => ({
      ...counts,
      [application.status]: counts[application.status] + 1
    }),
    { pending: 0, accepted: 0, rejected: 0 }
  );

  if (!item) {
    return (
      <div className="mx-auto max-w-6xl pb-20">
        <button
          onClick={() => navigate("/lehrender/published")}
          className="-ml-4 mb-4 px-3 py-2 hover:bg-gray-100 rounded transition-colors"
          style={{ color: "#00718b", fontSize: "14px" }}
        >
          ← Zurück zur Übersicht
        </button>
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-12 text-center">
          <p style={{ color: "#6a737b", fontSize: "14px" }}>Angebot nicht gefunden.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl pb-20">
      <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <button
            onClick={() => navigate(`/lehrender/published/${item.id}`)}
            className="-ml-4 mb-4 px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            style={{ color: "#00718b", fontSize: "14px" }}
          >
            ← Zurück zum Angebot
          </button>
          <h1 style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, fontSize: "32px", color: "#e3000f" }}>
            Bewerbungen
          </h1>
          <p className="mt-2" style={{ color: "#6a737b", fontSize: "14px" }}>
            {item.name} · {item.semester}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          <div className="rounded-md border bg-white px-4 py-3 text-center" style={{ borderColor: "#dee2e6" }}>
            <div className="text-2xl font-bold" style={{ color: "#1d2125" }}>{Number.isNaN(availablePlaces) || availablePlaces === 0 ? "–" : availablePlaces}</div>
            <div className="text-xs font-semibold" style={{ color: "#6a737b" }}>Plätze</div>
          </div>
          {(["pending", "accepted", "rejected"] as ApplicationStatus[]).map(status => (
            <div key={status} className="rounded-md border bg-white px-4 py-3 text-center" style={{ borderColor: statusStyles[status].border }}>
              <div className="text-2xl font-bold" style={{ color: statusStyles[status].color }}>{statusCounts[status]}</div>
              <div className="text-xs font-semibold" style={{ color: "#6a737b" }}>{statusLabels[status]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="p-4 border-b" style={{ borderColor: "#dee2e6" }}>
            <div className="font-bold" style={{ color: "#1d2125", fontSize: "16px" }}>Eingegangene Bewerbungen</div>
            <div className="mt-1 text-xs" style={{ color: "#6a737b" }}>{applications.length} Einträge</div>
          </div>

          <div className="divide-y" style={{ borderColor: "#dee2e6" }}>
            {applications.map(application => {
              const style = statusStyles[application.status];
              const isSelected = selectedApplication?.id === application.id;

              return (
                <button
                  key={application.id}
                  onClick={() => setSelectedApplicationId(application.id)}
                  className={`w-full text-left p-4 transition-colors ${isSelected ? "bg-[#e0f4f8]" : "hover:bg-gray-50"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold" style={{ color: "#1d2125", fontSize: "14px" }}>{application.studentName}</div>
                      <div className="mt-1 text-xs" style={{ color: "#6a737b" }}>{application.studyProgram} · {application.semester}. Semester</div>
                    </div>
                    <span className="shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold" style={{ backgroundColor: style.bg, color: style.color, borderColor: style.border }}>
                      {statusLabels[application.status]}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs" style={{ color: "#6a737b" }}>
                    <span>Prio {application.priority}</span>
                    <span>{application.submittedAt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedApplication && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5" style={{ color: "#00afd7" }} />
                    <span className="text-xs font-semibold uppercase" style={{ color: "#6a737b" }}>Bewerbung lesen</span>
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: "#1d2125" }}>{selectedApplication.studentName}</h2>
                  <p className="mt-1" style={{ color: "#6a737b", fontSize: "14px" }}>{selectedApplication.studentId}</p>
                </div>

                <span
                  className="inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: statusStyles[selectedApplication.status].bg,
                    color: statusStyles[selectedApplication.status].color,
                    borderColor: statusStyles[selectedApplication.status].border
                  }}
                >
                  {statusLabels[selectedApplication.status]}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="rounded-md border p-3" style={{ borderColor: "#dee2e6" }}>
                  <User className="h-4 w-4 mb-2" style={{ color: "#00afd7" }} />
                  <div className="text-xs font-semibold mb-1" style={{ color: "#6a737b" }}>Studiengang</div>
                  <div style={{ color: "#1d2125", fontSize: "14px" }}>{selectedApplication.studyProgram}</div>
                </div>
                <div className="rounded-md border p-3" style={{ borderColor: "#dee2e6" }}>
                  <GraduationCap className="h-4 w-4 mb-2" style={{ color: "#00afd7" }} />
                  <div className="text-xs font-semibold mb-1" style={{ color: "#6a737b" }}>Semester</div>
                  <div style={{ color: "#1d2125", fontSize: "14px" }}>{selectedApplication.semester}. Semester</div>
                </div>
                <div className="rounded-md border p-3" style={{ borderColor: "#dee2e6" }}>
                  <Clock className="h-4 w-4 mb-2" style={{ color: "#00afd7" }} />
                  <div className="text-xs font-semibold mb-1" style={{ color: "#6a737b" }}>Eingang</div>
                  <div style={{ color: "#1d2125", fontSize: "14px" }}>{selectedApplication.submittedAt}</div>
                </div>
                <div className="rounded-md border p-3" style={{ borderColor: "#dee2e6" }}>
                  <Mail className="h-4 w-4 mb-2" style={{ color: "#00afd7" }} />
                  <div className="text-xs font-semibold mb-1" style={{ color: "#6a737b" }}>Priorität</div>
                  <div style={{ color: "#1d2125", fontSize: "14px" }}>Priorität {selectedApplication.priority}</div>
                </div>
              </div>

              <div className="mb-6 rounded-md border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2" style={{ borderColor: "#dee2e6", backgroundColor: "#f4f6f8" }}>
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: "#6a737b" }}>Platzvergabe</div>
                  <div style={{ color: "#1d2125", fontSize: "14px" }}>
                    {statusCounts.accepted} angenommen
                    {Number.isNaN(availablePlaces) || availablePlaces === 0 ? "" : ` von ${availablePlaces} verfügbaren Plätzen`}
                  </div>
                </div>
                {availablePlaces > 0 && !Number.isNaN(availablePlaces) && (
                  <div className="text-sm font-bold" style={{ color: statusCounts.accepted >= availablePlaces ? "#e3000f" : "#155724" }}>
                    {Math.max(availablePlaces - statusCounts.accepted, 0)} Plätze frei
                  </div>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <div className="text-xs font-semibold mb-2" style={{ color: "#6a737b" }}>Motivationsschreiben</div>
                  <div className="rounded-md border p-4 leading-relaxed whitespace-pre-line" style={{ borderColor: "#dee2e6", color: "#1d2125", fontSize: "14px" }}>
                    {selectedApplication.motivation}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold mb-2" style={{ color: "#6a737b" }}>Vorkenntnisse</div>
                  <div className="rounded-md border p-4 leading-relaxed" style={{ borderColor: "#dee2e6", color: "#1d2125", fontSize: "14px" }}>
                    {selectedApplication.experience}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-4 flex flex-col sm:flex-row justify-end gap-3 sticky bottom-6">
              <button
                onClick={() => updateApplicationStatus(selectedApplication.id, "rejected")}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border font-bold hover:bg-red-50 transition-colors"
                style={{ borderColor: "#e3000f", color: "#e3000f", fontSize: "14px" }}
              >
                <XCircle className="h-4 w-4" /> Ablehnen
              </button>
              <button
                onClick={() => updateApplicationStatus(selectedApplication.id, "accepted")}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#155724", fontSize: "14px" }}
              >
                <CheckCircle2 className="h-4 w-4" /> Annehmen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
