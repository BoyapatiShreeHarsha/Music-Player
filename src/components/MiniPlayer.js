import React, { useEffect, useRef } from 'react'
import '../components_css/MiniPlayer.css'
import { useDispatch, useSelector } from 'react-redux'
import { IconContext } from 'react-icons'
import { FaPause } from "react-icons/fa"
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay } from "react-icons/io5"
import { dataActions } from '../store/data-slice'
import { useNavigate } from 'react-router-dom'
import Slider from './Slider'
import { audioActions } from '../store/audio-slice'
import { errorActions } from '../store/error-slice'
import ErrorMsg3 from './ErrorMsg3'

const HoverPlayer = () => {
  const data = useSelector(state => state.data);
  const info = useSelector(state => state.info);
  const AudioR = useSelector(state => state.audio);
  let e = useSelector(state => state.error);

  // console.log("data",data.trackProgess);
  let dispatch = useDispatch();

  if (window.location.pathname !== "/player") {
    // console.log(window.location.pathname);
    dispatch(dataActions.setShow("#"));
  }

  // audio-play 

  let aS = "";
  if (data?.operation === 2) {
    aS = data?.currenttrack?.preview_url;
  }
  else if (data?.operation === 1) {
    aS = data?.track[data?.currentindex]?.track.preview_url;
  }
  else if (data?.operation === 3) {
    aS = data?.track[data?.currentindex]?.preview_url;
  }

  if (aS === null) {
    dispatch(errorActions.setShow(true));
  }
  else {
    dispatch(errorActions.setShow(false));
  }

  let audioSrc = aS //this store the song url which we are going to play
  let audioRef = useRef(new Audio(aS));// returns a HTMLAudioElement which can be either attached to a document for the user to interact with and/or listen to, or can be used offscreen to manage and play audio.




  let intervalRef = useRef();  //a pointer towards that particular trackes created setInterval

  let isReady = useRef(false);  //it need to survive the render as this component is being rendered every second we can't run a function every sec

  let { duration } = audioRef.current;
  dispatch(dataActions.setDuration(duration));

  let d = Math.ceil(duration);
  let a = Math.ceil(data?.trackProgess);
  let currentPercentage = (a / d) * 100;
  if (AudioR.audioChange === false)
    dispatch(dataActions.setCurrentPercentage(currentPercentage));
  // when the state variable trackProgress changes the entire component rerenders so currentPercentage also changes

  const onChange = (e) => {
    if (AudioR.audioChange === false) {
      dispatch(audioActions.setAudioChange(true));
      const audio = audioRef.current;
      // audio.pause();
      audio.currentTime = (audio.duration / 100) * e.target.value;
      // console.log("changed on click !!",audio.currentTime,(audio.duration / 100) * e.target.value);
      dispatch(dataActions.setCurrentPercentage(e.target.value));
      dispatch(audioActions.setValue(e.target.value));
      dispatch(audioActions.setAudioChange(false));
    }
  }


  useEffect(() => {
    if (AudioR?.audioChange === true) {
      const audio = audioRef.current;
      audio.currentTime = (audio.duration / 100) * AudioR?.value;
      console.log("changed on click 2", audio.currentTime);
      dispatch(dataActions.setCurrentPercentage(AudioR?.value));
      dispatch(audioActions.setAudioChange(false));
      dispatch(audioActions.setValue(-1));
    }
  }, [AudioR?.audioChange])


  let startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        //ended is a audio property 
        dispatch(dataActions.handlenext());
        dispatch(dataActions.setTrackProgess(0));
        // sendData();
      }
      else {
        // setTrackProgress(audioRef.current.currentTime);

        dispatch(dataActions.setTrackProgess(audioRef.current.currentTime));

        //currentTime is also the audio property
      }
      // this is why component is being rendered every time
    }, [1000]);
  }


  //for clening up
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, []);


  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    dispatch(dataActions.setTrackProgess(audioRef.current.currentTime));

    if (data?.operation === 2) {
      dispatch(dataActions.setCurrenttrack(data?.currenttrack));
    }
    else if (data?.operation === 1) {
      dispatch(dataActions.setCurrenttrack(data?.track[data?.currentindex]?.track));
      dispatch(dataActions.setImg(data?.track[data?.currentindex]?.track?.album?.images[0]?.url));
    }
    else if (data?.operation === 3) {
      dispatch(dataActions.setCurrenttrack(data?.track[data?.currentindex]));
    }

    if (isReady.current) {
      if (data?.isPlaying) {
        audioRef.current.play();
        dispatch(dataActions.handleplay(data?.isPlaying));
        startTimer();
      }

    }
    else {
      isReady.current = true;
    }


  }, [data?.currentindex, data?.track]);//data?.currenttrack
  //because the delete button changes the currenttrack but not the currentindex



  useEffect(() => {
    if (data?.isPlaying !== undefined) {
      if (audioRef.current.src) {
        if (data?.isPlaying) {
          audioRef.current.play();
          startTimer();
        }
        else {
          clearInterval(intervalRef.current);
          audioRef.current.pause();
        }
      }
      else {
        if (data?.isPlaying) {
          audioRef.current = new Audio(audioSrc);
          audioRef.current.play();
          startTimer();
        }
        else {
          clearInterval(intervalRef.current);
          audioRef.current.pause();
        }
      }
    }
  }, [data?.isPlaying]);

  let navigate = useNavigate();
  let handleExport = () => {
    dispatch(dataActions.setShow(info.id));
    navigate("/player", { state: { id: info.id, operation: info.operation, img: info.img, name: info.name, des: info.des } });
  }


  let handleprev = () => {
    dispatch(dataActions.handleprev());
  }

  let handlenext = () => {
    dispatch(dataActions.handlenext());
  }

  let handlePlay = () => {
    dispatch(dataActions.handleplay(!data?.isPlaying));
  }


  let addzero = (n) => {
    if (n !== undefined)
      return n > 9 ? "" + n : "0" + n;
    else
      return 0;
  }

  let artists = [];
    if (data?.operation === 1) {
        data?.currenttrack?.album?.artists.forEach((artist) => {
            artists.push(artist.name);
        });
    }
    else if (data?.operation === 3) {
        data?.currenttrack?.artists?.forEach((artist) => {
            artists.push(artist.name);
        })
    }
    else if(data?.operation===2)
    {
        data?.currenttrack?.artists?.forEach((artist) => {
            artists.push(artist.name);
        })
    }

  return (
    <>
      {data?.show &&
        <div className='screen-hover flex'>
          <div className="mini-left ">
            <div className="mini-img">
              <img src={(data?.img !== undefined) ? data?.img : ""} alt="Song" />
            </div>
            <div className="mini-text">
              <p className='text-song-heading'>{(data?.currenttrack?.name !== undefined) ? data?.currenttrack?.name : ""}</p>
              <p className='text-song-artist'>{artists.join(",")}</p>
            </div>
          </div>

          <div className="mini-center">
            <div className="mini-center-top flex">
              <p>0:{addzero(Math.round(data?.trackProgess))}</p>
              {!e?.show &&
                <Slider percentage={data?.currentPercentage} onChange={onChange} />
              }
              {
                e?.show &&
                <ErrorMsg3 />
              }
              <p>0:30</p>
            </div>
            <div className="mini-center-bottom">
              <IconContext.Provider value={{ size: "20px", color: "#c4d0e3" }}>
                <div className="controls-wrapper-mini flex">
                  <div className="action-btn flex" onClick={handleprev}>
                    <IoPlaySkipBack />
                  </div>
                  <div className="play-pause-btn-mini flex" onClick={handlePlay}>
                    {data?.isPlaying ? <FaPause /> : <IoPlay />}
                  </div>
                  <div className="action-btn flex" onClick={handlenext}>
                    <IoPlaySkipForward />
                  </div>
                </div>
              </IconContext.Provider>
            </div>

          </div>
          <div className="mini-right">
            <i className="fa-solid fa-arrow-up" onClick={handleExport}></i>
          </div>
        </div>
      }
    </>
  )
}

export default HoverPlayer
