import "./CategoryCard.css";

interface Props {
  category: string;

  total: number;

  percentage: string | number;
}

function CategoryCard({
  category,

  total,

  percentage,
}: Props) {
  return (
    <div className="category-card">
      <h3>{category}</h3>

      <p>RM {total}</p>

      <p>{percentage}%</p>
    </div>
  );
}

export default CategoryCard;
