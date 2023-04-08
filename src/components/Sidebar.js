import React,{useState,useEffect} from 'react'
import '../components_css/sidebar.css'
import pic from './naruto.jpg'
import Sidebarbutton from './Sidebarbutton'

import { AiFillHeart } from 'react-icons/ai';
import { AiFillPlayCircle } from 'react-icons/ai';
import { AiFillFire } from 'react-icons/ai';
import { BiLibrary,BiLogOut } from 'react-icons/bi';
import {MdSpaceDashboard}from 'react-icons/md'

import apiClient from '../spotify'

export default function Sidebar() {
  const [image, setImage] = useState(pic);

  let img= async()=>{
    let respons= await apiClient.get("/v1/me");
    // console.log(respons.data.images[0].url);
    setImage(respons.data.images[0].url)
  }
  useEffect(() => {
    img();
  }, []);
  return (
    <div className='sidebar-container'>
        <img src={image} alt="Profile-img" className='profile-img' />
        <div>
            <Sidebarbutton title="Feed" to="/feed" icon={<MdSpaceDashboard/>}/>
            <Sidebarbutton title="Trending" to="/trending" icon={<AiFillFire/>}/>
            <Sidebarbutton title="Player" to="/player" icon={<AiFillPlayCircle/>}/>
            <Sidebarbutton title="Favorites" to="/favorites" icon={<AiFillHeart/>}/>
            <Sidebarbutton title="Library" to="/" icon={<BiLibrary/>}/>
        </div>
        <Sidebarbutton title="Logout" to="/" icon={<BiLogOut/>}/> 
    </div>
  )
}
