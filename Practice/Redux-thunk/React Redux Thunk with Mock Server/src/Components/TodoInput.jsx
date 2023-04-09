import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AddTodos, getTodos } from "../Redux/action";

//make a POST request (by dispatching the function), to save the data in db.json
//make a GET request (by dispatching the function), if the post request is successful, by chaining them together
const TodoInput = () => {
  const [text,setText]=useState("")
  const dispatch=useDispatch()
  
  console.log(text)
  const handleAdd=()=>{
    dispatch(AddTodos(text)).then(()=>{
      dispatch(getTodos)
    })
    setText("")
  }
  return (
    <div>
      <input
        data-testid="todo-input" type="text" value={text}
        onChange={(e)=>setText(e.target.value)}
      />
      <button data-testid="todo-add-btn" onClick={handleAdd} >Add Todo</button>
    </div>
  );
};

export default TodoInput;
