import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteEducation } from "../../redux/action/profile";
import moment from "moment";
export const Education = ({ education }) => {
  const dispatch = useDispatch();
  const deleteEdu = (id) => {
    dispatch(deleteEducation(id));
  };

  return (
    <div>
      <h4 className="mb-2">Education Centennials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>

        {education?.map((edu, index) => (
          <tr key={index}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
              {moment(edu?.from).format("YYYY/MMM/DD")} ---
              {edu?.to ? moment(edu.to).format("YYYY/MMM/DD") : " Present"}
            </td>

            <td className="btn btn-danger" onClick={() => deleteEdu(edu._id)}>
              Delete
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
