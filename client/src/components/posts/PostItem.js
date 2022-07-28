import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, postDelete } from "../../redux/action/post";

export const PostItem = ({showAction=false, post}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onDelete = (id) => {
    dispatch(postDelete(id));
  };
  const handleLike = (id) => {
    dispatch(addLike(id));
  };
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <Link to={`/post/${post._id}`}>
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </Link>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post?.text}</p>
          {showAction && (
            <span>
              {" "}
              <button
                onClick={() => handleLike(post?._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i
                  className={
                    post?.likes?.some((post) => post?.user === user?.id)
                      ? "text-info fas fa-thumbs-up"
                      : "text-secondary fas fa-thumbs-up "
                  }
                ></i>
                <span className="badge badge-light" style={{ color: "black" }}>
                  {post?.likes?.length}
                </span>
              </button>
              {/* <button type="button" className="btn btn-light mr-1">
          <i className="text-secondary fas fa-thumbs-down"></i>
        </button> */}
              <Link to={`/post/${post?._id}`} className="btn btn-info mr-1">
                Comments
              </Link>
              {user.id === post.user && (
                <button
                  className="btn btn-danger m-2"
                  onClick={() => onDelete(post?._id)}
                >
                  <i className="fas fa-times" />
                </button>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
