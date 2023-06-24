// @ts-nocheck
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Stack, Button, Select, MenuItem, InputLabel } from '@mui/material'
import { TuteeDataFormat } from "../types/person"

import { matchesSummaryActions } from '../store/matchesSummarySlice'
import { unmatchedTuteesActions } from '../store/unmatchedTuteesSlice'
import { selectedTutorMatchesActions } from '../store/selectedTutorMatchesSlice'

import { getGSheetsData } from '@/utils/api'
import { API_ENDPOINT_TUTEE, API_ENDPOINT_TUTOR } from '@/utils/config'
import { useState } from 'react'

const DataLoadForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedTuteeDataFormat, setSelectedTuteeDataFormat] = useState<TuteeDataFormat>("KSGeneral")
  let tutorRawData = []
  let tuteeRawData = []

  const loadTutorData = async () => {
    try {
      const data = await getGSheetsData(API_ENDPOINT_TUTOR, false)
      const colNames = data[0]
      const tutorIndexIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('tutor') &&
          colName.toLowerCase().includes('index')
      )
      const tutorNameIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('name')
      )
      const genderIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('gender')
      )
      const probonoPrefIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('pro-bono')
      )
      const teachUnaidedIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('financial aid')
      )
      const streamPrefIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('stream')
      )
      const priSubjIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('primary') &&
          colName.toLowerCase().includes('subject')
      )
      const lowerSecSubjIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('lower secondary') &&
          colName.toLowerCase().includes('subject')
      )
      const upperSecSubjIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('upper secondary') &&
          colName.toLowerCase().includes('subject')
      )
      const jcSubjIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('jc') &&
          colName.toLowerCase().includes('subject')
      )
      const ibSubjIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('international baccalaureate') &&
          colName.toLowerCase().includes('subject')
      )
      const contactNumIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('number')
      )
      // const hrsPerWeekIdx = colNames.findIndex(
      //   (colName: string) =>
      //     colName.toLowerCase().includes('hours') &&
      //     colName.toLowerCase().includes('week')
      // )
      if (
        tutorIndexIdx < 0 ||
        tutorNameIdx < 0 ||
        genderIdx < 0 ||
        probonoPrefIdx < 0 ||
        teachUnaidedIdx < 0 ||
        streamPrefIdx < 0 ||
        priSubjIdx < 0 ||
        lowerSecSubjIdx < 0 ||
        upperSecSubjIdx < 0 ||
        jcSubjIdx < 0 ||
        ibSubjIdx < 0 ||
        contactNumIdx < 0
      ) {
        alert('Tutor DB column name inaccurate! Tutor Data not loaded ')
        return
      }

      tutorRawData = data.map((rowData) => {
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
          contactNum: rowData[contactNumIdx],
        }
      })
      tutorRawData.shift()
      tutorRawData.reverse()
      window.tutorRawData = tutorRawData
      alert('Tutor Data Loaded')
    } catch (error) {
      console.error(error)
    }
  }


  const findColIdxKSGeneral = (colNames : String[]) => {
    // const colNames: string[] = colNames
      const tuteeIndexIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('tutee') &&
          colName.toLowerCase().includes('index')
      )
      const tuteeNameIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('name')
      )
      const genderIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('gender') &&
          !colName.toLowerCase().includes('?')
      )
      const noGenderPrefIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('gender?')
      )
      const financialAidIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('financial aid')
      )
      const educationLevelIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('level') &&
          colName.toLowerCase().includes('education') &&
          colName.toLowerCase().includes('2023')
      )
      const educationLevelIdxArr: number[] = []
      colNames.forEach((colName: string, idx: number) => {
        if (colName.toLowerCase().includes('level of education')) {
          educationLevelIdxArr.push(idx)
        }
      })
      const streamIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('stream')
      )
      const subjIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('subject')
      )
      const subjIdxArr: number[] = []
      colNames.forEach((colName: string, idx: number) => {
        if (colName.toLowerCase().includes('subject')) {
          subjIdxArr.push(idx)
        }
      })
      return {tuteeIndexIdx, tuteeNameIdx, genderIdx, noGenderPrefIdx, financialAidIdx, educationLevelIdx, educationLevelIdxArr, streamIdx, subjIdx, subjIdxArr}
  }

  const findColIdxKSSSO = (colNames : String[]) => {
    // const colNames: string[] = colNames
      const tuteeIndexIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('tutee') &&
          colName.toLowerCase().includes('index')
      )
      const tuteeNameIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('name') && 
        colName.toLowerCase().includes('tutee')
      )
      const genderIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('gender') &&
          !colName.toLowerCase().includes('tutee')
      )
      const noGenderPrefIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('gender') &&
        colName.toLowerCase().includes("preference")
      )
      const financialAidIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('financial aid')
      )
      const educationLevelIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('level') &&
          colName.toLowerCase().includes('education') 
      )
      const educationLevelIdxArr: number[] = []
      colNames.forEach((colName: string, idx: number) => {
        if (colName.toLowerCase().includes('level') && 
        colName.toLowerCase().includes('education')) {
          educationLevelIdxArr.push(idx)
        }
      })
      const streamIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('stream')
      )
      const subjIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('subject')
      )
      const subjIdxArr: number[] = []
      colNames.forEach((colName: string, idx: number) => {
        if (colName.toLowerCase().includes('subject')) {
          subjIdxArr.push(idx)
        }
      })
      return {tuteeIndexIdx, tuteeNameIdx, genderIdx, noGenderPrefIdx, financialAidIdx, educationLevelIdx, educationLevelIdxArr, streamIdx, subjIdx, subjIdxArr}
  }

  const mapSSOToGenEducationLevel = (educationLevelSSOFormat) => {
    const educationLevelMappingTable = {
      P1: "Primary 1",
      P2: "Primary 2",
      P3: "Primary 3",
      P4: "Primary 4",
      P5: "Primary 5",
      P6: "Primary 6",
      S1: "Secondary 1",
      S2: "Secondary 2",
      S3: "Secondary 3",
      S4: "Secondary 4",
      JC1: "JC 1",
      JC2: "JC 2"
    }
    return educationLevelMappingTable[educationLevelSSOFormat]
  }

  const loadTuteeData = async () => {
    try {
      let data = await getGSheetsData(API_ENDPOINT_TUTEE, false)

      const colNames: string[] = data[0]
      let colIdxObj = {}
      switch (selectedTuteeDataFormat) {
        case TuteeDataFormat.KSGeneral:
          colIdxObj = findColIdxKSGeneral(colNames)
          console.log(colIdxObj, colNames)
          break
        case TuteeDataFormat.KSSSO:
          colNames.push("financial aid")
          colIdxObj = findColIdxKSSSO(colNames)
          data = data.map((rowData)=>{
            rowData.push("yes")
            const educationLevelSSOFormat = rowData[colIdxObj.educationLevelIdx]
            const educationLevelGenFormat = mapSSOToGenEducationLevel(educationLevelSSOFormat)
            rowData[colIdxObj.educationLevelIdx] = educationLevelGenFormat
            console.log("edu level gen format", educationLevelGenFormat)
            rowData[colIdxObj.educationLevelIdxArr] = educationLevelGenFormat
            return rowData})            
          // console.log(colIdxObj)
          break
        default:
          alert("Invalid Tutee Data Format selected")
          return
      }
      const {tuteeIndexIdx, tuteeNameIdx, genderIdx, noGenderPrefIdx, financialAidIdx, educationLevelIdx, educationLevelIdxArr, streamIdx, subjIdx, subjIdxArr} = colIdxObj
      if (
        tuteeIndexIdx < 0 ||
        tuteeNameIdx < 0 ||
        genderIdx < 0 ||
        noGenderPrefIdx < 0 ||
        educationLevelIdx < 0 ||
        streamIdx < 0 ||
        subjIdx < 0
      ) {
        alert('Tutee DB column name inaccurate! Tutee Data not loaded ')
        return
      }
      data.shift()
      // console.log("Raw data", data, educationLevelIdxArr)
      tuteeRawData = data.map((rowData) => {
        return {
          index: rowData[tuteeIndexIdx],
          name: rowData[tuteeNameIdx].toLowerCase(),
          gender: rowData[genderIdx].toLowerCase(),
          noGenderPref: rowData[noGenderPrefIdx].toLowerCase(),
          financialAid: rowData[financialAidIdx].toLowerCase(),
          educationLevel: educationLevelIdxArr.reduce(
            (prev:String, curr:String) => {
              // console.log("prev, curr : ",prev,curr, rowData)
              return (prev + ' ' + rowData[curr].toLowerCase())},
            ''
          ),
          stream: rowData[streamIdx],
          subj: subjIdxArr.reduce(
            (prev:String, curr:String) => prev + ', ' + rowData[curr]?.toLowerCase(),
            ''
          ),
        }
      })
      window.tuteeRawData = tuteeRawData
      alert('Tutee Data Loaded!')
    } catch (error) {
      console.error(error)
    }
  }

  const loadData = () => {
    loadTutorData()
    loadTuteeData()
  }

  const calculateMatches = () => {
    const tutorRawData = window.tutorRawData
    const tuteeRawData = window.tuteeRawData
    if (!tuteeRawData || !tutorRawData) {
      alert('Data not loaded!')
      return
    }
    const matchingList = []
    //for (let tutor of tutorRawData){
    for (let tutee of tuteeRawData) {
      const tuteeMatches = { tutee: {}, tutorMatchingScores: [] }
      tuteeMatches.tutee = {
        index: tutee.index,
        name: tutee.name,
      }
      for (let tutor of tutorRawData) {
        const tutorMatchingScoreObj = {
          index: tutor.index,
          contactNum: tutor.contactNum,
          matchingScore: 0,
        }
        // gender match check
        if (tutee.noGenderPref.toLowerCase().includes('yes')) {
          tutorMatchingScoreObj.matchingScore += 1
        } else if (tutee.noGenderPref == '' || tutor.gender == '') {
          tutorMatchingScoreObj.matchingScore += 0.5
        } else if (
          tutor.gender.includes('male') &&
          !tutor.gender.includes('female') &&
          tutee.noGenderPref.includes('male') &&
          !tutee.noGenderPref.includes('female')
        ) {
          tutorMatchingScoreObj.matchingScore += 1
        } else if (
          tutor.gender.includes('female') &&
          tutee.noGenderPref.includes('female')
        ) {
          tutorMatchingScoreObj.matchingScore += 1
        } else {
          tuteeMatches.tutorMatchingScores.push(tutorMatchingScoreObj)
          continue
        }
        // subjects & level check
        let subjectMatchScore = 0
        // const tuteeSubjRegex = /(primary|secondary|jc|ib)/gi
        if (tutee.educationLevel.includes('jc')) {
          if (!tutor.jcSubj.includes('not like to teach')) {
            const tuteeSubjArr = tutee.subj.split(',')
            const tutorSubjArr = tutor.jcSubj.split(',')
            for (let tutorSubj of tutorSubjArr) {
              if (tuteeSubjArr.some((subj : String) => (tutorSubj.includes(subj)))) {
               subjectMatchScore += 1
              }
            }
          }
        } else if (tutee.educationLevel.includes('ib')) {
          if (!tutor.ibSubj.includes('not like to teach')) {
            const tuteeSubjArr = tutee.subj.split(',')
            const tutorSubjArr = tutor.ibSubj.split(',')
            for (let tutorSubj of tutorSubjArr) {
              if (tuteeSubjArr.some((subj : String) => (tutorSubj.includes(subj)))) {
              // if (tutorSubjArr.some((subj) => subj == tuteeSubj)) {
               subjectMatchScore += 1
              }
            }
          }
        } else if (
          tutee.educationLevel.includes('secondary') &&
          tutee.educationLevel.match(/(3|4)/gi)
        ) {
          if (!tutor.upperSecSubj.includes('not like to teach')) {
            const tuteeSubjArr = tutee.subj.split(',')
            const tutorSubjArr = tutor.upperSecSubj.split(',')
            for (let tutorSubj of tutorSubjArr) {
              if (tuteeSubjArr.some((subj : String) => (tutorSubj.includes(subj)))) {
            // for (let tuteeSubj of tuteeSubjArr) {
            //   if (tutorSubjArr.some((subj) => subj == tuteeSubj)) {
               subjectMatchScore += 1
              }
            }
          }
        } else if (
          tutee.educationLevel.includes('secondary') &&
          tutee.educationLevel.match(/(1|2)/gi)
        ) {
          if (!tutor.lowerSecSubj.includes('not like to teach')) {
            const tuteeSubjArr = tutee.subj.split(',')
            const tutorSubjArr = tutor.lowerSecSubj.split(',')
            for (let tutorSubj of tutorSubjArr) {
              if (tuteeSubjArr.some((subj : String) => (tutorSubj.includes(subj)))) {
            // for (let tuteeSubj of tuteeSubjArr) {
            //   if (tutorSubjArr.some((subj) => subj == tuteeSubj)) {
               subjectMatchScore += 1
              }
            }
          }
        } else if (tutee.educationLevel.includes('primary')) {
          if (!tutor.priSubj.includes('not like to teach')) {
            const tuteeSubjArr = tutee.subj.split(',')
            const tutorSubjArr = tutor.priSubj.split(',')
            for (let tutorSubj of tutorSubjArr) {
              if (tuteeSubjArr.some((subj : String) => (tutorSubj.includes(subj)))) {
            // for (let tuteeSubj of tuteeSubjArr) {
            //   if (tutorSubjArr.some((subj) => subj == tuteeSubj)) {
               subjectMatchScore += 1
              }
            }
          }
        }
        if (subjectMatchScore === 0) {
          tutorMatchingScoreObj.matchingScore = 0
          tuteeMatches.tutorMatchingScores.push(tutorMatchingScoreObj)
          continue
        }
        tutorMatchingScoreObj.matchingScore += subjectMatchScore
        // probono match check
        if (
          tutor.probonoPref.includes('free') ||
          tutor.probonoPref.includes('both') ||
          tutee.financialAid.includes('yes')
        ) {
          tutorMatchingScoreObj.matchingScore += 1
        } else if (tutor.probonoPref == '' || tutee.financialAid == '') {
          tutorMatchingScoreObj.matchingScore += 0.5
        }
        // finacial aid pref match check
        if (
          tutor.teachUnaided.includes('yes') ||
          tutee.financialAid.includes('yes')
        ) {
          tutorMatchingScoreObj.matchingScore += 1
        } else if (tutor.teachUnaided == '' || tutee.financialAid == '') {
          tutorMatchingScoreObj.matchingScore += 0.5
        }
        // stream preference match check
        if (
          !(
            tutee.educationLevel.includes('secondary') || tutor.streamPref == ''
          ) ||
          tutee.stream == ''
        ) {
          tutorMatchingScoreObj.matchingScore += 0.5
        } else if (tutor.streamPref.includes(tutee.stream)) {
          tutorMatchingScoreObj.matchingScore += 1
        }
        tuteeMatches.tutorMatchingScores.push(tutorMatchingScoreObj)
      }
      tuteeMatches.tutorMatchingScores.sort(
        (a, b) => b.matchingScore - a.matchingScore
      )
      if (tuteeMatches.tutorMatchingScores.length > 51) {
        tuteeMatches.tutorMatchingScores =
          tuteeMatches.tutorMatchingScores.slice(0, 50)
      }
      matchingList.push(tuteeMatches)
    }
    window.matchingList = matchingList
    const matchesSummary = []
    for (let matchingListItem of matchingList) {
      const matchesSummaryItem = {
        tutee: matchingListItem.tutee,
        tutor1: matchingListItem.tutorMatchingScores[0],
        tutor2: matchingListItem.tutorMatchingScores[1],
        tutor3: matchingListItem.tutorMatchingScores[2],
        tutor4: matchingListItem.tutorMatchingScores[3],
        tutor5: matchingListItem.tutorMatchingScores[4],
      }
      matchesSummary.push(matchesSummaryItem)
    }
    dispatch(matchesSummaryActions.updateMatchesSummary(matchesSummary))
    console.log("matching list", matchingList)
    navigate('/')
  }

  const clearData = () => {
    delete window.tutorRawData
    delete window.tuteeRawData
    delete window.matchingList
    dispatch(matchesSummaryActions.resetMatchesSummary())
    dispatch(unmatchedTuteesActions.resetUnmatchedTutees())
    dispatch(selectedTutorMatchesActions.resetSelectedTutorMatches())
    navigate('/')
  }

  const handleSelectorChange = (event: Select.SelectChangeEvent) => {
    setSelectedTuteeDataFormat(()=>event.target.value)
    // console.log(selectedTuteeDataFormat)    
  }

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ w: 100 }}>
      <Stack direction="row" alignItems="center">
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ m: 2 }}
        >
          <a
            href="https://docs.google.com/spreadsheets/d/1WFCDr9R4_A3wDRCeWcR6K8XK-_Rx30gqGGCgzF6Y65c/edit#gid=0"
            target="_blank"
            style={{ margin: '1rem' }}
          >
            Tutor Database HyperLink
          </a>
          <a
            href="https://docs.google.com/spreadsheets/d/1QyUr8axA_qb5kuddaL4dvOwNo7VT8k5o2POgLO9G84g/edit#gid=0"
            target="_blank"
            style={{ margin: '1rem' }}
          >
            Tutee Database HyperLink
          </a>
          <InputLabel id="select-label">Tutee Data Format</InputLabel>
          <Select
          labelId="select-label"
          id="simple-select"
          value={selectedTuteeDataFormat}
          label="Age"
          onChange={handleSelectorChange}
        >
          <MenuItem value={"KSGeneral"}>KS General</MenuItem>
          <MenuItem value={"KSSSO"}>KS SSO</MenuItem>
          <MenuItem value={"KS_Test"}>KS Test</MenuItem>
        </Select>
          <a
            href="https://docs.google.com/spreadsheets/d/1Xj0zkL2h0nyUR25NKtCIv3QVjZee6bLyWUdpbxVCVT0/edit?usp=sharing"
            target="_blank"
            style={{ margin: '1rem' }}
          >
            Instructions for tool usage
          </a>
        </Stack>
        <Stack direction="column">
          <Button variant="contained" sx={{ m: 1 }} onClick={loadData}>
            Load Data
          </Button>
          <Button variant="contained" sx={{ m: 1 }} onClick={clearData}>
            Clear Data
          </Button>
          <Button variant="contained" sx={{ m: 1 }} onClick={calculateMatches}>
            Match
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default DataLoadForm
