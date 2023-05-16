import React from 'react'
import "../screen_css/player.css"
import { useLocation, useNavigate } from 'react-router-dom'
import apiClient from '../spotify';
import { useState ,useEffect } from "react"
import SongCard from '../components/SongCard'
import Queue from '../components/Queue'
import AudioPlayer from '../components/AudioPlayer';
import deimg from "../components/song.jpg";
import PlaylistCover from '../components/PlaylistCover';
import { Modal1 } from '../components/Modal1';

export default function Player() {

  let location=useLocation();
  let navigate=useNavigate();
  if(location.state===undefined)
  {
    navigate("/library");
  }


  const [track, setTrack] = useState([]); //store all the songs in the playlist
  const [currenttrack, setCurrenttrack] = useState({});  //the current song to play
  const [currentindex, setCurrentindex] = useState(0);
  const [list, setList] = useState([]);//store the ids of element present in the track

  const [t, setT] = useState({});
  const [info, setInfo] = useState({});
  const [img, setImg] = useState(deimg);
  const [cover, setCover] = useState({});

  const [openModal, setOpenModal] = useState(false);
  

  let update= async ()=>{
    if(location.state!==undefined)
    {
      let reasponse;
      if(location.state.operation===1){
       reasponse = await apiClient.get(`v1/playlists/${location.state.id}/tracks`);
      //  console.log(reasponse?.data?.items);
       setTrack(reasponse?.data?.items);
       
       let arr=reasponse?.data?.items.map((ele)=>{
        return ele?.track?.id;
       })
       setList(arr);
       
       setCurrenttrack(reasponse?.data?.items[0]?.track);
      }
      else if(location.state.operation===2)
      {
        reasponse=await apiClient.get(`v1/tracks/${location.state.id}`);
        // console.log(reasponse);

        let arr=[];
        arr.push(reasponse?.data?.id);
        setList(arr);

        setT(reasponse?.data);
        setCurrenttrack(reasponse?.data);
        setImg(reasponse?.data?.album?.images[0]?.url);
      }
      else if(location.state.operation===3)
      {
        reasponse=await apiClient.get(`v1/albums/${location.state.id}`);
        
        // console.log(reasponse?.data?.tracks?.items);

        let arr=reasponse?.data?.tracks?.items.map((ele)=>{
          return ele?.id;
        })

        setList(arr);

        setInfo(reasponse?.data);
        setTrack(reasponse?.data?.tracks?.items);
        setCurrenttrack(reasponse?.data?.tracks?.items[0]);
        setImg(reasponse?.data?.images[0]?.url);
      }
    }
  }

  useEffect(() => {
    update();
    setCover(location.state);
  }, [location.state])  //in future we can use this to play one playlist and see another playlist

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

  },[currentindex,track,location.state.operation,t]) //here track as no effect

  // final analysis : so here the clicked playlist all tracks and currenttrack as 0 is set and current track is send to all other components and option to change the currenttrack not the entire playlist
  return (
    <div className='screen-container flex'>
      <div className="left-player-body">
        <AudioPlayer currenttrack={currenttrack} currentindex={currentindex} setCurrentindex={setCurrentindex} total={track} operation={location.state.operation} img={img}/>
        {/* <SongCard album={currenttrack?.album} operation={location.state.operation} info={info} img={img}/> */}
      </div>
      <div className="right-player-body">
        {!openModal &&<><PlaylistCover cover={cover} setopenmodal={setOpenModal} />
        <Queue track={track} setcurrentindex={setCurrentindex} operation={location.state.operation} currentindex={currentindex} /></>}
        {openModal && <Modal1 setopenmodal={setOpenModal} list={list} />}
      </div>
    </div>
  )
}
