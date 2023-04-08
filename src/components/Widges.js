import React, { useEffect, useState } from 'react'
import apiClient from '../spotify'
import "../components_css/Widges.css"
import WidgetCard from './WidgetCard';

function Widges({ artistId, currentindex }) {
    const [similar, setSimilar] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [newRelease, setNewRelease] = useState([]);

    let artistsUpdate = async () => {
        try {
            let id=artistId?.artists[currentindex]?.id;
            let response1 = await apiClient.get(`/v1/artists/${id}/related-artists`);
            // console.log(response1.data?.artists.slice(0,3));
            response1 = response1?.data?.artists?.slice(0, 3);
            // console.log(response1);
            setSimilar(response1);
        } catch (error) {
            console.log(error);
        }
        try {
            let response2 = await apiClient.get(`/v1/browse/featured-playlists`);
            response2 = response2.data?.playlists?.items?.slice(0, 3);
            // console.log(response2);
            setFeatured(response2);
        } catch (error) {
            console.log(error);
        }
        try {
            let reasponse3 = await apiClient.get(`/v1/browse/new-releases`);
            reasponse3 = reasponse3.data?.albums.items?.slice(0, 3);
            // console.log(reasponse3);
            setNewRelease(reasponse3);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(artistId?.artists[currentindex]?.id);
        if(artistId?.artists[currentindex]?.id)
        artistsUpdate();
    }, [currentindex])
    return (
        <div className='widgets-body flex'>
            <WidgetCard title="Similar Artists" similar={similar} />
            <WidgetCard title="Made For You" featured={featured} />
            <WidgetCard title="New Releases" newRelease={newRelease} />
        </div>
    )
}

export default Widges
