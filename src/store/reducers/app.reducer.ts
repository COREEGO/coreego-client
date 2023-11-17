import { createSlice } from "@reduxjs/toolkit";


const initialState : any = {
    discussionCategories: null,
    placeCategories: null,
    cities: null,
    languages: null
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
        initCities: (state, action) => {
            state.cities = action.payload
            return state
        },
        initLanguages: (state, action) => {
            state.languages = action.payload
            return state
        }
    }
})

export const {initDiscussionCategories, initPlaceCategories, initCities, initLanguages} = appSlice.actions;

export default appSlice