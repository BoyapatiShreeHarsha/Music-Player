import React, { useEffect, useState } from 'react'
import apiClient from '../spotify'
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import '../components_css/FavoritesTrack.css'
import Loader from './Loder';
import { useNavigate } from 'react-router-dom';
import ErrorMsg from './ErrorMsg';
import { useDispatch } from 'react-redux';
import { errorActions } from '../store/error-slice';

const FavoritesTrack = () => {

  const [fav_tracks, setFav_tracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(0)
  //setting the variables for the buttons
  const [e, setE] = useState(false);
  let dispatch=useDispatch();

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
      document.getElementById("fav-tracks-prev").classList.add('fav-tracks-disabled');
    }
    else {
      document.getElementById("fav-tracks-prev").classList.remove('fav-tracks-disabled');
    }

    if (total <= 5) {
      document.getElementById('fav-tracks-next').classList.add('fav-tracks-disabled');
    }
    else {
      document.getElementById('fav-tracks-next').classList.remove('fav-tracks-disabled');
    }

    if (offset >= total - 5) {
      document.getElementById("fav-tracks-next").classList.add('fav-tracks-disabled');
    }
    else {
      document.getElementById('fav-tracks-next').classList.remove('fav-tracks-disabled');
    }

  }



  let update_fav = async () => {
    try {
      setLoading(true);
      let response = await apiClient.get(`/v1/me/tracks?country=IN&offset=${offset}&limit=5`);
      // console.log(response);
      setTotal(response?.data?.total);
      if (response?.data?.total===0) {
        setE(true);
        dispatch(errorActions.setCode(2));
        dispatch(errorActions.setMsg("It seems there are no more songs"));
      }
      setFav_tracks([...response?.data?.items]);
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
      update_fav();
      flag = false;
    }
  }, []);

  let handlePrevious = async () => {
    setOffset(-5);
    setNumber(offset);
    update_fav();

  }

  let handleNext = async () => {
    setOffset(+5);
    setNumber(offset);
    update_fav();

  }

  let navigate = useNavigate();
  let FavPlayTrack = (id, img, name, artist_arr, type) => {
    let artist = [];
    artist_arr?.forEach((element) => {
      artist.push(element.name);
    });

    let des = `It is a ${type} by ${artist.join(", ")}`
    navigate("/player", { state: { id: id, operation: 2, img: img, name: name, des: des } });
  }

  let artists_name = (arr) => {
    let ans = "";
    for (let i = 0; i < arr.length; i++) {
      if (i != arr.length - 1) {
        ans += arr[i]?.name;
        ans += ", "
      }
      else
        ans += arr[i]?.name;
    }
    return ans;
  }

  return (
    <div className="fav-tracks-body">
      <div className="fav-tracks-top-body">
        <div className="fav-tracks-header">
          <div className="main-header">Fav-Tracks</div>
        </div>
        <div className="fav-tracks-buttons">
          <span onClick={handlePrevious} id='fav-tracks-prev' >
            <i className="fa-solid fa-arrow-left" style={{ color: "#ffffff", size: "20px" }}  ></i>
          </span>
          <span onClick={handleNext} id='fav-tracks-next'>
            <i className="fa-solid fa-arrow-right" style={{ color: "#ffffff", size: "20px" }} ></i>
          </span>
        </div>
      </div>
      <hr />

      {loading && !e && <Loader />}
      {!loading && !e && (<div className="fav-tracks-bottom-body">
        {
          fav_tracks.map((ele) => {
            return (<div key={ele.track?.id} className='fav-tracks-card' onClick={() => FavPlayTrack(ele.track?.id, ele.track?.album?.images[0]?.url, ele.track?.album?.name, ele.track?.album?.artists, ele.track?.type)}>
              <img src={ele.track?.album?.images[0]?.url} className="fav-tracks-img" alt="fav-tracks img" />
              <p className="fav-tracks-title">{ele.track?.album?.name}</p>
              <p className="fav-tracks-artist">{artists_name(ele.track?.album?.artists)}</p>
              <div className="fav-tracks-fade">
                <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                  {/* need to do something onclick */}
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </div>
            </div>)
          })
        }
      </div>)}
      {
        e && <ErrorMsg />
      }

    </div>
  )
}

export default FavoritesTrack
