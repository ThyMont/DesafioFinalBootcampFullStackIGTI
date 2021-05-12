import React from 'react';

export default function TransactionCard({
  transaction,
  onClick,
  transactionID,
  doDelete,
}) {
  const startEdit = () => {
    onClick(transactionID);
  };
  const handleDelete = () => {
    doDelete(transactionID);
  };

  const COLOR = transaction.type === '-' ? 'red lighten-4' : 'green accent-1';

  return (
    <div className="col s12 m7 ">
      <div className="card horizontal">
        <div className="card-stacked">
          <div
            className={`${COLOR} card-content`}
            style={{ display: 'inline-flex' }}
          >
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
            <div style={{ width: '60%' }}>
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
            <div style={{ width: '20%', textAlign: 'right' }}>
              <button
                data-target="modal1"
                style={{ marginRight: '1em' }}
                onClick={startEdit}
              >
                <i className="material-icons">border_color</i>
              </button>
              <button onClick={handleDelete}>
                <i className="material-icons">cancel</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
