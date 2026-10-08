import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      <span className="inline-block rounded-full bg-sand px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
        Halaman tidak ada
      </span>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-ink">
        Halaman hilang dibawa angin
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Tautan yang kamu buka tidak tersedia. Coba mulai dari katalog Jeda Store.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-claydark"
      >
        Kembali ke beranda
      </Link>
    </div>
  );
}