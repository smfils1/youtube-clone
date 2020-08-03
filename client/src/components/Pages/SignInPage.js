import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, Container, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import clsx from "clsx";
import SubscriptionPage from "./SubscriptionPage";
import SignInBtn from "../SignInBtn";
import menuAuthIcons from "../menuAuthIcons";
import ComingSoonPage from "./ComingSoonPage";

const comingSoon = ["library", "myVideos", "live", "watchLater", "history"];
const authPages = ["subscriptions"];

const useStyles = makeStyles((theme) => ({
  root_1: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  root_2: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  icon: { fontSize: "7em", color: grey[500], paddingBottom: theme.spacing(2) },
  text: {
    paddingBottom: theme.spacing(2),
  },
}));
const SignInPage = ({ page }) => {
  const isAuth = useSelector(({ channel }) => channel.isAuth);
  const authIcon = menuAuthIcons.filter(
    ({ title }) => title.toLowerCase() === page
  )[0];
  const Icon = authIcon.icon;
  const classes = useStyles();
  return (
    <Container
      className={clsx({
        [classes.root_1]: !isAuth || !page || comingSoon.includes(page),
        [classes.root_2]: authPages.includes(page),
      })}
    >
      {(() => {
        if (!isAuth) {
          return (
            <>
              <Icon className={classes.icon} />
              <Typography variant="h4" align="center" className={classes.text}>
                {authIcon.description}
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                className={classes.text}
              >
                {authIcon.signInMsg}
              </Typography>
              <SignInBtn size="large" />
            </>
          );
        } else if (comingSoon.includes(page)) {
          return <ComingSoonPage />;
        } else if (authPages.includes(page)) {
          return <SubscriptionPage />;
        } else {
          return <div>{page}</div>;
        }
      })()}
    </Container>
  );
};

export default SignInPage;
