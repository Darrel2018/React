import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom"
import "./Welcome.css";
import TodoSVG from "../assets/undraw_unlock_m0yr.svg";

function Welcome() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [registerInformation, setRegisterInformation] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/homepage");
            }
        });
    });

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSighIn = () => {
        setDisableButton(true);
        signInWithEmailAndPassword(auth, email, password).then(() => {
            setDisableButton(false);
            navigate("/homepage");
        }).catch((err) => alert(err.message));
    }

    const handleRegister = async () => {
        setDisableButton(true);

        if(registerInformation.email !== registerInformation.confirmEmail) {
            alert("Please make sure that both emails are the same");
            return;
        }
        else if(registerInformation.password !== registerInformation.confirmPassword) {
            alert("Please make sure that both passwords are the same");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password);
            setDisableButton(false);
            navigate("/homepage");
        } catch(error) {
            alert(error.message);
            setDisableButton(false);
        }
    }

    return (
        <div className="welcome">
            <img src={TodoSVG} className="todo-svg"/>
            <h1>Todo List</h1>
            <div className="login-register-container">
                {isRegistering ? (
                    <>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={registerInformation.email} 
                            onChange={(e) => setRegisterInformation({...registerInformation, email: e.target.value})}/>
                        
                        <input 
                            type="email" 
                            placeholder="Confirm Email" 
                            value={registerInformation.confirmEmail}
                            onChange={(e) => setRegisterInformation({...registerInformation, confirmEmail: e.target.value})}/>
                        
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={registerInformation.password} 
                            onChange={(e) => setRegisterInformation({...registerInformation, password: e.target.value})}/>
                        
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={registerInformation.confirmPassword} 
                            onChange={(e) => setRegisterInformation({...registerInformation, confirmPassword: e.target.value})}/>

                        <button onClick={handleRegister} disabled={disableButton} className="register-button">Register</button>
                        <button onClick={() => setIsRegistering(false)} disabled={disableButton} className="go-back-button">Go Back</button>
                    </>
                ) : (
                    <>
                        <input type="email" onChange={handleEmailChange} value={email} placeholder="Email"/>
                        <input type="password" onChange={handlePasswordChange} value={password} placeholder="Password"/>
                        <button onClick={handleSighIn} disabled={disableButton} className="sign-in-button">Sign In</button>
                        <button onClick={() => setIsRegistering(true)} disabled={disableButton} className="create-account-button">Create an Account</button>
                    </>
                )}

            </div>
        </div>
    );
}

export default Welcome;