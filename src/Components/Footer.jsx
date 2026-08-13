import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-white/55">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display font-bold text-lg tracking-tight text-ink">
              Airware
            </p>
            <p className="mt-2 text-sm text-slate leading-relaxed max-w-xs">
              Un glosario y catálogo del aire de Lima: lo que se mide, lo que
              flota y lo que respiras sin ver.
            </p>
          </div>

          <nav aria-label="Explorar">
            <p className="eyebrow mb-3">Explorar</p>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", title: "Lectura en vivo" },
                { to: "/contaminantes", title: "Contaminantes" },
                { to: "/glosario", title: "Glosario" },
              ].map(({ to, title }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-slate hover:text-aire-deep transition-colors"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-3">Fuente de datos</p>
            <p className="text-sm text-slate leading-relaxed">
              Lecturas de PM2.5 y PM10 de Open-Meteo Air Quality, para las
              coordenadas de Lima (12.04°S, 77.03°O).
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-wider text-fog">
            © {new Date().getFullYear()} Airware · Medido en Lima, Perú
          </p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-fog">
            Sin relación con la RAE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
