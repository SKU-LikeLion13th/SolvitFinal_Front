import "./css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Login from "./pages/Login";
import MatchInfo from "./pages/Match/MatchInfo";
import Match from "./pages/Match/Match";

function App() {
  return (
    <Router>
      <div className="App ">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/MatchInfo" element={<MatchInfo />} />
          <Route path="/Match" element={<Match />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
