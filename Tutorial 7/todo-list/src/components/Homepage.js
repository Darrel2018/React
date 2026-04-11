import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./Homepage.css"
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';

function Homepage() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState("");
    const [disableButton, setDisableButton] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(user => {

            if (user) {
                onValue(ref(db, `/${auth.currentUser.uid}/`), snapshot => {
                    setTodos([]);
                    const data = snapshot.val();

                    if (data !== null) {
                        Object.values(data).map(todo => {
                            setTodos((oldArray) => [...oldArray, todo]);
                        });
                    }
                })
            }
            else if (!user) {
                navigate("/");
            }
        })
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch(error => { alert(error.message); });
    }

    // read


    // add
    const writeToDatabase = async () => {
        const uidd = uid();

        setDisableButton(true);

        await set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            uidd: uidd,
        });

        setTodo("");
        setDisableButton(false);
    }

    // update
    const handleUpdate = async (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
    }

    const handleEditConfirm = async () => {
        setDisableButton(true);
        await update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
            todo: todo,
            tempUidd: tempUidd,
        });

        setIsEdit(false);
        setTodo("");
        setTempUidd("");
        setDisableButton(false);
    }

    // delete
    const handleDelete = async (uid) => {
        setDisableButton(true);
        await remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
        setDisableButton(false);
    }

    return (
        <div className="homepage">
            <input
                className="add-edit-input"
                type="text"
                placeholder="Add Todo..."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />

            {
                todos.map((todo) => (
                    <div className="todo">
                        <h1>{todo.todo}</h1>
                        <Tooltip title="Edit Todo">
                            <EditIcon onClick={() => handleUpdate(todo)} disabled={disableButton} className="update-button" />
                        </Tooltip>
                        
                        <Tooltip title="Delete Todo">
                            <DeleteIcon onClick={() => handleDelete(todo.uidd)} disabled={disableButton} className="delete-button" />
                        </Tooltip>
                    </div>
                ))
            }

            {!isEdit ? (
                <div>
                    <Tooltip title="Add Todo">
                        <AddIcon className="add-icon" onClick={writeToDatabase} disabled={disableButton} />
                    </Tooltip>
                </div>
            ) : (
                <div>
                    <Tooltip title="Confirm Changes">
                        <CheckIcon className="update-icon" onClick={handleEditConfirm}
                        disabled={disableButton} />
                    </Tooltip>
                    
                </div>
            )}
            <Tooltip title="Sign Out">
                <LogoutIcon onClick={handleSignOut}
                    disabled={disableButton} className="sign-out" />
            </Tooltip>

        </div>
    );
}

export default Homepage;