import React, { useEffect, useState } from 'react';
import api from './api/myApi';
import ButtonNext from './components/ButtonNext';
import ButtonPreview from './components/ButtonPreview';
import Header from './components/Header';
import Loader from './components/Loader';
import Select from './components/Select';

export default function App() {
  const [allPeriods, setAllPeriods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [filterText, setFilterText] = useState('');

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [summary, setSummary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllPeriods = async () => {
      const data = await api.getAllPeriods();
      setAllPeriods(data);
      setCurrentPeriod(getCurrentPeriod(data));
    };
    getAllPeriods();
  }, []);

  useEffect(() => {
    if (!currentPeriod) {
      return;
    }
    setTransactions([]);
    const localTransactions = async () => {
      const data = await api.getTransactionsByPeriod(currentPeriod);
      setTransactions(data);
    };
    localTransactions();
    setIsLoading(false);
  }, [currentPeriod]);

  const handleButtonEvent = (newIndex) => {
    const localPeriod = allPeriods[newIndex];
    setCurrentPeriod(localPeriod);
  };
  const handleChange = (period) => {
    setCurrentPeriod(period);
  };
  console.log(transactions);

  return isLoading ? (
    <div className="container" style={{ textAlign: 'center' }}>
      <Loader />
    </div>
  ) : (
    <div
      className="container"
      style={{ textAlign: 'center', alignItems: 'center' }}
    >
      <Header />
      <div
        style={{
          display: 'flex',
          width: '30%',
          margin: 'auto',
          marginTop: '1.5em',
        }}
      >
        <ButtonPreview
          onClick={handleButtonEvent}
          periods={allPeriods}
          currentPeriod={currentPeriod}
        ></ButtonPreview>
        <Select
          periods={allPeriods}
          currentPeriod={currentPeriod}
          onChange={handleChange}
        ></Select>
        <ButtonNext
          onClick={handleButtonEvent}
          periods={allPeriods}
          currentPeriod={currentPeriod}
        ></ButtonNext>
      </div>
    </div>
  );
}

function getCurrentPeriod(data) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const yearMonth = `${year.toString().padStart(4, 0)}-${month
    .toString()
    .padStart(2, 0)}`;

  const currentPeriod = data.find((period) => period === yearMonth);
  return currentPeriod || { ...data[0] };
}

function firstGetCurrentPeriod() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const yearMonth = `${year.toString().padStart(4, 0)}-${month
    .toString()
    .padStart(2, 0)}`;
  return yearMonth;
}
