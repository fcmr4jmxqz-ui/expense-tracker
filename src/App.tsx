import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import type { Expense } from "./types/Expense";

import ExpensePage from "./pages/ExpensePage";
import SummaryPage from "./pages/SummaryPage";

import "./App.css";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");

    if (savedExpenses) {
      return JSON.parse(savedExpenses);
    }

    return [];
  });

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    localStorage.setItem(
      "expenses",

      JSON.stringify(expenses),
    );
  }, [expenses]);

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
