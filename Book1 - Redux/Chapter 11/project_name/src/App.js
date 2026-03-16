import { connect } from "react-redux";
import Cart from "./Cart";

function mapStateToProps(state) {
  return {
    totalCost: state.cart.totalCost,
    productCart: state.cart.productCart
  }
}


function mapDispatchToProps(dispatch) {
  return {
    onAddProduct: (productName, productPrice) => dispatch({ 
      type: "addProduct", 
      productData: { 
        productName: productName, 
        productPrice: productPrice 
      }
    }),

    onDeleteProduct: (productData) => dispatch({ 
      type: "deleteProduct", 
      productData: productData 
    })
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

export default connectedComponent;



// **Summary of the Code**

// This code connects a React component called `Cart` to a Redux store using the `connect` function from `react-redux`.

// ### Key Parts

// 1. **Importing Dependencies**

//    * `connect` from `react-redux` is used to link the Redux store with the React component.
//    * The `Cart` component is imported from the local file.

// 2. **`mapStateToProps` Function**

//    * This function selects data from the Redux store and passes it as props to the `Cart` component.
//    * It provides:

//      * `totalCost` – the total price of items in the cart.
//      * `productCart` – the list of products currently in the cart.

// 3. **`mapDispatchToProps` Function**

//    * This function creates props that allow the component to dispatch actions to the Redux store.
//    * It defines two actions:

//      * `onAddProduct(productName, productPrice)` – dispatches an `"addProduct"` action with product name and price.
//      * `onDeleteProduct(productData)` – dispatches a `"deleteProduct"` action with the product data.

// 4. **Connecting the Component**

//    * The `connect` function combines `mapStateToProps` and `mapDispatchToProps` with the `Cart` component.
//    * This creates a **connected component** that can read from the Redux store and dispatch actions.

// 5. **Export**

//    * The connected version of the `Cart` component is exported as the default export.

// ✅ **Overall:**
// The code enables the `Cart` component to access cart data from Redux and perform actions to add or remove products from the cart.








// =====================================================
// OLD code
// =====================================================

// import React, { Component } from 'react';
// import Products from "./Products";
// import { Button } from 'react-bootstrap';
// import Rating from "./Rating.js";
// import JumboTronComponent from './JumboTronComponent';
// import UserForm from "./UserForm";
// import GitHub from './GitHub';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Nav, Navbar } from 'react-bootstrap';
// import Hello from './Hello.js';
// import GitHubUser from './GitHubUser';
// import { getApp } from "firebase/app";
// import User from "./User.js";

// class App extends Component {

//   constructor(props) {
//     super(props);
//     // console.log(getApp());
//   }

//   render() {
//     return (
//       <div>
//         {/* <Header /> */}

//         <BrowserRouter>
//           <div>
//             <Routes>
//               <Route path="/edit/:id" element={<UserForm />} />
//               <Route path="/add" element={<UserForm />} />
//               <Route exact path="/" element={<User />} />
//               <Route path="/*" element={<NotFound />} />
//             </Routes>
//           </div>
//         </BrowserRouter>
//       </div>
//     );
//   }
// }

// export default App;

// class Header extends Component {
//   render() {
//     return (
//       <BrowserRouter>
//         <div>
//           <Navbar bg="light" expand="lg">
//             <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="mr-auto">
//                 <Nav.Link href="/">Home</Nav.Link>
//                 <Nav.Link href="/github">GitHub</Nav.Link>
//                 <Nav.Link href="/hello">Hello</Nav.Link>
//               </Nav>
//             </Navbar.Collapse>
//           </Navbar>

//           <Routes>
//             <Route path="/github/user/:login/:id" element={<GitHubUser />} />
//             <Route path="/github" element={<GitHub />} />
//             <Route path="/hello" element={<Hello />} />
//             <Route exact path="/" element={<Home />} />
//             <Route path="/*" element={<NotFound />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     )
//   }
// }

// class Home extends Component {
//   render() {
//     return (
//       <div>
//         Home
//       </div>
//     )
//   }
// }

// class NotFound extends Component {
//   render() {
//     return <div>Not Found</div>
//   }
// }
