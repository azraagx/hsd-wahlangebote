import { useState } from "react";
import imgProfile from "@/imports/1440WDefault/acc4291260e1f05f1a14cc0893d23296c2967e5d.png";
import type { Page } from "@/features/student-portal/types";
import {
  HSD_BLUE,
  HSD_BORDER_LIGHT,
  HSD_DARK,
  HSD_GRAY,
  HSD_LINK,
  HSD_RED,
} from "@/features/student-portal/styles/tokens";

export function NavBar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [meinBereichOpen, setMeinBereichOpen] = useState(false);

  const isMeinBereich = page === "bewerbungen" || page === "stundenplan" || page === "kurse";

  return (
    <>
      {/* Click-outside overlay – sits BELOW the nav in z-order */}
      {meinBereichOpen && (
        <div
          className="fixed inset-0"
          style={{ zIndex: 49 }}
          onClick={() => setMeinBereichOpen(false)}
        />
      )}

      <nav
        className="fixed top-0 left-0 right-0 bg-white"
        style={{ borderBottom: `0.8px solid ${HSD_BORDER_LIGHT}`, height: "61px", zIndex: 50 }}
      >
        <div className="flex items-stretch h-full px-4 max-w-[1440px] mx-auto">
          {/* Logo */}
          <div className="flex items-center pr-6" style={{ minWidth: "100px" }}>
            <span
              className="font-['Inter',sans-serif] font-normal text-[38px] uppercase leading-none cursor-pointer"
              style={{ color: HSD_RED }}
              onClick={() => setPage("home")}
            >
              HSD
            </span>
          </div>

          {/* Main nav – overflow visible so dropdown escapes the row */}
          <div className="flex items-stretch flex-1" style={{ overflow: "visible" }}>
            {/* Startseite */}
            <button
              className="flex items-center px-3 text-sm whitespace-nowrap transition-colors hover:text-[#00afd7] border-t-2 border-b-2"
              style={{
                fontFamily: "'Segoe UI', sans-serif",
                fontSize: "14.5px",
                color: page === "home" ? HSD_DARK : HSD_GRAY,
                borderTopColor: "transparent",
                borderBottomColor: page === "home" ? HSD_BLUE : "transparent",
              }}
              onClick={() => setPage("home")}
            >
              Startseite
            </button>

            {/* Mein Bereich dropdown */}
            <div className="relative flex items-stretch">
              <button
                className="flex items-center gap-1.5 px-3 text-sm whitespace-nowrap border-t-2 border-b-2 transition-colors"
                style={{
                  fontFamily: "'Segoe UI', sans-serif",
                  fontSize: "14.5px",
                  color: isMeinBereich ? HSD_DARK : HSD_GRAY,
                  borderTopColor: "transparent",
                  borderBottomColor: isMeinBereich ? HSD_BLUE : "transparent",
                }}
                onClick={() => setMeinBereichOpen((o) => !o)}
              >
                Mein Bereich
                <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor">
                  <path d="M0 2.5l4.5 4 4.5-4H0z" />
                </svg>
              </button>

              {meinBereichOpen && (
                <div
                  className="absolute top-full left-0 bg-white rounded-lg py-1"
                  style={{
                    border: `1px solid ${HSD_BORDER_LIGHT}`,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    marginTop: "1px",
                    minWidth: "220px",
                    zIndex: 51,
                  }}
                >
                  <button
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2"
                    style={{ fontFamily: "'Segoe UI', sans-serif", color: page === "bewerbungen" ? HSD_LINK : HSD_DARK }}
                    onClick={() => { setPage("bewerbungen"); setMeinBereichOpen(false); }}
                  >
                    <span style={{ color: HSD_BLUE }}>📋</span>
                    Meine Bewerbungen
                  </button>
                  <button
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2"
                    style={{ fontFamily: "'Segoe UI', sans-serif", color: page === "stundenplan" ? HSD_LINK : HSD_DARK }}
                    onClick={() => { setPage("stundenplan"); setMeinBereichOpen(false); }}
                  >
                    <span style={{ color: HSD_BLUE }}>📅</span>
                    Mein Stundenplan
                  </button>
                  <button
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2"
                    style={{ fontFamily: "'Segoe UI', sans-serif", color: page === "kurse" ? HSD_LINK : HSD_DARK }}
                    onClick={() => { setPage("kurse"); setMeinBereichOpen(false); }}
                  >
                    <span style={{ color: HSD_BLUE }}>📚</span>
                    Meine Kurse
                  </button>
                </div>
              )}
            </div>

            {/* Other nav items */}
            {["Personen", "Service", "Webseite Medien", "Hilfe"].map((item) => (
              <button
                key={item}
                className="flex items-center gap-1.5 px-3 text-sm whitespace-nowrap border-t-2 border-b-2 border-transparent hover:text-[#1d2125] transition-colors"
                style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: "14.5px", color: HSD_GRAY }}
              >
                {item}
                <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor">
                  <path d="M0 2.5l4.5 4 4.5-4H0z" />
                </svg>
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 pl-4" style={{ borderLeft: `0.8px solid ${HSD_BORDER_LIGHT}` }}>
            <button className="text-gray-500 hover:text-gray-700 text-base">🔔</button>
            <button className="text-gray-500 hover:text-gray-700 text-base">💬</button>
            <div className="w-px h-8 mx-1" style={{ backgroundColor: HSD_BORDER_LIGHT }} />
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={imgProfile} alt="Profil" className="w-8 h-8 rounded-full object-cover" />
              <svg width="9" height="9" viewBox="0 0 9 9" fill={HSD_DARK}>
                <path d="M0 2.5l4.5 4 4.5-4H0z" />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
