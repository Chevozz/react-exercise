import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-sand bg-sand/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clay text-sm font-bold text-paper">
              JD
            </span>
            <span className="font-serif text-lg font-semibold text-ink">Jeda Store</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Pelankan hari, rapikan rumah. Perlengkapan rumah dan gaya hidup
            pilihan dari pengrajin lokal Indonesia.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
            Jelajahi
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link to="/" className="hover:text-claydark">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-claydark">
                Keranjang
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:text-claydark">
                Checkout
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-claydark">
                Panel Admin
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
            Kunjungi Kami
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Jl. Cempaka No. 12, Yogyakarta
            <br />
            Senin–Sabtu, 09.00–17.00 WIB
            <br />
            halo@jedastore.id
          </p>
        </div>
      </div>

      <div className="border-t border-sand py-4">
        <p className="text-center text-xs text-muted">
          &copy; 2026 Jeda Store — Tugas Praktikum Frontend Programming (React &amp; Tailwind CSS).
        </p>
      </div>
    </footer>
  );
}