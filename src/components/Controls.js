import React from 'react'
import "../components_css/Controls.css"
import { IconContext } from 'react-icons'
import {FaPause} from "react-icons/fa"
import {IoPlaySkipBack,IoPlaySkipForward,IoPlay} from "react-icons/io5"

const Controls = ({isPlaying, setIsPlaying, handleNext, handlePrev}) => {
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
      </div>
    </IconContext.Provider>

  )
}

export default Controls
