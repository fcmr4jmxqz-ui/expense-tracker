import SummaryPeriodSelector from "./SummaryPeriodSelector";
import CategoryCard from "./CategoryCard";
import ExpensePieChart from "./ExpensePieChart";
interface CategoryTotal {
  category: string;

  total: number;

  percentage: string | number;
}

interface Props {
  categoryTotals: CategoryTotal[];

  totalAmount: number;

  summaryPeriod: string;

  setSummaryPeriod: (period: string) => void;

  availablePeriods: string[];

  categoryCount: number;

  highestCategory: {
    category: string;
    total: number;
  } | null;
}

function SummaryDashboard({
  categoryTotals,

  totalAmount,

  summaryPeriod,

  setSummaryPeriod,

  availablePeriods,

  categoryCount,

  highestCategory,
}: Props) {
  return (
    <div>
      <h2>Summary Dashboard</h2>

      <SummaryPeriodSelector
        summaryPeriod={summaryPeriod}
        setSummaryPeriod={setSummaryPeriod}
        availablePeriods={availablePeriods}
      />

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Spending</h3>

          <p>RM {totalAmount}</p>
        </div>

        <div className="summary-card">
          <h3>Categories</h3>

          <p>{categoryCount}</p>
        </div>

        <div className="summary-card">
          <h3>Highest Spending</h3>

          <p>{highestCategory ? highestCategory.category : "No Data"}</p>

          <p>RM {highestCategory ? highestCategory.total : 0}</p>
        </div>
      </div>
      <h2>Category Distribution</h2>

      <ExpensePieChart data={categoryTotals} />
      <div className="category-container">
        {categoryTotals.map((item) => (
          <CategoryCard
            key={item.category}
            category={item.category}
            total={item.total}
            percentage={item.percentage}
          />
        ))}
      </div>
    </div>
  );
}

export default SummaryDashboard;
