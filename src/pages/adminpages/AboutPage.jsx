import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div>
      <h2 className="font-serif text-xl font-semibold text-ink">
        Tentang aplikasi
      </h2>

      <div className="mt-6 flex flex-col gap-6">
        <section className="rounded-2xl border border-sand bg-paper p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
            Tentang Jeda Store
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Jeda Store adalah toko perlengkapan rumah dan gaya hidup yang
            menyediakan produk buatan pengrajin lokal Indonesia. Kami percaya
            barang yang dibuat perlahan akan dipakai lebih lama.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Katalog kami mencakup perlengkapan minum, perabot kecil, aksesoris,
            dan perawatan diri — semuanya dipilih dengan standar yang sama:
            bahan jujur, harga masuk akal, dan bentuk yang tidak cepat bosan.
          </p>
        </section>

      </div>
    </div>
  );
}