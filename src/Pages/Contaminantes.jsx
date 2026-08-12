import React from "react";
import { Link } from "react-router-dom";

import "../index.css";

// Datos de referencia: cada tarjeta describe un contaminante distinto.
const especimenes = [
  { id: "01", codigo: "PM2.5", nombre: "Partículas finas", tipo: "partícula", color: "#d6452f", tamano: "2.5 µm", diametro: 4, origen: "Motores diésel, humo de quema, cocinas a leña.", efecto: "Se cuela hasta los alvéolos y sigue de viaje a la sangre.", nota: "El más fino. El que más molesta." },
  { id: "02", codigo: "PM10", nombre: "Partículas gruesas", tipo: "partícula", color: "#e5a91e", tamano: "10 µm", diametro: 17, origen: "Polvo de calles y obras, tierra levantada.", efecto: "Se atora en la nariz y la garganta.", nota: "Se ve más. Se atora antes." },
  { id: "03", codigo: "CO", nombre: "Monóxido de carbono", tipo: "gas", color: "#d6452f", tamano: "Invisible", origen: "Combustión sin ventilación: motores, calefones.", efecto: "Le roba el oxígeno a la sangre. Sin olor, sin color.", nota: "El silencioso." },
  { id: "04", codigo: "NO₂", nombre: "Dióxido de nitrógeno", tipo: "gas", color: "#d6452f", tamano: "Invisible", origen: "Caños de escape y calderas.", efecto: "Irrita las vías respiratorias y enciende el asma.", nota: "El que pinta los atardeceres naranjas. Lindo, pero no." },
  { id: "05", codigo: "SO₂", nombre: "Dióxido de azufre", tipo: "gas", color: "#e5a91e", tamano: "Invisible", origen: "Quema de combustibles con azufre, industrias.", efecto: "Arde en los ojos y vuelve a bajar como lluvia ácida.", nota: "El del olor a fósforo recién apagado." },
  { id: "06", codigo: "O₃", nombre: "Ozono troposférico", tipo: "gas", color: "#e5a91e", tamano: "Invisible", origen: "No sale de un caño: sol + NOx + paciencia.", efecto: "Pincha la garganta en los días soleados.", nota: "El mismo ozono de arriba, portándose mal acá abajo." },
];

// Renderiza una sola tarjeta para no repetir el mismo bloque JSX muchas veces.
const renderSpecimen = (specimen, index) => {
  const isGas = specimen.tipo === "gas";

  return (
    <article
      key={specimen.id}
      className="fade-up flex flex-col bg-white/45 border border-ink/10 rounded-2xl p-5 sm:p-6 hover:border-ink/25 hover:bg-white/60 transition-colors duration-300"
      style={{ animationDelay: `${0.55 + index * 0.08}s` }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
          Esp. {specimen.id}
        </span>
        <span
          className="font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${specimen.color}1a`, color: specimen.color }}
        >
          {specimen.tipo}
        </span>
      </div>

      <h3 className="mt-4 font-display font-black tracking-tight text-3xl text-ink" style={{ fontStretch: "125%" }}>
        {specimen.codigo}
      </h3>
      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
        {specimen.nombre}
      </p>

      {/* El círculo central cambia según si es gas o partícula. */}
      <div
        className="mt-5 aspect-square w-28 sm:w-32 mx-auto rounded-full border border-ink/10 flex flex-col items-center justify-center gap-2"
        style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.85), rgba(233,229,219,0.55))" }}
      >
        {isGas ? (
          // Los gases no tienen tamaño visible, por eso se muestra una forma sutil.
          <>
            <span
              className="w-14 h-8 rounded-full"
              aria-hidden="true"
              style={{ background: "radial-gradient(circle at 50% 60%, rgba(27,32,38,0.07), transparent 70%)" }}
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/40 text-center px-2">
              Invisible
            </span>
          </>
        ) : (
          // Las partículas sí se dibujan con un punto cuyo tamaño representa su diámetro.
          <>
            <span
              className="rounded-full"
              aria-hidden="true"
              style={{
                width: specimen.diametro,
                height: specimen.diametro,
                background: specimen.color,
                boxShadow: `0 0 0 2px rgba(255,255,255,0.9), 0 0 0 3px ${specimen.color}40`,
              }}
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/55">
              {specimen.tamano}
            </span>
          </>
        )}
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        <div>
          <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">Origen</dt>
          <dd className="mt-0.5 text-ink/75 leading-snug">{specimen.origen}</dd>
        </div>
        <div>
          <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">Efecto</dt>
          <dd className="mt-0.5 text-ink/75 leading-snug">{specimen.efecto}</dd>
        </div>
      </dl>

      <p className="mt-auto pt-4 font-mono text-[11px] text-ink/45 italic">
        {specimen.nota}
      </p>
    </article>
  );
};

