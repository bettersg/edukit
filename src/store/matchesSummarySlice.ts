//@ts-nocheck
import {createSlice} from '@reduxjs/toolkit'
import {matchesSummarySlice} from "../types/stateSlice"

const initialState = [
    {tutee:{name:"No data", index:0}, 
    tutor1:{index: 0, matchingScore:1}, tutor2:{index: 0, matchingScore:1}, tutor3:{index: 0, matchingScore:1}, tutor4:{index: 0, matchingScore:1}, tutor5:{index: 0, matchingScore:1}},
]

const matchesSummary = createSlice({
    name: "matchesSummary",
    initialState,
    reducers: {
        updateMatchesSummary : (state, action) => {
            return [...action.payload]
        },
        resetMatchesSummary : (state, action) => {
            return initialState
        }
    }
})

export const matchesSummaryActions = matchesSummary.actions
export default matchesSummary.reducer