// EXAMPLE 1: Using a class component.
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';

// class App extends React.Component {
//   state = { requested: '' };

//   render() {

//     return (
//       <div>
//         <Button variant="link" onClick={() => this.setState({
//           requested: 'https://jsonplaceholder.typicode.com/posts'
//         })}>
//           Posts
//         </Button>
//         <Button variant="link" onClick={() => this.setState({
//           requested: 'https://jsonplaceholder.typicode.com/todos'
//         })}>
//           Todos
//         </Button>
//         <br />
//         Requested: {this.state.requested}
//       </div>
//     )
//   }
// }

// export default App;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import useFetch from './useFetch'
import Users from './Users'


const App = () => {
  const postsUrl = "https://jsonplaceholder.typicode.com/posts";
  const todosUrl = "https://jsonplaceholder.typicode.com/todos";
  const [requested, setRequested] = useState(postsUrl);
  const data = useFetch(requested);

  return (
    <div>
      <h1>Users</h1>
      <Users />
      <hr></hr>
      <Button variant="link" onClick={() => setRequested(postsUrl)}>
        Posts
      </Button>
      <Button variant="link" onClick={() => setRequested(todosUrl)}>
        Todos
      </Button>
      <br />
      Requested: {requested}
      <ul>
        {data.map(el => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App;


// -------------------------
// OLD CODE
//-----------------------------

// import { connect } from "react-redux";
// import Cart from "./Cart";

// function mapStateToProps(state) {
//   return {
//     totalCost: state.cart.totalCost,
//     productCart: state.cart.productCart
//   }
// }


// function mapDispatchToProps(dispatch) {
//   return {
//     onAddProduct: (productName, productPrice) => dispatch({ 
//       type: "addProduct", 
//       productData: { 
//         productName: productName, 
//         productPrice: productPrice 
//       }
//     }),

//     onDeleteProduct: (productData) => dispatch({ 
//       type: "deleteProduct", 
//       productData: productData 
//     })
//   }
// }

// const connectedComponent = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Cart);

// export default connectedComponent;



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
