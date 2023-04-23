// @ts-nocheck
import {createSlice} from '@reduxjs/toolkit'

// const initialState = [
//     {tutor:"A", tutee1:101, tutee2:102, tutee3:103, tutee4:104, tutee5:105},
//     {tutor:"B", tutee1:201, tutee2:202, tutee3:203, tutee4:204, tutee5:205},
//     {tutor:"C", tutee1:301, tutee2:302, tutee3:303, tutee4:304, tutee5:305}
// ]
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