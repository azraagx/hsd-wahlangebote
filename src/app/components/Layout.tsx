import { Outlet, Link } from "react-router";
import { GraduationCap, UserCircle, ArrowRightLeft } from "lucide-react";

export default function Layout() {
  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-blue-100" style={{ backgroundColor: '#f4f6f8' }}>
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between bg-white px-6" style={{ borderBottom: '1px solid #dee2e6' }}>
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="hsd-logo text-2xl tracking-tight">HSD</div>
          <span className="text-lg tracking-tight" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: '#000' }}>Hochschule Düsseldorf</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-500">Lehrenden-Portal</span>
          <Link
            to="/student"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors border border-red-200"
            title="Wechseln zur Studierenden-Ansicht"
          >
            <ArrowRightLeft className="h-4 w-4" />
            Zur Studierenden-Ansicht
          </Link>
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 text-slate-600">
            <UserCircle className="h-6 w-6" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1440px] px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
