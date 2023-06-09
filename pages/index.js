import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/router';
import axios from 'axios';


const HomePage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let found = false;
  const handleSignIn = async (e) => {
    e.preventDefault();

    console.log(email,password)

    try {
      const response = await axios.post('/api/lgn', { email, password });
      if (response.status===200) {  
        response.data.some((item) =>{
          if ( item.email === email && item.password === password){
            found=true;
            console.log('true')
            let user = item; 
            console.log(user)
            console.log(user.occupation)
            if (user.occupation === 'development') {
              router.push(`/Dev?email=${email}`);
            } else if (user.occupation === 'network') {
              router.push(`/Res?email=${email}`);
            } else {
              router.push(`/Department?email=${email}`);
            }
            return true;
          }
        });
        if(!found){
          alert('Invalid Credentials. Please Try Again!');
          console.log('Invalid Credentials. Please Try Again!')
        }
    } 
  }catch (error) {
    console.error(error);
    alert('An error occurred while signing in. Please try again later.');
  }};

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
            <input type="email" id="email" name="email" className='border-white hover:-translate-y-1 hover:shadow-lg' style={{ padding: "10px", marginBottom: "20px", width: "500px", borderRadius: "5px", border: "1px solid #ddd" }} onChange={(e) => setEmail(e.target.value)} required />
            <label className='font-bold' style={{ marginBottom: "10px"}}>Password:</label>
            <input type="password" id="password" name="password" className='border-white hover:-translate-y-1 hover:shadow-lg' style={{ padding: "10px", marginBottom: "20px", width: "500px", borderRadius: "5px", border: "1px solid #ddd" }} onChange={(e) => setPassword(e.target.value)} required />
            <view style={{paddingBottom: 20}}>
                <button onClick={handleSignIn} type="submit" className="bg-blue-200 hover:bg-blue-300 hover:shadow-lg text-blue font-bold py-2 px-4 rounded">Sign In</button>
            </view>
          </form>
        </div>
      </div>
    </div>
  );
};


export default HomePage;
