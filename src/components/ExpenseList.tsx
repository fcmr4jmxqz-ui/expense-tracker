import type { Expense } from "../types/Expense";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  expenses: Expense[];

  updateExpense: (expense: Expense) => void;

  setEditingExpense: (expense: Expense) => void;

  deleteExpense: (id: number) => void;

  excludedExpenseIds: number[];

  setExcludedExpenseIds: Dispatch<SetStateAction<number[]>>;
}

function ExpenseList({
  expenses,

  setEditingExpense,

  deleteExpense,

  excludedExpenseIds,

  setExcludedExpenseIds,
}: Props) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>No expenses found.</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <div className="expense-header">
        <h3>Title</h3>

        <h3>Price</h3>

        <h3>Category</h3>

        <h3>Date</h3>

        <h3>Modify</h3>

        <h3>Remove</h3>

        <h3>Include</h3>
      </div>

      <div className="expense-container">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            setEditingExpense={setEditingExpense}
            deleteExpense={deleteExpense}
            excludedExpenseIds={excludedExpenseIds}
            setExcludedExpenseIds={setExcludedExpenseIds}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
