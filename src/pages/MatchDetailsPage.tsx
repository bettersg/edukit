// @ts-nocheck
import {useSelector} from 'react-redux'
import {Stack} from '@mui/material'
import {DataGrid, GridColDef, GridEventListener, GridValueGetterParams} from '@mui/x-data-grid'


const MatchDetailsPage = () => {
  const selectedTuteeMatches = useSelector((state,action)=>state.selectedTuteeMatches)
  console.log(selectedTuteeMatches)
  const columns: GridColDef[] = [
    { field: 'Entity', headerName: 'Entity', width: 90 },
    { field: 'Index', headerName: 'Index', width: 20, type: 'number'},
    { field: 'Name', headerName: 'Name', width: 120, type: 'string'},
    { field: 'Gender_GenderPref', headerName: 'Gender_NoGenderPref', width: 170, type: 'string'},
    { field: 'SubjectsEduLevel', headerName: 'Subjects_EduLevel', width: 370, type: 'string'},
    { field: 'ProbonoPref_FinAid', headerName: 'ProbonoPref_FinAid', width: 170, type: 'string'},
    { field: 'MatchingScore', headerName: 'M-Score', width: 90, type: 'number'},
  ];
  const rowsTutors = selectedTuteeMatches.tutorInfo.map((tutor, idx)=>{
    return {
    id: (idx+1),
    Entity: ("Tutor"+String(idx+1)),
    Index: tutor.index,
    Name: tutor.name,
    Gender_GenderPref: (tutor.gender),
    // SubjectsEduLevel: (tutor.educationLevel +" - " +String(tutor.subj)),
    SubjectsEduLevel: ("PRIMARY: " + String(tutor.priSubj) + ";   LOWERSEC: " + String(tutor.lowerSecSubj)+ "-   UPPERSEC: " + String(tutor.upperSecSubj)+ "   JC: " + String(tutor.jcSubj)+ "   IB: " + String(tutor.ibSubj)), 
    ProbonoPref_FinAid: (tutor.probonoPref + "  +  " + tutor.teachUnaided),
    MatchingScore: (tutor.matchingScore)
  }})
  const rows = [
    {id: 0, 
      Entity: "Tutee", 
      Index:selectedTuteeMatches.tutee.index, 
      Name:selectedTuteeMatches.tutee.name, 
      Gender_GenderPref: (selectedTuteeMatches.tutee.gender + " - " + selectedTuteeMatches.tutee.noGenderPref), 
      SubjectsEduLevel:  (selectedTuteeMatches.tutee.educationLevel +" - " +String(selectedTuteeMatches.tutee.subj)), 
      ProbonoPref_FinAid: (selectedTuteeMatches.tutee.financialAid)},
    ...rowsTutors
  ]
  return (
    <Stack alignItems="center">
      <h3>MatchDetailsPage</h3>
      <DataGrid  rows={rows} columns={columns}/>
    </Stack>
  )
}

export default MatchDetailsPage