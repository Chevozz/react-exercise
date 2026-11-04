import { useState } from "react";
import { saveToken } from "../api";

const inputClass =
  "mt-1 w-full rounded-xl border border-sand bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-clay";

// Semua endpoint katalog dilindungi auth:sanctum, jadi halaman ini menjadi
// pintu masuk: tombolnya memakai /api/register dan /api/login milik Laravel.
export default function LoginPage({ onSuccess }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const isRegister = mode === "register";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setMessage("");

    const body = isRegister
      ? { ...form, password_confirmation: form.password }
      : { email: form.email, password: form.password };

    try {
      const response = await fetch(`/api/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });
      const payload = await response.json();

      if (!response.ok) {
        const firstError = payload.errors
          ? Object.values(payload.errors).flat()[0]
          : payload.message;
        throw new Error(firstError || `Gagal (${response.status}).`);
      }

      saveToken(payload.data.token);
      onSuccess(payload.data.user);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-serif text-2xl font-semibold text-ink">
        {isRegister ? "Daftar akun Jeda Store" : "Masuk ke Jeda Store"}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {isRegister
          ? "Buat akun baru untuk mengakses katalog produk."
          : "Masuk untuk mengakses katalog produk."}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-sand bg-paper p-5"
      >
        {isRegister && (
          <label className="block text-sm font-medium text-ink">
            Nama
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Nama pengguna"
            />
          </label>
        )}

        <label className="mt-4 block text-sm font-medium text-ink">
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="nama@example.test"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-ink">
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className={inputClass}
            placeholder="Minimal 8 karakter"
          />
        </label>

        {message && (
          <p className="mt-3 rounded-xl bg-sand/60 px-3 py-2 text-xs text-claydark">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSending}
          className="mt-5 w-full rounded-full bg-clay py-3 text-sm font-semibold text-paper transition hover:bg-claydark disabled:opacity-60"
        >
          {isSending ? "Memproses..." : isRegister ? "Daftar" : "Masuk"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(isRegister ? "login" : "register");
            setMessage("");
          }}
          className="mt-3 w-full text-center text-xs text-muted underline"
        >
          {isRegister
            ? "Sudah punya akun? Masuk"
            : "Belum punya akun? Daftar dulu"}
        </button>
      </form>
    </div>
  );
}
