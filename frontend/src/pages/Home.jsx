import RecentBlog from '@/components/RecentBlog'
import Hero from '../components/Hero'
import { Button } from '../components/ui/button'
import React from 'react'
import PopularAuthor from '@/components/PopularAuthor'

function Home() {
  return (
    <div className='pt-20'>
        <Hero/>
        <RecentBlog/>
        <PopularAuthor/>
    </div>
  )
}

export default Home