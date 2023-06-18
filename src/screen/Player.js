import React from 'react'
import "../screen_css/player.css"
import { useLocation, useNavigate } from 'react-router-dom'
import apiClient from '../spotify';
import { useState, useEffect, useRef } from "react"
import Queue from '../components/Queue'
import AudioPlayer from '../components/AudioPlayer';
import deimg from "../components/song.jpg";
import PlaylistCover from '../components/PlaylistCover';
import { Modal1 } from '../components/Modal1';
import Modal3 from '../components/Modal3';
import { useSelector } from 'react-redux';
import Lyrics from '../components/Lyrics';

export default function Player() {

  let infoR = useSelector(state => state.info);

  let data = useSelector(state => state.data);
  let location = useLocation();
  let navigate = useNavigate();

  if (location.state === null) //here we are going to put a case for the mini-player
  {
    if (infoR.id !== "") {
      location.state = infoR;
    }
    else
      navigate("/library");
  }

  // console.log("rendered");
  // console.log("Modal1",modal?.modal1," Modal3 ",modal?.modal3);

  const [track, setTrack] = useState([]); //store all the songs in the playlist
  const [currenttrack, setCurrenttrack] = useState({});  //the current song to play
  const [currentindex, setCurrentindex] = useState(0);
  const [list, setList] = useState([]);//store the ids of element present in the track/album ->use when we press + in playlist cover
  const [img, setImg] = useState(deimg); //for the img on the CD
  const [cover, setCover] = useState({}); //used to get info all types for Playlist Cover

  //modals
  const [modal1, setModal1] = useState(false);
  const [modal3, setModal3] = useState(false);

  const divRef = useRef(null);


  let update = async (index) => {

    if (location.state !== undefined) {
      let reasponse;
      if (location?.state?.operation === 1) {
        reasponse = await apiClient.get(`v1/playlists/${location.state.id}/tracks`);
        //  console.log(reasponse?.data?.items);

        setTrack(reasponse?.data?.items);
        // console.log("came to update");
        let arr = reasponse?.data?.items.map((ele) => {
          return ele?.track?.id;
        })
        //  console.log("update",index);
        setList(arr);
        if (data?.exportData === false)
          setCurrentindex(index);
        else
          setCurrentindex(data?.currentindex);
      }
      else if (location?.state?.operation === 2) {
        reasponse = await apiClient.get(`v1/tracks/${location.state.id}`);
        // console.log(reasponse);
        let t = [];
        t.push(reasponse?.data);
        setTrack(t);
        // setCurrenttrack(reasponse?.data);

        let arr = [];
        arr.push(reasponse?.data?.id);
        setList(arr);
        setImg(location.state.img);
      }
      else if (location?.state?.operation === 3) {
        reasponse = await apiClient.get(`v1/albums/${location.state.id}`);

        // console.log(reasponse?.data?.tracks?.items);

        let arr = reasponse?.data?.tracks?.items.map((ele) => {
          return ele?.id;
        })

        // console.log("came to update",index);
        // console.log(reasponse?.data?.tracks?.items);
        setTrack(reasponse?.data?.tracks?.items);
        setList(arr);
        if (data?.exportData === false)
          setCurrentindex(index);
        else
          setCurrentindex(data?.currentindex);
        setImg(location.state.img);
      }
    }

  }

  // 1st one to run
  useEffect(() => {
    update(0);
    setCover(location.state);
  }, [location.state])  //in future we can use this to play one playlist and see another playlist

  useEffect(() => {
    if (location?.state?.operation === 1) {
      // console.log("in currentindex change", currentindex);
      setCurrenttrack(track[currentindex]?.track);
      setImg(track[currentindex]?.track?.album?.images[0]?.url);
    }
    else if (location?.state?.operation === 2) {
      // console.log(t);
      setCurrenttrack(track[0]);
    }
    else if (location?.state?.operation === 3) {
      setCurrenttrack(track[currentindex]);
    }

  }, [currentindex, track])

  // final analysis : so here the clicked playlist all tracks and currenttrack as 0 is set and current track is send to all other components and option to change the currenttrack not the entire playlist

  if (data?.show === true) {
    divRef?.current?.classList?.remove("normal-right");
    divRef?.current?.classList?.add("minimize-right");
  }
  else {
    divRef?.current?.classList?.remove("minimize-right");
    divRef?.current?.classList?.add("normal-right");
  }

  return (
    <div className='screen-container flex'>
      <div className="left-player-body">
        <AudioPlayer info={location?.state} currenttrack={currenttrack} currentindex={currentindex} setCurrentindex={setCurrentindex} track={track} img={img} modal1={modal1} setModal3={setModal3} />
        {/* <Lyrics currenttrack={currenttrack} info={location?.state}/> */}
      </div>
      <div className="right-player-body">
        <div ref={divRef}>
          {!modal1 && !modal3 &&
            <>
              <PlaylistCover cover={cover} setModal1={setModal1} />
              <Queue track={track} setcurrentindex={setCurrentindex} operation={location?.state?.operation} currentindex={currentindex} />
            </>
          }

          {modal1 &&
            <Modal1 list={list} setModal1={setModal1} />
          }

          {modal3 && !modal1 &&
            <Modal3 trackid={cover?.id} currenttrackid={currenttrack?.id} operation={cover?.operation} update={update} currentindex={currentindex} currenttrack={currenttrack} setModal3={setModal3} />
          }
        </div>
      </div>
    </div>
  )
}
