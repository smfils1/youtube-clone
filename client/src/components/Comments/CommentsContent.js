import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { getVideoComments } from "../../redux/actions/comments";

const CommentsContent = ({ videoId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(({ comments }) => comments);

  useEffect(() => {
    dispatch(getVideoComments(videoId));
  }, [videoId]);

  return (
    <div>
      <Typography variant="body1">{comments.length} Comments</Typography>
      <CommentForm videoId={videoId} />
      <Comments videoId={videoId} />
    </div>
  );
};

export default CommentsContent;
