import { createSlice } from "@reduxjs/toolkit";


const audioSlice = createSlice({
    name: "audio",
    initialState: {
        audioChange: false,
        value:0,
    },
    reducers: {
        setAudioChange(state, action) {
            state.audioChange = action.payload;
        },
        setValue(state,action){
            state.value=action.payload;
        }
    }
})

export const audioActions = audioSlice.actions;

export default audioSlice;