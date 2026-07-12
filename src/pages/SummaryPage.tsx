import { useState } from "react";
import type { Expense } from "../types/Expense";
import SummaryDashboard from "../components/SummaryDashboard";

interface Props {
  expenses: Expense[];
}

function SummaryPage({ expenses }: Props) {
  const [summaryPeriod, setSummaryPeriod] = useState("All");

  function getPeriod(date: string) {
    const expenseDate = new Date(date);

    const year = expenseDate.getFullYear();

    const month = String(expenseDate.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  const availablePeriods = [
    ...new Set(expenses.map((expense) => getPeriod(expense.date))),
  ].sort((a, b) => b.localeCompare(a));

  const summaryExpenses = expenses.filter((expense) => {
    if (summaryPeriod === "All") {
      return true;
    }

    return getPeriod(expense.date) === summaryPeriod;
  });

  const categoryTotals = summaryExpenses.reduce(
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

  const totalAmount = categoryTotals.reduce(
    (sum, item) => sum + item.total,

    0,
  );

  const categorySummary = categoryTotals.map((item) => ({
    ...item,

    percentage:
      totalAmount === 0 ? 0 : ((item.total / totalAmount) * 100).toFixed(2),
  }));

  const categoryCount = categoryTotals.length;

  const highestCategory =
    categoryTotals.length > 0
      ? categoryTotals.reduce((previous, current) =>
          current.total > previous.total ? current : previous,
        )
      : null;

  return (
    <SummaryDashboard
      categoryTotals={categorySummary}
      totalAmount={totalAmount}
      summaryPeriod={summaryPeriod}
      setSummaryPeriod={setSummaryPeriod}
      availablePeriods={availablePeriods}
      categoryCount={categoryCount}
      highestCategory={highestCategory}
    />
  );
}

export default SummaryPage;
