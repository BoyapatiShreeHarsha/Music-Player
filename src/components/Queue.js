import React from 'react'
import "../components_css/queue.css"

function Queue({track,setcurrentindex}) {
  // console.log(track);
  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <p className="upNext">Up Next</p>
        <div className="queue-list">
          {
            track?.map((element,index)=>{
              return (<div key={index} className="queue-item flex" onClick={()=>setcurrentindex(index)}>
                <p className="track-name">{element?.track?.name}</p>
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
