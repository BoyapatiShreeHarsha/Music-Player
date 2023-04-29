import React from 'react'
import loader from './ZZ5H.gif'

const Loader = ()=> {
  
    return (
      <div style={{height:"85%",width:"100%",boxSizing:"border-box"}}>
        <img style={{display:"block",width:"15%",margin:"7.5% auto",aspectRatio:"1"}} src={loader} alt="Loading" />
      </div>
    )
 
}

export default Loader
