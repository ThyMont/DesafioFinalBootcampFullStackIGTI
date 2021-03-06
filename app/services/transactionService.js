const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const TransactionModel = require('../models/TransactionModel');
function extractCleanTransactionFrom(mongoDbTransaction) {
  const {
    _id,
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  } = mongoDbTransaction;

  const returnedTransaction = {
    _id,
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

  return returnedTransaction;
}

async function getTransactions(period) {
  const transactions = await TransactionModel.find({ yearMonth: period });
  return transactions;
}

async function postTransaction(transaction) {
  const newTransactionMongoDB = await TransactionModel.create(transaction);

  const newTransaction = extractCleanTransactionFrom(newTransactionMongoDB);
  return newTransaction;
}

async function updateTransaction(_id, transaction) {
  await TransactionModel.updateOne({ _id: ObjectId(_id) }, transaction);
  return { _id, ...transaction };
}

async function deleteTransaction(_id) {
  await TransactionModel.deleteOne({ _id: ObjectId(_id) });
  return true;
}

async function getAllPeriods() {
  const periods = await TransactionModel.distinct('yearMonth');
  return periods;
}

module.exports = {
  getTransactions,
  postTransaction,
  deleteTransaction,
  updateTransaction,
  getAllPeriods,
};
