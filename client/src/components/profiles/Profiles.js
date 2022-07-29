import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfiles } from "../../redux/action/profile";
import { Spinner } from "../common/Spinner";
import { ProfileItem } from "./ProfileItem";
export const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center ">Developer Profiles</h1>
            <p className="lead text-center">
              Brows and connect with developers
            </p>
            {profiles === null  || loading ? (
              <Spinner />
            ) : profiles?.length < 1 ? (
              <h4>NO Profiles Found</h4>
            ) : (
              profiles?.map((item, index) => (
                <ProfileItem profile={item} key={index} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
