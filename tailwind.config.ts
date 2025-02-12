/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  // Para sa App Router
    "./pages/**/*.{js,ts,jsx,tsx}",    // Para sa Pages Router (kung gamit mo)
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  // Para sa custom directory (kung meron)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
