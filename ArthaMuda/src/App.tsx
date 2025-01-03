import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddIncome from "./pages/AddIncome";
import AddOutcome from "./pages/AddOutcome";
import ListTransaction from "./pages/ListTransaction";
import PrivateRoute from "./utils/PrivateRoute";
import EditIncome from "./pages/EditIncome";
import ListIncome from "./pages/ListIncome";
import ListOutcome from "./pages/ListOutcome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        {/* Protect the following routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AddIncome" element={<AddIncome />} />
          <Route path="/AddOutcome" element={<AddOutcome />} />
          <Route path="/ListTransaction" element={<ListTransaction />} />
          <Route path="/ListIncome" element={<ListIncome />} />
          <Route path="/ListOutcome" element={<ListOutcome />} />
          <Route path="/:id" element={<EditIncome />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
