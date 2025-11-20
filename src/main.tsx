import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";

import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

import { store } from "./store/store";
import theme from "./theme/theme";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
