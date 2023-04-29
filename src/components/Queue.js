import React from 'react'
import "../components_css/queue.css"

function Queue({track,setcurrentindex,operation,single}) {
  // console.log(track);
  let arr=new Array();
  if(operation===1)
  {
    track?.map((element)=>{
      arr.push(element?.track?.name);
    })
  }
  else if(operation===2)
  {
    arr.push(single?.name);
  }
  else if(operation===3)
  {
    track?.map((element)=>{
      arr.push(element?.name);
    })
  }
  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <p className="upNext">Up Next</p>
        <div className="queue-list">
          {
            arr?.map((name,index)=>{
              return (<div key={index} className="queue-item flex" onClick={()=>setcurrentindex(index)}>
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
