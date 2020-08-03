import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles, Typography, Avatar, Button } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import clsx from "clsx";
import moment from "moment";
import urlJoin from "url-join";

import { BACKEND_URL } from "../../config";
import CommentReplies from "./CommentReplies";
import LikeDislikes from "../LikeDislikes";
import CommentForm from "./CommentForm";

const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: 400,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  subTitle: {
    color: grey[700],
  },
  info_1: {
    display: "flex",
    paddingTop: theme.spacing(1),
  },
  secondaryInfo: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  info_2: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  info_3: {
    display: "flex",
    lineHeight: "80%",
  },
  channel: {
    fontWeight: 500,
  },
  replyBtn: {
    backgroundColor: grey[400],
    borderRadius: 2,
  },
  timeAgo: {
    marginLeft: theme.spacing(1),
  },
}));

const Comment = ({ comment }) => {
  const classes = useStyles();
  const isAuth = useSelector(({ channel }) => channel.isAuth);
  const [isReplyOpen, setReplyOpen] = useState(false);

  const toggleReplyOpen = () => setReplyOpen((isOpen) => !isOpen);

  const handleReplyClick = () => {
    if (isAuth) {
      toggleReplyOpen();
    } else {
      window.location.assign(urlJoin(BACKEND_URL, "/api/auth/google"));
    }
  };
  const handleReplyComment = () => {
    toggleReplyOpen();
  };

  return (
    <div>
      <div className={classes.info_1}>
        <Avatar alt="Avatar" src={comment.channelImg} />
        <div className={classes.info_2}>
          <div className={classes.info_3}>
            <Typography variant="body2" className={clsx(classes.channel)}>
              {comment.channelName}
            </Typography>
            <Typography
              variant="caption"
              className={clsx(classes.subTitle, classes.timeAgo)}
            >
              {moment(comment.createdAt).fromNow()}
            </Typography>
          </div>
          <div>{comment.content}</div>
          <div className={classes.info_3}>
            <LikeDislikes
              size="small"
              showDislikes={false}
              type="comment"
              id={comment.id}
              videoId={comment.videoId}
            />
            <Button
              className={classes.replyBtn}
              disableElevation
              disableFocusRipple
              disableRipple
              variant="contained"
              color="secondary"
              onClick={handleReplyClick}
            >
              Rely
            </Button>
          </div>

          <div>
            <CommentReplies parentCommentId={comment.id} />
          </div>
        </div>
      </div>
      {isReplyOpen && (
        <CommentForm
          videoId={comment.videoId}
          commentTo={comment.id}
          handleReplyComment={handleReplyComment}
        />
      )}
    </div>
  );
};

export default Comment;
