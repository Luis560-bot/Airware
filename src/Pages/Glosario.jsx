import React from "react";
import { Link } from "react-router-dom";

import "../index.css";

const entradas = [
  {
    letra: "A",
    id: "alveolos",
    termino: "Alvéolos",
    alt: "Pulmones",
    cat: "anatomía",
    def: "Pequeños sacos al final de los pulmones donde el oxígeno pasa a la sangre. Las partículas finas los usan de sala de espera.",
    nota: "Suena a laboratorio, pero son tuyos.",
    ref: { to: "/contaminantes", texto: "contaminantes" },
  },
  {
    letra: "C",
    id: "calidad-del-aire",
    termino: "Calidad del aire",
    cat: "general",
    def: "Qué tan agradable es respirar hoy. Se mide, se juzga y casi nunca sale «excelente».",
    nota: "El adjetivo lo pone el índice, no nosotros.",
    ref: { to: "/", texto: "inicio" },
  },
  {
    letra: "C",
    id: "co",
    termino: "CO",
    redirige: "Monóxido de carbono",
  },
  {
    letra: "C",
    id: "contaminante",
    termino: "Contaminante",
    cat: "general",
    def: "Cualquier cosa que el aire no pidió y tú tampoco: partículas, gases, olores. Viven entre tú y el sol.",
    nota: "La colección completa está en la página de contaminantes.",
    ref: { to: "/contaminantes", texto: "contaminantes" },
  },
  {
    letra: "D",
    id: "dioxido-de-nitrogeno",
    termino: "Dióxido de nitrógeno",
    alt: "NO₂",
    cat: "gas",
    def: "Gas de caños de escape y calderas. Pinta los atardeceres de naranja y a cambio te irrita la garganta.",
    nota: "Lindo de ver, feo de respirar.",
    ref: { to: "/contaminantes", texto: "contaminantes" },
  },
  {
    letra: "D",
    id: "dioxido-de-azufre",
    termino: "Dióxido de azufre",
    alt: "SO₂",
    cat: "gas",
    def: "Gas industrial con olor a fósforo recién apagado. Arde en los ojos y a veces vuelve a caer como lluvia ácida.",
    nota: "Cortesía de la quema de combustibles con azufre.",
    ref: { to: "/contaminantes", texto: "contaminantes" },
  },
  {
    letra: "I",
    id: "ica",
    termino: "ICA",
    alt: "Índice de Calidad del Aire",
    cat: "índice",
    def: "El termómetro de lo invisible: convierte una nube de partículas en un número con color.",
    nota: "Verde es bueno, amarillo es regular, rojo es malo. Como un semáforo, pero para los pulmones.",
    ref: { to: "/", texto: "inicio" },
  },
  {
    letra: "M",
    id: "microgramo",
    termino: "Microgramo",
    alt: "µg",
    cat: "unidad",
    def: "La millonésima parte de un gramo. Las partículas se pesan así porque son livianas y no se dejan ver.",
    nota: "Un microgramo es casi nada. Mil de ellos, mucho menos que nada.",
    ref: { to: "/", texto: "inicio" },
  },
  {
    letra: "M",
    id: "monoxido-de-carbono",
    termino: "Monóxido de carbono",
    alt: "CO",
    cat: "gas",
    def: "Gas sin olor ni color que le roba oxígeno a la sangre. Sale de la combustión incompleta.",
    nota: "El carterista de los gases.",
    ref: { to: "/contaminantes", texto: "contaminantes" },
  },
  {
    letra: "N",
    id: "no2",
    termino: "NO₂",
    redirige: "Dióxido de nitrógeno",
  },
  {
    letra: "O",
    id: "o3",
    termino: "O₃",
    redirige: "Ozono",
  },
  {
    letra: "O",
    id: "ozono",
    termino: "Ozono",
    alt: "O₃",
    cat: "gas",
    def: "Arriba nos protege del sol; a ras de suelo pincha la garganta. Mismas moléculas, distinta compañía.",
    nota: "El mismo de arriba, portándose mal acá abajo.",
    ref: { to: "/contaminantes", texto: "contaminantes" },
  },
  {
    letra: "P",
    id: "particula",
    termino: "Partícula",
    cat: "materia",
    def: "Un pedacito de materia flotando. Si la ves en un rayo de sol, es polvo. Si no la ves, preocúpate un poco más.",
    nota: "Cuanto más pequeña, más profundo llega.",
    ref: { to: "/contaminantes", texto: "contaminantes" },
  },
  {
    letra: "P",
    id: "pm2-5",
    termino: "PM2.5",
    alt: "Partículas finas",
    cat: "partícula",
    def: "Partículas de menos de 2.5 micrómetros. Pequeñas como para esquivar todo filtro y entrar directo a la sangre.",
    nota: "El vecino que se cuela por la ventana.",
    ref: { to: "/", texto: "inicio" },
  },
  {
    letra: "P",
    id: "pm10",
    termino: "PM10",
    alt: "Partículas gruesas",
    cat: "partícula",
    def: "Partículas de hasta 10 micrómetros: polvo, tierra, ceniza. Se atoran en la nariz y la garganta.",
    nota: "Se ven más, viajan menos.",
    ref: { to: "/", texto: "inicio" },
  },
  {
    letra: "S",
    id: "smog",
    termino: "Smog",
    cat: "clima",
    def: "Niebla más humo. El clima urbano que nadie pidió. En Lima se llama «panza de burro» y viene gratis.",
    nota: "Se ve gris, sabe a nada, cuesta respirarlo.",
    ref: { to: "/", texto: "inicio" },
  },
  {
    letra: "S",
    id: "so2",
    termino: "SO₂",
    redirige: "Dióxido de azufre",
  },
  {
    letra: "µ",
    id: "ug-m3",
    termino: "µg/m³",
    alt: "Microgramos por metro cúbico",
    cat: "unidad",
    def: "La unidad con la que se cuenta lo que flota en el aire que respiras.",
    nota: "Si el número sube, el aire baja.",
    ref: { to: "/", texto: "inicio" },
  },
];

