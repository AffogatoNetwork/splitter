import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Drizzle, generateStore } from "drizzle";
import SplitterFactory from "./contracts/SplitterFactory.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";

// let drizzle know what contracts we want
const options = { contracts: [SplitterFactory] };

// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

// pass in the drizzle instance
ReactDOM.render(
  <Router>
    <App drizzle={drizzle} />
  </Router>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
