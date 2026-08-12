/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#FFE5EC",
        peach: "#FFD6A5",
        cream: "#FFF9F5",
        ink: "#4A154B",
        rose: "#FF6B9D",
        "rose-dark": "#E14F82",
        gold: "#FFC857",
      },
      fontFamily: {
        display: ["Fredoka", "system-ui", "sans-serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
      },
      keyframes: {
        "float-up": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.7" },
          "90%": { opacity: "0.7" },
          "100%": { transform: "translateY(-110vh) rotate(20deg)", opacity: "0" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
        "ticket-in": {
          "0%": { transform: "translateY(24px) rotate(-2deg)", opacity: "0" },
          "100%": { transform: "translateY(0) rotate(-1deg)", opacity: "1" },
        },
      },
      animation: {
        "float-up": "float-up linear infinite",
        pop: "pop 0.4s ease-out",
        "ticket-in": "ticket-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};
