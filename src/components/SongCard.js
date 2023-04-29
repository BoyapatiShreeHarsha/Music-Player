import React from 'react'
import "../components_css/songCard.css"
import AlbumImage from './AlbumImage'
import AlbumInfo from './AlbumInfo'


function SongCard({album,operation,info,img}) {
  let obj;
  if(operation===3)
  {
    obj=info;
  }
  else
  obj=album;
  return (
    <div className='songCard-body flex'>
      <AlbumImage url={img}/>
      <AlbumInfo album={obj}/>
    </div>
  )
}

export default SongCard
