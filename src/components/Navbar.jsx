import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const menuItems = [
  { label: "Beranda", to: "/" },
  { label: "Keranjang", to: "/cart" },
  { label: "Checkout", to: "/checkout" },
  { label: "Admin", to: "/admin" },
];

function linkClass(isActive) {
  return [
    "rounded-full px-3 py-2 text-sm transition",
    isActive
      ? "bg-clay/10 font-semibold text-claydark"
      : "text-muted hover:bg-sand/70 hover:text-ink",
  ].join(" ");
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clay text-sm font-bold text-paper">
            JD
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold text-ink">
              Jeda Store
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.18em] text-muted sm:block">
              Pelankan hari
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => linkClass(isActive)}
            >
              {item.label}
              {item.to === "/cart" && totalItems > 0 && (
                <span className="ml-1 rounded-full bg-clay px-2 py-0.5 text-[11px] font-bold text-paper">
                  {totalItems}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand text-ink transition hover:border-clay hover:text-clay md:hidden"
            aria-label="Keranjang"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 6h16l-1.4 10.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8L4 6Z" strokeLinecap="round" />
              <path d="M9 6V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V6" strokeLinecap="round" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-clay px-1.5 text-[10px] font-bold text-paper">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand text-ink transition hover:border-clay md:hidden"
            aria-label="Buka menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {isMenuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="14" x2="20" y2="14" />
                  <line x1="4" y1="20" x2="20" y2="20" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-sand bg-paper md:hidden">
          <ul className="mx-auto grid max-w-6xl gap-1 px-4 py-3 sm:px-6">
            {menuItems.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.to);

              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-xl px-3 py-2 text-sm ${
                      isActive
                        ? "bg-clay/10 font-semibold text-claydark"
                        : "text-muted"
                    }`}
                  >
                    {item.label}
                    {item.to === "/cart" && totalItems > 0 && (
                      <span className="ml-2 rounded-full bg-clay px-2 py-0.5 text-[11px] font-bold text-paper">
                        {totalItems}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
