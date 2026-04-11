import Welcome from "./components/Welcome";
import Homepage from "./components/Homepage";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
      <div>
        <Routes>
          <Route path="/" element={ <Welcome /> } />
          <Route path="/homepage" element={ <Homepage /> } />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
