import React from "react";
import { ProjectRow } from "./ProjectRow";

export const ProjectList = ({ data }) => {
  console.log(data)
  return (
    <div className="project-list-wrapper">

      {/* Add table head  */}
      {/* Map through the list and use `ProjectRow` Component  */}

      {data.length > 0 ? (
        <table data-testid="project-container">
          <thead>
            <tr>
              <th>S.No</th>
              <th>User</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Marital Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <ProjectRow {...user} id={index + 1} />
              </tr>
            ))
            }
          </tbody>
        </table>
      ) : (
        <h2 data-testid="no-user-container">no users found</h2>
      )}

    </div>
  );
};
