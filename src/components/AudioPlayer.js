import React, { useState, useEffect } from 'react'
import "../components_css/AudioPlayer.css"
import ProgressCircle from './ProgressCircle'
import Controls from './Controls'
import { useDispatch, useSelector } from 'react-redux'
import { dataActions } from '../store/data-slice'
import { infoActions } from '../store/info-slice'
import Slider from './Slider'
import { audioActions } from '../store/audio-slice'
import ErrorMsg3 from './ErrorMsg3'

function AudioPlayer({ info, currenttrack, currentindex, setCurrentindex, track, img }) {
    // this component is being rendered every second
    // console.log(currenttrack);
    const [isPlaying, setIsPlaying] = useState(false);
    const [display, setDisplay] = useState(true);

    let dispatch = useDispatch();
    let data = useSelector(state => state.data);
    let e = useSelector(state => state.error);

    let id = info?.id;
    let operation = info?.operation;


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
    // console.log("isPlaying ",isPlaying,"display ",display,"data.show",data?.show);

    useEffect(() => {
        if(display===false)
        {
            dispatch(dataActions.setIsPlaying(isPlaying));
        }
        if (isPlaying === true) {
            if (display === true) {
                sendData();
                setDisplay(false);
                // console.log("sending AP data if part");
                dispatch(infoActions.setId(info.id));
                dispatch(infoActions.setOperation(info.operation));
                dispatch(infoActions.setName(info.name));
                dispatch(infoActions.setDes(info.des));
                dispatch(infoActions.setImg(info.img));

                dispatch(dataActions.setShow(id));
            }
        }
        // else {
        //     if (display === false) {
        //         // setDisplay(true);
        //         // console.log("sending AP data else part");
        //         sendData();
        //     }
        // }
    }, [isPlaying, id, currenttrack, track, operation, img]);


    useEffect(() => {
        if (display === false && currentindex != data?.currentindex) {
            // console.log("data is setting the index",data?.currentindex);
            setCurrentindex(data?.currentindex);
        }

        if (data.show === false && data.id === id && data?.currentindex !== currentindex && display == true) {
            // console.log("Meet the conditions");
            setDisplay(false);
            // dispatch(dataActions.setImportdata(true));
            setIsPlaying(data?.isPlaying);
            setCurrentindex(data?.currentindex);
        }
    }, [data])


    const onChange = (e) => {
        dispatch(audioActions.setValue(e.target.value));
        dispatch(audioActions.setAudioChange(true));
    }


    let addzero = (n) => {
        if (n !== undefined)
            return n > 9 ? "" + n : "0" + n;
        else
            return 0;
    }



    let handleNext = () => {
        if (display === true) {
            if (currentindex < track.length - 1) {
                setCurrentindex(prevCurrentindex => prevCurrentindex + 1);
            }
            else
                setCurrentindex(0);
        }
        else {
            dispatch(dataActions.handlenext());
        }
    }

    let handlePrev = () => {
        if (display === true) {
            if (currentindex - 1 < 0)
                setCurrentindex(track.length - 1);
            else
                setCurrentindex(prevCurrentindex => prevCurrentindex - 1);
        }
        else {
            dispatch(dataActions.handleprev());
        }
    }


    let artists = [];
    if (operation === 1) {
        currenttrack?.album?.artists.forEach((artist) => {
            artists.push(artist.name);
        });
    }
    else if (operation === 3) {
        currenttrack?.artists?.forEach((artist) => {
            artists.push(artist.name);
        })
    }
    else if(operation===2)
    {
        currenttrack?.artists?.forEach((artist) => {
            artists.push(artist.name);
        })
    }


    return (
        <div className="audio-body flex">
            <div className="audio-left-body">
                <ProgressCircle percentage={(display === true) ? "00" : data?.currentPercentage} isPlaying={isPlaying} image={img} size={300} color="#C96850" />
            </div>
            <div className="audio-right-body flex">
                <p className="song-title">{currenttrack?.name}</p>
                <p className="song-artist">{artists.join(" | ")}</p>
                <div className="audio-right-bottom flex">
                    <div className="song-duration flex">
                        <p className="duration">0:{(display === true) ? "00" : addzero(Math.round(data?.trackProgess))}</p>
                        {!e?.show &&
                            <Slider percentage={(display === false) ? data?.currentPercentage : 0} onChange={onChange} />}
                        {
                            e?.show && <ErrorMsg3 />
                        }
                        <p className="duration">0:{Math.round(data?.duration) === 30 ? Math.round(data?.duration) : "30"}</p>
                    </div>
                    <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} handleNext={handleNext} handlePrev={handlePrev} currenttrack={currenttrack} />
                </div>

            </div>
        </div>
    )
}

export default AudioPlayer
