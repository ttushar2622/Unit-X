import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../Redux/action";


// get all the todos from the redux store, and map them inside this component
const TodoList = () => {
  const dispatch=useDispatch()
  const tododata=useSelector((store)=>store.todos)
  console.log(tododata)
  useEffect(()=>{
    dispatch(getTodos)
  },[])
  return (
    <div data-testid='todo-list-wrapper'>

      {/* map all the "individual/single" todo inside this div. */}
      {tododata.length>0 && tododata.map((item)=>{
        return(
          <div data-testid="single-todo" key={item.id} >
          {item.title}-- {item.status ? "pending" :"completed"} {" "}
          </div>
        )
      })}
    </div>
  );
};

export default TodoList;
