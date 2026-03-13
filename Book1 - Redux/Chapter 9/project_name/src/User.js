import React, { Component } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { Table, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showDeleteDialog: false,
            selectedUser: {}
        };

        this.delete = this.delete.bind(this);
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    }

    openDeleteDialog(user) {
        this.setState({
            showDeleteDialog: true,
            selectedUser: user
        });
    }

    closeDeleteDialog() {
        this.setState({
            showDeleteDialog: false,
            selectedUser: {}
        });
    }

    delete(e) {
        const db = getDatabase();
        remove(ref(db, "/" + this.state.selectedUser.id))
            .then((x) => {
                console.log("SUCCESS");
                this.closeDeleteDialog();
            })
            .catch((error) => {
                alert("Could not delete the user.");
                console.log("ERROR", error);
            });
    }

    componentDidMount() {
        const db = getDatabase();
        const dbRef = ref(db, "/");

        onValue(dbRef, (snapshot) => {
            console.log(snapshot.val());

            const data = snapshot.val();
            const usersArray = Object.entries(data).map(([id, value]) => ({
                ...value,
                id: id,  // explicitly attach the firebase key as the id
            }));

            this.setState({ users: usersArray });
        });
    }

    render() {
        const listUsers = this.state.users.map((user) =>
            <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <Link to={`/edit/${user.id}`}>
                        Edit
                    </Link>
                </td>
                <td>
                    <Button
                        onClick={this.openDeleteDialog.bind(this, user)}>Remove
                    </Button>
                </td>
            </tr>
        );

        return (
            <div>
                <Link to="/add">
                    <Button variant="primary">Add</Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers}
                    </tbody>
                </Table>

                <Modal show={this.state.showDeleteDialog} onHide={this.closeDeleteDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete: {" "}
                            {this.state.selectedUser.username}?</p>
                        <hr />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.delete}>Delete</Button>
                        <Button onClick={this.closeDeleteDialog}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default User;


// ### Summary of the Code

// This code defines a **React class component** called **`User`** that displays a list of users stored in **Firebase Realtime Database**. It allows users to **view, add, edit, and delete user records** through a table interface using **React Bootstrap components**.

// #### Key Features

// 1. **State Management**

//    * The component maintains three pieces of state:

//      * `users` – an array containing all user records.
//      * `showDeleteDialog` – controls whether the delete confirmation modal is visible.
//      * `selectedUser` – stores the user currently selected for deletion.

// 2. **Fetching Users from Firebase**

//    * In `componentDidMount`, the component connects to **Firebase Realtime Database**.
//    * It listens for changes using `onValue`, which retrieves all user data from the root path.
//    * The returned object is converted into an array using `Object.entries`, and each user is given its Firebase key as an `id`.

// 3. **Displaying Users**

//    * The users are displayed in a **React Bootstrap table**.
//    * Each row shows:

//      * Username
//      * Email
//      * An **Edit** link
//      * A **Remove** button

// 4. **Editing Users**

//    * The **Edit** link uses **React Router’s `Link` component** to navigate to `/edit/{user.id}`.
//    * This route is used to load a form where the selected user can be edited.

// 5. **Deleting Users**

//    * Clicking the **Remove** button opens a **confirmation modal**.
//    * If the user confirms deletion:

//      * The `delete` method removes the user from Firebase using the `remove` function.
//      * After deletion, the modal closes.

// 6. **Delete Confirmation Modal**

//    * A **React Bootstrap Modal** is used to confirm the deletion action.
//    * It displays the selected user's username and provides **Delete** and **Close** options.

// 7. **Adding Users**

//    * An **Add button** at the top navigates to `/add`, allowing users to create a new user.

//  **Overall:**
// This component acts as a **user management interface**, displaying users from Firebase in a table and providing functionality to **add, edit, and delete users**, with a confirmation modal to prevent accidental deletions.
