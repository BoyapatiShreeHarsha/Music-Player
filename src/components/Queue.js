import React from 'react'
import { useState,useRef, useEffect } from "react"
import "../components_css/queue.css"
import { IoMdMusicalNote } from 'react-icons/io';
import { IconContext } from 'react-icons'


function Queue({ track, setcurrentindex, operation, currentindex }) {

  const [prev, setPrev] = useState([]);
  const [next, setNext] = useState([]);
  const [curr, setCurr] = useState([]);
  // const [scroll, setScroll] = useState(false);
  let currRef = useRef();


  let getPrevArr = () => {
    let p = [];
    for (let index = 0; index < currentindex; index++) {
      p.push(track[index]);
    }
    setPrev(p);
    let c=[];
    c.push(track[currentindex])
    setCurr(c);
  }

  let getNextArr = () => {
    let n = [];
    for (let index = currentindex + 1; index < track.length; index++) {
      n.push(track[index]);
    }
    setNext(n);
  }


  let scrolltoPosition=()=>{
    let ele=currRef.current;
    ele.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (operation !== 2) {
      getPrevArr();
      getNextArr();

      setTimeout(() => {
        scrolltoPosition();
      }, 1000);
      
    }
  }, [currentindex, track]);

  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <div className="queue-list">
          {
            operation === 1 && prev.length !== 0 &&
            <>
              <div className="queue-list-heading">Previous</div>
              {
                prev?.map((ele, index) => {
                  return (<div key={index} className='queue-item flex' onClick={() => setcurrentindex(index)}>
                    <p className="track-name">{ele?.track?.name}</p>
                    <p>0:30</p>
                  </div>)
                })
              }

            </>
          }
          {
            operation === 1 &&
            <div  ref={currRef} key={currentindex} className='queue-item-curr flex'>
              <p className="track-name">
              <IconContext.Provider value={{ size: "14px", className: "btn-icon" }}>
                    <IoMdMusicalNote/>
                </IconContext.Provider>
                {curr[0]?.track?.name}</p>
              <p>0:30</p>
             
            </div>

          }
          {
            operation === 1 && next.length !== 0 &&
            <>
              <div className="queue-list-heading">Upcoming</div>

              {
                next?.map((ele, index) => {
                  return (<div key={index + currentindex + 1} className='queue-item flex' onClick={() => setcurrentindex(index + currentindex + 1)}>
                    <p className="track-name">{ele?.track?.name}</p>
                    <p>0:30</p>
                    
                  </div>)
                })
              }
            </>
          }

          {
            operation === 3 && prev.length !== 0 &&
            <>
              <div className="queue-list-heading">Previous</div>

              {
                prev?.map((ele, index) => {
                  return (<div key={index} className='queue-item flex' onClick={() => setcurrentindex(index)}>
                    <p className="track-name">{ele?.name}</p>
                    <p>0:30</p>
                  </div>)
                })
              }

            </>
          }
          {
            operation === 3 &&
            <div  ref={currRef} key={currentindex} className='queue-item-curr flex'>
              <p className="track-name">
              <IconContext.Provider value={{ size: "14px", className: "btn-icon" }}>
                    <IoMdMusicalNote/>
                </IconContext.Provider>
                {curr[0]?.name}</p>
              <p>0:30</p>
             
            </div>

          }
          {
            operation === 3 && next.length !== 0 &&
            <>
              <div className="queue-list-heading">Upcoming</div>

              {
                next?.map((ele, index) => {
                  return (<div key={index + currentindex + 1} className='queue-item flex' onClick={() => setcurrentindex(index + currentindex + 1)}>
                    <p className="track-name">{ele?.name}</p>
                    <p>0:30</p>
                  </div>)
                })
              }
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Queue
