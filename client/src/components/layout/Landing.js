import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export const Landing = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Developer Profile</h1>
              {!isAuthenticated && (
                <div>
                  {" "}
                  <p className="lead">
                    {" "}
                    Create a developer profile/portfolio, share posts and get
                    help from other developers
                  </p>
                  <hr />
                  <Link to="register" className="btn btn-lg btn-info mr-2">
                    Sign Up
                  </Link>
                  <Link to="login" className="btn btn-lg btn-light">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
