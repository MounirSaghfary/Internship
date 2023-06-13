import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


const ResTickets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tickets, setTickets] = useState([]);
  const router = useRouter();
  let em = null;

  useEffect(() => {
    (async () => {
      try {
        let s ='Res'
        const { email } = router.query;
        em = email
        const { data } = await axios.get(`/api/tkt?s=${s}`);
        setTickets(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(tickets);
  }, [tickets]);

  const navigateToTasks = () => {
    router.push({
      pathname: '/ResTasks',
      query: { email: router.query.email }, 
    });
  };

  const navigateToTickets = () => {
    router.push({
      pathname: '/ResTickets',
      query: { email: router.query.email }, 
    });
  };

  const handleComplete = async (ticketId) => {
    try {
      let change = 'Complete'
      await axios.put(`/api/tkt?ticketId=${ticketId}&change=${change}`);
      console.log('ticket completed:', ticketId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (ticketId) => {
    try {
      let change = 'Reject'
      await axios.put(`/api/tkt?ticketId=${ticketId}&change=${change}`);
      console.log('ticket Rejected:', ticketId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (ticketId) => {
    try {
      let change = 'Accept'
      await axios.put(`/api/tkt?ticketId=${ticketId}&change=${change}`);
      console.log('ticket Accepted:', ticketId);
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRefresh = async () => {
    try {
      let s ='Res'
      const { data } = await axios.get(`/api/tkt?s=${s}`);
      setTickets(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTickets = tickets.filter((ticket) =>
  ticket.Title && ticket.Title.toLowerCase().includes(searchTerm.toLowerCase())
);

const sortedTickets = filteredTickets.sort((a, b) => {
  if (a.confirmation === 'Accepted' && b.confirmation === 'Rejected') {
    return -1;
  } else if (a.confirmation === 'Rejected' && b.confirmation === 'Accepted') {
    return 1;
  } else if (a.confirmation === 'Accepted' && b.confirmation === 'Accepted') {
    if (a.status === 'In Progress' && b.status === 'Complete') {
      return -1;
    } else if (a.status === 'Complete' && b.status === 'In Progress') {
      return 1;
    }
  } else if (a.confirmation === 'Rejected' && b.confirmation === 'Rejected') {
    if (a.status === 'In Progress' && b.status === 'Complete') {
      return -1;
    } else if (a.status === 'Complete' && b.status === 'In Progress') {
      return 1;
    }
  }
  return 0;
});
  

  return (
    <div>
      <Head>
        <title>Tickets</title>
      </Head>

      <nav className="flex items-center flex-wrap p-6 absolute">
        <div className="flex items-center flex-shrink-0 font-extrabold text-black mr-40">
          <Image src={require('./Assets/Logo.png')} alt="GIF Image" width={200} height={100} />
        </div>
        <div className="flex space-x-4" style={{ paddingTop: 5 }}>
            <button onClick={navigateToTasks} className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 ml-60 mr-20 px-4 py-2 rounded">Tasks</button>
            <button onClick={navigateToTickets} className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 mr-80 px-4 py-2 rounded" >Features</button>
          <Link href="/">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-black bg-blue-100 hover:text-white ml-96 bg-Sky-100 hover:bg-violet-100 px-4 py-2 rounded" style={{ paddingRight: 15 }}>Log out</li>
          </Link>
        </div>
      </nav>

      <div className="text-3xl pt-40 font-bold" style={{ paddingLeft: '45%' }}>
        <text>Tickets</text>
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

        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {sortedTickets.map((ticket) => (
            <div key={ticket.id} className="p-4 border border-gray-300 rounded">
              <h3 className="text-lg font-bold">{ticket.Title}</h3>
              <h1>{ticket.email}</h1>
              <h1>{ticket.Information}</h1>
              <h1>{ticket.confirmation}</h1>
              <h1>{ticket.status}</h1>
              <div className="flex justify-end">
                <button
                  onClick={() => handleReject(ticket.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded mt-5"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleAccept(ticket.id)}
                  className="px-4 py-2 text-white bg-green-500 rounded ml-2 mt-5"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleComplete(ticket.id)}
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

export default ResTickets;
