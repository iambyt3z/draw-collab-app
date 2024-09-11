import "./index.css";

import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import store from "./state/store.ts";
import theme from "./theme/index.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
