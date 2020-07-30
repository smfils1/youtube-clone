import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
const CommentReplies = ({ parentCommentId }) => {
  const [numberOfReplies, setReplies] = useState(0);
  const comments = useSelector(({ comments }) => comments);

  useEffect(() => {
    let count = 0;
    comments.map((comment) => {
      if (comment.commentTo === parentCommentId) {
        count++;
      }
    });
    setReplies(count);
  }, [parentCommentId, comments]);

  let renderReplies = (parentCommentId) =>
    comments.map((comment, index) => (
      <>
        {comment.commentTo === parentCommentId && (
          <div>
            <p>
              {comment.commentTo}
              {parentCommentId}
              {index}
            </p>
            <Comment comment={comment} />
          </div>
        )}
      </>
    ));

  return (
    <div>
      {numberOfReplies > 0 && (
        <p style={{ fontSize: "14px", margin: 0, color: "gray" }}>
          View {numberOfReplies} more comment(s)
        </p>
      )}

      {true && renderReplies(parentCommentId)}
    </div>
  );
};

export default CommentReplies;
