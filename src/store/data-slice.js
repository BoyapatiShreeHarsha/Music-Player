import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        id: "",
        currenttrack: {},
        trackProgess: 0,
        currentindex: 0,
        track: [],
        operation: 0,
        img: "",
        isPlaying: false,
        currentPercentage: 0,
        duration: 0,
        show: false
    },
    reducers: {
        setId(state, action) {
            state.id = action.payload;
        },
        setCurrenttrack(state, action) {
            state.currenttrack = action.payload;
        },
        setCurrentindex(state, action) {
            state.currentindex = action.payload;
        },
        setTrack(state, action) {
            state.track = action.payload;
        },
        setOperation(state, action) {
            state.operation = action.payload;
        },
        setImg(state, action) {
            state.img = action.payload;
        },
        setIsPlaying(state, action) {
            state.isPlaying = action.payload;
        },
        setTrackProgess(state, action) {
            state.trackProgess = action.payload;
        },
        handlenext(state, action) {
            if (state.currentindex < state.track.length - 1) {
                state.currentindex += 1;
            }
            else
                state.currentindex = 0;

        },
        handleprev(state, action) {
            if (state.currentindex - 1 < 0) {
                state.currentindex = state.track.length - 1;
            }
            else {
                state.currentindex -= 1;
            }
        },
        handleplay(state, action) {
            state.isPlaying = action.payload;
        },
        setCurrentPercentage(state, action) {
            if (action.payload !== NaN)
                state.currentPercentage = action.payload;
        },
        setDuration(state, action) {
            if (action.payload)
                state.duration = action.payload;
        },
        setShow(state, action) {
            if (state.id === undefined || state.id==="")
                state.show = false;
            else {
                if (state.id === action.payload && window.location.pathname === "/player") {
                    state.show = false;
                }
                else {
                    state.show = true;
                }
            }
        },
      
    }
})


export const dataActions = dataSlice.actions;

export default dataSlice;