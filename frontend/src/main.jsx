import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";



import PostListProvider from "./store/post-list-store";
import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "react-hot-toast"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PostListProvider>
          <App />
          <Toaster position="top-center" /> 
        </PostListProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
