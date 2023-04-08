import React from 'react'
import "../components_css/AlbumInfo.css"

function AlbumInfo({album}) {
    // console.log(album);
    let artist=[];
    album?.artists?.forEach((element)=>{
        artist.push(element.name);
    });

  return (
    <div className='albumInfo-card'>
        <div className="albumName-container">
            <div className="marquee">
            <p>{album?.name}</p>
            </div>
        </div>
        <div className="album-info">
            <p>{`${album?.name} is an ${album?.album_type} by ${artist.join(", ")} with ${album?.total_tracks} track(s)`}</p>
        </div>
        <div className="album-release">
            <p>Release Date:{album?.release_date}</p>
        </div>
      
    </div>
  )
}

export default AlbumInfo
