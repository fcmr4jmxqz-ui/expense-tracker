import { useState, useEffect } from "react";
import type { Expense } from "../types/Expense";
import "./ExpenseForm.css";

interface Props {
  addExpense: (expense: Expense) => void;

  updateExpense: (expense: Expense) => void;

  editingExpense: Expense | null;

  setEditingExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
}

function ExpenseForm({
  addExpense,
  updateExpense,
  editingExpense,
  setEditingExpense,
}: Props) {
  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");

  const [category, setCategory] = useState("Food");

  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);

      setAmount(editingExpense.amount.toString());

      setCategory(editingExpense.category);

      setDate(editingExpense.date.substring(0, 10));
    }
  }, [editingExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0");

      return;
    }

    if (!title.trim() || !amount) {
      return;
    }

    if (editingExpense) {
      updateExpense({
        ...editingExpense,

        title,

        amount: Number(amount),

        category,

        date: new Date(date).toISOString(),
      });

      setEditingExpense(null);
    } else {
      const newExpense: Expense = {
        id: Date.now(),

        title,

        amount: Number(amount),

        category,

        date: new Date(date).toISOString(),
      };

      addExpense(newExpense);
    }

    setTitle("");

    setAmount("");

    setCategory("Food");

    setDate(new Date().toISOString().substring(0, 10));
  };

  return (
    <div id="expense-form-section">
      {editingExpense && (
        <div className="editing-banner">Editing: {editingExpense.title}</div>
      )}

      <form id="expense-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>

          <option value="Transport">Transport</option>

          <option value="Shopping">Shopping</option>

          <option value="Bills">Bills</option>

          <option value="Entertainment">Entertainment</option>

          <option value="Others">Others</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>

        {editingExpense && (
          <button
            type="button"
            onClick={() => {
              setEditingExpense(null);

              setTitle("");

              setAmount("");

              setCategory("Food");

              setDate(new Date().toISOString().substring(0, 10));
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default ExpenseForm;
