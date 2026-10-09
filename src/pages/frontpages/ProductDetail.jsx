import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductImage from "../../components/ProductImage";
import ProductCard from "../../components/ProductCard";
import { getProductById, products, formatPrice } from "../../data/products";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-serif text-2xl font-semibold text-ink">
          Produk tidak ditemukan
        </h1>
        <p className="mt-2 text-sm text-muted">
          Barang dengan ID #{id} belum tersedia di katalog Jeda Store.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-claydark"
        >
          Kembali ke katalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
  };

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <nav className="text-xs text-muted">
        <Link to="/" className="hover:text-claydark">
          Beranda
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-ink">{product.category}</span>
        <span className="px-1.5">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-5 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-sand bg-sand/30">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <span className="inline-block rounded-full bg-sand px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-muted">
            {product.category}
          </span>

          <h1 className="mt-3 font-serif text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <span>★ {product.rating.toFixed(1)}</span>
            <span>Terjual {product.sold}</span>
            <span>Stock tersisa {product.stock}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-6 rounded-2xl border border-sand bg-paper p-4">
            <span className="text-[11px] uppercase tracking-wide text-muted">
              Harga
            </span>
            <p className="font-serif text-2xl font-semibold text-ink">
              {formatPrice(product.price)}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 rounded-full border border-sand px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="h-7 w-7 rounded-full bg-sand text-sm font-semibold text-ink"
                  aria-label="Kurangi jumlah"
                >
                  −
                </button>
                <span className="min-w-6 text-center text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))}
                  className="h-7 w-7 rounded-full bg-sand text-sm font-semibold text-ink"
                  aria-label="Tambah jumlah"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-claydark"
              >
                Masukkan keranjang
              </button>
            </div>

            {isAdded && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-sage/10 px-3 py-2 text-xs text-sagedark">
                <span>
                  {quantity} × {product.name} ada di keranjang.
                </span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="font-semibold underline"
                  >
                    Lihat keranjang
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdded(false)}
                    className="text-muted"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>

          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">
              Informasi tambahan
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {product.details.map((detail) => (
                <li key={detail} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  {detail}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-14">
          <h2 className="font-serif text-xl font-semibold text-ink">
            Pilihan lain di kategori ini
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
