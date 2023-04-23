// @ts-nocheck
import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    tutor: {index:1, name:"A", gender:"male", probonoPref: "free", teachUnaided: true, streamPref:["NA","NT","Express","IP","IB"], primarySubjects:["mathematics"], lowerSecSubjects:["mathematics"],upperSecSubjects:["mathematics"], jcSubjects:["mathematics"], ibSubjects:["mathematics"], hrsPerWeek: 6}, 
    tuteeInfo: [{index:101, gender:"male",tutorgenderPref:"none", educationLevel:"Secondary 4", acadStream:"Express", subjects:["Mathematicss","Science"], onAid:true}, 
    {index:102, gender:"male",tutorgenderPref:"none", educationLevel:"Secondary 4", acadStream:"Express", subjects:["Mathematicss","Science"], onAid:true},
    {index:103, gender:"male",tutorgenderPref:"none", educationLevel:"Secondary 4", acadStream:"Express", subjects:["Mathematicss","Science"], onAid:true},
    {index:104, gender:"male",tutorgenderPref:"none", educationLevel:"Secondary 4", acadStream:"Express", subjects:["Mathematicss","Science"], onAid:true},
    {index:105, gender:"male",tutorgenderPref:"none", educationLevel:"Secondary 4", acadStream:"Express", subjects:["Mathematicss","Science"], onAid:true}],
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