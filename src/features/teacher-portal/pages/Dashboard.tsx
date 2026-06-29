import { useNavigate } from "react-router";
import { PlusCircle, Eye } from "lucide-react";
import { useFormState } from "../context/FormContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { resetFlow } = useFormState();

  const handleCreateNew = () => {
    resetFlow();
    navigate("/lehrender/select-type");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, fontSize: '32px', color: '#e3000f' }}>
          Wahlangebote verwalten
        </h1>
        <p className="mt-2" style={{ color: '#6a737b', fontSize: '14px' }}>
          Hier können Sie Ihre Wahlangebote semesterweise planen, speichern und veröffentlichen.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-16">
        {/* Create New */}
        <div
          className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-10 cursor-pointer hover:shadow-[0px_4px_8px_rgba(0,0,0,0.12)] transition-all"
          onClick={handleCreateNew}
        >
          <div className="flex flex-col items-center justify-center text-center h-full min-h-[200px]">
            <div className="mb-5 rounded-full bg-[#e0f4f8] p-4">
              <PlusCircle className="h-10 w-10" style={{ color: '#00afd7' }} />
            </div>
            <h3 className="mb-3 text-lg font-bold" style={{ color: '#1d2125' }}>Neues Wahlangebot erstellen</h3>
            <p style={{ color: '#6a737b', fontSize: '14px' }}>Projekt oder Vertiefung für das kommende Semester anlegen.</p>
          </div>
        </div>

        {/* Published */}
        <div
          className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-10 cursor-pointer hover:shadow-[0px_4px_8px_rgba(0,0,0,0.12)] transition-all"
          onClick={() => navigate("/lehrender/published")}
        >
          <div className="flex flex-col items-center justify-center text-center h-full min-h-[200px]">
            <div className="mb-5 rounded-full bg-[#d4edda] p-4">
              <Eye className="h-10 w-10" style={{ color: '#155724' }} />
            </div>
            <h3 className="mb-3 text-lg font-bold" style={{ color: '#1d2125' }}>Veröffentlichte ansehen</h3>
            <p style={{ color: '#6a737b', fontSize: '14px' }}>Aktive Angebote einsehen, bearbeiten und benachrichtigen.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
