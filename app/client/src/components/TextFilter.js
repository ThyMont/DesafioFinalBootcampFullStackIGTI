import React from 'react';

export default function TextFilter({ onChange }) {
  const handleTextChange = () => {
    const text = document.querySelector('#filterText').value;
    onChange(text);
  };

  return (
    <div>
      <input
        name="description"
        type="text"
        id="filterText"
        placeholder="Filtro"
        autoComplete="off"
        onChange={handleTextChange}
      />
    </div>
  );
}
