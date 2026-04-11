import { useState, useEffect } from 'react'
import axios from 'axios'

const useAPI = endpoint => {
    const [data, setData] = useState([]) // initial state empty array
    
    //To call data when component is mounted,
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await axios.get(endpoint)
        setData(response.data)
    }
    
    return data;
}

export default useAPI;

// ### 📌 Overview

// This code defines a **custom React hook (`useAPI`)** used to fetch data from an API endpoint and return it to any component that uses it.

// ---

// ### 🧠 State Management

// * Uses `useState` to store fetched data:

//   ```js
//   const [data, setData] = useState([]);
//   ```
// * Initializes with an empty array.

// ---

// ### 🔄 Data Fetching Logic

// * Uses `useEffect` to fetch data **once when the component mounts**:

//   ```js
//   useEffect(() => {
//       getData()
//   }, [])
//   ```

// * Calls an async function `getData`:

//   * Sends a GET request using Axios:

//     ```js
//     const response = await axios.get(endpoint)
//     ```
//   * Updates state with the response data:

//     ```js
//     setData(response.data)
//     ```

// ---

// ### 🔁 Reusability

// * The hook takes a dynamic `endpoint` parameter:

//   ```js
//   const useAPI = endpoint => { ... }
//   ```
// * This makes it reusable for **any API URL**, not just todos.

// ---

// ### 📤 Return Value

// * Returns the fetched data:

//   ```js
//   return data;
//   ```
// * Components using this hook will automatically re-render when data updates.

// ---

// ### ✅ Key Idea

// This hook abstracts API logic into a reusable function, allowing components to:

// * Stay clean and focused on UI
// * Avoid repeating fetch logic
// * Easily plug in different endpoints

// ---

// ### 🔗 How It Fits in the App

// In your to-do app:

// * `useAPI` fetches todos from the backend
// * The result is passed into global state via `dispatch`
// * Keeps data fetching separate from UI and state logic
