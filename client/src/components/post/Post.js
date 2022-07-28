import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../redux/action/post";
import { Spinner } from "../common/Spinner";
import { Link, useParams } from "react-router-dom";
import { PostItem } from "../posts/PostItem";
import { CommentForm } from "./CommentForm";
import { CommentFeed } from "./CommentFeed";
export const Post = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  const { post, loading } = useSelector((state) => state.post);

  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link>

            {post === null || loading ? (
              <Spinner />
            ) : (
              <div>
                <PostItem post={post} shoeAction={false} />
                <CommentForm postId={post?._id}/>
                <CommentFeed comments={post?.comments} postId={post?._id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
