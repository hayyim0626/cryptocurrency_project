import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookMark from "./Pages/Bookmark/Bookmark";
import PriceList from "./Pages/PirceList/PriceList";
import ProductDeatail from "./Pages/ProductDetail/ProductDetail";

export default function Routes () {
  return (
    <Router>
      <Switch>
        <Route exact path="/bookmark" component={BookMark} />
        <Route exact path="/pricelist" component={PriceList} />
        <Route exact path="/productdetail" component={ProductDeatail} />
      </Switch>
    </Router>
  )
}
