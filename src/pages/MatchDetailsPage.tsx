// @ts-nocheck
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectedTuteeSlice } from '@/types/stateSlice'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect } from 'react'
import { EducationLevel, SecondaryStream, fancyPrimarySubjects, fancySecondarySubjects, fancyJcSubjects, fancyIbSubjects } from '@/types/educationSubjects'
import { Subject, TutorSubjects } from '@/types/person'

const mapception = {
  "primary": fancyPrimarySubjects,
  "lowerSecondary": fancySecondarySubjects,
  "upperSecondary": fancySecondarySubjects,
  "jc": fancyJcSubjects,
  "ib": fancyIbSubjects
}

const booleanMap = {
  "true": "Yes",
  "false": "No",
  "null": "Null"
}

const MatchDetailsPage = () => {
  const navigate = useNavigate()
  const selectedTuteeMatches: selectedTuteeSlice = useSelector((state,action)=>state.selectedTuteeMatches)
  // console.log(selectedTuteeMatches)
  const getRelevantSubjects = (eduLevel: EducationLevel, tutorSubjects:TutorSubjects)=>{
    let relevantSubjects: Subject[]
    switch (eduLevel) {
      case EducationLevel.Primary:
        relevantSubjects = tutorSubjects.primary.map((subject) => fancyPrimarySubjects[subject])
        break;
      case EducationLevel.LowerSecondary:
        relevantSubjects = tutorSubjects.lowerSecondary.map((subject) => fancySecondarySubjects[subject])
        break;
      case EducationLevel.UpperSecondary:
        relevantSubjects = tutorSubjects.upperSecondary.map((subject) => fancySecondarySubjects[subject])
        break;
      case EducationLevel.JuniorCollege:
        relevantSubjects = tutorSubjects.jc.map((subject) => fancyJcSubjects[subject])
        break;
      case EducationLevel.InternationalBaccalaureate:
        relevantSubjects = tutorSubjects.ib.map((subject) => fancyIbSubjects[subject])
        break;
      default:
        break;
    }
    return relevantSubjects?.join(", ")
  }
  
  useEffect(()=>{
    if (!selectedTuteeMatches) {navigate("/")}
  },[])

  const streamMapping = {
    "na": "N(A)",
    "nt": "N(T)",
    "exp": "Exp",
    "ip": "IP",
    "ib": "IB"
  }

  const levelMapping = {
    "primary": "Primary",
    "lowerSecondary": "Lower Secondary",
    "upperSecondary": "Upper Secondary",
    "jc": "JC",
    "ib": "IB"
  }

  const columns: GridColDef[] = [
    { field: 'Entity', headerName: 'Entity', width: 90 },
    { field: 'Index', headerName: 'Row', width: 20, type: 'number'},
    { field: 'Name', headerName: 'Name', width: 120, type: 'string'},
    { field: 'Gender_GenderPref', headerName: 'Gender — Gender Pref', width: 170, type: 'string'},
    { field: 'SubjectsEduLevel', headerName: 'Edu Level — Subjects', width: 370, type: 'string'},
    { field: 'IsProbonoOk', headerName: 'Probono Ok?', width: 110, type: 'string'},
    { field: 'IsNoFinAidOk', headerName: 'No Aid Ok?', width: 110, type: 'string'},
    { field: 'SecStreams', headerName: 'Sec Streams', width: 110, type: 'string'},
    { field: 'Commit', headerName: 'hrs/wk — thru year?', width: 150, type: 'string'},
    { field: 'MatchingScore', headerName: 'M-Score', width: 90, type: 'number'},
  ];
  const rowsTutors = selectedTuteeMatches.tutorInfo.map((tutor, idx)=>{
    return {
    id: (idx+1),
    Entity: ("Tutor " + String(idx + 1)),
    Index: tutor?.personalData?.index,
    Name: tutor?.personalData?.name,
    Gender_GenderPref: (tutor?.personalData?.gender),
    SubjectsEduLevel: getRelevantSubjects(selectedTuteeMatches.tutee.educationLevel, tutor.tutorSubjects),
    IsProbonoOk: booleanMap[String(tutor.isProBonoOk)],
    IsNoFinAidOk: booleanMap[String(tutor.isUnaidedOk)],
    SecStreams: tutor.acceptableSecondaryStreams.map((stream) => streamMapping[stream]).join(", "),
    MatchingScore: (tutor?.matchingScore),
    Commit: (tutor?.commitStr)
  }})
  console.log(selectedTuteeMatches)
  const rows = [
    {id: 0, 
      Entity: "Tutee", 
      Index:selectedTuteeMatches.tutee.personalData?.index, 
      Name:selectedTuteeMatches.tutee.personalData?.name, 
      Gender_GenderPref: (selectedTuteeMatches.tutee.personalData?.gender + " — " + selectedTuteeMatches.tutee.preferedGender), 
      SubjectsEduLevel: (levelMapping[selectedTuteeMatches.tutee.educationLevel] + " — " + selectedTuteeMatches.tutee.subjects?.map((subject) => mapception[selectedTuteeMatches.tutee.educationLevel][subject]).join(", ")), 
      IsNoFinAidOk: booleanMap[(selectedTuteeMatches.tutee.isOnFinancialAid)],
      SecStreams: (selectedTuteeMatches.tutee.secondaryStream) == SecondaryStream.undefined ? "" : (selectedTuteeMatches.tutee.secondaryStream)},
    ...rowsTutors,
  ]
  return (
    <div class="flex flex-col items-center">
      <h2 className="h2 my-4">Match Details</h2>
      <DataGrid getRowHeight={() => 'auto'} sx={{maxWidth: "100%"}} rows={rows} columns={columns}/>
    </div>
  )
}

export default MatchDetailsPage