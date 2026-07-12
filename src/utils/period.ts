// Shared helpers for working with "YYYY-MM" period keys derived from expense dates.

export function getPeriod(date: string): string {
  const expenseDate = new Date(date);
  const year = expenseDate.getFullYear();
  const month = String(expenseDate.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function formatPeriod(period: string): string {
  if (period === "All") return "All Time";

  const [year, month] = period.split("-");
  const date = new Date(Number(year), Number(month) - 1);

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function formatPeriodShort(period: string): string {
  const [year, month] = period.split("-");
  const date = new Date(Number(year), Number(month) - 1);

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function getAvailablePeriods(dates: string[]): string[] {
  return [...new Set(dates.map(getPeriod))].sort((a, b) => b.localeCompare(a));
}
