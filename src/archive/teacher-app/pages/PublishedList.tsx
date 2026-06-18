import { useNavigate } from "react-router";
import { Eye, Clock, Users, BookOpen, FolderGit2 } from "lucide-react";
import { useFormState, SavedItem } from "../context/FormContext";
import { useEffect, useState } from "react";

export default function PublishedList() {
  const navigate = useNavigate();
  const { getSavedItems } = useFormState();
  const [items, setItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    setItems(getSavedItems());
  }, [getSavedItems]);

  return (
    <div className="mx-auto max-w-5xl pb-20">
      <div className="mb-8">
        <button
          onClick={() => navigate("/")}
          className="-ml-4 mb-4 px-3 py-2 hover:bg-gray-100 rounded transition-colors"
          style={{ color: '#00718b', fontSize: '14px' }}
        >
          ← Zurück zum Dashboard
        </button>
        <h1 style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, fontSize: '32px', color: '#e3000f' }}>
          Veröffentlichte Angebote
        </h1>
        <p className="mt-2" style={{ color: '#6a737b', fontSize: '14px' }}>
          Hier sehen Sie Ihre bereits veröffentlichten Projekte und Vertiefungen.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] p-12 text-center">
          <p style={{ color: '#6a737b', fontSize: '14px' }}>
            Noch keine veröffentlichten Angebote vorhanden.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-[rgba(0,0,0,0.13)] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] hover:shadow-[0px_4px_8px_rgba(0,0,0,0.12)] transition-all cursor-pointer group"
              onClick={() => navigate(`/published/${item.id}`)}
            >
              <div className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex gap-2 flex-wrap items-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#28a745' }}></div>
                      Veröffentlicht
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border" style={{ borderColor: '#dee2e6', color: '#6a737b' }}>
                      {item.itemType === 'project'
                        ? <FolderGit2 className="h-3 w-3" />
                        : <BookOpen className="h-3 w-3" />}
                      {item.itemType === 'project' ? 'Projekt' : 'Vertiefung'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium border" style={{ borderColor: '#dee2e6', color: '#6a737b' }}>
                      {item.semester}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold group-hover:text-[#e3000f] transition-colors" style={{ color: '#1d2125' }}>
                    {item.name}
                  </h3>

                  {item.itemType === 'project' && item.data?.type && Array.isArray(item.data.type) && item.data.type.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {item.data.type.map((type: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#e0f4f8', color: '#005b70' }}>
                          {type}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.itemType === 'specialization' && item.data?.selectedModule?.tags && (
                    <div className="flex gap-2 flex-wrap">
                      {item.data.selectedModule.tags.map((tag: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#e0f4f8', color: '#005b70' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm" style={{ color: '#6a737b' }}>
                    {item.itemType === 'project' && item.data?.maxPlaces && (
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" /> {item.data.maxPlaces} Plätze
                      </span>
                    )}
                    {item.itemType === 'specialization' && item.data?.places && (
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" /> {item.data.places} Plätze
                      </span>
                    )}
                    {item.itemType === 'project' && item.data?.regularMeeting && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {item.data.regularMeeting}
                      </span>
                    )}
                    {item.itemType === 'specialization' && item.data?.meetings && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {item.data.meetings}
                      </span>
                    )}
                  </div>
                </div>

                <button className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors" style={{ color: '#1d2125', fontSize: '14px' }}>
                  Details ansehen <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
