import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Dev = () => {
  const router = useRouter();
  let em=null

  useEffect(() => {
    const { email } = router.query;
    em=email
    console.log('Email:', email);
    console.log('hhhhhhhhhhh')
  }, []);

  const navigateToTasks = () => {
    console.log(em)
    console.log('jk')
    router.push(`/DevTasks?email=${em}`);
  };

  const navigateToFeatures = () => {
    router.push(`/DevFeatures?email=${em}`);
  };

  const navigateToPurchases = () => {
    router.push(`/AccessPurchases?email=${em}`);
  };

  const navigateToAccess = () => {
    router.push(`/Access?email=${em}`);
  };

  return (
    <div>
        <Head>
            <title>Developer Home</title>
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
  <text>Dashboard</text>
</div>

<div className="grid grid-cols-2 gap-4 mt-8">
  <div className="bg-white p-4 rounded-lg border shadow-lg border-gray-300 transform hover:scale-105 transition duration-300 relative pb-20" style={{ height: '400px' }}>
    <div className="text-2xl font-semibold mb-2">Purchases</div>
    <div className="relative w-full h-60">
      <Image src={require('./Assets/Purchases.png')} alt="GIF Image" layout="fill" objectFit="cover" />
    </div>
    <div className="mt-4">The Track Purchases card displays a list of purchases made by users. It provides an overview of pending, completed, and canceled purchases within the system. Users can easily track their purchase history.</div>
    <button onClick={navigateToPurchases} className=" bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-black shadow-lg px-4 py-2 rounded-lg ml-80">
      Track Purchases
    </button>
  </div>
  <div className="bg-white p-4 rounded-lg border shadow-lg border-gray-300 transform hover:scale-105 transition duration-300 relative" style={{ height: '400px' }}>
    <div className="text-2xl font-semibold mb-2">Budget</div>
    <div className="relative w-full h-60">
      <Image src={require('./Assets/Budget2.png')} alt="GIF Image" layout="fill" objectFit="cover" />
    </div>
    <div className="mt-4">The Budget card allows users to manage their financial resources. It provides tools to track expenses, and budget. Users can set budget goals, monitor spending patterns, and stay within their financial plan.</div>
    <button onClick={navigateToAccess} className="bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black shadow-lg px-4 py-2 rounded-lg ml-80">
      Track Budget
    </button>
  </div>
</div>



    </div>
  )
}

export default Dev
