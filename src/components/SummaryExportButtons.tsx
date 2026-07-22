import type { Expense } from "../types/Expense";

import { generateSummaryCSV } from "../utils/reportGenerator";

import { downloadFile } from "../services/reportExport";

interface Props {
  expenses: Expense[];
}

function SummaryExportButtons({ expenses }: Props) {
  function exportSummary() {
    const csv = generateSummaryCSV(expenses);

    downloadFile(csv, "expense-summary-report.csv", "text/csv;charset=utf-8;");
  }

  return <button onClick={exportSummary}>Export Summary Report</button>;
}

export default SummaryExportButtons;
