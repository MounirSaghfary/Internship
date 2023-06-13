import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


const NewTask = () => {
  const router = useRouter();
  let em=null

  useEffect(() => {
    const { email } = router.query;
    em=email
    console.log(email)

  }, []);

    
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


  
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Low');
  const [ends_at, setEndDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await axios.post('/api/tsk', {
        email,
        title,
        task,
        priority,
        ends_at
      });

      setEmail('');
      setTitle('');
      setTask('');
      setPriority('Low');
      setEndDate('');
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <Head>
        <title>New Task</title>
      </Head>

      <nav className="flex items-center flex-wrap p-6 absolute">
        <div className="flex items-center flex-shrink-0 font-extrabold text-black mr-40">
          <Image src={require('./Assets/Logo.png')} alt="GIF Image" width={200} height={100} />
        </div>
        <div className="flex space-x-4" style={{ paddingTop: 5 }}>
            <button onClick={navigateToTasks} className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 ml-60 mr-20 px-4 py-2 rounded">Tasks</button>
            <button onClick={navigateToFeatures} className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 mr-80 px-4 py-2 rounded" >Tickets</button>
          <Link href="/">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-black bg-blue-100 hover:text-white ml-96 bg-Sky-100 hover:bg-violet-100 px-4 py-2 rounded" style={{ paddingRight: 15 }}>Log out</li>
          </Link>
        </div>
      </nav>

      <div className="flex pt-28 justify-center items-center min-h-screen bg-gray-100">
        <div className="w-3/4 mx-auto bg-white p-8 shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
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
              <label htmlFor="task" className="block font-semibold">
                Task:
              </label>
              <textarea
                id="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
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
            <div className="mb-4">
              <label htmlFor="endDate" className="block font-semibold">
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                value={ends_at}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
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

export default NewTask;
