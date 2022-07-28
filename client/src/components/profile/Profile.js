import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProfileAbout } from "./ProfileAbout";
import { ProfileCreds } from "./ProfileCreds";
import { ProfileGithub } from "./ProfileGithub";
import { ProfileHeader } from "./ProfileHeader";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "../common/Spinner";
import { getProfileByHandle } from "../../redux/action/profile";
export const Profile = () => {
  const dispatch = useDispatch();
  const { handle } = useParams();
  useEffect(() => {
    dispatch(getProfileByHandle(handle));
  }, [handle]);
  const { profile, loading } = useSelector((state) => state.profile);

  return (
    <div>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <Link
                    to={"/profiles"}
                    className="btn btn-light mb-3 float-left"
                  >
                    {" "}
                    Back To Profile
                  </Link>
                </div>
                <div className="col-md-6" />
              </div>
              <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile} />
              <ProfileCreds
                education={profile.education}
                experience={profile.experience}
              />
              <ProfileGithub githubusername={profile?.githubusername ||"hassan"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
