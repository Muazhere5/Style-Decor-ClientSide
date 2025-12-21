/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "style-primary": "#9D4EDD",     // Main brand color
        "style-secondary": "#F72585",   // Accent / highlight
      },
    },
  },

  plugins: [
    require("daisyui"),
  ],

  daisyui: {
    themes: [
      {
        styledecor: {
          primary: "#9D4EDD",        // Buttons, CTA
          secondary: "#F72585",      // Highlights
          accent: "#4CC9F0",         // Icons, links
          neutral: "#1F2937",        // Text
          "base-100": "#F9FAFB",     // Background
          info: "#38BDF8",
          success: "#22C55E",
          warning: "#FACC15",
          error: "#EF4444",
        },
      },
    ],
  },
};
