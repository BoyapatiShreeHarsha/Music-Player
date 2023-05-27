import React from 'react'
import "../screen_css/player.css"
import { useLocation, useNavigate } from 'react-router-dom'
import apiClient from '../spotify';
import { useState ,useEffect } from "react"
import Queue from '../components/Queue'
import AudioPlayer from '../components/AudioPlayer';
import deimg from "../components/song.jpg";
import PlaylistCover from '../components/PlaylistCover';
import { Modal1 } from '../components/Modal1';
import Modal3 from '../components/Modal3';

export default function Player() {

  let location=useLocation();
  let navigate=useNavigate();
  if(location.state===undefined) //here we are going to put a case for the mini-player
  {
    navigate("/library");
  }


  const [track, setTrack] = useState([]); //store all the songs in the playlist
  const [currenttrack, setCurrenttrack] = useState({});  //the current song to play
  const [currentindex, setCurrentindex] = useState(-1);
  const [list, setList] = useState([]);//store the ids of element present in the track/album ->use when we press + in playlist cover
  const [openModal, setOpenModal] = useState(false);
  const [img, setImg] = useState(deimg); //for the img on the CD
  const [cover, setCover] = useState({}); //used to get info all types for Playlist Cover
  const [openModal3, setOpenModal3] = useState(false);
  


  let update= async (index)=>{
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
       setCurrentindex(index);
      }
      else if(location.state.operation===2)
      {
        reasponse=await apiClient.get(`v1/tracks/${location.state.id}`);
        // console.log(reasponse);
        let t=[];
        t.push(reasponse?.data);
        setTrack(t);
        // setCurrenttrack(reasponse?.data);

        let arr=[];
        arr.push(reasponse?.data?.id);
        setList(arr);

      }
      else if(location.state.operation===3)
      {
        reasponse=await apiClient.get(`v1/albums/${location.state.id}`);
        
        // console.log(reasponse?.data?.tracks?.items);

        let arr=reasponse?.data?.tracks?.items.map((ele)=>{
          return ele?.id;
        })

        setTrack(reasponse?.data?.tracks?.items);
        setList(arr);
        setCurrentindex(index);
      }
    }
  }

  // 1st one to run
  useEffect(() => {
    update(0);
    setCover(location.state);
  }, [location.state])  //in future we can use this to play one playlist and see another playlist

  useEffect(()=>{
    if(location.state.operation===1){
    setCurrenttrack(track[currentindex]?.track);
    setImg(track[currentindex]?.track?.album?.images[0]?.url);
    }
    else if(location.state.operation===2)
    {
      // console.log(t);
      setCurrenttrack(track[0]); 
    }
    else if(location.state.operation===3)
    {
      setCurrenttrack(track[currentindex]);
    }

  },[currentindex,track]) 

  // final analysis : so here the clicked playlist all tracks and currenttrack as 0 is set and current track is send to all other components and option to change the currenttrack not the entire playlist

  return (
    <div className='screen-container flex'>
      <div className="left-player-body">
        <AudioPlayer currenttrack={currenttrack} currentindex={currentindex} setCurrentindex={setCurrentindex} track={track} operation={location.state.operation} img={img} setOpenModal3={setOpenModal3} />
      </div>
      <div className="right-player-body">
        {!openModal && !openModal3 &&<><PlaylistCover cover={cover} setopenmodal={setOpenModal} />
        <Queue track={track} setcurrentindex={setCurrentindex} operation={location.state.operation} currentindex={currentindex} /></>}

        {openModal && !openModal3 &&<Modal1 setopenmodal={setOpenModal} list={list} />}

        {openModal3 && !openModal && <Modal3 trackid={cover?.id} currenttrackid={currenttrack?.id} operation={cover?.operation} setOpenModal3={setOpenModal3} update={update} currentindex={currentindex} currenttrack={currenttrack}/>}

      </div>
    </div>
  )
}
