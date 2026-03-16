import React, { Component } from "react";
import AddProduct from './AddProduct';
import { Table } from 'reactstrap';
import { Button } from "react-bootstrap";

class Cart extends Component {
    render() {
        return (
            <div className="container">
                <AddProduct addProduct={this.props.onAddProduct} />
                <Table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.productCart.map(productData => (
                            <tr key={productData.productName}>
                                <td>{productData.productName}</td>
                                <td>{productData.productPrice}</td>
                                <td>
                                    <Button variant="danger" onClick={() =>
                                        this.props.onDeleteProduct(productData)}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <span>Total Amount: {this.props.totalCost}</span>
            </div >
        );
    }
};

export default Cart;


// **Summary of the Code**

// This code defines a **React class component called `Cart`** that displays and manages a shopping cart interface.

// ### Main Purpose

// The `Cart` component:

// * Displays a list of products in a cart.
// * Allows users to **add products** using the `AddProduct` component.
// * Allows users to **remove products** from the cart.
// * Shows the **total cost** of all products in the cart.

// ### Key Features

// 1. **Imports**

//    * `React` and `Component` for creating the class component.
//    * `AddProduct` component for adding new items.
//    * `Table` from `reactstrap` to display cart items in a table.
//    * `Button` from `react-bootstrap` for the remove button.

// 2. **Add Product Section**

//    * The `AddProduct` component is rendered at the top.
//    * It receives the function `onAddProduct` from props as `addProduct`, allowing users to add items to the cart.

// 3. **Product List Display**

//    * Products are displayed in a **table** with columns:

//      * Product Name
//      * Product Price
//      * Action (remove button)
//    * The component loops through `this.props.productCart` using `.map()` to generate a table row for each product.

// 4. **Remove Product**

//    * Each row contains a **Remove button**.
//    * Clicking the button calls `this.props.onDeleteProduct(productData)` to remove that product from the cart.

// 5. **Total Cost**

//    * At the bottom, the component displays the total price using `this.props.totalCost`.

// ### Data Flow

// All data and actions come from **props**, meaning:

// * The **parent component manages the state**.
// * `Cart` is mainly responsible for **displaying data and triggering actions**.

// ### In Short

// The component acts as a **presentation and interaction layer for a shopping cart**, showing products, allowing additions/removals, and displaying the total price.

