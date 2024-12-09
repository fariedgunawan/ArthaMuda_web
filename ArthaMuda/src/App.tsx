import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddIncome from "./pages/AddIncome";
import AddOutcome from "./pages/AddOutcome";
import ListTransaction from "./pages/ListTransaction";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/AddIncome" element={<AddIncome />} />
        <Route path="/AddOutcome" element={<AddOutcome />} />
        <Route path="/ListTransaction" element={<ListTransaction />} />
      </Routes>
    </Router>
  );
}

export default App;
