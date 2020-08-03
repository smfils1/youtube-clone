import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    backgroundImage: `url("${
      props.src ||
      "https://via.placeholder.com/" + props.width + "x" + props.height + ".png"
    }")`,
    backgroundSize: "cover",
    position: "relative",
  }),
  size: (props) => ({
    width: props.width,
    height: props.height,
  }),

  active: {
    border: "5px solid red",
  },
}));

export default function Image({
  width = "150px",
  height = "100px",
  src,
  onClick,
  active,
}) {
  const classes = useStyles({ width, height, src });
  return (
    <div
      className={clsx(classes.root, classes.size, {
        [classes.active]: active,
      })}
      onClick={onClick}
    >
      {!src && (
        <Skeleton
          animation={"wave"}
          variant="rect"
          width={width}
          height={height}
        />
      )}
    </div>
  );
}
