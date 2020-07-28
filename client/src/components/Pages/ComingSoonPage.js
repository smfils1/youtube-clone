import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

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
  text: {
    paddingBottom: theme.spacing(2),
  },
}));
export default () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h4" align="center" className={classes.text}>
          Feature Coming Soon
        </Typography>
      </div>
      )
    </Container>
  );
};
