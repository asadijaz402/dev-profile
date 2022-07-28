import { profile_url } from "gravatar";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
export const ProfileAbout = ({ profile }) => {
  const dispatch = useDispatch();

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{profile?.user?.name}'s</h3>
          <p className="lead">{profile?.bio}</p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {profile?.skills?.map((item, index) => (
                <div key={index} className="p-3">
                  <i className="fa fa-check"></i> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
