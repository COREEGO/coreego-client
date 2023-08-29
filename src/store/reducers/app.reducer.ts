import { createSlice } from "@reduxjs/toolkit";


const initialState : any = {
    discussionCategories: null,
    placeCategories: null
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
       initDiscussionCategories :  (state, action) => {
            state.discussionCategories = action.payload
            return state
        },
       initPlaceCategories :  (state, action) => {
            state.placeCategories = action.payload
            return state
        },
    }
})

export const {initDiscussionCategories, initPlaceCategories} = appSlice.actions;

export default appSlice