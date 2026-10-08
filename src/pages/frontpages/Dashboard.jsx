import { useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { products, categories } from "../../data/products";

export default function Dashboard() {
  const { searchQuery } = useOutletContext();
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredProducts = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const inCategory =
        activeCategory === "Semua" || product.category === activeCategory;
      const inSearch =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword);

      return inCategory && inSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <>
      <section className="border-b border-sand bg-sand/30">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-claydark">
              <span className="h-1.5 w-1.5 rounded-full bg-clay" />
              Koleksi Baru 2026
            </span>
            <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Pelankan hari,
              <br />
              rapikan rumahmu.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Perlengkapan rumah dan gaya hidup pilihan dari pengrajin lokal —
              dibuat perlahan, dipakai bertahun-tahun.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#koleksi"
                className="rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-claydark"
              >
                Lihat koleksi
              </a>
              <Link
                to="/product/6"
                className="rounded-full border border-sand bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-clay"
              >
                Produk unggulan
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              {[products[5], products[3], products[0], products[10]].map(
                (product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="overflow-hidden rounded-2xl border border-sand bg-paper"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-square w-full object-cover"
                    />
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="koleksi" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Koleksi produk
            </h2>
            <p className="mt-1 text-sm text-muted">
              {filteredProducts.length} produk tersedia
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={[
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                  activeCategory === category
                    ? "border-clay bg-clay text-paper"
                    : "border-sand bg-paper text-muted hover:border-clay/50 hover:text-ink",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-sand bg-paper p-10 text-center">
            <p className="font-serif text-lg font-semibold text-ink">
              Belum ada produk yang cocok
            </p>
            <p className="mt-1 text-sm text-muted">
              Coba kata kunci lain atau pilih kategori berbeda.
            </p>
          </div>
        )}
      </section>
    </>
  );
}