// @ts-nocheck
import {configureStore} from "@reduxjs/toolkit"
import matchesSummaryReducer from "./matchesSummarySlice"
import unmatchedTuteesReducer from "./unmatchedTuteesSlice"
import selectedTutorMatchesReducer from "./selectedTutorMatchesSlice"
import selectedTuteeReducer from "./selectedTuteeSlice"

const store = configureStore({
    reducer: {
        matchesSummary: matchesSummaryReducer,
        unmatchedTutees: unmatchedTuteesReducer,
        selectedTutorMatches: selectedTutorMatchesReducer,
        selectedTutee: selectedTuteeReducer
    }
})

export default store