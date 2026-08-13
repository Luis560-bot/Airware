import React from "react";
import { Link } from "react-router-dom";

const especimenes = [
  { id: "01", codigo: "PM2.5", nombre: "Partículas finas", tipo: "partícula", color: "#d6452f", tamano: "2.5 µm", diametro: 4, origen: "Motores diésel, humo de quema, cocinas a leña.", efecto: "Se cuela hasta los alvéolos y sigue de viaje a la sangre.", nota: "El más fino. El que más molesta." },
  { id: "02", codigo: "PM10", nombre: "Partículas gruesas", tipo: "partícula", color: "#c97f1d", tamano: "10 µm", diametro: 17, origen: "Polvo de calles y obras, tierra levantada.", efecto: "Se atora en la nariz y la garganta.", nota: "Se ve más. Se atora antes." },
  { id: "03", codigo: "CO", nombre: "Monóxido de carbono", tipo: "gas", color: "#d6452f", tamano: "Invisible", origen: "Combustión sin ventilación: motores, calefones.", efecto: "Le roba el oxígeno a la sangre. Sin olor, sin color.", nota: "El silencioso." },
  { id: "04", codigo: "NO₂", nombre: "Dióxido de nitrógeno", tipo: "gas", color: "#3f7eb0", tamano: "Invisible", origen: "Caños de escape y calderas.", efecto: "Irrita las vías respiratorias y enciende el asma.", nota: "El que pinta los atardeceres naranjas. Lindo, pero no." },
  { id: "05", codigo: "SO₂", nombre: "Dióxido de azufre", tipo: "gas", color: "#c97f1d", tamano: "Invisible", origen: "Quema de combustibles con azufre, industrias.", efecto: "Arde en los ojos y vuelve a bajar como lluvia ácida.", nota: "El del olor a fósforo recién apagado." },
  { id: "06", codigo: "O₃", nombre: "Ozono troposférico", tipo: "gas", color: "#2f8fa8", tamano: "Invisible", origen: "No sale de un caño: sol + NOx + paciencia.", efecto: "Pincha la garganta en los días soleados.", nota: "El mismo ozono de arriba, portándose mal acá abajo." },
];

