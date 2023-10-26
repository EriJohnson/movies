import { useEffect, useState } from 'react';

import './styles.css';

interface SearchInputProps {
  onChange: (value: string) => void;
}

export default function SearchInput({ onChange }: SearchInputProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => onChange(value), 500);

    return () => clearTimeout(timer);
  }, [value, onChange]);

  function handleSearchInputKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      setValue('');
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <input
      className="search-input"
      value={value}
      onChange={handleChange}
      onKeyDown={handleSearchInputKeyDown}
      placeholder="Busque um filme por nome..."
    />
  );
}
