import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, makeStyles } from "@material-ui/core";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import { blue, grey } from "@material-ui/core/colors";
import urlJoin from "url-join";
import clsx from "clsx";
import NumAbbr from "number-abbreviate";
import axios from "axios";

import { BACKEND_URL } from "../config";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

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

const LikeDislikes = ({ size, showDislikes = true, type, id, videoId }) => {
  const options = [-1, 1]; //Dislike, Like
  const [rating, setRating] = useState(null);
  const [dislikes, setDislikes] = useState(0);
  const [likes, setLikes] = useState(0);
  const isAuth = useSelector(({ channel }) => channel.isAuth);
  const classes = useStyles();
  useEffect(() => {
    const fetchRating = async () => {
      const url1 = `/api/ratings/${type}/${videoId}/${id}`;
      const url2 = `/api/ratings/user/${type}/${videoId}/${id}`;
      try {
        const {
          data: { ratings },
        } = await api.get(url1);
        const { data } = await api.get(url2);

        setLikes(ratings.likes);
        setDislikes(ratings.dislikes);
        if (data) {
          setRating(data.rating);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRating();
  }, [type, id]);

  const getRating = (option) => options[option];

  const handleThumbClick = async (newRating) => {
    if (isAuth) {
      const url = `/api/ratings/${type}/${videoId}/${id}`;
      try {
        if (!rating) {
          await api.post(url, {
            rating: newRating,
          });
          if (newRating > 0) {
            setLikes((count) => ++count);
          } else {
            setDislikes((count) => ++count);
          }
          setRating(newRating);
        } else if (rating && newRating !== rating) {
          await api.patch(url, {
            rating: newRating,
          });
          if (rating > 0) {
            setDislikes((count) => ++count);
            setLikes((count) => --count);
          } else {
            setDislikes((count) => --count);
            setLikes((count) => ++count);
          }
          setRating(newRating);
        } else {
          console.log("need to delete");
          await api.delete(url);
          if (rating > 0) {
            setLikes((count) => --count);
          } else {
            setDislikes((count) => --count);
          }
          setRating(null);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      window.location.assign(urlJoin(BACKEND_URL, "/api/auth/google"));
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.rating}>
        <ThumbUp
          onClick={() => handleThumbClick(getRating(1))}
          className={clsx(classes.thumbBtn, {
            [classes.small]: size === "small",
            [classes.active]: getRating(1) === rating,
          })}
        />
        <Typography variant="body2">
          {new NumAbbr().abbreviate(likes, 2)}
        </Typography>
      </div>
      <div className={classes.rating}>
        <ThumbDown
          onClick={() => handleThumbClick(getRating(0))}
          className={clsx(classes.thumbBtn, {
            [classes.small]: size === "small",
            [classes.active]: getRating(0) === rating,
          })}
        />
        {showDislikes && new NumAbbr().abbreviate(dislikes, 2)}
      </div>
    </div>
  );
};

export default LikeDislikes;
