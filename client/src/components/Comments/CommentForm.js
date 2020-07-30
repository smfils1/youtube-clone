import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  TextareaAutosize,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

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

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const isAuth = useSelector((channel) => channel.isAuth);
  const image = useSelector((channel) => channel.image);
  const classes = useStyles();

  const handleChange = (e) => setComment(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setComment("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Avatar alt="Avatar" src={image} />
      <TextareaAutosize
        onChange={handleChange}
        value={comment}
        rowsMin={2}
        className={classes.textArea}
        placeholder="Add a public comment..."
      />
      {/* <TextField
        className={classes.textField}
        label="Add a public comment..."
  
      /> */}
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
    </form>
  );
};

export default CommentForm;
