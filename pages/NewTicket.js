import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const NewTicket = () => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [issue, setIssue] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle ticket submission

    // Reset form fields
    setEmail('');
    setTitle('');
    setIssue('');
    setPriority('Low');
  };

  return (
    <div>
      <Head>
        <title>Features</title> 
      </Head>

      <nav className="flex items-center flex-wrap p-6 absolute">
        <div className="flex items-center flex-shrink-0 font-extrabold text-black mr-40">
          <Image src={require('./Assets/Logo.png')} alt="GIF Image" width={200} height={100} />
        </div>
        <div className="flex space-x-4" style={{ paddingTop: 5 }}>
          <Link href="/Tasks">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 mr-20 px-4 py-2 rounded">Tasks</li>
          </Link>
          <Link href="/Features">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 mr-20 px-4 py-2 rounded">Features</li>
          </Link>
          <Link href="/Tickets">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 mr-20 px-4 py-2 rounded">Tickets</li>
          </Link>
          <Link href="/ContactUs">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 mr-40 px-4 py-2 rounded" style={{ paddingRight: 15 }}>Contact Us</li>
          </Link>
          <Link href="/">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-black bg-blue-100 hover:text-white mr-20 bg-Sky-100 hover:bg-violet-100 px-4 py-2 rounded" style={{ paddingRight: 15 }}>Log out</li>
          </Link>
        </div>
      </nav>
      <div className="flex pt-20 justify-center items-center min-h-screen bg-gray-100">
          <div className="w-3/4 mx-auto bg-white p-8 shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Create New Ticket</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block font-semibold">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="issue" className="block font-semibold">
                Express Issue:
              </label>
              <textarea
                id="issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                rows={4}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="priority" className="block font-semibold">
                Priority:
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
