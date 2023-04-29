import React, { useEffect, useState } from 'react'
import apiClient from '../spotify'
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import Loader from './Loder';
import "../components_css/Toplist.css"
import "../components_css/album.css"

const Toplist = () => {
    const [tops, setTops] = useState([]);
    const [loading, setLoading] = useState(false);

    const [number, setNumber] = useState(0)
    //setting the variables for the buttons

    let total = 0;
    let offset = number;
    let setTotal = (num) => {
        total = num;
        // console.log(total);
    }
    let setOffset = (num) => {
        offset += num;
    }

    //for first time render
    let flag = true;
    let checkInitial = () => {
        if (offset === 0) {
            document.getElementById("toplist-prev").classList.add('album-disabled');
        }
        else {
            document.getElementById("toplist-prev").classList.remove('album-disabled');
        }

        if (total <= 5) {
            document.getElementById('toplist-next').classList.add('album-disabled');
        }
        else {
            document.getElementById('toplist-next').classList.remove('album-disabled');
        }

        if (offset >= total - 5) {
            document.getElementById("toplist-next").classList.add('album-disabled');
        }
        else {
            document.getElementById('toplist-next').classList.remove('album-disabled');
        }

    }

    let update_topList = async () => {
        try {
            setLoading(true);
            let response = await apiClient.get(`/v1/browse/categories/toplists/playlists?country=IN&offset=${offset}&limit=5`);
            // console.log(response?.data?.playlists?.items);
            setTops([...response?.data?.playlists?.items]);
            setTotal(response?.data?.playlists?.total);
            setLoading(false);
            checkInitial();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (flag) {
            update_topList();
            flag = false;
        }
    }, []);

    let handlePrevious = async () => {
        setOffset(-5);
        setNumber(offset);
        update_topList();
    }

    let handleNext = async () => {
        setOffset(+5);
        setNumber(offset);
        update_topList();
    }

    let PlayAlbum = (id) => {
        console.log(id);
    }


    return (
        <div className="albums-body">
            <div className="album-top-body">
                <div className="albums-header">
                    <div className="main-header">India's Best</div>
                    <div className="sub-heading">listen to what people are vibing for</div>
                </div>
                <div className="albums-buttons">
                    <span onClick={handlePrevious} id='toplist-prev' >
                        <i className="fa-solid fa-arrow-left" style={{ color: "#ffffff", size: "20px" }}  ></i>
                    </span>
                    <span onClick={handleNext} id='toplist-next'>
                        <i className="fa-solid fa-arrow-right" style={{ color: "#ffffff", size: "20px" }} ></i>
                    </span>
                </div>
            </div>
            <hr style={{ color: "white", border: "1" }} />
            {loading && <Loader />}

            <div className="albums-bottom-body" style={{ display: loading ? 'none' : 'flex' }}>
                {
                    tops.map((top) => {
                        return (
                            <div key={top.id} className="album-card" onClick={() => PlayAlbum(top.id)} >
                                <img src={top.images[0].url} className="album-img" alt="album img" />
                                <p className="album-title">{top.name}</p>
                                <p className="album-subtitle">{top.tracks.total} Songs</p>
                                <div className="album-fade">
                                    <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                                        <AiFillPlayCircle />
                                    </IconContext.Provider>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Toplist
