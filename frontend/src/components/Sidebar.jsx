import { ChartColumnBig, SquareUser } from 'lucide-react'
import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { LiaCommentSolid } from 'react-icons/lia'
import { NavLink } from 'react-router-dom'

function Sidebar() {
    return (
        <div className='hidden mt-10 fixed md:block border-r-2 dark:bg-gray-800 bg-white border-gray-300 dark:border-gray-600 w-[300px] p-10 space-y-2 h-screen z-10'>

            <div className='text-center pt-10 px-3 space-y-2'>
                <NavLink to='/dashboard/profile' className={({ isActive }) => `text-2xl ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
                    <SquareUser />
                    <span>Profile</span>
                </NavLink>
                <NavLink to='/dashboard/your-blog' className={({ isActive }) => `text-2xl ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
                    < ChartColumnBig/>
                    <span>Your Blogs</span>
                </NavLink>
                <NavLink to='/dashboard/comments' className={({ isActive }) => `text-2xl ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
                    <LiaCommentSolid />
                    <span>Comments</span>
                </NavLink>
                <NavLink to='/dashboard/write-blog' className={({ isActive }) => `text-2xl ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
                    <FaRegEdit/>
                    <span>Create Blog</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar