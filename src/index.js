import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from './App';
import Navigation from "./Navigation";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import logger from "redux-logger";
import thunk from 'redux-thunk';

const middleware = applyMiddleware(logger, thunk);

const createStoresWithMiddleware = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={createStoresWithMiddleware}>
    <Navigation />
  </Provider>,
  document.getElementById("root")
);
