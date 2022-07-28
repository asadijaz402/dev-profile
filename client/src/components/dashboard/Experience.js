import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteExperience } from "../../redux/action/profile";
import moment from "moment";
export const Experience = ({ experience }) => {
  const dispatch = useDispatch();
  const deleteExp = (id) => {
    dispatch(deleteExperience(id));
  };

  return (
    <div>
      <h4 className="mb-2">Experience Centennials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>

        {experience.map((exp, index) => (
          <tr key={index}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
              {moment(exp?.from).format("YYYY/MMM/DD")} ---
              {exp?.to ? moment(exp.to).format("YYYY/MMM/DD") : " Present"}
            </td>

            <td className="btn btn-danger" onClick={() => deleteExp(exp._id)}>
              Delete
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
