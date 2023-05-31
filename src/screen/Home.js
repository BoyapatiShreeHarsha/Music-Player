import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Library from './Library'
import Feed from './Feed'
import Search from './Search'
import Player from './Player'
import Favorites from './Favorites'
import Sidebar from '../components/Sidebar'
import '../screen_css/home.css'
import Login from './Auth';
import { setClienttoken } from "../spotify";
import MiniPlayer from '../components/MiniPlayer';
// import { useSelector } from 'react-redux';

export default function Home() {
    const [token, setToken] = useState("");
    useEffect(() => {
        let token = localStorage.getItem("token");

        const hash = window.location.hash;
        window.location.hash = "";

        if (!token && hash) {
            const _token = hash.split("&")[0].split("=")[1];
            localStorage.setItem("token", _token);
            setToken(_token);
            setClienttoken(_token);
        }
        else {
            // console.log("rendered");
            setToken(token);
            setClienttoken(token);
        }
    }, [token]);
    // console.log("called_Home");
    if (!token)
        return (
            <>
                {/* console.log("called_Login"); */}
                <Login />
            </>
        )
    else
        return (
            <>
                {/* console.log("called_main part"); */}
                <BrowserRouter>
                    <div className="main-body">

                        <Sidebar />
                        <div className="screens">
                            <div className="container-1">
                            <Routes>
                                <Route exact path="/library" element={<Library />} />
                                <Route exact path="/" element={<Feed />} />
                                <Route exact path="/search" element={<Search />} />
                                <Route exact path="/player" element={<Player />} />
                                <Route exact path="/favorites" element={<Favorites />} />

                            </Routes>
                            </div>
                            <div className="container-2">
                                <MiniPlayer/>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </>
        )
}
