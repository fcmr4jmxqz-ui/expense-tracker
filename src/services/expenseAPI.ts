import axios from "axios";
import type { Expense } from "../types/Expense";

type ExpenseApiResponse = {
  id: string;
  title: string;
  amount: string;
  category: string;
  expense_date: string;
};
const API_URL = "http://localhost:5000/expenses";

// GET all expenses
export async function getExpenses() {
  const response = await axios.get(API_URL);

  return response.data.map((expense: ExpenseApiResponse) => ({
    id: Number(expense.id),

    title: expense.title,

    amount: Number(expense.amount),

    category: expense.category,

    date: expense.expense_date,
  }));
}

// CREATE expense
export async function createExpense(expense: Expense) {
  const response = await axios.post(API_URL, {
    user_id: 1,

    title: expense.title,

    amount: expense.amount,

    category: expense.category,

    expense_date: expense.date,
  });

  return response.data;
}

// UPDATE expense
export async function updateExpenseApi(expense: Expense) {
  const response = await axios.put(`${API_URL}/${expense.id}`, {
    title: expense.title,

    amount: expense.amount,

    category: expense.category,

    expense_date: expense.date,
  });

  return response.data;
}

// DELETE expense
export async function deleteExpenseApi(id: number) {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
}
