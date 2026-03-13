import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Any place in your app!</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}

                    validate={values => {
                        let errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        else if (values.email.length < 10) {
                            errors.email = 'Email address too short';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        else if (values.password.length < 8) {
                            errors.password = 'Password too short';
                        }
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="email" name="email" />
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                <ErrorMessage name="email" component="div" />
                            </span>
                            <Field type="password" name="password" />
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                <ErrorMessage name="password" component="div" />
                            </span>

                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div >
        )
    }
}
export default UserForm;

// **Summary of the Code**

// This code defines a **React class component** called `UserForm` that creates and manages a **form with validation** using the **Formik library**. The form collects a user’s **email** and **password**, validates the input, and displays error messages if the data is invalid.

// ---

// ### Key Points

// 1. **Imports**

//    * Imports `React` and `Component` from React.
//    * Imports `Formik`, `Form`, `Field`, and `ErrorMessage` from the **Formik** library to simplify form handling and validation.

// ---

// 2. **UserForm Component**

//    * `UserForm` is a **class-based React component**.
//    * It contains a constructor that calls `super(props)` but does not initialize any state.

// ---

// 3. **Formik Configuration**
//    The `<Formik>` component manages the form state and behavior.

//    * **initialValues**

//      ```javascript
//      { email: '', password: '' }
//      ```

//      Initializes the form fields with empty values.

//    * **validate function**

//      * Performs **custom validation** on the form inputs.
//      * Checks:

//        * If the **email field is empty** → returns `"Required"`.
//        * If the **email format is invalid** → returns `"Invalid email address"`.
//        * If the **email is too short (less than 10 characters)** → returns `"Email address too short"`.
//        * If the **password field is empty** → returns `"Required"`.
//        * If the **password is less than 8 characters** → returns `"Password too short"`.
//      * Any errors are stored in an `errors` object and returned to Formik.

// ---

// 4. **Form Submission**

//    * The `onSubmit` function is triggered when the form is submitted.
//    * It simulates a short delay using `setTimeout`.
//    * The form values are then displayed in an **alert box** in JSON format.
//    * `setSubmitting(false)` resets the submitting state.

// ---

// 5. **Form Fields**
//    Inside the `<Form>` component:

//    * `<Field>` components are used to create input fields for:

//      * **Email**
//      * **Password**

//    * `<ErrorMessage>` components display validation errors for each field.

//    * Error messages are styled with **red bold text**.

// ---

// 6. **Submit Button**

//    ```jsx
//    <button type="submit" disabled={isSubmitting}>
//    ```

//    * The button submits the form.
//    * It becomes **disabled while the form is submitting**.

// ---

//  **Overall:**
// The `UserForm` component demonstrates how to use **Formik to manage a form in React**, including setting initial values, validating user input (email and password), displaying error messages, and handling form submission.

