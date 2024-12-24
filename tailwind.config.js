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
          "linear-gradient(to left, rgb(17, 17, 17, .50),rgba(17, 17, 17, .50)), url('https://i.ibb.co.com/S5v13LT/27206.jpg')",
        "gallery-bg":
          "linear-gradient(to left, rgb(17, 17, 17, .50),rgba(17, 17, 17, .50)), url('https://i.ibb.co.com/gJdsQSS/688.jpg')",
        "all-food-bg":
          "linear-gradient(to left, rgb(17, 17, 17, .50),rgba(17, 17, 17, .50)), url('https://i.ibb.co.com/8bSNk5D/2991.jpg')",
        "my-food-bg":
          "linear-gradient(to left, rgb(17, 17, 17, .50),rgba(17, 17, 17, .50)), url('https://i.ibb.co.com/yhH1X24/2982.jpg')",
        "order-bg":
          "linear-gradient(to left, rgb(17, 17, 17, .50),rgba(17, 17, 17, .50)), url('https://i.ibb.co.com/KKRqCW6/683.jpg')",
        "add-food-bg":
          "linear-gradient(to left, rgb(17, 17, 17, .50),rgba(17, 17, 17, .50)), url('https://i.ibb.co.com/8bdMt5H/2147772081.jpg')",
        "food-purchase-bg":
          "linear-gradient(to left, rgb(17, 17, 17, .50),rgba(17, 17, 17, .50)), url('https://i.ibb.co.com/dJ1BFNw/2148469867.jpg')",
      }),
    },
  },
  plugins: [daisyui],
};
