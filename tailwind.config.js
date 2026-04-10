/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: "#8B5E3C",
        cream: "#F8EDE3",
        gold: "#D4AF37",
        blush: "#E5989B",
        dark: "#2C2C2C",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans-serif"],
        vibes: ["Great Vibes", "cursive"],
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
        equalizer1: "eq 0.8s ease-in-out infinite",
        equalizer2: "eq 0.6s ease-in-out infinite 0.2s",
        equalizer3: "eq 1s ease-in-out infinite 0.1s",
        sparkle: "sparkle 0.6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        eq: {
          "0%,100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
        sparkle: {
          "0%,100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.5, transform: "scale(1.3)" },
        },
      },
    },
  },
  plugins: [],
};
