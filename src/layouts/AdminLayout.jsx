import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-sand/30">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              Panel Internal
            </span>
            <h1 className="font-serif text-xl font-semibold text-ink">
              Jeda Store Admin
            </h1>
          </div>
          <Link
            to="/"
            className="rounded-full border border-sand px-3 py-1.5 text-xs text-muted transition hover:border-clay hover:text-claydark"
          >
            ← Kembali ke etalase
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-[220px_1fr]">
          <Sidebar />
          <main className="rounded-2xl border border-sand bg-paper p-5 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}