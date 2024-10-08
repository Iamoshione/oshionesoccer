import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./../node_modules/bootstrap/js/dist/util";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-soccer-lineup'
import App from "./App";
import { useState } from "react";

import reportWebVitals from "./reportWebVitals";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: " http://127.0.0.1:403/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
