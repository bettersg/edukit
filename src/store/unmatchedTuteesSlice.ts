import {createSlice} from "@reduxjs/toolkit"

const initialState = [106, 206, 306]

const unmatchedTuteeSlice = createSlice({
    name: "unmatchedTutee",
    initialState,
    reducers: {
        updateUnmatchedTutees : (state, action) => {
            return [...action.payload]
        }
    }
})

export const unmatchedTuteesActions = unmatchedTuteeSlice.actions
export default unmatchedTuteeSlice.reducer