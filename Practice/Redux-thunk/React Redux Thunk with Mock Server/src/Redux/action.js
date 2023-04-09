//action creator functions here

import axios from "axios"
import { ADD_TODOS_ERROR, ADD_TODOS_REQUEST, ADD_TODOS_SUCCESS, GET_TODOS_ERROR, GET_TODOS_REQUEST, GET_TODOS_SUCCESS } from "./actionTypes"

export const todoRequestAction=()=>{
    return {type:GET_TODOS_REQUEST}
}

export const todoSuccesstAction=(payload)=>{
    return {type:GET_TODOS_SUCCESS,payload}
}

export const todoRequestError=()=>{
    return {type:GET_TODOS_ERROR}
}

export const postRequestAction=()=>{
    return {type:ADD_TODOS_REQUEST}
}

export const postTpdosSuccess=(payload)=>{
    return {type:ADD_TODOS_SUCCESS,payload}
}

export const postTodosError=()=>{
    return {type:ADD_TODOS_ERROR}
}


export const getTodos=(dispatch)=>{
    dispatch(todoRequestAction());
    axios.get(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/todos`).then((res)=>{
        dispatch(todoSuccesstAction(res.data))
    }).catch((err)=>{
        dispatch(todoRequestError())
    })
}


export const AddTodos=(title)=>(dispatch)=>{
    const newTodo={
        title,
        status:false,
    };
    dispatch(postRequestAction());
     return axios.post(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/todos`,newTodo).then((res)=>{
        dispatch(postTpdosSuccess())
    }).catch((err)=>{
        dispatch(postTodosError())
    })
}