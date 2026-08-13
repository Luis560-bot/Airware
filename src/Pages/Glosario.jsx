import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIAS, getBanda, normalizar } from "../lib/aire";

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

const GRUPOS = {
  "anatomía": "Anatomía",
  "general": "General",
  "gas": "Gases",
  "índice": "Índices",
  "unidad": "Unidades",
  "materia": "Partículas",
  "partícula": "Partículas",
  "clima": "Clima",
};

const ORDEN_GRUPOS = [
  "Todos",
  "Partículas",
  "Gases",
  "Unidades",
  "Índices",
  "Anatomía",
  "Clima",
  "General",
];

const Glosario = ({ currentPm25 }) => {
  const [grupo, setGrupo] = useState("Todos");
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  const visibles = useMemo(() => {
    const aliasMap = {};
    entradas.forEach((e) => {
      if (e.redirige) {
        (aliasMap[e.redirige] = aliasMap[e.redirige] || []).push(e.termino);
      }
    });

    return entradas
      .filter((e) => e.def)
      .map((e) => ({
        ...e,
        grupo: GRUPOS[e.cat] ?? "General",
        alias: aliasMap[e.termino] ?? null,
      }))
      .sort((a, b) => a.termino.localeCompare(b.termino, "es"));
  }, []);

  const filtradas = useMemo(() => {
    const q = normalizar(query.trim());
    return visibles.filter((e) => {
      const porGrupo = grupo === "Todos" || e.grupo === grupo;
      const porTexto =
        !q ||
        normalizar(
          [
            e.termino,
            e.alt,
            e.def,
            e.nota,
            e.grupo,
            (e.alias ?? []).join(" "),
          ].join(" "),
        ).includes(q);
      return porGrupo && porTexto;
    });
  }, [visibles, grupo, query]);

  const secciones = useMemo(() => {
    const mapa = {};
    filtradas.forEach((e) => {
      (mapa[e.letra] = mapa[e.letra] || []).push(e);
    });
    return Object.keys(mapa).map((letra) => ({ letra, entradas: mapa[letra] }));
  }, [filtradas]);

  const hayFiltros = grupo !== "Todos" || query.trim() !== "";
  const remisiones = entradas.length - visibles.length;
  const banda = currentPm25 > 0 ? getBanda(currentPm25) : null;

  const limpiar = () => {
    setQuery("");
    setGrupo("Todos");
  };

  const irALetra = (letra) => {
    document
      .getElementById(`letra-${letra}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === "/" && ev.target.tagName !== "INPUT" && ev.target.tagName !== "TEXTAREA") {
        ev.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="atmosphere min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header>
          <p className="fade-up eyebrow flex items-center">
            <span className="eyebrow-dot" aria-hidden="true" />
            Glosario · Vocabulario del aire de Lima
          </p>

          <h1
            className="fade-up mt-5 font-display font-bold tracking-tight leading-[1.02] text-balance text-4xl sm:text-5xl lg:text-6xl text-ink"
            style={{ animationDelay: "0.1s" }}
          >
            Palabras que flotan
            <br className="hidden sm:block" /> en el aire.
          </h1>

          <div className="fade-up mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <p
              className="max-w-xl text-base sm:text-lg text-slate leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              Cada término del sitio, explicado en una definición corta. Busca
              por nombre, fórmula o texto, o navega el índice alfabético.
            </p>
            <p
              className="font-mono text-[11px] uppercase tracking-wider text-fog shrink-0"
              style={{ animationDelay: "0.25s" }}
            >
              {visibles.length} definiciones · {remisiones} remisiones · 0
              relación con la RAE
            </p>
          </div>
        </header>

        <section
          className="fade-up mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px] items-start"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="card p-4 sm:p-5">
            <label
              htmlFor="buscar-glosario"
              className="eyebrow flex items-center gap-2 px-1"
            >
              <i className="bi bi-search text-sm" aria-hidden="true" />
              Busca un término, una fórmula o una idea
            </label>

            <div className="mt-3 search-shell">
              <input
                id="buscar-glosario"
                ref={searchRef}
                type="search"
                value={query}
                onChange={(ev) => setQuery(ev.target.value)}
                placeholder="Ej. PM2.5, smog, microgramo…"
                aria-label="Buscar en el glosario"
                className="search-input"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Borrar búsqueda"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-fog hover:text-ink hover:bg-mist transition-colors"
                >
                  <i className="bi bi-x-lg text-sm" aria-hidden="true" />
                </button>
              ) : (
                <span className="kbd" aria-hidden="true">
                  /
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {ORDEN_GRUPOS.map((g) => {
                const n =
                  g === "Todos"
                    ? visibles.length
                    : visibles.filter((e) => e.grupo === g).length;
                const activo = grupo === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrupo(g)}
                    aria-pressed={activo}
                    className={`chip ${activo ? "chip-active" : ""}`}
                  >
                    {g}
                    <span className="chip-count">{n}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {banda && (
            <aside className="card p-5">
              <p className="eyebrow flex items-center gap-2">
                <span
                  className="live-dot"
                  style={{ background: banda.color, color: banda.color }}
                  aria-hidden="true"
                />
                Lectura en vivo
              </p>
              <p className="mt-3 flex items-end gap-2">
                <span
                  className="font-mono font-semibold text-4xl leading-none"
                  style={{ color: banda.color }}
                >
                  {currentPm25.toFixed(2)}
                </span>
                <span className="pb-1 font-mono text-[11px] uppercase tracking-wider text-slate">
                  µg/m³ PM2.5
                </span>
              </p>
              <div className="mt-3 h-1.5 rounded-full overflow-hidden bg-mist">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(100, (currentPm25 / 40) * 100)}%`,
                    background: banda.color,
                  }}
                />
              </div>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-slate">
                Aire {banda.label} en Lima ahora
              </p>
            </aside>
          )}
        </section>

        <div
          className="fade-up mt-8 flex items-center justify-between gap-3"
          style={{ animationDelay: "0.35s" }}
        >
          <p className="font-mono text-[11px] uppercase tracking-wider text-slate">
            {filtradas.length} de {visibles.length} términos
          </p>
          {hayFiltros && (
            <button
              type="button"
              onClick={limpiar}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate hover:text-ink transition-colors"
            >
              <i className="bi bi-arrow-counterclockwise text-xs" aria-hidden="true" />
              Limpiar filtros
            </button>
          )}
        </div>

        {filtradas.length === 0 ? (
          <div className="card mt-4 px-6 py-16 text-center">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-mist text-aire text-2xl">
              <i className="bi bi-cloud-haze2" aria-hidden="true" />
            </span>
            <h2
              className="mt-5 font-display font-bold text-2xl tracking-tight text-ink"
            >
              No encontramos «{query.trim()}»
            </h2>
            <p className="mt-2 text-sm text-slate max-w-sm mx-auto">
              Revisa la ortografía o prueba con PM2.5, smog u ozono. El
              glosario es corto, pero selecto.
            </p>
            <button type="button" onClick={limpiar} className="btn btn-primary mt-7">
              Limpiar búsqueda
            </button>
          </div>
        ) : (
          <main className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_3.5rem] items-start">
            <div>
              <nav
                aria-label="Índice alfabético"
                className="mb-6 lg:hidden no-scrollbar flex items-center gap-2 overflow-x-auto py-1"
              >
                <span className="shrink-0 eyebrow">A–Z</span>
                {secciones.map(({ letra, entradas }) => (
                  <button
                    key={letra}
                    type="button"
                    onClick={() => irALetra(letra)}
                    className="shrink-0 flex items-baseline gap-1 px-3 py-1.5 rounded-lg border border-ink/10 bg-white font-mono text-xs text-slate hover:text-ink hover:border-aire/40 transition-colors"
                  >
                    {letra}
                    <span className="text-[9px] text-fog">{entradas.length}</span>
                  </button>
                ))}
              </nav>

              <div className="space-y-10">
                {secciones.map((seccion) => (
                  <section
                    key={seccion.letra}
                    id={`letra-${seccion.letra}`}
                    className="scroll-mt-28"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="font-display font-bold text-3xl leading-none text-ink/85"
                        aria-hidden="true"
                      >
                        {seccion.letra}
                      </span>
                      <div className="h-px flex-1 bg-ink/10" aria-hidden="true" />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-fog">
                        {seccion.entradas.length}{" "}
                        {seccion.entradas.length === 1 ? "término" : "términos"}
                      </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {seccion.entradas.map((e) => {
                        const color = CATEGORIAS[e.grupo]?.color ?? "#5b6b7b";
                        return (
                          <article
                            key={e.id}
                            id={e.id}
                            className="card card-interactive group h-full flex flex-col p-5 sm:p-6"
                          >
                            <header className="flex items-start justify-between gap-3">
                              <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-ink">
                                {e.termino}
                              </h3>
                              {e.alt && (
                                <span className="shrink-0 tag bg-aire/10 text-aire-deep">
                                  {e.alt}
                                </span>
                              )}
                            </header>

                            <div className="mt-3 flex items-center gap-2">
                              <span className="tag">
                                <span
                                  className="tag-dot"
                                  style={{ background: color }}
                                  aria-hidden="true"
                                />
                                {e.grupo}
                              </span>
                            </div>

                            <p className="mt-4 text-[15px] text-slate leading-relaxed grow">
                              {e.def}
                            </p>

                            {e.nota && (
                              <p className="mt-3 text-sm italic text-fog border-l-2 border-aire/30 pl-3">
                                {e.nota}
                              </p>
                            )}

                            <footer className="mt-5 pt-4 border-t border-ink/10 flex flex-wrap items-center justify-between gap-2">
                              {e.alias ? (
                                <span className="font-mono text-[10px] uppercase tracking-wider text-fog">
                                  También: {e.alias.join(" · ")}
                                </span>
                              ) : (
                                <span />
                              )}
                              {e.ref && (
                                <Link
                                  to={e.ref.to}
                                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-aire-deep hover:text-ink transition-colors"
                                >
                                  Leer en {e.ref.texto}
                                  <i
                                    className="bi bi-arrow-right transition-transform duration-300 group-hover:translate-x-1"
                                    aria-hidden="true"
                                  />
                                </Link>
                              )}
                            </footer>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <aside
              className="hidden lg:flex flex-col items-stretch gap-1 sticky top-24"
              aria-label="Índice alfabético"
            >
              {secciones.map(({ letra, entradas }) => (
                <button
                  key={letra}
                  type="button"
                  onClick={() => irALetra(letra)}
                  title={`Ir a la letra ${letra}`}
                  className="flex items-center justify-between gap-1 px-2.5 py-1.5 rounded-lg font-mono text-xs text-slate hover:text-ink hover:bg-white hover:border-aire/30 border border-transparent transition-colors"
                >
                  {letra}
                  <span className="text-[9px] text-fog">{entradas.length}</span>
                </button>
              ))}
            </aside>
          </main>
        )}
      </div>
    </div>
  );
};

export default Glosario;
