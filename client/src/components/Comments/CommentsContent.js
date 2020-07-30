import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      <p>{comments.length} Comments</p>
      <CommentForm />
      <Comments videoId={videoId} />
    </div>
  );
};

export default CommentsContent;
