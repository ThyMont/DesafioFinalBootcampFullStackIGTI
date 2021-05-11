import React from 'react';

export default function ButtonNewTransaction({ onClick }) {
  return (
    <div>
      <button
        className="waves-effect waves-light btn-large"
        onClick={onClick}
        data-target="modal1"
        style={{ zIndex: '0' }}
      >
        <i className="material-icons left">add_circle_outline</i>
        Novo Lançamento
      </button>
    </div>
  );
}
