import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const AddPurchase = () => {
  const router = useRouter();
  let em =null
  useEffect(() => {
    const { email } = router.query;
    em=email
    console.log('Email:', email);
    console.log('hhhhhhhhhhh')
  }, []);

  const [reference, setReference] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemUP, setItemUP] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [distributor, setDistributor] = useState('');
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  let total;

  const calculateTotal = () => {
    total = itemUP * itemQuantity;
    return itemUP * itemQuantity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/prc', {
        reference,
        itemName,
        itemDescription,
        itemUP,
        itemQuantity,
        total: calculateTotal(),
        distributor,
        category,
        email,
      });

      // Reset form fields after successful submission
      setReference('');
      setItemName('');
      setItemDescription('');
      setItemUP('');
      setItemQuantity('');
      setDistributor('');
      setCategory('');
      setEmail('');
    } catch (err) {
      console.error(err);
    }

    try {
        await axios.put(`/api/bdg?total=${total}`);
      } catch (err) {
        console.error(err);
      }

    try {
      await axios.put(`/api/ctg?total=${total}&category=${category}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-purchase-container" style={{ display: 'flex', justifyContent: 'center' }}>
      <Head>
        <title>New Purchase</title>
      </Head>
      <div style={{ width: '400px', margin: '20px' }}>
        <h1 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>Add Purchase</h1>
        <form className="purchase-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reference" style={{ fontWeight: 'bold', color: '#555' }}>Reference:</label>
            <input
              type="text"
              id="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemName" style={{ fontWeight: 'bold', color: '#555' }}>Item Name:</label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemDescription" style={{ fontWeight: 'bold', color: '#555' }}>Item Description:</label>
            <input
              type="text"
              id="itemDescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemUP" style={{ fontWeight: 'bold', color: '#555' }}>Item UP:</label>
            <input
              type="number"
              id="itemUP"
              value={itemUP}
              onChange={(e) => setItemUP(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemQuantity" style={{ fontWeight: 'bold', color: '#555' }}>Item Quantity:</label>
            <input
              type="number"
              id="itemQuantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="total" style={{ fontWeight: 'bold', color: '#555' }}>Total:</label>
            <input
              type="number"
              id="total"
              value={calculateTotal()}
              readOnly
              style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="distributor" style={{ fontWeight: 'bold', color: '#555' }}>Distributor:</label>
            <input
              type="text"
              id="distributor"
              value={distributor}
              onChange={(e) => setDistributor(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" style={{ fontWeight: 'bold', color: '#555' }}>Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">Select a category</option>
              <option value="Laptops">Laptops</option>
              <option value="Servers">Servers</option>
              <option value="Operational">Operational</option>
              <option value="Contingency">Contingency</option>
              <option value="Software">Software</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email" style={{ fontWeight: 'bold', color: '#555' }}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Add Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPurchase;
