import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { createProfile, getProfile } from "../../redux/action/profile";
import { Link, useNavigate } from "react-router-dom";
export const CreateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.profile);
  const { errors } = useSelector((state) => state.errors);
  const [data, setData] = useState({
    displaySocialInput: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    youtube: "",
    instagram: "",
    errors: {},
  });

  useEffect(() => {
    setData({
      ...data,
      errors,
    });
  }, [errors]);

  useEffect(() => {
    dispatch(getProfile());
    setData(profile);
  }, []);

  const options = [
    { label: "* Select Profactionl Status", value: 0 },
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "other", value: "other" },
  ];
  const handelSubmit = (e) => {
    e.preventDefault();
    if (typeof data.skills === "object") {
      data.skills = data.skills.toString();
    }
    dispatch(createProfile(data, navigate));
  };

  const handelChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    let name = e.target.name;
  };

  const socialDisplay = (e) => {
    e.preventDefault();
    setData({
      ...data,
      displaySocialInput: !data.displaySocialInput,
    });
  };

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link className="btn btn-light" to="/dashboard">
              Go Back
            </Link>
            <h1 className="display-4 text-center">
              {profile?.handle ? "Edit" : "Create "} Your Profile
            </h1>
            <p className="lead text-center">
              Let's get information to make your Profile stand out
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={handelSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                type="text"
                value={data?.handle}
                onChange={handelChange}
                error={data?.errors?.handle}
                name="handle"
                info="A unique for your profile URL. Your full name, company name, nickname"
              />
              <TextFieldGroup
                placeholder="Status"
                type="select"
                options={options}
                value={data?.status}
                onChange={handelChange}
                error={data?.errors?.status}
                name="status"
                info="Give us idea of Where you are at in you Career"
              />

              <TextFieldGroup
                placeholder="Company"
                type="text"
                value={data?.company}
                onChange={handelChange}
                error={data?.errors?.company}
                name="company"
                info="Could be your own company or one you work for"
              />

              <TextFieldGroup
                placeholder="Website"
                type="text"
                value={data?.website}
                onChange={handelChange}
                error={data?.errors?.website}
                name="website"
                info="Could be your own or a company website"
              />
              <TextFieldGroup
                placeholder="Location"
                type="text"
                value={data?.location}
                onChange={handelChange}
                error={data?.errors?.location}
                name="location"
                info="Could be your own or a company location"
              />
              <TextFieldGroup
                placeholder="* Skills"
                type="text"
                value={data?.skills}
                onChange={handelChange}
                error={data?.errors?.skills}
                name="skills"
                info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
              />
              <TextFieldGroup
                placeholder="Github User Name"
                type="text"
                value={data?.githubusername}
                onChange={handelChange}
                error={data?.errors?.githubusername}
                name="githubusername"
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextFieldGroup
                placeholder="Short Bio"
                type="textarea"
                value={data?.bio}
                onChange={handelChange}
                error={data?.errors?.bio}
                name="bio"
                info="Tell us a little about yourself"
              />
              <div className="mb-3">
                <button onClick={socialDisplay} className="btn btn-light">
                  Add Social Network Links
                </button>
                <span>Optional</span>
              </div>
              {data?.displaySocialInput && (
                <div>
                  <TextFieldGroup
                    placeholder="Twitter Profile URL"
                    icon="fab fa-twitter"
                    type="inputGroup"
                    value={
                      data?.twitter === undefined
                        ? data.social?.twitter
                        : data?.twitter
                    }
                    onChange={handelChange}
                    error={data.errors?.twitter}
                    name="twitter"
                  />

                  <TextFieldGroup
                    placeholder="Youtube Profile URL"
                    icon="fab fa-youtube"
                    type="inputGroup"
                    value={
                      data?.youtube === undefined
                        ? data.social?.youtube
                        : data?.youtube
                    }
                    onChange={handelChange}
                    error={data.errors?.youtube}
                    name="youtube"
                  />

                  <TextFieldGroup
                    placeholder="Facebook Profile URL"
                    icon="fab fa-facebook"
                    type="inputGroup"
                    value={
                      data.facebook === undefined
                        ? data?.social?.facebook
                        : data?.facebook
                    }
                    onChange={handelChange}
                    error={data.errors?.facebook}
                    name="facebook"
                  />
                  <TextFieldGroup
                    placeholder="Instagram Profile URL"
                    icon="fab fa-instagram"
                    type="inputGroup"
                    value={
                      data?.instagram === undefined
                        ? data.social?.instagram
                        : data?.instagram
                    }
                    onChange={handelChange}
                    error={data.errors?.instagram}
                    name="instagram"
                  />

                  <TextFieldGroup
                    placeholder="Linkedin Profile URL"
                    icon="fab fa-linkedin"
                    type="inputGroup"
                    value={
                      data?.linkedin === undefined
                        ? data.social?.linkedin
                        : data?.linkedin
                    }
                    onChange={handelChange}
                    error={data.errors?.linkedin}
                    name="linkedin"
                  />
                </div>
              )}
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
