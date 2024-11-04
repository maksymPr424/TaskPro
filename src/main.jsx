import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { BrowserRouter } from "react-router-dom";
import "modern-normalize/modern-normalize.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistor, store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
