import React, { useContext, useState, useEffect } from 'react';
import { TodosContext } from './App';
import { Button, Table, Form } from 'react-bootstrap';
import useAPI from './useAPI';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function ToDoList() {
    // receive state and dispatch from index.js
    const { state, dispatch } = useContext(TodosContext);
    const [todoText, setTodoText] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editTodo, setEditTodo] = useState(null);
    const buttonTitle = editMode ? "Edit" : "Add";

    const endpoint = "http://localhost:4000/todos/";
    const savedTodos = useAPI(endpoint);

    useEffect(() => {
        dispatch({ type: "get", payload: savedTodos })
    }, [savedTodos]) // dispatch whoever savedTodos changes

    const handleSubmit = async event => {
        event.preventDefault();

        if (editMode) {
            await axios.patch(endpoint+editTodo.id,{text:todoText})
            dispatch({ type: 'edit', payload: { ...editTodo, text: todoText } });
            setEditMode(false);
            setEditTodo(null);
        }
        else {
            const newToDo = { id: uuidv4(), text: todoText }
            const response = await axios.post(endpoint, newToDo)
            console.log("Handle Submit Response: ", response)
            dispatch({ type: 'add', payload: response.data })
        }

        setTodoText("") // to clear field after adding
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="Enter To Do"
                        value={todoText}
                        onChange={event => setTodoText(event.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {buttonTitle}
                </Button>
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>To Do</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {state.todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.text}</td>
                            <td onClick={() => {
                                setTodoText(todo.text)
                                setEditMode(true)
                                setEditTodo(todo)
                            }}>
                                <Button variant='secondary'>
                                    Edit
                                </Button>
                            </td>
                            <td onClick={async () => {
                                await axios.delete(endpoint + todo.id)
                                dispatch({ type: 'delete', payload: todo })
                            }}>
                                <Button variant='danger'>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ToDoList;

// ### 📌 Overview

// This component renders and manages the **UI for a to-do list**, handling user input, displaying todos, and interacting with both:

// * A global state (via Context + reducer)
// * A backend API (via Axios)

// ---

// ### 🧠 State & Context

// * Uses `useContext` to access:

//   * `state.todos` → the list of todos
//   * `dispatch` → to update global state

// * Local state:

//   * `todoText` → input field value
//   * `editMode` → toggles between add/edit modes
//   * `editTodo` → stores the todo being edited

// * Button label changes dynamically:

//   ```js
//   const buttonTitle = editMode ? "Edit" : "Add";
//   ```

// ---

// ### 🌐 Data Fetching

// * Uses a custom hook `useAPI(endpoint)` to fetch todos from:

//   ```
//   http://localhost:4000/todos/
//   ```
// * `useEffect` watches `savedTodos`:

//   * Whenever data updates, it dispatches:

//     ```js
//     { type: "get", payload: savedTodos }
//     ```
//   * This syncs backend data with global state

// ---

// ### ✍️ Form Handling (`handleSubmit`)

// Handles both **adding** and **editing**:

// #### ➕ Add Mode

// * Creates a new todo with a unique ID (`uuidv4`)
// * Sends POST request via Axios
// * Dispatches:

//   ```js
//   { type: 'add', payload: response.data }
//   ```

// #### ✏️ Edit Mode

// * Sends PATCH request to update the todo
// * Dispatches:

//   ```js
//   { type: 'edit', payload: updatedTodo }
//   ```
// * Resets edit state

// #### 🧹 শেষে

// * Clears the input field after submission

// ---

// ### 📋 Rendering the UI

// #### 🧾 Form

// * Input field bound to `todoText`
// * Submit button toggles between **Add / Edit**

// #### 📊 Table

// Displays all todos:

// * **To Do column** → shows text
// * **Edit button**:

//   * Loads selected todo into input
//   * Enables edit mode
// * **Delete button**:

//   * Sends DELETE request
//   * Dispatches:

//     ```js
//     { type: 'delete', payload: todo }
//     ```

// ---

// ### 🔄 Data Flow

// 1. Fetch todos → `useAPI`
// 2. Sync to global state → `dispatch(get)`
// 3. User actions (add/edit/delete):

//    * Update backend via Axios
//    * Update frontend via `dispatch`

// ---

// ### ✅ Key Idea

// This component acts as the **bridge between UI, global state, and backend**, demonstrating:

// * Controlled forms in React
// * Context + reducer integration
// * CRUD operations with an API
// * Conditional UI behavior (add vs edit)