const renderSpecimen = (specimen, index) => {
  const isGas = specimen.tipo === "gas";

  return (
    <article
      key={specimen.id}
      className="fade-up card card-interactive h-full flex flex-col p-5 sm:p-6"
      style={{ animationDelay: `${0.2 + index * 0.07}s` }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
          Esp. {specimen.id}
        </span>
        <span className="tag">
          <span
            className="tag-dot"
            style={{ background: specimen.color }}
            aria-hidden="true"
          />
          {specimen.tipo}
        </span>
      </div>

      <h3 className="mt-4 font-display font-bold tracking-tight text-3xl text-ink">
        {specimen.codigo}
      </h3>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate">
        {specimen.nombre}
      </p>

      <div
        className="mt-5 aspect-square w-28 sm:w-32 mx-auto rounded-full border border-ink/10 flex flex-col items-center justify-center gap-2 shadow-inner"
        style={{ background: "radial-gradient(circle at 50% 38%, #ffffff, #eef4fa)" }}
      >
        {isGas ? (
          <>
            <span
              className="w-14 h-8 rounded-full"
              aria-hidden="true"
              style={{ background: "radial-gradient(circle at 50% 60%, rgba(27,42,56,0.08), transparent 70%)" }}
            />
            <span className="font-mono text-[9px] uppercase tracking-wider text-fog text-center px-2">
              Invisible
            </span>
          </>
        ) : (
          <>
            <span
              className="rounded-full"
              aria-hidden="true"
              style={{
                width: specimen.diametro,
                height: specimen.diametro,
                background: specimen.color,
                boxShadow: `0 0 0 3px rgba(255,255,255,0.9), 0 0 0 4px ${specimen.color}35`,
              }}
            />
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate">
              {specimen.tamano}
            </span>
          </>
        )}
      </div>

      <dl className="mt-5 space-y-3 text-sm grow">
        <div>
          <dt className="eyebrow">Origen</dt>
          <dd className="mt-1 text-slate leading-snug">{specimen.origen}</dd>
        </div>
        <div>
          <dt className="eyebrow">Efecto</dt>
          <dd className="mt-1 text-slate leading-snug">{specimen.efecto}</dd>
        </div>
      </dl>

      <p className="mt-4 pt-4 border-t border-ink/10 text-sm italic text-fog">
        {specimen.nota}
      </p>
    </article>
  );
};

const Contaminantes = () => {
  return (
    <div className="atmosphere min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <p className="fade-up eyebrow flex items-center">
              <span className="eyebrow-dot" aria-hidden="true" />
              Catálogo de especímenes · Lo que flota en Lima
            </p>

            <h1
              className="fade-up mt-5 font-display font-bold tracking-tight leading-[1.02] text-balance text-4xl sm:text-5xl lg:text-6xl text-ink"
              style={{ animationDelay: "0.1s" }}
            >
              ¿Alguna vez te preguntaste cómo se contamina el aire?
            </h1>

            <p
              className="fade-up mt-6 max-w-md text-base sm:text-lg text-slate leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              Catálogo de especímenes. Sin filtros (eso es parte del problema).
            </p>

            <p
              className="fade-up mt-4 font-mono text-[11px] uppercase tracking-wider text-fog"
              style={{ animationDelay: "0.25s" }}
            >
              6 especímenes · 2 partículas · 4 gases · 0 consejos de salud
            </p>

            <ul
              className="fade-up mt-6 space-y-3"
              style={{ animationDelay: "0.3s" }}
            >
              {[
                "PM2.5 y PM10 son partículas que respiras sin verlas.",
                "CO, NO₂, SO₂ y O₃ son gases que también afectan el aire.",
                "La lámina de referencia compara tamaños a escala real.",
              ].map((texto) => (
                <li key={texto} className="flex items-start gap-3 text-sm sm:text-base text-slate">
                  <span className="mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-ink/10 text-aire shrink-0">
                    <i className="bi bi-dot" aria-hidden="true" />
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
                Entender el vocabulario
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
              <Link to="/" className="btn btn-ghost">
                Volver al inicio
              </Link>
            </div>
          </div>

          <div className="fade-up" style={{ animationDelay: "0.25s" }}>
            <div className="card p-6 sm:p-7">
              <p className="eyebrow">Lámina de referencia · Escala aproximada</p>

              <div className="mt-7 flex items-center justify-center">
                <span className="block w-3/4 h-0.5 rounded-full bg-ink/60" aria-hidden="true" />
              </div>
              <p className="mt-2 text-center font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate">
                Cabello humano · 70 µm
              </p>

              <div className="mt-8 flex items-end justify-center gap-14 sm:gap-20">
                <div className="flex flex-col items-center gap-2.5">
                  <span
                    className="rounded-full"
                    aria-hidden="true"
                    style={{ width: 17, height: 17, background: "#c97f1d", boxShadow: "0 0 0 3px rgba(255,255,255,0.9), 0 4px 10px rgba(11,21,32,0.2)" }}
                  />
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate">
                    PM10 · 10 µm
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2.5">
                  <span
                    className="rounded-full"
                    aria-hidden="true"
                    style={{ width: 4, height: 4, background: "#d6452f", boxShadow: "0 0 0 3px rgba(255,255,255,0.9), 0 0 0 4px rgba(214,69,47,0.3)" }}
                  />
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate">
                    PM2.5 · 2.5 µm
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-ink/10 flex items-end justify-between">
                <span className="font-mono text-[9px] text-fog">0</span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-fog text-right">
                  Lo que respiras hoy, a escala de un cabello.
                </span>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-slate">
                <li>• PM10 es más grande y se queda antes.</li>
                <li>• PM2.5 es más fino y llega más profundo.</li>
                <li>• Los gases no se ven, pero igual afectan la respiración.</li>
              </ul>
            </div>
          </div>
        </header>

        <section className="mt-16 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-ink">
              Colección permanente
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-wider text-fog">
              Clasificado por tamaño, que para eso sirve
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {especimenes.map((specimen, index) => renderSpecimen(specimen, index))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contaminantes;
