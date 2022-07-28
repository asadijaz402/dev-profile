import React from "react";
import moment from "moment";

export const ProfileCreds = ({ experience, education }) => {
  return (
    <div class="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        <ul className="list-group">
          {education?.length < 1 ? (
            <p className="text-center">No Experience Listed</p>
          ) : (
            experience?.map((exp, index) => (
              <li className="list-group-item" key={index}>
                <h4>{exp?.company}</h4>
                <p>
                  {" "}
                  {moment(exp?.from).format("YYYY/MMM/DD")} -
                  {exp?.to ? moment(exp.to).format("YYYY/MMM/DD") : " Present"}
                </p>
                <p>
                  <strong>Position:</strong> {exp?.title}
                </p>
                {exp?.location && (
                  <p>
                    <strong>Location:</strong> {exp?.location}
                  </p>
                )}
                {exp?.description && (
                  <p>
                    <strong>Description:</strong>
                    {exp?.description}
                  </p>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        <ul className="list-group">
          {education?.length < 1 ? (
            <p className="text-center">No Education Listed</p>
          ) : (
            education?.map((edu, index) => (
              <li key={index} className="list-group-item">
                <h4>{edu?.school}</h4>
                <p>
                  {" "}
                  {moment(edu?.from).format("YYYY/MMM/DD")} -
                  {edu?.to ? moment(edu.to).format("YYYY/MMM/DD") : " Present"}
                </p>
                <p>
                  <strong>Degree: </strong>
                  {edu?.degree}
                </p>
                <p>
                  <strong>Field Of Study: </strong>
                  {edu?.fieldofstudy}
                </p>
                {edu?.description && (
                  <p>
                    <strong>Description:</strong>
                    {edu?.description}
                  </p>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
