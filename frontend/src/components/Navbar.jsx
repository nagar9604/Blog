import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.png"
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ChartColumnBig, LogOut, Search, User } from 'lucide-react'
import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { LiaCommentSolid } from "react-icons/lia";
import { toggleTheme } from '../redux/themeSlice'
import axios from 'axios'
import { setUser } from '../redux/authSlice'
import userLogo from "@/assets/user.jpg"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuShortcut,
} from "../components/ui/dropdown-menu"
import ResponsiveMenu from './ResponsiveMenu';


function Navbar() {
    const { user } = useSelector(store => store.auth)
    const { theme } = useSelector(store => store.theme)
    const [searchTerm , setSearchTerm] =useState([])
    const [openNav,setOpenNav]=useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('')
        }
    };

    const logoutHandler = async (e) => {
        try {
            const res = await axios.get(`https://blog-sm.onrender.com/user/logout`, { withCredentials: true })
            if (res.data.success) {
                navigate('/')
                dispatch(setUser(null))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }

    const toggleNav = async()=>{
          setOpenNav(!openNav)
    }
    return (
        <div className='py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0'>
                {/* logo section */}
                <div className='flex gap-7 items-center'>
                    <Link to={"/"}>
                        <div className='flex gap-2 items-center'>
                            <img src={Logo} alt="" className='w-7 h-7 md:w-10 md:h-10 dark:invert' />
                            <h1 className='font-bold text-3xl md:text-4xl'>LOGO</h1>
                        </div>
                    </Link>
                    <div className='relative hidden md:block'>
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            

                        />
                        <Button onClick={handleSearch} className="absolute right-0 top-0"><Search /></Button>
                    </div>
                </div>
                {/* nav section */}
                <nav className='flex md:gap-7 gap-4 items-center'>
                    <ul className='hidden md:flex gap-7 items-center text-xl font-semibold'>
                        <Link to={"/"}><li>Home</li></Link>
                        <Link to={"/blogs"}><li>Blogs</li></Link>
                        <Link to={"/about"}><li>About</li></Link>
                    </ul>
                    <div className='flex'>
                        <Button onClick={() => dispatch(toggleTheme())}>
                            {
                                theme === 'light' ? <FaMoon /> : <FaSun />
                            }
                        </Button>

                        {
                            user ? <div className='ml-7 flex gap-3 items-center'>



                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar>
                                            <AvatarImage src={user.photoUrl || userLogo} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="start">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={()=>navigate('/dashboard/profile')}>
                                                <User/>
                                                <span>Profile</span>
                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={()=>navigate('/dashboard/your-blog')}>
                                                <ChartColumnBig/>
                                                Your Blogs
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            
                                            <DropdownMenuItem onClick={()=>navigate('/dashboard/comments')}>
                                                <LiaCommentSolid/>
                                                Comments
                                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={()=>navigate('/dashboard/write-blog')}>
                                                <FaRegEdit/>
                                               Write Blog
                                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
       
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <LogOut/>
                                            Log out
                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>



                                <Button onClick={logoutHandler} className=" hidden md:block bg-black text-white">Logout</Button>
                            </div> : <div className='ml-7 md:flex gap-2'>
                                <Link to="/login"><Button className="bg-black text-white">Login</Button></Link>
                                <Link className='hidden md:block' to="/signup"><Button className="bg-black text-white">SignUp</Button></Link>
                            </div>
                        }
                    </div>
                    {
                         openNav ? <HiMenuAlt3 onClick={toggleNav} className='w-7 h-7 hidden' /> :<HiMenuAlt1  onClick={toggleNav} className='w-7 h-7 hidden'/>
                    }
                </nav>
                <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} logoutHandler={logoutHandler}/>
            </div>
        </div>
    )
}

export default Navbar