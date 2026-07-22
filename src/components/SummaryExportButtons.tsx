import type { Expense } from "../types/Expense";
import { generateSummaryCSV } from "../utils/reportGenerator";

interface Props {
  expenses: Expense[];
}

function SummaryExportButtons({ expenses }: Props) {
  function exportSummary() {
    const csv = generateSummaryCSV(expenses);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "expense-summary-report.csv";

    link.click();

    URL.revokeObjectURL(url);
  }

  return <button onClick={exportSummary}>Export Summary Report</button>;
}

export default SummaryExportButtons;
