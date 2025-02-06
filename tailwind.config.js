/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgHeader: 'var(--bg-header)',
        bgButton: 'var(--bg-button)',
        bgButtonHover: 'var(--bg-button-hover)',
        borderHeader: 'var(--border-header)',
        borderButton: 'var(--border-button)',
        borderFooter: 'var(--border-footer)',
        textHeader: 'var(--text-header)',
        textFooterTitle: 'var(--text-footer-title)',
        textButton: 'var(--text-button)',
        textGraph: 'var(--text-graph)',
        textWhiteButton: 'var(--text-white-button)',
      },
    },
  },
  plugins: [],
};
