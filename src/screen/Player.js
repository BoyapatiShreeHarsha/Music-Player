import React, { useRef } from 'react'
import "../screen_css/player.css"
import { useLocation, useNavigate } from 'react-router-dom'
import apiClient from '../spotify';
import { useState ,useEffect } from "react"
import SongCard from '../components/SongCard'
import Queue from '../components/Queue'
import AudioPlayer from '../components/AudioPlayer';
import Widges from '../components/Widges';
import deimg from "../components/song.jpg";

export default function Player() {
  let location=useLocation();
  let navigate=useNavigate();
  if(location.state==undefined)
  {
    navigate("/library");
  }
  const [track, setTrack] = useState([]); //store all the songs in the playlist
  const [currenttrack, setCurrenttrack] = useState({});  //the current song to play
  const [currentindex, setCurrentindex] = useState(0);
  const [t, setT] = useState({});
  const [info, setInfo] = useState({});
  const [img, setImg] = useState(deimg);
  // let single;
  // const img = useRef(deimg);

  let update= async ()=>{
    if(location.state!=undefined)
    {
      let reasponse;
      if(location.state.operation===1){
       reasponse = await apiClient.get(`v1/playlists/${location.state.id}/tracks`);
      //  console.log(reasponse);
       setTrack(reasponse?.data?.items);
       setCurrenttrack(reasponse?.data?.items[0]?.track);
      }
      else if(location.state.operation===2)
      {
        reasponse=await apiClient.get(`v1/tracks/${location.state.id}`);
        setT(reasponse?.data);
        setCurrenttrack(reasponse?.data);
        setImg(reasponse?.data?.album?.images[0]?.url);
      }
      else if(location.state.operation===3)
      {
        reasponse=await apiClient.get(`v1/albums/${location.state.id}`);
        // console.log(reasponse?.data?.tracks?.items);
        setInfo(reasponse?.data);
        setTrack(reasponse?.data?.tracks?.items);
        setCurrenttrack(reasponse?.data?.tracks?.items[0]);
        setImg(reasponse?.data?.images[0]?.url);
      }
    }
  }

  useEffect(() => {
    update();
  }, [location.state])

  useEffect(()=>{
    if(location.state.operation===1){
    setCurrenttrack(track[currentindex]?.track);
    // console.log(currenttrack);
    setImg(track[currentindex]?.track?.album?.images[0]?.url);
    }
    else if(location.state.operation===2)
    {
      // console.log(t);
      setCurrenttrack(t); 
    }
    else if(location.state.operation===3)
    {
      setCurrenttrack(track[currentindex])
    }

  },[currentindex,track]) //here track as no effect
  // final analysis : so here the clicked playlist all tracks and currenttrack as 0 is set and current track is send to all other components and option to change the currenttrack not the entire playlist
  return (
    // <></>
    <div className='screen-container flex'>
      <div className="left-player-body">
        <AudioPlayer currenttrack={currenttrack} currentindex={currentindex} setCurrentindex={setCurrentindex} total={track} operation={location.state.operation} img={img}/>
        <SongCard album={currenttrack?.album} operation={location.state.operation} info={info} img={img}/>
        {/* <Widges artistId={currenttrack?.album} currentindex={currentindex}/> */}
      </div>
      <div className="right-player-body">
        <Queue track={track} setcurrentindex={setCurrentindex} operation={location.state.operation} single={currenttrack} id={location.state.id} info={info}/>
      </div>
    </div>
  )
}
