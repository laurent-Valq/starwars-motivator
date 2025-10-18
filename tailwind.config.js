/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          starwarsYellow: "#FFE81F",
        },
        fontFamily: {
          starwars: ["'Orbitron'", "sans-serif"],
        },
        animation: {
          crawl: "crawl 60s linear infinite",
        },
        keyframes: {
          crawl: {
            "0%": { transform: "translateY(100%) rotateX(20deg)" },
            "100%": { transform: "translateY(-200%) rotateX(25deg)" },
          },
        },
      },
    },
    plugins: [],
  };
  