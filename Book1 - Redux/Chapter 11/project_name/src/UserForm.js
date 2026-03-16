// import React, { Component } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';

// class UserForm extends Component {

//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Any place in your app!</h1>
//                 <Formik
//                     initialValues={{ email: '', password: '' }}

//                     validate={values => {
//                         let errors = {};
//                         if (!values.email) {
//                             errors.email = 'Required';
//                         } else if (
//                             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//                         ) {
//                             errors.email = 'Invalid email address';
//                         }
//                         else if (values.email.length < 10) {
//                             errors.email = 'Email address too short';
//                         }
//                         if (!values.password) {
//                             errors.password = 'Required';
//                         }
//                         else if (values.password.length < 8) {
//                             errors.password = 'Password too short';
//                         }
//                         return errors;
//                     }}

//                     onSubmit={(values, { setSubmitting }) => {
//                         setTimeout(() => {
//                             alert(JSON.stringify(values, null, 2));
//                             setSubmitting(false);
//                         }, 400);
//                     }}
//                 >
//                     {({ isSubmitting }) => (
//                         <Form>
//                             <Field type="email" name="email" />
//                             <span style={{ color: "red", fontWeight: "bold" }}>
//                                 <ErrorMessage name="email" component="div" />
//                             </span>
//                             <Field type="password" name="password" />
//                             <span style={{ color: "red", fontWeight: "bold" }}>
//                                 <ErrorMessage name="password" component="div" />
//                             </span>

//                             <button type="submit" disabled={isSubmitting}>
//                                 Submit
//                             </button>
//                         </Form>
//                     )}
//                 </Formik>
//             </div >
//         )
//     }
// }
// export default UserForm;

//--------------------------------------------------------------
//--------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getDatabase, ref, push, update, get } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";

function UserForm() {
    const navigate = useNavigate();
    const { id } = useParams(); // replaces this.props.match.params.id
    const title = id ? "Edit User" : "New User"; // replaces the if(this.id) logic

    const [initialValues, setInitialValues] = useState({
        username: "",
        email: "",
    });

    // replaces componentDidMount
    useEffect(() => {
        if (id) {
            const db = getDatabase();
            const dbRef = ref(db, "/" + id);

            get(dbRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setInitialValues({
                        username: snapshot.val().username,
                        email: snapshot.val().email,
                    });
                }
            });
        }
    }, [id]);

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validate={(values) => {
                    let errors = {};
                    if (!values.email) {
                        errors.email = "Required";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = "Invalid email address";
                    } else if (values.email.length < 10) {
                        errors.email = "Email address too short";
                    }

                    if (!values.username) {
                        errors.username = "Required";
                    } else if (values.username.length < 3) {
                        errors.username = "username too short";
                    }

                    return errors;
                }}

                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        const db = getDatabase();

                        if (id) {
                            const dbRef = ref(db, "/" + id);
                            update(dbRef, {
                                username: values.username,
                                email: values.email,
                            }).then(() => {
                                navigate("/");
                                setSubmitting(false);
                            });
                        } else {
                            const dbRef = ref(db, "/");
                            push(dbRef, {
                                username: values.username,
                                email: values.email,
                            }).then(() => {
                                navigate("/");
                                setSubmitting(false);
                            });
                        }
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <h1>{title}</h1>
                        <br></br>
                        <Field type="email" name="email" placeholder="email" />
                        <span style={{ color: "red", fontWeight: "bold" }}>
                            <ErrorMessage name="email" component="div" />
                        </span>
                        <Field type="text" name="username" placeholder="username" />
                        <span style={{ color: "red", fontWeight: "bold" }}>
                            <ErrorMessage name="username" component="div" />
                        </span>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default UserForm;



// ### Summary of the Code

// This code defines a **React functional component** called **`UserForm`** that allows users to **create a new user or edit an existing user**. It uses **Formik for form handling**, **Firebase Realtime Database for data storage**, and **React Router for navigation and route parameters**.

// #### Key Features

// 1. **Form Initialization**

//    * The component uses `useState` to store the initial form values (`username` and `email`).
//    * If an **ID is present in the URL**, the form is used to **edit an existing user**; otherwise, it creates a **new user**.

// 2. **Fetching Existing User Data**

//    * `useEffect` runs when the component loads or when the `id` changes.
//    * If an `id` exists, it retrieves the user’s data from **Firebase Realtime Database** and populates the form fields with the retrieved values.

// 3. **Form Handling with Formik**

//    * `Formik` manages the form state, validation, and submission.
//    * `enableReinitialize` ensures the form updates when the fetched data changes.

// 4. **Form Validation**

//    * The `validate` function checks:

//      * **Email**

//        * Must exist
//        * Must match a valid email format
//        * Must be at least 10 characters long
//      * **Username**

//        * Must exist
//        * Must be at least 3 characters long
//    * Error messages are displayed using `ErrorMessage`.

// 5. **Submitting the Form**

//    * When the form is submitted:

//      * If an **ID exists**, the user data is **updated** in Firebase.
//      * If no ID exists, a **new user record is created** using `push`.
//    * After the operation completes, the app **navigates back to the home page (`/`)**.

// 6. **User Interface**

//    * The form includes:

//      * An email input field
//      * A username input field
//      * Validation error messages
//      * A submit button that is disabled while submitting.

//  **Overall:**
// The component provides a **single reusable form for both creating and editing users**, handling validation, database interaction, and navigation using modern **React hooks and Formik**.

