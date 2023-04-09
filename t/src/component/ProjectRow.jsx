import React from "react";

export const ProjectRow = ({ name, assigned_to, tech_stack, status, id }) => {
  return (
    <>
      <td data-testid="project-id">{id}</td>
      <td data-testid="project-name">{name}</td>
      <td data-testid="project-tech-stack">{tech_stack}</td>
      <td data-testid="project-assigned-to">{assigned_to}</td>
      <td data-testid="project-status">
        {status ? "false" : "true"}
      </td>
      <td>
        <button data-testid="toggle-button">Toggle</button>
      </td>
    </>
  );
};
