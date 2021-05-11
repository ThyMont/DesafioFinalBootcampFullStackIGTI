import React from 'react';

export default function TransactionCard({ transaction, onClick }) {
  const startEdit = () => {
    onClick(transaction);
  };

  return (
    <div className="col s12 m7">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content" style={{ display: 'inline-flex' }}>
            <div>
              <span
                style={{
                  fontWeight: 'bolder',
                  fontSize: '1.5em',
                  marginRight: '1em',
                }}
              >
                {transaction.day}
              </span>
            </div>
            <div style={{ width: '65%' }}>
              <p
                style={{
                  fontWeight: 'bolder',
                  fontSize: '1em',
                  textAlign: 'justify',
                }}
              >
                {transaction.category}
              </p>
              <p style={{ fontSize: '1em', textAlign: 'justify' }}>
                {transaction.description}
              </p>
            </div>
            <div style={{ width: '20%', textAlign: 'justify' }}>
              <span
                style={{
                  fontWeight: 'bolder',
                  fontSize: '1.5em',
                  marginRight: '1em',
                }}
              >
                R$ {transaction.value.toString()}
              </span>
            </div>
            <div>
              <a href="" style={{ marginRight: '1em' }} onClick={startEdit}>
                <i className="material-icons">border_color</i>
              </a>
              <a href="">
                <i className="material-icons">cancel</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
