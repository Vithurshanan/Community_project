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
        secondary: "#611706", 
        tertiary: "#FFFFFF",
        ctcPrimary: "#611706",
        ctcSecondary: "#D3D3D3",
        textPrimary: "#ffffff",
        textSecondary: "#611706",
        ctcPrimaryLight:"#91260c",
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
