import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    tutor: {name:"A", gender:"male", probonoPref: "free", teachUnaided: true, streamPref:["NA","NT","Express","IP","IB"], primarySubjects:["mathematics"], lowerSecSubjects:["mathematics"],upperSecSubjects:["mathematics"], jcSubjects:["mathematics"], ibSubjects:["mathematics"], hrsPerWeek: 6}, 
    tutee1: {index:101, gender:"male",tutorgenderPref:"none", educationLevel:"Secondary 4", acadStream:"Express", subjects:["Mathematicss","Science"], onAid:true},
    tutee2: {index:102, gender:"male",tutorgenderPref:"none", educationLevel:"Secondary 4", acadStream:"Express", subjects:["Mathematicss","Science"], onAid:true},
    tutee3: {index:103, gender:"male",tutorgenderPref:"none", educationLevel:"Secondary 4", acadStream:"Express", subjects:["Mathematicss","Science"], onAid:true},
    tutee4: {index:104, gender:"male",tutorgenderPref:"none", educationLevel:"Secondary 4", acadStream:"Express", subjects:["Mathematicss","Science"], onAid:true},
    tutee5: {index:105, gender:"male",tutorgenderPref:"none", educationLevel:"Secondary 4", acadStream:"Express", subjects:["Mathematicss","Science"], onAid:true},
}

const selectedTutorMatchesSlice = createSlice({
    name:"selectedTutorMatches",
    initialState,
    reducers : {
        updateSelectedTutorMatches: (state, action) => {
            return {...action.payload}
        }
    }
})

export const selectedTutorMatchesActions = selectedTutorMatchesSlice.actions
export default selectedTutorMatchesSlice.reducer