// @ts-nocheck
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Stack, Button, Select, MenuItem, InputLabel, Divider, Chip } from '@mui/material'
// import {} from '@mui'

import { Tutee, TuteeDataFormat, Tutor } from "../types/person"
import { MatchingList, TuteeSummary, TutorMatchSummary } from '@/types/globalVariables'

import { matchesSummaryActions } from '../store/matchesSummarySlice'
import { selectedTuteeMatchesActions } from '@/store/selectedTuteeMatchesSlice'

import { getGSheetsData } from '@/utils/api'
import { API_ENDPOINT_TUTEE, API_ENDPOINT_TUTOR } from '@/utils/api'

import {transformKSTutorData} from '@/utils/parseKSTutorData'
import {transformKSGeneralTuteeData} from "@/utils/parseKSGeneraTuteeData"
import {transformKSSSOTuteeData} from '@/utils/parseKSSSOTuteeData'
import {getMatchScore} from '@/utils/score'
import KSSSOTuteeFormat from '@/utils/data/KSSSOTuteeFormat';

const DataLoadAndMatchForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedTuteeDataFormat, setSelectedTuteeDataFormat] = useState<TuteeDataFormat>("KSGeneral")

  const loadData = async () => {
    try {
        console.log("loading")
        const tutorRawData = await getGSheetsData(API_ENDPOINT_TUTOR, false)
        const tutorParsedData = transformKSTutorData(tutorRawData)
        const tuteeRawData = await getGSheetsData(API_ENDPOINT_TUTEE, false)
        let tuteeParsedData : Tutee[] = [];
        switch (selectedTuteeDataFormat){
            case TuteeDataFormat.KSGeneral:
                tuteeParsedData = transformKSGeneralTuteeData(tuteeRawData)
                break
            case TuteeDataFormat.KSSSO:
                console.log("Using new formatter");
                const formatter = new KSSSOTuteeFormat(tuteeRawData)
                tuteeParsedData = formatter.fromGSheetsData();
                console.log("Tutee parsed data", tuteeParsedData)
                break
        }
        if ((tutorParsedData.length > 0)
        && (tuteeParsedData.length>0)){
            window.tutorParsedData = tutorParsedData.reverse()
            window.tuteeParsedData = tuteeParsedData
            alert ('Tutor & Tutee Data Loaded')
        }else {
            alert ('Data not Loaded')
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
      const tuteeMatches : {
        tutee: TuteeSummary,
        tutorMatches: TutorMatchSummary[]
      } = { tutee: {}, tutorMatches: [] }
      tuteeMatches.tutee = {
        index: tutee.personalData.index,
        name: tutee.personalData.name,
      }
      for (let tutor of tutorParsedData) {
        const tutorMatchingScoreObj = {
          index: tutor.personalData.index,
          contactNum: tutor.personalData.contact?.phone,
          name: tutor.personalData.name,
          matchingScore: getMatchScore(tutor, tutee),
        }
        tuteeMatches.tutorMatches.push(tutorMatchingScoreObj)
      }
      tuteeMatches.tutorMatches.sort(
        (a, b) => b.matchingScore - a.matchingScore
      )
      if (tuteeMatches.tutorMatches.length > 51) {
        tuteeMatches.tutorMatches =
          tuteeMatches.tutorMatches.slice(0, 50)
      }
      matchingList.push(tuteeMatches)
    }
    window.matchingList = matchingList
    const matchesSummary = []
    for (let matchingListItem of matchingList) {
      const matchesSummaryItem = {
        tutee: matchingListItem.tutee,
        tutor1: matchingListItem.tutorMatches[0],
        tutor2: matchingListItem.tutorMatches[1],
        tutor3: matchingListItem.tutorMatches[2],
        tutor4: matchingListItem.tutorMatches[3],
        tutor5: matchingListItem.tutorMatches[4],
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
    dispatch(selectedTuteeMatchesActions.resetSelectedTuteeMatches())
    // dispatch(unmatchedTuteesActions.resetUnmatchedTutees())
    // dispatch(selectedTutorMatchesActions.resetSelectedTutorMatches())
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
          <h2 style={{ margin: 5 }}>Step 1 : Tutor Data</h2>
          <a
            href="https://docs.google.com/spreadsheets/d/1WFCDr9R4_A3wDRCeWcR6K8XK-_Rx30gqGGCgzF6Y65c/edit#gid=0"
            target="_blank"
            style={{ margin: '1rem' }}
          >
            Insert tutor data here
          </a>
          <h2 style={{ margin: 1 }}>Step 2 : Tutee Data</h2>
          <a
            href="https://docs.google.com/spreadsheets/d/1QyUr8axA_qb5kuddaL4dvOwNo7VT8k5o2POgLO9G84g/edit#gid=0"
            target="_blank"
            style={{ margin: '1rem' }}
          >
            Insert tutee data here
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
        </Select>
        <p style={{ margin: 5 }}></p>
        <h2 style={{ margin: 5 }}>Step 3 : Matching </h2>
        <Stack direction="row">
          <Button variant="contained" sx={{ m: 1 }} onClick={loadData}>
            Load
          </Button>
          <Button variant="contained" sx={{ m: 1 }} onClick={calculateMatches}>
            Match
          </Button>
          <Button color="secondary" sx={{ m: 1 }} onClick={clearData}>
            Clear
          </Button>
        </Stack>
          <a
            href="https://docs.google.com/spreadsheets/d/1Xj0zkL2h0nyUR25NKtCIv3QVjZee6bLyWUdpbxVCVT0/edit?usp=sharing"
            target="_blank"
            style={{ margin: '1rem' }}
          >
            Reference info (How Tool Works)
          </a>
        </Stack>
        
      </Stack>
      <a>-------------------------------------------------------------------------</a>
    </Stack>
  )
}

export default DataLoadAndMatchForm