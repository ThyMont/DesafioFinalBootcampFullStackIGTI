import React from 'react';

export default function ButtonNext({ periods, currentPeriod, onClick }) {
  const index = periods.indexOf(currentPeriod);
  const enable = index <= periods.length - 2;

  const handleClick = () => {
    onClick(index + 1);
  };

  return (
    <a
      className={
        'waves-effect waves-light btn ' + (enable ? 'enabled' : 'disabled')
      }
      onClick={handleClick}
    >
      {'>'}
    </a>
  );
}
