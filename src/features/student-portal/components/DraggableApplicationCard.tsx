import { useCallback, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { StudentApplication } from "@/features/student-portal/types";
import {
  HSD_BLUE,
  HSD_BORDER_LIGHT,
  HSD_DARK,
  HSD_GRAY,
  HSD_RED,
} from "@/features/student-portal/styles/tokens";
import { ApplicationViewModal } from "@/features/student-portal/components/ApplicationViewModal";

const DND_TYPE = "APPLICATION_CARD";

export function DraggableApplicationCard({
  app,
  index,
  moveCard,
  onRemove
}: {
  app: StudentApplication;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (id: number) => void;
}) {
const [showApplication, setShowApplication] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: DND_TYPE,
    item: () => ({ index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: DND_TYPE,
    hover: (item: { index: number }) => {
      if (!item || item.index === index) return;
      moveCard(item.index, index);
      item.index = index;
    },
  });

  const statusColors = {
  pending: {
    bg: "#FFF3CD",
    text: "#856404",
    label: "In Bearbeitung",
  },
  accepted: {
    bg: "#D4EDDA",
    text: "#155724",
    label: "Angenommen",
  },
  rejected: {
    bg: "#F8D7DA",
    text: "#842029",
    label: "Abgelehnt",
  },
  entwurf: {
    bg: "#E2E3E5",
    text: "#41464B",
    label: "Noch nicht gespeichert",
  },
  in_bearbeitung: {
    bg: "#FFF3CD",
    text: "#856404",
    label: "In Bearbeitung",
  },
  angenommen: {
    bg: "#D4EDDA",
    text: "#155724",
    label: "Angenommen",
  },
  abgelehnt: {
    bg: "#F8D7DA",
    text: "#842029",
    label: "Abgelehnt",
  },
};

const statusCfg = statusColors[app.status] ?? statusColors.entwurf;

  const setRef = useCallback((node: HTMLDivElement | null) => {
    drag(drop(node));
  }, [drag, drop]);

  return (
    <div
      ref={setRef}
      className="bg-white rounded-lg p-4 cursor-move hover:shadow-md transition-all"
      style={{
        border: `2px solid ${HSD_BORDER_LIGHT}`,
        borderLeft: `6px solid ${index === 0 ? HSD_RED : index === 1 ? HSD_BLUE : HSD_GRAY}`,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg" style={{ color: HSD_GRAY }}>☰</span>
            <span
              className="text-sm font-bold px-2 py-0.5 rounded"
              style={{
                color: "white",
                backgroundColor: index === 0 ? HSD_RED : index === 1 ? HSD_BLUE : HSD_GRAY,
                fontFamily: "'Segoe UI', sans-serif"
              }}
            >
              Priorität {index + 1}
            </span>
          </div>
          <h4 className="text-sm font-semibold mb-1" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_DARK }}>
            {app.titel}
          </h4>
          <p className="text-xs" style={{ fontFamily: "'Segoe UI', sans-serif", color: HSD_GRAY }}>
            {app.kategorie}
          </p>
        </div>
        <button
          onClick={() => onRemove(app.id)}
          className="text-gray-400 hover:text-red-600 transition-colors"
          style={{ fontSize: "18px" }}
        >
          ✕
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{ backgroundColor: statusCfg.bg, color: statusCfg.text }}
        >
          {statusCfg.label}
        </span>
        {app.motivationText && (
    <button
      type="button"
      onMouseDown={(event) => event.stopPropagation()}
      onClick={() => setShowApplication(true)}
      className="text-xs font-semibold hover:underline"
      style={{ color: HSD_BLUE }}
    >
      Bewerbung bearbeiten
    </button>
  )}
      </div>
      {showApplication && (
        <ApplicationViewModal
          application={app}
          editable
          onClose={() => setShowApplication(false)}
        />
)}
    </div>
  );
}