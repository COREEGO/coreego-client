import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        updateUser : (state : any, action:any) => {
            state = action.payload
            return state
        }
    }
})

export const {updateUser} = userSlice.actions;

export default userSlice