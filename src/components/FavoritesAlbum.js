import React, { useEffect, useState } from 'react'
import apiClient from '../spotify'
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import Loader from './Loder';
import "../components_css/Fav_album.css"

const FavoritesAlbum = () => {
    const [fav_album, setfav_album] = useState([]);
  const [loading, setLoading] = useState(false);

  const [number, setNumber] = useState(0)
  //setting the variables for the buttons
 
  let total = 0;
  let offset=number;
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
      document.getElementById('fav_album-prev').classList.add('fav_album-disabled');
    }
    else {
      document.getElementById('fav_album-prev').classList.remove('fav_album-disabled');
    }

    if (total <= 5) {
      document.getElementById('fav_album-next').classList.add('fav_album-disabled');
    }
    else {
      document.getElementById('fav_album-next').classList.remove('fav_album-disabled');
    }

    if (offset >= total - 5) {
      document.getElementById('fav_album-next').classList.add('fav_album-disabled');
    }
    else
    {
      document.getElementById('fav_album-next').classList.remove('fav_album-disabled');
    }

  }

  let fav_update_album = async () => {
    try {
      setLoading(true);
      let response = await apiClient.get(`/v1/me/albums?offset=${offset}&limit=5`);
      // console.log(response?.data?.items);
      setfav_album([...response?.data?.items]);
      setTotal(response?.data?.total);
      setLoading(false);
      checkInitial();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (flag) {
      fav_update_album();
      flag = false;
    }
  }, []);

  let handlePrevious = async () => {
    setOffset(-5);
    setNumber(offset);
    fav_update_album();
  }

  let handleNext = async () => {
    setOffset(+5);
    setNumber(offset);  
    fav_update_album();
  }

  let PlayFavAlbum = (id) => {
    console.log(id);
  }
  return (
      <div className="fav_album-body">
        <div className="fav_album-top-body">
        <div className="fav_album-header">
          <div className="main-header">Fav_Albums</div>
        </div>
        <div className="fav_album-buttons">
          <span onClick={handlePrevious} id='fav_album-prev' >
            <i className="fa-solid fa-arrow-left" style={{ color: "#ffffff", size: "20px" }}  ></i>
          </span>
          <span onClick={handleNext} id='fav_album-next'>
            <i className="fa-solid fa-arrow-right" style={{ color: "#ffffff", size: "20px" }} ></i>
          </span>
        </div>
      </div>
      <hr />
      {loading && <Loader />}

      <div className="fav_album-bottom-body" style={{ display: loading ? 'none' : 'flex' }}>
        {
          fav_album.map((ele) => {
            return (
              <div key={ele?.album?.id} className="fav_album-card" onClick={() => PlayFavAlbum(ele?.album?.id)} >
                <img src={ele?.album.images[0]?.url} className="album-img" alt="album img" />
                <p className="fav_album-title">{ele?.album?.name}</p>
                <p className="fav_album-subtitle">{ele?.album?.tracks?.total} Songs</p>
                <div className="fav_album-fade">
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

export default FavoritesAlbum
