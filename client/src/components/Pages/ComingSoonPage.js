import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
export default () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h4" align="center">
        Feature Coming Soon
      </Typography>
    </Container>
  );
};
