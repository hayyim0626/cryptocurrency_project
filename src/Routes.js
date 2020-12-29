import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookMark from "./Pages/Bookmark/Bookmark";
import CurrencyList from "./Pages/CurrencyList/CurrencyList";
import CurrencyDeatail from "./Pages/CurrencyDetail/CurrencyDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Routes() {
  return (
    <Router>
      <ToastContainer />
        <Switch>
          <Route exact path="/bookmark" component={BookMark} />
          <Route exact path="/" component={CurrencyList} />
          <Route exact path="/currencydetail/:id" component={CurrencyDeatail} />
        </Switch>
    </Router>
  );
}
