import { useState, useRef, useEffect } from "react";
import "./Combobox.css";

export interface ComboboxOption {
  value: string;
  label: string;
  hint?: string;
}

interface Props {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
}

function Combobox({ options, value, onChange, placeholder, ariaLabel }: Props) {
  const selected = options.find((o) => o.value === value);
  const [query, setQuery] = useState(selected?.label ?? "");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = options.find((o) => o.value === value);
    setQuery(current?.label ?? "");
  }, [value, options]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        const current = options.find((o) => o.value === value);
        setQuery(current?.label ?? "");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [options, value]);

  const filtered = options.filter((o) =>
    `${o.label} ${o.value} ${o.hint ?? ""}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  function selectOption(option: ComboboxOption) {
    onChange(option.value);
    setQuery(option.label);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlight]) selectOption(filtered[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
      const current = options.find((o) => o.value === value);
      setQuery(current?.label ?? "");
    }
  }

  return (
    <div className="combobox" ref={rootRef}>
      <input
        type="text"
        className="combobox-input"
        value={query}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setHighlight(0);
        }}
        onKeyDown={handleKeyDown}
      />
      {open && (
        <ul className="combobox-list" role="listbox">
          {filtered.length === 0 && (
            <li className="combobox-empty">No matches</li>
          )}
          {filtered.map((option, i) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={
                "combobox-option" +
                (i === highlight ? " highlighted" : "") +
                (option.value === value ? " selected" : "")
              }
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setHighlight(i)}
              onClick={() => selectOption(option)}
            >
              <span>{option.label}</span>
              {option.hint && (
                <span className="combobox-hint">{option.hint}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Combobox;
