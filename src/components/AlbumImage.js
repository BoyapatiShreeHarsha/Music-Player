import React from 'react'
import "../components_css/AlbumImage.css"
import deimg from "../components/song.jpg"

function AlbumImage({url}) {
    
  return (
    <div className='albumImage flex'>
      <img src={(url!==""?url:deimg)} alt="album art" className='albumImage-art' />
      <div className="albumImage-shadow">
      <img src={(url!==""?url:deimg)} alt="shadow" className='albumImage-shadow' />
      </div>
    </div>
  )
}

export default AlbumImage
