import React, { useEffect } from "react";
import { getProfile, deleteProfile } from "../../redux/action/profile";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "../common/Spinner";
import { ProfileAction } from "./ProfileAction";
import { Experience } from "./Experience";
import { Education } from "./Education";
export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  // if (!isAuthenticated) {
  //   navigate("/login");
  // }

  const onDeleteProfile = (e) => {
    e.preventDefault();
    dispatch(deleteProfile());
  };
  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {loading || profile === null ? (
              <Spinner />
            ) : Object.keys(profile).length < 1 ? (
              <h4 className="display-4">
                <div>
                  <p className="lead text-muted">Welcome {user?.name}</p>
                  <p className="lead ">
                    You have not profile yet, please add some info
                  </p>
                  <Link className="btn btn-lg btn-info" to="/create-profile">
                    Create Profile
                  </Link>
                </div>
              </h4>
            ) : (
              <div>
                <p className="lead text-muted">
                  Welcome{" "}
                  <Link to={`/profile/${profile.handle}`}>
                    {profile.handle}
                  </Link>{" "}
                </p>
                <ProfileAction />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div style={{ marginBottom: "60px" }}>
                  <button className="btn btn-danger" onClick={onDeleteProfile}>
                    Delete My Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
