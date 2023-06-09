import React from 'react'
import { useState ,useEffect} from "react"
import '../components_css/PlaylistCover.css'
import apiClient from '../spotify';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../store/modal-slice';

const PlaylistCover = ({ cover, setModal1 }) => {
   
    // console.log(cover?.id);
    // console.log(id,operation,img,name,des);
    // console.log(cover);
    const [fav, setFav] = useState(false);
    let modal=useSelector(state=>state.modal);
    let dispatch=useDispatch();

    //first we will check if the given album is allready fav

    let checkFavonAlbum=async()=>{
        
        let response=await apiClient.get(`/v1/me/albums/contains?ids=${cover?.id}`);
        // console.log(response?.data[0]);
        setFav(response?.data[0]);
    }

    let falsetheFavonAlbums=async()=>{

        let response=await apiClient.delete(`/v1/me/albums?ids=${cover?.id}`,{},{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        // console.log(response);
        setFav(false);
    }

    let truetheFavonAlbums=async()=>{
        let response=await apiClient.put(`/v1/me/albums?ids=${cover?.id}`,{},{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        // console.log(response);
        setFav(true);
    }


   

    useEffect(() => {
      if(cover?.operation===3)
      {
        checkFavonAlbum();
      }
    }, [cover]) //because cover was not reaching at that movement
    


    return (
        <div className='cover-body flex'>
            <div className="cover-img">
                <img src={cover?.img} alt="album art" />
            </div>
            <div className="cover-info flex">
                <div className="cover-name-container">
                    <div className="marquee">
                        <p>{cover?.name}</p>
                    </div>
                </div>
                <div className="cover-des-container">
                    <p>{cover?.des}</p>
                </div>
                <div className="flex">
                    {cover?.operation!==2 &&
                <div className="cover-buttons" onClick={() => {setModal1(true)}}>
                    <i className="fa-solid fa-plus" style={{ color: '#ffffff' ,fontSize:'larger'}}></i>
                </div>}

                {cover?.operation===3 && fav===false &&
                <div className="cover-buttons" onClick={truetheFavonAlbums}>
                    <i className="fa-regular fa-heart" style={{ color: '#c96850',fontSize:'larger' }}></i>
                </div>}
                {cover?.operation===3 && fav===true &&
                <div className="cover-buttons" onClick={falsetheFavonAlbums}>
                    <i className="fa-solid fa-heart" style={{ color: '#c96850',fontSize:'larger' }} ></i>
                </div>}
                </div>
            </div>
        </div>
    )
}

export default PlaylistCover
