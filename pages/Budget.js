import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

const Budget = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetResponse, categoryResponse] = await Promise.all([
          axios.get('/api/bdg'),
          axios.get('/api/ctg')
        ]);
        setBudgetData(budgetResponse.data);
        setCategoryData(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredCategoryData = categoryData.filter(
    (category) => category.Year === parseInt(selectedYear)
  );

  const selectedBudget = budgetData.find(
    (budget) => budget.Year === parseInt(selectedYear)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Head>
        <title>Budget</title>
      </Head>
      <h1 style={{ fontSize: '2.5rem', color: 'black', marginBottom: '1rem' }}>
        Budget {selectedYear}
      </h1>
      <select
        value={selectedYear}
        onChange={handleYearChange}
        style={{
          fontSize: '1.5rem',
          backgroundColor: 'lightgray',
          padding: '0.5rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}
      >
        <option value="">Select Year</option>
        {budgetData.map((budget) => (
          <option key={budget.Year} value={budget.Year}>
            {budget.Year}
          </option>
        ))}
      </select>

      {selectedBudget && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', color: 'green' }}>Budget Overview</h2>
          <p style={{ fontSize: '1.5rem' }}>Initial: {selectedBudget.Initial} MAD</p>
          <p style={{ fontSize: '1.5rem' }}>Spent: {selectedBudget.Spent} MAD</p>
          <p style={{ fontSize: '1.5rem' }}>Rest: {selectedBudget.Rest} MAD</p>
        </div>
      )}

      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '1rem', fontSize: '1.5rem' }}>
              Category
            </th>
            <th style={{ border: '1px solid black', padding: '1rem', fontSize: '1.5rem' }}>
              Initial Budget
            </th>
            <th style={{ border: '1px solid black', padding: '1rem', fontSize: '1.5rem' }}>
              Spent Budget
            </th>
            <th style={{ border: '1px solid black', padding: '1rem', fontSize: '1.5rem' }}>
              Rest Budget
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCategoryData.map((category) => (
            <tr key={category.Category}>
              <td style={{ border: '1px solid black', padding: '1rem', fontSize: '1.5rem' }}>
                {category.Category}
              </td>
              <td style={{ border: '1px solid black', padding: '1rem', fontSize: '1.5rem' }}>
                {category.Initial_Budget} MAD
              </td>
              <td style={{ border: '1px solid black', padding: '1rem', fontSize: '1.5rem' }}>
                {category.Spent_Budget}
              </td>
              <td style={{ border: '1px solid black', padding: '1rem', fontSize: '1.5rem' }}>
                {category.Rest_Budget}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Budget;
