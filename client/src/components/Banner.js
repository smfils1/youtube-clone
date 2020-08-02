import React, { useState } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    height: 250,
    backgroundColor: "gray",
  },
  icon: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "white",
    backgroundColor: "transparent",
    padding: "5px",
    margin: "5px",
  },
}));

const Banner = ({ closeable, children }) => {
  const classes = useStyles();
  const [isClosed, setClosed] = useState(false);

  const handleClose = () => {
    setClosed(true);
  };

  return (
    <>
      {" "}
      {!isClosed && closeable && (
        <div className={classes.root}>
          <IconButton onClick={handleClose} className={classes.icon}>
            <CloseIcon />
          </IconButton>
          {children}
        </div>
      )}
      {!closeable && <div className={classes.root}>{children}</div>}
    </>
  );
};

export default Banner;
