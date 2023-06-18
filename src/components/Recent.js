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

const Recent = () => {

  const [recent, setRecent] = useState([]);
  const [af, setAf] = useState(0);
  const [bf, setBf] = useState(0);
  const [loading, setLoading] = useState(false);
  const [e, setE] = useState(false);

  let dispatch = useDispatch();

  //setting the variables for the buttons

  let after = af;
  let before = bf;
  let nl = 0;
  let pl = 0;
  let setAfter = (num) => {
    after = num;
    setAf(num);
  }
  let setBefore = (num) => {
    before = num;
    setBf(num);
  }

  //for first time render
  let flag = true;
  let checkInitial = () => {
    if (pl === 0) {
      document.getElementById("album-prev").classList.add('album-disabled');
    }
    else {
      document.getElementById("album-prev").classList.remove('album-disabled');
    }

    if (nl === 0) {
      document.getElementById('album-next').classList.add('album-disabled');
    }
    else {
      document.getElementById('album-next').classList.remove('album-disabled');
    }

  }
  let update_prev = async () => {
    try {
      setLoading(true);
      let response_now = await apiClient.get(`v1/me/player/recently-played?limit=5&before=${before}`);

      setAfter(response_now?.data?.cursors?.after);
      setBefore(response_now?.data?.cursors?.before);
      setRecent([...response_now?.data?.items]);
      let response_before = await apiClient.get(`v1/me/player/recently-played?limit=5&before=${before}`);
      pl = response_before?.data?.items.length;
      let response_after = await apiClient.get(`v1/me/player/recently-played?limit=5&after=${after}`);
      nl = response_after?.data?.items.length;
      setLoading(false);
      checkInitial();
      setE(false);
    } catch (error) {
      setE(true);
      dispatch(errorActions.setCode(3));
      dispatch(errorActions.setMsg(error?.response?.data?.error?.message));
      console.log(error);
    }
  }
  let update_next = async () => {
    try {
      setLoading(true);
      let response_now = await apiClient.get(`v1/me/player/recently-played?limit=5&after=${after}`);

      if (response_now?.data?.items.length === 0) {
        setE(true);
        dispatch(errorActions.setCode(2));
        dispatch(errorActions.setMsg("You don't have any recently played songs"))
      }
      else
        setE(false);
      setAfter(response_now?.data?.cursors?.after);
      setBefore(response_now?.data?.cursors?.before);
      setRecent([...response_now?.data?.items]);
      let response_before = await apiClient.get(`v1/me/player/recently-played?limit=5&before=${before}`);
      pl = response_before?.data?.items.length;
      let response_after = await apiClient.get(`v1/me/player/recently-played?limit=5&after=${after}`);
      nl = response_after?.data?.items.length;
      setLoading(false);
      checkInitial();
    } catch (error) {
      setE(true);
      dispatch(errorActions.setCode(3));
      dispatch(errorActions.setMsg(error?.response?.data?.error?.message));
      console.log(error);
    }
  }

  let timearr = (s) => {
    let ans = "";
    let date = s.split("T")[0].split("-")[2];
    let month = s.split("T")[0].split("-")[1];
    let h = s.split("T")[1].split(":")[0];
    let min = s.split("T")[1].split(":")[1];
    ans = `${h}:${min} on ${date}-${month}`;
    return ans;
  }

  useEffect(() => {
    if (flag) {
      update_next();
      flag = false;
    }
  }, []);

  let handlePrevious = async () => {
    update_prev();
  }

  let handleNext = async () => {
    update_next();
  }

  let navigate = useNavigate();
  let PlayRecent = (id, img, name, artist_arr, type) => {
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
    <div className="albums-body">
      <div className="album-top-body">
        <div className="albums-header">
          <div className="main-header">Recently Played</div>
        </div>
        <div className="albums-buttons">
          <span onClick={handlePrevious} id='album-prev' >
            <i className="fa-solid fa-arrow-left" style={{ color: "#ffffff", size: "20px" }}  ></i>
          </span>
          <span onClick={handleNext} id='album-next'>
            <i className="fa-solid fa-arrow-right" style={{ color: "#ffffff", size: "20px" }} ></i>
          </span>
        </div>
      </div>
      <hr style={{ color: "white", border: "1" }} />
      {loading && !e && <Loader />}

      {!loading && !e &&
        <div className="albums-bottom-body" style={{ display: loading ? 'none' : 'flex' }}>
          {
            recent.map((ele) => {
              return (
                <div key={ele?.track?.id} className="album-card" onClick={() => PlayRecent(ele?.track?.id, ele?.track?.album?.images[0].url, ele?.track?.name, ele?.track?.artists, ele.track?.type)} >
                  <img src={ele?.track?.album?.images[0].url} className="album-img" alt="album img" />
                  <p className="album-title">{ele?.track?.name}</p>
                  <p className="album-subtitle">{artists_name(ele?.track?.artists)}</p>
                  <p className="album-subtitle">{`Last Played at ${timearr(ele?.played_at)}`}</p>
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

export default Recent
