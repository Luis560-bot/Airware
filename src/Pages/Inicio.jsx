import React from "react";
import { Link } from "react-router-dom";
import { BANDAS, getBanda } from "../lib/aire";

const MAX_ESCALA = 40;

const segmentos = BANDAS.map((b, i) => {
  const desde = i === 0 ? 0 : BANDAS[i - 1].max;
  const hasta = b.max === Number.POSITIVE_INFINITY ? MAX_ESCALA : b.max;
  return { ...b, desde, hasta, ancho: ((hasta - desde) / MAX_ESCALA) * 100 };
});

const rangoLabel = (b) =>
  b.max === Number.POSITIVE_INFINITY
    ? `${b.desde + 1}+`
    : `${b.desde}–${b.hasta}`;

const FEATURES = [
  {
    icon: "bi-activity",
    texto: "Valor actual de PM2.5 para Lima, en tiempo real.",
  },
  {
    icon: "bi-shield-check",
    texto: "Nivel de aire: bueno, moderado o malo, con su color.",
  },
  {
    icon: "bi-book",
    texto: "Glosario y catálogo para entender qué lo compone.",
  },
];

const Inicio = ({ currentPm25 }) => {
  const hora = new Date().getHours();
  const minuto = new Date().getMinutes().toString().padStart(2, "0");
  const valor = Number(currentPm25).toFixed(2);
  const banda = getBanda(currentPm25);
  const posicion = Math.min(100, Math.max(0, (currentPm25 / MAX_ESCALA) * 100));

  return (
    <div className="atmosphere min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <p className="fade-up eyebrow flex items-center">
              <span className="eyebrow-dot" aria-hidden="true" />
              Estación de lectura · Lima 12.04°S 77.03°O
            </p>

            <h1
              className="fade-up mt-5 font-display font-bold tracking-tight leading-[1.02] text-balance text-4xl sm:text-5xl lg:text-6xl text-ink"
              style={{ animationDelay: "0.1s" }}
            >
              El aire no se ve.
              <br />
              Se lee.
            </h1>

            <p
              className="fade-up mt-6 max-w-md text-base sm:text-lg text-slate leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              Una lectura simple y directa del aire que respiras, actualizada
              con datos en tiempo real.
            </p>

            <ul
              className="fade-up mt-6 space-y-3"
              style={{ animationDelay: "0.28s" }}
            >
              {FEATURES.map(({ icon, texto }) => (
                <li key={icon} className="flex items-start gap-3 text-sm sm:text-base text-slate">
                  <span className="mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-ink/10 text-aire shrink-0">
                    <i className={`bi ${icon} text-sm`} aria-hidden="true" />
                  </span>
                  <span className="leading-relaxed">{texto}</span>
                </li>
              ))}
            </ul>

            <div
              className="fade-up mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "0.38s" }}
            >
              <Link to="/glosario" className="btn btn-primary">
                Leer el glosario
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
              <Link to="/contaminantes" className="btn btn-ghost">
                Qué contiene el aire
              </Link>
            </div>
          </div>

          <div className="fade-up" style={{ animationDelay: "0.25s" }}>
            <div className="card relative overflow-hidden p-6 sm:p-8">
              <div
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(63,126,176,0.12), transparent 65%)" }}
                aria-hidden="true"
              />

              <p className="eyebrow flex items-center gap-2">
                <span
                  className="live-dot"
                  style={{ background: banda.color, color: banda.color }}
                  aria-hidden="true"
                />
                Lectura actual
              </p>

              <div className="mt-5 flex items-end gap-3">
                <span
                  className="font-mono font-semibold leading-none text-6xl sm:text-7xl tracking-tight"
                  style={{ color: banda.color }}
                >
                  {valor}
                </span>
                <span className="pb-1.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-slate">
                  PM2.5 · µg/m³
                </span>
              </div>

              <span
                className="mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider"
                style={{ background: `${banda.color}1a`, color: banda.color }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: banda.color }}
                  aria-hidden="true"
                />
                Aire {banda.label}
              </span>

              <div className="mt-7">
                <div className="flex h-2 rounded-full overflow-hidden">
                  {segmentos.map((b) => (
                    <div
                      key={b.label}
                      className="h-full"
                      style={{
                        background: b.color,
                        minWidth: b.max === Number.POSITIVE_INFINITY ? `${b.ancho}%` : undefined,
                        width: b.max === Number.POSITIVE_INFINITY ? undefined : `${b.ancho}%`,
                        flexGrow: b.max === Number.POSITIVE_INFINITY ? 1 : 0,
                      }}
                    />
                  ))}
                </div>
                <div className="relative mt-1.5 h-4">
                  {segmentos.map((b) => (
                    <span
                      key={b.label}
                      className="absolute -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider text-fog"
                      style={{ left: `${((b.desde + b.hasta) / 2 / MAX_ESCALA) * 100}%` }}
                    >
                      {rangoLabel(b)}
                    </span>
                  ))}
                  <div
                    className="absolute top-0 -translate-x-1/2 transition-all duration-700"
                    style={{ left: `${posicion}%` }}
                  >
                    <span
                      className="block w-1.5 h-4 rounded-full"
                      style={{ background: banda.color, boxShadow: `0 0 0 3px rgba(255,255,255,0.9), 0 2px 6px rgba(11,21,32,0.25)` }}
                    />
                  </div>
                </div>
              </div>

              <p className="mt-6 pt-4 border-t border-ink/10 font-mono text-[11px] uppercase tracking-wider text-fog">
                Leyéndose a las {hora}:{minuto} · Open-Meteo
              </p>
            </div>
          </div>
        </header>

        <section className="fade-up mt-16 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-ink">
              Escala de lectura
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-wider text-fog">
              PM2.5 · µg/m³ · {hora}:{minuto} en Lima
            </p>
          </div>

          <div className="card mt-5 p-5 sm:p-7">
            <div className="flex h-2.5 rounded-full overflow-hidden">
              {segmentos.map((b) => (
                <div
                  key={b.label}
                  className="h-full"
                  style={{
                    background: b.color,
                    minWidth: b.max === Number.POSITIVE_INFINITY ? `${b.ancho}%` : undefined,
                    width: b.max === Number.POSITIVE_INFINITY ? undefined : `${b.ancho}%`,
                    flexGrow: b.max === Number.POSITIVE_INFINITY ? 1 : 0,
                  }}
                />
              ))}
            </div>

            <div className="relative mt-2 h-6">
              {segmentos.map((b) => (
                <span
                  key={b.label}
                  className="absolute -top-0.5 -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider text-fog"
                  style={{ left: `${((b.desde + b.hasta) / 2 / MAX_ESCALA) * 100}%` }}
                >
                  {rangoLabel(b)}
                </span>
              ))}
              <div
                className="absolute top-2 -translate-x-1/2 transition-all duration-700"
                style={{ left: `${posicion}%` }}
              >
                <span
                  className="block w-2 h-6 rounded-full"
                  style={{ background: banda.color, boxShadow: `0 0 0 4px rgba(255,255,255,0.9), 0 4px 10px rgba(11,21,32,0.3)` }}
                />
                <span
                  className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] font-semibold"
                  style={{ color: banda.color }}
                >
                  {valor}
                </span>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {BANDAS.map((b) => {
                const activa = banda.label === b.label;
                return (
                  <div
                    key={b.label}
                    className={`rounded-xl border p-4 transition-colors ${
                      activa
                        ? "border-ink/15 bg-white shadow-sm"
                        : "border-ink/5 bg-cloud"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: b.color }}
                        aria-hidden="true"
                      />
                      <p className="font-semibold text-sm text-ink">{b.label}</p>
                    </div>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-slate">
                      {rangoLabel(b)} µg/m³
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-sm text-slate leading-relaxed">
              El dato viene directamente de Open-Meteo y corresponde a la hora
              actual. El color cambia según el rango en el que caiga la lectura.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Inicio;
