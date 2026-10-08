import { Link } from "react-router-dom";
import { products, categories, formatPrice } from "../../data/products";
import { useCart } from "../../context/CartContext";

const stats = [
  { label: "Total produk", value: products.length, hint: "aktif di katalog" },
  { label: "Kategori", value: categories.length - 1, hint: "tanpa filter Semua" },
  { label: "Pesanan hari ini", value: 18, hint: "simulasi data statis" },
  { label: "Pengrajin mitra", value: 9, hint: "tersedia untuk restok" },
];

export default function AdminDashboard() {
  const { cartItems, totalPrice } = useCart();

  const cheapest = [...products].sort((a, b) => a.price - b.price).slice(0, 5);
  const perks = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl font-semibold text-ink">
            Ringkasan toko
          </h2>
          <p className="mt-1 text-sm text-muted">
            Data diambil dari array produk lokal dan state keranjang.
          </p>
        </div>
        <Link
          to="/admin/about"
          className="rounded-full border border-sand px-3 py-1.5 text-xs text-muted transition hover:border-clay hover:text-claydark"
        >
          Tentang aplikasi
        </Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-sand bg-paper p-4"
          >
            <p className="text-[11px] uppercase tracking-wide text-muted">
              {stat.label}
            </p>
            <p className="mt-1 font-serif text-2xl font-semibold text-ink">
              {stat.value}
            </p>
            <p className="text-xs text-muted">{stat.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-sand bg-paper p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
            Keranjang berjalan
          </h3>
          {cartItems.length === 0 ? (
            <p className="mt-3 text-sm text-muted">
              Belum ada produk yang dimasukkan pengunjung.
            </p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3">
                  <span className="truncate text-ink">{item.name}</span>
                  <span className="shrink-0 text-muted">
                    {item.quantity} × {formatPrice(item.price)}
                  </span>
                </li>
              ))}
              <li className="flex items-center justify-between border-t border-dashed border-sand pt-2 font-semibold">
                <span className="text-ink">Total</span>
                <span className="text-ink">{formatPrice(totalPrice)}</span>
              </li>
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-sand bg-paper p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
            Produk terlaris
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {perks.map((product) => (
              <li key={product.id} className="flex items-center justify-between gap-3">
                <span className="truncate text-ink">{product.name}</span>
                <span className="shrink-0 text-muted">{product.sold} terjual</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-sand bg-paper p-4 lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
            Harga terendah
          </h3>
          <ul className="mt-3 divide-y divide-dashed divide-sand text-sm">
            {cheapest.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-3 py-2"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="truncate text-ink hover:text-claydark"
                >
                  {product.name}
                </Link>
                <span className="shrink-0 text-muted">
                  {formatPrice(product.price)} · stok {product.stock}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}