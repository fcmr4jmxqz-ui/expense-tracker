interface Props {
  filterPeriod: string;
  setFilterPeriod: (period: string) => void;
  availablePeriods: string[];
}

function PeriodFilter({
  filterPeriod,
  setFilterPeriod,
  availablePeriods,
}: Props) {
  function formatPeriod(period: string) {
    if (period === "All") {
      return "All Period";
    }

    const [year, month] = period.split("-");

    const date = new Date(Number(year), Number(month) - 1);

    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  return (
    <select
      value={filterPeriod}
      onChange={(e) => setFilterPeriod(e.target.value)}
    >
      <option value="All">All Period</option>

      {availablePeriods.map((period) => (
        <option key={period} value={period}>
          {formatPeriod(period)}
        </option>
      ))}
    </select>
  );
}

export default PeriodFilter;
