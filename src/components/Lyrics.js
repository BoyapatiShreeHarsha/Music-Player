import React, { useState, useEffect } from 'react'
import "../components_css/Lyrics.css"
import axios from 'axios';

const Lyrics = ({ currenttrack, info }) => {


    // const [Title, setTitle] = useState("");
    // const [Artist, setArtist] = useState("");
    
    let operation = info?.operation;

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
    else if (operation === 2) {
        currenttrack?.artists?.forEach((artist) => {
            artists.push(artist.name);
        })
    }
    // setArtist(artists[0]);
    let Artist = artists[0];
    let name = currenttrack?.name;
    let title = "";
    if (name != "") {
        for (let i = 0; i < name?.length; i++) {
            if (name[i] === ' ') {
                title += "%20";
            }
            else
                title += name[i];
        }
    }
    // setTitle(title);
    let Title = title;

    // console.log(Title, Artist);
    let data="";
    let getLyrics = async () => {
        try {
            let response = await axios.get(`https://api.lyrics.ovh/v1/${Artist}/${Title}`);
            // console.log(response);
            data=response?.data;

        } catch (error) {
            // console.log("error");
            data="No Lyrics Found"
        }
    }

    useEffect(() => {
        getLyrics();
    }, [])



    return (
        <div className='lyrics-body'>
            <p>{data}</p>
        </div>
    )
}

export default Lyrics
