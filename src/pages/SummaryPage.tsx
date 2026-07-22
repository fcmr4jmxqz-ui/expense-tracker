import { useState, useEffect } from "react";
import type { Expense } from "../types/Expense";
import SummaryDashboard from "../components/SummaryDashboard";
import SummaryExportButtons from "../components/SummaryExportButtons";
import ComparisonDashboard from "../components/ComparisonDashboard";

interface Props {
  expenses: Expense[];
}

function SummaryPage({ expenses }: Props) {
  const [summaryPeriod, setSummaryPeriod] = useState("All");

  const [periodA, setPeriodA] = useState("");

  const [periodB, setPeriodB] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  function getPeriod(date: string) {
    const expenseDate = new Date(date);

    const year = expenseDate.getFullYear();

    const month = String(expenseDate.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }

  const availablePeriods = [
    ...new Set(expenses.map((expense) => getPeriod(expense.date))),
  ].sort((a, b) => b.localeCompare(a));

  useEffect(() => {
    if (availablePeriods.length >= 2 && periodA === "" && periodB === "") {
      setPeriodA(availablePeriods[1]);

      setPeriodB(availablePeriods[0]);
    }
  }, [availablePeriods, periodA, periodB]);

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

  const totalAmount = categoryTotals.reduce((sum, item) => sum + item.total, 0);

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

  // ==========================
  // COMPARISON DASHBOARD DATA
  // ==========================

  const periodAExpenses = expenses.filter(
    (expense) => getPeriod(expense.date) === periodA,
  );

  const periodBExpenses = expenses.filter(
    (expense) => getPeriod(expense.date) === periodB,
  );

  const totalA = periodAExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const totalB = periodBExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const allCategories = [
    ...new Set(expenses.map((expense) => expense.category)),
  ];

  const comparisons = allCategories.map((category) => {
    const periodATotal = periodAExpenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);

    const periodBTotal = periodBExpenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      category,

      periodATotal,

      periodBTotal,

      difference: periodBTotal - periodATotal,

      percentage:
        periodATotal === 0
          ? periodBTotal === 0
            ? "0"
            : "NEW"
          : (((periodBTotal - periodATotal) / periodATotal) * 100).toFixed(2),
    };
  });

  return (
    <>
      <SummaryDashboard
        categoryTotals={categorySummary}
        totalAmount={totalAmount}
        summaryPeriod={summaryPeriod}
        setSummaryPeriod={setSummaryPeriod}
        availablePeriods={availablePeriods}
        categoryCount={categoryCount}
        highestCategory={highestCategory}
      />

      <SummaryExportButtons expenses={summaryExpenses} />

      <ComparisonDashboard
        periodA={periodA}
        setPeriodA={setPeriodA}
        periodB={periodB}
        setPeriodB={setPeriodB}
        availablePeriods={availablePeriods}
        totalA={totalA}
        totalB={totalB}
        comparisons={comparisons}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
      />
    </>
  );
}

export default SummaryPage;
