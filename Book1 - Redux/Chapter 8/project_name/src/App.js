import React, { Component } from 'react';
import Products from "./Products";
import { Button } from 'react-bootstrap';
import Rating from "./Rating.js";
import JumboTronComponent from './JumboTronComponent';
import UserForm from "./UserForm";
import GitHub from './GitHub';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Hello from './Hello.js';
import GitHubUser from './GitHubUser';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default App;

class Header extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/github">GitHub</Nav.Link>
                <Nav.Link href="/hello">Hello</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Routes>
            <Route path="/github/user/:login/:id" element={<GitHubUser />} />
            <Route path="/github" element={<GitHub />} />
            <Route path="/hello" element={<Hello />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        Home
      </div>
    )
  }
}

class NotFound extends Component {
  render() {
    return <div>Not Found</div>
  }
}


// ### Overview

// This code defines the **main structure of a React application** using **React Router** for navigation and **React-Bootstrap** for UI components. It creates a navigation bar and several routes that render different components depending on the URL.

// ---

// ### Main Components

// #### 1. **App Component**

// * The root component of the application.
// * It simply renders the **Header component**, which contains the navigation and routing logic.

// ```jsx
// class App extends Component {
//   render() {
//     return (
//       <div>
//         <Header />
//       </div>
//     );
//   }
// }
// ```

// ---

// #### 2. **Header Component**

// * Handles **navigation and routing**.

// * Uses **BrowserRouter** from React Router to enable client-side routing.

// * Displays a **React-Bootstrap Navbar** with links:

//   * Home
//   * GitHub
//   * Hello

// * Defines routes using **Routes and Route**:

//   * `/` → Home component
//   * `/github` → GitHub component
//   * `/github/user/:login/:id` → GitHubUser component (dynamic parameters)
//   * `/hello` → Hello component
//   * `/*` → NotFound component (fallback for invalid routes)

// ---

// #### 3. **Home Component**

// * A simple component that displays the text **"Home"**.

// ---

// #### 4. **NotFound Component**

// * Displays **"Not Found"** when the user visits an undefined route.

// ---

// ### Key Technologies Used

// * **React** – for building the UI with components.
// * **React Router** – for client-side navigation.
// * **React-Bootstrap** – for styling and responsive UI components like Navbar.

// ---

// ### Routing Flow

// 1. The app loads and displays the **Navbar**.
// 2. When a user clicks a link:

//    * The URL changes without reloading the page.
//    * React Router renders the corresponding component.
// 3. If the URL doesn't match any route, the **NotFound** component is shown.

// ---

// ### Extra Notes

// * The app imports several additional components (`Products`, `Rating`, `UserForm`, `JumboTronComponent`), but they **are not used in this file**.
// * The route `/github/user/:login/:id` demonstrates **dynamic routing** where parameters (`login`, `id`) can be accessed in the `GitHubUser` component.

// ---

//  **In short:**
// This code sets up the **main layout and routing system of a React application**, including a navigation bar and multiple pages that render based on the URL.

