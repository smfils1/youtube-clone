import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./components/HomePage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ResetPage from "./components/ResetPage";
import ForgotPage from "./components/ForgotPasswordPage";
import auth from "./hoc/auth";
import TopNav from "./components/TopNav";

function App() {
  const Home = auth(HomePage, false);
  const Login = auth(LoginPage, false);
  const Register = auth(RegisterPage, false);
  const Reset = auth(ResetPage, false);
  const Forgot = auth(ForgotPage, false);
  return (
    <div>
      <TopNav />
      {/* <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <Route
          exact
          path="/reset/:id"
          render={(props) => <Reset {...props} />}
        />
        <Route
          exact
          path="/register"
          render={(props) => <Register {...props} />}
        />
        <Route exact path="/forgot" render={(props) => <Forgot {...props} />} />
        <Route render={() => <Redirect to="/" />} />
      </Switch> */}
    </div>
  );
}

export default App;
