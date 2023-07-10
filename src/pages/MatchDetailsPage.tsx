// @ts-nocheck
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {selectedTuteeSlice} from '@/types/stateSlice'
import {Stack} from '@mui/material'
import {DataGrid, GridColDef, GridEventListener, GridValueGetterParams} from '@mui/x-data-grid'
import { useEffect } from 'react'
import { EducationLevel } from '@/types/educationSubjects'
import { Subject, Tutor, TutorSubjects } from '@/types/person'


const MatchDetailsPage = () => {
  const navigate = useNavigate()
  const selectedTuteeMatches: selectedTuteeSlice = useSelector((state,action)=>state.selectedTuteeMatches)
  // console.log(selectedTuteeMatches)
  const getRelevantSubjects = (eduLevel: EducationLevel, tutorSubjects:TutorSubjects)=>{
    let relevantSubjects: Subject[]
    switch (eduLevel) {
      case EducationLevel.Primary:
        relevantSubjects = tutorSubjects.Primary
        break;
      case EducationLevel.LowerSecondary:
        relevantSubjects = tutorSubjects.lowerSecondary
        break;
      case EducationLevel.UpperSecondary:
        relevantSubjects = tutorSubjects.upperSecondary
        break;
      case EducationLevel.JuniorCollege:
        relevantSubjects = tutorSubjects.jc
        break;
      case EducationLevel.InternationalBaccalaureate:
        relevantSubjects = tutorSubjects.ib
        break;
      default:
        break;
    }
    return relevantSubjects?.reduce((prev,curr)=>(prev + " , "+curr),"")
  }
  
  useEffect(()=>{
    if (!selectedTuteeMatches) {navigate("/")}
  },[])
  const columns: GridColDef[] = [
    { field: 'Entity', headerName: 'Entity', width: 90 },
    { field: 'Index', headerName: 'Index', width: 20, type: 'number'},
    { field: 'Name', headerName: 'Name', width: 120, type: 'string'},
    { field: 'Gender_GenderPref', headerName: 'Gender_GenderPref', width: 170, type: 'string'},
    { field: 'SubjectsEduLevel', headerName: 'Subjects_EduLevel', width: 370, type: 'string'},
    { field: 'IsProbonoOk', headerName: 'IsProbonoOk?', width: 110, type: 'string'},
    { field: 'IsNoFinAidOk', headerName: 'IsNoFinAidOk?', width: 110, type: 'string'},
    { field: 'SecStreams', headerName: 'SecStreams', width: 110, type: 'string'},
    { field: 'MatchingScore', headerName: 'M-Score', width: 90, type: 'number'},
  ];
  const rowsTutors = selectedTuteeMatches.tutorInfo.map((tutor, idx)=>{
    return {
    id: (idx+1),
    Entity: ("Tutor"+String(idx+1)),
    Index: tutor?.personalData?.index,
    Name: tutor?.personalData?.name,
    Gender_GenderPref: (tutor?.personalData?.gender),
    SubjectsEduLevel: getRelevantSubjects(selectedTuteeMatches.tutee.educationLevel, tutor.tutorSubjects),
    IsProbonoOk: String(tutor.isProBonoOk),
    IsNoFinAidOk: String(tutor.isUnaidedOk),
    SecStreams: String(tutor.acceptableSecondaryStreams),
    MatchingScore: (tutor?.matchingScore)
  }})
  console.log(selectedTuteeMatches)
  const rows = [
    {id: 0, 
      Entity: "Tutee", 
      Index:selectedTuteeMatches.tutee.personalData?.index, 
      Name:selectedTuteeMatches.tutee.personalData?.name, 
      Gender_GenderPref: (selectedTuteeMatches.tutee.personalData?.gender + " - " + selectedTuteeMatches.tutee.preferedGender), 
      SubjectsEduLevel:  (selectedTuteeMatches.tutee.educationLevel +" - " + selectedTuteeMatches.tutee.subjects?.reduce((prev,curr)=>(curr? (prev+" , "+curr) : prev),"")), 
      IsNoFinAidOk: (selectedTuteeMatches.tutee.isOnFinancialAid),
      SecStreams: (selectedTuteeMatches.tutee.secondaryStream)},
    ...rowsTutors,
  ]
  return (
    <Stack alignItems="center">
      <h3>MatchDetailsPage</h3>
      <DataGrid getRowHeight={() => 'auto'} rows={rows} columns={columns}/>
    </Stack>
  )
}

export default MatchDetailsPage