interface Props {
  searchTerm: string;

  setSearchTerm: (value: string) => void;
}

function SearchBar({
  searchTerm,

  setSearchTerm,
}: Props) {
  return (
    <div>
      <label>Search: </label>

      <input
        type="text"
        placeholder="Search expense..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
