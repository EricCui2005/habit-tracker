'use client';
import { David_Libre } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Auth0Provider } from '@auth0/auth0-react';

export default function Home() {
  return (
    <>
      <div className='bg-blue-400 h-20 flex justify-center items-center'>
        <h1 className='text-4xl font-bold'>Habit Tracker</h1>
      </div>
      <div className='flex flex-col h-64 justify-center items-center gap-4'>
        <p className='text-lg'>Welcome to the Habit Tracker</p>
        <Link href='/task-page' className='border border-solid border-white w-20 rounded bg-blue-400 font-bold text-center'>Login</Link>
        <Link href='/register' className='border border-solid border-white w-24 rounded bg-blue-400 font-bold text-center'>New User</Link>
      </div>
    </>
  );
}
