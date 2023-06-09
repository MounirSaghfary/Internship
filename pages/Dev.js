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
    // You can use the email parameter in your component logic here
  }, []);

  const navigateToTasks = () => {
    console.log(em)
    console.log('jk')
    router.push(`/DevTasks?email=${em}`);
  };

  const navigateToFeatures = () => {
    router.push({
      pathname: '/DevFeatures',
      query: { email: email }
    });
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
            <li className="block mt-4 lg:inline-block lg:mt-0 text-black bg-blue-100 hover:text-white mr-20 bg-Sky-100 hover:bg-violet-100 px-4 py-2 rounded" style={{ paddingRight: 15 }}>Log out</li>
          </Link>
        </div>
      </nav>

    </div>
  )
}

export default Dev
