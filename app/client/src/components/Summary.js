import React from 'react';

export default function Summary({ summary }) {
  const { countTransactions, totalEarnings, totalCosts, balance } = summary;

  return (
    <div>
      Lançamentos: {countTransactions} | Receitas:{' '}
      <span style={{ color: '#1dd1a1', fontWeight: 'bold' }}>
        {totalEarnings}
      </span>{' '}
      | Despesas:
      <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
        {totalCosts}
      </span>{' '}
      | Saldo:
      <span style={colorValue(balance)}>{balance}</span>
    </div>
  );
}

function colorValue(value) {
  if (value >= 0) return { color: '#1dd1a1', fontWeight: 'bold' };
  if (value < 0) return { color: '#ff6b6b', fontWeight: 'bold' };
}
