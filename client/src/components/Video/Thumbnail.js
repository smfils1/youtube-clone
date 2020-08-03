import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  duration: {
    bottom: 0,
    right: 0,
    position: "absolute",
    margin: "0.5em 0.5em",
    color: "#fff",
    backgroundColor: "rgba(17, 17, 17, 0.7)",
    padding: "2px 4px",
    borderRadius: "2px",
    letterSpacing: "0.5px",
    fontSize: "12px",
    fontWeight: "700",
    lineHeight: "12px",
  },
}));

const Thumb = ({
  src = "https://via.placeholder.com/1280x720",
  imgStyle,
  duration = 0,
}) => {
  const classes = useStyles();
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);
  return (
    <div className={classes.root}>
      <img className={clsx(classes.img, imgStyle)} alt="thumbnail" src={src} />
      <div className={classes.duration}>
        <span>
          {minutes} : {seconds}
        </span>
      </div>
    </div>
  );
};

export default Thumb;
