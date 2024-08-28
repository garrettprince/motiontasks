/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      sans: ["suisse_intlregular", "sans-serif"],
      bold: ["suisse_intlbold", "sans-serif"],
      light: ["suisse_intllight", "sans-serif"],
      medium: ["suisse_intlmedium", "sans-serif"],
      semibold: ["suisse_intlsemibold", "sans-serif"],
    },
  },
  plugins: [],
};
