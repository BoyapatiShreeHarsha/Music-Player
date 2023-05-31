import { createSlice } from "@reduxjs/toolkit";


const infoSlice=createSlice({
    name: "info",
    initialState:{
        id:"",
        operation:0,
        img:"",
        name:"",
        des:"",
    },
    reducers:{
        setId(state,action){
            state.id=action.payload;
        },
        setOperation(state,action){
            state.operation=action.payload;
        },
        setImg(state,action){
            state.img=action.payload;
        },
        setName(state,action){
            state.name=action.payload;
        },
        setDes(state,action){
            state.des=action.payload;
        },
    }
})

export const infoActions= infoSlice.actions;

export default infoSlice;