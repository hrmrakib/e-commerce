/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1e40af",       // for buttons, links
          secondary: "#facc15",     // accent yellow
          muted: "#f8fafc",         // light background
          dark: "#1e293b",          // for headings, text
          danger: "#ef4444",        // error or delete
        },
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
        },
        boxShadow: {
          card: "0 4px 12px rgba(0,0,0,0.05)",
          header: "0 2px 6px rgba(0,0,0,0.08)",
        },
        borderRadius: {
          xl: "1rem",
          "2xl": "1.5rem",
        },
        spacing: {
          "128": "32rem",
        },
      },
    },
    plugins: [
    ],
  };
  