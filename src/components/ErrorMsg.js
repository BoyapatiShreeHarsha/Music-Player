import React from 'react'
import { useSelector } from 'react-redux'
import {RxCrossCircled} from 'react-icons/rx'
import {VscBracketError} from 'react-icons/vsc'
import { IconContext } from 'react-icons'
import {BiErrorAlt} from 'react-icons/bi'
import '../components_css/ErrorMsg.css'


const ErrorMsg = () => {

    let errorState=useSelector(state=>state.error);

    let setIcon=(code)=>{
        if(code===1)
        {
            return <RxCrossCircled/>
        }
        else if(code===2)
        {
            return <VscBracketError/>
        }
        else if(code===3)
        {
          return <BiErrorAlt/>
        }
    }

  return (
    <div className='error-page'>
      <div className="error-icon">
      <IconContext.Provider value={{ size: "33px", className: "btn-icon" }}>
        {setIcon(errorState?.icon)}
        </IconContext.Provider>
        </div>
      <div className="error-msg">{errorState?.msg}</div>
    </div>
  )
}

export default ErrorMsg
