import React from "react";
import { useReducer, useState } from "react";
import { ProjectList } from "./ProjectList"
const initialState = {
  name: "",
  tech_stack: "Male",
  assigned_to: "FrontEnd Developer",
  status: false,
};

//should have the cases "name", "gender", "role", "maritalStatus", and "reset" along with the default cases
const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "tech_stack":
      return { ...state, gender: action.payload };
    case "assigned_to":
      return { ...state, role: action.payload };
    case "status":
      return { ...state, maritalStatus: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }

};

export const AddProject = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [submittedData, setSubmittedData] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, state])

    console.log(submittedData)
  }
  return (
    <div>
      <h1>Add Project</h1>
      <div className="form-wrapper" data-testid="form-wrapper">
        <form data-testid="form-element">
          <div className="name-wrapper" data-testid="name-wrapper">
            <label>Project Name</label>
            {/* Add Input box here */}
            <input type="text" name="name" value={state.name} placeholder="Name" onChange={(e) => dispatch({ type: "name", payload: e.target.value })} />
          </div>
          <div className="tech-stack-wrapper" data-testid="tech-stack-wrapper">
            <label>Tech Stack</label>
            {/* Provide select tag with name attribute `name="tech_stack"` */}
            {/* This Select Tag will have `data-testid="tech-stack-select` */}
            <select type="tech_stack" data-testid="tech-stack-select" value={state.tech_stack} name="tech_stack" onChange={(e) => dispatch({ type: "tech_stack", payload: e.target.value })} >

              <option value="Java">Java</option>
              <option value="JavaSrcipt">JavaSrcipt</option>
              <option value="Prefer Not to Say">Prefer Not to Say</option>
            </select>

          </div>
          <div
            className="assigned-to-wrapper"
            data-testid="assigned-to-wrapper"
          >
            <label>Assignmed to</label>
            {/* Provide select tag with name attribute `name="assigned_to"` */}
            {/* This Select Tag will have `data-testid="assigned-to-select` */}
            <select name="assigned_to" data-testid="assigned-to-select" value={state.assigned_to} type="assigned_to" onChange={(e) => dispatch({ type: "role", payload: e.target.value })} >
              <option value="FrontEnd Developer">FrontEnd Developer</option>
              <option value="BackEnd Developer">BackEnd Developer</option>
              <option value="FullStack Developer">FullStack Developer</option>
            </select>
          </div>
          <div
            className="current-status-wrapper"
            data-testid="current-status-wrapper"
          >
            <label>Current Status</label>
            {/* Provide checkbox  with name attribute `name="status"` */}
            <input type={"checkbox"} name="status" value={state.status} onChange={(e) => dispatch({ type: "status", payload: e.target.value })} />
          </div>
          <div>
            <button type="submit" onClick={handleSubmit}>SUBMIT</button>
          </div>
        </form>
      </div>
      <h1>Project List</h1>
      {/* Show the project list here using `ProjectList` component */}
      <ProjectList
        data={submittedData} />
    </div>
  );
};

export { initialState, reducer };