const Contaminantes = () => {
  return (
    <div className="page-haze min-h-screen pt-24 sm:pt-28 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <header>
          {/* Encabezado principal: introduce el tema de la pagina. */}
          <p className="fade-up font-mono text-[11px] sm:text-xs uppercase tracking-[0.28em] text-ink/55" style={{ animationDelay: "0.05s" }}>
            Catálogo de especímenes · Lo que flota en Lima
          </p>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center mt-8 sm:mt-10">
            <div>
              {/* Título y texto introductorio de la pantalla. */}
              <h1
                className="fade-up font-display font-black tracking-tight leading-[0.97] text-4xl sm:text-5xl lg:text-6xl text-ink"
                style={{ animationDelay: "0.15s", fontStretch: "125%" }}
              >
                ¿Alguna vez te preguntaste cómo se contamina el aire?
              </h1>

              <p className="fade-up mt-6 text-ink/70 text-base sm:text-lg max-w-md leading-relaxed font-medium" style={{ animationDelay: "0.3s" }}>
                Catálogo de especímenes. Sin filtros (eso es parte del problema).
              </p>

              <p className="fade-up mt-4 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-ink/45" style={{ animationDelay: "0.4s" }}>
                6 especímenes · 2 partículas · 4 gases · 0 consejos de salud
              </p>

              {/* Viñetas cortas para explicar qué muestra la pagina. */}
              <ul className="fade-up mt-5 space-y-2 text-sm sm:text-base text-ink/70 max-w-md" style={{ animationDelay: "0.45s" }}>
                <li>• PM2.5 y PM10 son partículas que respiras sin verlas.</li>
                <li>• CO, NO₂, SO₂ y O₃ son gases que también afectan el aire.</li>
                <li>• La tarjeta de la derecha compara tamaños para que se entienda mejor.</li>
              </ul>

              <div className="fade-up mt-8" style={{ animationDelay: "0.55s" }}>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-ink text-smog text-sm font-semibold tracking-wide rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink transition-all duration-300"
                >
                  Volver al inicio
                </Link>
              </div>
            </div>

            {/* Tarjeta visual: compara el tamaño de las partículas con referencias simples. */}
            <div className="fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="haze-in bg-white/60 border border-ink/10 rounded-2xl p-6 sm:p-7 backdrop-blur-sm shadow-sm">
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-ink/55">
                  Lámina de referencia · Escala aproximada
                </p>

                <div className="mt-8">
                  <div className="flex items-center justify-center">
                    <span className="block w-3/4 h-0.5 rounded-full bg-ink/70" aria-hidden="true" />
                  </div>
                  <p className="mt-2 text-center font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ink/50">
                    Cabello humano · 70 µm
                  </p>
                </div>

                <div className="mt-8 flex items-end justify-center gap-14 sm:gap-20">
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className="rounded-full"
                      aria-hidden="true"
                      style={{ width: 17, height: 17, background: "#e5a91e", boxShadow: "0 0 0 2px rgba(255,255,255,0.9)" }}
                    />
                    <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-ink/60">
                      PM10 · 10 µm
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className="rounded-full"
                      aria-hidden="true"
                      style={{ width: 4, height: 4, background: "#d6452f", boxShadow: "0 0 0 2px rgba(255,255,255,0.9), 0 0 0 3px rgba(214,69,47,0.35)" }}
                    />
                    <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-ink/60">
                      PM2.5 · 2.5 µm
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-ink/10 flex items-end justify-between">
                  <span className="font-mono text-[9px] sm:text-[10px] text-ink/40">0</span>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-ink/40">
                    Lo que respiras hoy, a escala de un cabello.
                  </span>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-ink/70">
                  <li>• PM10 es más grande y se queda antes.</li>
                  <li>• PM2.5 es más fino y llega más profundo.</li>
                  <li>• Los gases no se ven, pero igual afectan la respiración.</li>
                </ul>
              </div>
            </div>
          </div>
        </header>

  {/* Grid principal con todas las tarjetas de contaminantes. */}
        <section className="mt-16 sm:mt-24 pt-10 border-t border-ink/10">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.28em] text-ink/55">
              Colección permanente · Aire de Lima
            </h2>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ink/40">
              Clasificado por tamaño, que para eso sirve
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Aquí se convierten los datos del arreglo en tarjetas visuales. */}
            {especimenes.map((specimen, index) => renderSpecimen(specimen, index))}
          </div>
        </section>

        <footer className="fade-up mt-16 sm:mt-24 pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center" style={{ animationDelay: "0.9s" }}>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink/45">
            Colección clasificada · Sin conservantes, con contaminantes
          </p>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink/45">
            Entrada libre. Respira por tu cuenta.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Contaminantes;
