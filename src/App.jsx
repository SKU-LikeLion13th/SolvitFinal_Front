import "./css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";

function App() {
  return (
    <Router>
      <div className="App pt-12">
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
