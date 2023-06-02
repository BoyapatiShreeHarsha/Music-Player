import React from 'react'
import {RxCrossCircled} from 'react-icons/rx'
import { IconContext } from 'react-icons'
import '../components_css/ErrorMsg.css'


const ErrorMsg2 = () => {

  return (
    <div className='error-page'>
      <div className="error-icon">
      <IconContext.Provider value={{ size: "33px", className: "btn-icon" }}>
      <RxCrossCircled/>
        </IconContext.Provider>
        </div>
      <div className="error-msg">Please clear the localStorage and reload the page</div>
    </div>
  )
}

export default ErrorMsg2
