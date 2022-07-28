import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const ProfileGithub = ({ githubusername }) => {
  const [data, setData] = useState([]);

  const [detail, setDetail] = useState({
    clientId: "ac91294675aa01af6608",
    clientSecret: "3494353d8e08c83c3675b0e028da3308108b5a20",
    count: 5,
    sort: "created asc",
    repos: [],
  });
  useEffect(() => {
    fetch(
      `https://api.github.com/users/${githubusername}/repos?pre_page=${detail?.count}&shot=${detail?.sort}&client_id=${detail.clientId}&client_secret=${detail.clientSecret}`
    )
      .then((res) => res.json())
      .then((repo) => setData(repo))
      .catch((err) => console.log(err));
  }, []);


  return (
    <div>
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {data.length > 0 &&
        data?.map((item, index) => (
          <div key={item?.id} className="card card-body mb-2">
            <div className="row">
              <div className="col-md-6">
                <h4>
                  <a
                    href={item?.html_url}
                    className="text-info"
                    target="_blank"
                  >
                    {item?.name}
                  </a>
                </h4>
                <p>{item?.description}</p>
              </div>
              
              <div className="col-md-6">
                <span className="badge bg-info m-1">
              
                  Stars: {item?.stargazers_count}
                </span>
                <span className="badge  bg-secondary m-1">
                  Watchers: {item?.watchers_count}
                </span>
                <span className="badge bg-success">
                  Forks: {item?.forks_count}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
