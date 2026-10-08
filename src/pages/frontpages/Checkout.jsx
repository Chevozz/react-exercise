import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../data/products";

const paymentLabels = {
  transfer: "Transfer Bank (BCA)",
  cod: "Bayar di tempat (COD)",
  ewallet: "E-Wallet (GoPay / OVO)",
};

const inputClass =
  "mt-1 w-full rounded-xl border border-sand bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-clay";

export default function Checkout() {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "transfer",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    if (form.name.trim().length < 3) {
      newErrors.name = "Nama minimal 3 karakter.";
    }
    if (form.address.trim().length < 10) {
      newErrors.address = "Alamat terlalu singkat, tulis yang lengkap agar memudahkan kurir mengantar pesanan anda.";
    }
    if (!/^0\d{8,12}$/.test(form.phone.trim())) {
      newErrors.phone = "Gunakan nomor HP, contoh: 081234567890.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setOrder({
        name: form.name,
        address: form.address,
        totalItems,
        totalPrice,
        payment: form.payment,
      });
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <div className="rounded-2xl border border-sage/40 bg-sage/10 p-6 text-center sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage text-paper">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 13 4 4L19 7" />
            </svg>
          </div>

          <h1 className="mt-4 font-serif text-2xl font-semibold text-ink">
            Pesanan berhasil diproses
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Terima kasih {order.name}, tim Jeda Store sedang menyiapkan{" "}
            {order.totalItems} produk untuk dikirim.
          </p>

          <dl className="mt-6 grid gap-3 rounded-xl bg-paper p-4 text-left text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                Total pembayaran
              </dt>
              <dd className="font-semibold text-ink">
                {formatPrice(order.totalPrice)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                Metode pembayaran
              </dt>
              <dd className="font-semibold text-ink">
                {paymentLabels[order.payment]}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-muted">
                Alamat pengiriman
              </dt>
              <dd className="text-ink">{order.address}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-claydark"
            >
              Belanja lagi
            </Link>
            <Link
              to="/admin"
              className="rounded-full border border-sand bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-clay"
            >
              Lihat panel admin
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-serif text-2xl font-semibold text-ink">
          Belum ada yang bisa dibayar
        </h1>
        <p className="mt-2 text-sm text-muted">
          Keranjang masih kosong. Pilih produk dulu sebelum checkout.
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
      <h1 className="font-serif text-2xl font-semibold text-ink">Checkout</h1>
      <p className="mt-1 text-sm text-muted">
        Lengkapi data pengiriman, lalu konfirmasi pesananmu.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]"
        noValidate
      >
        <section className="rounded-2xl border border-sand bg-paper p-5 sm:p-6">
          <h2 className="font-serif text-lg font-semibold text-ink">
            Data penerima
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="text-sm font-medium text-ink">
                Nama lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Contoh: Rania Putri"
                className={inputClass}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-claydark">{errors.name}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="text-sm font-medium text-ink">
                Alamat pengiriman
              </label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={form.address}
                onChange={handleChange}
                placeholder="Nama jalan, nomor rumah, kelurahan, kota, kode pos"
                className={inputClass}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-claydark">{errors.address}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-ink">
                Nomor telepon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                className={inputClass}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-claydark">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="payment" className="text-sm font-medium text-ink">
                Metode pembayaran
              </label>
              <select
                id="payment"
                name="payment"
                value={form.payment}
                onChange={handleChange}
                className={inputClass}
              >
                {Object.entries(paymentLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="note" className="text-sm font-medium text-ink">
                Catatan kurir (opsional)
              </label>
              <input
                id="note"
                name="note"
                type="text"
                value={form.note}
                onChange={handleChange}
                placeholder="Contoh: titip ke pos satpam"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-sand bg-paper p-5 lg:sticky lg:top-24">
          <h2 className="font-serif text-lg font-semibold text-ink">
            Ringkasan pesanan
          </h2>

          <ul className="mt-4 space-y-3">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center gap-3 text-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-ink">{item.name}</p>
                  <p className="text-xs text-muted">
                    {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <span className="font-medium text-ink">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="my-4 border-t border-dashed border-sand" />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">{totalItems} produk</span>
            <span className="font-serif text-xl font-semibold text-ink">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-clay py-3 text-sm font-semibold text-paper transition hover:bg-claydark"
          >
            Proses pesanan
          </button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-muted">
            Ini tugas praktikum — tidak ada pembayaran sungguhan yang diproses.
          </p>
        </aside>
      </form>
    </div>
  );
}