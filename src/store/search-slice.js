import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
    name: "search",
    initialState:{
        searchtab:"",
        playlists:[],
        albums:[],
        tracks:[],
    },
    reducers:{
        setSearchtab(state,actions){
            state.searchtab=actions.payload;
        },
        setPlaylists(state,actions){
            state.playlists=actions.payload;
        },
        setAlbums(state,actions){
            state.albums=actions.payload;
        },
        setTracks(state,actions){
            state.tracks=actions.payload;
        },
    }
})

export const searchActions = searchSlice.actions;

export default searchSlice;