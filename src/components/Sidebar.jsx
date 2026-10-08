import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const links = [
  { label: "Dashboard", to: "/admin", icon: "grid" },
  { label: "Tentang", to: "/admin/about", icon: "info" },
];

function Icon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5",
  };

  if (name === "grid") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <circle cx="12" cy="8" r="0.6" fill="currentColor" />
    </svg>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (isActive) =>
    [
      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
      isActive
        ? "bg-clay/10 font-semibold text-claydark"
        : "text-muted hover:bg-sand hover:text-ink",
    ].join(" ");

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex items-center gap-2 rounded-xl border border-sand px-3 py-2 text-sm text-ink md:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {isOpen ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="13" x2="20" y2="13" />
              <line x1="4" y1="19" x2="20" y2="19" />
            </>
          )}
        </svg>
        Menu Admin
      </button>

      <aside
        className={[
          "rounded-2xl border border-sand bg-paper p-4",
          isOpen ? "block" : "hidden md:block",
        ].join(" ")}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-clay text-xs font-bold text-paper">
              JD
            </span>
            <span className="font-serif text-base font-semibold text-ink">
              Panel Admin
            </span>
          </Link>
        </div>

        <nav className="mt-4 grid gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/admin"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => linkClass(isActive)}
            >
              <Icon name={link.icon} />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}