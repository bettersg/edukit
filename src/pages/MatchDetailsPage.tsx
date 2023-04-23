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
    { field: 'Gender_GenderPref', headerName: 'Gender_GenderPref', width: 170, type: 'string'},
    { field: 'SubjectsEduLevel', headerName: 'SubjectsEduLevel', width: 370, type: 'string'},
    { field: 'ProbonoPref_FinAid', headerName: 'ProbonoPref_FinAid', width: 170, type: 'string'},
  ];
  const rowsTutees = selectedTutorMatches.tuteeInfo.map((tutee, idx)=>{
    return {
    id: (idx+1),
    Entity: ("Tutee"+String(idx+1)),
    Index: tutee.index,
    Name: tutee.name,
    Gender_GenderPref: (tutee.gender+" + "+tutee.tutorgenderPref),
    SubjectsEduLevel: (tutee.educationLevel +" - " +String(tutee.subjects)),
    ProbonoPref_FinAid: (tutee.onAid)
  }})
  const rows = [
    {id: 0, Entity: "Tutor", Index:selectedTutorMatches.tutor.index, Name:selectedTutorMatches.tutor.name, Gender_GenderPref: selectedTutorMatches.tutor.gender, SubjectsEduLevel: ("primary: " + String(selectedTutorMatches.tutor.primarySubjects) + "   lowerSec: " + String(selectedTutorMatches.tutor.lowerSecSubjects)+ "   upperSec: " + String(selectedTutorMatches.tutor.upperSecSubjects)+ "   jc: " + String(selectedTutorMatches.tutor.jcSubjects)+ "   ib: " + String(selectedTutorMatches.tutor.ibSubjects)), ProbonoPref_FinAid: (selectedTutorMatches.tutor.probonoPref + "  +  " + selectedTutorMatches.tutor.teachUnaided)},
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