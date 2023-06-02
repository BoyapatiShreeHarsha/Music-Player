import { createSlice } from "@reduxjs/toolkit";


const errorSlice = createSlice({
    name: "error",
    initialState: {
        show:false,
        icon:0,
        msg:"",
    },
    reducers:{
        setShow(state,actions){
            state.show=actions.payload;
        },
        setCode(state,actions){
            state.icon=actions.payload;
        },
        setMsg(state,actions){
            state.msg=actions.payload;
        },
    }
})


export const errorActions = errorSlice.actions;

export default errorSlice;