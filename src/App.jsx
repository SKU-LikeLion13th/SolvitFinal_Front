import "./css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./pages/Main/Main";
import Login from "./pages/Login";
import Member from "./pages/Member";
import MatchInfo from "./pages/Match/MatchInfo";
import Match from "./pages/Match/Match";
import MatchCheck from "./pages/Match/MatchCheck";
import MatchFinish from "./pages/Match/MatchFinish";
import MatchHistory from "./components/Header/MenuContent/MatchHistory";
import AdminMain from "./pages/Admin/AdminMain";
import AdminResult from "./pages/Admin/AdminResult";
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Member" element={<Member />} />
          <Route path="/MatchInfo" element={<MatchInfo />} />
          <Route path="/Match" element={<Match />} />
          <Route path="/MatchCheck" element={<MatchCheck />} />
          <Route path="/MatchFinish" element={<MatchFinish />} />
          <Route path="/MatchHistory" element={<MatchHistory />} />
          <Route path="/Admin" element={<AdminMain />} />
          <Route path="/Admin/AdminResult" element={<AdminResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
