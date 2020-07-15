import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignInPage from "./components/Pages/SignInPage";
import HomePage from "./components/Pages/HomePage";
import VideoPage from "./components/Pages/VideoPage";

import auth from "./components/authHOC";
import NavBar from "./components/NavBar";

function App() {
  const Home = auth(HomePage, false);
  const Subscriptions = auth(SignInPage, false);
  const Library = auth(SignInPage, false);
  const History = auth(SignInPage, false);

  return (
    <div>
      <NavBar>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/trending" render={() => <div>Trending</div>} />
          <Route
            exact
            path="/subscriptions"
            render={(props) => (
              <Subscriptions {...props} page="subscriptions" />
            )}
          />
          <Route
            exact
            path="/library"
            render={(props) => <Library {...props} page="library" />}
          />
          <Route
            exact
            path="/history"
            render={(props) => <History {...props} page="history" />}
          />
          <Route
            exact
            path="/watch"
            render={(props) => <VideoPage {...props} />}
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </NavBar>
    </div>
  );
}

export default App;
