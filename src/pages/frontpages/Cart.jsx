import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../data/products";

export default function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand text-claydark">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 6h16l-1.4 10.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8L4 6Z" strokeLinecap="round" />
            <path d="M9 6V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V6" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="mt-5 font-serif text-2xl font-semibold text-ink">
          Keranjangmu masih kosong
        </h1>
        <p className="mt-2 text-sm text-muted">
          Yuk pilih perlengkapan yang bikin rumah lebih nyaman.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-claydark"
        >
          Jelajahi katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-ink">
            Keranjang belanja
          </h1>
          <p className="mt-1 text-sm text-muted">
            {totalItems} produk siap dibayar
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <ul className="space-y-3">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex gap-4 rounded-2xl border border-sand bg-paper p-4"
            >
              <Link
                to={`/product/${item.id}`}
                className="shrink-0 overflow-hidden rounded-xl bg-sand/40"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 object-cover sm:h-28 sm:w-28"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-base font-semibold text-ink">
                      <Link to={`/product/${item.id}`} className="hover:text-claydark">
                        {item.name}
                      </Link>
                    </h2>
                    <p className="text-xs text-muted">{item.category}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-muted transition hover:text-claydark"
                  >
                    Hapus
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <div className="flex items-center gap-3 rounded-full border border-sand px-2 py-1">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="h-7 w-7 rounded-full bg-sand text-sm font-semibold text-ink"
                      aria-label="Kurangi"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="h-7 w-7 rounded-full bg-sand text-sm font-semibold text-ink"
                      aria-label="Tambah"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-wide text-muted">
                      {formatPrice(item.price)} / item
                    </p>
                    <p className="font-semibold text-ink">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-sand bg-paper p-5 lg:sticky lg:top-24">
          <h2 className="font-serif text-lg font-semibold text-ink">
            Ringkasan belanja
          </h2>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted">Jumlah produk</dt>
              <dd className="text-ink">{totalItems}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="text-ink">{formatPrice(totalPrice)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted">Ongkos kirim</dt>
              <dd className="text-ink">Gratis</dd>
            </div>
          </dl>

          <div className="my-4 border-t border-dashed border-sand" />

          <div className="flex items-center justify-between">
            <span className="font-medium text-ink">Total</span>
            <span className="font-serif text-xl font-semibold text-ink">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <Link
            to="/checkout"
            className="mt-5 block rounded-full bg-clay py-3 text-center text-sm font-semibold text-paper transition hover:bg-claydark"
          >
            Lanjut ke pembayaran
          </Link>
          <Link
            to="/"
            className="mt-2 block rounded-full border border-sand py-3 text-center text-sm font-semibold text-muted transition hover:border-clay hover:text-ink"
          >
            Tambah produk lain
          </Link>
        </aside>
      </div>
    </div>
  );
}