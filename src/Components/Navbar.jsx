import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getBanda } from "../lib/aire";

const LINKS = [
  { to: "/", title: "Inicio" },
  { to: "/contaminantes", title: "Contaminantes" },
  { to: "/glosario", title: "Glosario" },
];

const LogoMark = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
    className="shrink-0"
  >
    <rect width="32" height="32" rx="9" fill="#1c2a38" />
    <path
      d="M9 18.5c2.2-2.6 4.6-3.4 7-2.4 2.4 1 4.8 0.2 7-2.4"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M9 23c2.2-2.6 4.6-3.4 7-2.4 2.4 1 4.8 0.2 7-2.4"
      stroke="rgba(255,255,255,0.45)"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <circle cx="9" cy="14" r="1.6" fill="#8fc4ec" />
  </svg>
);

const Navbar = ({ currentPm25 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const banda = currentPm25 > 0 ? getBanda(currentPm25) : null;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-ink text-white shadow-sm"
        : "text-slate hover:text-ink hover:bg-white"
    }`;

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-3 sm:pt-4">
        <div className="glass rounded-2xl flex items-center justify-between gap-3 pl-3 pr-2 py-2">
          <NavLink
            to="/"
            className="flex items-center gap-2.5 mr-2 rounded-xl"
            onClick={() => setIsOpen(false)}
          >
            <LogoMark />
            <span className="font-display font-bold text-lg tracking-tight text-ink">
              Airware
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1" aria-label="Principal">
            {LINKS.map(({ to, title }) => (
              <NavLink key={to} to={to} className={linkClass} end={to === "/"}>
                {title}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {banda && (
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 py-1.5 pl-2.5 pr-3.5">
                <span
                  className="live-dot"
                  style={{ background: banda.color, color: banda.color }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate">
                  {currentPm25.toFixed(2)} µg/m³ · {banda.label}
                </span>
              </span>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-ink hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aire"
            >
              <i className={`bi ${isOpen ? "bi-x-lg" : "bi-list"} text-xl`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mx-4 mt-2 sm:mx-6">
          <div className="glass rounded-2xl p-2 shadow-lg">
            {LINKS.map(({ to, title }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? "bg-ink text-white" : "text-ink hover:bg-white"
                  }`
                }
              >
                {title}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
