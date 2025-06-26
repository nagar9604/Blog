import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { setBlog } from '@/redux/blogSlice'





function CreateBlog() {
  const [title, setTitle] = useState("")
  
  const [category, setCategory] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {blog , loading} = useSelector(store=>store.blog)

  console.log(blog);

  const getSelectedCategory = (value) => {
    setCategory(value)
  }

  
    const createBlogHandler = async () => {
        
      try {
          setLoading(true)
          const res = await axios.post(`https://blog-sm.onrender.com/api/v1/blog/`, { title, category }, {
              headers: {
                  "Content-Type": "application/json",
              },
              withCredentials: true,
          })
          if (res.data.success) {
              if(!blog){
                dispatch(setBlog([res.data.blog]))
                navigate(`/dashboard/write-blog/${res.data.blog._id}`)
                toast.success(res.data.message)
              }
              dispatch(setBlog([...blog, res.data.blog]))
              navigate(`/dashboard/write-blog/${res.data.blog._id}`)
              toast.success(res.data.message)
          } else {
              toast.error("Something went wrong");
          }
      } catch (error) {
          console.log(error)
      } finally {
         dispatch(setLoading(false))
      }

  }

  return (
    <div className='p-4 md:pr-20 h-screen md:ml-[320px] pt-20'>
      <Card className="md:p-10 p-4 dark:bg-gray-800 -space-y-5">
        <h1 className='text-2xl font-bold'>Let's create blog </h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis ex sapiente laborum odio magni nihil, quia eligendi eius, nulla iste soluta laboriosam vitae quaerat nam enim vero voluptates hic omnis!</p>
        <div className='mt-10'>
          <div>
            <Label>Title</Label>
            <Input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Your blog name" className='bg-white dark:bg-gray-700 mt-3' />
          </div>
          <div className='mt-4 mb-5'>
            <Label className='mb-3'>Category</Label>
            <Select>
              <Select onValueChange={getSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                    <SelectItem value="Blogging">Blogging</SelectItem>
                    <SelectItem value="Photography">Photography</SelectItem>
                    <SelectItem value="Cooking">Cooking</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Select>

          </div>
          <div className='flex gap-2'>
            <Button disabled={loading} onClick={createBlogHandler}>
              {
                loading ? (
                  <>
                    <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                    Please wait
                  </>
                ) : ("Create Blog")
              }
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CreateBlog