import React from 'react'
import { useState } from "react"
import apiClient from '../spotify';
import '../components_css/Modal2.css'

const Modal2 = ({ data, setOpenModal1,setDirectopenModal }) => {

    const [credentials, setCredentials] = useState({ name: "", description: "" });
    const [pub, setPub] = useState(false)

    let changing = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    let Submitted = async (e) => {
        e.preventDefault();
        // console.log(credentials.name, credentials.description, pub);

        try {

            let id;
            //getting the user id
            let response1 = await apiClient.get('/v1/me');
            // console.log(response1?.data?.id);
            id = response1?.data?.id;
            //creating a playlist

            let data1 = {
                'name': credentials.name,
                'description': credentials.description,
                'public': pub
            }

            let response2 = await apiClient.post(`/v1/users/${id}/playlists`, data1, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // console.log(response2);

            let newPlaylistId = response2?.data?.id;

            // adding the tracks to playlist
            // console.log(data);

            let response3 = await apiClient.post(`/v1/playlists/${newPlaylistId}/tracks`, data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Content-Length': '0'
                }
            });

            // console.log(response3);




        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div>
            <div className="modal2-heading ">
                <div className='modal2-heading-button' onClick={() => { setOpenModal1(false) }}>&larr;</div>
                <div className='modal2-heading-text'>Create a Playlist</div>

            </div>

            <form onSubmit={Submitted} className='modal2-form'>
                <div className="form-block">
                    <label htmlFor="p-name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="p-name" name='name' value={credentials.name} onChange={changing} required />
                </div>

                <div className="form-block">
                    <label htmlFor="p-des" className="form-label">Description</label>
                    <input type="text" className="form-control" id="p-des" name='description' value={credentials.email} onChange={changing} />
                </div>

                <div className="pub-form-block">
                    <label htmlFor="p-public" className="pub-label">Public</label>

                    <div className="public-options flex">
                        <span className='public-options-items'>
                            <input type="radio" id="public-true" name="public" value="true" onClick={() => { setPub(true) }} onChange={changing} />
                            <label htmlFor="public-true">Yes</label>
                        </span>
                        <span >
                            <input type="radio" id="public-false" name="public" value="false" onClick={() => { setPub(false) }} checked onChange={changing} />
                            <label htmlFor="public-false">No</label>
                        </span>
                    </div>

                </div>
                <div className="modal2-btn">
                <button type="submit" className="modal2-submit" onClick={() => { setDirectopenModal(true) }}>Create</button>
                <button type="reset" className="modal2-exit" onClick={() => { setOpenModal1(false) }}>Cancel</button>
                </div>
            </form>



        </div>
    )
}

export default Modal2
