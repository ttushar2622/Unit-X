// Step 1: Set up the project

// Install dependencies (React, Redux, and additional libraries if needed)
// Use your preferred package manager (e.g., npm or yarn)

// Step 2: Create the Redux Store

// Import necessary Redux dependencies
import { createStore, combineReducers } from 'redux';

// Define action types
const ADD_TODO = 'ADD_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const SET_FILTER = 'SET_FILTER';
const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

// Define actions
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now(),
    text,
    completed: false
  }
});

const completeTodo = (id) => ({
  type: COMPLETE_TODO,
  payload: { id }
});

const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id }
});

const editTodo = (id, text) => ({
  type: EDIT_TODO,
  payload: {
    id,
    text
  }
});

const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: { filter }
});

const clearCompleted = () => ({
  type: CLEAR_COMPLETED
});

// Define reducers
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case COMPLETE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: true } : todo
      );
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload.id);
    case EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
    case CLEAR_COMPLETED:
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
};

const filterReducer = (state = 'all', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer
});

// Create the Redux store
const store = createStore(rootReducer);

// Step 3: Design the UI

// Import necessary React dependencies
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// TodoApp component (entry point)
const TodoApp = () => {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = () => {
    dispatch(addTodo(newTodoText));
    setNewTodoText('');
  };

  const handleCompleteTodo = (id) => {
    dispatch(completeTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (id, text) => {
    dispatch(editTodo(id, text));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  // Filter the todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    }
    return true; // 'all' filter or any other unknown filter
  });

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCompleteTodo(todo.id)}
            />
            <input
              type="text"
              value={todo.text}
              onChange={(e) => handleEditTodo(todo.id, e.target.value)}
            />
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <label>
          Show:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <button onClick={handleClearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
};

export default TodoApp;
