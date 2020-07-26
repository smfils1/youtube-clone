import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignInPage from "./components/Pages/SignInPage";
import HomePage from "./components/Pages/HomePage";
import VideoPage from "./components/Pages/VideoPage";
import TrendingPage from "./components/Pages/TrendingPage";
//import SubscriptionPage from "./components/Pages/SubscriptionPage";

import auth from "./components/authHOC";
import Nav from "./components/Nav";

function App() {
  const Home = auth(HomePage, false);
  const Subscriptions = auth(SignInPage, false);
  const Library = auth(SignInPage, false);
  const History = auth(SignInPage, false);
  const Video = auth(VideoPage, false);
  const Trending = auth(TrendingPage, false);
  //const Subscription = auth(SubscriptionPage, false);

  return (
    <div>
      <Nav>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />

          <Route
            exact
            path="/trending"
            render={(props) => <Trending {...props} />}
          />
          <Route
            exact
            path="/trending/:id"
            render={(props) => <Trending {...props} />}
          />
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
          <Route exact path="/watch" render={(props) => <Video {...props} />} />
          <Route
            exact
            path="/channel/:id"
            render={(props) => <div {...props}>Channel</div>}
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Nav>
    </div>
  );
}

export default App;
