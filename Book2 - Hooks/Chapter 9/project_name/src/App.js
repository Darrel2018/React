import React, { useReducer } from 'react';
import ToDoList from './ToDoList'
import { v4 as uuidv4 } from 'uuid';

// TO RUN JSON SERVER: npx json-server todos.json --port 4000

const todosInitialState = {
  todos: []
};

function todosReducer(state, action) {
  switch (action.type) {
    case 'get':
      return { ...state, todos: action.payload }
    case 'add':
      // add new todo onto array
      const addedToDos = [...state.todos, action.payload]
      // spread our state and assign todos
      return { ...state, todos: addedToDos }
    case 'edit':
      const updatedToDo = { ...action.payload }
      const updatedToDoIndex = state.todos.findIndex(t => t.id ===
        action.payload.id)
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1)
      ];
      return { ...state, todos: updatedToDos }
    case 'delete':
      const filteredTodoState = state.todos.filter(todo => todo.id !==
        action.payload.id)
      return { ...state, todos: filteredTodoState }
    default:
      return todosInitialState
  }
};

export const TodosContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDoList />
    </TodosContext.Provider>
  )
}

export default App;

// ### 📌 Overview

// This code defines a simple **to-do list application state manager** using React’s `useReducer` hook and Context API. It centralizes all todo-related logic (fetching, adding, editing, deleting) in a reducer and makes it accessible across components.

// ---

// ### 🧠 State Management

// * The app uses `useReducer` instead of `useState` for more structured state updates.
// * Initial state:

//   ```js
//   { todos: [] }
//   ```
// * The state holds a list of todo items.

// ---

// ### ⚙️ Reducer Function (`todosReducer`)

// Handles different actions to update the todo list:

// * **`get`** → Replaces the current todos with fetched data.
// * **`add`** → Adds a new todo to the list.
// * **`edit`** → Updates an existing todo by:

//   * Finding it by `id`
//   * Replacing it in the array (immutably)
// * **`delete`** → Removes a todo by filtering it out.
// * **default** → Resets to the initial state.

// ---

// ### 🌐 Context API

// * Creates a `TodosContext` to share state and dispatch globally.
// * This avoids prop drilling (passing props through many layers).

// ---

// ### 🧩 App Component

// * Initializes reducer:

//   ```js
//   const [state, dispatch] = useReducer(todosReducer, todosInitialState);
//   ```
// * Wraps the app in a `TodosContext.Provider`:

//   * Provides both `state` and `dispatch` to child components.
// * Renders the `ToDoList` component, which likely consumes this context.

// ---

// ### 🔧 Additional Notes

// * Uses `uuid` (`uuidv4`) to generate unique IDs for todos (though not shown in use here).
// * Comment shows how to run a local JSON server for backend simulation:

//   ```bash
//   npx json-server todos.json --port 4000
//   ```

// ---

// ### ✅ Key Idea

// This code demonstrates a **clean, scalable pattern** for managing shared state in React using:

// * `useReducer` for predictable updates
// * Context API for global access
