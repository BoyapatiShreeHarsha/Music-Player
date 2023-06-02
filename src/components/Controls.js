import React, { useState, useEffect } from 'react'
import "../components_css/Controls.css"
import { IconContext } from 'react-icons'
import { FaPause } from "react-icons/fa"
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay } from "react-icons/io5"
import apiClient from '../spotify'
import { useDispatch, useSelector } from 'react-redux'
import { modalActions } from '../store/modal-slice'

const Controls = ({ isPlaying, setIsPlaying, handleNext, handlePrev, currenttrack}) => {
  //data comes here every sec that why for fav checkFav is there
  
  const [fav, setFav] = useState(false);
  let modal=useSelector(state=>state.modal);
  let dispatch=useDispatch();

  let checkFavonTrack = async () => {
    if (currenttrack?.id) {
      let response = await apiClient.get(`/v1/me/tracks/contains?ids=${currenttrack?.id}`);
      // console.log(response?.data[0]);
      setFav(response?.data[0]);
    }
  }

  let falsetheFavonTrack = async () => {
    let response = await apiClient.delete(`/v1/me/tracks?ids=${currenttrack?.id}`, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // console.log(response);
    setFav(false);
  }

  let truetheFavonTrack = async () => {
    let response = await apiClient.put(`/v1/me/tracks?ids=${currenttrack?.id}`, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // console.log(response);
    setFav(true);
  }

  useEffect(() => {
    checkFavonTrack();
  }, [currenttrack])


  return (
    <>
      <div className="controls">
        <IconContext.Provider value={{ size: "35px", color: "#c4d0e3" }}>
          <div className="controls-wrapper flex">
            <div className="action-btn flex" onClick={handlePrev}>
              <IoPlaySkipBack />
            </div>
            <div className="play-pause-btn flex" onClick={() => { setIsPlaying(!isPlaying) }}>
              {isPlaying ? <FaPause /> : <IoPlay />}
            </div>
            <div className="action-btn flex" onClick={handleNext}>
              <IoPlaySkipForward />
            </div>
          </div>
        </IconContext.Provider>
        <div className="control-icons" >
          { !modal?.modal1 &&
          <i className="fa-solid fa-ellipsis-vertical" style={{ color: "white",cursor:"pointer" }} onClick={() => {
            dispatch(modalActions.setModal3(true));
            setIsPlaying(false);
          }} ></i>
        }

          {fav === false &&
            <div className="cover-buttons" onClick={truetheFavonTrack} style={{ marginLeft: "5px" }}>
              <i className="fa-regular fa-heart" style={{ color: '#c96850', fontSize: 'larger' }}></i>
            </div>}
          {fav === true &&
            <div className="cover-buttons" onClick={falsetheFavonTrack} style={{ marginLeft: "5px" }}>
              <i className="fa-solid fa-heart" style={{ color: '#c96850', fontSize: 'larger' }} ></i>
            </div>}
        </div>
      </div>
    </>
  )
}

export default Controls
