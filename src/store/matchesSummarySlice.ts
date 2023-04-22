import {createSlice} from '@reduxjs/toolkit'

const initialState = [
    {tutor:"A", tutee1:101, tutee2:102, tutee3:103, tutee4:104, tutee5:105},
    {tutor:"B", tutee1:201, tutee2:202, tutee3:203, tutee4:204, tutee5:205},
    {tutor:"C", tutee1:301, tutee2:302, tutee3:303, tutee4:304, tutee5:305}
]

const matchesSummary = createSlice({
    name: "matchesSummary",
    initialState,
    reducers: {
        updateMatchesSummary : (state, action) => {
            return [...action.payload]
        }
    }
})

export const matchesSummaryActions = matchesSummary.actions
export default matchesSummary.reducer