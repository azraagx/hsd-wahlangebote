import type { Page } from "@/features/student-portal/types";
import {
  HSD_BLUE,
  HSD_BORDER_LIGHT,
  HSD_DARK,
  HSD_GRAY,
} from "@/features/student-portal/styles/tokens";

export function MeinBereichSubNav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  return (
    <div className="flex items-center gap-1 mb-6 border-b overflow-x-auto" style={{ borderColor: HSD_BORDER_LIGHT }}>
      {([
        { key: "bewerbungen", label: "Meine Bewerbungen", icon: "📋" },
        { key: "stundenplan", label: "Mein Stundenplan", icon: "📅" },
        { key: "kurse", label: "Meine Kurse", icon: "📚" },
      ] as { key: Page; label: string; icon: string }[]).map((item) => (
        <button
          key={item.key}
          onClick={() => setPage(item.key)}
          className="flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap"
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            color: page === item.key ? HSD_BLUE : HSD_GRAY,
            borderBottomColor: page === item.key ? HSD_BLUE : "transparent",
          }}
        >
          <span>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}