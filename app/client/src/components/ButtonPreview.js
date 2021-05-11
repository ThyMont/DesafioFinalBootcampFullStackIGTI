import React from 'react';

export default function ButtonPreview({ periods, currentPeriod, onClick }) {
  const index = periods.indexOf(currentPeriod);
  const enable = index > 0;

  const handleClick = () => {
    onClick(index - 1);
  };

  return (
    <button
      className={
        'waves-effect waves-light btn ' + (enable ? 'enabled' : 'disabled')
      }
      onClick={handleClick}
    >
      {'<'}
    </button>
  );
}
