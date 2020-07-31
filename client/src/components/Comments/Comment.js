import React from "react";
import {
  makeStyles,
  Typography,
  Divider,
  Avatar,
  Button,
  Collapse,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import clsx from "clsx";

import CommentReplies from "./CommentReplies";
import LikeDislikes from "../LikeDislikes";
const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: 400,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  subTitle: {
    color: grey[700],
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

const Comment = ({ comment }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar alt="Avatar" />
      <div className={classes.info_1}>
        <div className={classes.info_2}>
          <Typography variant="body2" className={clsx(classes.channel)}>
            {comment.commentBy}
          </Typography>
          <Typography variant="caption" className={clsx(classes.subTitle)}>
            1 month ago
          </Typography>
        </div>
        <div>{comment.content}</div>
        <div>
          <LikeDislikes size="small" showDislikes={false} />
        </div>
        <div>
          <CommentReplies parentCommentId={comment.id} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
