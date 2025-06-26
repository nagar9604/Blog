import BlogCard from '@/components/BlogCard'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function SearchList() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    const { blog } = useSelector(store => store.blog)

    const filteredBlogs = blog.filter(
        (blog) =>
            blog.title.toLowerCase().includes(query) ||
            blog.subtitle.toLowerCase().includes(query) ||
            blog.category.toLowerCase() === query.toLowerCase()
    );
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])


  return (
    <div className='pt-32'>
    <div className='max-w-6xl mx-auto'>
        <h2 className='mb-5'>Search Results for: "{query}"</h2>
        <div className='grid grid-cols-3 gap-7 my-10'>
            {
                filteredBlogs.map((blog,index) => {
                    return <BlogCard key={index} blog={blog} />
                })
            }

        </div>

    </div>
</div>
  )
}

export default SearchList