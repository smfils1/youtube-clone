import React from "react";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { AccountCircle as AccountIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  signButton: {
    color: blue[800],
    borderColor: blue[800],
    borderRadius: "3px",
  },
}));

const SignInBtn = ({ size }) => {
  const classes = useStyles();
  return (
    <Button
      size={size}
      variant="outlined"
      className={classes.signButton}
      startIcon={<AccountIcon />}
    >
      sign in
    </Button>
  );
};

export default SignInBtn;
