import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import queryClientObject from "./query/reactQuery";
import store from "./redux/store";
import App from "./pages/App";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClientObject}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/about" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/employee" element={<Employee />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
