import React,{useEffect,useState} from 'react'
import loader from './ZZ5H.gif'
import ErrorMsg2 from './ErrorMsg2';

const Loader = ()=> {

  const [e, setE] = useState(false);
  

  useEffect(() => {
    setTimeout(() => {
      setE(true);
      
    }, 20000);
  }, [])
  
  
    return (
      <>
      { !e &&
      <div style={{height:"85%",width:"100%",boxSizing:"border-box"}}>
        <img style={{display:"block",width:"15%",margin:"7.5% auto",aspectRatio:"1"}} src={loader} alt="Loading" />
      </div>
      }

      {
        e &&
        <ErrorMsg2/>
      }

      </>
    

    )
 
}

export default Loader
