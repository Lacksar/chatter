import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {



    const [show, setShow] = useState(false)

    const toggle = () => {
        if (show) {
            setShow(false)

        }
        else {
            setShow(true)

        }
    }



    return (

        <div className='flex h-20 gap-10 justify-around items-center bg-gray-400'>

            <div className=' w-16 h-16 bg-black rounded-full'></div>
            <div className=' flex gap-6 items-center text-xl text-gray-900  h-full'>
                <Link href={"/"}>Home</Link>
                <Link href={"/"}>Message</Link>
                <Link href={"/"}>Posts</Link>
                <Link href={"/"}>Logout</Link>
            </div>
            <div className='bg-red-300  h-full'>
                rsrhbsj
                <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className={`${!show ? "hidden" : ""} flex flex-col w-32  pl-5 pr-5 pt-2 pb-2 absolute right-0 top-8 bg-white shadow-lg rounded-md text-black `}>

                    <Link href={"/myprofile"} className="w-full mb-2  hover:text-gray-600 mt-4">My Profile</Link>
                    <Link href={"/orders"} className="w-full mb-2  hover:text-gray-600">Orders</Link>
                    <button onClick={() => { logout(); Toast("success", "Successfully Logged Out") }} className="text-left w-full mb-2  hover:text-gray-600">Logout</button>


                </div>
            </div>

        </div>


    )
}

export default Header