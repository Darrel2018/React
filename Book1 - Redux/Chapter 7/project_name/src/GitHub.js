import React, { Component } from 'react';
import axios from 'axios'; // npm install axios
import { ClimbingBoxLoader } from "react-spinners";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, Button } from 'react-bootstrap';

class GitHub extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchTerm: '',
            isLoading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            isLoading: true
        });

        this.getGitHubData(this.state.searchTerm);
    }

    handleChange(e) {
        this.setState({ searchTerm: e.target.value });
    }

    async getGitHubData(_searchTerm) {
        try {
            const res = await axios.get(`https://api.github.com/search/users?q=${_searchTerm}`);

            this.setState({
                data: res.data.items,
                isLoading: false,
            });

            // console.log(res.data.items);
        } catch (err) {
            console.error(err);
        }
    }

    render() {

        const listUsers = this.state.data.map((user) => (
            <Col key={user.id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                    <a href={user.html_url}>
                        <Card.Img src={user.avatar_url} alt="Generic placeholder" />
                    </a>
                    <Card.Body>
                        <h5>Login: {user.login}</h5>
                        <p>Id: {user.id}</p>
                    </Card.Body>
                </Card>
            </Col>
        ));

        return (
            <div>
                <Form inline onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formInlineName">
                        <Form.Control
                            type="text"
                            value={this.state.searchTerm}
                            placeholder="Enter Search Term"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    {' '}
                    <Button type="submit">
                        Search
                    </Button>
                </Form>

                <h3>GitHub Users Results</h3>
                {this.state.isLoading && <ClimbingBoxLoader />}
                <Row>{listUsers}</Row>
            </div>
        );
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.getGitHubData('greg');
    //     }, 2000); // 2 seconds
    // }
}

export default GitHub;

// **Summary of the Code**

// This code defines a **React class component** called `GitHub` that allows users to **search for GitHub users** using the **GitHub API**. It fetches data from the API, displays results in cards, and shows a loading spinner while the request is in progress.

// ---

// ## Key Points

// ### 1. Imports

// The component imports several libraries and UI components:

// * **React** – for creating the component.
// * **axios** – used to make HTTP requests to the GitHub API.
// * **ClimbingBoxLoader** (from `react-spinners`) – displays a loading animation while data is being fetched.
// * **React Bootstrap components**:

//   * `Card` – used to display user information.
//   * `Row` and `Col` – used to create a responsive grid layout.
//   * `Form` and `Button` – used to build the search form.

// ---

// ### 2. Component State

// The constructor initializes the component state:

// ```javascript
// this.state = {
//   data: [],
//   searchTerm: '',
//   isLoading: false
// };
// ```

// * **data** – stores the list of GitHub users returned from the API.
// * **searchTerm** – stores the text entered in the search field.
// * **isLoading** – controls whether the loading spinner should appear.

// The event handler methods are also bound to the component:

// * `handleChange`
// * `handleSubmit`

// ---

// ### 3. Handling User Input

// #### handleChange()

// ```javascript
// handleChange(e) {
//   this.setState({ searchTerm: e.target.value });
// }
// ```

// * Updates the `searchTerm` state whenever the user types in the input field.

// ---

// ### 4. Handling Form Submission

// #### handleSubmit()

// ```javascript
// handleSubmit(e)
// ```

// * Prevents the default form submission behavior.
// * Sets `isLoading` to **true** to display the loading spinner.
// * Calls `getGitHubData()` using the entered search term.

// ---

// ### 5. Fetching Data from GitHub API

// #### getGitHubData()

// This is an **asynchronous function** that retrieves user data from GitHub.

// ```javascript
// const res = await axios.get(
//   `https://api.github.com/search/users?q=${_searchTerm}`
// );
// ```

// Steps:

// 1. Sends a request to the **GitHub Search Users API**.
// 2. Retrieves the search results.
// 3. Updates the component state:

//    * `data` becomes the list of users (`res.data.items`).
//    * `isLoading` becomes `false`.

// Errors are caught and logged using `console.error()`.

// ---

// ### 6. Displaying Search Results

// The code uses `map()` to transform each GitHub user into a **Bootstrap Card**:

// Each card displays:

// * User **avatar image**
// * User **login name**
// * User **ID**
// * A clickable link to the user’s **GitHub profile**

// The cards are placed in a **responsive grid layout** using `Row` and `Col`.

// ---

// ### 7. Rendering the UI

// The `render()` method displays:

// 1. **Search Form**

//    * Text input for entering a search term
//    * A **Search button**

// 2. **Loading Indicator**

//    ```jsx
//    {this.state.isLoading && <ClimbingBoxLoader />}
//    ```

//    Shows a spinner while data is being fetched.

// 3. **Search Results**

//    * The list of GitHub user cards inside a `Row`.

// ---

// ### 8. Optional Lifecycle Method (Commented Out)

// ```javascript
// componentDidMount()
// ```

// If enabled, this would automatically fetch GitHub users (e.g., searching for `"greg"`) **2 seconds after the component mounts**.

// ---

//  **Overall:**
// The `GitHub` component provides a **GitHub user search interface**. It allows users to enter a search term, sends a request to the GitHub API using **axios**, shows a loading spinner while fetching data, and displays the results as **responsive Bootstrap cards** containing user profile information.
