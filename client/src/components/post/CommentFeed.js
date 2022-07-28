import React from "react";
import { CommentItem } from "./CommentItem";

export const CommentFeed = ({ comments,postId }) => {
  return (
    <div className="comments">
      {comments?.map((item, index) => (
        <CommentItem comment={item} key={index} postId={postId} />
      ))}
    </div>
  );
};
