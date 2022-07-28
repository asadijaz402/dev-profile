import React, { useEffect, useState } from "react";
import { SC } from "../helper/ServerCall";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/action/auth";
import TextFieldGroup from "../common/TextFieldGroup";
import { clearErrors } from "../../redux/action/post";
export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { errors } = useSelector((state) => state.errors);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(data,navigate));
  };

  useEffect(() => {
    setData({
      ...data,
      errors,
    });
  }, [errors]);

  useEffect(() => {
    dispatch(clearErrors())
  }, [])
  if (isAuthenticated) {
    navigate("/dashboard");
  }
  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form onSubmit={handelSubmit}>
              <TextFieldGroup
                onChange={handleChange}
                type="text"
                placeholder="Name"
                value={data.name}
                error={data?.errors?.name}
                name="name"
              />
              <TextFieldGroup
                onChange={handleChange}
                type="email"
                placeholder="Email Address"
                value={data.email}
                error={data?.errors?.email}
                name="email"
                info="This Site uses gravatar so if you want a profile image, use a Gravatar Email"
              />

              <TextFieldGroup
                onChange={handleChange}
                type="password"
                placeholder="Password"
                value={data.password}
                name="password"
                error={data?.errors?.password}
              />

              <TextFieldGroup
                onChange={handleChange}
                type="password"
                placeholder="Conform Password"
                value={data.password2}
                name="password2"
                error={data?.errors?.password2}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
