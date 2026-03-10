import React, { Component } from 'react';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

class Rating extends Component {

    constructor(props) {
        super(props);
        this.state = { rating: this.props.rating };
    }

    handleClick(ratingValue) {
        this.setState({rating:ratingValue});
    }

    render() {
        return (
            <div>
                {/* EXAMPLE 1: PASSING DATA USING PROPS OBJECT */}
                {/* <h1>Rating: {this.props.rating}</h1>
                {this.props.rating >= 1 ? (
                    <IoIosStar />
                ) : (
                    <IoIosStarOutline />
                )}
                {this.props.rating >= 2 ? (
                    <IoIosStar />
                ) : (
                    <IoIosStarOutline />
                )}
                {this.props.rating >= 3 ? (
                    <IoIosStar />
                ) : (
                    <IoIosStarOutline />
                )}
                {this.props.rating >= 4 ? (
                    <IoIosStar />
                ) : (
                    <IoIosStarOutline />
                )}
                {this.props.rating >= 5 ? (
                    <IoIosStar />
                ) : (
                    <IoIosStarOutline />
                )} */}

                {/* EXAMPLE 2: PASSING DATA USING LOCAL STATE VARIABLE */}
                <h1>Rating: {this.state.rating}</h1>
                {this.state.rating >= 1 ? (
                    <IoIosStar onClick={this.handleClick.bind(this,1)}/>
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this,1)}/>
                )}
                {this.state.rating >= 2 ? (
                    <IoIosStar onClick={this.handleClick.bind(this,2)}/>
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this,2)}/>
                )}
                {this.state.rating >= 3 ? (
                    <IoIosStar onClick={this.handleClick.bind(this,3)}/>
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this,3)}/>
                )}
                {this.state.rating >= 4 ? (
                    <IoIosStar onClick={this.handleClick.bind(this,4)}/>
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this,4)}/>
                )}
                {this.state.rating >= 5 ? (
                    <IoIosStar onClick={this.handleClick.bind(this,5)}/>
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this,5)}/>
                )}

            </div>
        );
    }
}

export default Rating;

// **Summary of the Code**

// This code defines a **React class component called `Rating`** that displays a **5-star rating system** using icons from the `react-icons` library. Users can **click on stars to change the rating**, and the component updates the display accordingly.

// ### Key Points

// 1. **Imports**

//    * `React` and `Component` are imported to create a React class component.
//    * `IoIosStar` and `IoIosStarOutline` icons are imported from `react-icons/io` to represent **filled** and **empty** stars.

// 2. **Component State Initialization**

//    * In the `constructor`, the component initializes its **state** with a `rating` value taken from `props`.

//    ```javascript
//    this.state = { rating: this.props.rating };
//    ```

//    * This allows the rating to be **dynamic and updated within the component**.

// 3. **handleClick Method**

//    * `handleClick(ratingValue)` updates the component state when a star is clicked.

//    ```javascript
//    this.setState({ rating: ratingValue });
//    ```

//    * This triggers a **re-render** so the UI reflects the new rating.

// 4. **Rendering the Rating UI**

//    * The component displays the current rating:

//    ```javascript
//    <h1>Rating: {this.state.rating}</h1>
//    ```

//    * It then renders **five stars**.
//    * Each star:

//      * Displays a **filled star (`IoIosStar`)** if the rating is equal to or greater than that star number.
//      * Displays an **outlined star (`IoIosStarOutline`)** otherwise.

// 5. **Interactive Stars**

//    * Each star has an `onClick` event:

//    ```javascript
//    onClick={this.handleClick.bind(this, 3)}
//    ```

//    * Clicking a star sets the rating to that number.

// 6. **Commented Example**

//    * The commented **Example 1** shows how the stars could be displayed using **props only** (read-only rating).
//    * **Example 2 (active code)** uses **local state**, allowing users to change the rating interactively.

// ### Overall Function

// The component creates an **interactive star rating system** where users can click on stars (1–5) to set a rating, and the interface updates dynamically to reflect the selected value.
