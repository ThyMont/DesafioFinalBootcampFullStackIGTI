import React, { useEffect, useState } from 'react';
import api from './api/myApi';
import ButtonNewTransaction from './components/ButtonNewTransaction';
import ButtonNext from './components/ButtonNext';
import ButtonPreview from './components/ButtonPreview';
import Header from './components/Header';
import Loader from './components/Loader';
import ModalInsert from './components/ModalInsert';
import ModalUpdate from './components/ModalUpdate';
import Select from './components/Select';
import Summary from './components/Summary';
import TextFilter from './components/TextFilter';
import TransactionCards from './components/TransactionCards';

export default function App() {
  const [allPeriods, setAllPeriods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [filterText, setFilterText] = useState('');

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [summary, setSummary] = useState(null);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);
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
      setFilteredTransactions(data);
    };
    localTransactions();
    setIsLoading(false);
  }, [currentPeriod, isNewTransactionModalOpen, isEditTransactionModalOpen]);

  useEffect(() => {
    const summary = {};
    summary.countTransactions = filteredTransactions.length;
    summary.totalEarnings = filteredTransactions
      .filter((transaction) => transaction.type === '+')
      .reduce((acc, a) => {
        return a.value + acc;
      }, 0);
    summary.totalCosts = filteredTransactions
      .filter((transaction) => transaction.type === '-')
      .reduce((acc, a) => {
        return a.value + acc;
      }, 0);
    summary.balance = summary.totalEarnings - summary.totalCosts;

    setSummary(summary);
  }, [filteredTransactions]);

  useEffect(() => {
    if (filterText.trim() === '') {
      setFilteredTransactions([...transactions]);
    } else {
      const lowerCaseFilter = filterText.toLowerCase();

      const newFilteredTransactions = transactions.filter((transaction) => {
        const description = transaction.description.toLowerCase();
        return description.includes(lowerCaseFilter);
      });

      setFilteredTransactions(newFilteredTransactions);
    }
  }, [filterText, transactions]);

  const handleButtonEvent = (newIndex) => {
    const localPeriod = allPeriods[newIndex];
    setCurrentPeriod(localPeriod);
  };
  const handleChange = (period) => {
    setCurrentPeriod(period);
  };

  const handleOpenTransactionModal = () => {
    setIsNewTransactionModalOpen(true);
  };

  const handleOpenEditTransactionModal = (id) => {
    const localSelectedTransaction = filteredTransactions.find(
      (t) => t._id === id
    );
    setSelectedTransaction(localSelectedTransaction);
    setIsEditTransactionModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTransaction(null);
    setIsNewTransactionModalOpen(false);
    setIsEditTransactionModalOpen(false);
  };

  const handleSave = (newTransaction, mode) => {
    if (mode === 'insert') {
      api.postTransaction(newTransaction);
      setTransactions([]);
      setIsNewTransactionModalOpen(false);
      return;
    }
    if (mode === 'update') {
      const updatedTransaction = api.updateTransaction(newTransaction);
      const newTransactions = [...transactions];
      const index = newTransactions.indexOf(
        (t) => t._id === newTransaction._id
      );
      newTransactions[index] = updatedTransaction;
      setTransactions(newTransactions);
      setFilteredTransactions(newTransactions);

      setIsEditTransactionModalOpen(false);
      return;
    }

    setIsEditTransactionModalOpen(false);
  };

  const handleDeleteTransaction = (id) => {
    api.deleteTransaction(id);
    const newTransactions = transactions.filter((t) => t._id !== id);
    setTransactions(newTransactions);
    setFilteredTransactions(newTransactions);
    return;
  };

  const handleTextChange = (text) => {
    setFilterText(text);
  };

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
      <Summary summary={summary}></Summary>
      <div style={{ marginTop: '2em' }}>
        <ButtonNewTransaction
          onClick={handleOpenTransactionModal}
        ></ButtonNewTransaction>
        <TextFilter onChange={handleTextChange}></TextFilter>
      </div>
      {isNewTransactionModalOpen && (
        <ModalInsert
          isModalOpen={isNewTransactionModalOpen}
          handleClose={handleModalClose}
          onSave={handleSave}
        ></ModalInsert>
      )}
      {isEditTransactionModalOpen && (
        <ModalUpdate
          isModalOpen={isEditTransactionModalOpen}
          handleClose={handleModalClose}
          onSave={handleSave}
          selectedTransaction={selectedTransaction}
        ></ModalUpdate>
      )}
      <TransactionCards
        onClick={handleOpenEditTransactionModal}
        doDelete={handleDeleteTransaction}
        transactions={filteredTransactions}
      ></TransactionCards>
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
