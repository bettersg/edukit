// @ts-nocheck
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {selectedTuteeSlice} from '@/types/stateSlice'
import {Stack} from '@mui/material'
import {DataGrid, GridColDef, GridEventListener, GridValueGetterParams} from '@mui/x-data-grid'
import { useEffect } from 'react'


const MatchDetailsPage = () => {
  const navigate = useNavigate()
  const selectedTuteeMatches: selectedTuteeSlice = useSelector((state,action)=>state.selectedTuteeMatches)
  // console.log(selectedTuteeMatches)
  useEffect(()=>{
    if (!selectedTuteeMatches) {navigate("/")}
  },[])
  const columns: GridColDef[] = [
    { field: 'Entity', headerName: 'Entity', width: 90 },
    { field: 'Index', headerName: 'Index', width: 20, type: 'number'},
    { field: 'Name', headerName: 'Name', width: 120, type: 'string'},
    { field: 'Gender_GenderPref', headerName: 'Gender_NoGenderPref', width: 170, type: 'string'},
    { field: 'SubjectsEduLevel', headerName: 'Subjects_EduLevel', width: 370, type: 'string'},
    { field: 'IsProbonoOk_IsFinAidOk', headerName: 'IsProbonoOk_IsFinAidOk', width: 170, type: 'string'},
    { field: 'MatchingScore', headerName: 'M-Score', width: 90, type: 'number'},
  ];
  const rowsTutors = selectedTuteeMatches.tutorInfo.map((tutor, idx)=>{
    return {
    id: (idx+1),
    Entity: ("Tutor"+String(idx+1)),
    Index: tutor?.personalData?.index,
    Name: tutor?.personalData?.name,
    Gender_GenderPref: (tutor?.personalData?.gender),
    SubjectsEduLevel: ("PRIMARY: "+ String(tutor?.tutorSubjects?.primary) + ";   LOWERSEC: "+ String(tutor?.tutorSubjects?.lowerSecondary)+ "-   UPPERSEC: " + String(tutor?.tutorSubjects?.upperSecondary)+ "   JC: " + String(tutor?.tutorSubjects?.jc)+ "   IB: " + String(tutor?.tutorSubjects?.ib)), 
    // IsProbonoOk_IsFinAidOk: "Test",
    IsProbonoOk_IsFinAidOk: (String(tutor?.isProBonoOk) + "  +  " + String(tutor?.isUnaidedOk)),
    MatchingScore: (tutor?.matchingScore)
  }})
  console.log(selectedTuteeMatches)
  const rows = [
    {id: 0, 
      Entity: "Tutee", 
      Index:selectedTuteeMatches.tutee.personalData?.index, 
      Name:selectedTuteeMatches.tutee.personalData?.name, 
      Gender_GenderPref: (selectedTuteeMatches.tutee.personalData?.gender + " - " + selectedTuteeMatches.tutee.preferedGender), 
      SubjectsEduLevel:  (selectedTuteeMatches.tutee.educationLevel +" - " + String(selectedTuteeMatches.tutee.subjects)), 
      IsProbonoOk_IsFinAidOk: (selectedTuteeMatches.tutee.isOnFinancialAid)},
    ...rowsTutors
  ]
  return (
    <Stack alignItems="center">
      <h3>MatchDetailsPage</h3>
      <DataGrid getRowHeight={() => 'auto'} rows={rows} columns={columns}/>
    </Stack>
  )
}

export default MatchDetailsPage