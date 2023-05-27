// @ts-nocheck
// Temp and need to delete later
import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    // tutor: {index:1, name:"A", gender:"male", probonoPref: "free", teachUnaided: true, streamPref:["NA","NT","Express","IP","IB"], priSubj:["mathematics"], lowerSecSubj:["mathematics"],upperSecSubj:["mathematics"], jcSubj:["mathematics"], ibSubj:["mathematics"], hrsPerWeek: 6}, 
    tutee: {index:101, name:"A", gender:"male",noGenderPref:"none", educationLevel:"Secondary 4", stream:"Express", subj:"Mathematicss, Science", financialAid:true},
    // tuteeInfo: [{index:101, gender:"male",noGenderPref:"none", educationLevel:"Secondary 4", stream:"Express", subj:"Mathematicss, Science", financialAid:true, matchingScore:1}, 
    // {index:102, gender:"male",noGenderPref:"none", educationLevel:"Secondary 4", stream:"Express", subj:"Mathematicss, Science", financialAid:true, matchingScore:1},
    // {index:103, gender:"male",noGenderPref:"none", educationLevel:"Secondary 4", stream:"Express", subj:"Mathematicss, Science", financialAid:true, matchingScore:1},
    // {index:104, gender:"male",noGenderPref:"none", educationLevel:"Secondary 4", stream:"Express", subj:"Mathematicss, Science", financialAid:true, matchingScore:1},
    // {index:105, gender:"male",noGenderPref:"none", educationLevel:"Secondary 4", stream:"Express", subj:"Mathematicss, Science", financialAid:true, matchingScore:1}],

    tutorInfo: [{index:1, name:"A", gender:"male", probonoPref: "free", teachUnaided: true, streamPref:["NA","NT","Express","IP","IB"], priSubj:["mathematics"], lowerSecSubj:["mathematics"],upperSecSubj:["mathematics"], jcSubj:["mathematics"], ibSubj:["mathematics"], hrsPerWeek: 6, matchingScore:1}, 
    {index:2, name:"B", gender:"male", probonoPref: "free", teachUnaided: true, streamPref:["NA","NT","Express","IP","IB"], priSubj:["mathematics"], lowerSecSubj:["mathematics"],upperSecSubj:["mathematics"], jcSubj:["mathematics"], ibSubj:["mathematics"], hrsPerWeek: 6, matchingScore:1},
    {index:3, name:"C", gender:"male", probonoPref: "free", teachUnaided: true, streamPref:["NA","NT","Express","IP","IB"], priSubj:["mathematics"], lowerSecSubj:["mathematics"],upperSecSubj:["mathematics"], jcSubj:["mathematics"], ibSubj:["mathematics"], hrsPerWeek: 6, matchingScore:1},
    {index:4, name:"D", gender:"male", probonoPref: "free", teachUnaided: true, streamPref:["NA","NT","Express","IP","IB"], priSubj:["mathematics"], lowerSecSubj:["mathematics"],upperSecSubj:["mathematics"], jcSubj:["mathematics"], ibSubj:["mathematics"], hrsPerWeek: 6, matchingScore:1},
    {index:5, name:"E", gender:"male", probonoPref: "free", teachUnaided: true, streamPref:["NA","NT","Express","IP","IB"], priSubj:["mathematics"], lowerSecSubj:["mathematics"],upperSecSubj:["mathematics"], jcSubj:["mathematics"], ibSubj:["mathematics"], hrsPerWeek: 6, matchingScore:1}],
}

const selectedTuteeMatchesSlice = createSlice({
    name:"selectedTuteeMatches",
    initialState,
    reducers : {
        updateSelectedTuteeMatches: (state, action) => {
            return {...action.payload}
        },
        resetSelectedTuteeMatches: (state, action)=>{
            return initialState
        }
    }
})

export const selectedTuteeMatchesActions = selectedTuteeMatchesSlice.actions
export default selectedTuteeMatchesSlice.reducer