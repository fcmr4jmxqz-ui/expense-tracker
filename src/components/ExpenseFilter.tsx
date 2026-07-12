interface Props {
  filterCategory: string;

  setFilterCategory: (category: string) => void;
}

function ExpenseFilter({
  filterCategory,

  setFilterCategory,
}: Props) {
  return (
    <div>
      <label>Category: </label>

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="All">All</option>

        <option value="Food">Food</option>

        <option value="Transport">Transport</option>

        <option value="Shopping">Shopping</option>

        <option value="Bills">Bills</option>

        <option value="Entertainment">Entertainment</option>

        <option value="Others">Others</option>
      </select>
    </div>
  );
}

export default ExpenseFilter;
