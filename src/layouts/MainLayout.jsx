import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />

      <section className="border-b border-sand bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <label
            htmlFor="search-input"
            className="block text-[11px] font-medium uppercase tracking-[0.14em] text-muted"
          >
            Cari perlengkapanmu
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-full border border-sand bg-paper px-4 py-2 focus-within:border-clay">
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="6.5" />
              <line x1="16.5" y1="16.5" x2="20.5" y2="20.5" />
            </svg>
            <input
              id="search-input"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Contoh: kopi, keramik, tote bag..."
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted/70"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="shrink-0 rounded-full bg-sand px-3 py-1 text-xs text-muted transition hover:text-ink"
              >
                Hapus
              </button>
            )}
          </div>
        </div>
      </section>

      <main className="flex-1">
        <Outlet context={{ searchQuery }} />
      </main>

      <Footer />
    </div>
  );
}