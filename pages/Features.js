import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';

const Features = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [features, setFeatures] = useState([
    { id: 1, title: 'Feature 1', feature: 'Complete project report'},
    { id: 2, title: 'Feature 2' , feature: 'Prepare presentation slides'},
    { id: 3, title: 'Feature 3', feature: 'Attend team meeting'},
    { id: 4, title: 'Feature 4', feature:'Review code changes'},
    { id: 5, title: 'Feature 5', feature: 'Send client update'},

  ]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (taskId) => {
    // Add logic for deleting a task
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleModify = (taskId) => {
    // Add logic for modifying a task
  };

  const filteredFeature = features.filter((feature) =>
    feature.feature.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="text-3xl pt-40 font-bold" style={{ paddingLeft: '45%' }}>
        <text>Features</text>
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center">
            <FiSearch className="mr-4" size={20} />
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="p-2 pr-60 mr-96 border border-gray-300 rounded"
            />
            <Link href="RequestFeature">
              <button
                    className="px-4 py-2 ml-96 text-white bg-green-500 rounded"
              >
                  Request Feature
              </button>
            </Link>

        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {filteredFeature.map((feature) => (
            <div key={feature.id} className="p-4 border border-gray-300 rounded">
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <h1>{feature.feature}</h1>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(feature.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded mt-5"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleModify(feature.id)}
                  className="px-4 py-2 text-white bg-blue-500 rounded ml-2 mt-5"
                >
                  Modify
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
