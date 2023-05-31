import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./data-slice";
import infoSlice from "./info-slice";


const store=configureStore({
    reducer:{
        data:dataSlice.reducer,
        info:infoSlice.reducer,
    },
});

export default store;