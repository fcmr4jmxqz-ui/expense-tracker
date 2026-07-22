import type { Expense } from "../types/Expense";
import { generateExpenseCSV } from "../utils/reportGenerator";
interface Props {
  expenses: Expense[];

  filteredExpenses: Expense[];
}

function ExportButtons({ expenses, filteredExpenses }: Props) {
  function exportCSV(data: Expense[]) {
    const csvContent = generateExpenseCSV(data);

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "expense-report.csv";

    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <button onClick={() => exportCSV(expenses)}>Export Full history</button>
      <button onClick={() => exportCSV(filteredExpenses)}>
        Export Filtered Results
      </button>{" "}
    </div>
  );
}

export default ExportButtons;
