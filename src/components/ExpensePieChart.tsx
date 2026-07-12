import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface Props {
  data: {
    category: string;
    total: number;
  }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

function ExpensePieChart({ data }: Props) {
  if (data.length === 0) {
    return <p>No expense data available.</p>;
  }

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="total"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {data.map((item, index) => (
          <Cell key={item.category} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip />

      <Legend />
    </PieChart>
  );
}

export default ExpensePieChart;
