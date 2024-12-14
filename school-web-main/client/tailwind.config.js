/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D3D3D3",
        secondary: "#580B57",
        tertiary: "#FFFFFF",
        ctcPrimary: "#580B57",
        ctcSecondary: "#D3D3D3",
        textPrimary: "#ffffff",
        textSecondary: "#580B57",
        ctcPrimaryLight:"#8a0b88",
      },

      fontFamily: {
        custom: ["Urbanist", "sans-serif"],
        handwritting: ["Dancing Script"],
        title: ["Annapurna SIL"],
        description: ['Open Sans Light', 'sans-serif'],
        subtext: ['EB Garamond'],
        Bnumber: ['Open Sans'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [flowbitePlugin],
};
