/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        PretendardVariable: ["PretendardVariable"],
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        slideDown: "slideDown 0.3s ease-out",
      },
      spacing: {
        '85': '21.25rem', // 85 * 4px = 340px
        '90': '22.5rem',  // 360px
        '91': '22.75rem', // 364px
        '92': '23rem',    // 368px
        '93': '23.25rem', // 372px
        '94': '23.5rem',  // 376px
        '95': '23.75rem', // 380px
      },
    },
  },
  plugins: [],
};
