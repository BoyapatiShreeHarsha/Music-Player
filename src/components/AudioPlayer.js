import React, { useState, useRef, useEffect } from 'react'
import "../components_css/AudioPlayer.css"
import ProgressCircle from './ProgressCircle'
import WaveAnimation from './WaveAnimation'
import Controls from './Controls'

function AudioPlayer({ currenttrack, currentindex, setCurrentindex, track,operation,img,setOpenModal3}) {
    // this component is being rendered every second

    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);

    let aS="";
    if(operation===2)
    {
        aS = currenttrack?.preview_url;
    }
    else if(operation===1)
    {
        aS = track[currentindex]?.track.preview_url;
    }
    else if(operation===3)
    {
        aS=track[currentindex]?.preview_url;
    }

    let audioSrc = aS //this store the song url which we are going to play
    let audioRef = useRef(new Audio(aS));// returns a HTMLAudioElement which can be either attached to a document for the user to interact with and/or listen to, or can be used offscreen to manage and play audio.
     //initially we are initialing it with 0 index as default and when we got the current song url and we press the play button it will go to audioSrc

     

    let intervalRef = useRef();  //a pointer towards that particular trackes created setInterval

    let isReady = useRef(false);  //it need to survive the render as this component is being rendered every second we can't run a function every sec

    let { duration } = audioRef.current; 

    let currentPercentage = duration ? (trackProgress / duration) * 100 : 0; // when the state variable trackProgress changes the entire component rerenders so currentPercentage also changes

    let startTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                //ended is a audio property 
                handleNext();
            }
            else {
                setTrackProgress(audioRef.current.currentTime);
                //currentTime is also the audio property
            }
            // this is why component is being rendered every time
        }, [1000]);
    }

    let addzero = (n) => {
        return n > 9 ? "" + n : "0" + n;
    }

    //for clening up
    useEffect(() => {
        return () => {
            audioRef.current.pause();//i have to change here for the usecontext
            clearInterval(intervalRef.current);
        }
    }, []);


    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);

        setTrackProgress(audioRef.current.currentTime); 

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();

        }
        else {
            isReady.current = true;
        }
    }, [currentindex,currenttrack]); //because the delete button changes the currenttrack but not the currentindex

    useEffect(() => {
        if (audioRef.current.src) {
            if (isPlaying) {
                audioRef.current.play();
                startTimer();
            }
            else {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        }
        else {
            if (isPlaying) {
                audioRef.current = new Audio(audioSrc);
                audioRef.current.play();
                startTimer();
            }
            else {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);


    let handleNext = () => {
        if (currentindex < track.length - 1) {
            setCurrentindex(prevCurrentindex => prevCurrentindex + 1);
        }
        else
            setCurrentindex(0);
    }

    let handlePrev = () => {
        if (currentindex - 1 < 0)
            setCurrentindex(track.length - 1);
        else
            setCurrentindex(prevCurrentindex => prevCurrentindex - 1);
    }


    let artists = [];
    currenttrack?.album?.artists.forEach((artist) => {
        artists.push(artist.name);
    });

   
    return (
        <div className="audio-body flex">
            <div className="audio-left-body">
                <ProgressCircle percentage={currentPercentage} isPlaying={isPlaying} image={img} size={300} color="#C96850" />
            </div>
            <div className="audio-right-body flex">
                <p className="song-title">{currenttrack?.name}</p>
                <p className="song-artist">{artists.join(" | ")}</p>
                <div className="audio-right-bottom flex">
                    <div className="song-duration flex">
                        <p className="duration">0:{addzero(Math.round(trackProgress))}</p>
                        <WaveAnimation isPlaying={isPlaying} />
                        <p className="duration">0:{Math.round(duration) === 30 ? Math.round(duration) : "30"}</p>
                    </div>
                    <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} handleNext={handleNext} handlePrev={handlePrev} currenttrack={currenttrack} setOpenModal3={setOpenModal3} />
                </div>

            </div>
        </div>
    )
}

export default AudioPlayer
