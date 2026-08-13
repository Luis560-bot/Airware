// Bandas de calidad del aire (PM2.5) según el índice de referencia del sitio.
export const BANDAS = [
  { max: 12, label: "Buena", color: "#3f9d4e" },
  { max: 35, label: "Moderada", color: "#e5a91e" },
  { max: Number.POSITIVE_INFINITY, label: "Mala", color: "#d6452f" },
];

export const getBanda = (valor) =>
  BANDAS.find((b) => valor <= b.max) ?? BANDAS[BANDAS.length - 1];

// Colores suaves por categoría del glosario, para los puntos de las etiquetas.
export const CATEGORIAS = {
  "Partículas": { color: "#d6452f", bg: "rgba(214,69,47,0.1)" },
  "Gases": { color: "#c97f1d", bg: "rgba(229,169,30,0.12)" },
  "Unidades": { color: "#3f7eb0", bg: "rgba(63,126,176,0.1)" },
  "Índices": { color: "#3f9d4e", bg: "rgba(63,157,78,0.12)" },
  "Anatomía": { color: "#7a5cbf", bg: "rgba(122,92,191,0.1)" },
  "Clima": { color: "#2f8fa8", bg: "rgba(47,143,168,0.12)" },
  "General": { color: "#5b6b7b", bg: "rgba(91,107,123,0.1)" },
};

export const normalizar = (s) =>
  (s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
