// @ts-nocheck
import {useSelector} from 'react-redux'
import {Stack} from '@mui/material'
import {DataGrid, GridColDef, GridEventListener, GridValueGetterParams} from '@mui/x-data-grid'


const MatchDetailsPage = () => {
  const selectedTutorMatches = useSelector((state,action)=>state.selectedTutorMatches)
  console.log(selectedTutorMatches)
  const columns: GridColDef[] = [
    { field: 'Entity', headerName: 'Entity', width: 90 },
    { field: 'Index', headerName: 'Index', width: 20, type: 'number'},
    { field: 'Name', headerName: 'Name', width: 120, type: 'string'},
    { field: 'Gender_GenderPref', headerName: 'Gender_NoGenderPref', width: 170, type: 'string'},
    { field: 'SubjectsEduLevel', headerName: 'Subjects_EduLevel', width: 370, type: 'string'},
    { field: 'ProbonoPref_FinAid', headerName: 'ProbonoPref_FinAid', width: 170, type: 'string'},
    { field: 'MatchingScore', headerName: 'MatchingScore', width: 90, type: 'number'},
  ];
  const rowsTutees = selectedTutorMatches.tuteeInfo.map((tutee, idx)=>{
    return {
    id: (idx+1),
    Entity: ("Tutee"+String(idx+1)),
    Index: tutee.index,
    Name: tutee.name,
    Gender_GenderPref: (tutee.gender+" + "+tutee.noGenderPref),
    SubjectsEduLevel: (tutee.educationLevel +" - " +String(tutee.subj)),
    ProbonoPref_FinAid: (tutee.financialAid),
    MatchingScore: (tutee.matchingScore)
  }})
  const rows = [
    {id: 0, Entity: "Tutor", Index:selectedTutorMatches.tutor.index, Name:selectedTutorMatches.tutor.name, Gender_GenderPref: selectedTutorMatches.tutor.gender, SubjectsEduLevel: ("PRIMARY: " + String(selectedTutorMatches.tutor.priSubj) + ";   LOWERSEC: " + String(selectedTutorMatches.tutor.lowerSecSubj)+ "-   UPPERSEC: " + String(selectedTutorMatches.tutor.upperSecSubj)+ "   JC: " + String(selectedTutorMatches.tutor.jcSubj)+ "   IB: " + String(selectedTutorMatches.tutor.ibSubj)), ProbonoPref_FinAid: (selectedTutorMatches.tutor.probonoPref + "  +  " + selectedTutorMatches.tutor.teachUnaided)},
    ...rowsTutees
  ]
  return (
    <Stack alignItems="center">
      <h3>MatchDetailsPage</h3>
      <DataGrid  rows={rows} columns={columns} sx={{height: "auto"}}/>
    </Stack>
  )
}

export default MatchDetailsPage