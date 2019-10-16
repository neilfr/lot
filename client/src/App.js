import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./pages/Admin";
import Search from "./pages/Search";
import Arrival from "./pages/Arrival";
import Departure from "./pages/Departure";
import Payment from "./pages/Payment";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/" component={Admin} />
          <Route exact path="/arrival" component={Arrival} />
          <Route exact path="/departure" component={Departure} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/books/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
