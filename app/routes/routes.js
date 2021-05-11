const express = require('express');
const transactionRouter = express.Router();
const service = require('../services/transactionService');

transactionRouter.get('/', async (req, res) => {
  const { query } = req;

  try {
    if (!query.period || !validatePeriod(query.period)) {
      throw new Error(
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm'
      );
    }

    const { period } = query;
    const transactions = await service.getTransactions(period);
    res.send(transactions);
  } catch ({ message }) {
    res.status(400).send(message);
  }
});

transactionRouter.get('/allPeriods', async (req, res) => {
  try {
    const periods = await service.getAllPeriods();
    res.send(periods);
  } catch ({ message }) {
    res.status(400).send(message);
  }
});

transactionRouter.post('/', async (req, res) => {
  const { body } = req;
  try {
    const newTransaction = validadeTransaction(body);
    const saveTransaction = await service.postTransaction(newTransaction);
    res.send(saveTransaction);
  } catch ({ message }) {
    res.status(400).send(message);
  }
});

transactionRouter.put('/:id', async (req, res) => {
  const { body, params } = req;
  try {
    if (!params.id) {
      throw new Error('É necessário informar o ID');
    }
    const updateTransaction = validadeTransaction(body);
    const { id } = params;

    const saveTransaction = await service.updateTransaction(
      id,
      updateTransaction
    );
    res.send({ status: 'Update finalizado', transaction: saveTransaction });
  } catch ({ message }) {
    res.status(400).send(message);
  }
});

transactionRouter.delete('/:id', async (req, res) => {
  const { params } = req;
  try {
    if (!params.id) {
      throw new Error('É necessário informar o ID');
    }
    const { id } = params;

    await service.deleteTransaction(id);
    res.send({
      status: 'ok',
      message: `Transação com id "${id}" deletada com sucesso`,
    });
  } catch ({ message }) {
    res.status(404).send(message);
  }
});

function validadeTransaction(body) {
  const {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  } = body;

  if (!description || description.trim() === '') {
    throw new Error('Preencha a descrição');
  }
  if (!value || value < 0) {
    throw new Error('O valor é obrigatório e não pode ser menor que 0');
  }
  if (!category || category.trim() === '') {
    throw new Error('Preencha a categoria');
  }
  if (!year || year.toString() === '') {
    throw new Error('O Ano é obrigatório');
  }
  if (!month || month.toString() === '') {
    throw new Error('O Mês é obrigatório');
  }
  if (!day || day.toString() === '') {
    throw new Error('O Dia é obrigatório');
  }
  if (!type || type.trim() === '') {
    throw new Error('O tipo é obrigatório');
  }

  const newTransaction = {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  };

  newTransaction.yearMonth = `${year.toString().padStart(4, 0)}-${month
    .toString()
    .padStart(2, 0)}`;
  newTransaction.yearMonthDay = `${year.toString().padStart(4, 0)}-${month
    .toString()
    .padStart(2, 0)}-${day.toString().padStart(2, 0)}`;

  return newTransaction;
}

function validatePeriod(period) {
  if (
    period.length === 7 &&
    period.indexOf('-') === 4 &&
    !isNaN(period.replace('-', ''))
  ) {
    return true;
  } else {
    return false;
  }
}

module.exports = transactionRouter;
