import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from './ui/avatar'
import { FaUserCircle } from 'react-icons/fa'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

function ResponsiveMenu({ openNav, setOpenNav, logoutHandler }) {
    const { user } = useSelector(store => store.auth)
    return (
        <div className={`${openNav ? "left-0" : "-left-[100%]"}fixed botton-0 top-0 z-20 h-screen flex w-[75%] flex-col justify-between bg-white dark:bg-gray-800 px-8 pb-6 pt-16 text-black dark:text-gray-100 md:hidden rounded-xl shadow-md transition`}>
            <div>
                <div className='flex items-center justify-start gap-3'>
                    {
                        user ? <Avatar className='w-14 h-14'>
                            <AvatarImage src={user.photoUrl} size={50} />
                        </Avatar> : <FaUserCircle size={50} />
                    }
                    <div>
                        <h1>Hello, {user?.firstName || "User"}</h1>
                        <h1 className='text-sm text-slate-500'>Premium User</h1>
                    </div>
                </div>
                <nav className='mt-12'>
                    <ul className='flext flex-col gap-7 text-2xl font-semibold'>
                        <Link to={"/"} onClick={()=>setOpenNav(false)}><li className='cursor-poiner'>Home</li></Link>
                        <Link to={"/blogs"} onClick={()=>setOpenNav(false)}><li className='cursor-poiner'>Blogs</li></Link>
                        <Link to={"/about"} onClick={()=>setOpenNav(false)}><li className='cursor-poiner'>About</li></Link>
                        {
                            user? <Button onClick={()=>{logoutHandler(),setOpenNav(flase)}}>Logout</Button>:
                            <Link to={"/signup"} onClick={()=>setOpenNav(false)}><Button>Signup</Button></Link>
                        }
                    </ul>
                </nav>
            </div>
            <div className='pb-20'>
                <h1>Made with ❤️ by Shruti</h1>
            </div>
        </div>
    )
}

export default ResponsiveMenu