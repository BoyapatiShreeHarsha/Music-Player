import React from 'react'
import "../screen_css/feed.css"
import Release from '../components/Release'
import Albums from '../components/Albums'
import Carousel from '../components/Carousel'
import Toplist from '../components/Toplist'
import Recent from '../components/Recent'


const Feed = () => {
  return (
    <div className='screen-container'>
      <div className="feed-body">
        <Carousel />
        <Recent/>
        <Release />
        <Toplist />
        <Albums/>
      </div>
    </div>
  )
}

export default Feed
