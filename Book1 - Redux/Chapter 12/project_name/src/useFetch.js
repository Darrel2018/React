import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
    }, [url]);
    
    return data
}

export default useFetch;

// This `useFetch` function is a **custom React hook** that handles fetching data from a given URL and storing it in state.

// ### Key points:

// * **Imports & setup**

//   * Uses React hooks: `useState` and `useEffect`.
//   * Designed as a reusable function (`useFetch`) that accepts a `url` parameter.

// * **State management**

//   * Initializes a state variable `data` as an empty array.
//   * `setData` is used to update this state after fetching.

// * **Data fetching**

//   * Uses `useEffect` to run a side effect (the fetch request).
//   * The effect runs:

//     * On initial render
//     * Whenever the `url` changes (dependency array `[url]`)
//   * Fetch process:

//     1. Calls `fetch(url)`
//     2. Converts the response to JSON
//     3. Updates state with the fetched data using `setData`

// * **Return value**

//   * Returns the `data` array so it can be used in components.

// ### Overall behavior:

// This hook abstracts the logic for fetching data from an API. Any component that calls `useFetch(url)` will automatically fetch data from that URL and re-fetch whenever the URL changes, making it reusable and clean for handling API requests.
