import React,{useEffect,useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Library from './Library'
import Feed from './Feed'
import Trending from './Trending'
import Player from './Player'
import Favorites from './Favorites'
import Sidebar from '../components/Sidebar'
import '../screen_css/home.css'
import Login from './Auth';
import {setClienttoken} from "../spotify";

export default function Home() {
    const [token, setToken] = useState("");
    useEffect(() => {
        let token = localStorage.getItem("token");
        
        const hash =window.location.hash;
        window.location.hash="";

        if(!token && hash)
        {
            const _token=hash.split("&")[0].split("=")[1];
            localStorage.setItem("token",_token);
            setToken(_token);
            setClienttoken(_token);
        }
        else
        {
            setToken(token);
        setClienttoken(token);
        }
    }, []);
    if(!token)
    return (
        <Login/>
    )
    else
    return (
        <>
            <BrowserRouter>
                <div className="main-body">
                    
                    <Sidebar />
                    <Routes>
                        <Route exact path="/" element={<Library />} />
                        <Route exact path="/feed" element={<Feed />} />
                        <Route exact path="/trending" element={<Trending />} />
                        <Route exact path="/player" element={<Player />} />
                        <Route exact path="/favorites" element={<Favorites />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}
