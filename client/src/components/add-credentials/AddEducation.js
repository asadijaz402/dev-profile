import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { useSelector, useDispatch } from "react-redux";
import { addEducation } from "../../redux/action/profile";

export const AddEducation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disable: false,
  });

  const { profile } = useSelector((state) => state.profile);
  const { errors } = useSelector((state) => state.errors);

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(addEducation(data, navigate));
  };

  const handelChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handelCheck = (e) => {
    setData({
      ...data,
      disable: !data.disable,
      current: !data.current,
    });
    if (data.disable) {
      data.to = null;
    }
  };
  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link className="btn btn-light" to="/dashboard">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any School,Collage etc, That you have attended{" "}
            </p>
            <small className="d-block pb-3">* = Required Fields</small>
            <form onSubmit={handelSubmit}>
              <TextFieldGroup
                placeholder="* School"
                value={data.school}
                name="school"
                onChange={handelChange}
                error={errors?.school}
              />

              <TextFieldGroup
                placeholder="*  degree"
                value={data.degree}
                name="degree"
                onChange={handelChange}
                error={errors?.degree}
              />

              <TextFieldGroup
                placeholder="* Field of Study"
                value={data.fieldofstudy}
                name="fieldofstudy"
                onChange={handelChange}
                error={errors?.fieldofstudy}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                type="date"
                // placeholder="From"
                value={data.from}
                name="from"
                onChange={handelChange}
                error={errors?.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                type="date"
                value={data.to}
                name="to"
                onChange={handelChange}
                error={errors?.to}
                disabled={data.disable && "disabled"}
              />
              <div className="from-check mb-4">
                <input
                  type={"checkbox"}
                  className="form-check-input"
                  name="current"
                  value={data.current}
                  checked={data.current}
                  onChange={handelCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current
                </label>
              </div>

              <TextFieldGroup
                placeholder="Description"
                value={data.description}
                type="textarea"
                name="description"
                onChange={handelChange}
                error={errors?.description}
                info="Tell us about the program that you were in"
              />
              <input
                type={"submit"}
                value="submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
