import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        theme={{
          fontSizes: {
            xs: "1rem",
            sm: "1.4rem",
            md: "1.6rem",
            lg: "1.8rem",
            xl: "2rem",
          },
        }}
      >
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
