// @ts-nocheck
import {configureStore} from "@reduxjs/toolkit"
import matchesSummaryReducer from "./matchesSummarySlice"
// import unmatchedTuteesReducer from "./unmatchedTuteesSlice"

// import selectedTutorMatchesReducer from "./selectedTutorMatchesSlice"
import selectedTuteeMatchesReducer from "./selectedTuteeMatchesSlice"

// import selectedTuteeReducer from "./selectedTuteeSlice"

const store = configureStore({
    reducer: {
        matchesSummary: matchesSummaryReducer,
        selectedTuteeMatches: selectedTuteeMatchesReducer,
    }
})

export default store