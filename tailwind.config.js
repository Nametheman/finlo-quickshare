// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "primary-green": "#008751", // green-700 equivalent
        "primary-dark-green": "#004d2e", // green-900 equivalent
        "secondary-yellow": "#f4b400", // yellow-500 equivalent
        "secondary-orange": "#f97316", // orange-500 equivalent
        "accent-red": "#ef4444", // red-500 equivalent
        "neutral-white": "#ffffff", // white
        "neutral-gray-50": "#F9FAFB", // very light gray, gray-50
        "neutral-gray-100": "#F3F4F6", // light gray, gray-100
        "neutral-gray-200": "#E5E7EB", // light gray, gray-200
        "neutral-gray-300": "#D1D5DB", // mid-light gray, gray-300
        "neutral-gray-500": "#6B7280", // mid gray, gray-500
        "neutral-gray-600": "#4B5563", // mid-dark gray, gray-600
        "neutral-gray-800": "#1F2937", // dark gray, gray-800
        "neutral-gray-900": "#111827", // very dark gray, gray-900
        "success-green": "#10b981", // emerald-500
        "error-red": "#dc2626", // red-600
        "warning-yellow": "#f59e0b", // amber-500
      },
    },
  },
  plugins: [],
};
