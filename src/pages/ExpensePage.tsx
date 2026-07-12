import { useState } from "react";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseFilter from "../components/ExpenseFilter";
import SearchBar from "../components/SearchBar";
import SortSelector from "../components/SortSelector";
import PeriodFilter from "../components/PeriodFilter";

import type { Expense } from "../types/Expense";

interface Props {
  expenses: Expense[];

  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;

  editingExpense: Expense | null;

  setEditingExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
}

function ExpensePage({
  expenses,

  setExpenses,

  editingExpense,

  setEditingExpense,
}: Props) {
  const [filterCategory, setFilterCategory] = useState("All");

  const [filterPeriod, setFilterPeriod] = useState("All");

  function getPeriod(date: string) {
    const expenseDate = new Date(date);

    const year = expenseDate.getFullYear();

    const month = String(expenseDate.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  const availablePeriods = [
    ...new Set(expenses.map((expense) => getPeriod(expense.date))),
  ].sort((a, b) => b.localeCompare(a));

  const periodFilteredExpenses = expenses.filter((expense) => {
    if (filterPeriod === "All") {
      return true;
    }

    return getPeriod(expense.date) === filterPeriod;
  });

  const categoryFilteredExpenses = periodFilteredExpenses.filter((expense) => {
    if (filterCategory === "All") {
      return true;
    }

    return expense.category === filterCategory;
  });

  const [searchTerm, setSearchTerm] = useState("");

  const searchedExpenses = categoryFilteredExpenses.filter((expense) =>
    expense.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const [sortOption, setSortOption] = useState("date-desc");

  const sortedExpenses = [...searchedExpenses].sort((a, b) => {
    switch (sortOption) {
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime();

      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();

      case "amount-asc":
        return a.amount - b.amount;

      case "amount-desc":
        return b.amount - a.amount;

      case "name-asc":
        return a.title.localeCompare(b.title);

      case "name-desc":
        return b.title.localeCompare(a.title);

      default:
        return 0;
    }
  });

  const [excludedExpenseIds, setExcludedExpenseIds] = useState<number[]>([]);

  const totalAmount = searchedExpenses

    .filter((expense) => !excludedExpenseIds.includes(expense.id))

    .reduce((total, expense) => total + expense.amount, 0);

  function addExpense(expense: Expense) {
    setExpenses([...expenses, expense]);
  }

  function deleteExpense(id: number) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  function updateExpense(updatedExpense: Expense) {
    setExpenses(
      expenses.map((expense) => {
        if (expense.id === updatedExpense.id) {
          return updatedExpense;
        }

        return expense;
      }),
    );
  }
  function setFormData(expense: Expense) {
    setEditingExpense(expense);
  }
  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>

      <ExpenseForm
        addExpense={addExpense}
        updateExpense={updateExpense}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />

      <PeriodFilter
        filterPeriod={filterPeriod}
        setFilterPeriod={setFilterPeriod}
        availablePeriods={availablePeriods}
      />

      <div className="toolbar">
        <ExpenseFilter
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <SortSelector sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      <p className="expense-count">Showing {sortedExpenses.length} expenses</p>

      <ExpenseList
        expenses={sortedExpenses}
        updateExpense={updateExpense}
        setEditingExpense={setEditingExpense}
        deleteExpense={deleteExpense}
        excludedExpenseIds={excludedExpenseIds}
        setExcludedExpenseIds={setExcludedExpenseIds}
      />

      <p>Displayed Expenses Total: RM {totalAmount}</p>
    </div>
  );
}

export default ExpensePage;
