import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { useMainPageStore } from "./store/mainPage";
import { useTouristDestinationsPageStore } from "./store/touristDestinationsPage";
import { useJackLondonLakeStore } from "./store/jackLondonLake";

useMainPageStore.getState().queryInitialData();

useTouristDestinationsPageStore.getState().queryInitialData();

useJackLondonLakeStore.getState().queryInitialData();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
