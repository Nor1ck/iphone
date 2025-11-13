import textShadowPlugin from "tailwindcss-textshadow";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      colors: {
        blue: {
          DEFAULT: "#3C5DE1",
          100: "#889ef8",
          200: "#2643b8",
          300: "#0021a7",
          700: "#04165e",
        },
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
        shine: "shine 3s ease-in-out infinite",
      },
      minHeight: {
        'screen-svh': '100svh',
      },
      textShadow: {
        strong: "0 2px 3px rgba(0,0,0,0.7)",
      }
    },
  },
  plugins: [textShadowPlugin],
};
