import React, { useState, useRef, useEffect } from 'react'
import "../components_css/Controls.css"
import { IconContext } from 'react-icons'
import {FaPause} from "react-icons/fa"
import {IoPlaySkipBack,IoPlaySkipForward,IoPlay} from "react-icons/io5"
import apiClient from '../spotify'

const Controls = ({isPlaying, setIsPlaying, handleNext, handlePrev,currenttrack}) => {
  // doubt data is coming for every 1 sec but it is not rendereing for every sec
  let heartRef=useRef();
  let fav=false;
  const [favrioute, setFavrioute] = useState(fav);

  // let setheart = ()=>{
  //   if(fav)
  //   {
  //     heartRef.current.classList.remove('fa-regular');
  //     heartRef.current.classList.add('fa-solid');
  //   }
  //   else{
  //     // console.log("Got wrong");
  //     heartRef.current.classList.remove('fa-solid');
  //     heartRef.current.classList.add('fa-regular');
  //   }
  // }

  // let check = async()=>{
  //   let response=await apiClient.get(`/v1/me/tracks/contains?ids=${currenttrack?.id}`);
  //   // console.log(response?.data[0]);
  //   fav=response?.data[0];
  //   setFavrioute(response?.data[0]);
  //  setheart();
  // }


  // let favtoggle=async()=>{
  //   try {
  //     console.log(currenttrack?.id,typeof currenttrack?.id);
  //     let obj={"ids":[currenttrack?.id]};
  //   if(favrioute)
  //   {
  //     //we need to remove it
  //     let res=await apiClient.delete(`/v1/me/tracks`,{"ids":[currenttrack?.id]});
  //     fav=false;
  //     setFavrioute(false);
  //     setheart();
  //   }
  //   else
  //   {
  //     //we need to add it 
  //     let res=await apiClient.put(`/v1/me/tracks`,obj);
  //     fav=true;
  //     setFavrioute(true);
  //     setheart();
  //   }
  //   } catch (error) {
  //     console.log(error );
  //   }
    
  // }


  // useEffect(() => {
  //   //checking wheater the track is fav or not
  //   if(currenttrack!=={})
  //   {check();
  //     // console.log("done");
  //   }
  //   // console.log(currenttrack);
  // }, [currenttrack])
  
  return (
    <IconContext.Provider value={{size:"35px", color:"#c4d0e3"}}>
      <div className="controls-wrapper flex">
        <div className="action-btn" onClick={handlePrev}>
          <IoPlaySkipBack />
        </div>
        <div className="play-pause-btn flex" onClick={()=>{setIsPlaying(!isPlaying)}}>
          {isPlaying?<FaPause/>:<IoPlay/>}
        </div>
        <div className="action-btn flex" onClick={handleNext}>
          <IoPlaySkipForward />
        </div>
        {/* <i ref={heartRef} className=" fa-heart" onClick={favtoggle}></i> */}
      </div>
    </IconContext.Provider>

  )
}

export default Controls
