import React from 'react'
import { useState, useEffect } from "react"
import apiClient from '../spotify'
import '../components_css/Modal1.css'
import Modal2 from './Modal2';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../store/modal-slice';


export const Modal1 = ({ list }) => {
    // console.log(list[0]);
    const [playlists, setPlaylists] = useState([]);
    const [uri, setUri] = useState([]);
    const [openModal2, setOpenModal2] = useState(false);
    const [directopenModal, setDirectopenModal] = useState(false);
    let dispatch=useDispatch();
    let modal=useSelector(state=>state.modal1);

    let getplaylist = async () => {
        try {
            let respons2 = await apiClient.get(`/v1/me/playlists?offset=0&limit=50`);
            // console.log(respons2);
            // console.log(respons2.data.items);
            setPlaylists(respons2?.data?.items);

        } catch (error) {
            console.log(error);
        }
    }

    let makelist = () => {

        let arrl;
        arrl = list?.map((ele) => {
            let str = "";
            str = str.concat("spotify:track:");
            str = str.concat(ele);
            return str;
        })
        setUri(arrl);
    }


    useEffect(() => {
        getplaylist();
        makelist();
    }, []);

    useEffect(()=>{
        if(directopenModal===true)
        dispatch(modalActions.setModal1(false));
    })


    let Playmitem = async (id) => {


        try {

            let data = {
                'uris': uri,
                'position': 0
            };

            let respons = await apiClient.post(`/v1/playlists/${id}/tracks`, data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Content-Length': '0'
                }
            });

            // console.log(respons);
            setDirectopenModal(false);
            dispatch(modalActions.setModal1(false));
        } catch (error) {
            console.log(error);
        }
    }

   
    return (
        <>
            {!openModal2 &&  <>
            <div className="modal1-heading flex">
                <div className='modal1-heading-button' onClick={() => { dispatch(modalActions.setModal1(false)); }}>&times;</div>
                <div className='modal1-heading-text'>Add to Playlist</div>
            </div>
            <div className="modal1-new-playlist" onClick={()=>{
                setOpenModal2(true) }}>
                New Playlist
            </div>
            <div className="modal1-or flex">
                <hr style={{ width: "50%", textAlign: "left", marginLeft: "0", marginRight: "1%" }} />
                <div>OR</div>
                <hr style={{ width: "50%", textAlign: "left", marginLeft: "1%" }} />
            </div>
            <div className="modal1-odd-playlist">
                {
                    playlists?.map((ele) => {
                        return (<div key={ele?.id} className='modal1-queue-item flex' onClick={() => Playmitem(ele?.id)}>
                            <div className="modal1-queue-img">
                                <img src={ele?.images[0]?.url} alt="Playlist" />
                            </div>
                            <div className="modal1-queue-text flex">
                                <p className='modal1-clamp'>{ele?.name}</p>
                                <p>{ele?.tracks.total} Song(s)</p>
                            </div>
                        </div>)
                    })
                }
            </div></>}
            {openModal2 && <Modal2 data={uri} setOpenModal2={setOpenModal2} setDirectopenModal={setDirectopenModal}/>}

        </>
    )
}
