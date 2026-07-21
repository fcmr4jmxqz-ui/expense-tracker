import axios from "axios";

const API_URL = "http://localhost:5000/expenses";

export async function getExpenses() {
  const response = await axios.get(API_URL);

  return response.data;
}

export async function createExpense(expense: unknown) {
  const response = await axios.post(API_URL, expense);

  return response.data;
}

export async function updateExpenseApi(id: number, expense: unknown) {
  const response = await axios.put(`${API_URL}/${id}`, expense);

  return response.data;
}

export async function deleteExpenseApi(id: number) {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
}
