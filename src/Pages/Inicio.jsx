/* eslint-disable react/prop-types */

import React from "react";
import { Link } from "react-router-dom";

import "../index.css";

const BANDAS = [
  { max: 12, label: "Buena", color: "#3f9d4e" },
  { max: 35, label: "Moderada", color: "#e5a91e" },
  { max: 50, label: "Mala", color: "#d6452f" },
];

const Inicio = ({ currentPm25 }) => {
  const hora = new Date().getHours();
  const minuto = new Date().getMinutes().toString().padStart(2, "0");
  const valor = currentPm25 ?? 28;
  const valorMostrado = Number(valor).toFixed(2);

  // Se usa para decidir el color y el texto del estado del aire.
  const banda = BANDAS.find((b) => valor <= b.max);

  // Barras fijas para mostrar el rango visual de PM2.5.
  const escalas = [
    { label: "Buena", rango: "0–12", color: "#3f9d4e", ancho: 8 },
    { label: "Moderada", rango: "13–35", color: "#e5a91e", ancho: 15.33 },
    { label: "Mala", rango: "36+", color: "#d6452f", ancho: 76.67 },
  ];

  return (
    <div className="page-haze min-h-screen pt-24 sm:pt-28 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <header>
          <p
            className="fade-up font-mono text-[11px] sm:text-xs uppercase tracking-[0.28em] text-ink/55"
            style={{ animationDelay: "0.05s" }}
          >
            Estación de lectura · Lima 12.04°S 77.03°W · sin esfuerzo, con amor
          </p>

          <div className="grid gap-10 items-center mt-8 sm:mt-10">
            <div>
              <h1
                className="fade-up font-display font-black tracking-tight leading-[0.95] text-4xl sm:text-5xl lg:text-6xl text-ink font-stretch-125%"
                style={{ animationDelay: "0.15s" }}
              >
                El aire no se ve.
                <br />
                Se lee.
              </h1>

              <p
                className="fade-up mt-6 text-ink/70 text-base sm:text-lg max-w-md leading-relaxed font-medium"
                style={{ animationDelay: "0.3s" }}
              >
                Una lectura simple y directa del aire que respiras, actualizada
                con datos en tiempo real.
              </p>

              <ul className="fade-up mt-5 space-y-2 text-sm sm:text-base text-ink/70 max-w-md" style={{ animationDelay: "0.38s" }}>
                <li>• Consulta el valor actual de PM2.5 para Lima.</li>
                <li>• Revisa si el aire está en nivel bueno, moderado o malo.</li>
                <li>• Entra a contaminantes si quieres ver qué lo compone.</li>
              </ul>

              <div
                className="fade-up mt-8 flex flex-wrap gap-3"
                style={{ animationDelay: "0.48s" }}
              >
                <Link
                  to="/contaminantes"
                  className="px-6 py-3 border border-ink/25 text-ink text-sm font-semibold tracking-wide rounded-full hover:border-ink hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink transition-all duration-300"
                >
                  Qué contiene el aire
                </Link>
              </div>
            </div>

            <div className="fade-up mt-2" style={{ animationDelay: "0.3s" }}>
              <div className="haze-in max-w-md rounded-3xl border border-ink/10 bg-white/60 p-6 sm:p-8 shadow-sm backdrop-blur-sm">
                {/* Bloque principal: muestra el número actual y la categoría resultante. */}
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-ink/55">
                  Lectura actual
                </p>
                <div className="mt-4 flex items-end gap-3">
                  <span
                    className="font-mono font-semibold leading-none text-5xl sm:text-6xl"
                    style={{ color: banda.color }}
                  >
                    {valorMostrado}
                  </span>
                  <span className="pb-1 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-ink/55">
                    PM2.5 · µg/m³
                  </span>
                </div>
                <span
                  className="mt-4 inline-block px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] rounded-full"
                  style={{ backgroundColor: `${banda.color}1f`, color: banda.color }}
                >
                  {banda.label}
                </span>
                <ul className="mt-4 space-y-2 text-sm sm:text-base text-ink/70 leading-relaxed">
                  <li>• El dato viene directamente de Open-Meteo.</li>
                  <li>• El valor corresponde a la hora actual.</li>
                  <li>• El color cambia según el rango del aire.</li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Escala de lectura — estructura de la página */}
        <section className="fade-up mt-16 sm:mt-24 pt-10 border-t border-ink/10" style={{ animationDelay: "0.5s" }}>
          {/* La escala ayuda a leer rápido si el valor cae en un rango bueno, medio o malo. */}
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.28em] text-ink/55">
              Escala de lectura · PM2.5
            </h2>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ink/40">
              Leyéndose a las {hora}:{minuto} en Lima
            </p>
          </div>

          <div className="flex h-2 rounded-full overflow-hidden">
            {escalas.map((e) => (
              <div key={e.label} className="h-full" style={{ width: `${e.ancho}%`, background: e.color }} />
            ))}
          </div>

          <div className="flex mt-3">
            {escalas.map((e) => (
              <div key={e.label} style={{ width: `${e.ancho}%` }} className={e.label === banda.label ? "text-ink" : "text-ink/40"}>
                <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold">
                  {e.label}
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] text-ink/45">
                  {e.rango} µg/m³
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="fade-up mt-16 sm:mt-24 pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center" style={{ animationDelay: "0.7s" }}>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink/45">
            Datos: Open-Meteo · Referencia: Lima, Perú
          </p>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink/45">
            Si el dato no cuadra, respira hondo.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Inicio;
