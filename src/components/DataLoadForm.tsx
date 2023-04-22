import {Stack, Button} from "@mui/material"

const DataLoadForm = () => {
  let tutorRawData = []
  let tuteeRawData = []
  const loadData = () => {
    //Load Tutor Data
    fetch("https://script.google.com/macros/s/AKfycbypZfVGYR5yZGYKWGLf5xCDKraFlHM1auz9hsJpW2V5NVQ_RUWahVI-exb70AUDIZ_X/exec")
    .then((res)=>res.json())
    .then((data)=>{
      const colNames = data.content[0]
      // console.log("first", colNames)
      const tutorIndexIdx = colNames.findIndex((colName: string)=>(colName.toLowerCase().includes("tutor") && colName.toLowerCase().includes("index")))
      const tutorNameIdx = colNames.findIndex((colName: string)=>(colName.toLowerCase().includes("name")))
      const genderIdx = colNames.findIndex((colName: string)=>(colName.toLowerCase().includes("gender")))
      const probonoPrefIdx = colNames.findIndex((colName: string)=>(colName.toLowerCase().includes("pro-bono")))
      const teachUnaidedIdx = colNames.findIndex((colName: string)=>(colName.toLowerCase().includes("financial aid")))
      const streamPrefIdx = colNames.findIndex((colName: string)=>(colName.toLowerCase().includes("stream")))
      const priSubjIdx = colNames.findIndex((colName: string)=>(colName.toLowerCase().includes("primary") && colName.toLowerCase().includes("subject")))
      const lowerSecSubjIdx = colNames.findIndex((colName: string)=>(colName.toLowerCase().includes("lower secondary") && colName.toLowerCase().includes("subject")))
      const upperSecSubjIdx = colNames.findIndex((colName: string)=>(colName.toLowerCase().includes("upper secondary") && colName.toLowerCase().includes("subject")))
      const jcSubjIdx = colNames.findIndex((colName: string)=>(colName.toLowerCase().includes("jc") && colName.toLowerCase().includes("subject")))
      const ibSubjIdx = colNames.findIndex((colName: string)=>(colName.toLowerCase().includes("international baccalaureate") && colName.toLowerCase().includes("subject")))
      const hrsPerWeekIdx = colNames.findIndex((colName: string)=>(colName.toLowerCase().includes("hours") && colName.toLowerCase().includes("week")))
      console.log(tutorIndexIdx, tutorNameIdx, genderIdx, probonoPrefIdx,teachUnaidedIdx,streamPrefIdx,priSubjIdx,lowerSecSubjIdx,upperSecSubjIdx,jcSubjIdx,ibSubjIdx, hrsPerWeekIdx)
      if ((tutorIndexIdx<0)||(tutorNameIdx<0)||(genderIdx<0)||(probonoPrefIdx<0)||(teachUnaidedIdx<0)||(streamPrefIdx<0)||(priSubjIdx<0)||(lowerSecSubjIdx<0)||(upperSecSubjIdx<0)||(jcSubjIdx<0)||(ibSubjIdx<0)){
        alert("Tutor DB column name inaccurate! Tutor Data not loaded ")
        return
      }
      tutorRawData = data.content.map((rowData)=>{
        return {
          index: rowData[tutorIndexIdx],
          name: rowData[tutorNameIdx],
          gender: rowData[genderIdx],
          probonoPref: rowData[probonoPrefIdx],
          teachUnaided: rowData[teachUnaidedIdx],
          streamPref: rowData[streamPrefIdx],
          priSubj: rowData[priSubjIdx],
          lowerSecSubj: rowData[lowerSecSubjIdx],
          upperSecSubj: rowData[upperSecSubjIdx],
          jcSubj: rowData[jcSubjIdx],
          hrsPerWeek: rowData[hrsPerWeekIdx]
        }
      })
      window.tutorRawData = tutorRawData
      alert("Tutor Data Loaded")
      
      console.log(tutorRawData)
    })
    .catch((err)=>{
      console.log(err)
    })
    //Load Tutee Data
    fetch("https://script.google.com/macros/s/AKfycbw6A70Oga5e3802b2-RSB7eb7cranIzuv9_p86SuNmBzNb2j96J8vNn7jeTUrXuCSQkVg/exec")
    .then((res)=>res.json())
    .then((data)=>{
      // console.log(data.content[0])
      const colNames: [] = data.content[0]
      const tuteeIndexIdx = colNames.findIndex((colName:string)=>(colName.toLowerCase().includes("tutee") && colName.toLowerCase().includes("index")))
      const tuteeNameIdx = colNames.findIndex((colName:string)=>(colName.toLowerCase().includes("name")))
      const genderIdx = colNames.findIndex((colName:string)=>(colName.toLowerCase().includes("gender") && !colName.toLowerCase().includes("?")))
      const genderPrefIdx = colNames.findIndex((colName:string)=>(colName.toLowerCase().includes("gender?")))
      const financialAidIdx = colNames.findIndex((colName:string)=>(colName.toLowerCase().includes("financial aid")))
      const educationLevelIdx = colNames.findIndex((colName:string)=>(colName.toLowerCase().includes("level") && colName.toLowerCase().includes("education") && colName.toLowerCase().includes("2023")))
      // const educationLevelIdx2 = colNames.findIndex((colName:string)=>(colName.toLowerCase().includes("level") && colName.toLowerCase().includes("education") && colName.toLowerCase().includes("2022")))
      const educationLevelIdxArr: number[] = []
      colNames.forEach((colName: string, idx: number)=>{
        if (colName.toLowerCase().includes("level of education")) {educationLevelIdxArr.push(idx)}
      })
      const streamIdx = colNames.findIndex((colName:string)=>(colName.toLowerCase().includes("stream")))
      const subjIdx = colNames.findIndex((colName:string)=>(colName.toLowerCase().includes("subject")))
      const subjIdxArr: number[] = []
      colNames.forEach((colName:string, idx:number)=>{
        if (colName.toLowerCase().includes("subject")) {subjIdxArr.push(idx)}
      })
      // console.log(tuteeIndexIdx, tuteeNameIdx, genderIdx, genderPrefIdx, educationLevelIdx, streamIdx,subjIdx)
      if ((tuteeIndexIdx<0)||(tuteeNameIdx<0)||(genderIdx<0)||(genderPrefIdx<0)||(educationLevelIdx<0)||(streamIdx<0)||(subjIdx<0)){
        alert("Tutee DB column name inaccurate! Tutee Data not loaded ")
        return
      }
      tuteeRawData = data.content.map((rowData)=>{
        return {
          index: rowData[tuteeIndexIdx],
          name: rowData[tuteeNameIdx],
          gender: rowData[genderIdx],
          genderPref: rowData[genderPrefIdx],
          financialAid: rowData[financialAidIdx],
          // educationLevel: rowData[educationLevelIdx],
          // educationLevel2: rowData[educationLevelIdx2],
          educationLevel : educationLevelIdxArr.reduce((prev,curr)=>(prev+" "+rowData[curr]),""),
          stream: rowData[streamIdx],
          // subj: rowData[subjIdx],
          subj: subjIdxArr.reduce((prev, curr) => (prev + ", "+rowData[curr]),"")
        }
      })
      window.tuteeRawData = tuteeRawData
      alert("Tutee Data Loaded!")
      console.log(tuteeRawData)
    })
  }

  const clearData = () => {

  }

  const calculateMatches = () => {
    const tutorRawData = window.tutorRawData
    const tuteeRawData = window.tuteeRawData
    if (!tuteeRawData || !tutorRawData){
      alert("Data not loaded!")
      return
    }
    const matchingList = []
    for (let tutor of tutorRawData){
      const tutorMatches = {tutor:{}, tuteeMatchingScores:[]}
      tutorMatches.tutor = {
        index: tutor.index,
        name: tutor.name
      }
      for (let tutee of tuteeRawData){
        const tuteeMatchingScoreObj = {
          index: tutee.index,
          matchingScore: 0
        }
        // gender match check 

        // probono match check

        // finacial aid pref match check

        // subjects & level check

        // stream preference match check


        tutorMatches.tuteeMatchingScores.push(tuteeMatchingScoreObj)
      }
      matchingList.push(tutorMatches)      
    }
    console.log(matchingList)
 }
  return (
    <Stack alignItems="center" justifyContent="center" sx={{w:100}}>
    <Stack direction="row">
      <Stack direction="column" alignItems="center" justifyContent="center" sx={{m:2}}>
        <a href="https://docs.google.com/spreadsheets/d/1fN--bOYKGJRl2K7yNPembayRfZq4uf_N/edit?usp=share_link&ouid=101206299132410192457&rtpof=true&sd=true" target="_blank" style={{margin:"1rem"}}>Tutor Database HyperLink</a>
        <a href="https://docs.google.com/spreadsheets/d/1D12x7sSkni-S0bSXZM34FNuOonwgFpZJ/edit?usp=share_link&ouid=101206299132410192457&rtpof=true&sd=true" target="_blank" style={{margin:"1rem"}}>Tutee Database HyperLink</a>
      </Stack>
      <Stack direction="column">
      <Button variant="contained" sx={{m:1}} onClick={loadData}>Load Data</Button>
      <Button variant="contained" sx={{m:1}} onClick={clearData}>Clear Data</Button>
      <Button variant="contained" sx={{m:1}} onClick={calculateMatches}>Match</Button>
      </Stack>
    </Stack>
    </Stack>
  )
}

export default DataLoadForm