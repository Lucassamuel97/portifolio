/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

// Cores definidas como canais RGB em src/app/globals.css (tema "papel" e tema "blueprint")
const cor = (nome) => `rgb(var(--${nome}) / <alpha-value>)`;

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts}",
  ],
  darkMode: ["selector", '[data-tema="blueprint"]'],
  theme: {
    extend: {
      colors: {
        papel: { DEFAULT: cor("papel"), 2: cor("papel-2") },
        tinta: { DEFAULT: cor("tinta"), 2: cor("tinta-2"), 3: cor("tinta-3") },
        revisao: { DEFAULT: cor("revisao"), texto: cor("revisao-texto") },
      },
      fontFamily: {
        display: ["var(--font-archivo)", "Arial Narrow", "system-ui", "sans-serif"],
        sans: ["var(--font-public-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        rotulo: ["0.8125rem", { lineHeight: "1.4" }],
        pequeno: ["0.9375rem", { lineHeight: "1.55" }],
        base: ["1.0625rem", { lineHeight: "1.6" }],
        medio: ["1.3125rem", { lineHeight: "1.35" }],
        grande: ["1.75rem", { lineHeight: "1.15" }],
        titulo: ["clamp(2rem, 1.4rem + 2.6vw, 3.5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        frase: ["clamp(2.1rem, 1rem + 4.6vw, 4.75rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        display: ["clamp(2.2rem, 0.85rem + 6.3vw, 7.25rem)", { lineHeight: "0.93", letterSpacing: "-0.035em" }],
      },
      maxWidth: { pagina: "90rem" },
      spacing: { secao: "clamp(4.5rem, 3rem + 7vw, 9rem)" },
      transitionTimingFunction: { prancha: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
      keyframes: {
        revelar: {
          from: { clipPath: "inset(0 0 100% 0)", transform: "translateY(0.4em)" },
          to: { clipPath: "inset(-0.2em 0 -0.2em 0)", transform: "none" },
        },
        surgir: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        revelar: "revelar 900ms cubic-bezier(0.2, 0.7, 0.2, 1) both",
        surgir: "surgir 450ms cubic-bezier(0.2, 0.7, 0.2, 1) backwards",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({ strategy: "class" }),
    // Largura da Archivo (eixo wdth): estreita para rótulos, expandida para títulos
    plugin(({ addUtilities }) => {
      addUtilities({
        ".largura-82": { "font-stretch": "82%" },
        ".largura-90": { "font-stretch": "90%" },
        ".largura-100": { "font-stretch": "100%" },
        ".largura-106": { "font-stretch": "106%" },
        ".largura-112": { "font-stretch": "112%" },
        ".largura-116": { "font-stretch": "116%" },
        ".largura-125": { "font-stretch": "125%" },
      });
    }),
  ],
};
