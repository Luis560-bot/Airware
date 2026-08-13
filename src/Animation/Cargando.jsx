import React from "react";

const Cargando = () => {
  return (
    <div className="atmosphere min-h-screen flex items-center justify-center pt-28">
      <div className="flex flex-col items-center gap-6 fade-up">
        <div className="relative w-16 h-16">
          <span
            className="absolute inset-0 rounded-full border-2 border-aire/20"
            aria-hidden="true"
          />
          <span
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-aire"
            style={{ animation: "spinSlow 1.1s linear infinite" }}
            aria-hidden="true"
          />
          <span className="absolute inset-0 flex items-center justify-center text-aire text-xl">
            <i className="bi bi-wind" aria-hidden="true" />
          </span>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate">
          Leyendo el aire de Lima…
        </p>
      </div>
    </div>
  );
};

export default Cargando;
