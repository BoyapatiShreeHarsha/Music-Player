import React, { useEffect, useState } from 'react'
import apiClient from '../spotify'
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import '../components_css/release.css'
import Loader from './Loder';


export default function Feed() {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(0);


  //setting the variables for the buttons
 
  let total = 0;
  let offset=number;
  let setTotal = (num) => {
    total = num;
  }
  let setOffset = (num) => {
    offset += num;
  }

  //for first time render
  let flag = true;
  let checkInitial = () => {
    if (offset === 0) {
      document.getElementById("release-prev").classList.add('release-disabled');
    }
    else {
      document.getElementById("release-prev").classList.remove('release-disabled');
    }

    if (total <= 5) {
      document.getElementById('release-next').classList.add('release-disabled');
    }
    else {
      document.getElementById('release-next').classList.remove('release-disabled');
    }

    if (offset >= total - 5) {
      document.getElementById("release-next").classList.add('release-disabled');
    }
    else
    {
      document.getElementById('release-next').classList.remove('release-disabled');
    }

  }

  let update_release = async () => {
    try {
      setLoading(true);
      let respons2 = await apiClient.get(`/v1/browse/new-releases?country=IN&offset=${offset}&limit=5`)
      setReleases([...respons2.data?.albums?.items]);
      setTotal(respons2.data?.albums?.total);
      setLoading(false);
      checkInitial();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(flag)
    {
      update_release();
      flag=false;
    }
  }, []);

  let handlePrevious = async () => {
    setOffset(-5);
    setNumber(offset);
    update_release();
  }

   let handleNext = async () => {
    setOffset(+5);
    setNumber(offset);
    update_release();
  }


  let PlayRelease = (id) => {
    console.log(id);
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
    <div className="new-release-body">
      <div className="release-top-body">
        <div className="release-header">
          <div className="main-header">New Release</div>
          <div className="sub-heading">get new songs every day</div>
        </div>
        <div className="release-buttons">
          <span onClick={handlePrevious} id='release-prev' >
            <i className="fa-solid fa-arrow-left" style={{ color: "#ffffff", size: "20px" }}  ></i>
          </span>
          <span onClick={handleNext} id='release-next'>
            <i className="fa-solid fa-arrow-right" style={{ color: "#ffffff", size: "20px" }} ></i>
          </span>
        </div>
      </div>
      <hr  style={{color:"white",border:"1"}}/>

      {loading && <Loader />}
      <div className="release-bottom-body" style={{ display: loading ? 'none' : 'flex' }}>
        {
          releases.map((release) => {
            return (<div key={release.id} className="release-card" onClick={() => PlayRelease(release.id)}>
              <img src={release.images[0].url} className="release-img" alt="release img" />
              <p className="release-title">{release.name}</p>
              <p className="release-artist">{release.total_tracks} Song(s)</p>
              <p className="release-artist">{artists_name(release.artists)}</p>
              <div className="release-fade">
                <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </div>
            </div>)
          })
        }
      </div>
    </div>
  )
}
