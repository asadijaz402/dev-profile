import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../redux/action/post";

export const CommentItem = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onDelete = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId));
  };
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={comment.avatar}
              alt=""
            />
          </a>
          <br />
          <p className="text-center">{comment.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{comment.text}</p>
          {user.id === comment.user && (
            <button
              className="btn btn-danger m-2"
              onClick={() => onDelete(postId, comment?._id)}
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
