// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // disable Tailwind's reset
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "../docs/**/*.mdx"], // my markdown stuff is in ../docs, not /src
  darkMode: ["class", '[data-theme="dark"]'], // hooks into docusaurus' dark mode settigns
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        codeLineBg: "hsl(var(--code-line-bg))",
        themePrimary: "hsl(var(--theme-primary))",
        themePrimaryDark: "hsl(var(--theme-primary-dark))",
        themePrimaryDarker: "hsl(var(--theme-primary-darker))",
        themePrimaryDarkest: "hsl(var(--theme-primary-darkest))",
        themePrimaryLight: "hsl(var(--theme-primary-light))",
        themePrimaryLighter: "hsl(var(--theme-primary-lighter))",
        themePrimaryLightest: "hsl(var(--theme-primary-lightest))",
      }
    },
  },
  plugins: [],
};
