// @ts-nocheck
import {createSlice} from "@reduxjs/toolkit"

const initialState = {index:101, gender:"male",tutorgenderPref:"none", educationLevel:"Secondary 4", acadStream:"Express", subjects:["Mathematicss","Science"]}

const selectedTutorSlice = createSlice({
    name: "selectedTutee",
    initialState,
    reducers: {
        updatedSelectedTutor : (state, action) => {
            return {...action.payload}
        }
    }
})

export const selectedTutorActions = selectedTutorSlice.actions
export default selectedTutorSlice.reducer