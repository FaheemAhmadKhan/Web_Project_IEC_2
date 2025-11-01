import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import ErrorBoundary from "./pages/ErrorBoundary";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
          <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
