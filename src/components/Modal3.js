import React from 'react'
import { useState, useEffect } from "react"
import apiClient from '../spotify'
import { Modal1 } from './Modal1';
import '../components_css/Modal3.css'
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../store/modal-slice';

const Modal3 = ({ trackid, currenttrackid, operation,  update, currentindex, currenttrack }) => {

    // console.log(currenttrack);
    let a = currenttrack?.uri;
    const [openModal, setOpenModal] = useState(false);
    const [list, setList] = useState([]);
    const [display, setDisplay] = useState(false);
    const [snapshot, setSnapshot] = useState(undefined);

    let modal=useSelector(state=>state.modal);
    let dispatch=useDispatch();

    let closemodal = () => {
        dispatch(modalActions.setModal3(false));
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
            console.log("in delete track", snapshot);
            
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
            update(currentindex);
            closemodal();


        } catch (error) {
            console.log(error);
        }
    }

    let addTheTrack = () => {
        let arr = [currenttrackid];
        setList(arr);
        dispatch(modalActions.setModal1(true));
    }

    useEffect(() => {
        if(operation===1)
        getPlaylist();
    }, [currenttrack])





    return (
        <>
            {
                !modal?.modal1 && <div className="modal-3 flex">
                    <div className="modal3-heading-button" onClick={closemodal}>&times;</div>
                    <div className="modal3-body flex">
                        <div className="modal3-button" onClick={() => addTheTrack()}>Add to playlist</div>
                        {operation === 1 && display && <div className="modal3-button" onClick={() => deleteTheTrack()}>delete from playlist</div>}
                    </div>
                </div>
            }
            {
                modal?.modal1 && <Modal1 list={list} />
            }
        </>

    )
}

export default Modal3
