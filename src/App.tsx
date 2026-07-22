import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { getExpenses } from "./services/expenseAPI";
import type { Expense } from "./types/Expense";

import ExpensePage from "./pages/ExpensePage";
import SummaryPage from "./pages/SummaryPage";

import "./App.css";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    try {
      setLoading(true);

      setError("");

      const data = await getExpenses();

      setExpenses(data);
    } catch (error) {
      console.error(error);

      setError("Unable to load expenses. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return <div>Loading expenses...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>

        <button onClick={loadExpenses}>Retry</button>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav>
          <Link to="/">Expense Tracker</Link>

          {" | "}

          <Link to="/summary">Summary</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <ExpensePage
                expenses={expenses}
                setExpenses={setExpenses}
                editingExpense={editingExpense}
                setEditingExpense={setEditingExpense}
              />
            }
          />

          <Route
            path="/summary"
            element={<SummaryPage expenses={expenses} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
