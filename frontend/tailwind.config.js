/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ini memberi tahu Tailwind di mana ia dapat menemukan file HTML/JSX/TSX Anda.
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // *** Tambahkan konfigurasi font kustom di sini ***
      fontFamily: {
        lobster: ['"Lobster"', "sans-serif"],
        Sekuya: ['"Sekuya"', "system-ui"],
      },
    },
  },
  plugins: require["daisyui"],
};
