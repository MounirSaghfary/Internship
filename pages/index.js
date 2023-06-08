import { NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';


const HomePage = () => {

  return (
    <div>
      <Head>
        <title>Sign In</title>
        {/*<link rel="icon" href={'/img/Icon.png'} />*/}
      </Head>

      <div className="flex items-center justify-center pt-40">
        <div className="">
          <Image src={require('./Assets/Logo.png')} alt="Logo Image" width={200} height={100} />
        </div>
      </div>

      <div className="flex items-center justify-center pt-10">
      <div>
        <form style={{ display: "flex", flexDirection: "column"}}>
            <label className='font-bold' style={{ marginBottom: "10px"}}>Email:</label>
            <input type="email" id="email" name="email" className='border-white hover:-translate-y-1 hover:shadow-lg' style={{ padding: "10px", marginBottom: "20px", width: "500px", borderRadius: "5px", border: "1px solid #ddd" }} required />
            <label className='font-bold' style={{ marginBottom: "10px"}}>Password:</label>
            <input type="password" id="password" name="password" className='border-white hover:-translate-y-1 hover:shadow-lg' style={{ padding: "10px", marginBottom: "20px", width: "500px", borderRadius: "5px", border: "1px solid #ddd" }} required />
            <view style={{paddingBottom: 20}}>
              <Link href="/Department">
                <button type="submit" className="bg-blue-200 hover:bg-blue-300 hover:shadow-lg text-blue font-bold py-2 px-4 rounded">Sign In</button>
              </Link>
              <Link href="/SignUp">
                <button type="submit" className='font-bold text-blue-900 hover:text-blue-200' style={{paddingBottom: 20, paddingLeft: 10}}>Sign Up</button>
              </Link>
              <Link href="/Dev">
                <button type="submit" className='font-bold text-blue-900 hover:text-blue-200' style={{paddingBottom: 20, paddingLeft: 10}}>Dev</button>
              </Link>
              <Link href="/Res">
                <button type="submit" className='font-bold text-blue-900 hover:text-blue-200' style={{paddingBottom: 20, paddingLeft: 10}}>Res</button>
              </Link>
            </view>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
