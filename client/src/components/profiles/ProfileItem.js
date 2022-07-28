import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "../validation/is-empty";
export const ProfileItem = ({ profile }) => {
  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-2">
          <img
            alt="avatar"
            src={profile?.user?.avatar}
            className="rounded-circle"
          />
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{profile?.user?.name}</h3>
          <p>
            {profile?.status}{" "}
            {isEmpty(profile?.company) ? null : (
              <span> at {profile?.company}</span>
            )}
          </p>
          <p>{profile?.location}</p>
          <Link to={`/profile/${profile?.handle}`} className="btn btn-info">
            {" "}
            View Profile
          </Link>
        </div>
        <div className="col-md-4 d-none d-md-block">
          <h4>Skill Set</h4>
          <ul className="list-group">
            {profile?.skills.slice(0, 4).map((item, index) => (
              <li key={index} className="list-group-item">
                <i className="fa fa-check pr-1" />
                {" "} {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
