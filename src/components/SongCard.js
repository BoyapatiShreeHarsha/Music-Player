import React from 'react'
import "../components_css/songCard.css"
import AlbumImage from './AlbumImage'
import AlbumInfo from './AlbumInfo'

function SongCard({album}) {
  return (
    <div className='songCard-body flex'>
      <AlbumImage url={album?.images[0]?.url}/>
      <AlbumInfo album={album}/>
    </div>
  )
}

export default SongCard
