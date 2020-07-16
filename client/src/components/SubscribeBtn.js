import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  subscribeBtn: {
    backgroundColor: red[700],
    borderRadius: 2,
  },
}));
const handleClick = () => {
  console.log("Button Click");
};
export default function SubscribeBtn({ className }) {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.subscribeBtn, className)}
      disableElevation
      disableFocusRipple
      disableRipple
      variant="contained"
      color="secondary"
      onClick={handleClick}
    >
      subscribe
    </Button>
  );
}
