import React, { useState } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../../redux/action/post";
export const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { errors } = useSelector((state) => state.errors);
  const [data, setData] = useState({
    text: "",
    name: user?.name,
    avatar: user?.avatar,
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(postId, data));
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Make a Comment</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <TextFieldGroup
                type="textarea"
                placeholder="Reply To Post"
                name="text"
                onChange={handleChange}
                error={errors?.text}
                value={data?.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
