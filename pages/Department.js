import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import Tasks from "./Tasks";
import { useEffect } from 'react';
import { useRouter } from 'next/router';


function Devhome() {
  const router = useRouter();
  let em=null

  useEffect(() => {
    const { email } = router.query;
    em=email
    console.log('Email:', email);
    console.log('hhhhhhhhhhh')
  }, []);

  const navigateToTasks = () => {
    router.push({
      pathname: '/Tasks',
      query: { email: router.query.email }, 
    });
  };

  const navigateToFeatures = () => {
    router.push({
      pathname: '/Features',
      query: { email: router.query.email }, 
    });
  };

  
  const navigateToTickets = () => {
    router.push({
      pathname: '/Tickets',
      query: { email: router.query.email }, 
    });
  };

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        {/*<link rel="icon" href={'/img/Icon.png'} />*/}
      </Head>


      <nav className="flex items-center flex-wrap p-6 absolute">
      <div className="flex items-center flex-shrink-0 font-extrabold text-black mr-40">
        <Image src={require('./Assets/Logo.png')} alt="GIF Image" width={200} height={100} />
      </div>
      <div className="flex" style={{ paddingTop: 5 }}>
        <button onClick={navigateToTasks} className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 ml-40 px-4 py-2 rounded">Tasks</button>
        <button onClick={navigateToFeatures} className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 ml-20 px-4 py-2 rounded">Features</button>
        <button onClick={navigateToTickets} className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-300 ml-20 mr-32 px-4 py-2 rounded">Tickets</button>
        <Link href="/">
          <li className="block mt-4 lg:inline-block lg:mt-0 text-black bg-blue-100 hover:text-white ml-60 bg-Sky-100 hover:bg-violet-100 px-4 py-2 rounded" style={{ paddingRight: 15 }}>Log out</li>
        </Link>
      </div>
    </nav>

      <div className="text-3xl pt-40 font-bold" style={{paddingLeft: '45%'}}>
          <text>Dashboard</text>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-8 mb-20">
        <div className="bg-white p-4 rounded-lg border shadow-lg border-gray-300 transform hover:scale-105 transition duration-300" style={{ height: '400px' }}>
          <div className="text-2xl font-semibold mb-2">Tasks</div>
          <div className="relative w-full h-48">
            <Image src={require('./Assets/IT.png')} alt="GIF Image" layout="fill" objectFit="cover" />
          </div>
          <div className="mt-4">"The Tasks card displays a list of tasks assigned to users. It provides an overview of pending, in-progress, and completed tasks within the system. Users can easily track their assigned tasks, monitor progress, and mark them as complete."</div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-lg border-gray-300 transform hover:scale-105 transition duration-300" style={{ height: '400px' }}>
          <div className="text-2xl font-semibold mb-2">Features</div>
          <div className="relative w-full h-48">
            <Image src={require('./Assets/Feature.png')} alt="GIF Image" layout="fill" objectFit="cover" />
          </div>
          <div className="mt-4">"The Features card provides a platform for users to request new features and enhancements for the system. It empowers users to actively contribute to the evolution of the application and enhance their experience and meet their specific needs."</div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-lg border-gray-300 transform hover:scale-105 transition duration-300" style={{ height: '400px' }}>
          <div className="text-2xl font-semibold mb-2">Tickets</div>
          <div className="relative w-full h-48">
            <Image src={require('./Assets/Fix.png')} alt="GIF Image" layout="fill" objectFit="cover" />
          </div>
          <div className="mt-4">"The Tickets card allows users to raise support tickets and report issues or queries related to the application. It serves as a centralized platform for users to communicate their concerns and seek assistance from the support team."</div>

        </div>
      </div>
      
      <div className="pt-20 h-screen border shadow-lg ml-20 mr-20">
          
      </div>


    </div>
  );
}

export default Devhome;
