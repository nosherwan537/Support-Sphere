import React from 'react'
import Link from 'next/link'
import '../utility.css'
const SignUp = () => {
  return (
    <div className='text-white flex flex-col justify-center items-center text-center h-screen montserrat-regular text-lg'>
        <h1>SignUp</h1>
        <div className='flex flex-col my-2 text-black w-64'>
        <input className='my-2 rounded-xl p-1' type="email" placeholder='Email Address' />
        <input className='my-2 rounded-xl p-1' type="password" placeholder='Password' />
        <input className='my-2 rounded-xl p-1' type="text" placeholder='Username' />
        <input className='my-2 rounded-xl p-1' type="tel" placeholder='Phone Number' />
        </div>
       
        <Link href="/signup"><button type="button" class="relative top-5 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">SignUp</button></Link>
        
    </div>
  )
}

export default SignUp
