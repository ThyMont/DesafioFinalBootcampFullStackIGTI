import React from 'react';

export default function Select({ periods, currentPeriod, onChange }) {
  const handleOnChange = (value) => {
    onChange(document.querySelector('#periods_select').value);
  };

  const MONTH_DESCRIPTIONS = [
    '',
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  const periodName = (period) => {
    const p = period.split('-');
    const name = `${MONTH_DESCRIPTIONS[parseInt(p[1])]} / ${p[0]}`;
    return name;
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
            {periodName(p)}
          </option>
        );
      })}
    </select>
  );
}
