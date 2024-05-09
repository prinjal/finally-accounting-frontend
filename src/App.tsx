import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AccountsList from "./components/AccountsList";
import TransactionsList from "./components/TransactionsList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="api/accounts" element={<AccountsList />} />
        <Route path="api/transactions" element={<TransactionsList />} />
        <Route
          path="api/accounts/:accountNumber/transactions/"
          element={<TransactionsList />}
        />
      </Routes>
    </Router>
  );
}

export default App;
