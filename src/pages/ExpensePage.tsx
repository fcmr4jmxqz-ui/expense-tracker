import { useState } from "react";
import ExportButtons from "../components/ExportButtons";
import {
  getExpenses,
  createExpense,
  updateExpenseApi,
  deleteExpenseApi,
} from "../services/expenseAPI";
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

  async function addExpense(expense: Expense) {
    await createExpense(expense);

    const updatedExpenses = await getExpenses();

    setExpenses(updatedExpenses);
  }

  async function deleteExpense(id: number) {
    await deleteExpenseApi(id);

    const updatedExpenses = await getExpenses();

    setExpenses(updatedExpenses);
  }

  async function updateExpense(updatedExpense: Expense) {
    await updateExpenseApi(updatedExpense);

    const updatedExpenses = await getExpenses();

    setExpenses(updatedExpenses);
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

      <ExportButtons expenses={expenses} filteredExpenses={sortedExpenses} />
    </div>
  );
}

export default ExpensePage;
