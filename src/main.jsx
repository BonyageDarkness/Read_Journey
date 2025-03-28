import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { setAuthToken } from "./api/axiosInstance";

const savedToken = localStorage.getItem("token");
if (savedToken) {
  setAuthToken(savedToken);
}

import "./index.scss";
import App from "./components/App/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
