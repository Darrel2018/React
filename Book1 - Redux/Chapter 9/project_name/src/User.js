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