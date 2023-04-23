// @ts-nocheck
import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    tutor: {index:1, name:"A", gender:"male", probonoPref: "free", teachUnaided: true, streamPref:["NA","NT","Express","IP","IB"], priSubj:["mathematics"], lowerSecSubj:["mathematics"],upperSecSubj:["mathematics"], jcSubj:["mathematics"], ibSubj:["mathematics"], hrsPerWeek: 6}, 
    tuteeInfo: [{index:101, gender:"male",noGenderPref:"none", educationLevel:"Secondary 4", stream:"Express", subj:"Mathematicss, Science", financialAid:true}, 
    {index:102, gender:"male",noGenderPref:"none", educationLevel:"Secondary 4", stream:"Express", subj:"Mathematicss, Science", financialAid:true},
    {index:103, gender:"male",noGenderPref:"none", educationLevel:"Secondary 4", stream:"Express", subj:"Mathematicss, Science", financialAid:true},
    {index:104, gender:"male",noGenderPref:"none", educationLevel:"Secondary 4", stream:"Express", subj:"Mathematicss, Science", financialAid:true},
    {index:105, gender:"male",noGenderPref:"none", educationLevel:"Secondary 4", stream:"Express", subj:"Mathematicss, Science", financialAid:true}],
}

const selectedTutorMatchesSlice = createSlice({
    name:"selectedTutorMatches",
    initialState,
    reducers : {
        updateSelectedTutorMatches: (state, action) => {
            return {...action.payload}
        },
        resetSelectedTutorMatches: (state, action)=>{
            return initialState
        }
    }
})

export const selectedTutorMatchesActions = selectedTutorMatchesSlice.actions
export default selectedTutorMatchesSlice.reducer