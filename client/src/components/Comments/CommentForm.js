import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextareaAutosize,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import urlJoin from "url-join";
import axios from "axios";

import { BACKEND_URL } from "../../config";
import { addComment } from "../../redux/actions/comments";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  commentBtn: {
    backgroundColor: red[700],
  },
  textArea: {
    flex: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const CommentForm = ({ videoId, commentTo, handleReplyComment }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const isAuth = useSelector(({ channel }) => channel.isAuth);
  const userId = useSelector(({ channel }) => channel.id);
  const channelImg = useSelector(({ channel }) => channel.image);
  const classes = useStyles();

  const handleChange = (e) => setComment(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAuth) {
      const data = {
        videoId,
        content: comment,
        commentBy: userId,
        commentTo,
      };
      setComment("");
      try {
        const {
          data: { comment: newComment },
        } = await api.post("/api/comments", data);
        handleReplyComment();
        dispatch(addComment(newComment));
      } catch (err) {
        console.log(err);
      }
    } else {
      window.location.assign(urlJoin(BACKEND_URL, "/api/auth/google"));
    }
  };

  return (
    <form className={classes.root}>
      <Avatar alt="Avatar" src={channelImg} />
      <TextareaAutosize
        onChange={handleChange}
        value={comment}
        rowsMin={2}
        className={classes.textArea}
        placeholder="Add a public comment..."
      />
      <Button
        disableElevation
        disableFocusRipple
        disableRipple
        variant="contained"
        color="secondary"
        className={classes.commentBtn}
        type="submit"
        onClick={handleSubmit}
        disabled={!comment}
      >
        Comment
      </Button>
    </form>
  );
};

export default CommentForm;
