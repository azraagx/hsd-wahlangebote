import { Outlet, Link } from "react-router";
import { UserCircle } from "lucide-react";

export default function Layout() {
  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-blue-100" style={{ backgroundColor: '#f4f6f8' }}>
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between bg-white px-6" style={{ borderBottom: '1px solid #dee2e6' }}>
        <Link to="/lehrender" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="hsd-logo text-2xl tracking-tight">HSD</div>
          <span className="text-lg tracking-tight" style={{ fontFamily: "'Segoe UI Light', 'Segoe UI', sans-serif", fontWeight: 300, color: '#000' }}>Hochschule Düsseldorf</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-500">Lehrenden-Portal</span>
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
