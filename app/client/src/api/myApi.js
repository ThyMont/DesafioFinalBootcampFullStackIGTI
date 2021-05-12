import axios from 'axios';

const api = axios.create({ baseURL: 'api' });
const RESOURCE = '/transaction';

const getAllPeriods = async () => {
  try {
    const { data } = await api.get(`${RESOURCE}/allPeriods`);

    return data;
  } catch (error) {
    throw new Error('Servidor temporariamente indisponível');
  }
};

const getTransactionsByPeriod = async (period) => {
  try {
    const { data } = await api.get(`${RESOURCE}/?period=${period}`);
    return data;
  } catch (error) {
    throw new Error('Servidor temporariamente indisponível');
  }
};

const updateTransaction = async (transaction) => {
  try {
    const { _id } = transaction;
    const { data } = api.put(`${RESOURCE}/${_id}`, transaction);
    return data;
  } catch (error) {
    throw new Error('Servidor temporariamente indisponível');
  }
};

const postTransaction = async (transaction) => {
  try {
    const { data } = api.post(RESOURCE, transaction);
    return data;
  } catch (error) {
    throw new Error('Servidor temporariamente indisponível');
  }
};

const deleteTransaction = async (id) => {
  try {
    const { data } = api.delete(`${RESOURCE}/${id}`);
    return data;
  } catch (error) {
    throw new Error('Servidor temporariamente indisponível');
  }
};

export default {
  getAllPeriods,
  getTransactionsByPeriod,
  postTransaction,
  updateTransaction,
  deleteTransaction,
};
