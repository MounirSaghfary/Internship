import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', task: 'Complete project report'},
    { id: 2, title: 'Task 2' , task: 'Prepare presentation slides'},
    { id: 3, title: 'Task 3', task: 'Attend team meeting'},
    { id: 4, title: 'Task 4', task:'Review code changes'},
    { id: 5, title: 'Task 5', task: 'Send client update'},

  ]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAdd = () => {
    // Add logic for adding a task
  };

  const handleDelete = (taskId) => {
    // Add logic for deleting a task
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleModify = (taskId) => {
    // Add logic for modifying a task
  };

  const handleComplete = (taskId) => {
    // Add logic for adding a task
  };

  const filteredTasks = tasks.filter((task) =>
    task.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Head>
        <title>Tasks</title>
      </Head>

      <nav className="flex items-center flex-wrap p-6 absolute">
        <div className="flex items-center flex-shrink-0 font-extrabold text-black mr-40">
          <Image src={require('./Assets/Logo.png')} alt="GIF Image" width={200} height={100} />
        </div>
        <div className="flex space-x-4" style={{ paddingTop: 5 }}>
          <Link href="/ResTasks">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 mr-20 px-4 py-2 rounded">Tasks</li>
          </Link>
          <Link href="/ResTickets">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 mr-20 px-4 py-2 rounded">Tickets   </li>
          </Link>
          <Link href="/">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-black bg-blue-100 hover:text-white mr-20 bg-Sky-100 hover:bg-violet-100 px-4 py-2 rounded" style={{ paddingRight: 15 }}>Log out</li>
          </Link>
        </div>
      </nav>

      <div className="text-3xl pt-40 font-bold" style={{ paddingLeft: '45%' }}>
        <text>Tasks</text>
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
            <button
                  onClick={() => handleAdd(task.id)}
                  className="px-4 py-2 ml-96 text-white bg-green-500 rounded"
            >
                Add Task
            </button>

        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-4 border border-gray-300 rounded">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <h1>{task.task}</h1>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(task.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded mt-5"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleModify(task.id)}
                  className="px-4 py-2 text-white bg-blue-500 rounded ml-2 mt-5"
                >
                  Modify
                </button>
                <button
                  onClick={() => handleComplete(task.id)}
                  className="px-4 py-2 text-white bg-green-500 rounded ml-2 mt-5"
                >
                  Complete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
