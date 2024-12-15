import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store.jsx";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0095F6",
            light: "#0065F6",
            veryLight: "#0035F6",
        },
        gray: {
            main: "#1D1D1F",
            secondary: "#282c3f",
            mediumGray: "#303030",
            mediumGray1: "#3e4152",
            mediumGray2: "#555",
            lightGray: "#9e9e9e",
            lightGray2: "#aeaeae",
            lightGray3: "#dadada",
            lightGray4: "#f2f2f2",
            lightGray5: "#f8f8f8",
        },
        dimWhite: {
            main: "#FAFBFC",
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
