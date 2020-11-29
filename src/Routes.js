import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookMark from "./Pages/Bookmark/Bookmark";
import ProductList from "./Pages/ProductList/ProductList";
import ProductDeatail from "./Pages/ProductDetail/ProductDetail";

export default function Routes () {
  return (
    <Router>
      <Switch>
        <Route exact path="/bookmark" component={BookMark} />
        <Route exact path="/productlist" component={ProductList} />
        <Route exact path="/productdetail" component={ProductDeatail} />
      </Switch>
    </Router>
  )
}
