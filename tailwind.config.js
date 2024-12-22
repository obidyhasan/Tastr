/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "serif"],
        oswald: ["Oswald", "serif"],
      },
      backgroundImage: () => ({
        "banner-bg":
          "linear-gradient(to left, rgb(17, 17, 17, .50),rgba(17, 17, 17, .50)), url('https://i.ibb.co.com/hmsngNg/27206.jpg')",
        "all-food-bg":
          "linear-gradient(to left, rgb(17, 17, 17, .50),rgba(17, 17, 17, .50)), url('https://i.ibb.co.com/tQjMx1Y/2147772081.jpg')",
        "gallery-bg":
          "linear-gradient(to left, rgb(17, 17, 17, .50),rgba(17, 17, 17, .50)), url('https://i.ibb.co.com/yBKkSKQ/2148469867.jpg')",
      }),
    },
  },
  plugins: [daisyui],
};
