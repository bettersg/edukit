// @ts-nocheck
import {createSlice} from "@reduxjs/toolkit"

const initialState = [0]

const unmatchedTuteeSlice = createSlice({
    name: "unmatchedTutee",
    initialState,
    reducers: {
        updateUnmatchedTutees : (state, action) => {
            return [...action.payload]
        },
        resetUnmatchedTutees : (state, action) => {
            return initialState
        }
    }
})

export const unmatchedTuteesActions = unmatchedTuteeSlice.actions
export default unmatchedTuteeSlice.reducer