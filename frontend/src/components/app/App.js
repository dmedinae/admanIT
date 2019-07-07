import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import User from "../user/User";

function App() {
  return (
    <BrowserRouter>
      <div className="bg bg-logIn">
        <div className="slideInDown">
          <div className="container-apps">
            <div className="card-apps container-fluid">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/user/:id" component={User} />
                <Route component={Home} />
              </Switch>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
