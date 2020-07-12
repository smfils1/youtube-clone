import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  loader: (props) => ({
    zIndex: theme.zIndex.drawer + 1,
    position: "absolute",
    backgroundColor: props.overlayColor,
  }),
  size: (props) => ({
    width: props.width,
    height: props.height,
  }),
  root: (props) => ({
    backgroundImage: `url("${
      props.src ||
      "https://via.placeholder.com/" + props.width + "x" + props.height + ".png"
    }")`,
    backgroundSize: "cover",
    position: "relative",
  }),
  active: {
    border: "5px solid red",
  },
}));

export default function Image({
  width = "150px",
  height = "100px",
  overlayColor = "rgba(0,0,0,0.3)",
  src,
  onClick,
  active,
}) {
  const classes = useStyles({ width, height, src, overlayColor });
  return (
    <div
      className={clsx(classes.root, classes.size, {
        [classes.active]: active,
      })}
      onClick={onClick}
    >
      <Backdrop className={clsx(classes.size, classes.loader)} open={!src}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}
