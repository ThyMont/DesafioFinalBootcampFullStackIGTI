import React from 'react';

export default function Select({ periods, currentPeriod, onChange }) {
  const handleOnChange = (value) => {
    onChange(document.querySelector('#periods_select').value);
  };

  return (
    <select
      id="periods_select"
      name="periods"
      value={currentPeriod}
      className="browser-default"
      onChange={handleOnChange}
      style={{ margin: '0 10px 0 10px' }}
    >
      {periods.map((p) => {
        return (
          <option key={p} value={p}>
            {p}
          </option>
        );
      })}
    </select>
  );
}
