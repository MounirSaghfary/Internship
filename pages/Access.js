import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';


const AccessCodeScreen = () => {
    let em = null
    const router = useRouter();
    useEffect(() => {
      const { email } = router.query;
      em=email
      console.log('Email:', email);
      console.log('hhhhhhhhhhh')
    }, []);

  const [accessCode, setAccessCode] = useState('');
  const [accessError, setAccessError] = useState(false);

  const handleAccessBudget = () => {
    if (accessCode === '0000') {
        router.push(`/Budget?email=${em}`);
    } else {
      setAccessError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <Head>
        <title>Access</title>
    </Head>
      <h1 className="text-3xl font-bold mb-6">Access Budget</h1>
      <div className="flex flex-col items-center">
        <label htmlFor="accessCode" className="text-lg mb-2">Enter Access Code:</label>
        <input
          id="accessCode"
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none"
          placeholder="Access Code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
        {accessError && <p className="text-red-500 mb-4">Incorrect access code. Please try again.</p>}
        <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={handleAccessBudget}>
          Access Budget
        </button>
      </div>
    </div>
  );
};

export default AccessCodeScreen;
