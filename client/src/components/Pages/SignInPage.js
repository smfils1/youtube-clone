import React from "react";

import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import SignInBtn from "../SignInBtn";
import menuAuthIcons from "../menuAuthIcons";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    height: "50%",
    flexDirection: "column",
    alignItems: "center",
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
    <Container className={classes.root}>
      {!isAuth ? (
        <div className={classes.content}>
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
        </div>
      ) : (
        <div>{page}</div>
      )}
    </Container>
  );
};

export default SignInPage;
