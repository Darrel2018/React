import React, { Component } from "react";

class AddProduct extends Component {
    state = {
        productName: '',
        productPrice: 0
    }

    productNameChangedHandler = (event) => {
        this.setState({ productName: event.target.value });
    }

    productPriceChangedHandler = (event) => {
        this.setState({ productPrice: event.target.value });
    }

    render() {
        return (
            <div className="container">
                <input
                    type="text"
                    placeholder="Product Name"
                    onChange={this.productNameChangedHandler}
                    value={this.state.productName}
                />
                <input
                    type="number"
                    placeholder="Product Price"
                    onChange={this.productPriceChangedHandler}
                    value={this.state.productPrice}
                />
                <button className="buttons"
                    onClick={() => {
                        this.props.addProduct(this.state.productName, this.state.productPrice);
                    }}>Add Product</button>
            </div>
        );
    }
};

export default AddProduct;


// **Summary of the Code**

// This code defines a **React class component** called `AddProduct` that allows a user to input and add a product with a name and price.

// Key points:

// 1. **State Management**

//    * The component maintains a `state` with two properties:

//      * `productName` – stores the name of the product (initially an empty string).
//      * `productPrice` – stores the price of the product (initially `0`).

// 2. **Input Handlers**

//    * `productNameChangedHandler` updates `productName` in the state whenever the user types in the product name input field.
//    * `productPriceChangedHandler` updates `productPrice` in the state when the price input changes.

// 3. **Controlled Inputs**

//    * Both `<input>` fields are **controlled components**, meaning their values are tied to the component’s state and updated via `onChange` handlers.

// 4. **Adding a Product**

//    * When the **"Add Product"** button is clicked, the component calls `this.props.addProduct(...)`.
//    * It passes the current `productName` and `productPrice` from the state to a function provided by the parent component.

// 5. **Purpose**

//    * The component serves as a **form for entering product details** and sending them to a parent component to be added to a product list or database.

// ✅ **In short:**
// `AddProduct` is a React form component that captures a product’s name and price using controlled inputs and sends that data to a parent component when the user clicks the "Add Product" button.
