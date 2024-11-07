import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  /* <BrowserRouter> stores the current location in the browser's address bar using clean URLs */
  <BrowserRouter>
    <App></App>
    <ToastContainer autoClose={4000} />
  </BrowserRouter>
);
