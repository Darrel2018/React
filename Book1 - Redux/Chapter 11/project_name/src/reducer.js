// Reducer
function cartReducer(state, action) {
    if (state === undefined) {
        return {
            totalCost: 0,
            productCart: []
        };
    }

    switch (action.type) {
        case "addProduct":
            return {
                ...state,
                totalCost: state.totalCost + parseInt(action.productData.productPrice),
                productCart: state.productCart.concat({
                    productName: action.productData.productName,
                    productPrice: action.productData.productPrice
                })
            }
        case "deleteProduct":
            const updatedArray = state.productCart.filter(product =>
                product.productName !== action.productData.productName);
            return {
                ...state,
                totalCost: state.totalCost - parseInt(action.productData.productPrice),
                productCart: updatedArray
            }
        default:
            return state;
    }
}

export default cartReducer;

// **Summary of the Code**

// This code defines a **Redux-style reducer function** called `cartReducer` that manages the state of a shopping cart.

// * **Initial State:**
//   If the current `state` is `undefined`, the reducer returns a default state containing:

//   * `totalCost`: `0`
//   * `productCart`: an empty array to store cart items.

// * **Handling Actions:**
//   The reducer updates the state based on the `action.type` using a `switch` statement.

//   1. **`addProduct` action**

//      * Adds a product to the `productCart` array.
//      * Increases `totalCost` by the product’s price (converted to an integer).
//      * Stores the product’s `productName` and `productPrice` in the cart.

//   2. **`deleteProduct` action**

//      * Removes a product from `productCart` by filtering out the item with the matching `productName`.
//      * Decreases `totalCost` by the product’s price.

//   3. **Default case**

//      * Returns the current state if the action type is not recognized.

// * **Export:**
//   The reducer is exported as the default export so it can be used in a Redux store.

// **Overall:**
// The reducer manages a shopping cart by **adding and removing products while keeping track of the total cost**.
