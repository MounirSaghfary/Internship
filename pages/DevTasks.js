import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { useRouter } from 'next/router';

const DevTasks = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  let em =null;


  useEffect(() => {
    (async () => {
      try {
        const { email } = router.query;
        em = email
        const { data } = await axios.get(`/api/tsk?email=${email}`);
        setTasks(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (taskId) => {
    try {
      console.log("DELETE")
      await axios.delete(`/api/tsk?taskId=${taskId}`);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (err) {
      console.log(err);
    }
  };
  
  const navigateToTasks = () => {
    router.push({
      pathname: '/DevTasks',
      query: { email: router.query.email }, 
    });
  };

  const navigateToFeatures = () => {
    router.push({
      pathname: '/DevFeatures',
      query: { email: router.query.email }, 
    });
  };
  
  
  const handleAdd = () => {
    router.push({
      pathname: '/DevNewTask',
      query: { email: router.query.email }, 
    });
  };

  const handleComplete = async (taskId) => {
    try {
      await axios.put(`/api/tsk?taskId=${taskId}`);
      console.log('Task completed:', taskId);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks
  .filter((task) =>
    task.Task &&
    task.Task.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    // Sort by status
    const statusOrder = {
      'In progress': 0,
      Complete: 1,
    };
    const statusA = statusOrder[a.status];
    const statusB = statusOrder[b.status];
    if (statusA !== statusB) {
      return statusA - statusB;
    }
  
    // Sort by priority
    const priorityOrder = {
      high: 0,
      medium: 1,
      low: 2,
    };
    const priorityA = priorityOrder[a.priority];
    const priorityB = priorityOrder[b.priority];
    return priorityA - priorityB;
  });

const handleRefresh = async () => {
  try {
    const { email } = router.query;
    const { data } = await axios.get(`/api/tsk?email=${email}`);
    setTasks(data);
  } catch (error) {
    console.error(error);
  }
};

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
            <button onClick={navigateToTasks} className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 ml-60 mr-20 px-4 py-2 rounded">Tasks</button>
            <button onClick={navigateToFeatures} className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 mr-80 px-4 py-2 rounded" >Features</button>
          <Link href="/">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-black bg-blue-100 hover:text-white ml-96 bg-Sky-100 hover:bg-violet-100 px-4 py-2 rounded" style={{ paddingRight: 15 }}>Log out</li>
          </Link>
        </div>
      </nav>

      <div className="text-3xl pt-40 font-bold" style={{ paddingLeft: '45%' }}>
        <h1>Tasks</h1>
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
            <button onClick={handleRefresh} className="px-4 py-2 ml-96 text-white bg-gray-500 rounded">
              Refresh
            </button>
            <button onClick={handleAdd} className="px-4 py-2 ml-4 pl-8 pr-8 text-white bg-green-500 rounded">
              Add
            </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-4 border border-gray-300 rounded">
              <h3 className="text-lg font-bold">Task {task.id}</h3>
              <h1>{task.created_at}</h1>
              <h1>{task.Task}</h1>
              <h1>{task.priority}</h1>
              <h1>{task.ends_at}</h1>
              <h1>{task.status}</h1>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(task.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded mt-5"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleComplete(task.id)}
                  className="px-4 py-2 text-white bg-blue-500 rounded ml-2 mt-5"
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

export default DevTasks;


