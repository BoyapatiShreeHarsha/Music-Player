import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name:"modal",
    initialState:{
        modal1:false,
        modal3:false,
    },
    reducers:{
        setModal1(state,action)
        {
            state.modal1=action.payload;
        },
        setModal3(state,action)
        {
            state.modal1=action.payload;
        }

    }
})

export const modalActions = modalSlice.actions;

export default modalSlice;