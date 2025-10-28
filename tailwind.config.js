/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      colors: {
        blue: "#2997FF",
        gray: {
          DEFAULT: "#86868b",
          100: "#94928d",
          200: "#afafaf",
          300: "#42424570",
        },
        zinc: "#101010",
        primary: {
          100: "#f5f7fb",
          800: "#1a1f2c",
          900: "#0f1115",
        },
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "-200% 50%" },
          "50%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        shine: "shine 4.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
