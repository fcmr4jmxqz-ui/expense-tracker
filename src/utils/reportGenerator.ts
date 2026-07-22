import type { Expense } from "../types/Expense";

export function generateExpenseCSV(expenses: Expense[]) {
  const headers = ["Date", "Title", "Category", "Amount"];

  const rows = expenses.map((expense) => [
    new Date(expense.date).toLocaleDateString(),

    expense.title,

    expense.category,

    expense.amount.toString(),
  ]);

  return [headers, ...rows].map((row) => row.join(",")).join("\n");
}

export function generateSummaryCSV(expenses: Expense[]) {
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const categoryTotals = expenses.reduce(
    (result, expense) => {
      const existing = result.find(
        (item) => item.category === expense.category,
      );

      if (existing) {
        existing.total += expense.amount;
      } else {
        result.push({
          category: expense.category,

          total: expense.amount,
        });
      }

      return result;
    },
    [] as {
      category: string;
      total: number;
    }[],
  );

  const highestCategory =
    categoryTotals.length > 0
      ? categoryTotals.reduce((previous, current) =>
          current.total > previous.total ? current : previous,
        )
      : null;

  const rows = [
    ["Expense Summary Report"],

    ["Total Spending", totalAmount],

    ["", ""],

    ["Category", "Amount", "Percentage"],

    ...categoryTotals.map((item) => [
      item.category,

      item.total,

      totalAmount === 0
        ? "0%"
        : `${((item.total / totalAmount) * 100).toFixed(2)}%`,
    ]),

    ["", ""],

    [
      "Highest Category",

      highestCategory ? highestCategory.category : "No Data",
    ],
  ];

  return rows.map((row) => row.join(",")).join("\n");
}
