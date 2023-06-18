import React, { useEffect, useState } from 'react'
import apiClient from '../spotify'
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import Loader from './Loder';
import "../components_css/album.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { errorActions } from '../store/error-slice';
import ErrorMsg from './ErrorMsg';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  const [number, setNumber] = useState(0)
  //setting the variables for the buttons
  const [e, setE] = useState(false);
  let dispatch = useDispatch();

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
      document.getElementById("albums-prev").classList.add('album-disabled');
    }
    else {
      document.getElementById("albums-prev").classList.remove('album-disabled');
    }

    if (total <= 5) {
      document.getElementById('albums-next').classList.add('album-disabled');
    }
    else {
      document.getElementById('albums-next').classList.remove('album-disabled');
    }

    if (offset >= total - 5) {
      document.getElementById("albums-next").classList.add('album-disabled');
    }
    else {
      document.getElementById('albums-next').classList.remove('album-disabled');
    }

  }

  let update_album = async () => {
    try {
      setLoading(true);
      let response = await apiClient.get(`/v1/browse/featured-playlists?country=IN&offset=${offset}&limit=5`);
      setAlbums([...response?.data?.playlists?.items]);
      if (response?.data?.playlists?.items === 0) {
        setE(true);
        dispatch(errorActions.setCode(2));
        dispatch(errorActions.setMsg("It seems there are no more recomendations"));
      }
      setTotal(response?.data?.playlists?.total);
      setLoading(false);
      checkInitial();
    } catch (error) {
      setE(true);
      dispatch(errorActions.setCode(3));
      dispatch(errorActions.setMsg(error?.response?.data?.error?.message));
      console.log(error);
    }
  }

  useEffect(() => {
    if (flag) {
      update_album();
      flag = false;
    }
  }, []);

  let handlePrevious = async () => {
    setOffset(-5);
    setNumber(offset);
    update_album();
  }

  let handleNext = async () => {
    setOffset(+5);
    setNumber(offset);
    update_album();
  }

  let navigate = useNavigate();
  let PlayAlbums = (id, img, name, des) => {
    // console.log(id); 
    navigate("/player", { state: { id: id, operation: 1, img: img, name: name, des: des } });
  }

  return (
    <div className="albums-body">
      <div className="album-top-body">
        <div className="albums-header">
          <div className="main-header">Recommendations</div>
          <div className="sub-heading">editors choice</div>
        </div>
        <div className="albums-buttons">
          <span onClick={handlePrevious} id='albums-prev' >
            <i className="fa-solid fa-arrow-left" style={{ color: "#ffffff", size: "20px" }}  ></i>
          </span>
          <span onClick={handleNext} id='albums-next'>
            <i className="fa-solid fa-arrow-right" style={{ color: "#ffffff", size: "20px" }} ></i>
          </span>
        </div>
      </div>
      <hr style={{ color: "white", border: "1" }} />
      {loading && !e && <Loader />}

      {!e && !loading &&
        <div className="albums-bottom-body" style={{ display: loading ? 'none' : 'flex' }}>
          {
            albums.map((album) => {
              return (
                <div key={album.id} className="album-card" onClick={() => PlayAlbums(album?.id, album?.images[0]?.url, album?.name, album?.description)} >
                  <img src={album?.images[0]?.url} className="album-img" alt="album img" />
                  <p className="album-title">{album?.name}</p>
                  <p className="album-subtitle">{album?.tracks?.total} Songs</p>
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
      }

      {
        e && <ErrorMsg />
      }
    </div>
  )
}

export default Albums

