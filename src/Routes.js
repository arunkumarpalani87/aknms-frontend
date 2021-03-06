import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Home from "./containers/Home";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import EventsPage from "./components/EventsPage";
import Signup from "./containers/Signup"
import UserPage from "./components/UserPage";
import DevicePage from "./components/DevicePage";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/eventsPage" exact component={EventsPage} props={childProps} />
    <AppliedRoute path="/userPage" exact component={UserPage} props={childProps} />
    <AppliedRoute path="/devicePage" exact component={DevicePage} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
