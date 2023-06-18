import React, { useEffect, useState } from 'react'
import apiClient from '../spotify'
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import '../screen_css/library.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { errorActions } from '../store/error-slice';
import Loader from '../components/Loder';
import ErrorMsg from '../components/ErrorMsg';

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [e, setE] = useState(false);
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  let getplaylist = async () => {
    try {
      setLoading(true);
      let respons2 = await apiClient.get(`/v1/me/playlists?offset=0&limit=50`);
      setPlaylists(respons2?.data?.items);
      if (respons2?.data?.items===0) {
        setE(true);
        dispatch(errorActions.setCode(2));
        dispatch(errorActions.setMsg("It seems that you don't have any library's"));
      }
      setLoading(false);
    } catch (error) {
      setE(true);
      dispatch(errorActions.setCode(3));
      dispatch(errorActions.setMsg(error?.response?.data?.error?.message));
      console.log(error);
    }
  }
  useEffect(() => {
    getplaylist();
  }, []);

  let navigate = useNavigate();
  let PlayPlaylist = (id, img, name, des) => {
    navigate("/player", { state: { id: id, operation: 1, img: img, name: name, des: des } });
  }
  return (
    <>
      <div className='screen-container' >

        {loading && !e && <Loader />}
        {!loading && !e &&
          <div className="library-body">
            {
              playlists.map((playlist) => {
                return (<div key={playlist.id} className="playlist-card" onClick={() => PlayPlaylist(playlist?.id, playlist?.images[0]?.url, playlist?.name, playlist?.description)}>
                  <img src={playlist?.images[0]?.url} className="playlist-img" alt="Playlist img" />
                  <p className="playlist-title">{playlist?.name}</p>
                  <p className="playlist-subtitle">{playlist?.tracks?.total} Songs</p>
                  <div className="playlist-fade">
                    <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                      <AiFillPlayCircle />
                    </IconContext.Provider>
                  </div>
                </div>)
              })
            }

          </div>
        }

        {
          e && <ErrorMsg />
        }
      </div>
    </>
  )
}
