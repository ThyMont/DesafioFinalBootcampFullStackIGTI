import axios from 'axios';

const api = axios.create({ baseURL: 'api' });
const RESOURCE = '/transaction';
const MONTHS_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const MONTH_DESCRIPTIONS = [
  '',
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

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

const postTransaction = async (transaction) => {
  try {
    const { data } = api.post(RESOURCE, transaction);
    return data;
  } catch (error) {
    throw new Error('Servidor temporariamente indisponível');
  }
};

export default {
  getAllPeriods,
  getTransactionsByPeriod,
  postTransaction,
};
