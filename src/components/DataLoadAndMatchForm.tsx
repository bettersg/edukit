// @ts-nocheck
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Stack, Button, Select, MenuItem, InputLabel } from '@mui/material'
import { Tutee, TuteeDataFormat, Tutor } from "../types/person"
import { MatchingList } from '@/types/globalVariables'

import { matchesSummaryActions } from '../store/matchesSummarySlice'
// import { unmatchedTuteesActions } from '../store/unmatchedTuteesSlice'
// import { selectedTutorMatchesActions } from '../store/selectedTutorMatchesSlice'

import { getGSheetsData } from '@/utils/api'
import { API_ENDPOINT_TUTEE, API_ENDPOINT_TUTOR } from '@/utils/api'
import {transformKSTutorData} from '@/utils/parseKSTutorData'
import {transformKSGeneralTuteeData} from "@/utils/parseKSGeneraTuteeData"
import {getMatchScore} from '@/utils/score'
import {transformKSSSOTuteeData} from '@/utils/parseKSSSOTuteeData'
import { useState } from 'react'

const DataLoadAndMatchForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedTuteeDataFormat, setSelectedTuteeDataFormat] = useState<TuteeDataFormat>("KSGeneral")

  const loadData = async () => {
    try {
        const tutorRawData = await getGSheetsData(API_ENDPOINT_TUTOR, false)
        const tutorParsedData = transformKSTutorData(tutorRawData)
        const tuteeRawData = await getGSheetsData(API_ENDPOINT_TUTEE, false)
        alert("Tutor & Tutee Data Loaded")
        let tuteeParsedData : Tutee[] = []
        switch (selectedTuteeDataFormat){
            case TuteeDataFormat.KSGeneral:
                tuteeParsedData = transformKSGeneralTuteeData(tuteeRawData)
                break
            case TuteeDataFormat.KSSSO:
                tuteeParsedData = transformKSSSOTuteeData(tuteeRawData)
                break
        }
        if ((tutorParsedData.length > 0)
        && (tuteeParsedData.length>0)){
            window.tutorParsedData = tutorParsedData.reverse()
            window.tuteeParsedData = tuteeParsedData
        }
    } catch(error){
        console.log(error)
    }
}  
  const calculateMatches = () => {
    const tutorParsedData:Tutor[] = window.tutorParsedData
    const tuteeParsedData:Tutee[] = window.tuteeParsedData
    console.log("Tutor - ", tutorParsedData, "Tutee - ", tuteeParsedData)
    if (!tutorParsedData || !tuteeParsedData) {
      alert('Data not loaded!')
      return
    }
    const matchingList:MatchingList = []
    for (let tutee of tuteeParsedData) {
      const tuteeMatches = { tutee: {}, tutorMatchingScores: [] }
      tuteeMatches.tutee = {
        index: tutee.personalData.index,
        name: tutee.personalData.name,
      }
      for (let tutor of tutorParsedData) {
        const tutorMatchingScoreObj = {
          index: tutor.personalData.index,
          contactNum: tutor.personalData.contact,
          name: tutor.personalData.name,
          matchingScore: getMatchScore(tutor, tutee),
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
    // console.log("matching list", matchingList)
    navigate('/')
  }

  const clearData = () => {
    delete window.tutorParsedData
    delete window.tuteeParsedData
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
          <MenuItem value={TuteeDataFormat.KSGeneral}>KS General</MenuItem>
          <MenuItem value={TuteeDataFormat.KSSSO}>KS SSO</MenuItem>
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

export default DataLoadAndMatchForm