import React from 'react'
import '../screen_css/Favorites.css'
import FavoritesTrack from '../components/FavoritesTrack'
import FavoritesAlbum from '../components/FavoritesAlbum'

export default function Favorites() {
  return (
    <div className='screen-container'>
      <div className='fav-body'>
        <FavoritesTrack/>
        <FavoritesAlbum/>
      </div>
    </div>
  )
}
