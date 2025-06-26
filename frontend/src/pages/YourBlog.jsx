import { Card } from '@/components/ui/card'
import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setBlog } from '@/redux/blogSlice'
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'









function YourBlog() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blog } = useSelector(store => store.blog)
  


  const getOwnBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/blog/get-own-blogs`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setBlog((res.data.blogs)))
      }
    } catch (error) {
      console.log(error);
    }
  }

const deleteBlog = async (id)=>{
  try {
    const res = await axios.delete(`http://localhost:8000/api/v1/blog/delete/${id}`, { withCredentials: true })
    if (res.data.success) {
        const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
        dispatch(setBlog(updatedBlogData))
        toast.success(res.data.message)
    }
    console.log(res.data.message);

} catch (error) {
    console.log(error);
    toast.error("something went wrong")
}
}

  useEffect(() => {
    getOwnBlogs()
  }, [])

  const formatDate = (index) => {
    const date = new Date(blog[index].createdAt)
    const formatedDate = date.toLocaleDateString("en-GB")
    return formatedDate
  }
  return (
    <div className='pb-10 pt-20 md:ml[320px] h-screen' >

      <div className='max-w-6xl mx-auto mt-8'>
        <Card className='w-full p-5 space-y-2 dark:bg-gray-800 ml-38'>
          <Table>
            <TableCaption>A list of your recent Blogs.</TableCaption>
            <TableHeader className='overFlow-x-auto'>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='overFlow-x-auto'>
              {blog?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="flex gap-4 items-center">
                  <img src={item.thumbnail} alt="" className='w-20 rounded-md hidden md:block' />
                    <h1 className='hover:underline cursor-pointer w-[60px] md:w-full truncate' onClick={()=>navigate(`/blogs/${item._id}`)}>{item.title}</h1>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{formatDate(index)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger><BsThreeDotsVertical/></DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={()=>navigate(`/dashboard/write-blog/${item._id}`)}><Edit/>Edit</DropdownMenuItem>
                        <DropdownMenuItem className='text-red-500' onClick={()=>deleteBlog(item._id)}><Trash2 className='text-red-500'/>Delete</DropdownMenuItem>
                        
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}

export default YourBlog