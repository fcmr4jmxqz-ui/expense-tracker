interface Props {
  sortOption: string;

  setSortOption: (value: string) => void;
}

function SortSelector({
  sortOption,

  setSortOption,
}: Props) {
  return (
    <div>
      <label>Order By: </label>

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="date-desc">Newest Date</option>

        <option value="date-asc">Oldest Date</option>

        <option value="amount-desc">Amount High → Low</option>

        <option value="amount-asc">Amount Low → High</option>

        <option value="name-asc">Name A → Z</option>

        <option value="name-desc">Name Z → A</option>
      </select>
    </div>
  );
}

export default SortSelector;
