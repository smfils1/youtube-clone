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
import moment from "moment";
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
      <Avatar alt="Avatar" src={comment.channelImg} />
      <div className={classes.info_1}>
        <div className={classes.info_2}>
          <Typography variant="body2" className={clsx(classes.channel)}>
            {comment.channelName}
          </Typography>
          <Typography variant="caption" className={clsx(classes.subTitle)}>
            {moment(comment.createdAt).fromNow()}
          </Typography>
        </div>
        <div>{comment.content}</div>
        <div>
          <LikeDislikes
            size="small"
            showDislikes={false}
            type="comment"
            id={comment.id}
            videoId={comment.videoId}
          />
        </div>
        <div>
          <CommentReplies parentCommentId={comment.id} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
