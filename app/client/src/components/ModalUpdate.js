import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalUpdate({
  isModalOpen,
  handleClose,
  onSave,
  selectedTransaction,
}) {
  const [mode] = useState('update');
  const { _id, description, value, category, year, month, day, type } =
    selectedTransaction;

  const defaultToday = `${year}-${month.toString().padStart(2, 0)}-${day
    .toString()
    .padStart(2, 0)}`;

  const handleSave = (event) => {
    event.preventDefault();
    const formDescription = document.getElementById('formDescription').value;
    const formValue = document.getElementById('formValue').value;
    const formDate = document.getElementById('formDate').value.split('-');
    const formCategory = document.getElementById('formCategory').value;
    const formType = document.querySelector(
      'input[name="expense-earning"]:checked'
    ).value;

    const newTransaction = {
      _id: _id,
      description: formDescription,
      value: formValue,
      category: formCategory,
      day: formDate[2],
      month: formDate[1],
      year: formDate[0],
      type: formType,
    };

    onSave(newTransaction, mode);
  };

  return (
    <Modal isOpen={isModalOpen} contentLabel={'Editar Lançamento'}>
      <div>
        <button
          className="deep-orange darken-1 btn-large"
          style={{ float: 'right' }}
          onClick={handleClose}
        >
          X
        </button>
        <h3>Edição de lançamento </h3>
        <form onSubmit={handleSave}>
          <div style={{ textAlign: 'center' }}>
            <label style={{ margin: '20px' }}>
              <input
                name="expense-earning"
                type="radio"
                value={type}
                checked
                readOnly
              />
              <span>{type === '-' ? 'Despesa' : 'Receita'}</span>
            </label>
          </div>
          <label>
            <span>Descrição</span>
            <input
              name="description"
              type="text"
              id="formDescription"
              defaultValue={description}
              required
            />
          </label>
          <label>
            <span>Categoria</span>
            <input
              name="category"
              type="text"
              id="formCategory"
              defaultValue={category}
              required
            />
          </label>
          <label>
            <span>Valor</span>
            <input
              name="description"
              type="number"
              id="formValue"
              defaultValue={value}
              required
            />
          </label>
          <label>
            <span>Data</span>
            <input
              name="description"
              type="date"
              id="formDate"
              defaultValue={defaultToday}
              required
            />
          </label>

          <input
            type="submit"
            className="light-blue accent-1 btn-large"
            style={{ marginTop: '2em' }}
            value="Salvar"
          ></input>
        </form>
      </div>
    </Modal>
  );
}
