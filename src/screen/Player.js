import React from 'react'
import "../screen_css/player.css"
import { useLocation } from 'react-router-dom'
import apiClient from '../spotify';
import { useState ,useEffect } from "react"
import SongCard from '../components/SongCard'
import Queue from '../components/Queue'
import AudioPlayer from '../components/AudioPlayer';
import Widges from '../components/Widges';

export default function Player() {
  let location=useLocation();
  const [track, setTrack] = useState([]); //store all the songs in the playlist
  const [currenttrack, setCurrenttrack] = useState({});  //the current song to play
  const [currentindex, setCurrentindex] = useState(0);

  let update= async ()=>{
    if(location.state!=undefined)
    {
      let reasponse = await apiClient.get(`v1/playlists/${location.state.id}/tracks`);
      // console.log(reasponse.data.items[0].track.album);
      setTrack(reasponse.data.items);
      setCurrenttrack(reasponse.data.items[0].track);
    }
  }

  useEffect(() => {
    update();
  }, [location.state])

  useEffect(()=>{
    setCurrenttrack(track[currentindex]?.track)
  },[currentindex,track])
  
  return (
    <div className='screen-container flex'>
      <div className="left-player-body">
        <AudioPlayer currenttrack={currenttrack} currentindex={currentindex} setCurrentindex={setCurrentindex} total={track}/>
        <Widges artistId={currenttrack?.album} currentindex={currentindex}/>
      </div>
      <div className="right-player-body">
        <SongCard album={currenttrack?.album} />
        <Queue track={track} setcurrentindex={setCurrentindex}/>
      </div>
    </div>
  )
}
