export const cn = (...v: (string | false | null | undefined)[]) => v.filter(Boolean).join(" ");

export const fmtDuration = (s: number) => {
  const m = Math.floor(s / 60);
  const r = Math.round(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
};

export const pad2 = (n: number) => String(n).padStart(2, "0");
