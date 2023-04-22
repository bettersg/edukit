// @ts-nocheck
import {useDispatch} from 'react-redux'
import {matchesSummaryActions} from '../store/matchesSummarySlice'
import {Stack, Button} from "@mui/material"

const DataLoadForm = () => {
  const dispatch = useDispatch()
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
          name: rowData[tutorNameIdx].toLowerCase(),
          gender: rowData[genderIdx].toLowerCase(),
          probonoPref: rowData[probonoPrefIdx].toLowerCase(),
          teachUnaided: rowData[teachUnaidedIdx].toLowerCase(),
          streamPref: rowData[streamPrefIdx].toLowerCase(),
          priSubj: rowData[priSubjIdx].toLowerCase(),
          lowerSecSubj: rowData[lowerSecSubjIdx].toLowerCase(),
          upperSecSubj: rowData[upperSecSubjIdx].toLowerCase(),
          jcSubj: rowData[jcSubjIdx].toLowerCase(),
          ibSubj: rowData[ibSubjIdx].toLowerCase(),
          hrsPerWeek: rowData[hrsPerWeekIdx]
        }
      })
      tutorRawData.shift()
      window.tutorRawData = tutorRawData
      alert("Tutor Data Loaded")      
      // console.log(tutorRawData)
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
      const noGenderPrefIdx = colNames.findIndex((colName:string)=>(colName.toLowerCase().includes("gender?")))
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
      if ((tuteeIndexIdx<0)||(tuteeNameIdx<0)||(genderIdx<0)||(noGenderPrefIdx<0)||(educationLevelIdx<0)||(streamIdx<0)||(subjIdx<0)){
        alert("Tutee DB column name inaccurate! Tutee Data not loaded ")
        return
      }
      tuteeRawData = data.content.map((rowData)=>{
        return {
          index: rowData[tuteeIndexIdx],
          name: rowData[tuteeNameIdx].toLowerCase(),
          gender: rowData[genderIdx].toLowerCase(),
          noGenderPref: rowData[noGenderPrefIdx].toLowerCase(),
          financialAid: rowData[financialAidIdx].toLowerCase(),
          // educationLevel: rowData[educationLevelIdx],
          // educationLevel2: rowData[educationLevelIdx2],
          educationLevel : educationLevelIdxArr.reduce((prev,curr)=>(prev+" "+rowData[curr].toLowerCase()),""),
          stream: rowData[streamIdx],
          // subj: rowData[subjIdx],
          subj: subjIdxArr.reduce((prev, curr) => (prev + ", "+rowData[curr].toLowerCase()),"")
        }
      })
      tuteeRawData.shift()
      window.tuteeRawData = tuteeRawData
      alert("Tutee Data Loaded!")
      // console.log(tuteeRawData)
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
        // console.log(tutor, tutee)
        // gender match check 
        if (tutee.noGenderPref.toLowerCase().includes("yes")){
          tuteeMatchingScoreObj.matchingScore += 1 
        } else if ((tutee.noGenderPref == "")||(tutor.gender == "")){
          tuteeMatchingScoreObj.matchingScore += 0.5
        } else if ((tutor.gender.includes("male")) && (tutee.noGenderPref.includes("male"))){
          tuteeMatchingScoreObj.matchingScore += 1
        } else if ((tutor.gender.includes("female")) && (tutee.noGenderPref.includes("female"))){
          tuteeMatchingScoreObj.matchingScore += 1
        }
        // probono match check
        if ((tutor.probonoPref.includes("free")) || (tutor.probonoPref.includes("both")) || (tutee.financialAid.includes("yes"))){
          tuteeMatchingScoreObj.matchingScore += 1
        } else if ((tutor.probonoPref == "") || (tutee.financialAid == "")){
          tuteeMatchingScoreObj.matchingScore += 0.5
        }
        // finacial aid pref match check
        if ((tutor.teachUnaided.includes("yes")) || (tutee.financialAid.includes("yes"))){
          tuteeMatchingScoreObj.matchingScore += 1
        } else if ((tutor.teachUnaided == "")||(tutee.financialAid=="")){
          tuteeMatchingScoreObj.matchingScore += 0.5
        }
        // subjects & level check
        const tuteeSubjRegex = /(primary|secondary|jc|ib)/gi
        if (!tutee.educationLevel.match(tuteeSubjRegex)){
          tuteeMatchingScoreObj.matchingScore += 0.5
        } else if (tutee.educationLevel.includes("jc")){
          if (!tutor.jcSubj.includes("not like to teach")){
            const tuteeSubjArr = tutee.subj.split(",")
            const tutorSubjArr = tutor.jcSubj.split(",")
            for (let tutorSubj of tutorSubjArr){
              if (tuteeSubjArr.some((subj)=>(subj == tutorSubj))){
                tuteeMatchingScoreObj.matchingScore += 1
              }
            }
          }
        } else if (tutee.educationLevel.includes("ib")){
          if (!tutor.ibSubj.includes("not like to teach")){
            const tuteeSubjArr = tutee.subj.split(",")
            const tutorSubjArr = tutor.ibSubj.split(",")
            for (let tutorSubj of tutorSubjArr){
              if (tuteeSubjArr.some((subj)=>(subj == tutorSubj))){
                tuteeMatchingScoreObj.matchingScore += 1
              }
            }
          }
        } else if ((tutee.educationLevel.includes("secondary")) && (tutee.educationLevel.match(/(3|4)/gi))){
          if (!tutor.upperSecSubj.includes("not like to teach")){
            const tuteeSubjArr = tutee.subj.split(",")
            const tutorSubjArr = tutor.upperSecSubj.split(",")
            for (let tutorSubj of tutorSubjArr){
              if (tuteeSubjArr.some((subj)=>(subj == tutorSubj))){
                tuteeMatchingScoreObj.matchingScore += 1
              }
            }
          }
        }else if ((tutee.educationLevel.includes("secondary")) && (tutee.educationLevel.match(/(1|2)/gi))){
          if (!tutor.lowerSecSubj.includes("not like to teach")){
            const tuteeSubjArr = tutee.subj.split(",")
            const tutorSubjArr = tutor.lowerSecSubj.split(",")
            for (let tutorSubj of tutorSubjArr){
              if (tuteeSubjArr.some((subj)=>(subj == tutorSubj))){
                tuteeMatchingScoreObj.matchingScore += 1
              }
            }
          }
        }else if (tutee.educationLevel.includes("primary")){
          if (!tutor.priSubj.includes("not like to teach")){
            const tuteeSubjArr = tutee.subj.split(",")
            const tutorSubjArr = tutor.priSubj.split(",")
            for (let tutorSubj of tutorSubjArr){
              if (tuteeSubjArr.some((subj)=>(subj == tutorSubj))){
                tuteeMatchingScoreObj.matchingScore += 1
              }
            }
          }
        }
        // stream preference match check
        if (!(tutee.educationLevel.includes("secondary") || (tutor.streamPref == "")) || (tutee.stream == "")){
          tuteeMatchingScoreObj.matchingScore += 0.5
        } else if (tutor.streamPref.includes(tutee.stream)){
          tuteeMatchingScoreObj.matchingScore += 1
        }
        tutorMatches.tuteeMatchingScores.push(tuteeMatchingScoreObj)
      }
      tutorMatches.tuteeMatchingScores.sort((a,b)=>(b.matchingScore - a.matchingScore))
      matchingList.push(tutorMatches)      
    }
    const matchesSummary = []
    for (let matchingListItem of matchingList){
      const matchesSummaryItem = {
        tutor: (matchingListItem.tutor.name + " - " + String(matchingListItem.tutor.index)),
        tutee1: matchingListItem.tuteeMatchingScores[0].index,
        tutee2: matchingListItem.tuteeMatchingScores[1].index,
        tutee3: matchingListItem.tuteeMatchingScores[2].index,
        tutee4: matchingListItem.tuteeMatchingScores[3].index,
        tutee5: matchingListItem.tuteeMatchingScores[4].index,
      }
      matchesSummary.push(matchesSummaryItem)
    }
    dispatch(matchesSummaryActions.updateMatchesSummary(matchesSummary))
    console.log(matchingList)
 }
  return (
    <Stack alignItems="center" justifyContent="center" sx={{w:100}}>
    <Stack direction="row">
      <Stack direction="column" alignItems="center" justifyContent="center" sx={{m:2}}>
        <a href="https://docs.google.com/spreadsheets/d/1WFCDr9R4_A3wDRCeWcR6K8XK-_Rx30gqGGCgzF6Y65c/edit#gid=0" target="_blank" style={{margin:"1rem"}}>Tutor Database HyperLink</a>
        <a href="https://docs.google.com/spreadsheets/d/1QyUr8axA_qb5kuddaL4dvOwNo7VT8k5o2POgLO9G84g/edit#gid=0" target="_blank" style={{margin:"1rem"}}>Tutee Database HyperLink</a>
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