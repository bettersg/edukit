//@ts-nocheck
import {createSlice} from '@reduxjs/toolkit'
import {matchesSummarySlice} from "../types/stateSlice"

const initialState = [
    {tutor:{name:"No data", index:0}, 
    tutee1:{index: 0, matchingScore:1}, tutee2:{index: 0, matchingScore:1}, tutee3:{index: 0, matchingScore:1}, tutee4:{index: 0, matchingScore:1}, tutee5:{index: 0, matchingScore:1}},
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