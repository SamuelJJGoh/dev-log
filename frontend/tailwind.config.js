/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary : {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary : {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        type: {
          project: "hsl(var(--type-project))",
          tutorial: "hsl(var(--type-tutorial))",
          interview: "hsl(var(--type-interview))",
          dsa: "hsl(var(--type-dsa))",
          work: "hsl(var(--type-work))",
          research: "hsl(var(--type-research))",
          systemDesign: "hsl(var(--type-system-design))",
        }
      }
    },
  },
  plugins: [],
}
