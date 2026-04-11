// EXAMPLE 1: Using a class component.
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';

// class App extends React.Component {
//   state = { requested: '' };

//   render() {

//     return (
//       <div>
//         <Button variant="link" onClick={() => this.setState({
//           requested: 'https://jsonplaceholder.typicode.com/posts'
//         })}>
//           Posts
//         </Button>
//         <Button variant="link" onClick={() => this.setState({
//           requested: 'https://jsonplaceholder.typicode.com/todos'
//         })}>
//           Todos
//         </Button>
//         <br />
//         Requested: {this.state.requested}
//       </div>
//     )
//   }
// }

// export default App;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import useFetch from './useFetch'
import Users from './Users'


const App = () => {
  const postsUrl = "https://jsonplaceholder.typicode.com/posts";
  const todosUrl = "https://jsonplaceholder.typicode.com/todos";
  const [requested, setRequested] = useState(postsUrl);
  const data = useFetch(requested);

  return (
    <div>
      <h1>Users</h1>
      <Users />
      <hr></hr>
      <Button variant="link" onClick={() => setRequested(postsUrl)}>
        Posts
      </Button>
      <Button variant="link" onClick={() => setRequested(todosUrl)}>
        Todos
      </Button>
      <br />
      Requested: {requested}
      <ul>
        {data.map(el => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App;

// This React component (App) is a simple data-fetching UI that lets the user switch between two API endpoints and display their results.

// Key points:
// Imports & setup
// Uses React with the useState hook.
// Imports Bootstrap styles and a Button component for UI.
// Uses a custom hook useFetch to retrieve data.
// Includes a Users component (likely renders user-related info).
// State management
// Defines two API URLs:
// postsUrl (for posts)
// todosUrl (for todos)
// Maintains a state variable requested to track which URL is currently selected.
// Default is set to postsUrl.
// Data fetching
// Calls useFetch(requested) to fetch data from the currently selected URL.
// The returned data is expected to be an array.
// UI rendering
// Displays a heading and the Users component.
// Provides two buttons:
// Posts → sets requested to the posts API
// Todos → sets requested to the todos API
// Shows the currently requested URL.
// Renders a list of items from data, displaying each item's title.
// Overall behavior:

// The component lets users toggle between viewing posts and todos fetched from an external API. When a button is clicked, the state updates, triggering a new fetch and re-rendering the list.
