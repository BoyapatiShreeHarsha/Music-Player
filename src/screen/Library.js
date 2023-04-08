import React, { useEffect, useState } from 'react'
import apiClient from '../spotify'
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import '../screen_css/library.css'
import { useNavigate} from 'react-router-dom';

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  let getplaylist = async () => {
    try {
      let respons2 = await apiClient.get(`/v1/me/playlists`);
      // console.log(respons2.data.items);
      setPlaylists(respons2.data.items);
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getplaylist();
  }, []);

  let navigate=useNavigate();
  let PlayPlaylist=(id)=>{
    navigate("/player",{state:{id:id}});
  }
  return (
    <div className='screen-container' >
      <div className="library-body">
        {
          playlists.map((playlist) => {
            return (<div key={playlist.id} className="playlist-card" onClick={()=>PlayPlaylist(playlist.id)}>
              <img src={playlist.images[0].url} className="playlist-img" alt="Playlist img" />
              <p className="playlist-title">{playlist.name}</p>
              <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
              <div className="playlist-fade">
                <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </div>
            </div>)
          })
        }

      </div>
    </div>
  )
}
