import type { Expense } from "../types/Expense";
import "./ExpenseItem.css";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  expense: Expense;

  deleteExpense: (id: number) => void;

  setEditingExpense: (expense: Expense) => void;

  excludedExpenseIds: number[];

  setExcludedExpenseIds: Dispatch<SetStateAction<number[]>>;
}

function ExpenseItem({
  expense,

  setEditingExpense,

  deleteExpense,

  excludedExpenseIds,

  setExcludedExpenseIds,
}: Props) {
  const isExcluded = excludedExpenseIds.includes(expense.id);

  function toggleExclude() {
    setExcludedExpenseIds((previous) => {
      if (previous.includes(expense.id)) {
        return previous.filter((id) => id !== expense.id);
      }

      return [...previous, expense.id];
    });
  }

  return (
    <div className={isExcluded ? "expense-item excluded" : "expense-item"}>
      <h3>{expense.title}</h3>

      <p>RM {expense.amount}</p>

      <p>{expense.category}</p>

      <p>{new Date(expense.date).toLocaleDateString()}</p>
      <button
        className="edit-btn"
        onClick={() => {
          setEditingExpense(expense);

          document.getElementById("expense-form")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      >
        Edit
      </button>

      <button
        className="delete-btn"
        onClick={() => {
          const confirmed = window.confirm(
            `Confirm to delete "${expense.title}" from your expenses?\n\nThis action cannot be undone.`,
          );

          if (confirmed) {
            deleteExpense(expense.id);
          }
        }}
      >
        Delete
      </button>

      <input type="checkbox" checked={!isExcluded} onChange={toggleExclude} />
    </div>
  );
}

export default ExpenseItem;
