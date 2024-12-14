/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0095F6",
                secondary: "#0065F6",
                tertiary: "#0035F6",
                darkGray: "#1D1D1F",
                darkGray2: "#282c3f",
                mediumGray: "#303030",
                mediumGray1: "#3e4152",
                mediumGray2: "#555",
                lightGray: "#9e9e9e",
                lightGray2: "#aeaeae",
                lightGray3: "#dadada",
                lightGray4: "#f2f2f2",
                lightGray5: "#f8f8f8",
                dimWhite: "#FAFBFC",
            },
            scrollSnapType: {
                y: "y mandatory",
            },
            scrollSnapAlign: {
                center: "center",
            },
        },
    },
    variants: {
        extend: {
            opacity: ["responsive", "hover", "focus", "active"],
            translate: ["responsive", "hover", "focus", "active"],
        },
    },
    plugins: [],
};
