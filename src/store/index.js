import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./data-slice";
import infoSlice from "./info-slice";
import audioSlice from "./audio-slice";
import modalSlice from "./modal-slice";
import errorSlice from "./error-slice";


const store=configureStore({
    reducer:{
        data:dataSlice.reducer,
        info:infoSlice.reducer,
        audio:audioSlice.reducer,
        modal:modalSlice.reducer,
        error:errorSlice.reducer,
    },
});

export default store;