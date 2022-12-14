import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { fetchDogs } from "./actions";
import "./index.css";

store.dispatch(fetchDogs());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
