import BlogCard from '@/components/BlogCard';
import { setBlog } from '@/redux/blogSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Blogs() {
    const dispatch=useDispatch()
    const {blog}=useSelector(store=>store.blog)
    useEffect(()=>{
        const  getAllPublishedBlogs = async ()=>{
            try {
               const res =await axios.get(`http://localhost:8000/api/v1/blog/get-published-blog`,{withCredentials:true})
               if(res.data.success)
               {
                dispatch(setBlog(res.data.blog))
               }
            } catch (error) {
                console.log(error);
            }
        }
        getAllPublishedBlogs()
    },[])
  return (
    <div className='pt-16 md:h-screen'>
        <div className='max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center'>
            <h1 className='text-4xl font-bold text-center pt-10'>Our Blogs</h1>
            <hr className='w-24 text-center border-2 border-red-500 rounded-full'/>
        </div>
        <div className='max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 p-10 px-4 md:px-0'>
            {
                blog?.map((blog,index)=>{
                    return <BlogCard blog={blog} key={index}/>
                })
            }
        </div>
    </div>
  )
}

export default Blogs