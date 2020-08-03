import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles, Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";

import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: 400,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  view_more: {
    color: blue[700],
    display: "inline-flex",
    cursor: "pointer",
  },
  root: {
    display: "flex",

    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  secondaryInfo: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  info_1: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  info_2: {
    display: "flex",
    lineHeight: "80%",
  },
  channel: {
    fontWeight: 500,
  },
}));

const CommentReplies = ({ parentCommentId }) => {
  const [numberOfReplies, setReplies] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const comments = useSelector(({ comments }) => comments);
  const classes = useStyles();

  const toggleOpen = () => setOpen((isOpen) => !isOpen);
  useEffect(() => {
    let count = 0;
    comments.forEach((comment) => {
      if (comment.commentTo === parentCommentId) {
        count++;
      }
    });
    setReplies(count);
  }, [parentCommentId, comments]);

  let renderReplies = (parentCommentId) =>
    comments.map((comment) => (
      <>
        {comment.commentTo === parentCommentId && (
          <Comment key={comment.id} comment={comment} />
        )}
      </>
    ));

  return (
    <div>
      {numberOfReplies > 0 && (
        <div className={classes.view_more} onClick={toggleOpen}>
          {isOpen ? (
            <>
              <ArrowDropUp />
              <Typography variant="button">
                Hide {numberOfReplies} replies
              </Typography>
            </>
          ) : (
            <>
              <ArrowDropDown />
              <Typography variant="button">
                View {numberOfReplies} replies
              </Typography>
            </>
          )}
        </div>
      )}

      {isOpen && renderReplies(parentCommentId)}
    </div>
  );
};

export default CommentReplies;
