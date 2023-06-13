import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Budget = () => {
  const router = useRouter();
  let em = null
  let a = 'o'
  useEffect(() => {
    const { email } = router.query;
    em=email
    console.log('Email:', email);
    console.log('hhhhhhhhhhh')
  }, []);

  const [purchaseData, setPurchaseData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/prc?email=${em}&a=${a}`);
        setPurchaseData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredPurchaseData = purchaseData.filter(
    (purchase) => purchase.purchaseyear === parseInt(selectedYear)
  );

  const handleAdd = () => {
    router.push(`/AddPurchase?email=${em}`);
  };


  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Head>
        <title>
            Purchases
        </title>
      </Head>
        <div>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Purchases</h1>
          <button onClick={handleAdd} className="px-4 py-2 pl-8 pr-8 mb-10 text-white bg-green-500 rounded"> Add Purchase</button>
        </div>

      <select
        style={{ padding: '8px', marginBottom: '20px' }}
        value={selectedYear}
        onChange={handleYearChange}
      >
        <option value="">Select Year</option>
        {/* Assuming available years can be extracted from the purchase data */}
        {[...new Set(purchaseData.map((purchase) => purchase.purchaseyear))].map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {filteredPurchaseData.length > 0 ? (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold', padding: '8px' }}>
                ID
              </th>
              <th style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold', padding: '8px' }}>
                Year
              </th>
              <th style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold', padding: '8px' }}>
                Created At
              </th>
              <th style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold', padding: '8px' }}>
                Reference
              </th>
              <th style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold', padding: '8px' }}>
                Item Name
              </th>
              <th style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold', padding: '8px' }}>
                Item Description
              </th>
              <th style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold', padding: '8px' }}>
                Item UP
              </th>
              <th style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold', padding: '8px' }}>
                Item Quantity
              </th>
              <th style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold', padding: '8px' }}>
                Total
              </th>
              <th style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold', padding: '8px' }}>
                Distributor
              </th>
              <th style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold', padding: '8px' }}>
                Category
              </th>
              <th style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold', padding: '8px' }}>
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchaseData.map((purchase) => (
              <tr key={purchase.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {purchase.id}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {purchase.purchaseyear}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {purchase.created_at}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {purchase.reference}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {purchase.item_name}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {purchase.item_description}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {purchase.item_UP} MAD
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {purchase.item_quantity}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {purchase.total} MAD
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {purchase.distributor}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {purchase.category}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {purchase.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ fontStyle: 'italic', color: '#888', marginTop: '20px' }}>
          No purchases available for the selected year.
        </p>
      )}
    </div>
  );
};

export default Budget;
