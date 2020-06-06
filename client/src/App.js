import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignInPage from "./components/SignInPage";
// import HomePage from "./components/HomePage";
// import RegisterPage from "./components/RegisterPage";
// import LoginPage from "./components/LoginPage";
// import ResetPage from "./components/ResetPage";
// import ForgotPage from "./components/ForgotPasswordPage";
// import auth from "./hoc/auth";
import NavBar from "./components/NavBar";

function App() {
  // const Home = auth(HomePage, false);
  // const Login = auth(LoginPage, false);
  // const Register = auth(RegisterPage, false);
  // const Reset = auth(ResetPage, false);
  // const Forgot = auth(ForgotPage, false);
  return (
    <div>
      <NavBar>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <div {...props}>Home</div>}
          />
          <Route
            exact
            path="/trending"
            render={(props) => <div {...props}>Trending</div>}
          />
          <Route
            exact
            path="/subscriptions"
            render={(props) => <SignInPage page="subscriptions" {...props} />}
          />
          <Route
            exact
            path="/library"
            render={(props) => <SignInPage page="library" {...props} />}
          />
          <Route
            exact
            path="/history"
            render={(props) => <SignInPage page="history" {...props} />}
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </NavBar>
    </div>
  );
}

export default App;
