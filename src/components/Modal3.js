import React from 'react'
import { useState, useEffect } from "react"
import apiClient from '../spotify'
import { Modal1 } from './Modal1';
import '../components_css/Modal3.css'
import { useDispatch } from 'react-redux';
import { dataActions } from '../store/data-slice';


const Modal3 = ({ trackid, currenttrackid, operation,  update, currentindex, currenttrack,setModal3 }) => {

    // console.log(currenttrack);
    let a = currenttrack?.uri;
    const [openModal, setOpenModal] = useState(false);
    const [list, setList] = useState([]);
    const [display, setDisplay] = useState(false);
    const [snapshot, setSnapshot] = useState(undefined);

    let dispatch=useDispatch();

    let closemodal = () => {
        setModal3(false);
    }


    let getPlaylist = async () => {
        let response = await apiClient.get(`/v1/playlists/${trackid}`);
        let snapshot_id = response?.data?.snapshot_id;
        setSnapshot(snapshot_id);
        let owner = response?.data?.owner?.uri;
        let response2 = await apiClient.get(`/v1/me`);
        if (response2?.data?.uri === owner) {
            setDisplay(true);
        }
    }

    let deleteTheTrack = async () => {
        try {
            // console.log("in delete track", snapshot);
            
            let response = await apiClient.delete(`/v1/playlists/${trackid}/tracks`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
                data: {
                    "tracks": [
                        {
                            "uri": a
                        }
                    ],
                    "snapshot_id": `${snapshot}`
                }
            })
            dispatch(dataActions.setDeletedData(true));
            update(currentindex);
            closemodal();


        } catch (error) {
            console.log(error);
        }
    }

    let addTheTrack = () => {
        console.log(currenttrackid);
        let arr = [currenttrackid];
        setList(arr);
        setOpenModal(true);
    }

    useEffect(() => {
        if(operation===1)
        getPlaylist();
    }, [currenttrack])





    return (
        <>
            {
                !openModal && <div className="modal-3 flex">
                    <div className="modal3-heading-button" onClick={closemodal}>&times;</div>
                    <div className="modal3-body flex">
                        <div className="modal3-button" onClick={() => addTheTrack()}>Add to playlist</div>
                        {operation === 1 && display && <div className="modal3-button" onClick={() => deleteTheTrack()}>delete from playlist</div>}
                    </div>
                </div>
            }
            {
                openModal && <Modal1 list={list} setModal1={setOpenModal} />
            }
        </>

    )
}

export default Modal3