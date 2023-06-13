import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const AccessCodeScreen = () => {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState('');
  const [accessError, setAccessError] = useState(false);

  useEffect(() => {
    const { email } = router.query;
    console.log('Email:', email);
  }, [router.query]);

  const handleAccessBudget = () => {
    if (accessCode === '0000') {
      router.push({
        pathname: '/PurachasesAdmin',
        query: { email: router.query.email },
      });
    } else if (accessCode === '9999') {
      router.push({
        pathname: '/Purchases',
        query: { email: router.query.email },
      });
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
        <label htmlFor="accessCode" className="text-lg mb-2">
          Enter Access Code:
        </label>
        <input
          id="accessCode"
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none"
          placeholder="Access Code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
        {accessError && (
          <p className="text-red-500 mb-4">Incorrect access code. Please try again.</p>
        )}
        <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={handleAccessBudget}>
          Access Budget
        </button>
      </div>
    </div>
  );
};

export default AccessCodeScreen;
