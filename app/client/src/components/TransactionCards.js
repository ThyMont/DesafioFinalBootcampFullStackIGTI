import React from 'react';
import TransactionCard from './TransactionCard';

export default function TransactionCards({ transactions, onClick }) {
  transactions.sort((a, b) => a.day - b.day);
  return (
    <div style={{ marginTop: '1.5em' }}>
      {transactions.map((transaction) => {
        return (
          <TransactionCard
            key={transaction._id}
            transactionID={transaction._id}
            transaction={transaction}
            onClick={onClick}
          ></TransactionCard>
        );
      })}
    </div>
  );
}