const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("").concat("µ");

// Busca el id de una entrada para que las remisiones internas funcionen.
const getId = (term) => {
  const found = entradas.find((entry) => entry.termino === term);
  return found ? found.id : "";
};

const Glosario = () => {
  const secciones = [];

  // Agrupa todas las entradas por letra para construir el índice alfabético.
  entradas.forEach((entrada) => {
    const existente = secciones.find(
      (seccion) => seccion.letra === entrada.letra,
    );

    if (existente) {
      existente.entradas.push(entrada);
    } else {
      secciones.push({ letra: entrada.letra, entradas: [entrada] });
    }
  });

  const definiciones = entradas.filter((entrada) => entrada.def).length;
  const remisiones = entradas.length - definiciones;

  return (
    <div className="page-haze min-h-screen pt-24 sm:pt-28 pb-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <header>
          <p
            className="fade-up font-mono text-[11px] sm:text-xs uppercase tracking-[0.28em] text-ink/55"
            style={{ animationDelay: "0.05s" }}
          >
            Diccionario del aire · Definiciones no oficiales
          </p>

          <h1
            className="fade-up mt-8 font-display font-black tracking-tight leading-[0.95] text-4xl sm:text-5xl lg:text-6xl text-ink"
            style={{ animationDelay: "0.15s", fontStretch: "125%" }}
          >
            Palabras que flotan en el aire.
          </h1>

          <p
            className="fade-up mt-6 text-ink/70 text-base sm:text-lg max-w-xl leading-relaxed font-medium"
            style={{ animationDelay: "0.3s" }}
          >
            Todo lo que este sitio mide, explicado de la A a la µ con
            definiciones nuestras y culpa de nadie.
          </p>

          <ul
            className="fade-up mt-5 space-y-2 text-sm sm:text-base text-ink/70 max-w-xl"
            style={{ animationDelay: "0.38s" }}
          >
            <li>• Cada término tiene una definición corta y fácil de leer.</li>
            <li>• Algunas entradas te mandan a otra palabra relacionada.</li>
            <li>
              • Sirve para entender mejor lo que ves en Inicio y Contaminantes.
            </li>
          </ul>

          <div
            className="fade-up mt-6 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.45s" }}
          >
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-ink/45">
              {definiciones} definiciones · {remisiones} remisiones · 0 relación
              con la RAE
            </p>
            <Link
              to="/"
              className="px-5 py-2.5 bg-ink text-smog text-sm font-semibold tracking-wide rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink transition-all duration-300"
            >
              Volver al inicio
            </Link>
          </div>
        </header>

        {/* Índice alfabético */}
        <nav
          className="fade-up sticky top-16 sm:top-20 z-30 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3 mt-10 bg-smog/85 backdrop-blur-sm"
          style={{ animationDelay: "0.5s" }}
          aria-label="Índice alfabético"
        >
          {/* Índice fijo arriba para saltar rápido entre letras. */}
          <div className="flex flex-wrap gap-y-1">
            {alfabeto.map((l) => {
              const activa = secciones.some((s) => s.letra === l);
              return activa ? (
                <a
                  key={l}
                  href={`#seccion-${l}`}
                  className="font-mono text-sm sm:text-base font-semibold text-ink px-1.5 hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-ink transition-colors"
                >
                  {l}
                </a>
              ) : (
                <span
                  key={l}
                  className="font-mono text-sm sm:text-base text-ink/20 px-1.5"
                  aria-hidden="true"
                >
                  {l}
                </span>
              );
            })}
          </div>
        </nav>

        {/* Entradas agrupadas por letra */}
        <main className="mt-6">
          {secciones.map((s) => {
            const primera = s.entradas[0].termino;
            const ultima = s.entradas[s.entradas.length - 1].termino;
            return (
              <section
                key={s.letra}
                id={`seccion-${s.letra}`}
                className="scroll-mt-36"
              >
                {/* Cada bloque muestra una letra, luego sus palabras y sus remisiones. */}
                <header className="flex items-center gap-4 pt-10">
                  <span
                    className="font-display font-black text-4xl sm:text-5xl leading-none tracking-tight text-ink"
                    style={{ fontStretch: "125%" }}
                  >
                    {s.letra}
                  </span>
                  {primera !== ultima && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                      {primera}
                    </span>
                  )}
                  <span className="flex-1 border-t border-ink/15" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                    {ultima}
                  </span>
                </header>

                {s.entradas.map((e) =>
                  // Si la entrada solo redirige, se muestra una tarjeta breve con enlace interno.
                  e.redirige ? (
                    <article
                      key={e.id}
                      id={e.id}
                      className="scroll-mt-44 py-5 border-b border-ink/10"
                    >
                      <h3
                        className="font-display font-bold text-xl tracking-tight text-ink"
                        style={{ fontStretch: "125%" }}
                      >
                        {e.termino}
                      </h3>
                      <p className="mt-1 text-ink/70">
                        Véase{" "}
                        <a
                          href={`#${getId(e.redirige)}`}
                          className="underline decoration-ink/30 hover:decoration-ink transition-colors focus-visible:outline-2 focus-visible:outline-ink"
                        >
                          {e.redirige}
                        </a>
                        .
                      </p>
                    </article>
                  ) : (
                    <article
                      key={e.id}
                      id={e.id}
                      className="scroll-mt-44 py-6 border-b border-ink/10"
                    >
                      {/* Si la entrada tiene definición, se muestra término, etiqueta, nota y enlace relacionado. */}
                      <div className="flex items-baseline justify-between gap-3 flex-wrap">
                        <h3
                          className="font-display font-bold text-xl sm:text-2xl tracking-tight text-ink"
                          style={{ fontStretch: "125%" }}
                        >
                          {e.termino}
                        </h3>
                        {e.alt && (
                          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
                            {e.alt}
                          </p>
                        )}
                      </div>

                      <span className="mt-2 inline-block font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50 border border-ink/15 rounded-full px-2 py-0.5">
                        {e.cat}
                      </span>

                      <p className="mt-3 text-ink/75 leading-relaxed max-w-2xl">
                        {e.def}
                      </p>

                      {e.nota && (
                        <p className="mt-2 font-mono text-[11px] text-ink/45 italic">
                          {e.nota}
                        </p>
                      )}

                      {e.ref && (
                        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                          Se lee en{" "}
                          <Link
                            to={e.ref.to}
                            className="underline decoration-ink/30 hover:decoration-ink hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-ink"
                          >
                            {e.ref.texto}
                          </Link>
                        </p>
                      )}
                    </article>
                  ),
                )}
              </section>
            );
          })}
        </main>

        <footer className="mt-16 sm:mt-24 pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink/45">
            Diccionario del aire · Edición no oficial
          </p>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink/45">
            Palabras medidas en Lima, Perú
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Glosario;
