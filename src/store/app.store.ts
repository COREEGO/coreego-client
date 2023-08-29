/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user.reducer";
import appSlice from "./reducers/app.reducer";


export const store = configureStore({
	reducer: {
        user: userSlice.reducer,
        app: appSlice.reducer,
    }
});

export default store;
