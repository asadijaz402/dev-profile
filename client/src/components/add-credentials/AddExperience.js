import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { useSelector, useDispatch } from "react-redux";
import { addExperience } from "../../redux/action/profile";

export const AddExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    company: "",
    title: "",
    location: "",
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
    dispatch(addExperience(data, navigate));
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
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link className="btn btn-light" to="/dashboard">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">
              Add any job or position that you have had in the past and current
            </p>
            <small className="d-block pb-3">* = Required Fields</small>
            <form onSubmit={handelSubmit}>
              <TextFieldGroup
                placeholder="* Company"
                value={data.company}
                name="company"
                onChange={handelChange}
                error={errors?.company}
              />

              <TextFieldGroup
                placeholder="* Jop title"
                value={data.title}
                name="title"
                onChange={handelChange}
                error={errors?.title}
              />

              <TextFieldGroup
                placeholder="Location"
                value={data.location}
                name="location"
                onChange={handelChange}
                error={errors?.location}
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
                  Current Job
                </label>
              </div>

              <TextFieldGroup
                placeholder="Job Description"
                value={data.description}
                type="textarea"
                name="description"
                onChange={handelChange}
                error={errors?.description}
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
