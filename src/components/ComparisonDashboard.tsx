import "./ComparisonDashboard.css";

interface CategoryComparison {
  category: string;

  periodATotal: number;

  periodBTotal: number;

  difference: number;

  percentage: string;
}

interface Props {
  periodA: string;

  setPeriodA: (value: string) => void;

  periodB: string;

  setPeriodB: (value: string) => void;

  availablePeriods: string[];

  totalA: number;

  totalB: number;

  comparisons: CategoryComparison[];

  setErrorMessage: (message: string) => void;

  errorMessage: string;
}

function ComparisonDashboard({
  periodA,
  setPeriodA,
  periodB,
  setPeriodB,
  availablePeriods,
  totalA,
  totalB,
  comparisons,
  errorMessage,
  setErrorMessage,
}: Props) {
  const difference = Math.abs(totalB - totalA);
  const compareToPeriods = availablePeriods.filter(
    (period) => period > periodA,
  );

  if (compareToPeriods.length === 0 && periodA) {
    setErrorMessage("No later period available for comparison");
  }
  const percentage =
    totalA === 0
      ? "0"
      : Math.abs(((totalB - totalA) / totalA) * 100).toFixed(2);

  return (
    <div className="comparison-dashboard">
      <h2>Compare Periods</h2>

      <div className="period-selector">
        <div>
          <label>Compare From</label>

          <select
            value={periodA}
            onChange={(e) => {
              const selected = e.target.value;

              setPeriodA(selected);

              if (periodB && selected >= periodB) {
                setPeriodB("");

                setErrorMessage(
                  "Compare To period must be later than Compare From period",
                );
              }
            }}
          >
            {availablePeriods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Compare To</label>

          <select
            value={periodB}
            onChange={(e) => {
              setPeriodB(e.target.value);
              setErrorMessage("");
            }}
          >
            {compareToPeriods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
          {errorMessage && <p className="comparison-error">{errorMessage}</p>}
        </div>
      </div>

      <div className="comparison-summary">
        <div className="comparison-card">
          <h3>{periodA}</h3>

          <p>RM {totalA}</p>
        </div>

        <div className="comparison-card">
          <h3>{periodB}</h3>

          <p>RM {totalB}</p>
        </div>

        <div className="comparison-card">
          <h3>Difference</h3>

          <p>RM {difference}</p>

          <small>
            {totalB > totalA
              ? `Increase +${percentage}%`
              : `Decrease -${percentage}%`}
          </small>
        </div>
      </div>

      <h3>Category Comparison</h3>

      <div className="comparison-table">
        <div className="comparison-header">
          <span>Category</span>

          <span>{periodA}</span>

          <span>{periodB}</span>

          <span>Change</span>
        </div>

        {comparisons.map((item) => (
          <div className="comparison-row" key={item.category}>
            <span>{item.category}</span>
            <span>RM {item.periodATotal}</span>
            <span>RM {item.periodBTotal}</span>
            <span>
              RM {Math.abs(item.difference)}{" "}
              {item.percentage === "NEW"
                ? "(New spending)"
                : `(${item.difference >= 0 ? "+" : ""}${item.percentage}%)`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComparisonDashboard;
