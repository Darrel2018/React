import React from 'react'
import useFetch from './useFetch'

const Users = () => {
    const users = useFetch("https://jsonplaceholder.typicode.com/users");
    
    return (
        <ul>
            {users.map(el => (//
                <li key={el.id}>{el.name}</li>
            ))}
        </ul>
    )
}

export default Users

// This `Users` component is a simple React component that fetches and displays a list of users.

// ### Key points:

// * **Imports & setup**

//   * Imports React.
//   * Uses a custom hook `useFetch` to retrieve data from an API.

// * **Data fetching**

//   * Calls `useFetch` with the URL `https://jsonplaceholder.typicode.com/users`.
//   * The returned `users` is expected to be an array of user objects.

// * **UI rendering**

//   * Renders an unordered list (`<ul>`).
//   * Iterates over the `users` array using `.map()`.
//   * For each user:

//     * Creates a list item (`<li>`).
//     * Uses `el.id` as the unique key.
//     * Displays the user’s `name`.

// ### Overall behavior:

// The component fetches a list of users from an external API and displays their names in a simple list.
