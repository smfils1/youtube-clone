import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import { blue, grey } from "@material-ui/core/colors";
import urlJoin from "url-join";
import clsx from "clsx";
import { BACKEND_URL } from "../config";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    color: grey[500],
    margin: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
  thumbBtn: {
    cursor: "pointer",
    marginRight: theme.spacing(0.5),
  },
  active: {
    color: blue[700],
  },
  small: { fontSize: 18 },
}));

const LikeDislikes = ({ size, showDislikes = true }) => {
  const options = [-1, 1]; //Dislike, Like
  const [rating, setRating] = useState(null);
  const [dislikes, setDislikes] = useState(0);
  const [likes, setLikes] = useState(0);
  const isAuth = useSelector((channel) => channel.isAuth);
  const classes = useStyles();

  const getRating = (option) => options[option];

  const handleThumbClick = (option) => {
    if (isAuth) {
      setRating(options[option]);
    } else {
      window.location.assign(urlJoin(BACKEND_URL, "/api/auth/google"));
    }
  };
  const CommmentButton = (
    <Button
      disableElevation
      disableFocusRipple
      disableRipple
      variant="contained"
      color="secondary"
      className={classes.commentBtn}
      type="submit"
    >
      Comment
    </Button>
  );
  return (
    <div className={classes.root}>
      <div className={classes.rating}>
        <ThumbUp
          onClick={() => handleThumbClick(options[1])}
          className={clsx(classes.thumbBtn, {
            [classes.small]: size === "small",
            [classes.active]: getRating(1) === rating,
          })}
        />
        <Typography variant="body2">{likes}</Typography>
      </div>
      <div className={classes.rating}>
        {" "}
        <ThumbDown
          onClick={() => handleThumbClick(options[0])}
          className={clsx(classes.thumbBtn, {
            [classes.small]: size === "small",
            [classes.active]: getRating(0) === rating,
          })}
        />
        {showDislikes && dislikes}
      </div>
    </div>
  );
};

export default LikeDislikes;
