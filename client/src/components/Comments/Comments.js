import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getVideoComments } from "../../redux/actions/comments";
import Comment from "./Comment";

const Comments = ({ videoId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(({ comments }) => comments);

  useEffect(() => {
    dispatch(getVideoComments(videoId));
  }, [videoId]);

  return (
    <div>
      {comments.length ? (
        comments.map(
          (comment) =>
            !comment.commentTo && <Comment key={comment.id} comment={comment} />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comments;
