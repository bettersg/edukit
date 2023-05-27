// @ts-nocheck
import {configureStore} from "@reduxjs/toolkit"
import matchesSummaryReducer from "./matchesSummarySlice"
import unmatchedTuteesReducer from "./unmatchedTuteesSlice"

import selectedTutorMatchesReducer from "./selectedTutorMatchesSlice"
import selectedTuteeMatchesReducer from "./selectedTuteeMatchesSlice"

import selectedTuteeReducer from "./selectedTuteeSlice"

const store = configureStore({
    reducer: {
        matchesSummary: matchesSummaryReducer,
        unmatchedTutees: unmatchedTuteesReducer,
        selectedTutorMatches: selectedTutorMatchesReducer,
        selectedTuteeMatches: selectedTuteeMatchesReducer,
        selectedTutee: selectedTuteeReducer
    }
})

export default store