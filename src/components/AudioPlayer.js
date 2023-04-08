import React, { useState, useRef, useEffect } from 'react'
import "../components_css/AudioPlayer.css"
import ProgressCircle from './ProgressCircle'
import WaveAnimation from './WaveAnimation'
import Controls from './Controls'

function AudioPlayer({ currenttrack, currentindex, setCurrentindex, total }) {
    // console.log(total);

    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    let audioSrc = total[currentindex]?.track.preview_url; //this store the song url which we are going to play
    let audioRef = useRef(new Audio(total[0]?.track.preview_url)); //initially we are initialing it with 0 index as default and when we got the current song url and we press the play button it will go to audioSrc

    let intervalRef = useRef();  //to start/stop the time counter

    let isReady = useRef(false);

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
        }, [1000]);
    }

    let addzero = (n) => {
        return n > 9 ? "" + n : "0" + n;
    }

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

    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);

        setTrackProgress(audioRef.current.currentTime); //if the other song was left in between 
        //else it will be 0

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();

        }
        else {
            isReady.current = true;
        }
    }, [currentindex]);

    //for clening up
    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);

    let handleNext = () => {
        if (currentindex < total.length - 1) {
            setCurrentindex(prevCurrentindex => prevCurrentindex + 1);
        }
        else
            setCurrentindex(0);
    }

    let handlePrev = () => {
        if (currentindex - 1 < 0)
            setCurrentindex(total.length - 1);
        else
            setCurrentindex(prevCurrentindex => prevCurrentindex - 1);
    }


    let artists = [];
    currenttrack?.album?.artists.forEach((artist) => {
        artists.push(artist.name);
    });

    // console.log(currenttrack);
    return (
        <div className="audio-body flex">
            <div className="audio-left-body">
                <ProgressCircle percentage={currentPercentage} isPlaying={isPlaying} image={currenttrack?.album?.images[0]?.url} size={300} color="#C96850" />
            </div>
            <div className="audio-right-body flex">
                <p className="song-title">{currenttrack?.name}</p>
                <p className="song-artist">{artists.join(" | ")}</p>
                <div className="audio-right-bottom flex">
                    <div className="song-duration flex">
                        <p className="duration">0:{addzero(Math.round(trackProgress))}</p>
                        <WaveAnimation isPlaying={isPlaying} />
                        <p className="duration">0:{Math.round(duration) === NaN ? "00" : Math.round(duration)}</p>
                    </div>
                    <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} handleNext={handleNext} handlePrev={handlePrev} />
                </div>

            </div>
        </div>
    )
}

export default AudioPlayer
