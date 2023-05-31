import React, { useState, useEffect } from 'react'
import "../components_css/AudioPlayer.css"
import ProgressCircle from './ProgressCircle'
import WaveAnimation from './WaveAnimation'
import Controls from './Controls'
import { useDispatch, useSelector } from 'react-redux'
import { dataActions } from '../store/data-slice'
import { infoActions } from '../store/info-slice'

function AudioPlayer({ info, currenttrack, currentindex, setCurrentindex, track, img, setOpenModal3}) {
    // this component is being rendered every second

    const [isPlaying, setIsPlaying] = useState(false);
    const [display, setDisplay] = useState(true);

    let dispatch = useDispatch();
    let data = useSelector(state => state.data);
    let id=info?.id;
    let operation=info?.operation;


    let sendData = () => {
        dispatch(dataActions.setCurrenttrack(currenttrack));
        dispatch(dataActions.setCurrentindex(currentindex));
        dispatch(dataActions.setTrack(track));

        dispatch(dataActions.setOperation(operation));
        dispatch(dataActions.setImg(img));
        dispatch(dataActions.setId(id));

        dispatch(dataActions.setIsPlaying(isPlaying));
    }


    //changing the state acc to the mini-player


    useEffect(() => {
      dispatch(dataActions.setShow(id));
      if(isPlaying===true)
      {
        if(display===true)
        {
            setDisplay(false);
            sendData();
            // console.log("sending AP data if part");
            dispatch(infoActions.setId(info.id));
            dispatch(infoActions.setOperation(info.operation));
            dispatch(infoActions.setName(info.name));
            dispatch(infoActions.setDes(info.des));
            dispatch(infoActions.setImg(info.img));
        }
      }
      else
      {
        if(display===false)
        {
            setDisplay(true);
            // console.log("sending AP data else part");
            sendData();
        }
      }
    }, [isPlaying,id, currenttrack, track, operation, img]);


    useEffect(() => {
      if(display===false && currentindex!=data?.currentindex )
      {
        // console.log("data is setting the index",data?.currentindex);
        setCurrentindex(data?.currentindex);
      }

      if(data.show===false && data.id===id && data?.currentindex!==currentindex && display==true)
      {
        // console.log("Meet the conditions");
        setDisplay(false);
        // dispatch(dataActions.setImportdata(true));
        setIsPlaying(data?.isPlaying);
        setCurrentindex(data?.currentindex);
      }
    }, [data])
    

    

    let addzero = (n) => {
        if (n !== undefined)
          return n > 9 ? "" + n : "0" + n;
        else
          return 0;
      }

     

    let handleNext = () => {
        if(display===true)
        {
        if (currentindex < track.length - 1) {
            setCurrentindex(prevCurrentindex => prevCurrentindex + 1);
        }
        else
            setCurrentindex(0);
    }
    else
    {
        dispatch(dataActions.handlenext());
    }
    }

    let handlePrev = () => {
        if(display===true)
        {
        if (currentindex - 1 < 0)
            setCurrentindex(track.length - 1);
        else
            setCurrentindex(prevCurrentindex => prevCurrentindex - 1);
        }
        else
        {
            dispatch(dataActions.handleprev());
        }
    }


    let artists = [];
    currenttrack?.album?.artists.forEach((artist) => {
        artists.push(artist.name);
    });


    return (
        <div className="audio-body flex">
            <div className="audio-left-body">
                <ProgressCircle percentage={(display===true)?"00":data?.currentPercentage} isPlaying={isPlaying} image={img} size={300} color="#C96850" />
            </div>
            <div className="audio-right-body flex">
                <p className="song-title">{currenttrack?.name}</p>
                <p className="song-artist">{artists.join(" | ")}</p>
                <div className="audio-right-bottom flex">
                    <div className="song-duration flex">
                        <p className="duration">0:{(display===true)?0:addzero(Math.round(data?.trackProgess))}</p>
                        <WaveAnimation isPlaying={isPlaying} />
                        <p className="duration">0:{Math.round(data?.duration) === 30 ? Math.round(data?.duration) : "30"}</p>
                    </div>
                    <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} handleNext={handleNext} handlePrev={handlePrev} currenttrack={currenttrack} setOpenModal3={setOpenModal3} />
                </div>

            </div>
        </div>
    )
}

export default AudioPlayer
