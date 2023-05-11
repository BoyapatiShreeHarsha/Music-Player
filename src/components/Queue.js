import React, { useState, useRef, useEffect } from 'react'
import "../components_css/queue.css"
import apiClient from '../spotify'
import AlbumInfo from './AlbumInfo';

function Queue({ track, setcurrentindex, operation, single, id ,info}) {

  let obj;
  if(operation===3)
  {
    obj=info;
  }
  else
  obj=track;

  // console.log(track);
  // console.log(operation);
  let heartRef = useRef();
  let fav = false;
  const [favrioute, setFavrioute] = useState(fav);

  if (operation == 2 || operation == 1) {
    heartRef.current?.classList.add('hide');
  }

  let setheart = () => {
    if (fav) {
      heartRef.current?.classList.remove('fa-regular');
      heartRef.current?.classList.add('fa-solid');
    }
    else {
      // console.log("Got wrong");
      heartRef.current?.classList.remove('fa-solid');
      heartRef.current?.classList.add('fa-regular');
    }
  }


  let check = async () => {
    if (operation === 3) {
      let response = await apiClient.get(`/v1/me/albums/contains?ids=${id}`);
      // console.log(response?.data[0]);
      fav = response?.data[0];
      setFavrioute(response?.data[0]);
      setheart();
    }
  }

  let favtoggle = async () => {
    try {

      let obj = { "ids": [id] };
      if (operation === 3) {
        if (favrioute) {
          //we need to remove it
          let res = await apiClient.delete(`/v1/me/albums`, obj);
          fav = false;
          setFavrioute(false);
          setheart();
        }
        else {
          //we need to add it 
          let res = await apiClient.put(`/v1/me/albums`, obj);
          fav = true;
          setFavrioute(true);
          setheart();
        }
      }
    } catch (error) {
      console.log(error);
    }

  }



  useEffect(() => {
    if (track !== undefined || track !== {}) {
      check();
    }
  }, [track])





  let arr = new Array();
  if (operation === 1) {
    track?.map((element) => {
      arr.push(element?.track?.name);
    })
  }
  else if (operation === 2) {
    arr.push(single?.name);
  }
  else if (operation === 3) {
    track?.map((element) => {
      arr.push(element?.name);
    })
  }
  return (
    <div className="queue-container flex">
      <div className="queue-info">
        <AlbumInfo album={obj}/>
      </div>
      <div className="queue flex">

        <p><i ref={heartRef} className="fa-solid fa-heart" onClick={favtoggle} ></i></p>

        <p className="upNext">Up Next</p>
        <div className="queue-list">
          {
            arr?.map((name, index) => {
              return (<div key={index} className="queue-item flex" onClick={() => setcurrentindex(index)}>
                <p className="track-name">{name}</p>
                <p>0:30</p>
              </div>)
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Queue
